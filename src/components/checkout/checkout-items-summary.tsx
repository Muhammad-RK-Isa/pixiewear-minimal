"use client";

import { api } from "~/trpc/react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";
import { CartLineItems } from "./cart-line-items";
import { ChevronDownIcon } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

export function CheckoutItemsSummary() {
  const isDesktop = useMediaQuery("(min-width: 1079px)");
  const { data: items } = api.cart.get.useQuery();

  if (!items?.length) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-card space-y-6 overflow-hidden shadow-sm">
      <Collapsible defaultOpen={isDesktop}>
        <CollapsibleTrigger asChild>
          <Button
            size="lg"
            variant="secondary"
            className="w-full rounded-b-none h-12 px-4"
          >
            <span>View Items</span>
            <span className="ml-auto text-muted-foreground">
              Total {items?.length} {items?.length > 1 ? "items" : "item"}
            </span>
            <ChevronDownIcon />
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