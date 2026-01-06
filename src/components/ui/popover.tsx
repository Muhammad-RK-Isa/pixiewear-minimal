"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import type * as React from "react";

import { cn } from "~/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent: React.FC<
  React.ComponentProps<typeof PopoverPrimitive.Content>
> = ({ className, align = "center", sideOffset = 4, ...props }) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      className={cn(
        "z-50 min-w-[220px] max-w-[98vw] rounded-lg border bg-popover p-2 text-fd-popover-foreground text-sm shadow-md focus-visible:outline-none data-[state=closed]:animate-popover-out data-[state=open]:animate-popover-in",
        className
      )}
      sideOffset={sideOffset}
      {...props}
    />
  </PopoverPrimitive.Portal>
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };
