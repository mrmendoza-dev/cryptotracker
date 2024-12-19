import { ThemeProvider } from "@/contexts/ThemeContext";
import ApplicationShell from "@/components/ApplicationShell/ApplicationShell";
import "@/styles/App.scss";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="App">
        <ApplicationShell />
      </div>
    </ThemeProvider>
  );
}

export default App;
