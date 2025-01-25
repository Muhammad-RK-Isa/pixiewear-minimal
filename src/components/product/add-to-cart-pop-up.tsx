import type { AppRouterOutputs } from "~/server/api";
import { Drawer, DrawerContent, DrawerFooter } from "../ui/drawer";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2Icon, ImageIcon } from "lucide-react";

interface AddToCartPopUpProps {
  product: NonNullable<AppRouterOutputs["product"]["getByHandle"]>
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddToCartPopUp({
  product,
  open,
  onOpenChange,
}: AddToCartPopUpProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="flex space-x-2 px-4 pt-4">
          <div className="relative aspect-square w-20 grid place-content-center rounded-md overflow-hidden">
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
              />
            ) : (
              <ImageIcon className="size-10 text-muted-foreground" />
            )}
          </div>
          <div className="space-y-1 text-sm">
            <p className="font-medium">{product.title}</p>
            <div className="inline-flex items-center gap-1 font-bold text-emerald-600">
              <CheckCircle2Icon className="size-4 fill-emerald-500 stroke-primary-foreground" />
              Added to cart
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Continue Shopping
          </Button>
          <Link href="/cart">
            <Button
              size="lg"
              className="w-full"
              onClick={() => onOpenChange(false)}
            >
              View cart
            </Button>
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}