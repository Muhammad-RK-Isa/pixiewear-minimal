import { sql } from "drizzle-orm";
import { boolean, check, index, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { generatePGTableId, lifecycleDates, lower } from "~/lib/utils";

export const users = pgTable("users", {
  id: generatePGTableId({prefix: "u"}),
  name: text("name"),
  email: text("email").unique(),
  phone: text("phone").unique(),
  phoneVerified: boolean("phone_verified").notNull().default(false),
  emailVerified: boolean("email_verified").notNull().default(false),
  avatar: text("avatar"),
  password: text("password"),
  role: text("role", {
    enum: ["customer", "admin"]
  }).default("customer").notNull(),
  ...lifecycleDates,
}, (t) => [
  index("user_name_idx").on(t.name),
  uniqueIndex("email_idx").on(lower(t.email)),
  uniqueIndex("phone_idx").on(t.phone),
  check(
    "user_email_or_phone_check",
    sql`(email IS NOT NULL OR phone IS NOT NULL)`,
  ),
])
