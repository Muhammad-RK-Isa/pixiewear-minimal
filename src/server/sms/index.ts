import "server-only";

import { TRPCError } from "@trpc/server";
import { env } from "~/env";
import { SMS_API_ENDPOINT, SMS_MULTIPLE_API_ENDPOINT } from "~/lib/constants";

interface SMSApiResponse {
  response_code: number;
  success_message: string;
  error_message: string;
}

interface SendSMSInput {
  receiver: string;
  message: string;
}

export const sendSMS = async (input: SendSMSInput | SendSMSInput[]) => {
  const isMultiple = Array.isArray(input);
  const url = isMultiple ? SMS_MULTIPLE_API_ENDPOINT : SMS_API_ENDPOINT;

  const payload: Record<string, string> = {
    api_key: env.SMS_API_KEY,
    senderid: env.SMS_SENDER_ID,
  };

  if (isMultiple) {
    payload.messages = JSON.stringify(
      input.map(({ receiver, message }) => ({
        to: receiver,
        message,
      }))
    );
  } else {
    const { receiver, message } = input;
    payload.number = receiver;
    payload.message = message;
  }

  if (env.NODE_ENV === "production") {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(payload),
    })

    const data = await response.json() as unknown as SMSApiResponse;

    if (data.error_message) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: data.error_message,
      })
    }
  } else {
    console.log("SMS Sent ", input)
  }
};
