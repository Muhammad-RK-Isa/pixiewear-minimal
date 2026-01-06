import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto grid w-full max-w-screen-xl gap-4 p-4 lg:grid-cols-3 lg:px-0">
      <div className="w-full space-y-4 lg:col-span-2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-7 w-2/3 sm:h-8" />
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full space-y-4">
            <FormFieldSkeleton />
            <FormFieldSkeleton />
            <FormFieldSkeleton />
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-7 w-2/3 sm:h-8" />
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full space-y-4 sm:space-y-6">
            <FormFieldSkeleton />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormFieldSkeleton />
              <FormFieldSkeleton />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormFieldSkeleton />
              <FormFieldSkeleton />
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-7 w-2/3 sm:h-8" />
              </CardTitle>
            </CardHeader>
            <CardContent className="w-full">
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-7 w-2/3 sm:h-8" />
              </CardTitle>
            </CardHeader>
            <CardContent className="w-full">
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-7 w-2/3 sm:h-8" />
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full space-y-4">
            <div className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Separator className="w-full" />
              <Skeleton className="h-5 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FormFieldSkeleton() {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      <Skeleton className="h-5" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
