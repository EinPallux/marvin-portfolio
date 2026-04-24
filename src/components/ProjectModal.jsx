import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowSquareOut } from "@phosphor-icons/react";

const backdrop = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.25 } },
  exit:   { opacity: 0, transition: { duration: 0.2, delay: 0.1 } },
};
const sheet = {
  hidden: { opacity: 0, y: 56, filter: "blur(12px)", scale: 0.97 },
  show:   { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, transition: { type: "spring", duration: 0.55, bounce: 0 } },
  exit:   { opacity: 0, y: 20, filter: "blur(4px)", scale: 0.98, transition: { duration: 0.22 } },
};
const bodyStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
};
const bodyItem = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", duration: 0.45, bounce: 0 } },
};

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const esc = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        variants={backdrop} initial="hidden" animate="show" exit="exit"
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
        onClick={e => e.target === e.currentTarget && onClose()}
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(16px)" }}
      >
        <motion.div
          variants={sheet} initial="hidden" animate="show" exit="exit"
          className="relative w-full md:max-w-[720px] max-h-[94dvh] md:max-h-[90dvh] overflow-y-auto hide-scrollbar bg-white dark:bg-zinc-900 rounded-t-3xl md:rounded-3xl"
          style={{
            boxShadow: "0 40px 100px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.06)",
            willChange: "transform, opacity",
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="sticky top-4 ml-auto mr-4 mt-4 z-10 flex w-8 h-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all active:scale-95"
            style={{ float: "right" }}
          >
            <X size={13} weight="bold" />
          </button>

          {/* Hero image with clip-path reveal */}
          <div className="relative aspect-[16/7] overflow-hidden rounded-t-3xl md:rounded-t-3xl">
            <motion.div
              className="w-full h-full"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.77, 0, 0.18, 1] }}
            >
              <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <motion.div
              className="absolute bottom-5 left-6 right-14"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring", duration: 0.5, bounce: 0 }}
            >
              <span className="inline-block font-mono text-[10px] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full mb-2 bg-accent text-white">
                {project.category}
              </span>
              <h2 className="text-[1.5rem] md:text-[2rem] font-bold tracking-[-0.03em] leading-tight text-white">
                {project.title}
              </h2>
            </motion.div>
          </div>

          {/* Body */}
          <motion.div
            variants={bodyStagger} initial="hidden" animate="show"
            className="px-6 md:px-8 py-8 space-y-8"
          >
            {/* Tags + year */}
            <motion.div variants={bodyItem} className="flex flex-wrap gap-2">
              {project.tags.map(t => (
                <span key={t} className="font-mono text-[11px] px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                  {t}
                </span>
              ))}
              <span className="font-mono text-[11px] px-3 py-1 rounded-full border border-dashed border-zinc-200 dark:border-zinc-700 text-zinc-400">
                {project.year}
              </span>
            </motion.div>

            <motion.div variants={bodyItem} className="h-px bg-zinc-100 dark:bg-zinc-800" />

            {/* Overview */}
            <motion.div variants={bodyItem}>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent mb-3">Overview</p>
              <p className="text-[17px] md:text-[19px] font-medium leading-snug tracking-tight text-zinc-800 dark:text-zinc-200">
                {project.overview}
              </p>
            </motion.div>

            {/* Challenge + Solution */}
            <motion.div variants={bodyItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[{ label: "Challenge", text: project.challenge }, { label: "Solution", text: project.solution }].map(({ label, text }) => (
                <div key={label} className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800">
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-zinc-400 dark:text-zinc-500 mb-2">{label}</p>
                  <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed">{text}</p>
                </div>
              ))}
            </motion.div>

            {/* Results */}
            {project.results?.length > 0 && (
              <motion.div variants={bodyItem}>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent mb-4">Results</p>
                <div className="space-y-3">
                  {project.results.map((r, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-[14px] text-zinc-700 dark:text-zinc-300 leading-snug">{r}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Gallery */}
            {project.images?.length > 0 && (
              <motion.div variants={bodyItem}>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-400 mb-4">Gallery</p>
                <div className="space-y-3">
                  {project.images.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                      animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
                      transition={{ delay: 0.65 + i * 0.1, duration: 0.6, ease: [0.77, 0, 0.18, 1] }}
                      className="rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800"
                    >
                      <img src={img} alt={`${project.title} ${i + 1}`} className="w-full object-cover" loading="lazy" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div variants={bodyItem} className="flex gap-3 pt-2 pb-1 border-t border-zinc-100 dark:border-zinc-800">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold bg-accent text-white hover:bg-accent-hover transition-colors active:scale-[0.97]">
                  Live Project <ArrowSquareOut size={13} />
                </a>
              )}
              {project.caseStudyUrl && (
                <a href={project.caseStudyUrl} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors active:scale-[0.97]">
                  Case Study <ArrowSquareOut size={13} />
                </a>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
