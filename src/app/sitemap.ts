import { count, desc } from "drizzle-orm";
import type { MetadataRoute } from "next";
import { env } from "~/env";
import { db } from "~/server/db";
import { products } from "~/server/db/schema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  async function getAllProducts() {
    try {
      return await db
        .select({
          handle: products.handle,
        })
        .from(products)
        .limit(50000)
        .offset(0)
        .groupBy(products.id)
        .orderBy(
          desc(count(products.images)),
          desc(products.createdAt)
        )
    } catch (_) {
      return []
    }
  }

  const productsRoutes = (await getAllProducts()).map((product) => ({
    url: `${env.NEXT_PUBLIC_APP_URL}/products/${product.handle}`,
    lastModified: new Date().toISOString(),
  }))

  const routes = [
    "",
    "/contact",
    "/faq",
    "/privacy",
    "/returns",
    "/shipping",
    "/terms",
    "/careers",
    "/about",
  ].map((route) => ({
    url: `${env.NEXT_PUBLIC_APP_URL}${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [
    ...routes,
    ...productsRoutes,
  ]
}
