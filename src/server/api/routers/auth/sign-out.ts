import { auth } from "~/server/auth";
import type { ProtectedContext } from "../../trpc";
import { cookies } from "next/headers";

export async function signOut(ctx: ProtectedContext) {
  await auth.invalidateSession(ctx.session.id);
  const blankSessionCookie = auth.generateBlankSessionCookie();
  (await (cookies())).set(blankSessionCookie);
  return { success: true };
}
