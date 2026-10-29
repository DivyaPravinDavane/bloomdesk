"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { MapPin } from "lucide-react";
import { CENTERS_DATA, LocationFilter } from "./types";
import { FilterTabs } from "./FilterTabs";
import { LocationGrid } from "./LocationGrid";
import { SplitHeadline } from "./SplitHeadline";
import {
  sectionContainerVariants,
  chipEntranceVariants,
} from "./motion";

interface LocationsSectionProps {
  onBookTour?: (locationName?: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onBookTour }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentFilter, setCurrentFilter] = useState<LocationFilter>("All");
  const [hoveredCenterId, setHoveredCenterId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll parallax for ambient background teal orb
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const orbX = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  // Filter centers based on tab
  const filteredCenters =
    currentFilter === "All"
      ? CENTERS_DATA
      : CENTERS_DATA.filter((center) => center.area === currentFilter);

  return (
    <section
      id="locations"
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-[#F5F5F0] overflow-hidden"
    >
      {/* Soft Blurred Teal Orb drifting behind grid with scroll-linked x/y */}
      {!shouldReduceMotion && (
        <motion.div
          style={{ x: orbX, y: orbY }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.5, 0.35],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-[#0891B2]/15 blur-[130px] pointer-events-none"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Entrance Container */}
        <motion.div
          variants={sectionContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full"
        >
          {/* Header Bar: Tiny Chip + Headline + Filter Tabs on the right */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-16">
            <div className="flex flex-col items-start">
              {/* Glass Chip 'LOCATIONS' */}
              <motion.div
                variants={chipEntranceVariants}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-xs mb-3.5 select-none"
              >
                <MapPin className="w-3.5 h-3.5 text-[#0891B2]" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-700">
                  LOCATIONS
                </span>
              </motion.div>

              {/* Headline with Mask Reveal & Gradient Underline */}
              <SplitHeadline text="Find Your Center" />
            </div>

            {/* Filter Tabs: All / Borivali / Kandivali on the right */}
            <div className="self-start md:self-end">
              <FilterTabs
                currentFilter={currentFilter}
                onFilterChange={setCurrentFilter}
              />
            </div>
          </div>

          {/* Simple Grid (3 cols desktop, 2 tablet, 1 mobile) */}
          <LocationGrid
            locations={filteredCenters}
            hoveredCenterId={hoveredCenterId}
            onHoverChange={setHoveredCenterId}
            onBookTour={onBookTour}
          />
        </motion.div>
      </div>
    </section>
  );
};
