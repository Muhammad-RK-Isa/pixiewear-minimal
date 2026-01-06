"use client";

import type { Table } from "@tanstack/react-table";
import { Check, Columns3 } from "lucide-react";
import * as React from "react";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn, toSentenceCase } from "~/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Tooltip>
      <Popover modal>
        <PopoverTrigger asChild>
          <TooltipTrigger asChild>
            <Button
              aria-label="Toggle columns"
              className="ml-auto flex size-8 gap-2 focus:outline-none focus:ring-1 focus:ring-ring focus-visible:ring-0"
              ref={triggerRef}
              role="combobox"
              size="icon"
              variant="outline"
            >
              <Columns3 className="size-4" />
            </Button>
          </TooltipTrigger>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-44 p-0"
          onCloseAutoFocus={() => triggerRef.current?.focus()}
        >
          <Command>
            <CommandInput placeholder="Search columns..." />
            <CommandList>
              <CommandEmpty>No columns found.</CommandEmpty>
              <CommandGroup>
                {table
                  .getAllColumns()
                  .filter(
                    (column) =>
                      typeof column.accessorFn !== "undefined" &&
                      column.getCanHide()
                  )
                  .map((column) => {
                    return (
                      <CommandItem
                        key={column.id}
                        onSelect={() =>
                          column.toggleVisibility(!column.getIsVisible())
                        }
                      >
                        <span className="truncate">
                          {toSentenceCase(column.id)}
                        </span>
                        <Check
                          className={cn(
                            "ml-auto size-4 shrink-0",
                            column.getIsVisible() ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    );
                  })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <TooltipContent>
        <p>View options</p>
      </TooltipContent>
    </Tooltip>
  );
}
