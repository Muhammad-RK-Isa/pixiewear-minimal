import { CheckCircle2Icon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { z } from "zod";
import Confetti from "~/components/confetti";
import type { SearchParams } from "~/types";

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
    <div className="h-[80vh] lg:h-[80vh] grid place-content-center text-center">
      <CheckCircle2Icon className="fill-green-500 stroke-background size-24 mx-auto mb-4" />
      <h1 className="text-4xl font-bold">Order placed</h1>
      <p className="font-medium mt-2">Thank you for your order. We will get in touch with you shortly.</p>
      <Confetti
        className="absolute left-0 top-0 z-0 size-full"
      />
    </div>
  )
}
