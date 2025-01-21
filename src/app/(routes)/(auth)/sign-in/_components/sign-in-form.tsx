/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as RPNInput from "react-phone-number-input";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import type { ProgressStatus } from "~/components/ui/progress-tabs";
import { ProgressTabs } from "~/components/ui/progress-tabs";
import { TextShine } from "~/components/ui/text-shine";
import { cn } from "~/lib/utils";

import { APP_TITLE } from "~/lib/constants";
import type { SignInSchemaType } from "~/lib/validators";
import { signInSchema } from "~/lib/validators";
import { api } from "~/trpc/react";

type Tab = "phone" | "otp";

type StepStatus = Record<Tab, ProgressStatus>;

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const [error, setError] = React.useState("");
  const [tab, setTab] = React.useState<Tab>("phone");

  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const form = useForm<SignInSchemaType>({
    defaultValues: {
      phone: "",
      verificationCode: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const {
    mutateAsync: sendVerificationCodeAsync,
    isPending: isSendingVerificationCode,
  } = api.auth.sendVerificationCode.useMutation();

  const { mutate: signIn, isPending } =
    api.auth.signIn.useMutation({
      onSuccess: () => {
        toast.success("You are now signed in");
        router.push(callbackUrl);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      (!Object.keys(form.formState.errors).length || !error) &&
      tab !== "otp"
    ) {
      await onNext();
      return;
    }
    signIn(form.getValues());
  }

  const [_, setStatus] = React.useState<StepStatus>({
    phone: "not-started",
    otp: "not-started",
  });

  const onTabChange = React.useCallback(
    async (value: Tab) => {
      let result = false;
      switch (value) {
        case "phone":
          result = await form.trigger(["phone"]);
          break;
        case "otp":
          result = await form.trigger(["verificationCode"]);
          break;
      }

      if (!result) {
        return;
      }

      setTab(value);
    },
    [form.trigger],
  );

  const onNext = React.useCallback(async () => {
    let result = false;
    switch (tab) {
      case "phone":
        result = await form.trigger(["phone"]);
        break;
      case "otp":
        result = await form.trigger(["verificationCode"]);
        break;
    }

    if (!result) {
      return;
    }

    switch (tab) {
      case "phone": {
        await sendVerificationCodeAsync(
          { phone: form.getValues("phone") },
          {
            onError: (err) => {
              setError(err.message);
              return;
            },
          },
        );
        setTab("otp");
        break;
      }
      case "otp":
        break;
    }
  }, [tab, form.trigger]);

  React.useEffect(() => {
    if (form.formState.isDirty) {
      setStatus((prev) => ({ ...prev, details: "in-progress" }));
    } else {
      setStatus((prev) => ({ ...prev, details: "not-started" }));
    }
  }, [form.formState.isDirty]);

  React.useEffect(() => {
    if (tab === "phone" && form.formState.isDirty) {
      setStatus((prev) => ({ ...prev, details: "in-progress" }));
    }

    if (tab === "otp") {
      setStatus((prev) => ({
        ...prev,
        ["otp"]: "in-progress",
      }));
    }
  }, [tab, form.formState.isDirty]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      className="w-[20rem] rounded-xl border bg-card/50 text-card-foreground shadow-none backdrop-blur-sm sm:w-[24rem]"
    >
      <CardHeader className="pb-6">
        <CardTitle className="text-xl sm:text-2xl">Sign in</CardTitle>
        <CardDescription className="inline-flex items-center gap-1 text-muted-foreground">
          to continue to{" "}
          <TextShine
            duration={10}
            text={APP_TITLE}
            className="text-sm font-bold transition-all font-alenia"
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <ProgressTabs
            value={tab}
            onValueChange={(tab) => onTabChange(tab as Tab)}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <ProgressTabs.Content value="phone" className="space-y-4">
                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <FormItem className="space-y-0">
                        <FormControl>
                          <RPNInput.default
                            {...field}
                            className="flex h-10 rounded-lg tracking-wider shadow-sm placeholder:tracking-wider"
                            numberInputProps={{
                              className: cn(
                                "h-10",
                                fieldState.error
                                  ? "border-destructive hover:border-destructive hover:focus-within:border-destructive focus-visible:border-destructive focus-visible:ring-destructive"
                                  : "",
                              ),
                            }}
                            inputComponent={Input}
                            placeholder="01XXX-XXXXXX"
                            countrySelectProps={{ className: "hidden" }}
                            international={false}
                            countries={["BD"]}
                            defaultCountry="BD"
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </ProgressTabs.Content>
              <ProgressTabs.Content value="otp">
                <FormField
                  name="verificationCode"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex w-full items-center justify-center">
                          <InputOTP
                            maxLength={6}
                            {...field}
                            onComplete={async () => signIn(form.getValues())}
                            className="text-lg"
                          >
                            <InputOTPGroup>
                              <InputOTPSlot
                                index={0}
                                className="size-10 sm:size-12"
                              />
                              <InputOTPSlot
                                index={1}
                                className="size-10 sm:size-12"
                              />
                              <InputOTPSlot
                                index={2}
                                className="size-10 sm:size-12"
                              />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot
                                index={3}
                                className="size-10 sm:size-12"
                              />
                              <InputOTPSlot
                                index={4}
                                className="size-10 sm:size-12"
                              />
                              <InputOTPSlot
                                index={5}
                                className="size-10 sm:size-12"
                              />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </ProgressTabs.Content>
              {(error || Object.keys(form.formState.errors).length > 0) && (
                <ul className="list-disc space-y-1 overflow-hidden rounded-lg border border-destructive/60 bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
                  {Object.values(form.formState.errors).map(
                    ({ message }, idx) => (
                      <li className="ml-4" key={idx}>
                        {message}
                      </li>
                    ),
                  )}
                  {error && <li className="ml-4">{error}</li>}
                </ul>
              )}
              <Button
                disabled={isPending || isSendingVerificationCode}
                loading={isPending}
                loader="dots"
                iconPosition="right"
                className="w-full"
                size="lg"
              >
                {isPending ? "Signing you in" : "Continue"}
              </Button>
              <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
              <Button
                size="lg"
                variant="secondary"
                type="button"
                className="w-full border dark:border-2"
                onClick={() => toast.info("Yet to be implemented.")}
                disabled={isPending || isSendingVerificationCode}
              >
                Continue with Google
              </Button>
            </form>
          </ProgressTabs>
        </Form>
      </CardContent>
    </motion.div>
  );
}
