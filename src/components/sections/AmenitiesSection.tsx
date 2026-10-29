"use client";

import React from "react";
import { InfrastructureSection } from "./infrastructure/InfrastructureSection";

// Export as both AmenitiesSection and InfrastructureSection for seamless imports
export const AmenitiesSection: React.FC = () => {
  return <InfrastructureSection />;
};

export { InfrastructureSection };
export default AmenitiesSection;
