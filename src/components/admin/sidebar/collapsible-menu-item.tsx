"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "~/components/ui/sidebar";
import type { NavItem } from ".";

interface CollapsibleMenuItemProps {
  item: NavItem;
}

export function CollapsibleMenuItem({ item }: CollapsibleMenuItemProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  if (!item.items?.length) return null;
  return (
    <Collapsible
      asChild
      className="group/collapsible"
      defaultOpen={
        item.url === pathname || item.items.some((v) => v.url === pathname)
      }
      onOpenChange={(v) => {
        if (pathname !== item.url) setOpen(true);
        else setOpen(v);
      }}
      open={open}
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <Link href={item.url} prefetch={true}>
            <SidebarMenuButton
              isActive={item.url === pathname}
              tooltip={item.title}
            >
              <item.icon />
              <span>{item.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </Link>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton
                  asChild
                  isActive={subItem.url === pathname}
                >
                  <Link href={subItem.url}>
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
