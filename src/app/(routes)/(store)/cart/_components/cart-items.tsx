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
      <div className="h-max rounded-md border bg-card p-4 shadow-sm lg:col-span-2 lg:p-6">
        <CartLineItems items={cartLineItems} />
      </div>
    );

  return (
    <section
      aria-labelledby="cart-page-empty-cart-heading"
      className="flex h-full flex-col items-center justify-center space-y-1 pt-16 lg:col-span-3"
      id="cart-page-empty-cart"
    >
      <ShoppingCartIcon
        aria-hidden="true"
        className="mb-4 size-16 text-muted-foreground"
      />
      <div className="font-medium text-muted-foreground text-xl">
        Your cart is empty
      </div>
      <Link
        aria-label="Add items to your cart to checkout"
        className={cn(
          buttonVariants({
            variant: "link",
            size: "sm",
            className: "text-muted-foreground text-sm",
          })
        )}
        href="/"
      >
        Add some items to your cart
      </Link>
    </section>
  );
}
