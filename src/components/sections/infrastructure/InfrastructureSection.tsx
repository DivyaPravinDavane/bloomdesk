"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Wifi, Zap, Coffee, Wind, Sparkles, Printer } from "lucide-react";
import { ImageHotspotCard } from "./ImageHotspotCard";
import { StatCard } from "./StatCard";
import { AmenityCard } from "./AmenityCard";
import { sectionContainerVariants } from "./motion";

export const InfrastructureSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll Progress Tracking for Edge Indicator & Parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });

  // Parallax translation for left image card (moves ±40px slower than right column)
  const leftColumnY = useTransform(smoothProgress, [0, 1], [-30, 30]);

  // Section scroll progress bar height (0% -> 100%)
  const progressHeight = useTransform(smoothProgress, [0.1, 0.9], ["0%", "100%"]);

  const amenities = [
    {
      title: "Fast Optical Fiber",
      description:
        "High-speed redundant dual-ISP fiber optic internet with low-latency Wi-Fi 6 coverage across every corner.",
      icon: <Wifi className="w-5 h-5" />,
    },
    {
      title: "100% UPS & DG Backup",
      description:
        "Uninterrupted power supply with automatic diesel generator switchover to keep your workstations alive 24/7.",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      title: "Unlimited Tea & Coffee",
      description:
        "Freshly brewed artisan coffee, masala chai, green tea varieties, and pure reverse-osmosis drinking water on tap.",
      icon: <Coffee className="w-5 h-5" />,
    },
    {
      title: "Precision Climate Control",
      description:
        "Commercial multi-zone air conditioning ensuring ideal ambient temperatures for focused and productive work.",
      icon: <Wind className="w-5 h-5" />,
    },
    {
      title: "Dedicated Housekeeping",
      description:
        "Full-time on-site cleaning staff conducting continuous desk sanitization, waste collection, and restroom maintenance.",
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      title: "Business Scanner & Printer",
      description:
        "High-capacity multifunction laser printing, copying, and optical document scanning for all your business documentation.",
      icon: <Printer className="w-5 h-5" />,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="amenities"
      className="relative py-20 lg:py-28 bg-[#F5F5F0] overflow-hidden"
    >
      {/* Scroll-Linked Thin Teal Progress Indicator on Left Edge */}
      {!shouldReduceMotion && (
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-slate-300/40 z-20 hidden md:block">
          <motion.div
            style={{ height: progressHeight }}
            className="w-full bg-gradient-to-b from-[#0891B2] to-cyan-500 shadow-sm shadow-[#0891B2]/50 origin-top"
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Orchestrated Section Entrance Container */}
        <motion.div
          variants={sectionContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
        >
          {/* LEFT COLUMN: ~40% (5 cols) with Image Hotspot Card & Parallax */}
          <motion.div
            style={{
              y: shouldReduceMotion ? 0 : leftColumnY,
            }}
            className="lg:col-span-5 relative"
          >
            <ImageHotspotCard />
          </motion.div>

          {/* RIGHT COLUMN: ~60% (7 cols) with Stat Card & 2x3 Amenity Grid */}
          <div className="lg:col-span-7 space-y-6">
            {/* (a) Teal Gradient Hero Stat Card */}
            <StatCard />

            {/* (b) 2x3 Grid of Amenity Cards with Cascading Stagger */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {amenities.map((item, idx) => (
                <AmenityCard
                  key={idx}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InfrastructureSection;
