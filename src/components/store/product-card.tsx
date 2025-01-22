import { ImageIcon, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import type { AppRouterOutputs } from "~/server/api";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";

interface ProductCardProps {
  product: AppRouterOutputs["product"]["getPublic"]["data"][number]
}

export function ProductCard({ product }: ProductCardProps) {

  return (
    <div className="bg-card border rounded-md p-4 space-y-2 w-full hover:border-primary/30 hover:shadow-lg transition-all duration-150 ease-in-out">
      <Link href={`/products/${product.handle}`}>
        <div className="relative aspect-square">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              fill
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              alt={product.title}
              className="rounded-md object-cover"
            />
          ) : (
            <ImageIcon className="size-full text-muted-foreground" />
          )}
        </div>
      </Link>
      <div className="space-y-2">
        <Link href={`/products/${product.handle}`}>
          <div className="space-y-1.5">
            <h2 className="font-medium text-lg">{product.title}</h2>
            <p className="font-medium">
              <span className="line-through text-muted-foreground">&#2547;{product.mrp}</span>
              &nbsp;
              <span className="text-xl">&#2547;{product.price}</span>
            </p>
          </div>
        </Link>
        <div className="inline-flex items-center space-x-2 w-full">
          <Button
            size="sm"
            className="flex-1"
          >
            Buy now
          </Button>
          <Tooltip delayDuration={150}>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="size-8"
              >
                <ShoppingCartIcon className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to cart</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}