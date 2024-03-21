import { ThemeProvider, ModeToggle } from "@components";
import { Button } from "@components/ui/button";

export default function App() {
  return (
    <ThemeProvider>
      <h1>Vite + React</h1>
      <Button>Test</Button>
      <ModeToggle />
    </ThemeProvider>
  );
}
