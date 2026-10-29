"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Train, Bus, Plane, CheckCircle2, Phone, Calendar, ArrowRight } from "lucide-react";
import { LocationItem } from "@/data/locations";
import { Button } from "./Button";
import { siteConfig } from "@/data/site-content";

interface LocationModalProps {
  location: LocationItem | null;
  isOpen: boolean;
  onClose: () => void;
  onBookTour: (locationName: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  location,
  isOpen,
  onClose,
  onBookTour,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!location) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto border border-slate-100"
          >
            {/* Modal Header Bar */}
            <div className="relative h-64 sm:h-72 w-full shrink-0 overflow-hidden bg-slate-900">
              <Image
                src={location.image}
                alt={location.name}
                fill
                priority
                className="object-cover opacity-85"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Titles */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#008fb4] text-white">
                    {location.spaceCount}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white">
                    {location.sqft}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/80 text-white">
                    Active Center
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {location.name}
                </h3>
                <p className="text-sm text-slate-200 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#008fb4] shrink-0" />
                  {location.landmark}
                </p>
              </div>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1 text-[#0F172A]">
              {/* Overview */}
              <div>
                <h4 className="text-xs font-bold text-[#008fb4] uppercase tracking-wider mb-2">
                  About This Center
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  {location.overview}
                </p>
                <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-600 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#008fb4] shrink-0 mt-0.5" />
                  <span>
                    <strong>Address:</strong> {location.address}
                  </span>
                </div>
              </div>

              {/* Transit & Commute Highlights */}
              <div>
                <h4 className="text-xs font-bold text-[#008fb4] uppercase tracking-wider mb-3">
                  Commute & Connectivity
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#008fb4]/5 border border-[#008fb4]/15">
                    <Train className="w-5 h-5 text-[#008fb4] shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">Metro Connectivity</div>
                      <div className="text-xs text-slate-600">{location.transit.metro}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#008fb4]/5 border border-[#008fb4]/15">
                    <Train className="w-5 h-5 text-[#008fb4] shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">Railway Station</div>
                      <div className="text-xs text-slate-600">{location.transit.railway}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#008fb4]/5 border border-[#008fb4]/15">
                    <Bus className="w-5 h-5 text-[#008fb4] shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">Bus Connectivity</div>
                      <div className="text-xs text-slate-600">{location.transit.bus}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#008fb4]/5 border border-[#008fb4]/15">
                    <Plane className="w-5 h-5 text-[#008fb4] shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">Airport Access</div>
                      <div className="text-xs text-slate-600">{location.transit.airport}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing & Workspace Plans */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-[#008fb4] uppercase tracking-wider">
                    Available Workspace Plans & Pricing
                  </h4>
                  <span className="text-xs text-slate-400">All-Inclusive Transparent Pricing</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {location.pricing.map((plan, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-[#008fb4]/40 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs font-semibold text-[#008fb4] uppercase tracking-wider block">
                            {plan.capacity || "Workspace"}
                          </span>
                          <h5 className="font-bold text-slate-900 text-base">{plan.plan}</h5>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-extrabold text-[#0F172A]">{plan.price}</span>
                          <span className="text-xs text-slate-500 block">/{plan.period}</span>
                        </div>
                      </div>
                      <ul className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
                        {plan.features.map((feat, fIdx) => (
                          <li key={fIdx} className="text-xs text-slate-600 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center Amenities */}
              <div>
                <h4 className="text-xs font-bold text-[#008fb4] uppercase tracking-wider mb-2.5">
                  Included Amenities At This Center
                </h4>
                <div className="flex flex-wrap gap-2">
                  {location.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008fb4]" />
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-slate-500 text-center sm:text-left">
                Need customized enterprise team cabin or flexible billing?
                <br />
                Call our location coordinator directly at{" "}
                <a href={`tel:${siteConfig.contact.primaryPhone}`} className="text-[#008fb4] font-semibold underline">
                  {siteConfig.contact.primaryPhoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  href={`tel:${siteConfig.contact.primaryPhone}`}
                  icon={<Phone className="w-3.5 h-3.5" />}
                  iconPosition="left"
                  className="flex-1 sm:flex-initial"
                >
                  Call Now
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    onClose();
                    onBookTour(location.name);
                  }}
                  icon={<Calendar className="w-3.5 h-3.5" />}
                  className="flex-1 sm:flex-initial"
                >
                  Schedule Free Tour
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
