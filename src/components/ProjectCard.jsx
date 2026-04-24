import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";

export default function ProjectCard({ project, index, onOpen, featured }) {
  const [hovered, setHovered] = useState(false);

  // All tags: first 2 always visible, rest revealed on hover
  const visibleTags = project.tags.slice(0, 2);
  const hiddenTags  = project.tags.slice(2);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.09, type: "spring", duration: 0.7, bounce: 0 }}
      onClick={() => onOpen(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group cursor-pointer"
      style={{ willChange: "transform, opacity, filter" }}
    >
      {/* Image container */}
      <div
        className={`relative overflow-hidden mb-4 ${featured ? "aspect-[16/8]" : "aspect-[4/3]"}`}
        style={{ borderRadius: "3px" }}
      >
        {/* Clip-path reveal on scroll-enter — image slides up from bottom */}
        <motion.div
          className="w-full h-full"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ clipPath: "inset(0% 0 0 0)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: index * 0.09 + 0.1, duration: 0.85, ease: [0.77, 0, 0.18, 1] }}
        >
          <motion.img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ type: "spring", duration: 0.8, bounce: 0 }}
          />
        </motion.div>

        {/* Warm overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ background: hovered ? "rgba(16,14,11,0.4)" : "rgba(16,14,11,0)" }}
          transition={{ duration: 0.3 }}
        />

        {/* Bottom reveal: category + arrow */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-4 pb-4"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
          transition={{ type: "spring", duration: 0.4, bounce: 0 }}
        >
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase"
            style={{ color: "rgba(253,250,245,0.85)" }}>
            {project.category}
          </span>
          <motion.div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "#b5451b" }}
            animate={{ scale: hovered ? 1 : 0.7, opacity: hovered ? 1 : 0 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
          >
            <ArrowUpRight size={13} color="#fdfaf5" weight="bold" />
          </motion.div>
        </motion.div>

        {/* Year tag */}
        <div className="absolute top-3 right-3 font-mono text-[10px] tracking-wide px-2 py-1"
          style={{ background: "rgba(253,250,245,0.88)", color: "#5a5240", backdropFilter: "blur(6px)", borderRadius: "2px" }}>
          {project.year}
        </div>

        {/* Rust inset border on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ borderRadius: "3px", boxShadow: "inset 0 0 0 1.5px rgba(181,69,27,0.6)" }}
        />
      </div>

      {/* Caption */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {/* Title: weight shift 400→600, NO fontStyle (Clash Display has no italic) */}
          <motion.h3
            className="font-display leading-tight tracking-tight mb-1 text-ink-900 dark:text-parchment-100"
            animate={{
              color: hovered ? "#b5451b" : undefined,
              fontWeight: hovered ? 600 : 400,
            }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: "clamp(1.1rem,1.8vw,1.45rem)", letterSpacing: "-0.02em" }}
          >
            {project.title}
          </motion.h3>
          <p className="font-sans text-sm font-light leading-snug text-ink-400 dark:text-ink-500">
            {project.subtitle}
          </p>
        </div>

        {/* Tags: always-visible + animated extras on hover */}
        <div className="flex flex-wrap gap-1.5 justify-end mt-0.5 flex-shrink-0">
          {visibleTags.map(tag => (
            <span key={tag}
              className="font-mono text-[10px] tracking-wide px-2 py-0.5 text-ink-400 dark:text-ink-500"
              style={{ border: "1px solid rgba(164,140,112,0.4)", borderRadius: "2px" }}>
              {tag}
            </span>
          ))}
          <AnimatePresence>
            {hovered && hiddenTags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.85, x: 8 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.85, x: 8 }}
                transition={{ type: "spring", duration: 0.3, bounce: 0, delay: i * 0.06 }}
                className="font-mono text-[10px] tracking-wide px-2 py-0.5"
                style={{
                  border: "1px solid rgba(181,69,27,0.45)",
                  borderRadius: "2px",
                  color: "#b5451b",
                  background: "rgba(181,69,27,0.06)",
                }}
              >
                {tag}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}
