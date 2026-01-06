import type { AppRouterOutputs } from "~/server/api";
import { ProductCard } from "./product-card";

interface ProductsProps {
  products: AppRouterOutputs["product"]["getPublic"]["data"];
}

export function Products({ products }: ProductsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
