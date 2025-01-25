"use client";

import { FormControl, FormField, FormInput, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useFormContext } from "react-hook-form";
import type { CreateOrderSchemaType } from "~/lib/validators";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import towns from "~/lib/towns.json";
import cities from "~/lib/cities.json";
import states from "~/lib/states.json";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function CreateOrderShippingForm() {
  const form = useFormContext<CreateOrderSchemaType>()

  const { state, city } = form.watch();

  const selectableCities = cities[state as keyof typeof cities] ?? [];
  const selectableTowns = towns[city as keyof typeof towns] ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-medium">
          Shipping
        </CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-4">
        <FormField
          name="street"
          control={form.control}
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
          name="state"
          control={form.control}
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
                    <SelectValue
                      placeholder="Select state/division"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem
                      key={state}
                      value={state}
                    >{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          name="city"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City/District</FormLabel>
              <Select
                disabled={!state}
                defaultValue={field.value}
                onValueChange={(v) => {
                  field.onChange(v);
                  form.setValue("town", "");
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        !state ? "Select division first" : "Select city"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {selectableCities.map((city) => (
                    <SelectItem
                      key={city}
                      value={city}
                    >{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          name="town"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upozila/Thana/Area</FormLabel>
              <Select
                defaultValue={field.value}
                onValueChange={field.onChange}
                disabled={!state || !city}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        !state
                          ? "Select division first"
                          : !city
                            ? "Select district first"
                            : "Select area"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {selectableTowns.map((town) => (
                    <SelectItem
                      key={town}
                      value={town}
                    >{town}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          name="postCode"
          control={form.control}
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
  )
}
