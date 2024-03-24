import { Layout, Locker } from "@components";

export function LockerAdmin() {
  return (
    <Layout>
      <h1 className="text-[1.875rem] font-semibold leading-none">
        Locker Administration
      </h1>
      <p className="mt-2 text-muted-foreground">
        Manage lockers and their status.
      </p>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <div className="grid grid-cols-10 gap-8 grid-rows-10">
          {[...Array(100)].map((_, i) => (
            <Locker
              number={i}
              hasItems={i % 3 === 0}
              open={i % 7 === 0}
              tenant={i % 5 === 0 ? "John Doe" : undefined}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
