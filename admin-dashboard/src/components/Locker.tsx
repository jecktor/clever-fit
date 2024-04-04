import { update, push, ref } from "firebase/database";
import { db } from "@lib/firebase";
import { UserPlus, UserMinus, LockOpen } from "lucide-react";

import { useToast } from "@components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";

interface LockerProps {
  id: string;
  number: number;
  hasItems: boolean;
  open: boolean;
  admin: string;
  onAssignTenant: (lockerId: string) => void;
  tenant?: string;
  tenantId?: string;
  isDemo?: boolean;
}

export function Locker({
  id,
  number,
  hasItems,
  open,
  admin,
  onAssignTenant,
  tenant,
  tenantId,
  isDemo = false,
}: LockerProps) {
  const { toast } = useToast();

  async function handleOpen() {
    if (isDemo) return;

    await update(ref(db, `lockers/entries/${id}`), {
      open: true,
    });

    await push(ref(db, "logs"), {
      type: "Locker opened",
      by: admin,
      message: `Opened locker ${id}`,
      timestamp: new Date().toISOString(),
    });
  }

  async function handleRemoveTenant() {
    if (isDemo) return;

    if (hasItems) {
      toast({
        title: "Locker has items",
        description: "Please remove items before removing tenant.",
      });

      return;
    }

    await update(ref(db, `lockers/entries/${id}`), {
      tenant: null,
      tenantId: null,
    });

    await update(ref(db, `users/${tenantId}`), {
      locker: null,
    });

    await push(ref(db, "logs"), {
      type: "Locker unassigned",
      by: admin,
      message: `Unassigned user ${tenantId} from locker ${id}`,
      timestamp: new Date().toISOString(),
    });

    toast({ title: "Tenant removed" });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`rounded-lg w-12 h-12 grid place-items-center shadow-md text-background ${
                  open
                    ? "bg-teal-500"
                    : tenant
                      ? "bg-muted-foreground"
                      : "bg-foreground"
                } ${hasItems ? "border-2 border-pink-600" : ""}`}
              >
                {number}
              </div>
            </TooltipTrigger>
            <TooltipContent>{id}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{tenant ? tenant : "Actions"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleOpen}
          className="flex items-center gap-2 hover:cursor-pointer"
        >
          <LockOpen className="w-4 h-4" />
          Open
        </DropdownMenuItem>
        {tenant ? (
          <DropdownMenuItem
            onClick={handleRemoveTenant}
            className="flex items-center gap-2 hover:cursor-pointer"
          >
            <UserMinus className="w-4 h-4" />
            Remove tenant
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => onAssignTenant(id)}
            className="flex items-center gap-2 hover:cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            Assign tenant
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
