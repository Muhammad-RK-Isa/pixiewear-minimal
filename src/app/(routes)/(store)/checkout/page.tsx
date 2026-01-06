import type { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import { env } from "~/env";
import { api, HydrateClient } from "~/trpc/server";
import { CheckoutForm } from "./_components/checkout-form";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Checkout",
  description: "Checkout with your selected products",
};

export default async function Checkout() {
  await api.cart.get.prefetch();

  const cartLineItems = await api.cart.get();

  if (!cartLineItems.length) {
    return redirect("/");
  }

  return (
    <main>
      <HydrateClient>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CheckoutForm cartLineItems={cartLineItems} />
        </React.Suspense>
      </HydrateClient>
    </main>
  );
}
