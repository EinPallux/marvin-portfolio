import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer ref={ref} className="relative overflow-hidden pt-32 pb-12"
      style={{ background: "#100e0b", borderTop: "1px solid rgba(61,56,40,0.5)" }}>

      {/* Ghost "04" */}
      <span aria-hidden="true"
        className="absolute select-none font-display font-light pointer-events-none hidden md:block"
        style={{
          fontSize: "clamp(12rem,28vw,26rem)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(181,69,27,0.05)",
          lineHeight: 1,
          left: "-0.1em",
          bottom: "-0.2em",
          letterSpacing: "-0.06em",
          zIndex: 0,
        }}>
        04
      </span>

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-600 mb-6">
            Contact — 04
          </p>
          <h2
            className="font-display font-light leading-[0.92] tracking-tight text-parchment-100 mb-10"
            style={{ fontSize: "clamp(3.2rem,9vw,9rem)" }}
          >
            Let&rsquo;s build
            <br />
            <em style={{ color: "#b5451b" }}>something.</em>
          </h2>

          <a
            href="mailto:hello@marvin.design"
            className="inline-flex items-center gap-2.5 group"
          >
            <EnvelopeSimple size={15} weight="light" className="text-ink-500 group-hover:text-parchment-300 transition-colors" />
            <span className="font-sans text-base font-light text-ink-400 group-hover:text-parchment-200 transition-colors border-b border-transparent group-hover:border-ink-600">
              hello@marvin.design
            </span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center justify-between pt-8"
          style={{ borderTop: "1px solid rgba(61,56,40,0.5)" }}
        >
          <p className="font-mono text-xs text-ink-700">
            &copy; {new Date().getFullYear()} Marvin
          </p>
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
