import type { TRPCContext } from "../../trpc";

export async function getProductByHandle(ctx: TRPCContext, input: string) {
  return await ctx.db.query.products.findFirst({
    where: (t, { eq, and, isNull }) =>
      and(eq(t.handle, input), eq(t.status, "published"), isNull(t.deletedAt)),
  });
}
