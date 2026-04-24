import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * ClientsBand — infinite dual-row logo marquee
 * Replace your logos by swapping the `name` + optional `url` fields.
 * Each logo renders as a styled wordmark pill.
 */

const clients = [
  { name: "Figma",        type: "design"  },
  { name: "Notion",       type: "product" },
  { name: "Vercel",       type: "tech"    },
  { name: "Linear",       type: "product" },
  { name: "Framer",       type: "design"  },
  { name: "Loom",         type: "tech"    },
  { name: "Miro",         type: "design"  },
  { name: "Webflow",      type: "tech"    },
];

// Duplicate for seamless loop
const row1 = [...clients, ...clients, ...clients];

export default function ClientsBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      className="relative border-y border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 overflow-hidden py-8"
    >
      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-300 dark:text-zinc-700 mb-7 px-6"
      >
        Trusted by &amp; worked alongside
      </motion.p>

      {/* Marquee track */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        {/* Fade edges */}
        <div
          className="absolute inset-y-0 left-0 z-10 w-24 pointer-events-none"
          style={{
            background: "linear-gradient(to right, var(--fade-color, #fff) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 z-10 w-24 pointer-events-none"
          style={{
            background: "linear-gradient(to left, var(--fade-color, #fff) 0%, transparent 100%)",
          }}
        />

        {/* Scrolling row */}
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "clientScroll 32s linear infinite" }}
        >
          {row1.map((client, i) => (
            <LogoPill key={`${client.name}-${i}`} client={client} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function LogoPill({ client }) {
  return (
    <div
      className="inline-flex items-center mx-5 flex-shrink-0 select-none"
    >
      <span
        className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:border-zinc-200 dark:hover:border-zinc-700 transition-all duration-200 cursor-default group"
        style={{ backdropFilter: "blur(8px)" }}
      >
        {/* Generic dot icon — replace with real SVG logos */}
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0 group-hover:bg-accent transition-colors duration-200"
          style={{ background: "currentColor", opacity: 0.5 }}
        />
        <span className="font-mono text-[12px] tracking-[0.08em] font-medium">
          {client.name}
        </span>
      </span>
    </div>
  );
}
