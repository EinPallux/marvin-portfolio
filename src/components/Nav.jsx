import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "../context/ThemeContext";

export default function Nav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div
        className="transition-all duration-300"
        style={{
          background: scrolled
            ? theme === "dark"
              ? "rgba(10,10,11,0.82)"
              : "rgba(255,255,255,0.82)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? theme === "dark"
              ? "0.5px solid rgba(255,255,255,0.08)"
              : "0.5px solid rgba(0,0,0,0.08)"
            : "0.5px solid transparent",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          {/* Wordmark */}
          <a
            href="#"
            className="text-[15px] font-semibold tracking-[-0.02em] text-zinc-900 dark:text-zinc-100"
          >
            Marvin
          </a>

          {/* Center nav links — hidden on mobile */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {[["About", "#about"], ["Skills", "#skills"], ["Work", "#work"], ["Contact", "#contact"]].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="px-3.5 py-1.5 text-[13px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all duration-150"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right: availability badge + theme */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" style={{ animation: "pulse 2s infinite" }} />
              Available
            </span>
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-95"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
                  transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                  className="absolute"
                >
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
