import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";

export default function ProjectCard({ project, index, onOpen, featured }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.09, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onOpen(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group cursor-pointer"
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden mb-4 ${featured ? "aspect-[16/8]" : "aspect-[4/3]"}`}
        style={{ borderRadius: "3px" }}
      >
        <motion.img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Warm dark overlay on hover */}
        <motion.div
          className="absolute inset-0"
          animate={{ background: hovered ? "rgba(16,14,11,0.42)" : "rgba(16,14,11,0)" }}
          transition={{ duration: 0.35 }}
        />

        {/* Bottom reveal row */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-4 pb-4"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase"
            style={{ color: "rgba(253,250,245,0.8)" }}>
            {project.category}
          </span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "#b5451b" }}
          >
            <ArrowUpRight size={13} color="#fdfaf5" weight="bold" />
          </div>
        </motion.div>

        {/* Year tag */}
        <div
          className="absolute top-3 right-3 font-mono text-[10px] tracking-wide px-2 py-1"
          style={{
            background: "rgba(253,250,245,0.88)",
            color: "#5a5240",
            backdropFilter: "blur(6px)",
            borderRadius: "2px",
          }}
        >
          {project.year}
        </div>

        {/* Rust outline on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            borderRadius: "3px",
            boxShadow: "inset 0 0 0 1.5px rgba(181,69,27,0.55)",
          }}
        />
      </div>

      {/* Caption — gallery label style */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <motion.h3
            className="font-display font-light leading-tight tracking-tight mb-1"
            animate={{ color: hovered ? "#b5451b" : undefined, fontStyle: hovered ? "italic" : "normal" }}
            transition={{ duration: 0.22 }}
            style={{ fontSize: "clamp(1.1rem,1.8vw,1.45rem)", color: "inherit" }}
          >
            {project.title}
          </motion.h3>
          <p className="font-sans text-sm font-light leading-snug text-ink-400 dark:text-ink-500">
            {project.subtitle}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 justify-end mt-0.5 flex-shrink-0">
          {project.tags.slice(0, 2).map(tag => (
            <span key={tag}
              className="font-mono text-[10px] tracking-wide px-2 py-0.5 text-ink-400 dark:text-ink-500"
              style={{ border: "1px solid rgba(164,140,112,0.4)", borderRadius: "2px" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
