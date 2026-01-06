import type { TRPCRouterRecord } from "@trpc/server";
import { sendVerificationCodeSchema, signInSchema } from "~/lib/validators";
import { protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { sendVerificationCode } from "./send-verification-code";
import { signIn } from "./sign-in";
import { signOut } from "./sign-out";

export const authRouter = {
  session: publicProcedure.query(({ ctx }) => {
    return {
      id: ctx.session?.id,
      expiresAt: ctx.session?.expiresAt,
      isTwoFactorVerified: ctx.session?.isTwoFactorVerified,
      user: ctx.user,
    };
  }),
  signIn: publicProcedure
    .input(signInSchema)
    .mutation(({ ctx, input }) => signIn(ctx, input)),
  sendVerificationCode: publicProcedure
    .input(sendVerificationCodeSchema)
    .mutation(({ ctx, input }) => sendVerificationCode(ctx, input)),
  signOut: protectedProcedure.mutation(({ ctx }) => signOut(ctx)),
} satisfies TRPCRouterRecord;
