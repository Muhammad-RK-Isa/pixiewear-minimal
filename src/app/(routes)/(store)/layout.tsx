import React from "react";
import { MetaPageViewTrigger } from "~/components/meta/meta-page-view-trigger";
import { Footer } from "~/components/store/footer";
import { api, HydrateClient } from "~/trpc/server";
import { Navbar } from "./_components/navbar";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  api.cart.get.prefetch();
  return (
    <MetaPageViewTrigger>
      <HydrateClient>
        <div className="relative flex h-svh flex-col">
          <React.Suspense
            fallback={
              <div className="sticky top-0 z-50 h-[68px] w-screen border-b bg-background px-4 py-2 sm:p-4" />
            }
          >
            <Navbar />
          </React.Suspense>
          <div className="lg:px-6">{children}</div>
          <React.Suspense>
            <Footer />
          </React.Suspense>
        </div>
      </HydrateClient>
    </MetaPageViewTrigger>
  );
}
