import { update, push, ref } from "firebase/database";
import { db } from "@lib/firebase";
import { Plus } from "lucide-react";
import type { User } from "@types";

import { useToast } from "@components/ui/use-toast";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";

interface EditUserProps {
  lockerId: string;
  admin: string;
  users: User[];
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}

export function AssignTenant({
  lockerId,
  admin,
  users,
  dialogOpen,
  setDialogOpen,
}: EditUserProps) {
  const { toast } = useToast();

  async function handleAssignTenant(user: User) {
    await update(ref(db, `users/${user.id}`), {
      locker: lockerId,
    });

    await update(ref(db, `lockers/entries/${lockerId}`), {
      tenant: user.name,
      tenantId: user.id,
    });

    await push(ref(db, "logs"), {
      type: "Locker assigned",
      by: admin,
      message: `Assigned user ${user.id} to locker ${lockerId}`,
      timestamp: new Date().toISOString(),
    });

    setDialogOpen(false);

    toast({ title: "Tenant assigned" });
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Tenant</DialogTitle>
          <DialogDescription>Assign a tenant to this locker.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Button
                onClick={() => handleAssignTenant(user)}
                variant="outline"
                size="icon"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
