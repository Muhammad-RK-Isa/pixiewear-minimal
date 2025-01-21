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

export function CheckoutForms() {
  const router = useRouter();

  const form = useForm<CreateOrderSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      street: "",
      town: "",
      city: "",
      state: "",
      country: "",
      postCode: "",
    },
    resolver: zodResolver(createOrderSchema),
  })

  const { mutate } = api.order.create.useMutation({
    onSuccess: () => {
      router.push("/thank-you")
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  const handleSubmit = form.handleSubmit((data) => {
    mutate(data);
  })

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 lg:col-span-2 h-max"
      >
        <CreateOrderForm />
        <CreateOrderShippingForm />
        <div className="grid sm:grid-cols-2 gap-4">
          <PaymentMethod />
          <DeliveryMethod />
        </div>
      </form>
    </Form>
  )
}