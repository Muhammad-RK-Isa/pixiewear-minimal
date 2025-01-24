import type { CartItem } from "~/lib/validators";
import type { TRPCContext } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { cookies } from "next/headers";
import { carts } from "~/server/db/schema/carts";
import { eq } from "drizzle-orm";

export async function addToCart(ctx: TRPCContext, input: CartItem) {
  const product = await ctx.db.query.products.findFirst({
    where: (t, { eq, and }) =>
      and(
        eq(t.id, input.productId),
        eq(t.status, "published"),
      )
  })

  if (!product) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Product not found",
    })
  }

  if (product.inventory < input.quantity) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Product is out of stock, please try again later."
    })
  }

  const cookieStore = await cookies();

  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) {
    const [newCart] = await ctx.db
      .insert(carts)
      .values({
        items: [input],
      })
      .returning({
        id: carts.id,
      })

    cookieStore.set("cartId", String(newCart?.id))

    return
  };

  const cart = await ctx.db.query.carts.findFirst({
    where: eq(carts.id, cartId),
  })

  if (!cart) {
    cookieStore.set({
      name: "cartId",
      value: "",
      expires: new Date(0),
    })

    await ctx.db.delete(carts).where(eq(carts.id, cartId))

    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Cart not found",
    })
  }

  if (cart.closed) {
    await ctx.db.delete(carts).where(eq(carts.id, cartId))

    const [newCart] = await ctx.db
      .insert(carts)
      .values({
        items: [input],
      })
      .returning({ id: carts.id })

    cookieStore.set("cartId", String(newCart?.id))

    return
  }

  const cartItem = cart.items?.find(
    (item) => item.productId === input.productId
  )

  if (cartItem) {
    cartItem.quantity += input.quantity
  } else {
    cart.items?.push(input)
  }

  await ctx.db
    .update(carts)
    .set({
      items: cart.items,
    })
    .where(eq(carts.id, cartId))

  return
}
