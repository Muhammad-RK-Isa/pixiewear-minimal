import type { TRPCRouterRecord } from "@trpc/server";
import { createOrderSchema } from "~/lib/validators";
import { protectedProcedure } from "../../trpc";
import { createOrder } from "./create-order";

export const orderRouter = {
  create: protectedProcedure
    .input(createOrderSchema)
    .mutation(({ ctx, input }) => createOrder(ctx, input)),
} satisfies TRPCRouterRecord;
