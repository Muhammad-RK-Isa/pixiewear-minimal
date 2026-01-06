"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CartSheet } from "~/components/checkout/cart-sheet";
import { Skeleton } from "~/components/ui/skeleton";
import { TextShine } from "~/components/ui/text-shine";

export function Navbar() {
  const pathname = usePathname();
  const cartVisible = !["/cart", "/checkout", "/thank-you"].find((path) =>
    pathname?.startsWith(path)
  );
  return (
    <div className="sticky top-0 z-50 w-screen border-b bg-background px-4 py-2 sm:p-4">
      <div className="mx-auto flex max-w-screen-xl flex-row-reverse items-center">
        {cartVisible ? (
          <React.Suspense fallback={<Skeleton className="size-10" />}>
            <CartSheet />
          </React.Suspense>
        ) : null}
        <Link className="mr-auto" href="/">
          <TextShine
            className="mx-2.5 my-2 font-alenia font-bold text-2xl uppercase transition-all lg:mx-0"
            duration={10}
            text="Pixiewear"
          />
        </Link>
      </div>
    </div>
  );
}
