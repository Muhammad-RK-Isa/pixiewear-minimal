import type * as React from "react";

import { cn } from "~/lib/utils";

const Input: React.FC<React.ComponentProps<"input">> = ({
  className,
  type,
  ...props
}) => {
  return (
    <input
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground hover:border-primary/40 hover:focus-within:border-input focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      type={type}
      {...props}
    />
  );
};
Input.displayName = "Input";

export { Input };
