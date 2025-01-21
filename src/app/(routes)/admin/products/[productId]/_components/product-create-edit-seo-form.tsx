"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { FormControl, FormField, FormInput, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import type { CreateEditProductSchemaType } from "~/lib/validators";

export function ProductCreateEditSEOForm() {
  const form = useFormContext<CreateEditProductSchemaType>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          name="metaTitle"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta title</FormLabel>
              <FormControl>
                <FormInput
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="metaDescription"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta description</FormLabel>
              <FormControl>
                <FormInput
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