"use client";

import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export function OrderSummaryCard() {
  const { data: items } = api.cart.get.useQuery();
  const utils = api.useUtils();
  const orderMutations = utils.order.create.isMutating();
  const verificationCodeMutations =
    utils.auth.sendVerificationCode.isMutating();
  const signInMutations = utils.auth.signIn.isMutating();

  const isPending =
    orderMutations >= 1 ||
    verificationCodeMutations >= 1 ||
    signInMutations >= 1;

  if (!items?.length) return null;

  const subtotal = items.reduce((total, item) => {
    return total + Number(item.price) * Number(item.quantity);
  }, 0);

  return (
    <div className="space-y-6 rounded-lg border bg-card p-4 shadow-sm lg:p-6">
      <h2 className="font-medium text-xl">Order summary</h2>
      <div className="space-y-2">
        <div className="inline-flex w-full items-center justify-between gap-4 text-sm">
          <p className="text-card-foreground/80">
            Subtotal ({items.length} {items.length > 1 ? "items" : "item"})
          </p>
          <span className="font-medium">BDT&nbsp;{subtotal.toFixed(2)}</span>
        </div>
        <div className="inline-flex w-full items-center justify-between gap-4 text-sm">
          <p className="text-card-foreground/80">Shipping</p>
          <span className="font-medium">BDT&nbsp;{(120).toFixed(2)}</span>
        </div>
        <Separator />
        <div className="inline-flex w-full items-center justify-between gap-4 text-sm">
          <p className="text-card-foreground/80">Total</p>
          <span className="font-medium">
            BDT&nbsp;{(subtotal + 120).toFixed(2)}
          </span>
        </div>
      </div>
      <Button
        className="w-full"
        disabled={isPending}
        iconPosition="right"
        loader="dots"
        loading={isPending}
        size="lg"
        type="submit"
      >
        {isPending ? "Processing" : "Place order"}
      </Button>
    </div>
  );
}
