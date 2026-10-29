"use client";

import React from "react";
import { DestinationCard } from "../ui/card-21";
import { SectionHeading } from "../ui/SectionHeading";

interface ServicesSectionProps {
  onBookTour: (workspaceType?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookTour }) => {
  const workspaces = [
    {
      id: "exclusive-workspaces",
      title: "Exclusive Workspaces",
      eyebrow: "Private Offices & Suites",
      tagline: "Lockable, bespoke private cabins built for confidential work and scaling teams.",
      image: "/assets/gallery/gallery-6.jpg",
      themeColor: "192 90% 25%", // Signature deep teal
    },
    {
      id: "shared-workspaces",
      title: "Shared Workspaces",
      eyebrow: "Dedicated & Flexi Desks",
      tagline: "High-energy collaborative workstations designed for focus and community networking.",
      image: "/assets/gallery/gallery-4.jpg",
      themeColor: "215 85% 25%", // Deep sapphire teal
    },
    {
      id: "meetings-events",
      title: "Meetings & Events",
      eyebrow: "Conference & Boardrooms",
      tagline: "State-of-the-art presentation rooms and event spaces for high-impact discussions.",
      image: "/assets/gallery/gallery-3.jpg",
      themeColor: "180 80% 22%", // Deep ocean teal
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#FAFAF8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Offer"
          title="Space to Work & Room to Grow"
          subtitle="Explore all three of BloomDesk's core workspace offerings. Each category is fully furnished, equipped with enterprise connectivity, and ready for immediate move-in."
          align="center"
        />

        {/* 3 Destination Cards with Big Background Images, Themed Overlays, and Glowing Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9">
          {workspaces.map((category) => (
            <div key={category.id} className="w-full h-[470px] sm:h-[500px]">
              <DestinationCard
                imageUrl={category.image}
                location={category.title}
                eyebrow={category.eyebrow}
                stats={category.tagline}
                themeColor={category.themeColor}
                onExplore={() => onBookTour(category.title)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
