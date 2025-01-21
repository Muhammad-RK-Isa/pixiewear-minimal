"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { FormControl, FormField, FormInput, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import type { CreateEditProductSchemaType } from "~/lib/validators";

export function ProductCreateEditPricingForm() {
  const form = useFormContext<CreateEditProductSchemaType>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          name="mrp"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>MRP</FormLabel>
              <FormControl>
                <FormInput
                  placeholder="MRP"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="price"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <FormInput
                  placeholder="Price"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}