import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import type { CreateOrderSchemaType } from "~/lib/validators";
import { carts } from "~/server/db/schema";
import { orders } from "~/server/db/schema/orders";
import type { ProtectedContext } from "../../trpc";

export async function createOrder(
  ctx: ProtectedContext,
  input: CreateOrderSchemaType
) {
  if (ctx.user.phone !== input.phone) {
    const isUserVerified = await ctx.db.query.orders
      .findFirst({
        where: (t, { and, eq }) =>
          and(eq(t.phone, input.phone), eq(t.userVerified, true)),
      })
      .then((od) => !!od);
    if (!isUserVerified) {
      if (input.verificationCode) {
        const validVerificationCode =
          await ctx.db.query.securityCodes.findFirst({
            where: (t, { and, eq, gte }) =>
              and(
                eq(t.identifier, input.phone),
                eq(t.code, input.verificationCode!),
                gte(t.expiresAt, new Date())
              ),
          });
        if (!validVerificationCode) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message:
              "Verification code has expired or is invalid. Please try again.",
          });
        }
      } else {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "PHONE_NOT_VERIFIED",
        });
      }
    }
  }

  const amount =
    input.items.reduce((total, item) => {
      return total + Number(item.price) * Number(item.quantity);
    }, 0) + 120;

  const [order] = await ctx.db
    .insert(orders)
    .values({
      ...input,
      userId: ctx.user.id,
      amount: String(amount),
      quantity: input.items.length,
      userVerified: true,
    })
    .returning({
      id: orders.id,
    });

  const cookieStore = await cookies();

  const cartId = cookieStore.get("cartId")?.value ?? "";

  await ctx.db.update(carts).set({ closed: true }).where(eq(carts.id, cartId));

  cookieStore.set("cartId", "");

  return { orderId: order?.id };
}
