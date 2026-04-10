import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "../context/ThemeContext";

export default function Nav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const borderColor = theme === "dark"
    ? "rgba(61,56,40,0.55)"
    : "rgba(228,208,176,0.65)";
  const bg = theme === "dark"
    ? "rgba(16,14,11,0.9)"
    : "rgba(253,250,245,0.9)";

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        background: scrolled ? bg : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(160%)" : "none",
        borderBottom: `1px solid ${scrolled ? borderColor : "transparent"}`,
      }}
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        <a href="#"
          className="font-display text-xl tracking-tight text-ink-900 dark:text-parchment-100">
          Marvin<span style={{ color: "#b5451b" }} className="font-light italic">.</span>
        </a>

        <div className="flex items-center gap-1">
          <nav className="hidden md:flex items-center mr-4">
            {["About", "Skills", "Work"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="px-4 py-2 font-sans text-sm font-medium text-ink-400 dark:text-ink-400 hover:text-ink-900 dark:hover:text-parchment-100 transition-colors">
                {item}
              </a>
            ))}
          </nav>

          <button onClick={toggle} aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-full border text-ink-400 dark:text-ink-400 hover:text-ink-900 dark:hover:text-parchment-100 transition-all active:scale-95"
            style={{ borderColor: "rgba(164,140,112,0.4)" }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={theme}
                initial={{ rotate: -20, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 20, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.18 }}
                className="absolute">
                {theme === "dark" ? <Sun size={14} weight="light" /> : <Moon size={14} weight="light" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
