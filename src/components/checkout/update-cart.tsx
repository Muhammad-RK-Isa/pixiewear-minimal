"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  type UpdateCartItemSchemaType,
  updateCartItemSchema,
} from "~/lib/validators";
import type { AppRouterOutputs } from "~/server/api";
import { api } from "~/trpc/react";
import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
} from "../ui/form";

interface UpdateCartProps {
  cartLineItem: AppRouterOutputs["cart"]["get"][number];
}

export function UpdateCart({ cartLineItem }: UpdateCartProps) {
  const id = React.useId();
  const [isIncreasing, setIsIncreasing] = React.useState(false);
  const [isDecreasing, setIsDecreasing] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();

  const form = useForm<UpdateCartItemSchemaType>({
    resolver: zodResolver(updateCartItemSchema),
    defaultValues: {
      quantity: cartLineItem.quantity,
      productId: cartLineItem.id,
    },
  });

  const utils = api.useUtils();
  const { mutateAsync, isPending } = api.cart.updateCartItem.useMutation({
    onSuccess: async () => {
      await utils.cart.get.invalidate();
      router.refresh();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const watchedQuantity = form.watch("quantity");

  const handleSubmit = form.handleSubmit(async (data) => {
    if (data.quantity === cartLineItem.quantity) return;
    await mutateAsync(data);
  });

  return (
    <Form {...form}>
      <form
        className="flex w-full xs:w-auto items-center xs:justify-normal space-x-2"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-1 items-center space-x-2">
          <div className="flex w-max items-center gap-px divide-x rounded-md border">
            <Button
              className="size-8 shrink-0 rounded-r-none"
              disabled={isPending || watchedQuantity <= 1}
              id={`${id}-decrement`}
              loading={isDecreasing}
              onClick={async () => {
                setIsDecreasing(true);
                await mutateAsync(
                  {
                    productId: cartLineItem.id,
                    quantity: Math.max(1, watchedQuantity - 1),
                  },
                  {
                    onSuccess: () => {
                      setIsDecreasing(false);
                      form.setValue(
                        "quantity",
                        Math.max(1, watchedQuantity - 1)
                      );
                    },
                  }
                );
              }}
              size="icon"
              type="button"
              variant="ghost"
            >
              <MinusIcon aria-hidden="true" className="size-3" />
              <span className="sr-only">Remove one item</span>
            </Button>
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className="sr-only">Quantity</FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      className="h-8 w-14 rounded-none border-none text-center"
                      disabled={isPending}
                      onBlur={async () => {
                        if (Number(watchedQuantity) === cartLineItem.quantity)
                          return;
                        await mutateAsync({
                          productId: cartLineItem.id,
                          quantity: watchedQuantity,
                        });
                      }}
                      type="number"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="size-8 rounded-l-none"
              disabled={isPending}
              id={`${id}-increment`}
              loading={isIncreasing}
              onClick={async () => {
                setIsIncreasing(true);
                await mutateAsync(
                  {
                    productId: cartLineItem.id,
                    quantity: watchedQuantity + 1,
                  },
                  {
                    onSuccess: () => {
                      setIsIncreasing(false);
                      form.setValue("quantity", Number(watchedQuantity) + 1);
                    },
                  }
                );
              }}
              size="icon"
              type="button"
              variant="ghost"
            >
              <PlusIcon aria-hidden="true" className="size-3" />
              <span className="sr-only">Add one item</span>
            </Button>
          </div>
        </div>
        <Button
          className="size-8"
          disabled={isPending}
          icon={<Trash2Icon aria-hidden="true" className="size-3" />}
          id={`${id}-delete`}
          loading={isDeleting}
          onClick={async () => {
            setIsDeleting(true);
            await mutateAsync(
              {
                productId: cartLineItem.id,
                quantity: 0,
              },
              {
                onSuccess: async () => {
                  setIsDeleting(false);
                },
              }
            );
          }}
          size="icon"
          type="button"
          variant="outline"
        >
          <span className="sr-only">Delete item</span>
        </Button>
      </form>
    </Form>
  );
}
