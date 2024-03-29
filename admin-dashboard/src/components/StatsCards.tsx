import type { ReactNode } from "react";
import { DollarSign, Users, Container, Activity } from "lucide-react";
import type { Analytics } from "@types";

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";

interface StatProps {
  title: string;
  value: string;
  increment?: number;
  icon: ReactNode;
}

function Stat({ title, value, increment, icon }: StatProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {increment && (
          <p className="text-xs text-muted-foreground">
            +{increment}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}

interface StatsCardsProps {
  data: Analytics;
}

export function StatsCards({ data }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Stat
        title="Revenue"
        value={`$${new Intl.NumberFormat("es-MX").format(data.revenue.value)}`}
        increment={data.revenue.increment}
        icon={<DollarSign className="w-4 h-4 text-muted-foreground" />}
      />
      <Stat
        title="Users"
        value={`+${data.users.value}`}
        increment={data.users.increment}
        icon={<Users className="w-4 h-4 text-muted-foreground" />}
      />
      <Stat
        title="Subscriptions"
        value={`+${data.subscriptions.value}`}
        increment={data.subscriptions.increment}
        icon={<Activity className="w-4 h-4 text-muted-foreground" />}
      />
      <Stat
        title="Avaliable Lockers"
        value={data.lockers.value.toString()}
        icon={<Container className="w-4 h-4 text-muted-foreground" />}
      />
    </div>
  );
}
