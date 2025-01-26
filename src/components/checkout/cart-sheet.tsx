"use client";

import Link from "next/link"

import { cn } from "~/lib/utils"
import { Badge } from "~/components/ui/badge"
import { Button, buttonVariants } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet"
import { CartLineItems } from "~/components/checkout/cart-line-items"
import { api } from "~/trpc/react"
import { ShoppingCartIcon } from "lucide-react"
import React from "react";

export function CartSheet() {
  const [open, setOpen] = React.useState(false)

  const { data: cartLineItems } = api.cart.get.useQuery();

  const itemCount = cartLineItems?.reduce(
    (total, item) => total + Number(item.quantity),
    0
  ) ?? 0

  const cartTotal = cartLineItems?.reduce(
    (total, item) => total + item.quantity * Number(item.price),
    0
  ) ?? 0

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open cart"
          variant="ghost"
          size="icon"
          className="relative"
        >
          {itemCount > 0 && (
            <Badge
              variant="secondary"
              className="absolute -right-2 -top-2 size-6 justify-center rounded-full p-2.5"
            >
              {itemCount}
            </Badge>
          )}
          <ShoppingCartIcon strokeWidth={2.8} className="size-4" aria-hidden="true" />
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
              items={cartLineItems ?? []}
              className="flex-1"
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
                    href="/checkout"
                    className={buttonVariants({
                      size: "lg",
                      className: "w-full",
                    })}
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
              className="mb-4 size-16 text-muted-foreground"
              aria-hidden="true"
            />
            <div className="text-xl font-medium text-muted-foreground">
              Your cart is empty
            </div>
            <SheetTrigger asChild>
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
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
