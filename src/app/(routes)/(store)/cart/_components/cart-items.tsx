"use client";

import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { CartLineItems } from "~/components/checkout/cart-line-items";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

export function CartItems() {
  const { data: cartLineItems } = api.cart.get.useQuery();

  if (cartLineItems?.length)
    return (
      <div className="rounded-md border bg-card p-4 lg:p-6 lg:col-span-2 h-max shadow-sm">
        <CartLineItems items={cartLineItems} />
      </div>
    )

  return (
    <section
      id="cart-page-empty-cart"
      aria-labelledby="cart-page-empty-cart-heading"
      className="flex h-full flex-col items-center justify-center space-y-1 pt-16 lg:col-span-3"
    >
      <ShoppingCartIcon
        className="mb-4 size-16 text-muted-foreground"
        aria-hidden="true"
      />
      <div className="text-xl font-medium text-muted-foreground">
        Your cart is empty
      </div>
      <Link
        aria-label="Add items to your cart to checkout"
        href="/"
        className={cn(
          buttonVariants({
            variant: "link",
            size: "sm",
            className: "text-sm text-muted-foreground",
          })
        )}
      >
        Add some items to your cart
      </Link>
    </section>
  )
}