import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import type { SignInSchemaType } from "~/lib/validators";
import type { TRPCContext } from "~/server/api/trpc";
import { auth } from "~/server/auth";
import { securityCodes, users } from "~/server/db/schema";

export async function signIn(ctx: TRPCContext, input: SignInSchemaType) {
  const result = await ctx.db.transaction(async (tx) => {
    const validVerificationCode = await tx.query.securityCodes.findFirst({
      where: (t, { eq, and, gte }) =>
        and(
          eq(t.identifier, input.phone),
          eq(t.code, input.verificationCode),
          gte(t.expiresAt, new Date())
        ),
    });

    if (!validVerificationCode)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Verification code is invalid or has expired",
      });

    await tx
      .delete(securityCodes)
      .where(
        and(
          eq(securityCodes.identifier, input.phone),
          eq(securityCodes.code, input.verificationCode)
        )
      );

    const user = await tx.query.users.findFirst({
      where: (t, { eq }) => eq(t.phone, input.phone),
      columns: {
        id: true,
      },
    });

    if (!user) {
      const [newUser] = await tx
        .insert(users)
        .values({
          phone: input.phone,
        })
        .returning({
          id: users.id,
        });

      if (!newUser) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create user",
        });
      }
      return newUser;
    }

    return user;
  });

  const session = await auth.createSession({
    userId: result.id,
  });

  const sessionCookie = auth.generateSessionCookie(session.id);

  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return { success: true };
}
