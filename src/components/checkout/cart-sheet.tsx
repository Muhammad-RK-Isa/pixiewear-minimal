"use client";

import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CartLineItems } from "~/components/checkout/cart-line-items";
import { Badge } from "~/components/ui/badge";
import { Button, buttonVariants } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

export function CartSheet() {
  const [open, setOpen] = React.useState(false);

  const { data: cartLineItems } = api.cart.get.useQuery();

  const itemCount =
    cartLineItems?.reduce((total, item) => total + Number(item.quantity), 0) ??
    0;

  const cartTotal =
    cartLineItems?.reduce(
      (total, item) => total + item.quantity * Number(item.price),
      0
    ) ?? 0;

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open cart"
          className="relative"
          size="icon"
          variant="ghost"
        >
          {itemCount > 0 && (
            <Badge
              className="absolute -top-2 -right-2 size-6 justify-center rounded-full p-2.5"
              variant="secondary"
            >
              {itemCount}
            </Badge>
          )}
          <ShoppingCartIcon
            aria-hidden="true"
            className="size-4"
            strokeWidth={2.8}
          />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="space-y-2.5">
          <SheetTitle>Cart {itemCount > 0 && `(${itemCount})`}</SheetTitle>
          <Separator />
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <CartLineItems
              className="flex-1"
              items={cartLineItems ?? []}
              onSheetClose={() => setOpen(false)}
            />
            <div className="space-y-4">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{cartTotal}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    aria-label="View your cart"
                    className={buttonVariants({
                      size: "lg",
                      className: "w-full",
                    })}
                    href="/checkout"
                  >
                    Continue to checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <ShoppingCartIcon
              aria-hidden="true"
              className="mb-4 size-16 text-muted-foreground"
            />
            <div className="font-medium text-muted-foreground text-xl">
              Your cart is empty
            </div>
            <SheetTrigger asChild>
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
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
