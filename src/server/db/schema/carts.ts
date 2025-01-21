import { boolean, json, pgTable, text } from "drizzle-orm/pg-core";
import { generatePGTableId, lifecycleDates } from "~/lib/utils";
import { users } from "./users";
import type { CartItem } from "~/lib/validators";

export const carts = pgTable("carts", {
  id: generatePGTableId({ prefix: "cart" }),
  userId: text("user_id")
    .references(() => users.id, { onUpdate: "cascade", onDelete: "cascade" }),
  items: json("items").$type<CartItem[] | null>().default(null),
  closed: boolean("closed").notNull().default(false),
  ...lifecycleDates,
})
