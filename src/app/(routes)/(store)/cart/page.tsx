import type { Metadata } from "next"
import React from "react";
import { env } from "~/env"
import { api, HydrateClient } from "~/trpc/server"
import { CartItems } from "./_components/cart-items";
import { CheckoutCard } from "~/components/checkout/checkout-card";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Cart",
  description: "Checkout with your cart items",
}

export default async function Cart() {
  void await api.cart.get.prefetch();
  return (
    <main className="p-4 lg:px-0 grid lg:grid-cols-3 max-w-screen-xl mx-auto gap-4">
      <HydrateClient>
        <React.Suspense>
          <CartItems />
          <CheckoutCard />
        </React.Suspense>
      </HydrateClient>
    </main>
  )
}