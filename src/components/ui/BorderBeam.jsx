"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BorderBeam = ({
  className,
  size = 150, // Increased default size
  delay = 0,
  duration = 6,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  beamWidth = 100, // Added new parameter for beam width
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      <div className="absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
        <motion.div
          className={cn(
            "absolute blur-[8px]", // Increased blur for a wider effect
            "bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent",
            className
          )}
          style={{
            width: beamWidth * 2, // Double width for more visibility
            height: beamWidth * 2, // Keep it square but larger
            offsetPath: `path("M 0 0 L ${size * 4} 0 L ${size * 4} ${size * 4} L 0 ${size * 4} Z")`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
            ...style,
          }}
          initial={{ offsetDistance: `${initialOffset}%` }}
          animate={{
            offsetDistance: reverse
              ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
              : [`${initialOffset}%`, `${100 + initialOffset}%`],
          }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration,
            delay: -delay,
            ...transition,
          }}
        />
      </div>
    </div>
  );
};

export default BorderBeam;