"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import type { CreateEditProductSchemaType } from "~/lib/validators";
import { products } from "~/server/db/schema/products";

export function ProductCreateEditStatusForm() {
  const form = useFormContext<CreateEditProductSchemaType>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          name="status"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="capitalize">
                    <SelectValue
                      placeholder="Select status"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {products.status.enumValues.map((status) => (
                    <SelectItem
                      key={status}
                      value={status}
                      className="capitalize"
                    >
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}