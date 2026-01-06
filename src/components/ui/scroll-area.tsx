import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import type * as React from "react";
import { cn } from "~/lib/utils";

const ScrollArea: React.FC<
  React.ComponentProps<typeof ScrollAreaPrimitive.Root>
> = ({ className, children, ...props }) => (
  <ScrollAreaPrimitive.Root
    className={cn("overflow-hidden", className)}
    {...props}
  >
    {children}
    <ScrollAreaPrimitive.Corner />
    <ScrollBar orientation="vertical" />
  </ScrollAreaPrimitive.Root>
);

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollViewport: React.FC<
  React.ComponentProps<typeof ScrollAreaPrimitive.Viewport>
> = ({ className, children, ...props }) => (
  <ScrollAreaPrimitive.Viewport
    className={cn("size-full rounded-[inherit]", className)}
    {...props}
  >
    {children}
  </ScrollAreaPrimitive.Viewport>
);

ScrollViewport.displayName = ScrollAreaPrimitive.Viewport.displayName;

const ScrollBar: React.FC<
  React.ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>
> = ({ className, orientation = "vertical", ...props }) => (
  <ScrollAreaPrimitive.Scrollbar
    className={cn(
      "flex select-none data-[state=hidden]:animate-fd-fade-out",
      orientation === "vertical" && "h-full w-1.5",
      orientation === "horizontal" && "h-1.5 flex-col",
      className
    )}
    orientation={orientation}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-fd-border" />
  </ScrollAreaPrimitive.Scrollbar>
);
ScrollBar.displayName = ScrollAreaPrimitive.Scrollbar.displayName;

type ScrollAreaProps = ScrollAreaPrimitive.ScrollAreaProps;

export { ScrollArea, ScrollBar, ScrollViewport, type ScrollAreaProps };
