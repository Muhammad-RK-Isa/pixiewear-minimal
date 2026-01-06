import { CheckCircle2Icon } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { z } from "zod";
import Confetti from "~/components/confetti";
import { env } from "~/env";
import type { SearchParams } from "~/types";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Thank you | Pixiewear",
  description: "Thank you for your order",
};

const searchParamsSchema = z.object({
  orderId: z.string(),
});

interface ThankYouPageProps {
  searchParams: SearchParams;
}

export default async function ThankYouPage({
  searchParams,
}: ThankYouPageProps) {
  const { error } = searchParamsSchema.safeParse(await searchParams);

  if (error) {
    return redirect("/");
  }

  return (
    <div className="grid h-[60vh] place-content-center text-center">
      <CheckCircle2Icon className="mx-auto size-24 fill-green-500 stroke-background sm:mb-2" />
      <h1 className="font-bold text-2xl sm:text-4xl">Order placed</h1>
      <p className="mt-2 px-4 font-medium text-sm sm:text-base">
        Thank you for your order. We will get in touch with you shortly.
      </p>
      <Confetti className="absolute top-0 left-0 z-0 size-full" />
    </div>
  );
}
