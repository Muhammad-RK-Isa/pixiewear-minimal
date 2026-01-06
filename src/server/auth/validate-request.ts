import { cookies } from "next/headers";
import { auth } from ".";

export async function validateRequest() {
  const sessionId = await auth.readSessonCookie();
  let session = null;
  let user = null;

  if (sessionId) {
    try {
      const sessionData = await auth.validateSession(sessionId);

      session = sessionData.session;
      user = sessionData.user;

      if (session) {
        const sessionCookie = auth.generateSessionCookie(session.id);
        (await cookies()).set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      } else {
        const sessionCookie = auth.generateBlankSessionCookie();
        (await cookies()).set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {}
  }
  return { user, session };
}
