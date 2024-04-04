export interface User {
  id: string;
  name: string;
  email: string;
  locker: string;
  subscription?: {
    plan: "Basic" | "Pro";
    currentPeriodEnd: string;
  };
}

export interface Locker {
  id: string;
  hasItems: boolean;
  number: number;
  open: boolean;
  tenant: string;
  tenantId: string;
}

export interface Entrance {
  hour: string;
  entrances: number;
}

export interface Analytics {
  revenue: {
    value: number;
    increment: number;
    graph: [{ prevMonth: number; thisMonth: number }];
  };
  users: {
    value: number;
    increment: number;
  };
  subscriptions: {
    value: number;
    increment: number;
  };
  lockers: {
    value: number;
  };
}

export interface Log {
  id: string;
  type: string;
  by: string;
  message: string;
  timestamp: string;
}
