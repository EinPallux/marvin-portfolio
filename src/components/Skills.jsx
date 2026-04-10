import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const proSkills = [
  { label: "UI / Web Design",  pct: 92, note: "Layouts, systems, responsive design"    },
  { label: "Figma",            pct: 95, note: "Components, variables, dev handoff"     },
  { label: "Adobe Photoshop",  pct: 88, note: "Photo editing, compositing, production" },
];

const learningSkills = [
  { label: "Adobe Illustrator",      pct: 55, note: "Vector & illustration"             },
  { label: "Logo Design",            pct: 48, note: "Brand marks, wordmarks"            },
  { label: "No-Code / Vibe-Coding",  pct: 72, note: "React, Framer, AI-assisted build" },
  { label: "Applied AI & LLM APIs",  pct: 68, note: "Groq, GLM, prompt engineering"    },
];

function SkillRow({ skill, color, dashed, index, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -18 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="py-5 cursor-default group"
      style={{ borderBottom: "1px solid rgba(164,140,112,0.2)" }}
    >
      <div className="flex items-baseline justify-between mb-3">
        <motion.span
          className="font-display font-light tracking-tight text-ink-900 dark:text-parchment-100"
          animate={{ fontStyle: hovered ? "italic" : "normal" }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: "clamp(1.15rem, 2vw, 1.5rem)" }}
        >
          {skill.label}
        </motion.span>
        <span className="font-mono text-xs ml-4 flex-shrink-0" style={{ color }}>
          {skill.pct}%
        </span>
      </div>

      {/* Stroke bar */}
      <div className="relative h-px w-full" style={{
        background: dashed
          ? "repeating-linear-gradient(90deg, rgba(164,140,112,0.2) 0, rgba(164,140,112,0.2) 6px, transparent 6px, transparent 10px)"
          : "rgba(164,140,112,0.18)"
      }}>
        <motion.div
          className="absolute inset-y-0 left-0 h-[1.5px] -top-[0.5px]"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.pct}%` } : {}}
          transition={{ delay: index * 0.08 + 0.3, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <p className="font-mono text-[10px] tracking-wide mt-1.5" style={{ color: "rgba(122,112,96,0.7)" }}>
        {skill.note}
      </p>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref}
      className="relative py-32 md:py-44 overflow-hidden"
      style={{ background: "#f9f3e8" }}>

      {/* Dark mode override */}
      <style>{`.dark #skills { background: #18160f !important; }`}</style>

      {/* Decorative big rotated "02" ghost */}
      <span
        aria-hidden="true"
        className="absolute select-none font-display font-light pointer-events-none hidden md:block"
        style={{
          fontSize: "clamp(12rem,28vw,26rem)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(181,69,27,0.06)",
          lineHeight: 1,
          right: "-0.1em",
          top: "0.1em",
          letterSpacing: "-0.06em",
          zIndex: 0,
        }}
      >
        02
      </span>

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-400 dark:text-ink-600 mb-5">
              Skills — 02
            </p>
            <h2
              className="font-display font-light leading-[0.93] tracking-tight text-ink-900 dark:text-parchment-100"
              style={{ fontSize: "clamp(2.4rem,5.5vw,5.5rem)" }}
            >
              Tools &amp;
              <br />
              <em style={{ color: "#b5451b" }}>Capabilities.</em>
            </h2>
          </div>
          <p className="font-sans text-sm font-light text-ink-500 dark:text-ink-400 max-w-[38ch] leading-relaxed md:text-right">
            Hover a skill to italicise it. Solid bars are mastered — dashed tracks are live work-in-progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24">
          {/* Mastered */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-ink-400 dark:text-ink-600 mb-0">Core Proficiency</p>
            <div style={{ borderTop: "2px solid #100e0b" }} className="dark:[border-top-color:#f1e6d0]">
              {proSkills.map((s, i) => (
                <SkillRow key={s.label} skill={s} color="#b5451b" dashed={false} index={i} inView={inView} />
              ))}
            </div>
          </div>
          {/* Learning */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-ink-400 dark:text-ink-600 mb-0">Currently Exploring</p>
            <div style={{ borderTop: "1px dashed rgba(164,140,112,0.5)" }}>
              {learningSkills.map((s, i) => (
                <SkillRow key={s.label} skill={s} color="rgba(181,69,27,0.5)" dashed={true} index={i} inView={inView} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
