import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import type { UpdateCartItemSchemaType } from "~/lib/validators";
import { carts } from "~/server/db/schema";
import type { TRPCContext } from "../../trpc";

export async function updateCartItem(
  ctx: TRPCContext,
  input: UpdateCartItemSchemaType
) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "cartId not found, please try again.",
    });
  }

  const cart = await ctx.db.query.carts.findFirst({
    where: eq(carts.id, cartId),
  });

  if (!cart) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Cart not found, please try again.",
    });
  }

  const cartItem = cart.items?.find(
    (item) => item.productId === input.productId
  );

  if (!cartItem) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "CartItem not found, please try again.",
    });
  }

  if (input.quantity === 0) {
    cart.items =
      cart.items?.filter((item) => item.productId !== input.productId) ?? [];
  } else {
    cartItem.quantity = input.quantity;
  }

  await ctx.db
    .update(carts)
    .set({
      items: cart.items,
    })
    .where(eq(carts.id, cartId));
}
