"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LocationFilter } from "./types";
import { EASINGS } from "./motion";

interface FilterTabsProps {
  currentFilter: LocationFilter;
  onFilterChange: (filter: LocationFilter) => void;
  className?: string;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  currentFilter,
  onFilterChange,
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();
  const tabs: LocationFilter[] = ["All", "Borivali", "Kandivali"];

  return (
    <div
      className={`inline-flex items-center p-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-xs ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = currentFilter === tab;

        return (
          <button
            key={tab}
            onClick={() => onFilterChange(tab)}
            className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#0891B2] ${
              isActive ? "text-white" : "text-slate-600 hover:text-[#0F172A]"
            }`}
          >
            {/* Sliding Teal Active Pill with layoutId */}
            {isActive && (
              <motion.div
                layoutId="activeLocationTab"
                transition={{
                  type: "spring",
                  ...EASINGS.tabSpring,
                }}
                className="absolute inset-0 rounded-full bg-[#0891B2] shadow-md shadow-[#0891B2]/25"
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        );
      })}
    </div>
  );
};
