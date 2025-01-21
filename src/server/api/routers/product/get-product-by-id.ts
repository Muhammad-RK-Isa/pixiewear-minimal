import type { TRPCContext } from "../../trpc";

export async function getProductById(ctx: TRPCContext, input: string) {
  return await ctx.db.query.products.findFirst({ 
    where: (t, {eq}) => eq(t.id, input),
  })
}
