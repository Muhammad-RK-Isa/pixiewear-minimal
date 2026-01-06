import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import { AddToCartForm } from "~/components/product/add-to-cart-form";
import { Gallery } from "~/components/product/gallery";
import { api } from "~/trpc/server";
import { GallerySkeleton } from "./_components/gallery-skeleton";

export async function generateMetadata(props: {
  params: Promise<{ productHandle: string }>;
}): Promise<Metadata> {
  const { productHandle } = await props.params;

  const product = await api.product.getByHandle(productHandle);

  if (!product) {
    return notFound();
  }

  const imageUrl = product.images[0]!;
  const indexable = product.status === "published";

  return {
    title: product.metaTitle ?? product.title,
    description: product.metaDescription ?? product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: imageUrl
      ? {
          images: [
            {
              url: imageUrl,
              alt: product.title,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ productHandle: string }>;
}) {
  const { productHandle } = await props.params;

  const product = await api.product.getByHandle(productHandle);

  if (!product) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images[0],
    offers: {
      "@type": "AggregateOffer",
      availability:
        product.inventory >= 1
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      priceCurrency: "BDT",
      price: product.price,
    },
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
        type="application/ld+json"
      />
      <div className="mx-auto max-w-screen-xl">
        <div className="grid gap-4 py-4 lg:grid-cols-2 lg:gap-6 lg:py-6">
          <div className="h-full w-full basis-full lg:basis-1/2">
            <React.Suspense fallback={<GallerySkeleton />}>
              <Gallery product={product} />
            </React.Suspense>
          </div>
          <div className="flex basis-full flex-col gap-1 px-4 sm:gap-2 lg:basis-2/6">
            <h1 className="font-medium text-2xl lg:text-5xl">
              {product.title}
            </h1>
            <p className="text-muted-foreground text-sm">
              {product.shortDescription}
            </p>
            <p>
              <span className="text-muted-foreground line-through">
                &#2547;{product.mrp}
              </span>
              &nbsp;
              <span className="font-medium text-2xl text-pink-500 lg:text-3xl">
                &#2547;{product.price}
              </span>
            </p>
            <div className="mt-2 lg:mt-8">
              <React.Suspense>
                <AddToCartForm product={product} />
              </React.Suspense>
            </div>
            <p className="mt-4 font-mono text-muted-foreground text-sm sm:text-base">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
