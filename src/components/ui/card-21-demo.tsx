'use client';

import React from "react";
import { DestinationCard } from "@/components/ui/card-21";

export const DestinationCardDemo = () => {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row items-center justify-center gap-8 md:gap-12 p-8 bg-background">
      <div className="w-full max-w-[320px] h-[450px]">
        <DestinationCard
          imageUrl="/assets/gallery/gallery-6.jpg"
          location="Exclusive Workspaces"
          eyebrow="Private & Team Cabins"
          stats="Lockable, bespoke private cabins built for confidential work and scaling teams."
          themeColor="192 90% 25%"
        />
      </div>
      <div className="w-full max-w-[320px] h-[450px]">
        <DestinationCard
          imageUrl="/assets/gallery/gallery-4.jpg"
          location="Shared Workspaces"
          eyebrow="Dedicated & Flexi Desks"
          stats="High-energy collaborative workstations designed for focus and community networking."
          themeColor="215 85% 25%"
        />
      </div>
      <div className="w-full max-w-[320px] h-[450px]">
        <DestinationCard
          imageUrl="/assets/gallery/gallery-3.jpg"
          location="Meeting Rooms"
          eyebrow="Conference & Boardrooms"
          stats="State-of-the-art presentation rooms and event spaces for high-impact discussions."
          themeColor="180 80% 22%"
        />
      </div>
    </div>
  );
};

export default DestinationCardDemo;
