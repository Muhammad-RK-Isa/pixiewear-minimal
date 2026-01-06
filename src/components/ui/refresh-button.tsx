"use client";

import { RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { cn } from "~/lib/utils";
import type { ButtonProps } from "./button";
import { Button } from "./button";
import { Spinner } from "./spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface RefreshButtonProps extends ButtonProps {
  showTooltip?: boolean;
}

export function RefreshButton({
  showTooltip = true,
  ...props
}: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const router = useRouter();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          disabled={isRefreshing}
          onClick={() => {
            if (typeof window === "undefined") return;
            setIsRefreshing(true);
            void router.refresh();
            setIsRefreshing(false);
          }}
          size="sm"
          variant="outline"
          {...props}
          className={cn("size-8", props.className)}
        >
          {isRefreshing ? (
            <Spinner />
          ) : (
            <RotateCw aria-hidden="true" className="size-4" />
          )}
          <span className="sr-only">Refresh the page</span>
        </Button>
      </TooltipTrigger>
      {showTooltip ? (
        <TooltipContent>
          <p>Refresh the page</p>
        </TooltipContent>
      ) : null}
    </Tooltip>
  );
}
