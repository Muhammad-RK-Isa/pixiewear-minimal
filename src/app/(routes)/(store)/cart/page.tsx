import type { Metadata } from "next";
import React from "react";
import { CheckoutCard } from "~/components/checkout/checkout-card";
import { env } from "~/env";
import { api, HydrateClient } from "~/trpc/server";
import { CartItems } from "./_components/cart-items";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Cart",
  description: "Checkout with your cart items",
};

export default async function Cart() {
  void (await api.cart.get.prefetch());
  return (
    <main className="mx-auto grid max-w-screen-xl gap-4 p-4 lg:grid-cols-3 lg:px-0">
      <HydrateClient>
        <React.Suspense>
          <CartItems />
          <CheckoutCard />
        </React.Suspense>
      </HydrateClient>
    </main>
  );
}
