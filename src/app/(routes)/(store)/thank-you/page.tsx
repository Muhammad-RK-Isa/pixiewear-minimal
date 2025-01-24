import { CheckCircle2Icon } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import { z } from "zod";
import Confetti from "~/components/confetti";
import { env } from "~/env";
import type { SearchParams } from "~/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Thank you | Pixiewear",
  description: "Thank you for your order"
}

const searchParamsSchema = z.object({
  orderId: z.string(),
})

interface ThankYouPageProps {
  searchParams: SearchParams
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const { error } = searchParamsSchema.safeParse(await searchParams);

  if (error) {
    return redirect("/")
  }

  return (
    <div className="grid place-content-center text-center h-[60vh]">
      <CheckCircle2Icon className="fill-green-500 stroke-background size-24 mx-auto sm:mb-2" />
      <h1 className="text-2xl sm:text-4xl font-bold">Order placed</h1>
      <p className="text-sm sm:text-base font-medium mt-2 px-4">Thank you for your order. We will get in touch with you shortly.</p>
      <Confetti
        className="absolute left-0 top-0 z-0 size-full"
      />
    </div>
  )
}
