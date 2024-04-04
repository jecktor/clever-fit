import { Route } from "wouter";

import { Analytics, Login, UserAdmin, LockerAdmin, Logs } from "@routes";

import { ThemeProvider } from "@components";

export default function App() {
  return (
    <ThemeProvider>
      <Route path="/" component={Analytics} />
      <Route path="/login" component={Login} />
      <Route path="/user-admin" component={UserAdmin} />
      <Route path="/locker-admin" component={LockerAdmin} />
      <Route path="/logs" component={Logs} />
    </ThemeProvider>
  );
}
