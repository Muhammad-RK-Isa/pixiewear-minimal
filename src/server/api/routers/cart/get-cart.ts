import { and, asc, eq, inArray, isNull } from "drizzle-orm";
import { cookies } from "next/headers";
import { carts, products } from "~/server/db/schema";
import type { TRPCContext } from "../../trpc";

export async function getCart(ctx: TRPCContext) {
  const cookieStore = await cookies();

  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) return [];

  try {
    const cart = await ctx.db.query.carts.findFirst({
      columns: {
        items: true,
      },
      where: eq(carts.id, cartId),
    });

    const productIds = cart?.items?.map((item) => item.productId) ?? [];

    if (productIds.length === 0) return [];

    const uniqueProductIds = [...new Set(productIds)];

    const cartLineItems = await ctx.db
      .select({
        id: products.id,
        title: products.title,
        mrp: products.mrp,
        price: products.price,
        handle: products.handle,
        images: products.images,
      })
      .from(products)
      .where(
        and(
          inArray(products.id, uniqueProductIds),
          eq(products.status, "published"),
          isNull(products.deletedAt)
        )
      )
      .groupBy(products.id)
      .orderBy(asc(products.createdAt))
      .execute()
      .then((items) => {
        return items.map((item) => {
          const quantity = cart?.items?.find(
            (cartItem) => cartItem.productId === item.id
          )?.quantity;

          return {
            ...item,
            quantity: quantity ?? 0,
            price: Number(item.price),
            mrp: Number(item.mrp),
          };
        });
      });

    return cartLineItems;
  } catch (_) {
    return [];
  }
}
