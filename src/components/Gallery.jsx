import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Placeholder gallery images — swap for real work screenshots
const images = [
  { seed: "gallery-a", ratio: "aspect-[3/4]",  caption: "Brand Identity" },
  { seed: "gallery-b", ratio: "aspect-[4/3]",  caption: "UI Exploration" },
  { seed: "gallery-c", ratio: "aspect-[1/1]",  caption: "Type Study" },
  { seed: "gallery-d", ratio: "aspect-[16/10]", caption: "Dashboard" },
  { seed: "gallery-e", ratio: "aspect-[3/4]",  caption: "Packaging" },
  { seed: "gallery-f", ratio: "aspect-[4/3]",  caption: "Motion Frames" },
  { seed: "gallery-g", ratio: "aspect-[1/1]",  caption: "Icon System" },
  { seed: "gallery-h", ratio: "aspect-[3/4]",  caption: "Visual System" },
];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", duration: 0.6, bounce: 0 }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-600 mb-2">
              Gallery
            </p>
            <h2 className="text-[1.6rem] md:text-[2rem] font-bold tracking-[-0.03em] text-zinc-900 dark:text-zinc-50">
              Visual explorations.
            </h2>
          </div>
          <p className="text-[13px] text-zinc-400 dark:text-zinc-600 hidden md:block">
            Scroll to explore →
          </p>
        </motion.div>
      </div>

      {/* Full-bleed horizontal scroll strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex gap-3 overflow-x-auto hide-scrollbar px-6 md:px-10 pb-2"
        style={{ cursor: "grab" }}
        onMouseDown={e => {
          const el = e.currentTarget;
          let startX = e.pageX - el.offsetLeft;
          let scrollLeft = el.scrollLeft;
          el.style.cursor = "grabbing";
          const onMove = ev => { el.scrollLeft = scrollLeft - (ev.pageX - el.offsetLeft - startX); };
          const onUp = () => { el.style.cursor = "grab"; window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
          window.addEventListener("mousemove", onMove);
          window.addEventListener("mouseup", onUp);
        }}
      >
        {images.map((img, i) => (
          <motion.div
            key={img.seed}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.06, type: "spring", duration: 0.55, bounce: 0 }}
            className="group relative flex-shrink-0 overflow-hidden rounded-2xl"
            style={{ width: img.ratio === "aspect-[3/4]" ? "220px" : img.ratio === "aspect-[4/3]" ? "300px" : img.ratio === "aspect-[16/10]" ? "340px" : "260px" }}
          >
            <div className={`${img.ratio} w-full overflow-hidden`}>
              <motion.img
                src={`https://picsum.photos/seed/${img.seed}/800/800`}
                alt={img.caption}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", duration: 0.6, bounce: 0 }}
                draggable={false}
              />
            </div>
            {/* Caption overlay */}
            <motion.div
              className="absolute inset-0 flex items-end p-3 pointer-events-none"
              initial={false}
            >
              <span
                className="font-mono text-[10px] tracking-wide uppercase px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.85)", backdropFilter: "blur(6px)" }}
              >
                {img.caption}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
