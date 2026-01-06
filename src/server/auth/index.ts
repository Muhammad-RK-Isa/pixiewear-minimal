import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import type { Cookie } from "oslo/cookie";
import { serializeCookie } from "oslo/cookie";
import { env } from "~/env";
import { db } from "~/server/db";
import { sessions } from "~/server/db/schema";

const COOKIE_NAME = "session";

export interface Session {
  id: string;
  userId: string;
  expiresAt: number;
  isTwoFactorVerified: boolean;
}

function generateSessionToken(): string {
  const tokenBytes = new Uint8Array(20);
  crypto.getRandomValues(tokenBytes);
  const token = encodeBase32LowerCaseNoPadding(tokenBytes).toLowerCase();
  return token;
}

interface CreateSessionProps {
  userId: string;
  isTwoFactorVerified?: boolean;
}

async function createSession({
  userId,
  isTwoFactorVerified = false,
}: CreateSessionProps) {
  const token = generateSessionToken();

  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  // 30 days
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await db.insert(sessions).values({
    id: sessionId,
    userId,
    expiresAt,
  });

  return {
    id: token,
    userId,
    expiresAt,
    isTwoFactorVerified,
  };
}

function generateSessionCookie(token: string): Cookie {
  const name = "session";
  const attributes: Cookie["attributes"] = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  };
  return {
    name,
    value: token,
    attributes,
    serialize: () => serializeCookie(name, token, attributes),
  };
}

function generateBlankSessionCookie(): Cookie {
  const name = "session";
  const attributes: Cookie["attributes"] = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  };
  return {
    name,
    value: "",
    attributes,
    serialize: () => serializeCookie(name, "", attributes),
  };
}

async function readSessonCookie() {
  return (await cookies()).get(COOKIE_NAME)?.value;
}

async function validateSession(token: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const session = await db.query.sessions.findFirst({
    where: (t, { eq }) => eq(t.id, sessionId),
  });

  if (!session) {
    return {
      session: null,
      user: null,
    };
  }

  if (session.expiresAt.getTime() <= Date.now()) {
    await db.delete(sessions).where(eq(sessions.id, session.id));
    return {
      session: null,
      user: null,
    };
  }

  const user = await db.query.users.findFirst({
    where: (t, { eq }) => eq(t.id, session.userId),
    columns: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatar: true,
      emailVerified: true,
      phoneVerified: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    await db.delete(sessions).where(eq(sessions.id, session.id));
    return {
      session: null,
      user: null,
    };
  }

  return {
    session: {
      ...session,
      id: token,
    },
    user,
  };
}

async function invalidateSession(token: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export const auth = {
  createSession,
  generateSessionCookie,
  generateBlankSessionCookie,
  readSessonCookie,
  validateSession,
  invalidateSession,
};
