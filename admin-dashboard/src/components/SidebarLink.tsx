import type { ReactNode } from "react";
import { Link } from "wouter";

interface SidebarLinkProps {
  to: string;
  active: boolean;
  children: ReactNode;
}

export function SidebarLink({ to, active, children }: SidebarLinkProps) {
  return (
    <>
      {active ? (
        <Link
          className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2"
          href={to}
        >
          {children}
        </Link>
      ) : (
        <Link
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
          href={to}
        >
          {children}
        </Link>
      )}
    </>
  );
}
