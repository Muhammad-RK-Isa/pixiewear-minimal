import "server-only";

import { env } from "~/env";
import { SMS_API_ENDPOINT, SMS_MULTIPLE_API_ENDPOINT } from "~/lib/constants";

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
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(payload),
      });
    } catch (error) {
      throw error;
    }
  } else {
    console.log("SMS Sent ", input)
  }

  return { success: true };
};
