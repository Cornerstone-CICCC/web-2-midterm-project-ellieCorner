import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark" | "system";
type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeCtx = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) || "system"
  );

  useEffect(() => {
    const root = document.documentElement;
    const prefersDark =
      theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextIsDark = theme === "dark" || prefersDark;
    root.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const prefersDarkMedia =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false;

  const isDark = theme === "dark" || (theme === "system" && prefersDarkMedia);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const value = useMemo(
    () => ({ theme, setTheme, isDark, toggleTheme }),
    [theme, isDark]
  );
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
