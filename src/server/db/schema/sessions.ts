import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  expiresAt: timestamp("expires_at", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  isTwoFactorVerified: boolean("is_two_factor_verified").notNull().default(false),
})
