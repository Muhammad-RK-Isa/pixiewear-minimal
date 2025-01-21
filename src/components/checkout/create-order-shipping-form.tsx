"use client";

import { FormControl, FormField, FormInput, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useFormContext } from "react-hook-form";
import type { CreateOrderSchemaType } from "~/lib/validators";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";
import towns from "~/lib/towns.json";
import cities from "~/lib/cities.json";
import states from "~/lib/states.json";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import React from "react";

export function CreateOrderShippingForm() {
  const form = useFormContext<CreateOrderSchemaType>()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">
          Shipping
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 sm:pt-0 grid md:grid-cols-2 gap-4">
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
        <StateSelectForm />
        <CitySelectForm />
        <TownsSelectForm/>
        <FormField
          name="postCode"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-3.5">
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

function StateSelectForm() {
  const [open, setOpen] = React.useState(false);
  const form = useFormContext<CreateOrderSchemaType>();
  return (
    <FormField
      name="state"
      control={form.control}
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-3.5">
          <FormLabel>State/Division</FormLabel>
          <Popover
            open={open}
            onOpenChange={setOpen}
          >
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? states.find(
                      (state) => state === field.value
                    )
                    : "Select division"}
                  <ChevronsUpDownIcon className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <Command>
                <CommandInput
                  placeholder="Search division..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No division found.</CommandEmpty>
                  <CommandGroup>
                    {states.map((state) => (
                      <CommandItem
                        value={state}
                        key={state}
                        onSelect={() => {
                          form.setValue("state", state)
                          form.setValue("city", "")
                          setOpen(false)
                        }}
                      >
                        {state}
                        <CheckIcon
                          className={cn(
                            "ml-auto",
                            state === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function CitySelectForm() {
  const [open, setOpen] = React.useState(false);
  const form = useFormContext<CreateOrderSchemaType>();

  const { state } = form.watch();

  const selectableCities = cities[state as keyof typeof cities] ?? [];

  return (
    <FormField
      name="city"
      control={form.control}
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-3.5">
          <FormLabel>City/District</FormLabel>
          <Popover
            open={open}
            onOpenChange={setOpen}
          >
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                  disabled={!state}
                >
                  {field.value
                    ? selectableCities.find(
                      (city) => city === field.value
                    )
                    : "Select city"}
                  <ChevronsUpDownIcon className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <Command>
                <CommandInput
                  placeholder="Search district..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No district found.</CommandEmpty>
                  <CommandGroup>
                    {selectableCities.map((city) => (
                      <CommandItem
                        value={city}
                        key={city}
                        onSelect={() => {
                          form.setValue("city", city)
                          setOpen(false)
                        }}
                      >
                        {city}
                        <CheckIcon
                          className={cn(
                            "ml-auto",
                            city === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function TownsSelectForm() {
  const [open, setOpen] = React.useState(false);
  const form = useFormContext<CreateOrderSchemaType>();

  const { city } = form.watch();

  const selectableTowns = towns[city as keyof typeof towns] ?? [];

  return (
    <FormField
      name="town"
      control={form.control}
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-3.5">
          <FormLabel>Town/Upozila/Area</FormLabel>
          <Popover
            open={open}
            onOpenChange={setOpen}
          >
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                  disabled={!city}
                >
                  {field.value
                    ? selectableTowns.find(
                      (town) => town === field.value
                    )
                    : "Select town"}
                  <ChevronsUpDownIcon className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <Command>
                <CommandInput
                  placeholder="Search area..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No area found.</CommandEmpty>
                  <CommandGroup>
                    {selectableTowns.map((town) => (
                      <CommandItem
                        value={town}
                        key={town}
                        onSelect={() => {
                          form.setValue("town", town)
                          setOpen(false)
                        }}
                      >
                        {town}
                        <CheckIcon
                          className={cn(
                            "ml-auto",
                            city === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
