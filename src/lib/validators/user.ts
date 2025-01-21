import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "~/server/db/schema";

export const baseUserSchema = createSelectSchema(users);

export const phoneNumberSchema = z
  .string()
  .trim()
  .regex(
    /^\+[1-9]\d{1,14}$/,
    "Phone number must start with a '+' followed by 1-15 digits."
  )
  .max(24, "Phone number must not exceed 24 characters, including formatting.");

export const verificationCodeSchema = z
  .string({ required_error: "Verification code is required" })
  .min(6, { message: "Code is invalid" })
  .max(6, { message: "Code is invalid" });

export const signInSchema = z.object({
  phone: phoneNumberSchema,
  verificationCode: verificationCodeSchema,
})

export const sendVerificationCodeSchema = z.object({
  phone: phoneNumberSchema,
})

export type SignInSchemaType = z.infer<typeof signInSchema>;
export type VerificationCodeSchemaType = z.infer<typeof verificationCodeSchema>;
export type SendVerificationCodeSchemaType = z.infer<typeof sendVerificationCodeSchema>;
