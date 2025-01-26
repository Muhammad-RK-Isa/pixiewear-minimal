import { Skeleton } from "~/components/ui/skeleton";

export function GallerySkeleton() {
  return (
    <div className="flex flex-col gap-2 sm:gap-4 overflow-hidden sm:mx-0 max-w-[calc(100vw-1rem)] mx-4">
      <Skeleton
        className="w-full aspect-square"
      />
      <div className="flex items-center gap-2 sm:space-x-4 min-w-max">
        {Array.from({ length: 7 }).map((_, idx) => (
          <Skeleton
            key={idx}
            className="size-20"
          />
        ))}
      </div>
    </div>
  )
}