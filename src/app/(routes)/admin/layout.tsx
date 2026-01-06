import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { AppSidebar } from "~/components/admin/sidebar";
import { SidebarProvider } from "~/components/ui/sidebar";
import { api, HydrateClient } from "~/trpc/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get("x-path") ?? "/";
  const { user } = await api.auth.session();

  if (!user) {
    return redirect(`/sign-in?callbackUrl=${encodeURIComponent(pathname)}`);
  }

  if (user.role !== "admin") {
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-4">
        <h2 className="font-medium font-mono text-2xl">
          You are not authorized to access this page.
        </h2>
        <Link href="/">Go to home</Link>
      </div>
    );
  }

  void api.auth.session.prefetch();

  return (
    <SidebarProvider>
      <HydrateClient>
        <React.Suspense>
          <AppSidebar />
        </React.Suspense>
      </HydrateClient>
      {children}
    </SidebarProvider>
  );
}
