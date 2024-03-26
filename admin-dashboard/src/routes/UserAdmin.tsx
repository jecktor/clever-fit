import { Layout, DataTable } from "@components";
import { Button } from "@components/ui/button";

export function UserAdmin() {
  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-[1.875rem] font-semibold leading-none">
          User Administration
        </h1>
        <Button>Add user</Button>
      </div>
      <p className="mt-2 text-muted-foreground">
        Manage your users and their subscriptions.
      </p>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <DataTable data={[]} />
      </div>
    </Layout>
  );
}
