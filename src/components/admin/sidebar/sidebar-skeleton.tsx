import { Skeleton } from "~/components/ui/skeleton";

export function SidebarSkeleton() {
  return (
    <div className="lg:flex flex-col gap-2 border-r w-64 hidden">
      <div className="border-b h-16 py-4 px-2">
        <Skeleton className="w-full h-10" />
      </div>
      <div className="gap-1 flex flex-col px-2">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Skeleton key={idx} className="w-full h-8" />
        ))}
      </div>
      <div className="mt-auto px-2">
        <Skeleton className="w-60 h-12 rounded-lg" />
      </div>
    </div>
  )
}