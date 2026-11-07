"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** animate when scrolled into view instead of on mount */
  inView?: boolean;
};

/** Letter-by-letter reveal that rises out of blur. For Latin display type. */
export function SplitText({ text, className, delay = 0, stagger = 0.045, inView = false }: Props) {
  const letters = Array.from(text);
  const trigger = inView ? { whileInView: "show", viewport: { once: true, amount: 0.6 } } : { animate: "show" };

  return (
    <motion.span
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
      role="text"
    >
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block will-change-transform"
          variants={{
            hidden: { opacity: 0, y: "0.45em", rotateX: -70, filter: "blur(12px)" },
            show: {
              opacity: 1,
              y: "0em",
              rotateX: 0,
              filter: "blur(0px)",
              transition: { duration: 1.1, ease: ease.silk },
            },
          }}
          style={{ transformOrigin: "50% 100%" }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </motion.span>
  );
}
