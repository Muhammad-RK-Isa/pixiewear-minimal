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
      <CardContent className="space-y-4 pt-0 sm:pt-0"> 
        <RadioGroup defaultValue="cod">
          <Label
            htmlFor="homeDelivery"
            className="flex items-center rounded-md border bg-accent text-accent-foreground p-4 w-full"
          >
            <RadioGroupItem
              value="homeDelivery"
              id="homeDelivery"
              className="hidden"
            />
            <TruckIcon className="size-4 mr-2" />
            Home Delivery
          </Label>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}