"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export const PhotoMarquee: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const photos = [
    { src: "/assets/gallery/gallery-1.jpg", alt: "Private Cabin" },
    { src: "/assets/gallery/gallery-2.jpg", alt: "Collaboration Lounge" },
    { src: "/assets/gallery/gallery-4.jpg", alt: "Dedicated Desks" },
    { src: "/assets/gallery/gallery-5.jpg", alt: "Cafeteria & Pantry" },
    { src: "/assets/gallery/gallery-7.jpg", alt: "Meeting Pod" },
    { src: "/assets/gallery/gallery-8.jpg", alt: "Breakout Area" },
    { src: "/assets/gallery/gallery-9.jpg", alt: "Executive Boardroom" },
    { src: "/assets/gallery/gallery-10.jpg", alt: "Reception Hall" },
  ];

  // Duplicated list for seamless infinite loop
  const duplicated = [...photos, ...photos];

  return (
    <div
      className="relative w-full overflow-hidden py-2"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <motion.div
        animate={!shouldReduceMotion ? { x: ["0%", "-50%"] } : undefined}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex items-center gap-3.5 w-max will-change-transform hover:[animation-play-state:paused]"
      >
        {duplicated.map((item, idx) => {
          const isCurrentHovered = hoveredIdx === idx;
          const isAnyHovered = hoveredIdx !== null;

          return (
            <motion.div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              animate={{
                scale: isCurrentHovered ? 1.15 : 1,
                opacity: isAnyHovered && !isCurrentHovered ? 0.6 : 1,
              }}
              transition={{ duration: 0.25 }}
              className="relative h-20 w-32 sm:h-22 sm:w-36 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-md bg-slate-900 cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="150px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
