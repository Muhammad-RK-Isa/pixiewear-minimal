import {
  index,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { generateExpiryDate } from "~/lib/utils";

export const securityCodes = pgTable(
  "security_codes",
  {
    identifier: text("identifier").notNull(),
    code: text("code").notNull(),
    expiresAt: timestamp("expiresAt", { mode: "date", withTimezone: true })
      .notNull()
      .$defaultFn(() => generateExpiryDate(5, "m")),
  },
  (t) => [
    index("identifier_idx").on(t.identifier),
    index("code_idx").on(t.code),
    primaryKey({
      columns: [t.identifier, t.code],
    }),
  ]
);
