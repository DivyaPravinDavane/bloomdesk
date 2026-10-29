"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS } from "./motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  sizes?: string;
  priority?: boolean;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  className = "",
  aspectClass = "w-full h-full",
  sizes = "(max-width: 768px) 100vw, 500px",
  priority = false,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        !shouldReduceMotion
          ? {
              scale: 1.035,
              transition: { type: "spring", ...EASINGS.springBounce },
            }
          : undefined
      }
      className={`relative w-full h-full overflow-hidden cursor-pointer select-none group ${className}`}
    >
      <div className={`relative w-full h-full ${aspectClass}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>
    </motion.div>
  );
};
