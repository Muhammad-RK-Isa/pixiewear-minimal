"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { FormControl, FormField, FormInput, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import type { CreateEditProductSchemaType } from "~/lib/validators";

export function ProductCreateEditDetailsForm() {
  const form = useFormContext<CreateEditProductSchemaType>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <FormInput
                  placeholder="Title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="handle"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Handle</FormLabel>
              <FormControl>
                <FormInput
                  placeholder=""
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
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
          name="shortDescription"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short description</FormLabel>
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