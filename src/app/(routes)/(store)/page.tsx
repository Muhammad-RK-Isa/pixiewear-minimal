import { Products } from "~/components/store/products";
import { api } from "~/trpc/server";

export default async function Home() {
  const { data } = await api.product.getPublic();

  return (
    <div className="w-full grid max-w-screen-xl mx-auto p-4 lg:py-8 lg:px-0">
      <Products products={data} />
    </div>
  );
}
