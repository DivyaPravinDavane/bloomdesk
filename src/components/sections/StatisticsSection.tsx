"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site-content";
import { AnimatedCounter } from "../ui/AnimatedCounter";

export const StatisticsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#0F172A] text-white relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#008fb4]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
          {siteConfig.stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center p-6 ${idx !== 0 ? "sm:pl-8" : ""}`}
            >
              {/* Stat Icon */}
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 p-2.5">
                <Image
                  src={stat.iconPath}
                  alt={stat.label}
                  width={40}
                  height={40}
                  className="object-contain brightness-0 invert"
                />
              </div>

              {/* Number Value - 100% visible */}
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-2 flex items-center justify-center">
                <AnimatedCounter value={stat.value} duration={1500} />
                <span className="text-[#008fb4] ml-0.5">{stat.suffix}</span>
              </div>

              {/* Label */}
              <h3 className="text-base font-bold text-slate-100 mb-1">{stat.label}</h3>

              {/* Description */}
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
