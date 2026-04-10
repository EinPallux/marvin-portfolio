import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show:   { opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const timelineItems = [
  { period: "2022 – Mar 2026", label: "B.A. Media Design",  note: "IU Internationalen Hochschule" },
  { period: "Apr 2026 – now",  label: "Graphic Designer",   note: "Full-time position"            },
  { period: "Ongoing",         label: "Vibe-Coding & AI",   note: "Groq, GLM, LLM APIs"          },
];

function GhostNum({ n }) {
  return (
    <span aria-hidden="true" className="absolute select-none pointer-events-none font-display"
      style={{
        fontSize: "clamp(12rem,28vw,26rem)",
        color: "transparent",
        WebkitTextStroke: "1px rgba(181,69,27,0.07)",
        lineHeight: 1,
        right: "-0.1em",
        top: "-0.25em",
        letterSpacing: "-0.06em",
        zIndex: 0,
        fontWeight: 700,
      }}>
      {n}
    </span>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref}
      className="relative py-32 md:py-44 bg-parchment-50 dark:bg-ink-950 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(228,208,176,0.5) 15%, rgba(228,208,176,0.5) 85%, transparent)" }} />

      <div className="max-w-[1320px] mx-auto px-6 md:px-12">
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-400 dark:text-ink-600 mb-12">
          About — 01
        </motion.p>

        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden" animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-20 items-start">

          {/* Left */}
          <div className="relative">
            <GhostNum n="01" />
            <div className="relative z-10">
              <motion.h2 variants={fadeUp}
                className="font-display leading-[0.93] tracking-tight text-ink-900 dark:text-parchment-100 mb-8"
                style={{ fontSize: "clamp(2.8rem,6.5vw,6.5rem)", fontWeight: 700, letterSpacing: "-0.03em" }}>
                Design-led.
                <br />
                <span style={{ color: "#b5451b", fontWeight: 400 }}>AI-curious.</span>
              </motion.h2>

              {/* Pull quote — weight contrast instead of italic */}
              <motion.blockquote variants={fadeUp}
                className="relative pl-5 mb-10"
                style={{ borderLeft: "2px solid rgba(181,69,27,0.45)" }}>
                <p className="font-display text-xl md:text-2xl leading-snug text-ink-600 dark:text-ink-300"
                  style={{ fontWeight: 400, letterSpacing: "-0.015em" }}>
                  &ldquo;Where most people separate design from engineering,
                  I try to erase that line.&rdquo;
                </p>
              </motion.blockquote>

              <motion.p variants={fadeUp}
                className="font-sans text-base font-light leading-relaxed text-ink-500 dark:text-ink-300 max-w-[44ch]">
                I studied Media Design for 4 years, building a strong foundation in visual
                communication, layout systems, and design thinking. Since April 2026, I work
                full-time as a Graphic Designer.
              </motion.p>
            </div>
          </div>

          {/* Right */}
          <div className="mt-0 md:mt-16">
            <motion.p variants={fadeUp}
              className="font-sans text-base font-light leading-relaxed text-ink-500 dark:text-ink-300 max-w-[44ch] mb-14">
              Outside of client work, my real obsession is{" "}
              <span className="font-medium text-ink-800 dark:text-parchment-200">vibe-coding</span> —
              building real applications by weaving LLM APIs like{" "}
              <span className="font-medium" style={{ color: "#b5451b" }}>Groq</span> and{" "}
              <span className="font-medium" style={{ color: "#b5451b" }}>GLM</span>{" "}
              into things people actually use.
              The next design frontier is shaping AI outputs into something genuinely human.
            </motion.p>

            <motion.div variants={fadeUp}>
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-400 dark:text-ink-600 mb-0">Timeline</p>
              <div style={{ borderTop: "2px solid #18160f" }} className="dark:[border-top-color:#f1e6d0]">
                {timelineItems.map((t, i) => (
                  <div key={i} className="flex items-baseline justify-between py-4"
                    style={{ borderBottom: i < timelineItems.length - 1 ? "1px solid rgba(228,208,176,0.5)" : "none" }}>
                    <div>
                      <p className="font-sans text-sm font-medium text-ink-800 dark:text-parchment-200">{t.label}</p>
                      <p className="font-mono text-[11px] text-ink-400 dark:text-ink-600 mt-0.5">{t.note}</p>
                    </div>
                    <p className="font-mono text-[11px] text-ink-400 dark:text-ink-600 ml-6 flex-shrink-0 text-right">{t.period}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
