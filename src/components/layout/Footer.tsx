"use client";

import React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowUpRight, Shield, Heart } from "lucide-react";
import { siteConfig } from "@/data/site-content";
import { locationsData } from "@/data/locations";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0E17] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#hero" className="inline-block">
              <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md inline-block">
                <Image
                  src="/assets/brand/logo.png"
                  alt="BloomDesk"
                  width={160}
                  height={55}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              </div>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              BloomDesk Co-Working Space is based in Mumbai having its multiple locations at Borivali & Kandivali. Providing high-speed internet, fully furnished workstations, meeting rooms, and flexible membership plans.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all text-xs font-semibold border border-emerald-500/20"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Coordinator</span>
              </a>
            </div>
          </div>

          {/* Col 2: Locations (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#008fb4]">
              Mumbai Locations
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {locationsData.map((loc) => (
                <li key={loc.id}>
                  <a
                    href="#locations"
                    className="hover:text-white transition-colors flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#008fb4]" />
                      {loc.name}
                    </span>
                    <span className="text-[11px] text-slate-600 group-hover:text-slate-400">
                      {loc.spaceCount}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Workspaces & Services (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#008fb4]">
              Workspace Plans
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Exclusive Cabins
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Dedicated Desks
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Flexi Hot Desks
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Meeting & Boardrooms
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Daily Day Passes
                </a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-white transition-colors">
                  Amenities & Backup
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#008fb4]">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#008fb4] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Primary Cell</div>
                  <a href={`tel:${siteConfig.contact.primaryPhone}`} className="hover:text-[#008fb4] font-semibold text-sm transition-colors">
                    {siteConfig.contact.primaryPhoneFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#008fb4] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Secondary Desk</div>
                  <a href={`tel:${siteConfig.contact.secondaryPhone}`} className="hover:text-[#008fb4] font-semibold text-sm transition-colors">
                    {siteConfig.contact.secondaryPhoneFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#008fb4] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Official Email</div>
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#008fb4] transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#008fb4] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Operating Hours</div>
                  <div className="text-slate-400">{siteConfig.contact.operationalHours}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {siteConfig.contact.foundedYear}-2026 <strong>{siteConfig.name}.</strong> All Rights Reserved. Mumbai, Maharashtra.
          </div>

          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#about" className="hover:text-slate-300 transition-colors">
              Terms of Use
            </a>
            <span>•</span>
            <a href="#contact" className="hover:text-slate-300 transition-colors">
              Member Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
