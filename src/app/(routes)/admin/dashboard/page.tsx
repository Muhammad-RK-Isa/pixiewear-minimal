import { validateRequest } from "~/server/auth/validate-request"

export default async function DashboardPage() {
  const session = await validateRequest();
  return (
    <div>
      Admin Dashboard
      <pre className="bg-card rounded-md border p-4 m-4 text-wrap text-muted-foreground">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  )
}