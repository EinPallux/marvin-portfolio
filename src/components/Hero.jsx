import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } },
};
const word = {
  hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const marqueeWords = [
  "UI Design", "Visual Identity", "Figma", "Branding",
  "AI Integration", "Vibe-Coding", "Typography", "Art Direction",
  "UI Design", "Visual Identity", "Figma", "Branding",
  "AI Integration", "Vibe-Coding", "Typography", "Art Direction",
];

function ScribbleUnderline() {
  return (
    <svg viewBox="0 0 320 18" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full" aria-hidden="true" style={{ overflow: "visible" }}>
      <motion.path
        d="M6 13 C 55 3, 110 17, 165 8 C 215 0, 265 15, 314 7"
        stroke="#b5451b" strokeWidth="2" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.75 }}
        transition={{ duration: 1.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

// Decorative large rotated index number — editorial device
function IndexNumber({ n }) {
  return (
    <span
      aria-hidden="true"
      className="absolute select-none font-display font-light leading-none"
      style={{
        fontSize: "clamp(10rem, 22vw, 22rem)",
        color: "transparent",
        WebkitTextStroke: "1px rgba(181,69,27,0.1)",
        right: "-0.05em",
        top: "-0.18em",
        zIndex: 0,
        userSelect: "none",
        pointerEvents: "none",
        letterSpacing: "-0.04em",
      }}
    >
      {n}
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-parchment-50 dark:bg-ink-950"
    >
      {/* Warm ambient wash */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 55% at 55% 35%, rgba(228,208,176,0.4) 0%, transparent 65%)",
      }} />

      {/* Decorative vertical rule — editorial column device */}
      <motion.div
        className="absolute left-[7vw] top-0 bottom-0 hidden md:block pointer-events-none"
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "1px", background: "linear-gradient(to bottom, transparent, rgba(181,69,27,0.18) 20%, rgba(181,69,27,0.18) 80%, transparent)" }}
      />

      <motion.div
        style={{ y: yParallax, opacity: opacityFade }}
        className="relative max-w-[1320px] mx-auto px-6 md:px-12 pt-28 pb-24 w-full"
      >
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-14 md:mb-20"
        >
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: "#b5451b", boxShadow: "0 0 8px rgba(181,69,27,0.55)" }} />
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-400 dark:text-ink-500">
            Portfolio — 2025/26
          </span>
          <span className="hidden md:inline font-mono text-[11px] text-ink-300 dark:text-ink-700 mx-2">—</span>
          <span className="hidden md:inline font-mono text-[11px] tracking-[0.14em] text-ink-300 dark:text-ink-700">
            Based in Germany
          </span>
        </motion.div>

        {/* Main headline + ghost number */}
        <div className="relative">
          <IndexNumber n="M" />

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="relative z-10"
          >
            {/* Line 1 */}
            <div className="overflow-hidden">
              <motion.p variants={word}
                className="font-display font-light text-[clamp(1.5rem,3vw,2.8rem)] leading-none tracking-tight text-ink-500 dark:text-ink-400 mb-2">
                Hi, I&rsquo;m
              </motion.p>
            </div>

            {/* Line 2 — the big name */}
            <div className="overflow-hidden mb-1">
              <motion.h1 variants={word}
                className="font-display font-semibold italic leading-[0.88] tracking-tight"
                style={{
                  fontSize: "clamp(4.5rem, 13vw, 13rem)",
                  color: "#b5451b",
                  letterSpacing: "-0.02em",
                }}>
                Marvin.
              </motion.h1>
            </div>

            {/* Scribble */}
            <motion.div
              className="w-[clamp(10rem,30vw,28rem)] mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <ScribbleUnderline />
            </motion.div>

            {/* Line 3 */}
            <div className="overflow-hidden mb-3">
              <motion.p variants={word}
                className="font-display font-light leading-[1.1] tracking-tight text-ink-900 dark:text-parchment-100"
                style={{ fontSize: "clamp(1.8rem, 3.8vw, 3.6rem)" }}>
                UI/Web Designer
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.p variants={word}
                className="font-display font-light italic leading-[1.1] tracking-tight text-ink-400 dark:text-ink-400"
                style={{ fontSize: "clamp(1.8rem, 3.8vw, 3.6rem)" }}>
                &amp; Creative Technologist.
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Split lower bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-16 items-end mt-14 pt-7"
          style={{ borderTop: "1px solid rgba(228,208,176,0.55)" }}
        >
          <p className="font-sans text-base font-light leading-relaxed text-ink-500 dark:text-ink-400 max-w-[46ch]">
            Crafting digital experiences at the intersection of
            thoughtful design and artificial intelligence.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 font-sans text-sm font-medium tracking-wide px-6 py-3 rounded-full transition-all active:scale-[0.97]"
              style={{ background: "#b5451b", color: "#fdfaf5", boxShadow: "0 2px 14px rgba(181,69,27,0.28)" }}
              onMouseEnter={e => e.currentTarget.style.background = "#d4612e"}
              onMouseLeave={e => e.currentTarget.style.background = "#b5451b"}
            >
              View Work
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 font-sans text-sm font-medium tracking-wide px-6 py-3 rounded-full border border-parchment-300 dark:border-ink-600 text-ink-600 dark:text-ink-300 hover:border-parchment-400 dark:hover:border-ink-500 transition-all active:scale-[0.97]"
            >
              About
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-300 dark:text-ink-700"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        >
          <ArrowDown size={13} weight="light" />
        </motion.div>
      </motion.div>

      {/* Marquee ticker */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden py-2.5"
        style={{ borderTop: "1px solid rgba(228,208,176,0.4)" }}
      >
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 40s linear infinite" }}>
          {marqueeWords.map((w, i) => (
            <span key={i}
              className="inline-flex items-center gap-4 mx-5 font-mono text-[10px] tracking-[0.22em] uppercase text-ink-300 dark:text-ink-700">
              {w}
              <span className="w-1 h-1 rounded-full" style={{ background: "rgba(181,69,27,0.35)" }} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
