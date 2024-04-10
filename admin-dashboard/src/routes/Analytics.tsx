import { useState, useEffect } from "react";
import { get, ref } from "firebase/database";
import { db } from "@lib/firebase";
import { getAnalytics } from "@lib/api";
import type { Entrance, Analytics } from "@types";

import {
  Layout,
  RevenueChart,
  StatsCards,
  HoursChart,
  Loading,
} from "@components";

export function Analytics() {
  const [entrances, setEntrances] = useState<Entrance[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const date = new Date()
      .toLocaleDateString("en-US", {
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

    getAnalytics().then((data) => {
      setAnalytics(data);
      setLoading(false);
    });
  }, []);

  return (
    <Layout>
      <h1 className="text-[1.875rem] font-semibold leading-none">Analytics</h1>
      <p className="mt-2 text-muted-foreground">
        See how your business is performing.
      </p>

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="mt-8">
            <StatsCards data={analytics!} />
          </div>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row">
            <RevenueChart data={analytics!.revenue.graph} />
            <HoursChart data={entrances} />
          </div>
        </>
      )}
    </Layout>
  );
}
