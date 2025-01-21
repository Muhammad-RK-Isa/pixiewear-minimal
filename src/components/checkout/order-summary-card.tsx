"use client";

import { api } from "~/trpc/react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export function OrderSummaryCard() {
  const { data: items, isRefetching } = api.cart.get.useQuery();
  
  if (!items?.length) return null;

  const subtotal = items.reduce((total, item) => {
    return total + Number(item.price) * Number(item.quantity);
  }, 0);

  return (
    <div className="rounded-lg border bg-card p-4 lg:p-6 space-y-6 shadow-sm">
      <h2 className="font-medium text-xl">Order summary</h2>
      <div className="space-y-2">
        <div className="inline-flex items-center justify-between gap-4 w-full text-sm">
          <p className="text-card-foreground/80">Subtotal ({items.length} {items.length > 1 ? "items" : "item"})</p>
          <span className="font-medium">BDT&nbsp;{subtotal.toFixed(2)}</span>
        </div>
        <div className="inline-flex items-center justify-between gap-4 w-full text-sm">
          <p className="text-card-foreground/80">Shipping</p>
          <span className="font-medium">BDT&nbsp;{(0).toFixed(2)}</span>
        </div>
        <Separator />
        <div className="inline-flex items-center justify-between gap-4 w-full text-sm">
          <p className="text-card-foreground/80">Total</p>
          <span className="font-medium">BDT&nbsp;{(subtotal).toFixed(2)}</span>
        </div>
      </div>
      <Button
        size="lg"
        className="w-full"
        disabled={isRefetching}
        loading={isRefetching}
        loader="dots"
        iconPosition="right"
      >
        {isRefetching ? "Updating details" :"Place order"}
      </Button>
    </div>
  )
}