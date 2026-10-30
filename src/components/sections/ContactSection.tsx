"use client";

import React from "react";
import { Phone, Mail, Clock, MessageSquare, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/site-content";
import { SectionHeading } from "../ui/SectionHeading";
import { InquiryForm } from "../ui/inquiry-form";

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#FAFAF8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Connect with Our Mumbai Workspace Team"
          subtitle="Have questions about office availability, corporate team cabins, or daily rates? Drop us a line or call our center coordinators directly."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#0F172A] text-white space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#008fb4] block mb-1">
                  Official Communication
                </span>
                <h3 className="text-2xl font-bold">BloomDesk Mumbai Offices</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Multiple fully-furnished centers across Borivali East, Borivali West, and Kandivali West.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#008fb4]/20 text-[#008fb4] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                      Primary Telephone
                    </span>
                    <a
                      href={`tel:${siteConfig.contact.primaryPhone}`}
                      className="text-base font-bold text-white hover:text-[#008fb4] transition-colors"
                    >
                      {siteConfig.contact.primaryPhoneFormatted}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#008fb4]/20 text-[#008fb4] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                      Secondary Desk
                    </span>
                    <a
                      href={`tel:${siteConfig.contact.secondaryPhone}`}
                      className="text-base font-bold text-white hover:text-[#008fb4] transition-colors"
                    >
                      {siteConfig.contact.secondaryPhoneFormatted}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#008fb4]/20 text-[#008fb4] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                      Email Inquiries
                    </span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-base font-bold text-white hover:text-[#008fb4] transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#008fb4]/20 text-[#008fb4] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                      Working Hours
                    </span>
                    <div className="text-slate-300 font-medium">
                      {siteConfig.contact.operationalHours}
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-2">
                <a
                  href={siteConfig.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat with Us on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Coverage note */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 text-xs text-slate-600 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#008fb4] shrink-0" />
              <span>
                100% transparent pricing with zero brokerage or hidden administrative charges.
              </span>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
};
