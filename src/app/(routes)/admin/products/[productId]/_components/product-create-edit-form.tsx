"use client";

import { useForm } from "react-hook-form";
import { Form } from "~/components/ui/form";
import { createEditProductSchema, type CreateEditProductSchemaType } from "~/lib/validators";
import type { AppRouterOutputs } from "~/server/api";
import { ProductCreateEditDetailsForm } from "./product-create-edit-details-form";
import { ProductCreateEditPricingForm } from "./product-create-edit-price-form";
import { ProductCreateEditSEOForm } from "./product-create-edit-seo-form";
import { ProductCreateEditStatusForm } from "./product-create-edit-status-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProductCreateEditFormProps {
  product?: AppRouterOutputs["product"]["getById"]
}

export function ProductCreateEditForm({ product }: ProductCreateEditFormProps) {
  const router = useRouter()

  const form = useForm<CreateEditProductSchemaType>({
    defaultValues: {
      title: product?.title ?? "",
      handle: product?.handle ?? "",
      description: product?.description ?? "",
      shortDescription: product?.shortDescription ?? "",
      metaTitle: product?.metaTitle ?? "",
      metaDescription: product?.metaDescription ?? "",
      vendor: "",
      images: product?.images ?? [],
      inventory: product?.inventory ?? undefined,
      mrp: product?.mrp ? Number(product?.mrp) : undefined,
      price: product?.price ? Number(product?.price) : undefined,
      status: product?.status ?? "draft",
      tags: product?.tags as unknown as string[] ?? [],
    },
    resolver: zodResolver(createEditProductSchema),
  })

  const { mutate, isPending } = api.product.upsert.useMutation({
    onSuccess: () => {
      toast.success(`Product ${product?.id ? "updated" : "created"}`);
      router.replace("/admin/products");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    mutate({
      id: data?.id ?? "",
      title: data.title ?? "",
      handle: data.handle ?? "",
      description: data.description ?? "",
      shortDescription: data.shortDescription ?? "",
      metaDescription: data.metaDescription ?? "",
      metaTitle: data.metaTitle ?? "",
      status: data.status ?? "draft",
      vendor: data.vendor ?? "",
      tags: data.tags ?? [],
      mrp: data.mrp ?? 0,
      price: data.price ?? 0,
      inventory: data.inventory ?? undefined,
      images: data.images ?? [],
    });
  });

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="bg-card border rounded-md p-4 flex items-center justify-start flex-row-reverse gap-2 w-full">
          <Button
            size="sm"
            disabled={isPending}
            loading={isPending}
            loader="dots"
          >
            {isPending ? "Saving" : "Save"}
          </Button>
          <Link href="/admin/products">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isPending}
            >
              Discard
            </Button>
          </Link>
          <h1 className="text-lg font-medium flex-1">
            {product?.id ? "Edit" : "Create"} Product
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-4">
            <ProductCreateEditDetailsForm />
            <ProductCreateEditPricingForm />
            <ProductCreateEditSEOForm />
          </div>
          <div>
            <ProductCreateEditStatusForm />
          </div>
        </div>
      </form>
    </Form>
  );
}
