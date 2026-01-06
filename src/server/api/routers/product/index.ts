import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";
import { createEditProductSchema } from "~/lib/validators";
import { adminProcedure, publicProcedure } from "../../trpc";
import { createEditProduct } from "./create-edit-product";
import { getProductByHandle } from "./get-product-by-handle";
import { getProductById } from "./get-product-by-id";
import { getPublicProducts } from "./get-public-products";

export const productRouter = {
  getById: adminProcedure
    .input(z.string())
    .query(({ ctx, input }) => getProductById(ctx, input)),
  getByHandle: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => getProductByHandle(ctx, input)),
  getPublic: publicProcedure.query(({ ctx }) => getPublicProducts(ctx)),
  upsert: adminProcedure
    .input(createEditProductSchema)
    .mutation(({ ctx, input }) => createEditProduct(ctx, input)),
} satisfies TRPCRouterRecord;
