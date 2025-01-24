/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

interface MetaReponse {
  events_received: number
  messages: string[],
  fbtrace_id: string,
}

import { cookies, headers } from "next/headers";
import { env } from "~/env";
import { META_GRAPH_API_ENDPOINT } from "~/lib/constants";
import { generateId } from "~/lib/utils";

async function getUserInfo() {
  const heads = await headers();

  const ipAddress = heads.get("x-real-ip") ?? heads.get("x-forwarded-for")?.split(",")[0];

  const userAgent = heads.get("user-agent");

  const fbclid = (await cookies()).get("_fbc")?.value;

  const pathname = heads.get("x-path");

  const sourceUrl = `${env.NEXT_PUBLIC_APP_URL}${pathname}`;

  return {
    ipAddress,
    userAgent,
    fbclid,
    sourceUrl,
  }
}

async function postEventToMeta(eventBody: Record<string, unknown>): Promise<MetaReponse> {
  const pixelId = env.META_PIXEL_ID;

  const graphApiEndpoint = `${META_GRAPH_API_ENDPOINT}/${pixelId}/events`;

  const response = await fetch(graphApiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...eventBody,
      access_token: env.META_ACCESS_TOKEN,
      test_event_code: env.META_PIXEL_TEST_CODE,
    }),
  });

  const data = await response.json() as unknown as MetaReponse;

  console.log("META_GRAPH_RESPONSE: ", data );

  return data;
}

export async function metaPageView(): Promise<MetaReponse> {
  const { ipAddress, userAgent, fbclid, sourceUrl } = await getUserInfo();

  const event = {
    event_id: generateId(),
    event_name: "PageView",
    event_time: Math.floor(new Date().getTime() / 1000), // Unix timestamp in seconds
    user_data: {
      client_ip_address: ipAddress,
      client_user_agent: userAgent,
      fbc: fbclid, // Facebook click ID, optional but recommended
    },
    event_source_url: sourceUrl,
  }

  return postEventToMeta({ data: [event] });
}

export async function metaViewContent(product: { id: string; name: string; price: number; currency: string }): Promise<MetaReponse> {
  const { ipAddress, userAgent, fbclid, sourceUrl } = await getUserInfo();

  const event = {
    event_id: generateId(),
    event_name: "ViewContent",
    event_time: Math.floor(new Date().getTime() / 1000), // Unix timestamp in seconds
    user_data: {
      client_ip_address: ipAddress,
      client_user_agent: userAgent,
      fbc: fbclid,
    },
    event_source_url: sourceUrl,
    custom_data: {
      content_ids: [product.id],
      content_name: product.name,
      value: product.price,
      currency: product.currency,
      content_type: "product",
    },
  }

  return postEventToMeta({ data: [event] });
}