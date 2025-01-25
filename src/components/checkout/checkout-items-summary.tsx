"use client";

import { api } from "~/trpc/react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";
import { CartLineItems } from "./cart-line-items";
import { ChevronDownIcon } from "lucide-react";

export function CheckoutItemsSummary() {
  const { data: items } = api.cart.get.useQuery();

  if (!items?.length) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-card space-y-6 overflow-hidden shadow-sm">
      <Collapsible className="group/collapsible">
        <CollapsibleTrigger asChild>
          <Button
            size="lg"
            variant="secondary"
            className="w-full rounded-b-none h-12 px-4"
          >
            <span>Items Summary</span>
            <span className="ml-auto text-muted-foreground">
              Total {items?.length} {items?.length > 1 ? "items" : "item"}
            </span>
            <ChevronDownIcon className="group-data-[state=open]/collapsible:rotate-180 transition-all" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="border-t">
          <div className="p-4">
            <CartLineItems
              items={items}
              isScrollable
              isEditable={false}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}