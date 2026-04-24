import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { EnvelopeSimple, GithubLogo, LinkedinLogo, Check } from "@phosphor-icons/react";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [copied, setCopied] = useState(false);

  const handleEmailClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("hello@marvin.design").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <footer ref={ref} className="relative overflow-hidden pt-32 pb-12"
      style={{ background: "#100e0b", borderTop: "1px solid rgba(61,56,40,0.5)" }}>

      {/* Ghost 04 */}
      <span aria-hidden="true"
        className="absolute select-none pointer-events-none hidden md:block font-display"
        style={{
          fontSize: "clamp(12rem,28vw,26rem)", color: "transparent",
          WebkitTextStroke: "1px rgba(181,69,27,0.05)", lineHeight: 1,
          left: "-0.1em", bottom: "-0.2em", letterSpacing: "-0.06em", zIndex: 0, fontWeight: 700,
        }}>04</span>

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ type: "spring", duration: 0.8, bounce: 0 }}
          className="mb-20"
        >
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-600 mb-6">Contact — 04</p>
          <h2 className="font-display leading-[0.92] text-parchment-100 mb-10"
            style={{ fontSize: "clamp(3.2rem,9vw,9rem)", fontWeight: 700, letterSpacing: "-0.03em" }}>
            Let&rsquo;s build{" "}
            <span style={{ fontWeight: 400, color: "#b5451b" }}>something.</span>
          </h2>

          {/* Email — click to copy with animated icon swap (Jakub: opacity+scale+blur) */}
          <button
            onClick={handleEmailClick}
            aria-label="Copy email address"
            className="inline-flex items-center gap-2.5 group cursor-pointer"
            style={{ background: "none", border: "none", padding: 0 }}
          >
            {/* Icon swap: envelope ↔ check */}
            <span className="relative w-4 h-4 flex-shrink-0">
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span key="check" className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
                    transition={{ type: "spring", duration: 0.3, bounce: 0 }}>
                    <Check size={15} weight="bold" style={{ color: "#4ade80" }} />
                  </motion.span>
                ) : (
                  <motion.span key="envelope" className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
                    transition={{ type: "spring", duration: 0.3, bounce: 0 }}>
                    <EnvelopeSimple size={15} weight="light" className="text-ink-500 group-hover:text-parchment-300 transition-colors" />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>

            {/* Email text with draw-underline on copy confirmation */}
            <span className="relative font-sans text-base font-light text-ink-400 group-hover:text-parchment-200 transition-colors">
              hello@marvin.design
              {/* Animated underline — draws left to right on copy */}
              <motion.span
                className="absolute bottom-0 left-0 h-px"
                style={{ background: "#4ade80", originX: 0 }}
                animate={{ scaleX: copied ? 1 : 0, opacity: copied ? 1 : 0 }}
                transition={{ type: "spring", duration: 0.4, bounce: 0 }}
              />
            </span>

            {/* "Copied!" label */}
            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, x: -8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -4, filter: "blur(2px)" }}
                  transition={{ type: "spring", duration: 0.35, bounce: 0 }}
                  className="font-mono text-[10px] tracking-wide uppercase"
                  style={{ color: "#4ade80" }}
                >
                  Copied
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex items-center justify-between pt-8"
          style={{ borderTop: "1px solid rgba(61,56,40,0.5)" }}
        >
          <p className="font-mono text-xs text-ink-700">&copy; {new Date().getFullYear()} Marvin</p>
          <div className="flex items-center gap-2">
            {[
              { Icon: GithubLogo,   href: "https://github.com",   label: "GitHub"   },
              { Icon: LinkedinLogo, href: "https://linkedin.com", label: "LinkedIn" },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full border text-ink-600 hover:text-parchment-200 hover:border-ink-500 transition-all active:scale-95"
                style={{ borderColor: "rgba(61,56,40,0.6)" }}>
                <Icon size={14} weight="light" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
