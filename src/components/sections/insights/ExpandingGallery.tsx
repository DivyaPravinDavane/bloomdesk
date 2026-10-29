"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { BlogCard, BlogItem } from "./BlogCard";

interface ExpandingGalleryProps {
  items: BlogItem[];
  onSelectArticle?: (item: BlogItem) => void;
}

export const ExpandingGallery: React.FC<ExpandingGalleryProps> = ({
  items,
  onSelectArticle,
}) => {
  // First card is expanded by default (index 0)
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll Parallax: card 1: -20px, card 2: -40px, card 3: -20px
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
  });

  const yCard1 = useTransform(smoothProgress, [0, 1], [15, -20]);
  const yCard2 = useTransform(smoothProgress, [0, 1], [30, -40]);
  const yCard3 = useTransform(smoothProgress, [0, 1], [15, -20]);

  const scrollOffsets = [yCard1, yCard2, yCard3];

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Desktop View: Expanding Flex Gallery (>=1024px) */}
      <div className="hidden lg:flex items-stretch gap-6 w-full">
        {items.map((item, idx) => (
          <BlogCard
            key={item.id}
            item={item}
            isExpanded={activeIdx === idx}
            onHover={() => setActiveIdx(idx)}
            onClick={() => {
              setActiveIdx(idx);
              onSelectArticle?.(item);
            }}
            scrollYOffset={shouldReduceMotion ? 0 : scrollOffsets[idx]?.get() ?? 0}
          />
        ))}
      </div>

      {/* Tablet & Mobile View: Snap-Scroll Carousel with Expanded Cards (<1024px) */}
      <div className="lg:hidden flex items-stretch gap-5 overflow-x-auto snap-x snap-mandatory pb-6 px-1 no-scrollbar">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="w-[88vw] sm:w-[420px] shrink-0 snap-center"
          >
            <BlogCard
              item={item}
              isExpanded={true}
              onHover={() => {}}
              onClick={() => onSelectArticle?.(item)}
              scrollYOffset={0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
