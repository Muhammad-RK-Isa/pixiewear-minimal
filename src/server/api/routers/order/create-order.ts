import type { CreateOrderSchemaType } from "~/lib/validators";
import type { ProtectedContext } from "../../trpc";
import { orders } from "~/server/db/schema/orders";

export async function createOrder(ctx: ProtectedContext, input: CreateOrderSchemaType) {
  await ctx.db
    .insert(orders)
    .values({
      ...input,
      amount: String(input.amount),
      userId: ctx.user.id,
    })
}