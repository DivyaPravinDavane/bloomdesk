"use client";

import React from "react";
import { AboutSection as ModernAboutSection } from "./about/AboutSection";

interface AboutSectionProps {
  onBookTour?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onBookTour }) => {
  return <ModernAboutSection onBookTour={onBookTour} />;
};

export default AboutSection;
