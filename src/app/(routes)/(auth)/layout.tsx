import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user } = await api.auth.session();

  if (user) {
    return redirect(`/`);
  }

  return (
    <div className="relative grid bg-fixed bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]">
      <div className="z-10 grid min-h-screen place-items-center p-4">
        {children}
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
  )
}