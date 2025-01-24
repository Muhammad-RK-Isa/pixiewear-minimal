import { api, HydrateClient } from "~/trpc/server";
import { Navbar } from "./_components/navbar";
import { Footer } from "~/components/store/footer";

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  void api.cart.get.prefetch();
  return (
    <HydrateClient>
      <div className="relative min-h-screen flex flex-col">
        <Navbar />
        {children}
        <Footer/>
      </div>
    </HydrateClient>
  )
}