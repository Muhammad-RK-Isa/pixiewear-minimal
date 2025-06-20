/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { db } from "~/server/db";
import { validateRequest } from "../auth/validate-request";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const { user, session } = await validateRequest();
  return {
    user,
    session,
    db,
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user && !ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are unauthenticated",
    });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user!,
      session: ctx.session!,
    },
  })
})

export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to access this resource",
    });
  }
  return next();
})

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
export type ProtectedContext = TRPCContext & {
  user: NonNullable<TRPCContext["user"]>;
  session: NonNullable<TRPCContext["session"]>;
};
export type AdminContext = ProtectedContext
