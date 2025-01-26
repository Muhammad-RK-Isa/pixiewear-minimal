import Image from "next/image"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "~/lib/utils"
import { ScrollArea } from "~/components/ui/scroll-area"
import type { AppRouterOutputs } from "~/server/api"
import { ImageIcon } from "lucide-react"
import { UpdateCart } from "./update-cart"
import Link from "next/link"

interface CartLineItemsProps extends React.ComponentProps<"div"> {
  items: AppRouterOutputs["cart"]["get"]
  isScrollable?: boolean
  isEditable?: boolean
  variant?: "default" | "minimal"
  onSheetClose?: () => void
}

export function CartLineItems({
  items,
  isScrollable = true,
  isEditable = true,
  variant = "default",
  className,
  onSheetClose,
  ...props
}: CartLineItemsProps) {
  const Comp = isScrollable ? ScrollArea : Slot

  return (
    <Comp className="h-full">
      <div
        className={cn(
          "flex w-full flex-col gap-5",
          className
        )}
        {...props}
      >
        {items.map((item) => (
          <div key={item.id} className="space-y-3">
            <div
              className={cn(
                "flex items-start justify-between gap-4",
                isEditable && "flex-col xs:flex-row"
              )}
            >
              <div className="flex items-center space-x-4">
                {variant === "default" ? (
                  <Link href={`/products/${item.handle}`} onClick={onSheetClose}>
                    <div className={cn(
                      "relative aspect-square min-w-fit overflow-hidden rounded",
                      isEditable ? "size-16" : "size-12"
                    )}>
                      {item?.images?.length ? (
                        <Image
                          src={
                            item.images[0] ??
                            "/images/product-placeholder.webp"
                          }
                          alt={`${item.title} product image`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          fill
                          className="absolute object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-secondary">
                          <ImageIcon
                            className="size-4 text-muted-foreground"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>
                  </Link>
                ) : null}
                <div className="flex flex-col space-y-1 self-start">
                  <Link
                    href={`/products/${item.handle}`}
                    onClick={onSheetClose}
                  >
                    <span className="line-clamp-1 text-sm font-medium hover:underline underline-offset-2">
                      {item.title}
                    </span>
                  </Link>
                  {isEditable ? (
                    <span className="line-clamp-1 text-xs text-muted-foreground">
                      {item.price} x {item.quantity} ={" "}
                      {(Number(item.price) * Number(item.quantity)).toFixed(2)}
                    </span>
                  ) : (
                    <span className="line-clamp-1 text-xs text-muted-foreground">
                      Qty {item.quantity}
                    </span>
                  )}
                </div>
              </div>
              {isEditable ? (
                <UpdateCart cartLineItem={item} />
              ) : (
                <div className="flex flex-col space-y-1 font-medium">
                  <span className="ml-auto line-clamp-1 text-sm">
                    {(Number(item.price) * item.quantity).toFixed(2)}
                  </span>
                  <span className="line-clamp-1 text-xs text-muted-foreground">
                    {item.price} each
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Comp>
  )
}
