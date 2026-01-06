import { Products } from "~/components/store/products";
import { api } from "~/trpc/server";

export default async function Home() {
  const { data } = await api.product.getPublic();

  return (
    <div className="mx-auto grid w-full max-w-screen-xl p-4 lg:px-0 lg:py-8">
      <Products products={data} />
    </div>
  );
}
