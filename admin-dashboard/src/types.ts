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
