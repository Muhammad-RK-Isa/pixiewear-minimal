import { cookies } from "next/headers";
import { auth } from "~/server/auth";
import type { ProtectedContext } from "../../trpc";

export async function signOut(ctx: ProtectedContext) {
  await auth.invalidateSession(ctx.session.id);
  const blankSessionCookie = auth.generateBlankSessionCookie();
  (await cookies()).set(blankSessionCookie);
  return { success: true };
}
