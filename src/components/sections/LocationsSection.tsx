"use client";

import React from "react";
import { LocationsSection as NewLocationsSection } from "./locations";

interface LocationsSectionProps {
  onBookTour?: (locationName?: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onBookTour }) => {
  return <NewLocationsSection onBookTour={onBookTour} />;
};

export default LocationsSection;
