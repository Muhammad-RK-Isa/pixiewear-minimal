"use client";

import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
  SliderThumbItem,
  useCarousel,
} from "~/components/ui/carousel";
import { cn } from "~/lib/utils";
import type { AppRouterOutputs } from "~/server/api";
import { metaViewContent } from "~/server/pixel/meta";

interface ProductImageGalleryProps {
  product: NonNullable<AppRouterOutputs["product"]["getByHandle"]>;
}

export function Gallery({ product }: ProductImageGalleryProps) {
  "use memo";

  React.useEffect(() => {
    const triggerViewContent = async () => {
      const result = await metaViewContent({
        id: product.id,
        name: product.title,
        price: Number.parseFloat(product.price),
        currency: "BDT",
      });

      console.log("VIEW_CONTENT_EVENT: ", result);
    };

    triggerViewContent();
  }, []);

  return (
    <Carousel
      className="mx-auto flex max-w-[calc(100vw-2rem)] flex-col gap-2 sm:gap-4"
      orientation="horizontal"
    >
      <div className="relative aspect-square h-max w-full overflow-hidden rounded-md border">
        <CarouselMainContainer>
          {product?.images.map((img, idx) => (
            <SliderMainItem className="relative aspect-square" key={idx}>
              <Image
                alt={`${product.title}-image-${idx + 1}`}
                aria-roledescription="slide"
                className="object-contain"
                fill
                key={idx}
                priority={idx === 0}
                role="group"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={img}
              />
            </SliderMainItem>
          ))}
        </CarouselMainContainer>
      </div>
      <CarouselThumb product={product} />
    </Carousel>
  );
}

function CarouselThumb({ product }: ProductImageGalleryProps) {
  "use memo";

  const carousel = useCarousel();

  return (
    <CarouselThumbsContainer className="basis-1/4 gap-2 sm:gap-4">
      {product?.images.map((img, idx) => (
        <SliderThumbItem
          className={cn(
            "relative size-20 max-w-max cursor-pointer overflow-hidden rounded-md border p-0 transition-all",
            carousel.activeIndex === idx ? "border-primary/50" : "border-border"
          )}
          index={idx}
          key={idx}
        >
          <Image
            alt={`${product.title}-image-${idx + 1}`}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={img}
          />
        </SliderThumbItem>
      ))}
    </CarouselThumbsContainer>
  );
}
