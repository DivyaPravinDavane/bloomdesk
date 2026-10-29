"use client";

import React from "react";
import { ScrollReelTestimonials, ScrollReelTestimonial } from "@/components/ui/scroll-reel-testimonials";
import { SectionHeading } from "../ui/SectionHeading";

const BLOOMDESK_TESTIMONIALS: ScrollReelTestimonial[] = [
  {
    quote:
      "Transitioning our design studio from a conventional lease to BloomDesk Orion cut our overhead by nearly 45% while upgrading our client presentation setup. The 2-minute walk from Borivali station makes client meetings effortless.",
    author: "Rohan Varma — Founder & Creative Director, PixelCraft Digital (Borivali West Orion)",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    alt: "Portrait of Rohan Varma",
  },
  {
    quote:
      "The quiet, professional atmosphere and rock-solid optical fiber connection are what keep our financial consulting team here. Having professional meeting rooms on Western Express Highway right next to Metro Line 7 is a massive advantage.",
    author: "Meera Sen — Senior Consultant, FinAdvisory Partners (Borivali East II)",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    alt: "Portrait of Meera Sen",
  },
  {
    quote:
      "We took a 6-seater private cabin at BloomDesk 4.0 in Kandivali. Having the Metro entrance literally outside the building front door has eliminated commuting stress for our entire tech crew. Super clean facilities and prompt management.",
    author: "Aditya Kulkarni — Engineering Lead, NexScale Cloud (Kandivali West)",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    alt: "Portrait of Aditya Kulkarni",
  },
  {
    quote:
      "BloomDesk was born from the notion that people work better when they work together, even if they are working on completely different projects.",
    author: "Silvester Scott — Web Designer & Digital Creative",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    alt: "Portrait of Silvester Scott",
  },
  {
    quote:
      "I was skeptical at first, but man was I pleasantly surprised! I was so used to the traditional world of work, I had never thought about how productive and cost-effective flexible coworking could be.",
    author: "Dahlia Bianca — Legal Advisory & Private Cabin Member",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    alt: "Portrait of Dahlia Bianca",
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#FAFAF8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Member Stories"
          title="Loved by Growing Teams & Founders"
          subtitle="Discover how independent consultants, tech scale-ups, and creative studios leverage BloomDesk to work smarter in Mumbai."
          align="center"
        />

        {/* Counter-Rotating Scroll Reel Testimonials Component */}
        <div className="flex items-center justify-center">
          <ScrollReelTestimonials
            testimonials={BLOOMDESK_TESTIMONIALS}
            charStaggerMs={5}
            className="shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};
