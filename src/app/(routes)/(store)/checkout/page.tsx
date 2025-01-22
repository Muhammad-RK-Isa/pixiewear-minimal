import React from "react";
import { api, HydrateClient } from "~/trpc/server";
import { CheckoutForm } from "./_components/checkout-form";
import type { Metadata } from "next";
import { env } from "~/env";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Checkout | Pixiewear",
  description: "Checkout with your selected products"
}

export default async function Checkout() {
  void await api.cart.get.prefetch();

  const cartLineItemsPromise = api.cart.get();
  return (
    <main >
      <HydrateClient>
        <CheckoutForm itemsPromise={cartLineItemsPromise} />
      </HydrateClient>
    </main>
  )
}