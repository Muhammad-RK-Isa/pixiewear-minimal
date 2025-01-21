import React from "react";
import { ProductCreateEditForm } from "./_components/product-create-edit-form";
import { api } from "~/trpc/server";

interface ProductPageProps {
  params: Promise<{
    productId: string
  }>
}

export default async function Product({ params }: ProductPageProps) {
  const { productId } = await params;

  const product = productId === "create"
    ? undefined
    : await api.product.getById(productId);

  return (
    <div className="mx-auto w-full max-w-screen-lg p-4 lg:p-8">
      <React.Suspense>
        <ProductCreateEditForm product={product} />
      </React.Suspense>
    </div>
  )
}
