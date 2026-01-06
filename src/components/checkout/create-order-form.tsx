import { useFormContext } from "react-hook-form";
import * as RPNInput from "react-phone-number-input";
import { cn } from "~/lib/utils";
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
import { Input } from "../ui/input";

export function CreateOrderForm() {
  const form = useFormContext<CreateOrderSchemaType>();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-medium text-xl sm:text-2xl">
          Checkout details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="name"
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
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email&nbsp;
                <span className="text-muted-foreground">(optional)</span>
              </FormLabel>
              <FormControl>
                <FormInput inputMode="email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <RPNInput.default
                  {...field}
                  className="flex h-10 rounded-lg tracking-wider shadow-sm placeholder:tracking-wider"
                  countries={["BD"]}
                  countrySelectProps={{ className: "hidden" }}
                  defaultCountry="BD"
                  inputComponent={Input}
                  international={false}
                  numberInputProps={{
                    className: cn(
                      "h-10",
                      fieldState.error
                        ? "border-destructive hover:border-destructive hover:focus-within:border-destructive focus-visible:border-destructive focus-visible:ring-destructive"
                        : ""
                    ),
                  }}
                  placeholder="01XXX-XXXXXX"
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
