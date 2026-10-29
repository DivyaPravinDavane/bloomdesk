"use client";

import React from "react";
import { VelocityMarquee } from "./VelocityMarquee";
import { LogoItem } from "./types";

export interface LogoMarqueeProps {
  speed?: number;
  logos: LogoItem[];
  isSectionHovered?: boolean;
  className?: string;
}

export const LogoMarquee: React.FC<LogoMarqueeProps> = ({
  speed = 35,
  logos,
  isSectionHovered = false,
  className = "",
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <VelocityMarquee
        logos={logos}
        speed={speed}
        isSectionHovered={isSectionHovered}
      />
    </div>
  );
};
