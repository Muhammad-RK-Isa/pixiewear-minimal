"use client"

import {
  Box,
  ChartLine,
  GalleryVertical,
  ShoppingCart,
  StoreIcon,
  UsersRound,
} from "lucide-react"
import * as React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "~/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { CollapsibleMenuItem } from "./collapsible-menu-item"
import { TextShine } from "~/components/ui/text-shine"

export interface NavSubItem {
  title: string
  url: string
}

export interface NavItem {
  title: string
  url: string
  icon: React.ComponentType<React.ComponentProps<"svg">>
  items?: NavSubItem[]
}

export function AppSidebar() {

  const items: NavItem[] = [
    {
      title: "Dashboard",
      url: `/admin/dashboard`,
      icon: ChartLine,
    },
    {
      title: "Orders",
      url: `/admin/orders`,
      icon: ShoppingCart,
    },
    {
      title: "Products",
      url: `/admin/products`,
      icon: Box,
      items: [
        {
          title: "Inventory",
          url: `/admin/inventory`,
        },
        {
          title: "Categories",
          url: `/admin/categories`,
        },
        {
          title: "Collections",
          url: `/admin/collections`,
        },
      ]
    },
    {
      title: "Users",
      url: `/admin/users`,
      icon: UsersRound,
    },
    {
      title: "Files",
      url: `/admin/files`,
      icon: GalleryVertical,
    },
    {
      title: "Store",
      url: `/`,
      icon: StoreIcon,
    }
  ]
  const pathname = usePathname()
  return (
    <Sidebar>
      <SidebarHeader>
        <TextShine
          duration={10}
          text="Pixiewear"
          className="text-2xl uppercase font-bold transition-all mx-2.5 my-2 font-alenia"
        />
      </SidebarHeader>
      <SidebarSeparator/>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => {
              if (item.items?.length)
                return (
                  <CollapsibleMenuItem key={item.url} item={item} />
                )
              return (
                <SidebarMenuItem key={item.title}>
                  <Link
                    href={item.url}
                    prefetch={true}
                  >
                    <SidebarMenuButton tooltip={item.title} isActive={item.url === pathname}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
