import { useState, useEffect } from "react";
import { get, ref } from "firebase/database";
import { db } from "@lib/firebase";
import type { Log } from "@types";

import { Layout, Loading } from "@components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";

export function Logs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const logsRef = ref(db, "logs");

    get(logsRef).then((snapshot) => {
      if (!snapshot.exists()) return;

      setLogs(snapshot.val());

      setLoading(false);
    });
  }, []);

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-[1.875rem] font-semibold leading-none">Logs</h1>
      </div>
      <p className="mt-2 text-muted-foreground">
        View logs of user actions and system events.
      </p>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        {loading ? (
          <Loading />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Locker</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map(({ type, user, locker, timestamp }) => (
                <TableRow key={timestamp}>
                  <TableCell className="font-medium">{type}</TableCell>
                  <TableCell>
                    {new Date(timestamp).toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>{user}</TableCell>
                  <TableCell className="text-right">
                    {locker ? (
                      locker
                    ) : (
                      <div className="text-muted-foreground">&mdash;</div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </Layout>
  );
}
