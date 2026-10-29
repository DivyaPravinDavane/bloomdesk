"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2, Tag, ArrowRight } from "lucide-react";
import { imageManifest } from "@/data/image-manifest";
import { SectionHeading } from "../ui/SectionHeading";
import { GalleryLightbox } from "../ui/GalleryLightbox";
import { Button } from "../ui/Button";
import { DepthCard } from "../ui/depth-card";

interface GallerySectionProps {
  onBookTour: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onBookTour }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryImages = imageManifest.gallery;
  const categories = ["All", "Private Office", "Shared Desk", "Meeting Rooms", "Collaboration"];

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#FAFAF8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#008fb4]/10 text-[#008fb4] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008fb4]" />
              Our Gallery
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Inspirational Workspace
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl">
              Take a visual tour inside BloomDesk&apos;s active centers across Borivali and Kandivali. Real photographs of our executive cabins, collaborative work zones, and client presentation suites.
            </p>
          </div>

          <Button
            variant="outline"
            size="md"
            onClick={onBookTour}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Schedule On-Site Visit
          </Button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#008fb4] text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-100 hover:text-[#008fb4] border border-slate-200/70"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Asymmetrical Editorial Gallery Grid with React Bits Pro Depth Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredImages.map((image, index) => {
            const isTall = index % 3 === 0;

            return (
              <DepthCard
                key={image.id}
                image={image.src}
                title={image.alt}
                description={image.caption}
                imageAlt={image.alt}
                width="100%"
                height={isTall ? 380 : 330}
                maxRotation={14}
                maxTranslation={16}
                borderRadius="24px"
                spotlight={true}
                spotlightColor="rgba(0, 143, 180, 0.5)"
                onClick={() => setLightboxIndex(index)}
                ariaLabel={`View photo: ${image.alt}`}
                className="w-full"
                contentClassName="p-5 sm:p-6"
              >
                {/* Top Category Badge */}
                <div className="absolute top-4 left-4 z-20 pointer-events-auto">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-md text-[#0F172A] shadow-md flex items-center gap-1.5 transition-transform duration-300 group-hover:scale-105">
                    <Tag className="w-3 h-3 text-[#008fb4]" />
                    {image.category}
                  </span>
                </div>

                {/* Expand icon on hover with depth elevation */}
                <div className="absolute top-4 right-4 z-20 pointer-events-auto">
                  <div className="w-9 h-9 rounded-full bg-slate-950/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 shadow-md hover:bg-[#008fb4]">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </DepthCard>
            );
          })}
        </div>
      </div>

      {/* Lightbox Component */}
      <GalleryLightbox
        images={filteredImages as any}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </section>
  );
};
