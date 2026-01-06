"use client";

import { useFormContext } from "react-hook-form";
import cities from "~/lib/cities.json";
import states from "~/lib/states.json";
import towns from "~/lib/towns.json";
import type { CreateOrderSchemaType } from "~/lib/validators";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function CreateOrderShippingForm() {
  const form = useFormContext<CreateOrderSchemaType>();

  const { state, city } = form.watch();

  const selectableCities = cities[state as keyof typeof cities] ?? [];
  const selectableTowns = towns[city as keyof typeof towns] ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-medium text-xl sm:text-2xl">
          Shipping
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem className="lg:col-span-2">
              <FormLabel>Street/Village</FormLabel>
              <FormControl>
                <FormInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State/Division</FormLabel>
              <Select
                defaultValue={field.value}
                onValueChange={(v) => {
                  field.onChange(v);
                  form.setValue("city", "");
                  form.setValue("town", "");
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state/division" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City/District</FormLabel>
              <Select
                defaultValue={field.value}
                disabled={!state}
                onValueChange={(v) => {
                  field.onChange(v);
                  form.setValue("town", "");
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        state ? "Select city" : "Select division first"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {selectableCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="town"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upozila/Thana/Area</FormLabel>
              <Select
                defaultValue={field.value}
                disabled={!(state && city)}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        state
                          ? city
                            ? "Select area"
                            : "Select district first"
                          : "Select division first"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {selectableTowns.map((town) => (
                    <SelectItem key={town} value={town}>
                      {town}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post/Zip code</FormLabel>
              <FormControl>
                <FormInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
