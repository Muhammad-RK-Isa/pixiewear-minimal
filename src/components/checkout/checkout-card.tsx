"use client";

import Link from "next/link";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export function CheckoutCard() {
  const { data: items, isRefetching } = api.cart.get.useQuery();

  if (!items?.length) {
    return null;
  }

  const subtotal = items.reduce((total, item) => {
    return total + Number(item.price) * Number(item.quantity);
  }, 0);

  return (
    <div className="space-y-6 rounded-lg border bg-card p-4 shadow-sm lg:p-6">
      <h2 className="font-medium text-xl">Order summary</h2>
      <div className="space-y-3.5">
        <div className="inline-flex w-full items-center justify-between gap-4 text-sm">
          <p className="text-card-foreground/80">
            Subtotal ({items.length} {items.length > 1 ? "items" : "item"})
          </p>
          <span className="font-medium">BDT&nbsp;{subtotal.toFixed(2)}</span>
        </div>
        <div className="inline-flex w-full items-center justify-between gap-4 text-sm">
          <p className="text-card-foreground/80">Shipping</p>
          <span className="font-medium text-muted-foreground italic">
            Calculated on the checkout page
          </span>
        </div>
        <Separator />
        <div className="inline-flex w-full items-center justify-between gap-4 text-sm">
          <p className="text-card-foreground/80">Total</p>
          <span className="font-medium">BDT&nbsp;{subtotal.toFixed(2)}</span>
        </div>
      </div>
      <div>
        <Link href="/checkout">
          <Button
            className="w-full"
            disabled={isRefetching}
            iconPosition="right"
            loader="dots"
            loading={isRefetching}
            size="lg"
          >
            {isRefetching ? "Updating cart" : "Checkout"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
