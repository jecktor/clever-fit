import { X, Pencil, Ellipsis } from "lucide-react";

import { Layout } from "@components";
import { Button } from "@components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

export function UserAdmin() {
  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-[1.875rem] font-semibold leading-none">
          User Administration
        </h1>
        <Button>Add user</Button>
      </div>
      <p className="mt-2 text-muted-foreground">
        Manage your users and their subscriptions.
      </p>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Subscription end date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Jimi</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Pro</TableCell>
              <TableCell>May 24, 2024</TableCell>
              <TableCell className="flex gap-4 items-center justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center gap-2 hover:cursor-pointer">
                      <Pencil className="w-4 h-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 hover:cursor-pointer">
                      <X className="w-4 h-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
}
