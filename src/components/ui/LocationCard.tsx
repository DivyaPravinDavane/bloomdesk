"use client";

import React from "react";
import Image from "next/image";
import { MapPin, ArrowUpRight, Users } from "lucide-react";
import { LocationItem } from "@/data/locations";
import { Button } from "./Button";

interface LocationCardProps {
  location: LocationItem;
  onSelect: (location: LocationItem) => void;
  featured?: boolean;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  location,
  onSelect,
  featured = false,
}) => {
  return (
    <div
      className={`group relative flex flex-col rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      {/* Top Image Frame */}
      <div className={`relative w-full overflow-hidden bg-slate-900 ${featured ? "h-72 sm:h-80" : "h-64 sm:h-72"}`}>
        <Image
          src={location.image}
          alt={location.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes={featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-[#0F172A] shadow-sm">
            {location.area}
          </span>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/20">
              {location.sqft}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#008fb4] text-white shadow-sm flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {location.spaceCount}
            </span>
          </div>
        </div>

        {/* Image Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-2xl font-extrabold tracking-tight text-white group-hover:text-[#e8f7fa] transition-colors">
            {location.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 flex items-center gap-1.5 mt-1">
            <MapPin className="w-3.5 h-3.5 text-[#008fb4] shrink-0" />
            {location.landmark}
          </p>
        </div>
      </div>

      {/* Card Action Footer - Clean & Streamlined */}
      <div className="p-5 sm:p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Membership Plans
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-base sm:text-lg font-extrabold text-[#008fb4]">
              From {location.pricing[0]?.price || "₹6,990"}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              /{location.pricing[0]?.period || "mo"}
            </span>
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => onSelect(location)}
          className="w-full sm:w-auto"
          icon={<ArrowUpRight className="w-4 h-4" />}
        >
          View Center & Plans
        </Button>
      </div>
    </div>
  );
};
