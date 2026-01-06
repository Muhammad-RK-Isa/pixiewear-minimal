import { TRPCError } from "@trpc/server";
import { APP_TITLE } from "~/lib/constants";
import { generateRandomOTP } from "~/lib/utils";
import type { SendVerificationCodeSchemaType } from "~/lib/validators";
import type { TRPCContext } from "~/server/api/trpc";
import { securityCodes } from "~/server/db/schema";
import { sendSMS } from "~/server/sms";

export async function sendVerificationCode(
  ctx: TRPCContext,
  input: SendVerificationCodeSchemaType
) {
  const [result] = await ctx.db
    .insert(securityCodes)
    .values({
      identifier: input.phone,
      code: generateRandomOTP(),
    })
    .returning({
      code: securityCodes.code,
    });

  if (!result) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create verification code",
    });
  }

  await sendSMS({
    message: `Your ${APP_TITLE} OTP is ${result.code}`,
    receiver: input.phone,
  });
}
