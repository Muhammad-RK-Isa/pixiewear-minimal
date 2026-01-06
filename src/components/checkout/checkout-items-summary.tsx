"use client";

import { ChevronDownIcon } from "lucide-react";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { CartLineItems } from "./cart-line-items";

export function CheckoutItemsSummary() {
  const { data: items } = api.cart.get.useQuery();

  if (!items?.length) {
    return null;
  }

  return (
    <div className="space-y-6 overflow-hidden rounded-lg border bg-card shadow-sm">
      <Collapsible className="group/collapsible">
        <CollapsibleTrigger asChild>
          <Button
            className="h-12 w-full rounded-b-none px-4"
            size="lg"
            variant="secondary"
          >
            <span>Items Summary</span>
            <span className="ml-auto text-muted-foreground">
              Total {items?.length} {items?.length > 1 ? "items" : "item"}
            </span>
            <ChevronDownIcon className="transition-all group-data-[state=open]/collapsible:rotate-180" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="border-t">
          <div className="p-4">
            <CartLineItems isEditable={false} isScrollable items={items} />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
