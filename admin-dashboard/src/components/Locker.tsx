import { UserPlus, UserMinus, LockOpen } from "lucide-react";

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
  number: number;
  hasItems: boolean;
  open: boolean;
  tenant?: string;
}

export function Locker({ number, hasItems, open, tenant }: LockerProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
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
            {tenant && <TooltipContent>{tenant}</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 hover:cursor-pointer">
          <LockOpen className="w-4 h-4" />
          Open
        </DropdownMenuItem>
        {tenant ? (
          <DropdownMenuItem className="flex items-center gap-2 hover:cursor-pointer">
            <UserMinus className="w-4 h-4" />
            Remove tenant
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="flex items-center gap-2 hover:cursor-pointer">
            <UserPlus className="w-4 h-4" />
            Assign tenant
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
