import { Skeleton } from "~/components/ui/skeleton";

export function GallerySkeleton() {
  return (
    <div className="mx-4 flex max-w-[calc(100vw-1rem)] flex-col gap-2 overflow-hidden sm:mx-0 sm:gap-4">
      <Skeleton className="aspect-square w-full" />
      <div className="flex min-w-max items-center gap-2 sm:space-x-4">
        {Array.from({ length: 7 }).map((_, idx) => (
          <Skeleton className="size-20" key={idx} />
        ))}
      </div>
    </div>
  );
}
