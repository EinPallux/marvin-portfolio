import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "@phosphor-icons/react";
import { projects } from "../data/projects";
import Nav from "./Nav";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const up = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", duration: 0.7, bounce: 0 } },
};

export default function ProjectDetail({ project, onBack, onNavigate }) {
  const bodyRef = useRef(null);
  const bodyInView = useInView(bodyRef, { once: true, margin: "-60px" });

  // Scroll to top when project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [project.id]);

  // Escape key → back
  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onBack(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onBack]);

  const currentIndex = projects.findIndex(p => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Nav />

      {/* ── Hero image ─────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(300px, 55vw, 680px)" }}>
        <motion.img
          key={project.id}
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, type: "spring", duration: 0.5, bounce: 0 }}
          onClick={onBack}
          className="absolute top-20 left-6 md:left-10 flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium text-white/90 hover:text-white transition-colors"
          style={{
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(12px)",
            border: "0.5px solid rgba(255,255,255,0.15)",
          }}
        >
          <ArrowLeft size={13} weight="bold" />
          Back
        </motion.button>

        {/* Hero text */}
        <motion.div
          key={`hero-text-${project.id}`}
          variants={stagger}
          initial="hidden"
          animate="show"
          className="absolute bottom-0 left-0 right-0 max-w-[1200px] mx-auto px-6 md:px-10 pb-10"
        >
          <motion.span
            variants={up}
            className="inline-block font-mono text-[10px] tracking-[0.22em] uppercase px-3 py-1 rounded-full mb-4"
            style={{ background: "rgba(91,69,245,0.9)", color: "#fff", backdropFilter: "blur(8px)" }}
          >
            {project.category}
          </motion.span>
          <motion.h1
            variants={up}
            className="text-[clamp(2rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white mb-2"
          >
            {project.title}
          </motion.h1>
          <motion.p variants={up} className="text-[16px] text-white/65 max-w-[56ch]">
            {project.subtitle}
          </motion.p>
        </motion.div>
      </div>

      {/* ── Body ───────────────────────────────────────── */}
      <div ref={bodyRef} className="max-w-[1200px] mx-auto px-6 md:px-10 py-20">

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={bodyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", duration: 0.6, bounce: 0 }}
          className="flex flex-wrap items-center justify-between gap-4 pb-10 mb-10 border-b border-zinc-100 dark:border-zinc-900"
        >
          <div className="flex flex-wrap gap-2">
            {project.tags.map(t => (
              <span
                key={t}
                className="font-mono text-[11px] px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
              >
                {t}
              </span>
            ))}
            <span className="font-mono text-[11px] px-3 py-1 rounded-full border border-dashed border-zinc-200 dark:border-zinc-700 text-zinc-400">
              {project.year}
            </span>
          </div>

          <div className="flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold bg-accent text-white hover:bg-accent-hover transition-colors active:scale-[0.97]"
              >
                Live Project <ArrowUpRight size={13} />
              </a>
            )}
            {project.caseStudyUrl && (
              <a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors active:scale-[0.97]"
              >
                Case Study <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </motion.div>

        {/* Overview + Challenge/Solution */}
        <motion.div
          key={`body-${project.id}`}
          variants={stagger}
          initial="hidden"
          animate={bodyInView ? "show" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 mb-20"
        >
          <motion.div variants={up}>
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent mb-4">Overview</p>
            <p className="text-[clamp(1.1rem,2.5vw,1.45rem)] font-medium leading-snug tracking-tight text-zinc-800 dark:text-zinc-200">
              {project.overview}
            </p>
          </motion.div>

          <motion.div variants={up} className="flex flex-col gap-4">
            {[
              { label: "Challenge", text: project.challenge },
              { label: "Solution",  text: project.solution  },
            ].map(({ label, text }) => (
              <div
                key={label}
                className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800"
              >
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500 mb-2">{label}</p>
                <p className="text-[14px] text-zinc-600 dark:text-zinc-400 leading-relaxed">{text}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Results */}
        {project.results?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={bodyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, type: "spring", duration: 0.6, bounce: 0 }}
            className="mb-20"
          >
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent mb-8">Results</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.results.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={bodyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.07, type: "spring", duration: 0.55, bounce: 0 }}
                  className="p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40"
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center font-mono text-[11px] font-bold mb-4"
                    style={{ background: "rgba(91,69,245,0.12)", color: "#5b45f5" }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-[14px] text-zinc-700 dark:text-zinc-300 leading-snug">{r}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Gallery */}
        {project.images?.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={bodyInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-24"
          >
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-zinc-400 mb-8">Gallery</p>
            <div className="flex flex-col gap-4">
              {project.images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, clipPath: "inset(8% 0 8% 0)", scale: 0.98 }}
                  animate={bodyInView ? { opacity: 1, clipPath: "inset(0% 0 0% 0)", scale: 1 } : {}}
                  transition={{ delay: 0.45 + i * 0.12, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800"
                >
                  <img
                    src={img}
                    alt={`${project.title} — ${i + 1}`}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Next project */}
        <div className="border-t border-zinc-100 dark:border-zinc-900 pt-16">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-zinc-400 dark:text-zinc-600 mb-6">
            Next Project
          </p>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            onClick={() => onNavigate(nextProject)}
            className="group cursor-pointer flex items-center justify-between gap-6 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-accent/30 transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
          >
            <div className="flex items-center gap-5 min-w-0">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={nextProject.coverImage}
                  alt={nextProject.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-zinc-400 mb-1">{nextProject.category}</p>
                <h3 className="text-[17px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-accent transition-colors truncate">
                  {nextProject.title}
                </h3>
                <p className="text-[13px] text-zinc-500 truncate">{nextProject.subtitle}</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 group-hover:bg-accent group-hover:text-white transition-all duration-200 text-zinc-500">
              <ArrowRight size={15} weight="bold" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}