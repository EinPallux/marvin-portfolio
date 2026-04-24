import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

const CATEGORIES = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

export default function Work({ onOpen }) {
  const [filter, setFilter] = useState("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);
  const [featured, ...rest] = filtered;

  return (
    <section id="work" ref={ref} className="py-32 md:py-40 bg-canvas-light dark:bg-zinc-950">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", duration: 0.7, bounce: 0 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-600 mb-4">Work</p>
            <h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.035em] text-zinc-900 dark:text-zinc-50">
              Selected <span style={{ color: "#5b45f5" }}>Projects.</span>
            </h2>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 w-fit">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="relative px-3.5 py-1.5 text-[12px] font-medium rounded-lg transition-colors duration-200"
                style={{ color: filter === cat ? "#fff" : undefined }}
              >
                {filter === cat && (
                  <motion.div
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-lg bg-accent"
                    transition={{ type: "spring", duration: 0.35, bounce: 0 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0 }}
          >
            {featured && (
              <div className="mb-5">
                <ProjectCard project={featured} index={0} onOpen={onOpen} size="large" />
              </div>
            )}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {rest.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i + 1} onOpen={onOpen} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}