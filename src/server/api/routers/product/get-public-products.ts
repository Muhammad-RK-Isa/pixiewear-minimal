import { products } from "~/server/db/schema/products";
import type { TRPCContext } from "../../trpc";
import { count, eq } from "drizzle-orm";

export async function getPublicProducts(ctx: TRPCContext) {
  try {
    const result = await ctx.db.transaction(async (tx) => {
      const data = await tx
        .select({
          id: products.id,
          title: products.title,
          handle: products.handle,
          description: products.description,
          shortDescription: products.shortDescription,
          metaDescription: products.metaDescription,
          metaTitle: products.metaTitle,
          mrp: products.mrp,
          price: products.price,
          status: products.status,
          vendor: products.vendor,
          tags: products.tags,
          images: products.images,
        })
        .from(products)
        .where(eq(products.status, "published"))
        .groupBy(products.id)

      const total = await tx
        .select({
          count: count(),
        })
        .from(products)
        .where(eq(products.status, "published"))
        .execute()
        .then((res) => res[0]?.count ?? 0)

      return {
        data,
        total,
      }
    })

    return result;
  } catch (_) {
    return {
      data: [],
      total: 0,
    }
  }
}