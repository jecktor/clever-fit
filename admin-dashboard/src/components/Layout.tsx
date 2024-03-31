import { useRef, type ReactNode } from "react";
import { useLocation } from "wouter";
import {
  Dumbbell,
  AreaChart,
  Settings,
  Users,
  LogOut,
  Container,
} from "lucide-react";
import { auth } from "@lib/firebase";
import { useFirebaseUser } from "@hooks";

import { SidebarLink, ModeToggle } from "@components";
import { Toaster } from "@components/ui/toaster";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const user = useFirebaseUser();
  const [location] = useLocation();
  const sidebar = useRef<HTMLElement>(null);

  if (!user) return null;

  return (
    <>
      <aside
        ref={sidebar}
        className="fixed z-50 hidden h-screen w-screen border-r bg-background lg:block lg:w-72"
      >
        <div className="container flex h-[61px] items-center justify-between border-b">
          <a className="flex items-center gap-2" href="/">
            <Dumbbell className="h-5 w-5" />
            <span className="text-xl font-semibold">CleverFit</span>
          </a>
        </div>

        <nav className="flex flex-col gap-2 px-4 pt-8 font-medium">
          <SidebarLink to="/" active={location === "/"}>
            <AreaChart className="h-4 w-4" />
            Analytics
          </SidebarLink>
          <SidebarLink
            to="/user-admin"
            active={location.includes("/user-admin")}
          >
            <Users className="h-4 w-4" />
            User Administration
          </SidebarLink>
          <SidebarLink
            to="/locker-admin"
            active={location.includes("/locker-admin")}
          >
            <Container className="h-4 w-4" />
            Locker Administration
          </SidebarLink>
        </nav>
      </aside>

      <div className="h-screen lg:ml-72">
        <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-lg">
          <div className="flex h-[60px] items-center justify-between gap-4 px-8 lg:justify-end">
            <button
              onClick={() => sidebar.current?.classList.toggle("hidden")}
              aria-label="toggle sidebar"
              className="block lg:hidden"
            >
              <Dumbbell className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-4">
              <ModeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Settings className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {
                      // <form use:enhance method="post" action="?/signout">
                    }
                    <button className="w-full" type="submit">
                      <DropdownMenuItem
                        onClick={() => auth.signOut()}
                        className="cursor-pointer"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </button>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="px-8 pt-8">{children}</main>
      </div>
      <Toaster />
    </>
  );
}
