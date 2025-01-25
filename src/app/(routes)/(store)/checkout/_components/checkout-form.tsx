/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CheckoutItemsSummary } from "~/components/checkout/checkout-items-summary";
import { CreateOrderForm } from "~/components/checkout/create-order-form";
import { CreateOrderShippingForm } from "~/components/checkout/create-order-shipping-form";
import { OrderSummaryCard } from "~/components/checkout/order-summary-card";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "~/components/ui/alert-dialog";
import { Form } from "~/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "~/components/ui/input-otp";
import { createOrderSchema, type CreateOrderSchemaType } from "~/lib/validators";
import type { AppRouterOutputs } from "~/server/api";
import { metaCheckout } from "~/server/pixel/meta";
import { api } from "~/trpc/react";
import { DeliveryMethod } from "./delivery-method";
import { PaymentMethod } from "./payment-method";
import { Button } from "~/components/ui/button";

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

  const trpcUtils = api.useUtils()


  React.useEffect(() => {
    const triggerInitiateCheckout = async () => {
      await trpcUtils.auth.session.fetch().then(async ({ user }) => {
        await metaCheckout({
          products: cartLineItems.map((itm) => ({
            id: itm.id,
            quantity: itm.quantity,
          })),
          total_price: cartLineItems.reduce((acc, itm) => acc + itm.price, 0),
          user: {
            email: user?.email ?? "",
            phone: user?.phone ?? "",
            firstName: user?.name?.split(" ")[0] ?? "",
            lastName: user?.name?.split(" ")[1],
            country: "Bangladesh",
          },
          eventName: "InitiateCheckout",
        })
      }
      )
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    triggerInitiateCheckout()
  }, [])

  const isInitialRender = React.useRef(true);

  React.useEffect(() => {
    /**
     * In the dev environment, the rendering happens twice.
     * Hence, the logic becomes obsolete in the dev environment.
     * But, it works perfectly in the prod. */
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (!isOTPVerificationModalOpen) {
      form.setFocus("phone");
    }
  }, [isOTPVerificationModalOpen]);

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
        onOpenChange={(isOpen) => {
          setIsOTPVerificationModalOpen(isOpen);
          if (!isOpen) {
            form.setFocus("phone");
          }
        }}
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
          <div className="mx-auto space-y-4">
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
            <Button
              size="lg"
              variant="secondary"
              className="w-full "
              onClick={() => setIsOTPVerificationModalOpen(false)}
            >
              Edit phone number
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
