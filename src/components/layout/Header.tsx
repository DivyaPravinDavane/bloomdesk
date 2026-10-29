"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Calendar, Menu, ChevronDown, MapPin, Sparkles, MessageSquare } from "lucide-react";
import { siteConfig } from "@/data/site-content";
import { locationsData } from "@/data/locations";
import { Button } from "../ui/Button";

interface HeaderProps {
  onBookTour: () => void;
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onBookTour,
  onOpenMobileMenu,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isLocationsHovered, setIsLocationsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple active section spy
      const sections = siteConfig.navItems.map((n) => n.href.replace("#", ""));
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Micro-Bar (Visible when not scrolled) */}
      <div
        className={`w-full bg-[#0F172A] text-slate-300 text-xs py-2 px-4 transition-all duration-300 ${
          isScrolled ? "-translate-y-full opacity-0 h-0 p-0 overflow-hidden" : "translate-y-0 opacity-100"
        } hidden sm:block`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-[#008fb4]" />
              Premium Coworking & Private Cabins in Mumbai
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Borivali East & West | Kandivali West</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`tel:${siteConfig.contact.primaryPhone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#008fb4]" />
              <span>{siteConfig.contact.primaryPhoneFormatted}</span>
            </a>
            <span className="text-slate-600">•</span>
            <a
              href={siteConfig.socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "glass-panel py-3 shadow-md border-b border-slate-200/80"
            : "bg-white/95 backdrop-blur-md py-4 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group cursor-pointer">
            <Image
              src="/assets/brand/logo.png"
              alt="BloomDesk"
              width={160}
              height={55}
              priority
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {siteConfig.navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");

              if (item.label === "Locations") {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setIsLocationsHovered(true)}
                    onMouseLeave={() => setIsLocationsHovered(false)}
                  >
                    <a
                      href={item.href}
                      className={`px-3.5 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 flex items-center gap-1 ${
                        isActive
                          ? "text-[#008fb4] bg-[#008fb4]/10"
                          : "text-slate-700 hover:text-[#008fb4] hover:bg-slate-100/70"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isLocationsHovered ? "rotate-180 text-[#008fb4]" : "text-slate-400"
                        }`}
                      />
                    </a>

                    {/* Locations Dropdown Menu */}
                    <AnimatePresence>
                      {isLocationsHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-80 p-3 bg-white rounded-2xl shadow-xl border border-slate-200/80 z-50 mt-1"
                        >
                          <div className="px-3 py-1.5 mb-1 text-[11px] font-bold uppercase tracking-wider text-[#008fb4]">
                            5 Mumbai Locations
                          </div>
                          <div className="space-y-1">
                            {locationsData.map((loc) => (
                              <a
                                key={loc.id}
                                href="#locations"
                                onClick={() => setIsLocationsHovered(false)}
                                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#008fb4]/5 transition-colors group/item"
                              >
                                <div>
                                  <div className="text-xs font-bold text-slate-800 group-hover/item:text-[#008fb4] transition-colors flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-[#008fb4]" />
                                    {loc.name}
                                  </div>
                                  <div className="text-[11px] text-slate-400 pl-5">{loc.transit.metro}</div>
                                </div>
                                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                                  {loc.spaceCount}
                                </span>
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-[#008fb4] bg-[#008fb4]/10"
                      : "text-slate-700 hover:text-[#008fb4] hover:bg-slate-100/70"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Header CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${siteConfig.contact.primaryPhone}`}
              className="hidden xl:inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold text-slate-700 hover:text-[#008fb4] hover:bg-slate-100/70 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#008fb4]" />
              <span>{siteConfig.contact.primaryPhoneFormatted}</span>
            </a>

            <Button
              variant="primary"
              size="sm"
              onClick={onBookTour}
              icon={<Calendar className="w-3.5 h-3.5" />}
            >
              Book a Tour
            </Button>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={onOpenMobileMenu}
            aria-label="Open Navigation Menu"
            className="lg:hidden p-2 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>
    </>
  );
};
