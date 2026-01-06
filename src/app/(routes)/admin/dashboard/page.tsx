import { validateRequest } from "~/server/auth/validate-request";

export default async function DashboardPage() {
  const session = await validateRequest();
  return (
    <div>
      Admin Dashboard
      <pre className="m-4 text-wrap rounded-md border bg-card p-4 text-muted-foreground">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
