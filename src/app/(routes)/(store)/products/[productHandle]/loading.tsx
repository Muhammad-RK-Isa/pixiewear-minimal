import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-screen-xl w-full">
      <div className="grid lg:grid-cols-2 py-4 sm:py-6 lg:py-12 gap-4 sm:gap-6">
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