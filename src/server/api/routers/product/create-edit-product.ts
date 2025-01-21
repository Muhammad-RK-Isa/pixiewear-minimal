import type { CreateEditProductSchemaType } from "~/lib/validators";
import type { AdminContext } from "../../trpc";
import { products } from "~/server/db/schema/products";
import { eq } from "drizzle-orm";

export async function createEditProduct(ctx: AdminContext, input: CreateEditProductSchemaType) {
  if (input.id) {
    await ctx.db
    .update(products)
    .set({
          title: input.title,
          handle: input.handle,
          description: input.description,
          shortDescription: input.shortDescription,
          metaDescription: input.metaDescription,
          metaTitle: input.metaTitle,
          status: input.status,
          vendor: input.vendor,
          tags: input.tags,
          mrp: String(input.mrp),
          price: String(input.price),
          inventory: input.inventory,
        })
        .where(eq(products.id, input.id))
      } else {
    await ctx.db
      .insert(products)
      .values({
        title: input.title,
        handle: input.handle,
        description: input.description,
        shortDescription: input.shortDescription,
        metaDescription: input.metaDescription,
        metaTitle: input.metaTitle,
        status: input.status,
        vendor: input.vendor,
        tags: input.tags,
        mrp: String(input.mrp),
        price: String(input.price),
        inventory: input.inventory,
      })
  };
  return { success: true };
};
