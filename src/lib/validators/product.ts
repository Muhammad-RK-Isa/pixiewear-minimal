import { z } from "zod";

export const baseProductSchema = z.object({
  id: z.string(),
  title: z.string({ required_error: "Title is required" }).min(1, { message: "Title is required" }),
  handle: z.string({ required_error: "Handle is required" }).min(1, { message: "Handle is required" }),
  description: z.string(),
  shortDescription: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  mrp: z.number({ coerce: true }).nonnegative().optional(),
  price: z.number({ coerce: true }).nonnegative(),
  inventory: z.number({ coerce: true }).nonnegative().optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  vendor: z.string(),
  tags: z.string().array().optional().default([]),
  images: z.string().array().optional().default([]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
})

export const createEditProductSchema = baseProductSchema.omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
}).extend({
  id: z.string().optional(),
})

export type ProductEntity = z.infer<typeof baseProductSchema>
export type CreateEditProductSchemaType = z.infer<typeof createEditProductSchema>
