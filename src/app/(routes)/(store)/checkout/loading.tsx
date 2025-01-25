import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-4 lg:px-0 grid lg:grid-cols-3 max-w-screen-xl mx-auto gap-4 w-full">
      <div className="space-y-4 w-full lg:col-span-2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-2/3 h-7 sm:h-8" />
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
              <Skeleton className="w-2/3 h-7 sm:h-8" />
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full space-y-4 sm:space-y-6">
            <FormFieldSkeleton />
            <div className="grid sm:grid-cols-2 gap-4">
              <FormFieldSkeleton />
              <FormFieldSkeleton />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormFieldSkeleton />
              <FormFieldSkeleton />
            </div>
          </CardContent>
        </Card>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-2/3 h-7 sm:h-8" />
              </CardTitle>
            </CardHeader>
            <CardContent className="w-full">
              <Skeleton className="w-full h-10"/>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-2/3 h-7 sm:h-8" />
              </CardTitle>
            </CardHeader>
            <CardContent className="w-full">
              <Skeleton className="w-full h-10"/>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-12 w-full"/>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-2/3 h-7 sm:h-8" />
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full space-y-4">
            <div className="space-y-3">
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
            <Separator className="w-full"/>
            <Skeleton className="w-full h-5" />
            </div>
            <Skeleton className="w-full h-10" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function FormFieldSkeleton() {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      <Skeleton className="h-5" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}