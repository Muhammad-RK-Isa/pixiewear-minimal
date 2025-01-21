import { api, HydrateClient } from "~/trpc/server";
import { Navbar } from "./_components/navbar";

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  void api.cart.get.prefetch();
  return (
    <HydrateClient>
      <div className="relative">
        <Navbar />
        {children}
      </div>
    </HydrateClient>
  )
}