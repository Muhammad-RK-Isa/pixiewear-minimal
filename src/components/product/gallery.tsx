"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
  SliderThumbItem,
  useCarousel,
} from "~/components/ui/carousel";
import { cn } from "~/lib/utils";
import React from "react";
import type { AppRouterOutputs } from "~/server/api";
import { metaViewContent } from "~/server/pixel/meta";

interface ProductImageGalleryProps {
  product: NonNullable<AppRouterOutputs["product"]["getByHandle"]>
}

export function Gallery({ product }: ProductImageGalleryProps) {
  "use memo";

  React.useEffect(() => {
    const triggerViewContent = async () => {
      const result = await metaViewContent({
        id: product.id,
        name: product.title,
        price: parseFloat(product.price),
        currency: "BDT",
      })

      console.log("VIEW_CONTENT_EVENT: ", result);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    triggerViewContent()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Carousel
      orientation="horizontal"
      className="flex flex-col gap-2 sm:gap-4 max-w-[100vw]"
    >
      <div className="relative border overflow-hidden aspect-square w-full h-max sm:rounded-md">
        <CarouselMainContainer>
          {product?.images.map((img, idx) => (
            <SliderMainItem key={idx} className="relative aspect-square">
              <Image
                src={img}
                alt={`${product.title}-image-${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
              />
            </SliderMainItem>
          ))}
        </CarouselMainContainer>
      </div>
      <CarouselThumb product={product} />
    </Carousel >
  );
}

function CarouselThumb({ product }: ProductImageGalleryProps) {
  "use memo";

  const carousel = useCarousel()

  return (
    <CarouselThumbsContainer className="basis-1/4 gap-2 sm:gap-4">
      {product?.images.map((img, idx) => (
        <SliderThumbItem
          key={idx}
          index={idx}
          className={cn(
            "border overflow-hidden relative size-20 max-w-max cursor-pointer transition-all p-0 sm:rounded-md",
            carousel.activeIndex === idx ? "border-primary/50" : "border-border"
          )}
        >
          <Image
            src={img}
            alt={`${product.title}-image-${idx + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </SliderThumbItem>
      ))}
    </CarouselThumbsContainer>
  )
}
