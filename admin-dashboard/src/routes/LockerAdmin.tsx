import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "@lib/firebase";
import { useFirebaseUser } from "@hooks";
import type { User, Locker as ILocker } from "@types";

import { Layout, Locker, AssignTenant } from "@components";

export function LockerAdmin() {
  const adminUser = useFirebaseUser();
  const [users, setUsers] = useState<User[]>([]);
  const [lockers, setLockers] = useState<ILocker[]>([]);
  const [assignLockerId, setAssignLockerId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const usersRef = ref(db, "users");
    const lockersRef = ref(db, "lockers/entries");

    onValue(usersRef, (snapshot) => {
      setUsers(
        Object.entries(snapshot.val())
          .map(([key, value]) => ({
            ...(value as User),
            id: key,
          }))
          .filter((user) => !user.locker),
      );
    });

    onValue(lockersRef, (snapshot) => {
      setLockers(
        Object.entries(snapshot.val()).map(([key, value]) => ({
          ...(value as ILocker),
          id: key,
        })),
      );
    });
  }, []);

  return (
    <Layout>
      <h1 className="text-[1.875rem] font-semibold leading-none">
        Locker Administration
      </h1>
      <p className="mt-2 text-muted-foreground">
        Manage lockers and their status.
      </p>

      <div className="w-fit mt-8 mx-auto flex flex-col gap-8 lg:flex-row">
        <div className="grid grid-cols-10 gap-8 grid-rows-10">
          {lockers.map((locker) => (
            <Locker
              key={locker.id}
              id={locker.id}
              number={locker.number}
              hasItems={locker.hasItems}
              open={locker.open}
              admin={adminUser!.email!}
              onAssignTenant={(lockerId) => {
                setAssignLockerId(lockerId);
                setDialogOpen(true);
              }}
              tenant={locker.tenant}
              tenantId={locker.tenantId}
            />
          ))}
          {[...Array(99)].map((_, i) => (
            <Locker
              key={i}
              id={`demo-${i}`}
              number={i + 2}
              hasItems={i % 3 === 0}
              open={false}
              admin=""
              onAssignTenant={() => {}}
              tenant={i % 7 === 0 ? "John Doe" : undefined}
              isDemo
            />
          ))}
        </div>
      </div>
      {assignLockerId && (
        <AssignTenant
          lockerId={assignLockerId}
          admin={adminUser!.email!}
          users={users}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        />
      )}
    </Layout>
  );
}
