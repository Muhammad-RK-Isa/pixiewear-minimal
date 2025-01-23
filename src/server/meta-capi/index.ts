import "server-only";
import { env } from "~/env";
import { META_GRAPH_API_ENDPOINT } from "~/lib/constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendMetaEvents = async <T>(event: any): Promise<T> => {
  const pixelId = env.NEXT_PUBLIC_FB_PIXEL_ID;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const res = await fetch(`${META_GRAPH_API_ENDPOINT}/${pixelId}/events`, {
    method: "POST",
    ...(event && { body: JSON.stringify(event) }),
  })

  const data = await res.json() as unknown as T;

  return data;
}
