import { z } from "zod";

export const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number({ coerce: true }).nonnegative(),
})

export const updateCartItemSchema = cartItemSchema.extend({
  quantity: z.number({ coerce: true }).nonnegative().default(1),
})

export const checkoutItemSchema = updateCartItemSchema.extend({
  price: z.number({ coerce: true }).nonnegative(),
})

export type CartItem = z.infer<typeof cartItemSchema>;
export type UpdateCartItemSchemaType = z.infer<typeof updateCartItemSchema>;
export type CheckoutItemSchemaType = z.infer<typeof checkoutItemSchema>;