"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type { UpdateCartItemSchemaType } from "~/lib/validators";
import { updateCartItemSchema } from "~/lib/validators";
import type { AppRouterOutputs } from "~/server/api";
import { metaAddToCart } from "~/server/pixel/meta";
import { api } from "~/trpc/react";
import { AddToCartPopUp } from "./add-to-cart-pop-up";

interface AddToCartFormProps {
  product: NonNullable<AppRouterOutputs["product"]["getByHandle"]>;
}

export function AddToCartForm({ product }: AddToCartFormProps) {
  const id = React.useId();
  const router = useRouter();
  const [isBuyingNow, setIsBuyingNow] = React.useState(false);
  const [isAddingToCart, setIsAddingToCart] = React.useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 1079px)");

  const form = useForm<UpdateCartItemSchemaType>({
    resolver: zodResolver(updateCartItemSchema),
    defaultValues: {
      quantity: 1,
      productId: product.id,
    },
  });

  const utils = api.useUtils();

  const { mutateAsync: addToCartAsync, isPending } =
    api.cart.addItem.useMutation({
      onSuccess: async () => {
        await metaAddToCart({
          id: product.id,
          name: product.title,
          price: Number.parseFloat(product.price),
          currency: "BDT",
        });
      },
    });

  async function onSubmit(data: UpdateCartItemSchemaType) {
    setIsAddingToCart(true);
    await addToCartAsync(data, {
      onSuccess: async () => {
        await utils.cart.get.invalidate();
        if (isDesktop) {
          toast.message("Product added to cart", {
            action: (
              <button
                className="ml-auto rounded-lg border bg-accent/50 p-1.5 text-xs"
                onClick={() => {
                  router.push("/cart");
                  toast.dismiss();
                }}
              >
                View Cart
              </button>
            ),
          });
          return;
        }
        setIsPopUpOpen(true);
      },
      onError: (err) => {
        toast.error(err.message);
      },
      onSettled: () => {
        setIsAddingToCart(false);
      },
    });
  }

  const { data: cartLineItems } = api.cart.get.useQuery();

  const isAddedToCart = !!cartLineItems?.find((item) => item.id === product.id);

  const quantity = useWatch({ control: form.control, name: "quantity" });

  return (
    <>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-max items-center gap-px divide-x rounded-md border">
            <Button
              className="size-10 shrink-0 rounded-r-none"
              disabled={isAddingToCart || quantity <= 1}
              id={`${id}-decrement`}
              onClick={() =>
                form.setValue(
                  "quantity",
                  Math.max(1, form.getValues("quantity") - 1)
                )
              }
              size="icon"
              type="button"
              variant="ghost"
            >
              <MinusIcon aria-hidden="true" className="size-4" />
              <span className="sr-only">Remove one item</span>
            </Button>
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className="sr-only">Quantity</FormLabel>
                  <FormControl>
                    <Input
                      className="h-10 w-16 rounded-none border-none text-center"
                      inputMode="numeric"
                      type="number"
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="size-10 shrink-0 rounded-l-none"
              disabled={isAddingToCart}
              id={`${id}-increment`}
              onClick={() =>
                form.setValue("quantity", form.getValues("quantity") + 1)
              }
              size="icon"
              type="button"
              variant="ghost"
            >
              <PlusIcon aria-hidden="true" className="size-3" />
              <span className="sr-only">Add one item</span>
            </Button>
          </div>
          <div className="space-y-4">
            <Button
              aria-label="Buy now"
              className="h-12 w-full"
              disabled={isBuyingNow || isPending}
              iconPosition="right"
              loader="dots"
              loading={isBuyingNow}
              onClick={async () => {
                setIsBuyingNow(true);
                if (isAddedToCart) {
                  setIsBuyingNow(false);
                  router.push("/checkout");
                  return;
                }
                await addToCartAsync(
                  {
                    productId: product.id,
                    quantity: form.getValues("quantity"),
                  },
                  {
                    onSuccess: async () => {
                      await utils.cart.get.invalidate();
                      router.push("/checkout");
                    },
                    onError: (err) => {
                      toast.error(err.message);
                    },
                    onSettled: () => {
                      setIsBuyingNow(false);
                    },
                  }
                );
              }}
              size="lg"
              type="button"
            >
              Buy now
            </Button>
            <Button
              aria-label="Add to cart"
              className="h-12 w-full"
              disabled={isAddingToCart || isPending}
              iconPosition="right"
              loader="dots"
              loading={isAddingToCart}
              size="lg"
              type="submit"
              variant="outline"
            >
              Add to cart
            </Button>
          </div>
        </form>
      </Form>
      <AddToCartPopUp
        onOpenChange={setIsPopUpOpen}
        open={isPopUpOpen}
        product={product}
      />
    </>
  );
}
