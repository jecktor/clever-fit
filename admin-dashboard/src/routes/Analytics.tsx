import { useState, useEffect } from "react";
import { get, ref } from "firebase/database";
import { db } from "@lib/firebase";
import type { Entrance } from "@types";

import { Layout, RevenueChart, StatsCards, HoursChart } from "@components";

export function Analytics() {
  const [entrances, setEntrances] = useState<Entrance[]>([]);

  useEffect(() => {
    const date = new Date()
      .toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-");

    const entrancesRef = ref(db, `entrances/${date}`);

    get(entrancesRef).then((snapshot) => {
      if (!snapshot.exists()) return;

      const entrancesData = snapshot.val();

      setEntrances(
        // @ts-expect-error object entries
        Object.entries(entrancesData).map(([hour, entrances]) => ({
          hour: parseInt(hour),
          entrances,
        })),
      );
    });
  }, []);

  return (
    <Layout>
      <h1 className="text-[1.875rem] font-semibold leading-none">Analytics</h1>
      <p className="mt-2 text-muted-foreground">
        See how your business is performing.
      </p>

      <div className="mt-8">
        <StatsCards />
      </div>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <RevenueChart />
        <HoursChart data={entrances} />
      </div>
    </Layout>
  );
}
