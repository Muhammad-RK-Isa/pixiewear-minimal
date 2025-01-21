import type { TRPCRouterRecord } from "@trpc/server";
import { publicProcedure } from "../../trpc";
import { updateCartItemSchema } from "~/lib/validators";
import { addToCart } from "./add-to-cart";
import { getCart } from "./get-cart";
import { updateCartItem } from "./update-cart-item";

export const cartRouter = {
  addItem: publicProcedure
    .input(updateCartItemSchema)
    .mutation(({ ctx, input }) => addToCart(ctx, input)),
  updateCartItem: publicProcedure
    .input(updateCartItemSchema)
    .mutation(({ ctx, input }) => updateCartItem(ctx, input)),
  get: publicProcedure
    .query(({ ctx }) => getCart(ctx)),
} satisfies TRPCRouterRecord;
