"use client";

import React, { useState } from "react";
import { ChevronDown, Phone, Check } from "lucide-react";
import { faqsData } from "@/data/faqs";
import { siteConfig } from "@/data/site-content";
import { SectionHeading } from "../ui/SectionHeading";

export const FaqSection: React.FC = () => {
  // Allow multiple or all to be open, and default all to open so 100% of answers are visible!
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);

  const toggle = (idx: number) => {
    if (openIndices.includes(idx)) {
      setOpenIndices(openIndices.filter((i) => i !== idx));
    } else {
      setOpenIndices([...openIndices, idx]);
    }
  };

  const toggleAll = () => {
    if (openIndices.length === faqsData.length) {
      setOpenIndices([]);
    } else {
      setOpenIndices(faqsData.map((_, i) => i));
    }
  };

  return (
    <section id="faqs" className="py-20 lg:py-28 bg-[#F5F5F0] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Frequently Asked Questions"
          title="Everything You Need to Know"
          subtitle="Clear, transparent answers about BloomDesk memberships, move-in procedures, infrastructure, and meeting room usage."
          align="center"
        />

        {/* Expand/Collapse Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleAll}
            className="text-xs font-bold text-[#008fb4] hover:underline cursor-pointer"
          >
            {openIndices.length === faqsData.length ? "Collapse All Questions" : "Expand All Questions"}
          </button>
        </div>

        {/* FAQs List - All Answers Visible by Default */}
        <div className="space-y-4">
          {faqsData.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);

            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:text-[#008fb4] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-extrabold text-slate-900 pr-2">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#008fb4]/10 text-[#008fb4]" : "text-slate-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-200/80 text-center space-y-2">
          <h4 className="text-sm font-bold text-slate-900">Have a specific requirement?</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Need customized executive cabins, custom IT setup, or multiple branch access? Speak directly with our Mumbai space coordinator.
          </p>
          <div className="pt-2">
            <a
              href={`tel:${siteConfig.contact.primaryPhone}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#008fb4] hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call us at {siteConfig.contact.primaryPhoneFormatted}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
