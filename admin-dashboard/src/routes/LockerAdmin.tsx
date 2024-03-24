import { Layout } from "@components";

export function LockerAdmin() {
  return (
    <Layout>
      <h1 className="text-[1.875rem] font-semibold leading-none">
        Locker Administration
      </h1>
      <p className="mt-2 text-muted-foreground">
        Manage lockers and their status.
      </p>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row"></div>
    </Layout>
  );
}
