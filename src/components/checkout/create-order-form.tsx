import { useFormContext } from "react-hook-form";
import * as RPNInput from "react-phone-number-input";
import { cn } from "~/lib/utils";
import type { CreateOrderSchemaType } from "~/lib/validators";
import {
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function CreateOrderForm() {
  const form = useFormContext<CreateOrderSchemaType>()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-medium">
          Checkout details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <FormInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email&nbsp;<span className="text-muted-foreground">(optional)</span></FormLabel>
              <FormControl>
                <FormInput
                  type="email"
                  inputMode="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <RPNInput.default
                  {...field}
                  className="flex h-10 rounded-lg tracking-wider shadow-sm placeholder:tracking-wider"
                  numberInputProps={{
                    className: cn(
                      "h-10",
                      fieldState.error
                        ? "border-destructive hover:border-destructive hover:focus-within:border-destructive focus-visible:border-destructive focus-visible:ring-destructive"
                        : "",
                    ),
                  }}
                  inputComponent={Input}
                  placeholder="01XXX-XXXXXX"
                  countrySelectProps={{ className: "hidden" }}
                  international={false}
                  countries={["BD"]}
                  defaultCountry="BD"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}