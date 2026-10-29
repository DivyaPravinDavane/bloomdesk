"use client";

import React from "react";
import { Hero } from "./hero";

interface HeroSectionProps {
  onBookTour?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBookTour }) => {
  return <Hero onBookTour={onBookTour} />;
};

export { Hero };
