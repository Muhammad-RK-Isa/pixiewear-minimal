import { z } from "zod";
import type { TRPCRouterRecord } from "@trpc/server";
import { adminProcedure, publicProcedure } from "../../trpc";
import { getProductById } from "./get-product-by-id";
import { createEditProductSchema } from "~/lib/validators";
import { createEditProduct } from "./create-edit-product";
import { getProductByHandle } from "./get-product-by-handle";
import { getPublicProducts } from "./get-public-products";

export const productRouter = {
  getById: adminProcedure
    .input(z.string())
    .query(({ ctx, input }) => getProductById(ctx, input)),
  getByHandle: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => getProductByHandle(ctx, input)),
  getPublic: publicProcedure
    .query(({ ctx }) => getPublicProducts(ctx)),
  upsert: adminProcedure
    .input(createEditProductSchema)
    .mutation(({ ctx, input }) => createEditProduct(ctx, input)),
} satisfies TRPCRouterRecord;
