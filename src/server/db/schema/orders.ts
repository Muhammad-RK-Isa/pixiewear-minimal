import { decimal, integer, json, pgTable, text } from "drizzle-orm/pg-core";
import { generateOrderId, generatePGTableId, lifecycleDates } from "~/lib/utils";
import type { CheckoutItemSchemaType } from "~/lib/validators";
import { users } from "./users";

export const orders = pgTable("orders", {
  id: generatePGTableId({ prefix: "order" }),
  displayId: text("display_id").notNull().$defaultFn(() => generateOrderId()),
  items: json("items").$type<CheckoutItemSchemaType[] | null>().default(null),
  quantity: integer("quantity").notNull(),
  amount: decimal("amount", {
    precision: 10,
    scale: 2,
  }).notNull().default("0.00"),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone").notNull(),
  street: text("street").notNull(),
  town: text("town").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  country: text("country").notNull(),
  postCode: text("post_code"),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "set null" })
    .notNull(),
  ...lifecycleDates,
})
