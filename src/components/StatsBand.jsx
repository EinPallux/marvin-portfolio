import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "4+",     label: "Years designing"          },
  { value: "80+",    label: "Figma components built"   },
  { value: "3",      label: "AI tools shipped"         },
  { value: "2026",   label: "B.A. Media Design"        },
];

export default function StatsBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="border-y border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-100 dark:divide-zinc-900">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, type: "spring", duration: 0.55, bounce: 0 }}
              className="py-8 px-6 first:pl-0 last:pr-0"
            >
              <p
                className="text-[2.2rem] md:text-[2.8rem] font-bold tracking-[-0.04em] leading-none mb-1.5"
                style={{ color: "#5b45f5" }}
              >
                {s.value}
              </p>
              <p className="text-[12px] font-medium text-zinc-400 dark:text-zinc-600 tracking-wide">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
