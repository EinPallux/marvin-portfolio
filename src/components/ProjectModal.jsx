import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowSquareOut } from "@phosphor-icons/react";

const backdrop = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.28 } },
  exit:   { opacity: 0, transition: { duration: 0.22, delay: 0.12 } },
};
// Sheet: enters from below with blur+Y. Exits subtler (Jakub: exits less prominent than enters)
const sheet = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)",
    transition: { type: "spring", duration: 0.55, bounce: 0 } },
  exit:   { opacity: 0, y: 16, filter: "blur(4px)",
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
};

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        variants={backdrop}
        initial="hidden" animate="show" exit="exit"
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-8"
        onClick={e => e.target === e.currentTarget && onClose()}
        style={{ background: "rgba(16,14,11,0.78)", backdropFilter: "blur(14px)" }}
      >
        <motion.div
          variants={sheet}
          initial="hidden" animate="show" exit="exit"
          className="relative w-full md:max-w-2xl max-h-[93dvh] md:max-h-[90dvh] overflow-y-auto hide-scrollbar bg-parchment-50 dark:bg-ink-900"
          style={{
            borderRadius: "6px 6px 0 0",
            boxShadow: "0 40px 100px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)",
            willChange: "transform, opacity, filter",
          }}
        >
          {/* Close button — animated icon swap (Jakub: opacity+scale+blur) */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="sticky top-4 mr-4 mt-4 z-10 flex w-8 h-8 items-center justify-center rounded-full border text-ink-400 hover:text-ink-900 dark:hover:text-parchment-100 transition-colors active:scale-95"
            style={{
              float: "right",
              borderColor: "rgba(164,140,112,0.45)",
              background: "rgba(253,250,245,0.92)",
              transition: "background 0.15s, color 0.15s, transform 0.1s",
            }}
          >
            <X size={12} weight="bold" />
          </button>

          {/* Hero image — clip-path reveal */}
          <div className="relative overflow-hidden aspect-[16/7]" style={{ borderRadius: "6px 6px 0 0" }}>
            <motion.div
              className="w-full h-full"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.77, 0, 0.18, 1] }}
            >
              <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
            </motion.div>
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(16,14,11,0.65) 0%, transparent 55%)" }} />
            <motion.div
              className="absolute bottom-5 left-6 right-12"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, type: "spring", duration: 0.5, bounce: 0 }}
            >
              <span className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 mb-2"
                style={{ background: "rgba(181,69,27,0.72)", color: "#fdfaf5", borderRadius: "2px" }}>
                {project.category}
              </span>
              {/* Fixed: merged style props — was two separate style attributes (React bug) */}
              <h2 className="font-display leading-tight"
                style={{ fontSize: "clamp(1.4rem,3vw,1.9rem)", fontWeight: 600, letterSpacing: "-0.02em", color: "#fdfaf5" }}>
                {project.title}
              </h2>
            </motion.div>
          </div>

          {/* Body — staggered section reveals */}
          <motion.div
            className="px-6 md:px-8 py-8 space-y-8"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } } }}
          >
            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-2"
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.4, bounce: 0 } } }}
            >
              {project.tags.map(tag => (
                <span key={tag}
                  className="font-mono text-[10px] tracking-wide px-2.5 py-1 text-ink-400 dark:text-ink-500"
                  style={{ border: "1px solid rgba(164,140,112,0.4)", borderRadius: "2px" }}>
                  {tag}
                </span>
              ))}
              <span className="font-mono text-[10px] tracking-wide px-2.5 py-1 text-ink-400"
                style={{ border: "1px dashed rgba(164,140,112,0.35)", borderRadius: "2px" }}>
                {project.year}
              </span>
            </motion.div>

            <motion.div style={{ borderTop: "1px solid rgba(228,208,176,0.55)" }}
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }} />

            {/* Overview */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 14, filter: "blur(4px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", duration: 0.5, bounce: 0 } } }}
            >
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase mb-3" style={{ color: "#b5451b" }}>Overview</p>
              <p className="font-display text-xl md:text-2xl leading-snug text-ink-700 dark:text-ink-300"
                style={{ fontWeight: 400, letterSpacing: "-0.015em" }}>
                {project.overview}
              </p>
            </motion.div>

            {/* Challenge + Solution */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.5, bounce: 0 } } }}
            >
              {[{ label: "Challenge", text: project.challenge }, { label: "Solution", text: project.solution }].map(({ label, text }) => (
                <div key={label} className="p-5"
                  style={{ background: "rgba(241,230,208,0.5)", borderRadius: "3px" }}>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-400 mb-2">{label}</p>
                  <p className="font-sans text-sm font-light leading-relaxed text-ink-600 dark:text-ink-300">{text}</p>
                </div>
              ))}
            </motion.div>

            {/* Results */}
            {project.results?.length > 0 && (
              <motion.div
                variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.5, bounce: 0 } } }}
              >
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase mb-4" style={{ color: "#b5451b" }}>Results</p>
                <div className="space-y-3">
                  {project.results.map((r, i) => (
                    <motion.div key={i} className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.55 + i * 0.06, type: "spring", duration: 0.4, bounce: 0 }}>
                      <span className="font-mono text-xs flex-shrink-0 mt-px" style={{ color: "#b5451b" }}>0{i + 1}</span>
                      <p className="font-sans text-sm font-light text-ink-600 dark:text-ink-300 leading-snug">{r}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Gallery */}
            {project.images?.length > 0 && (
              <motion.div
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }}
              >
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-400 mb-4">Process &amp; Gallery</p>
                <div className="grid grid-cols-1 gap-3">
                  {project.images.map((img, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                      animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
                      transition={{ delay: 0.7 + i * 0.1, duration: 0.65, ease: [0.77, 0, 0.18, 1] }}
                      style={{ borderRadius: "3px", overflow: "hidden", border: "1px solid rgba(228,208,176,0.55)" }}>
                      <img src={img} alt={`${project.title} ${i + 1}`} className="w-full object-cover" loading="lazy" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div
              className="flex gap-3 pt-3 pb-1"
              style={{ borderTop: "1px solid rgba(228,208,176,0.45)" }}
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.35 } } }}
            >
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-sm font-medium px-5 py-2.5 rounded-full transition-all active:scale-[0.97]"
                  style={{ background: "#b5451b", color: "#fdfaf5" }}>
                  Live Project <ArrowSquareOut size={13} />
                </a>
              )}
              {project.caseStudyUrl && (
                <a href={project.caseStudyUrl} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-sm font-medium px-5 py-2.5 rounded-full border transition-all active:scale-[0.97]"
                  style={{ borderColor: "rgba(164,140,112,0.45)", color: "#5a5240" }}>
                  Full Case Study <ArrowSquareOut size={13} />
                </a>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
