import { UserMinus } from "lucide-react";

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

export function UserAdmin() {
  return (
    <Layout>
      <h1 className="text-[1.875rem] font-semibold leading-none">
        User Administration
      </h1>
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
                <Button variant="ghost">
                  <UserMinus className="w-5 h-5" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
}
