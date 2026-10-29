"use client";

import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className = "",
}) => {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  }[align];

  return (
    <div className={`flex flex-col max-w-3xl ${alignClass} ${className} mb-10 md:mb-14 opacity-100`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-3 bg-[#008fb4]/10 text-[#008fb4]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#008fb4]" />
          {eyebrow}
        </div>
      )}

      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
          light ? "text-white" : "text-[#0F172A]"
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-3.5 text-sm sm:text-base lg:text-lg leading-relaxed ${
            light ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
