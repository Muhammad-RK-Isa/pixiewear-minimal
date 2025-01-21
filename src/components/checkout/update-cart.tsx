"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react"
import * as React from "react"
import { useForm } from "react-hook-form"

import { Button } from "~/components/ui/button"
import { updateCartItemSchema, type UpdateCartItemSchemaType } from "~/lib/validators"
import type { AppRouterOutputs } from "~/server/api"
import { Form, FormControl, FormField, FormInput, FormItem, FormLabel } from "../ui/form"
import { toast } from "sonner"
import { api } from "~/trpc/react"
import { useRouter } from "next/navigation"

interface UpdateCartProps {
  cartLineItem: AppRouterOutputs["cart"]["get"][number]
}

export function UpdateCart({ cartLineItem }: UpdateCartProps) {
  const id = React.useId()
  const [isIncreasing, setIsIncreasing] = React.useState(false)
  const [isDecreasing, setIsDecreasing] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const router = useRouter()

  const form = useForm<UpdateCartItemSchemaType>({
    resolver: zodResolver(updateCartItemSchema),
    defaultValues: {
      quantity: cartLineItem.quantity,
      productId: cartLineItem.id,
    },
  })

  const utils = api.useUtils()
  const { mutateAsync, isPending } = api.cart.updateCartItem.useMutation({
    onSuccess: async () => {
      await utils.cart.get.invalidate()
      router.refresh()
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  const watchedQuantity = form.watch("quantity")

  const handleSubmit = form.handleSubmit(async (data) => {
    if (data.quantity === cartLineItem.quantity) return
    await mutateAsync(data);
  })


  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center space-x-2 xs:w-auto xs:justify-normal"
      >
        <div className="flex-1 items-center flex space-x-2">
          <div className="flex items-center divide-x rounded-md w-max gap-px border">
            <Button
              type="button"
              id={`${id}-decrement`}
              variant="ghost"
              size="icon"
              className="size-8 shrink-0 rounded-r-none"
              disabled={isPending || watchedQuantity <= 1}
              loading={isDecreasing}
              onClick={async () => {
                setIsDecreasing(true)
                await mutateAsync({
                  productId: cartLineItem.id,
                  quantity: Math.max(1, watchedQuantity - 1)
                }, {
                  onSuccess: () => {
                    setIsDecreasing(false)
                    form.setValue(
                      "quantity",
                      Math.max(1, watchedQuantity - 1)
                    )
                  }
                })
              }}
            >
              <MinusIcon className="size-3" aria-hidden="true" />
              <span className="sr-only">Remove one item</span>
            </Button>
            <FormField
              name="quantity"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className="sr-only">Quantity</FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      disabled={isPending}
                      type="number"
                      className="h-8 w-14 rounded-none border-none text-center"
                      onBlur={async () => {
                        if (watchedQuantity === cartLineItem.quantity) return
                        await mutateAsync({
                          productId: cartLineItem.id,
                          quantity: watchedQuantity,
                        })
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="button"
              id={`${id}-increment`}
              variant="ghost"
              size="icon"
              className="size-8 rounded-l-none"
              disabled={isPending}
              loading={isIncreasing}
              onClick={async () => {
                setIsIncreasing(true)
                await mutateAsync({
                  productId: cartLineItem.id,
                  quantity: watchedQuantity + 1
                }, {
                  onSuccess: () => {
                    setIsIncreasing(false)
                    form.setValue("quantity", watchedQuantity + 1)
                  }
                })
              }}
            >
              <PlusIcon className="size-3" aria-hidden="true" />
              <span className="sr-only">Add one item</span>
            </Button>
          </div>
        </div>
        <Button
          type="button"
          id={`${id}-delete`}
          variant="outline"
          size="icon"
          className="size-8"
          disabled={isPending}
          loading={isDeleting}
          icon={<Trash2Icon className="size-3" aria-hidden="true" />}
          onClick={async () => {
            setIsDeleting(true)
            await mutateAsync({
              productId: cartLineItem.id,
              quantity: 0,
            }, {
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSuccess: async () => {
                setIsDeleting(false)
              }
            })
          }}
        >
          <span className="sr-only">Delete item</span>
        </Button>
      </form>
    </Form>
  )
}
