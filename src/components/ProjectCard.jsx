import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";

export default function ProjectCard({ project, index, onOpen, size = "normal" }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, type: "spring", duration: 0.7, bounce: 0 }}
      onClick={() => onOpen(project)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="group cursor-pointer"
      style={{ willChange: "transform" }}
    >
      <div
        className={`relative overflow-hidden rounded-2xl mb-4 ${size === "large" ? "aspect-[16/9]" : "aspect-[4/3]"}`}
        style={{
          boxShadow: hov
            ? "0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(91,69,245,0.2)"
            : "0 4px 24px rgba(0,0,0,0.06)",
          transition: "box-shadow 0.4s ease",
        }}
      >
        <motion.div
          className="w-full h-full"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ clipPath: "inset(0% 0 0 0)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: index * 0.08 + 0.1, duration: 0.75, ease: [0.77, 0, 0.18, 1] }}
        >
          <motion.img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: hov ? 1.04 : 1 }}
            transition={{ type: "spring", duration: 0.8, bounce: 0 }}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ background: hov ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0)" }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="absolute inset-0 flex items-end justify-between p-5 pointer-events-none"
          animate={{ opacity: hov ? 1 : 0, y: hov ? 0 : 8 }}
          transition={{ type: "spring", duration: 0.35, bounce: 0 }}
        >
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/75">
            {project.category}
          </span>
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-accent text-white flex-shrink-0">
            <ArrowUpRight size={14} weight="bold" />
          </div>
        </motion.div>

        <div
          className="absolute top-3 right-3 font-mono text-[10px] tracking-wide px-2 py-1 rounded-md"
          style={{ background: "rgba(255,255,255,0.88)", color: "#52525b", backdropFilter: "blur(8px)" }}
        >
          {project.year}
        </div>
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <motion.h3
            animate={{ color: hov ? "#5b45f5" : undefined }}
            transition={{ duration: 0.2 }}
            className="text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-1"
          >
            {project.title}
          </motion.h3>
          <p className="text-[13px] text-zinc-500 dark:text-zinc-500 leading-snug">{project.subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-1.5 justify-end flex-shrink-0 mt-0.5">
          {project.tags.slice(0, 2).map(t => (
            <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800">
              {t}
            </span>
          ))}
          <AnimatePresence>
            {hov && project.tags.slice(2).map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", duration: 0.25, bounce: 0, delay: i * 0.05 }}
                className="font-mono text-[10px] px-2 py-0.5 rounded-md border"
                style={{ background: "rgba(91,69,245,0.08)", color: "#5b45f5", borderColor: "rgba(91,69,245,0.25)" }}
              >
                {t}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}