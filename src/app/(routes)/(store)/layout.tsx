import { api, HydrateClient } from "~/trpc/server";
import { Navbar } from "./_components/navbar";
import { Footer } from "~/components/store/footer";
import { MetaPageViewTrigger } from "~/components/meta/meta-page-view-trigger";

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  void api.cart.get.prefetch();
  return (
    <MetaPageViewTrigger>
      <HydrateClient>
        <div className="relative min-h-screen flex flex-col">
          <Navbar />
          {children}
          <Footer />
        </div>
      </HydrateClient>
    </MetaPageViewTrigger>
  )
}