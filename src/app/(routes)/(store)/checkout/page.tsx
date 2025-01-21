import React from "react";
import { OrderSummaryCard } from "~/components/checkout/order-summary-card";
import { api, HydrateClient } from "~/trpc/server";
import { CheckoutForms } from "./_components/checkout-forms";
import { CheckoutItemsSummary } from "~/components/checkout/checkout-items-summary";
import type { Metadata } from "next";
import { env } from "~/env";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Checkout | Pixiewear",
  description: "Checkout with your selected products"
}

export default async function Checkout() {
  void await api.cart.get.prefetch();
  return (
    <main className="p-4 lg:px-0 grid lg:grid-cols-3 max-w-screen-xl mx-auto gap-4">
      <HydrateClient>
        <React.Suspense>
          <CheckoutForms />
          <div className="space-y-4">
            <CheckoutItemsSummary />
            <OrderSummaryCard />
          </div>
        </React.Suspense>
      </HydrateClient>
    </main>
  )
}