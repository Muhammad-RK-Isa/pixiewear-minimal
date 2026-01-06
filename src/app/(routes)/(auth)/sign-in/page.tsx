import React from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { TextShine } from "~/components/ui/text-shine";
import { APP_TITLE } from "~/lib/constants";
import { SignInForm } from "./_components/sign-in-form";

function SignInFormFallback() {
  return (
    <div className="w-[20rem] rounded-xl border bg-card/50 text-card-foreground shadow-none backdrop-blur-sm sm:w-[24rem]">
      <CardHeader className="pb-6">
        <CardTitle className="text-xl sm:text-2xl">Sign in</CardTitle>
        <CardDescription className="inline-flex items-center gap-1 text-muted-foreground">
          to continue to{" "}
          <TextShine
            className="font-alenia font-bold text-sm transition-all"
            duration={10}
            text={APP_TITLE}
          />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </CardContent>
    </div>
  );
}

export default function SignInPage() {
  return (
    <React.Suspense fallback={<SignInFormFallback />}>
      <SignInForm />
    </React.Suspense>
  );
}
