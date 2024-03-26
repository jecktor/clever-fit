export interface User {
  id: string;
  name: string;
  email: string;
  subscription?: {
    plan: "Basic" | "Pro";
    currentPeriodEnd: string;
  };
}
