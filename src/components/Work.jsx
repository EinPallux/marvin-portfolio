import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function Work() {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [featured, ...rest] = projects;

  return (
    <section id="work" ref={ref}
      className="relative py-32 md:py-44 bg-parchment-50 dark:bg-ink-950 overflow-hidden">
      <span aria-hidden="true" className="absolute select-none pointer-events-none hidden md:block font-display"
        style={{
          fontSize: "clamp(12rem,28vw,26rem)", color: "transparent",
          WebkitTextStroke: "1px rgba(181,69,27,0.055)", lineHeight: 1,
          right: "-0.1em", top: "0em", letterSpacing: "-0.06em", zIndex: 0, fontWeight: 700,
        }}>03</span>

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-400 dark:text-ink-600 mb-5">
              Work — 03
            </p>
            <h2 className="font-display leading-[0.93] text-ink-900 dark:text-parchment-100"
              style={{ fontSize: "clamp(2.4rem,5.5vw,5.5rem)", fontWeight: 700, letterSpacing: "-0.03em" }}>
              Selected{" "}
              <span style={{ fontWeight: 400, color: "#b5451b" }}>Projects.</span>
            </h2>
          </div>
          <p className="font-sans text-sm font-light text-ink-400 dark:text-ink-600 max-w-[36ch] leading-relaxed md:text-right">
            Click any project to open the full case study.
          </p>
        </motion.div>

        {featured && (
          <div className="mb-10">
            <ProjectCard project={featured} index={0} onOpen={setActive} featured />
          </div>
        )}

        <div className="mb-10" style={{ borderTop: "1px solid rgba(228,208,176,0.5)" }} />

        <div className="grid grid-cols-1 md:grid-cols-[1.45fr_1fr] gap-8 md:gap-10">
          {rest[0] && <ProjectCard project={rest[0]} index={1} onOpen={setActive} />}
          <div className="grid grid-cols-1 gap-8 md:gap-10">
            {rest.slice(1).map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i + 2} onOpen={setActive} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
