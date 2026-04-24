import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 55, damping: 18, mass: 0.9 });
  const sy = useSpring(y, { stiffness: 55, damping: 18, mass: 0.9 });

  useEffect(() => {
    const fn = e => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-30 hidden md:block"
      style={{
        left: sx, top: sy,
        translateX: "-50%", translateY: "-50%",
        width: 360, height: 360,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(91,69,245,0.07) 0%, transparent 70%)",
        filter: "blur(1px)",
      }}
    />
  );
}
