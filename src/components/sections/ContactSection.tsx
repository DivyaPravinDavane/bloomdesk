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

        {/* Standalone Centered Inquiry Form matching the design screenshot */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <InquiryForm />
        </div>

        {/* Quick Contact & Transparency Info Pills below form */}
        <div className="max-w-[780px] mx-auto mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href={`tel:${siteConfig.contact.primaryPhone}`}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow hover:border-[#31829e]/40 transition-all flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#31829e]/10 text-[#31829e] flex items-center justify-center shrink-0 group-hover:bg-[#31829e] group-hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                Direct Helpline
              </span>
              <span className="text-sm font-bold text-slate-800">
                {siteConfig.contact.primaryPhoneFormatted}
              </span>
            </div>
          </a>

          <a
            href={siteConfig.socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow hover:border-emerald-500/40 transition-all flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                WhatsApp Desk
              </span>
              <span className="text-sm font-bold text-slate-800">
                Chat with Manager
              </span>
            </div>
          </a>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#31829e]/10 text-[#31829e] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                Zero Brokerage
              </span>
              <span className="text-xs font-semibold text-slate-700 leading-tight block">
                100% direct manager pricing
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
