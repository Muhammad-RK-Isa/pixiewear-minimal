import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/toggle-group";

export function PaymentMethod() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Payment Method</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
            <svg
              fillRule="evenodd"
              id="Layer_1"
              data-name="Layer 1"
              className="size-4 mr-2 fill-primary"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 107.19"><defs><style>.cls-1</style></defs><title>hand-money</title><path className="cls-1" d="M25.11,93.69V54.91H42.56c7.43,1.31,14.79,5.31,22.19,10H78.3c6.14.37,9.35,6.59,3.39,10.67-4.75,3.49-11,3.29-17.46,2.72-4.43-.22-4.62,5.72,0,5.75,1.61.13,3.36-.25,4.88-.25,8,0,14.63-1.54,18.67-7.88l2-4.74,20.2-10c10.09-3.32,17.27,7.23,9.83,14.57A263.86,263.86,0,0,1,74.89,102.2c-11.13,6.77-22.26,6.54-33.36,0L25.11,93.69ZM50.61,0l65.12,19.66-9.79,34.18-4.58-.7,7-25,.1-.32a4.47,4.47,0,0,0-3.12-5.48l-2.2-.6,0-.07L92.78,18.93,49.13,5.15,50.61,0ZM39.84,6.9,105,26.55,95.17,60.73,30.05,41.08,39.84,6.9ZM62.53,28.66a8.09,8.09,0,1,1,.34,11.42,8.09,8.09,0,0,1-.34-11.42ZM49.34,15.24,92.43,28.6A5.26,5.26,0,0,0,96,35.09L92.18,48.61a5.25,5.25,0,0,0-6.49,3.61L42.59,38.86A5.26,5.26,0,0,0,39,32.37l3.86-13.52a5.25,5.25,0,0,0,6.5-3.61ZM0,51.22H19.86V97.59H0V51.22Z" /></svg>
            Cash On Delivery
          </Label>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}