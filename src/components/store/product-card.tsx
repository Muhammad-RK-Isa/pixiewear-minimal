import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { AppRouterOutputs } from "~/server/api";

interface ProductCardProps {
  product: AppRouterOutputs["product"]["getPublic"]["data"][number];
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="w-full space-y-2 rounded-md border bg-card p-4 transition-all duration-150 ease-in-out hover:border-primary/30 hover:shadow-lg">
      <Link href={`/products/${product.handle}`}>
        <div className="relative aspect-square">
          {product.images[0] ? (
            <Image
              alt={product.title}
              className="rounded-md object-cover"
              fill
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              src={product.images[0]}
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
              <span className="text-muted-foreground line-through">
                &#2547;{product.mrp}
              </span>
              &nbsp;
              <span className="text-pink-500 text-xl">
                &#2547;{product.price}
              </span>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
