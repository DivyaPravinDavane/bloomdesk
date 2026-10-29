"use client";

import React, { useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { CenterLocation } from "./types";
import { LocationCard } from "./LocationCard";

interface LocationGridProps {
  locations: CenterLocation[];
  hoveredCenterId: string | null;
  onHoverChange: (id: string | null) => void;
  onBookTour?: (name: string) => void;
  className?: string;
}

export const LocationGrid: React.FC<LocationGridProps> = ({
  locations,
  hoveredCenterId,
  onHoverChange,
  onBookTour,
  className = "",
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll parallax for columns 1, 2, 3 (-10px, -30px, -10px)
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });

  const colParallaxCol1 = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const colParallaxCol2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const colParallaxCol3 = useTransform(scrollYProgress, [0, 1], [0, -10]);

  // Determine column index (0, 1, 2)
  const getColY = (index: number) => {
    if (shouldReduceMotion) return 0;
    const col = index % 3;
    if (col === 0) return colParallaxCol1;
    if (col === 1) return colParallaxCol2;
    return colParallaxCol3;
  };

  return (
    <div
      ref={gridRef}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      <AnimatePresence mode="popLayout">
        {locations.map((center, index) => (
          <motion.div
            key={center.id}
            layout
            style={{ y: getColY(index) }}
            className="w-full"
          >
            <LocationCard
              center={center}
              index={index}
              hoveredCenterId={hoveredCenterId}
              onHoverChange={onHoverChange}
              onBookTour={onBookTour}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
