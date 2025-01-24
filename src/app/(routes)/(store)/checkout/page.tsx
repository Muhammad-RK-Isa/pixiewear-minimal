import React from "react";
import { api, HydrateClient } from "~/trpc/server";
import { CheckoutForm } from "./_components/checkout-form";
import type { Metadata } from "next";
import { env } from "~/env";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Checkout",
  description: "Checkout with your selected products"
}

export default async function Checkout() {
  void await api.cart.get.prefetch();

  const cartLineItems = await api.cart.get();

  if (!cartLineItems.length) {
    return redirect("/");
  }

  return (
    <main>
      <HydrateClient>
        <CheckoutForm cartLineItems={cartLineItems} />
      </HydrateClient>
    </main>
  )
}