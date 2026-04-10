import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// A soft warm orb that trails the cursor — arts-y, not techy.
// Completely isolated component, zero re-renders on parent tree.
export default function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const springX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 60, damping: 20, mass: 0.8 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-30 hidden md:block"
      style={{
        left: springX,
        top: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: 320,
        height: 320,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(181,69,27,0.07) 0%, transparent 70%)",
        filter: "blur(2px)",
      }}
    />
  );
}
