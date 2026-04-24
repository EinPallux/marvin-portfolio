import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkle, Code, PenNib } from "@phosphor-icons/react";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const up = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", duration: 0.6, bounce: 0 } },
};

const traits = [
  { icon: PenNib,  label: "Design-first",   body: "Figma, layout systems, visual hierarchy — the foundation of everything I make." },
  { icon: Code,    label: "Builder",         body: "I close the design-to-code gap using React and AI APIs to ship real products." },
  { icon: Sparkle, label: "AI-native",       body: "Integrating LLMs like Groq and GLM into interfaces that feel genuinely human." },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-32 md:py-40 bg-white dark:bg-zinc-950">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-[11px] tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-600 mb-16"
        >
          About
        </motion.p>

        {/* Main two-column */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start mb-20">

          {/* Left — big statement */}
          <motion.div
            variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          >
            <motion.h2
              variants={up}
              className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.035em] text-zinc-900 dark:text-zinc-50 mb-6 text-balance"
            >
              Design-led.
              <br />
              <span style={{ color: "#5b45f5" }}>AI-curious.</span>
            </motion.h2>

            <motion.p variants={up} className="text-[16px] text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[44ch]">
              I studied Media Design for 4 years at IU Internationalen Hochschule,
              graduating in March 2026. Since April 2026 I work full-time as a
              Graphic Designer. Outside of client work, I vibe-code — building
              real applications by weaving LLM APIs into interfaces that feel
              genuinely human.
            </motion.p>
          </motion.div>

          {/* Right — timeline rows */}
          <motion.div
            variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
            className="pt-2 lg:pt-16"
          >
            {[
              { period: "2022 – Mar 2026", label: "B.A. Media Design", note: "IU Internationalen Hochschule" },
              { period: "Apr 2026 – now",  label: "Graphic Designer",  note: "Full-time" },
              { period: "Ongoing",         label: "AI & Vibe-Coding",  note: "Groq, GLM, LLM APIs" },
            ].map((t, i) => (
              <motion.div
                key={i}
                variants={up}
                className="flex items-baseline justify-between py-5 border-b border-zinc-100 dark:border-zinc-900"
              >
                <div>
                  <p className="text-[15px] font-semibold tracking-tight text-zinc-800 dark:text-zinc-200">{t.label}</p>
                  <p className="font-mono text-[11px] text-zinc-400 dark:text-zinc-600 mt-1">{t.note}</p>
                </div>
                <p className="font-mono text-[11px] text-zinc-400 dark:text-zinc-600 ml-6 flex-shrink-0 text-right">{t.period}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Trait cards — bento-style, 3-up */}
        <motion.div
          variants={{ hidden:{}, show:{ transition:{ staggerChildren: 0.08 } } }}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {traits.map((t, i) => (
            <motion.div
              key={t.label}
              variants={up}
              className="group relative p-6 rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/50 hover:border-accent/30 transition-colors duration-300"
            >
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <t.icon size={17} weight="bold" className="text-accent" />
              </div>
              <p className="text-[14px] font-semibold tracking-tight text-zinc-800 dark:text-zinc-200 mb-2">{t.label}</p>
              <p className="text-[13px] text-zinc-500 dark:text-zinc-500 leading-relaxed">{t.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
