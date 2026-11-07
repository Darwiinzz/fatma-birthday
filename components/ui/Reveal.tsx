"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { ease } from "@/lib/utils";

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/** Fade + rise + unblur when scrolled into view. */
export function Reveal({ delay = 0, y = 30, children, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, delay, ease: ease.silk }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
