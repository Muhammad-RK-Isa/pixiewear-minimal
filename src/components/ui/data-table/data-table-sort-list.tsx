"use client";

import type { SortDirection, Table } from "@tanstack/react-table";
import {
  ArrowDownUp,
  Check,
  ChevronsUpDown,
  GripVertical,
  Trash2,
} from "lucide-react";
import { useQueryState } from "nuqs";
import * as React from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { dataTableConfig } from "~/config/data-table";
import { useDebouncedCallback } from "~/lib/hooks/use-debounced-callback";
import { getSortingStateParser } from "~/lib/parsers";
import { cn, toSentenceCase } from "~/lib/utils";
import type {
  ExtendedColumnSort,
  ExtendedSortingState,
  StringKeyOf,
} from "~/types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Sortable, SortableDragHandle, SortableItem } from "../sortable";

interface DataTableSortListProps<TData> {
  table: Table<TData>;
  debounceMs: number;
  shallow?: boolean;
}

export function DataTableSortList<TData>({
  table,
  debounceMs,
  shallow,
}: DataTableSortListProps<TData>) {
  const id = React.useId();

  const initialSorting = table.initialState
    .sorting as ExtendedSortingState<TData>;

  const [sorting, setSorting] = useQueryState(
    "sort",
    getSortingStateParser(table.getRowModel().rows[0]?.original)
      .withDefault(initialSorting)
      .withOptions({
        clearOnDefault: true,
        shallow,
      })
  );

  const uniqueSorting = React.useMemo(
    () =>
      sorting.filter(
        (sort, index, self) => index === self.findIndex((t) => t.id === sort.id)
      ),
    [sorting]
  );

  const debouncedSetSorting = useDebouncedCallback(setSorting, debounceMs);

  const sortableColumns = React.useMemo(
    () =>
      table
        .getAllColumns()
        .filter(
          (column) =>
            column.getCanSort() && !sorting.some((s) => s.id === column.id)
        )
        .map((column) => ({
          id: column.id,
          label: toSentenceCase(column.id),
          selected: false,
        })),
    [sorting, table]
  );

  function addSort() {
    const firstAvailableColumn = sortableColumns.find(
      (column) => !sorting.some((s) => s.id === column.id)
    );
    if (!firstAvailableColumn) return;

    void setSorting([
      ...sorting,
      {
        id: firstAvailableColumn.id as StringKeyOf<TData>,
        desc: false,
      },
    ]);
  }

  function updateSort({
    id,
    field,
    debounced = false,
  }: {
    id: string;
    field: Partial<ExtendedColumnSort<TData>>;
    debounced?: boolean;
  }) {
    const updateFunction = debounced ? debouncedSetSorting : setSorting;

    updateFunction((prevSorting) => {
      if (!prevSorting) return prevSorting;

      const updatedSorting = prevSorting.map((sort) =>
        sort.id === id ? { ...sort, ...field } : sort
      );
      return updatedSorting;
    });
  }

  function removeSort(id: string) {
    void setSorting((prevSorting) =>
      prevSorting.filter((item) => item.id !== id)
    );
  }

  return (
    <Sortable
      onValueChange={setSorting}
      overlay={
        <div className="flex items-center gap-2">
          <div className="h-8 w-[11.25rem] rounded-md bg-primary/10" />
          <div className="h-8 w-24 rounded-md bg-primary/10" />
          <div className="size-8 shrink-0 rounded-md bg-primary/10" />
          <div className="size-8 shrink-0 rounded-md bg-primary/10" />
        </div>
      }
      value={sorting}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            aria-controls={`${id}-sort-dialog`}
            aria-label="Open sorting"
            className="gap-2"
            size="sm"
            variant="outline"
          >
            <ArrowDownUp aria-hidden="true" className="size-3" />
            Sort
            {uniqueSorting.length > 0 && (
              <Badge
                className="h-[1.14rem] rounded-[0.2rem] px-[0.32rem] font-mono font-normal text-[0.65rem]"
                variant="secondary"
              >
                {uniqueSorting.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className={cn(
            "flex w-[calc(100vw-theme(spacing.20))] min-w-72 max-w-[25rem] origin-[var(--radix-popover-content-transform-origin)] flex-col p-4 sm:w-[25rem]",
            sorting.length > 0 ? "gap-3.5" : "gap-2"
          )}
          collisionPadding={16}
          id={`${id}-sort-dialog`}
        >
          {uniqueSorting.length > 0 ? (
            <h4 className="font-medium leading-none">Sort by</h4>
          ) : (
            <div className="flex flex-col gap-1">
              <h4 className="font-medium leading-none">No sorting applied</h4>
              <p className="text-muted-foreground text-sm">
                Add sorting to organize your results.
              </p>
            </div>
          )}
          <div className="flex max-h-40 flex-col gap-2 overflow-y-auto p-0.5">
            <div className="flex w-full flex-col gap-2">
              {uniqueSorting.map((sort) => {
                const sortId = `${id}-sort-${sort.id}`;
                const fieldListboxId = `${sortId}-field-listbox`;
                const fieldTriggerId = `${sortId}-field-trigger`;
                const directionListboxId = `${sortId}-direction-listbox`;

                return (
                  <SortableItem asChild key={sort.id} value={sort.id}>
                    <div className="flex items-center gap-2">
                      <Popover modal>
                        <PopoverTrigger asChild>
                          <Button
                            aria-controls={fieldListboxId}
                            className="h-8 w-44 justify-between gap-2 rounded focus:outline-none focus:ring-1 focus:ring-ring"
                            id={fieldTriggerId}
                            role="combobox"
                            size="sm"
                            variant="outline"
                          >
                            <span className="truncate">
                              {toSentenceCase(sort.id)}
                            </span>
                            <div className="ml-auto flex items-center gap-1">
                              {initialSorting.length === 1 &&
                              initialSorting[0]?.id === sort.id ? (
                                <Badge
                                  className="h-[1.125rem] rounded px-1 font-mono font-normal text-[0.65rem]"
                                  variant="secondary"
                                >
                                  Default
                                </Badge>
                              ) : null}
                              <ChevronsUpDown
                                aria-hidden="true"
                                className="size-4 shrink-0 opacity-50"
                              />
                            </div>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-[var(--radix-popover-trigger-width)] p-0"
                          id={fieldListboxId}
                          onCloseAutoFocus={() =>
                            document.getElementById(fieldTriggerId)?.focus()
                          }
                        >
                          <Command>
                            <CommandInput placeholder="Search fields..." />
                            <CommandList>
                              <CommandEmpty>No fields found.</CommandEmpty>
                              <CommandGroup>
                                {sortableColumns.map((column) => (
                                  <CommandItem
                                    key={column.id}
                                    onSelect={(value) => {
                                      const newFieldTriggerId = `${id}-sort-${value}-field-trigger`;

                                      updateSort({
                                        id: sort.id,
                                        field: {
                                          id: value as StringKeyOf<TData>,
                                        },
                                      });

                                      requestAnimationFrame(() => {
                                        document
                                          .getElementById(newFieldTriggerId)
                                          ?.focus();
                                      });
                                    }}
                                    value={column.id}
                                  >
                                    <span className="mr-1.5 truncate">
                                      {column.label}
                                    </span>
                                    <Check
                                      aria-hidden="true"
                                      className={cn(
                                        "ml-auto size-4 shrink-0",
                                        column.id === sort.id
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <Select
                        onValueChange={(value: SortDirection) =>
                          updateSort({
                            id: sort.id,
                            field: { id: sort.id, desc: value === "desc" },
                          })
                        }
                        value={sort.desc ? "desc" : "asc"}
                      >
                        <SelectTrigger
                          aria-controls={directionListboxId}
                          aria-label="Select sort direction"
                          className="h-8 w-24 rounded"
                        >
                          <div className="truncate">
                            <SelectValue />
                          </div>
                        </SelectTrigger>
                        <SelectContent
                          className="min-w-[var(--radix-select-trigger-width)]"
                          id={directionListboxId}
                        >
                          {dataTableConfig.sortOrders.map((order) => (
                            <SelectItem key={order.value} value={order.value}>
                              {order.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        aria-label={`Remove sort ${sort.id}`}
                        className="size-8 shrink-0 rounded"
                        onClick={() => removeSort(sort.id)}
                        size="icon"
                        variant="outline"
                      >
                        <Trash2 aria-hidden="true" className="size-3.5" />
                      </Button>
                      <SortableDragHandle
                        className="size-8 shrink-0 rounded"
                        size="icon"
                        variant="outline"
                      >
                        <GripVertical aria-hidden="true" className="size-3.5" />
                      </SortableDragHandle>
                    </div>
                  </SortableItem>
                );
              })}
            </div>
          </div>
          <div className="flex w-full items-center gap-2">
            <Button
              className="h-[1.85rem] rounded"
              disabled={sorting.length >= sortableColumns.length}
              onClick={addSort}
              size="sm"
            >
              Add sort
            </Button>
            {sorting.length > 0 ? (
              <Button
                className="rounded"
                onClick={() => setSorting(null)}
                size="sm"
                variant="outline"
              >
                Reset sorting
              </Button>
            ) : null}
          </div>
        </PopoverContent>
      </Popover>
    </Sortable>
  );
}
