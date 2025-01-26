import { Skeleton } from "~/components/ui/skeleton";
import { GallerySkeleton } from "./_components/gallery-skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-screen-xl w-full">
      <div className="grid lg:grid-cols-2 py-4 sm:py-6 lg:py-12 gap-4 sm:gap-6">
        <GallerySkeleton/>
        <div className="flex flex-col gap-1.5 sm:gap-2 px-4">
          <Skeleton className="h-8 lg:h-12 w-full" />
          <Skeleton className="h-8 lg:h-12 w-1/3 mb-1" />
          <Skeleton className="h-8 lg:h-9 w-4/5 mb-2" />
          <Skeleton className="h-10 w-2/3 mb-2 lg:mt-4" />
          <Skeleton className="h-12 w-full mb-2" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  )
}
