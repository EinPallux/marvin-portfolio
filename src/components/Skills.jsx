import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCircle, Hourglass } from "@phosphor-icons/react";

const proSkills = [
  { label: "UI / Web Design",  pct: 91, desc: "Layouts, systems, responsive design" },
  { label: "Figma",            pct: 88, desc: "Components, variables, dev handoff" },
  { label: "Adobe Photoshop",  pct: 83, desc: "Photo editing, compositing, retouching" },
];

const learningSkills = [
  { label: "Adobe Illustrator",     pct: 55, desc: "Vector, illustration" },
  { label: "Logo Design",           pct: 48, desc: "Brand marks, wordmarks" },
  { label: "No-Code / Vibe-Coding", pct: 72, desc: "React, Framer, AI builds" },
  { label: "Applied AI & LLMs",     pct: 68, desc: "Groq, GLM, prompt engineering" },
];

function SkillBar({ skill, color, index, inView }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.07, type: "spring", duration: 0.5, bounce: 0 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="py-4 border-b border-white/8 cursor-default group"
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[15px] font-semibold tracking-tight text-white">{skill.label}</span>
        <span className="font-mono text-[12px]" style={{ color }}>{skill.pct}%</span>
      </div>
      <div className="relative h-px w-full bg-white/10">
        <motion.div
          className="absolute inset-y-0 left-0 h-[2px] -top-[0.5px] rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.pct}%` } : {}}
          transition={{ delay: index * 0.07 + 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <AnimatePresence>
        {hov && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            className="font-mono text-[11px] text-white/40 mt-1.5 overflow-hidden"
          >
            {skill.desc}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="py-32 md:py-40 bg-zinc-950">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-zinc-600 mb-5">Skills</p>
            <h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.035em] text-zinc-50">
              Tools &amp; <span style={{ color: "#5b45f5" }}>capabilities.</span>
            </h2>
          </div>
          <p className="text-[14px] text-zinc-500 max-w-[38ch] leading-relaxed md:text-right">
            Hover a skill to see what it covers. Solid fills are mastered — dashed are in active development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          {/* Mastered */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle size={13} weight="bold" className="text-accent" />
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-zinc-600">Core Proficiency</p>
            </div>
            <div className="border-t-2 border-accent/60">
              {proSkills.map((s, i) => (
                <SkillBar key={s.label} skill={s} color="#5b45f5" index={i} inView={inView} />
              ))}
            </div>
          </div>

          {/* Learning */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Hourglass size={13} weight="bold" className="text-zinc-500" />
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-zinc-600">Currently Exploring</p>
            </div>
            <div style={{ borderTop: "1px dashed rgba(255,255,255,0.12)" }}>
              {learningSkills.map((s, i) => (
                <SkillBar key={s.label} skill={s} color="rgba(91,69,245,0.55)" index={i} inView={inView} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
