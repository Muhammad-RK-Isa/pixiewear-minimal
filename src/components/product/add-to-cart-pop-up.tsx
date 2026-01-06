import { CheckCircle2Icon, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { AppRouterOutputs } from "~/server/api";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerFooter } from "../ui/drawer";

interface AddToCartPopUpProps {
  product: NonNullable<AppRouterOutputs["product"]["getByHandle"]>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddToCartPopUp({
  product,
  open,
  onOpenChange,
}: AddToCartPopUpProps) {
  return (
    <Drawer onOpenChange={onOpenChange} open={open}>
      <DrawerContent>
        <div className="flex space-x-2 px-4 pt-4">
          <div className="relative grid aspect-square w-20 place-content-center overflow-hidden rounded-md">
            {product.images[0] ? (
              <Image alt={product.title} fill src={product.images[0]} />
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
            className="w-full"
            onClick={() => onOpenChange(false)}
            size="lg"
            variant="outline"
          >
            Continue Shopping
          </Button>
          <Link href="/cart">
            <Button
              className="w-full"
              onClick={() => onOpenChange(false)}
              size="lg"
            >
              View cart
            </Button>
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
