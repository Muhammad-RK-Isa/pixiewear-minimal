"use client";

import {
  ChevronsUpDown,
  LogOut,
  UserCircle2Icon,
  UserRoundIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { buttonVariants } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import { Skeleton } from "~/components/ui/skeleton";
import { Spinner } from "~/components/ui/spinner";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const { theme: currentTheme, themes, setTheme } = useTheme();

  const [isAlertOpen, setIsAlertOpen] = React.useState(false);

  const { data: session, isPending } = api.auth.session.useQuery();

  const { mutate: signOut, isPending: isSigningOut } =
    api.auth.signOut.useMutation({
      onSuccess: () => {
        setIsAlertOpen(false);
        router.push(`/sign-in?callbackUrl=${encodeURIComponent(pathname)}`);
      },
    });

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <AlertDialog onOpenChange={setIsAlertOpen} open={isAlertOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {isPending ? (
                <Skeleton className="h-12 w-60 rounded-lg" />
              ) : (
                <SidebarMenuButton
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  size="lg"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      alt={session?.user?.name ?? ""}
                      src={session?.user?.avatar ?? ""}
                    />
                    <AvatarFallback className="rounded-lg">
                      {session?.user?.name?.[0] ?? <UserCircle2Icon />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {session?.user?.name}
                    </span>
                    <span className="truncate text-xs">
                      {session?.user?.email ?? session?.user?.phone}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      alt={session?.user?.name ?? ""}
                      src={session?.user?.avatar ?? ""}
                    />
                    <AvatarFallback className="rounded-lg">
                      {session?.user?.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {session?.user?.name}
                    </span>
                    <span className="truncate text-xs">
                      {session?.user?.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/account">
                <DropdownMenuItem>
                  <UserRoundIcon />
                  Account
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <svg
                    className="text-primary"
                    fill="none"
                    height="15"
                    width="15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#a)">
                      <circle
                        cx="7.5"
                        cy="7.5"
                        r="6.443"
                        stroke="currentColor"
                        strokeWidth="1.333"
                      />
                      <path
                        d="M7.5 11.944a4.444 4.444 0 0 0 0-8.888z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path d="M0 0h15v15H0z" fill="#fff" />
                      </clipPath>
                    </defs>
                  </svg>
                  Theme
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    onValueChange={setTheme}
                    value={currentTheme}
                  >
                    {themes.map((theme) => (
                      <DropdownMenuRadioItem
                        className="capitalize"
                        key={theme}
                        value={theme}
                      >
                        {theme}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <AlertDialogTrigger asChild>
                <DropdownMenuItem>
                  <LogOut className="size-4" />
                  Sign out
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to sign out?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Your current session will be terminated.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className={cn(buttonVariants({ variant: "destructive" }))}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                {isSigningOut ? <Spinner /> : null}
                Sign out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
