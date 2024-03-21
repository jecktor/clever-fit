import { Layout, RevenueChart, SubsChart, HoursChart } from "@components";

export function Analytics() {
  return (
    <Layout>
      <h1 className="text-[1.875rem] font-semibold leading-none">Analytics</h1>
      <p className="mt-2 text-muted-foreground">
        See how your business is performing.
      </p>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <RevenueChart />
        <SubsChart />
      </div>

      <div className="mt-8">
        <HoursChart />
      </div>
    </Layout>
  );
}
