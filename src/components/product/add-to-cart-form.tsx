"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import type { UpdateCartItemSchemaType } from "~/lib/validators"
import { updateCartItemSchema } from "~/lib/validators"
import { MinusIcon, PlusIcon } from "lucide-react"
import { api } from "~/trpc/react"
import { AddToCartPopUp } from "./add-to-cart-pop-up"
import type { AppRouterOutputs } from "~/server/api"
import { useMediaQuery } from "usehooks-ts"

interface AddToCartFormProps {
  product: NonNullable<AppRouterOutputs["product"]["getByHandle"]>
}

export function AddToCartForm({ product }: AddToCartFormProps) {
  const id = React.useId()
  const router = useRouter()
  const [isBuyingNow, setIsBuyingNow] = React.useState(false)
  const [isAddingToCart, setIsAddingToCart] = React.useState(false)
  const [isPopUpOpen, setIsPopUpOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 1079px)")

  const form = useForm<UpdateCartItemSchemaType>({
    resolver: zodResolver(updateCartItemSchema),
    defaultValues: {
      quantity: 1,
      productId: product.id,
    },
  })

  const utils = api.useUtils()

  const { mutateAsync: addToCartAsync } = api.cart.addItem.useMutation({

  })

  async function onSubmit(data: UpdateCartItemSchemaType) {
    setIsAddingToCart(true)
    await addToCartAsync(data, {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSuccess: async () => {
        await utils.cart.get.invalidate()
        if (isDesktop) {
          toast.message("Product added to cart", {          
            action: (
              <button
                className="rounded-lg border p-1.5 ml-auto bg-accent/50 text-xs"
                onClick={() => {
                  router.push("/cart");
                  toast.dismiss()
                }}
              > 
                View Cart
              </button>
            ),
          })
          return
        }
        setIsPopUpOpen(true)
      },
      onError: (err) => {
        toast.error(err.message)
      },
      onSettled: () => {
        setIsAddingToCart(false)
      }
    });
  }

  return (
    <>
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex items-center divide-x rounded-md border w-max gap-px">
          <Button
            id={`${id}-decrement`}
            type="button"
            variant="ghost"
            size="icon"
            className="size-10 shrink-0 rounded-r-none"
            onClick={() =>
              form.setValue(
                "quantity",
                Math.max(0, form.getValues("quantity") - 1)
              )
            }
            disabled={isAddingToCart}
          >
            <MinusIcon className="size-4" aria-hidden="true" />
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
                    type="number"
                    inputMode="numeric"
                    className="h-10 w-16 rounded-none border-none text-center"
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            id={`${id}-increment`}
            type="button"
            variant="ghost"
            size="icon"
            className="size-10 shrink-0 rounded-l-none"
            onClick={() =>
              form.setValue("quantity", form.getValues("quantity") + 1)
            }
            disabled={isAddingToCart}
          >
            <PlusIcon className="size-3" aria-hidden="true" />
            <span className="sr-only">Add one item</span>
          </Button>
        </div>
        <div className="space-y-2">
          <Button
            type="button"
            aria-label="Buy now"
            size="lg"
            className="w-full h-12"
            onClick={async () => {
              setIsBuyingNow(true)
              await addToCartAsync({
                productId: product.id,
                quantity: form.getValues("quantity"),
              }, {
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSuccess: async () => {
                  await utils.cart.get.invalidate();
                  router.push("/cart")
                },
                onError: (err) => {
                  toast.error(err.message)
                },
                onSettled: () => {
                  setIsBuyingNow(false)
                }
              })
            }}
            disabled={isBuyingNow}
            loader="dots"
            iconPosition="right"
            loading={isBuyingNow}
          >
            Buy now
          </Button>
          <Button
            aria-label="Add to cart"
            type="submit"
            variant="outline"
            size="lg"
            className="w-full h-12"
            disabled={isAddingToCart}
            loading={isAddingToCart}
            loader="dots"
            iconPosition="right"
          >
            Add to cart
          </Button>
        </div>
      </form>
      </Form>
      <AddToCartPopUp
        open={isPopUpOpen}
        onOpenChange={setIsPopUpOpen}
        product={product}
      />
    </>
  )
}
