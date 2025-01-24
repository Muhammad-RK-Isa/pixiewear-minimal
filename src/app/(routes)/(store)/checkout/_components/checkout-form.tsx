"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateOrderForm } from "~/components/checkout/create-order-form";
import { CreateOrderShippingForm } from "~/components/checkout/create-order-shipping-form";
import { Form } from "~/components/ui/form";
import { createOrderSchema, type CreateOrderSchemaType } from "~/lib/validators";
import { PaymentMethod } from "./payment-method";
import { DeliveryMethod } from "./delivery-method";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CheckoutItemsSummary } from "~/components/checkout/checkout-items-summary";
import { OrderSummaryCard } from "~/components/checkout/order-summary-card";
import type { AppRouterOutputs } from "~/server/api";
import React from "react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "~/components/ui/alert-dialog";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "~/components/ui/input-otp";
import { metaCheckout } from "~/server/pixel/meta";

interface CheckoutFormProps {
  cartLineItems: AppRouterOutputs["cart"]["get"]
}

export function CheckoutForm({ cartLineItems }: CheckoutFormProps) {

  const router = useRouter();
  const [isOTPVerificationModalOpen, setIsOTPVerificationModalOpen] = React.useState(false)

  const form = useForm<CreateOrderSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      street: "",
      town: "",
      city: "",
      state: "",
      country: "Bangladesh",
      postCode: "",
      items: cartLineItems.map((itm) => ({
        productId: itm.id,
        quantity: itm.quantity,
        price: itm.price,
      })),
    },
    resolver: zodResolver(createOrderSchema),
  })

  const { mutateAsync: sendVerificationCodeSync, isPending: isSendingVerificationCode } = api.auth.sendVerificationCode.useMutation({
    onSuccess: () => {
      setIsOTPVerificationModalOpen(false)
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
  const { mutateAsync: signInSync, isPending: isSigningIn } = api.auth.signIn.useMutation({
    onSuccess: () => {
      setIsOTPVerificationModalOpen(false)
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  const { mutate: createOrder, error: orderError } = api.order.create.useMutation({
    onMutate: async () => {
      await metaCheckout({
        products: cartLineItems.map((itm) => ({
          id: itm.id,
          quantity: itm.quantity,
        })),
        total_price: cartLineItems.reduce((acc, itm) => acc + itm.price, 0),
        user: {
          email: form.getValues("email"),
          phone: form.getValues("phone"),
          firstName: form.getValues("name").split(" ")[0] ?? "",
          lastName: form.getValues("name").split(" ")[1],
          city: form.getValues("city"),
          state: form.getValues("state"),
          country: form.getValues("country"),
          zipCode: form.getValues("postCode"),
        },
        eventName: "BeginCheckout",
      })
    },
    onSuccess: async (data) => {
      await metaCheckout({
        products: cartLineItems.map((itm) => ({
          id: itm.id,
          quantity: itm.quantity,
        })),
        total_price: cartLineItems.reduce((acc, itm) => acc + itm.price, 0),
        user: {
          email: form.getValues("email"),
          phone: form.getValues("phone"),
          firstName: form.getValues("name").split(" ")[0] ?? "",
          lastName: form.getValues("name").split(" ")[1],
          city: form.getValues("city"),
          state: form.getValues("state"),
          country: form.getValues("country"),
          zipCode: form.getValues("postCode"),
        },
        eventName: "Purchase",
      })
      router.push(`/thank-you?orderId=${data.orderId}`)
    },
    onError: async (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        await sendVerificationCodeSync({
          phone: form.getValues("phone"),
        }, {
          onSuccess: () => {
            setIsOTPVerificationModalOpen(true);
          }
        })
        return;
      }
      toast.error(err.message)
    }
  })

  const handleSubmit = form.handleSubmit((data) => {
    createOrder(data);
  })

  async function onOTPComplete(v: string) {
    if (orderError?.data?.code === "UNAUTHORIZED") {
      if (orderError?.message === "PHONE_NOT_VERIFIED") {
        createOrder({
          ...form.getValues(),
          verificationCode: v,
        })
        return;
      }
      await signInSync({
        phone: form.getValues("phone"),
        verificationCode: v,
      }, {
        onSuccess: () => {
          createOrder(form.getValues())
        }
      })
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className="p-4 lg:px-0 grid lg:grid-cols-3 max-w-screen-xl mx-auto gap-4"
        >
          <div
            className="space-y-4 lg:col-span-2 h-max"
          >
            <CreateOrderForm />
            <CreateOrderShippingForm />
            <div className="grid sm:grid-cols-2 gap-4">
              <PaymentMethod />
              <DeliveryMethod />
            </div>
          </div>
          <div className="space-y-4">
            <CheckoutItemsSummary />
            <OrderSummaryCard />
          </div>
        </form>
      </Form>
      <AlertDialog
        open={isOTPVerificationModalOpen}
        onOpenChange={setIsOTPVerificationModalOpen}
      >
        <AlertDialogContent className="max-w-min">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Verify your phone number
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              We have sent a verification code to your phone number. Please enter the code below to continue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="mx-auto mt-2">
            <InputOTP
              maxLength={6}
              onComplete={onOTPComplete}
              disabled={isSendingVerificationCode || isSigningIn}
              className="text-lg"
            >
              <InputOTPGroup>
                <InputOTPSlot
                  index={0}
                  className="size-10 sm:size-12"
                />
                <InputOTPSlot
                  index={1}
                  className="size-10 sm:size-12"
                />
                <InputOTPSlot
                  index={2}
                  className="size-10 sm:size-12"
                />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot
                  index={3}
                  className="size-10 sm:size-12"
                />
                <InputOTPSlot
                  index={4}
                  className="size-10 sm:size-12"
                />
                <InputOTPSlot
                  index={5}
                  className="size-10 sm:size-12"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
