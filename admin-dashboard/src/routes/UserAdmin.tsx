import { useState, useEffect } from "react";
import { get, ref } from "firebase/database";
import { db } from "@lib/firebase";
import type { User } from "@types";

import { Layout, DataTable, CreateUser, Loading } from "@components";

export function UserAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    setLoading(true);

    const usersRef = ref(db, "users");

    get(usersRef).then((snapshot) => {
      if (!snapshot.exists()) return;

      setUsers(
        Object.entries(snapshot.val()).map(([key, value]) => ({
          ...(value as User),
          id: key,
        })),
      );

      setLoading(false);
      setRefetch(false);
    });
  }, [refetch]);

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-[1.875rem] font-semibold leading-none">
          User Administration
        </h1>
        <CreateUser />
      </div>
      <p className="mt-2 text-muted-foreground">
        Manage your users and their subscriptions.
      </p>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        {loading ? (
          <Loading />
        ) : (
          <DataTable data={users} onChanges={() => setRefetch(true)} />
        )}
      </div>
    </Layout>
  );
}
