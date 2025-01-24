import { Spinner } from "~/components/ui/spinner";

export default function Loading() {
  return (
    <div className="grid h-[80vh] place-content-center">
      <Spinner containerClassName="mx-auto"/>
    </div>
  )
}