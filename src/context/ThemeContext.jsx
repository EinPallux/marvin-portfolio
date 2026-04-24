import { createContext, useContext, useEffect, useState } from "react";
const Ctx = createContext(null);
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const s = localStorage.getItem("mv-theme");
    return s || (window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light");
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("mv-theme", theme);
  }, [theme]);
  return <Ctx.Provider value={{ theme, toggle: () => setTheme(t => t === "dark" ? "light" : "dark") }}>{children}</Ctx.Provider>;
}
export const useTheme = () => { const c = useContext(Ctx); if (!c) throw Error(); return c; };
