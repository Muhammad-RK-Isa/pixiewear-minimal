import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import { AddToCartForm } from '~/components/product/add-to-cart-form';
import { Gallery } from '~/components/product/gallery';
import { api } from '~/trpc/server';

export async function generateMetadata(props: {
  params: Promise<{ productHandle: string }>;
}): Promise<Metadata> {
  const { productHandle } = await props.params;

  const product = await api.product.getByHandle(productHandle);

  if (!product) return notFound();

  const imageUrl = product.images[0]!;
  const indexable = product.status === "published";

  return {
    title: product.title,
    description: product.metaDescription,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: imageUrl
      ? {
        images: [
          {
            url: imageUrl,
            alt: product.title,
          }
        ]
      }
      : null
  };
}

export default async function ProductPage(props: { params: Promise<{ productHandle: string }> }) {
  const { productHandle } = await props.params;

  const product = await api.product.getByHandle(productHandle);

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.metaDescription,
    image: product.images[0],
    offers: {
      '@type': 'AggregateOffer',
      availability: product.inventory >= 1
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: "BDT",
      price: product.price,
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <div className="mx-auto max-w-screen-xl">
        <div className="grid lg:grid-cols-2 pb-6 sm:py-6 lg:py-12 gap-4 sm:gap-6 lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-1/2">
            <React.Suspense
              fallback={
                <div className="relative aspect-square h-full w-full overflow-hidden" />
              }
            >
              <Gallery product={product} />
            </React.Suspense>
          </div>
          <div className="basis-full lg:basis-2/6 px-4 flex flex-col gap-1 sm:gap-2">
            <h1 className='text-2xl lg:text-5xl font-medium'>{product.title}</h1>
            <p className='text-muted-foreground text-sm'>
              {product.shortDescription}
            </p>
            <p>
              <span className='line-through text-muted-foreground'>&#2547;{product.mrp}</span>
              &nbsp;
              <span className='text-2xl lg:text-3xl font-medium text-pink-500'>&#2547;{product.price}</span>
            </p>
            <div className='mt-2 lg:mt-8'>
              <React.Suspense>
                <AddToCartForm product={product}/>
              </React.Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
