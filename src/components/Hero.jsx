import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";

const ROLES = ["UI/Web Designer", "Creative Technologist", "Vibe-Coder", "AI Builder"];

// Magnetic button — useMotionValue only, no useState for position (performance)
function MagneticButton({ children, href, primary }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.6 });

  const handleMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * 0.28);
    y.set((e.clientY - cy) * 0.28);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: sx, y: sy, willChange: "transform" }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-semibold tracking-[-0.01em] transition-colors duration-200 ${
        primary
          ? "bg-accent text-white hover:bg-accent-hover shadow-[0_0_24px_rgba(91,69,245,0.3)]"
          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700"
      }`}
    >
      {children}
    </motion.a>
  );
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const up = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", duration: 0.7, bounce: 0 } },
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex(i => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-white dark:bg-zinc-950"
    >
      {/* Subtle radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(91,69,245,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 pt-28 pb-20 w-full">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[820px]">

          {/* Eyebrow */}
          <motion.div variants={up} className="flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="font-mono text-[12px] tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-500">
              Graphic Designer &amp; Creative Technologist
            </span>
          </motion.div>

          {/* Main headline — Apple-scale */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              variants={up}
              className="text-[clamp(3.2rem,9vw,8.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-zinc-900 dark:text-zinc-50"
            >
              Hi, I&rsquo;m Marvin.
            </motion.h1>
          </div>

          {/* Animated role line */}
          <div className="overflow-hidden mb-8 h-[clamp(2.8rem,7.5vw,7rem)] flex items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                transition={{ type: "spring", duration: 0.55, bounce: 0 }}
                className="text-[clamp(2.8rem,7.5vw,7rem)] font-bold leading-[0.95] tracking-[-0.04em]"
                style={{ color: "#5b45f5" }}
              >
                {ROLES[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Sub copy */}
          <motion.p
            variants={up}
            className="text-[16px] md:text-[18px] font-normal text-zinc-500 dark:text-zinc-400 max-w-[52ch] leading-relaxed mb-10"
          >
            I design things that work — and lately I build them too.
            Based in Germany, focused on the intersection of
            sharp visual craft and applied AI.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={up} className="flex items-center gap-4 flex-wrap">
            <MagneticButton href="#work" primary>
              View Work <ArrowRight size={14} weight="bold" />
            </MagneticButton>
            <MagneticButton href="#contact">
              Get in touch
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Floating stat cards — Apple-style ambient info */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, type: "spring", duration: 0.8, bounce: 0 }}
          className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 flex-col gap-3"
        >
          {[
            { label: "Years designing", value: "4+" },
            { label: "B.A. Media Design", value: "2026" },
            { label: "Tools mastered", value: "Figma" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
              className="px-4 py-3 rounded-2xl text-right bg-white/80 dark:bg-zinc-900/80 border border-zinc-100 dark:border-zinc-800"
              style={{
                backdropFilter: "blur(12px)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              }}
            >
              <p className="font-mono text-[11px] text-zinc-400 dark:text-zinc-600 mb-0.5 tracking-wide">{s.label}</p>
              <p className="text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{s.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
