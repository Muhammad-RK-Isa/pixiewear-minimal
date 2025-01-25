"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CartSheet } from "~/components/checkout/cart-sheet";
import { Skeleton } from "~/components/ui/skeleton";
import { TextShine } from "~/components/ui/text-shine";

export  function Navbar() {
  const pathname = usePathname()
  const cartVisible = !["/cart", "/checkout", "/thank-you"].find(path => pathname?.startsWith(path));
  return (
    <div className="border-b w-screen px-4 py-2 sm:p-4 sticky top-0 bg-background z-50">
      <div className="mx-auto max-w-screen-xl flex flex-row-reverse items-center">
        {cartVisible ? (
          <React.Suspense fallback={<Skeleton className="size-10" />}>
            <CartSheet />
          </React.Suspense>
        ) : null}
        <Link href="/" className="mr-auto">
          <TextShine
            duration={10}
            text="Pixiewear"
            className="text-2xl uppercase font-bold transition-all mx-2.5 lg:mx-0 my-2 font-alenia"
          />
        </Link>
      </div>
    </div>
  )
}