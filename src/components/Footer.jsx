import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { EnvelopeSimple, GithubLogo, LinkedinLogo, Check } from "@phosphor-icons/react";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [copied, setCopied] = useState(false);

  const handleCopy = e => {
    e.preventDefault();
    navigator.clipboard.writeText("hello@marvin.design").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative pt-32 pb-12 bg-zinc-950 overflow-hidden"
      style={{ borderTop: "0.5px solid rgba(255,255,255,0.07)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ type: "spring", duration: 0.8, bounce: 0 }}
          className="mb-20"
        >
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-zinc-600 mb-6">
            Get in touch
          </p>
          <h2 className="text-[clamp(3rem,9vw,9rem)] font-bold leading-[0.92] tracking-[-0.04em] text-zinc-100 mb-10">
            Let&rsquo;s build{" "}
            <span style={{ color: "#5b45f5" }}>something.</span>
          </h2>

          {/* Click-to-copy email */}
          <button
            onClick={handleCopy}
            aria-label="Copy email address"
            className="inline-flex items-center gap-3 group"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            {/* Icon swap — envelope ↔ check */}
            <span className="relative w-5 h-5 flex-shrink-0">
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span key="check" className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
                    transition={{ type: "spring", duration: 0.3, bounce: 0 }}>
                    <Check size={16} weight="bold" style={{ color: "#4ade80" }} />
                  </motion.span>
                ) : (
                  <motion.span key="env" className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
                    transition={{ type: "spring", duration: 0.3, bounce: 0 }}>
                    <EnvelopeSimple size={16} weight="light" className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>

            <span className="relative text-[17px] font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
              hello@marvin.design
              {/* Draw-on underline when copied */}
              <motion.span
                className="absolute bottom-0 left-0 h-[1.5px] rounded-full"
                style={{ background: "#4ade80", originX: 0 }}
                animate={{ scaleX: copied ? 1 : 0, opacity: copied ? 1 : 0 }}
                transition={{ type: "spring", duration: 0.4, bounce: 0 }}
              />
            </span>

            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, x: -8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -4 }}
                  transition={{ type: "spring", duration: 0.35, bounce: 0 }}
                  className="font-mono text-[11px] tracking-wide uppercase"
                  style={{ color: "#4ade80" }}
                >
                  Copied
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center justify-between pt-8"
          style={{ borderTop: "0.5px solid rgba(255,255,255,0.07)" }}
        >
          <p className="font-mono text-[11px] text-zinc-700">
            &copy; {new Date().getFullYear()} Marvin. Made with care.
          </p>
          <div className="flex items-center gap-2">
            {[
              { Icon: GithubLogo,   href: "https://github.com",   label: "GitHub"   },
              { Icon: LinkedinLogo, href: "https://linkedin.com", label: "LinkedIn" },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-xl border text-zinc-600 hover:text-zinc-300 hover:border-zinc-600 transition-all active:scale-95"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <Icon size={15} weight="light" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
