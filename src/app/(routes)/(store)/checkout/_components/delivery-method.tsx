import { TruckIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/toggle-group";

export function DeliveryMethod() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Delivery Method</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup defaultValue="cod">
          <Label
            className="flex w-full items-center rounded-md border bg-accent p-4 text-accent-foreground"
            htmlFor="homeDelivery"
          >
            <RadioGroupItem
              className="hidden"
              id="homeDelivery"
              value="homeDelivery"
            />
            <TruckIcon className="mr-2 size-4" />
            Home Delivery
          </Label>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
