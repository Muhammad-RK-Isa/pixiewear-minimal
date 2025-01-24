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
import { generateId, sha256Hash } from "~/lib/utils";

async function getUserInfo() {
  const heads = await headers();

  const ipAddress = heads.get("x-real-ip") ?? heads.get("x-forwarded-for")?.split(",")[0];

  const userAgent = heads.get("user-agent");

  const fbclid = (await cookies()).get("_fbc")?.value ?? "";

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

  console.log(JSON.stringify(eventBody));

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
    event_time: Math.floor(new Date().getTime() / 1000), 
    action_source: "website",
    user_data: {
      client_ip_address: ipAddress,
      client_user_agent: userAgent,
      fbc: fbclid,
    },
    event_source_url: sourceUrl,
  }

  return postEventToMeta({ data: [event]});
}

export async function metaViewContent(product: { id: string; name: string; price: number; currency: string }): Promise<MetaReponse> {
  const { ipAddress, userAgent, fbclid, sourceUrl } = await getUserInfo();

  const event = {
    event_id: generateId(),
    event_name: "ViewContent",
    event_time: Math.floor(new Date().getTime() / 1000), 
    action_source: "website",
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

export async function metaAddToCart(product: { id: string; name: string; price: number; currency: string }): Promise<MetaReponse> {
  const { ipAddress, userAgent, fbclid, sourceUrl } = await getUserInfo();

  const event = {
    event_id: generateId(),
    event_name: "AddToCart",
    event_time: Math.floor(new Date().getTime() / 1000), 
    action_source: "website",
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

interface MetaBeginCheckout {
  user: {
    email?: string
    phone: string
    firstName: string
    lastName?: string
    city: string
    state: string
    country: string
    zipCode?: string
  };
  products: {
    id: string;
    quantity: number;
  }[];
  total_price: number;
  eventName: "BeginCheckout" | "Purchase";
}

export async function metaCheckout({
  products,
  total_price,
  user,
  eventName,
}: MetaBeginCheckout): Promise<MetaReponse> {
  const { ipAddress, userAgent, fbclid, sourceUrl } = await getUserInfo();

  const event = {
    event_id: generateId(),
    event_name: eventName,
    event_time: Math.floor(new Date().getTime() / 1000), 
    action_source: "website",
    user_data: {
      client_ip_address: ipAddress,
      client_user_agent: userAgent,
      ...(user.email && { em: sha256Hash(user.email) }),
      ...(user.phone && { ph: sha256Hash(user.phone) }),
      ...(user.firstName && { fn: sha256Hash(user.firstName) }),
      ...(user.lastName && { ln: sha256Hash(user.lastName) }),
      ...(user.city && { ct: sha256Hash(user.city) }),
      ...(user.state && { st: sha256Hash(user.state) }),
      ...(user.country && { country: sha256Hash(user.country) }),
      ...(user.zipCode && { zp: sha256Hash(user.zipCode) }),
      fbc: fbclid,
    },
    event_source_url: sourceUrl,
    content_type: "product",
    contents: products.map((product) => ({
      id: product.id,
      quantity: product.quantity,
    })),
    custom_data: {
      value: total_price,
      currency: "BDT",
    },
  }

  return postEventToMeta({ data: [event] });
}
