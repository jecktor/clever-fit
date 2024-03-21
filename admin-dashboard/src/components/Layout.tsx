import { useState, useRef, useMemo, type ReactNode } from "react";
import { useLocation } from "wouter";
import {
  Dumbbell,
  AreaChart,
  Settings,
  User,
  Users,
  Search,
  LogOut,
  Container,
} from "lucide-react";

import { SidebarLink, ModeToggle } from "@components";
import { Input } from "@components/ui/input";
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
  const [searchbarFocus, setSearchbarFocus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  const [location] = useLocation();

  const sidebar = useRef<HTMLElement>(null);

  const filteredUsers = useMemo(() => users, [searchQuery, users]);

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
          <SidebarLink to="/user-admin" active={location === "/user-admin"}>
            <Users className="h-4 w-4" />
            User Administration
          </SidebarLink>
          <SidebarLink to="/locker-admin" active={location === "/locker-admin"}>
            <Container className="h-4 w-4" />
            Locker Administration
          </SidebarLink>
        </nav>
      </aside>

      <div className="h-screen lg:ml-72">
        <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-lg">
          <div className="flex h-[60px] items-center justify-between gap-4 px-8">
            <button
              onClick={() => sidebar.current?.classList.toggle("hidden")}
              aria-label="toggle sidebar"
              className="block lg:hidden"
            >
              <Dumbbell className="h-5 w-5" />
            </button>

            <div className="flex-1">
              {
                // location === "dashboard" && (
                true && (
                  <div className="relative">
                    <Search className="absolute left-2.5 top-[11px] h-4 w-4 text-muted-foreground" />
                    <Input
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setSearchbarFocus(true)}
                      onBlur={() => setSearchbarFocus(false)}
                      className="max-w-xl pl-8 md:w-2/3 lg:w-1/3"
                      placeholder="Search users..."
                    />
                    {searchbarFocus && filteredUsers.length === 0 && (
                      <div className="absolute top-[50px] flex w-full max-w-xl flex-col rounded-b-md border bg-background p-1 text-sm md:w-2/3 lg:w-1/3">
                        {filteredUsers.map((user, i) => (
                          <a key={i} href={`#${i}`}>
                            <div className="flex items-center gap-2 rounded-md p-2 hover:bg-muted">
                              <User className="h-4 min-h-4 w-4 min-w-4" />
                              <span>User</span>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
            </div>

            <ModeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Settings className="h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {
                    // <form use:enhance method="post" action="?/signout">
                  }
                  <button className="w-full" type="submit">
                    <DropdownMenuItem className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </button>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="px-8 pt-8">{children}</main>
      </div>
    </>
  );
}
