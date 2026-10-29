"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, MapPin, Calendar, ArrowRight, MessageSquare } from "lucide-react";
import { siteConfig } from "@/data/site-content";
import { locationsData } from "@/data/locations";
import { Button } from "../ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onBookTour: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          {/* Menu Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="relative w-full max-w-sm h-full bg-white shadow-2xl z-10 flex flex-col justify-between overflow-y-auto"
          >
            {/* Drawer Top */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/brand/logo.png"
                  alt="BloomDesk"
                  width={140}
                  height={48}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              <nav className="space-y-1">
                {siteConfig.navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-3 px-3 rounded-xl font-semibold text-slate-800 hover:text-[#008fb4] hover:bg-[#008fb4]/5 transition-all text-base"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </a>
                ))}
              </nav>

              {/* Locations Submenu */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-[#008fb4] uppercase tracking-wider block mb-2 px-3">
                  Our Mumbai Centers
                </span>
                <div className="space-y-1">
                  {locationsData.map((loc) => (
                    <a
                      key={loc.id}
                      href="#locations"
                      onClick={onClose}
                      className="flex items-center justify-between py-2 px-3 rounded-lg text-xs font-medium text-slate-600 hover:text-[#008fb4] hover:bg-slate-50 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#008fb4]" />
                        {loc.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">{loc.spaceCount}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Contacts */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5">
                <a
                  href={`tel:${siteConfig.contact.primaryPhone}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-[#008fb4]/10 transition-colors text-slate-800 text-xs font-semibold"
                >
                  <div className="w-8 h-8 rounded-full bg-[#008fb4] text-white flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-medium">Call Location Coordinator</div>
                    <div>{siteConfig.contact.primaryPhoneFormatted}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-[#008fb4]/10 transition-colors text-slate-800 text-xs font-semibold"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-medium">Official Inquiries</div>
                    <div>{siteConfig.contact.email}</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Bottom Book CTA */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-2">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => {
                  onClose();
                  onBookTour();
                }}
                icon={<Calendar className="w-4 h-4" />}
              >
                Schedule Free Tour
              </Button>
              <a
                href={siteConfig.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full border border-emerald-500/30 text-emerald-700 bg-emerald-50/50 hover:bg-emerald-50 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
