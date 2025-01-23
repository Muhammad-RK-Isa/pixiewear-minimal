import * as React from "react";

import { cn } from "~/lib/utils";
;

const Card: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
)
Card.displayName = "Card"

const CardHeader: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col space-y-1.5 p-4 sm:p-6 sm:pb-0", className)}
    {...props}
  />
)
CardHeader.displayName = "CardHeader"

const CardTitle: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
)
CardTitle.displayName = "CardTitle"

const CardDescription: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
)
CardDescription.displayName = "CardDescription"

const CardContent: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div className={cn("p-4 sm:p-6 pt-0", className)} {...props} />
)
CardContent.displayName = "CardContent"

const CardFooter: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
)
CardFooter.displayName = "CardFooter"

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };

