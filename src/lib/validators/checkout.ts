import { z } from "zod";
import { checkoutItemSchema } from "./cart";
import { verificationCodeSchema } from "./user";

export const orderSchema = z.object({
  id: z.string(),
  displayId: z.string(),
  items: checkoutItemSchema.array(),
  name: z.string({ required_error: "Name is required" }).min(1, { message: "Name is required" }),
  email: z.string().optional(),
  phone: z.string({ required_error: "Phone number is required" }).min(1, { message: "Phone number is required" }),
  street: z
    .string({ required_error: "Street/Village is required" })
    .min(1, { message: "Street/Village is invalid" }),
  town: z
    .string({ required_error: "Upazila is required" })
    .min(1, { message: "Upazila is required" }),
  city: z
    .string({ required_error: "District is required" })
    .min(1, { message: "District is required" }),
  state: z
    .string({ required_error: "Division is required" })
    .min(1, { message: "Division is required" }),
  country: z
    .string({ required_error: "Country is required" })
    .min(1, { message: "Country is required" }),
  postCode: z
    .string()
    .optional(),
  userId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().optional().nullable(),
})

export const createOrderSchema = orderSchema.omit({
  id: true,
  displayId: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
}).extend({
  verificationCode: verificationCodeSchema.optional(),
})

export type OrderSchemaType = z.infer<typeof orderSchema>;
export type CreateOrderSchemaType = z.infer<typeof createOrderSchema>;