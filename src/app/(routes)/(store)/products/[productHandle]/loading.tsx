import { Skeleton } from "~/components/ui/skeleton";
import { GallerySkeleton } from "./_components/gallery-skeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-screen-xl">
      <div className="grid gap-4 py-4 sm:gap-6 sm:py-6 lg:grid-cols-2 lg:py-12">
        <GallerySkeleton />
        <div className="flex flex-col gap-1.5 px-4 sm:gap-2">
          <Skeleton className="h-8 w-full lg:h-12" />
          <Skeleton className="mb-1 h-8 w-1/3 lg:h-12" />
          <Skeleton className="mb-2 h-8 w-4/5 lg:h-9" />
          <Skeleton className="mb-2 h-10 w-2/3 lg:mt-4" />
          <Skeleton className="mb-2 h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}
