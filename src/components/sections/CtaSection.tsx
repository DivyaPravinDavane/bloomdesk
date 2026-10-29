"use client";

import React from "react";
import Image from "next/image";
import { Phone, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/site-content";
import { Button } from "../ui/Button";
import { FlowButton } from "../ui/flow-button";

interface CtaSectionProps {
  onBookTour: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onBookTour }) => {
  return (
    <section className="relative py-24 sm:py-28 overflow-hidden bg-slate-950 text-white">
      {/* Background Photography with Original Cyan/Teal Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/cta/cta-bg.jpg"
          alt="BloomDesk Collaborative Atmosphere"
          fill
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0064C6]/90 via-[#087EAD]/90 to-[#053B4C]/95 mix-blend-multiply" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md text-white border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Doing Good, Together.</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Get Inspired to The Collaboration
        </h2>

        <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
          Elevate your team&apos;s daily productivity with an inspiring, fully-managed workspace in Borivali or Kandivali. Transparent pricing, zero lock-in, and instant setup.
        </p>

        {/* Buttons: Direct Phone Call + Book Tour */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`tel:${siteConfig.contact.primaryPhone}`}
            className="inline-flex items-center justify-center font-bold rounded-full text-sm sm:text-base px-7 py-3.5 gap-2.5 bg-white text-[#0F172A] hover:bg-slate-100 shadow-xl transition-all duration-200"
          >
            <Phone className="w-4 h-4 text-[#008fb4]" />
            <span>Call: {siteConfig.contact.primaryPhoneFormatted}</span>
          </a>

          <FlowButton
            text="Schedule Free Walkthrough"
            variant="light"
            onClick={onBookTour}
            icon={<Calendar className="w-4 h-4 ml-1" />}
            className="text-sm sm:text-base font-bold shadow-xl"
          />
        </div>

        <div className="pt-4 text-xs text-slate-300/80">
          Open Monday - Saturday: 8:00 AM - 9:00 PM • 24/7 Access Available for Dedicated Teams
        </div>
      </div>
    </section>
  );
};
