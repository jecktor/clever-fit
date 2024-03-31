import { update, ref } from "firebase/database";
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
  users: User[];
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}

export function AssignTenant({
  lockerId,
  users,
  dialogOpen,
  setDialogOpen,
}: EditUserProps) {
  const { toast } = useToast();

  function handleAssignTenant(userId: string, userName: string) {
    update(ref(db, `users/${userId}`), {
      locker: lockerId,
    });

    update(ref(db, `lockers/entries/${lockerId}`), {
      tenant: userName,
      tenantId: userId,
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
                onClick={() => handleAssignTenant(user.id, user.name)}
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
