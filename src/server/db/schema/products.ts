import { sql } from "drizzle-orm";
import { decimal, integer, pgTable, text } from "drizzle-orm/pg-core";
import { generatePGTableId, lifecycleDates } from "~/lib/utils";

export const products = pgTable("products", {
  id: generatePGTableId({ prefix: "product" }),
  title: text("title").notNull(),
  handle: text("handle").notNull(),
  description: text("description"),
  shortDescription: text("short_description"),
  metaDescription: text("meta_description"),
  metaTitle: text("meta_title"),
  status: text("status", {
    enum: [
      "published",
      "draft",
      "archived",
    ]
  }).notNull().default("draft"),
  vendor: text("vendor"),
  tags: text("tags")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  images: text("images")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  mrp: decimal("mrp", { precision: 10, scale: 2 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  inventory: integer("inventory").notNull().default(0),
  ...lifecycleDates,
})