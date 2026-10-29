"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, Building, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/site-content";
import { locationsData } from "@/data/locations";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    center: locationsData[0].name,
    workspace: "Private Office Cabin",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      errs.email = "Valid email is required";
    }
    if (!form.phone.trim() || form.phone.length < 10) {
      errs.phone = "Valid 10-digit mobile is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

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
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-md">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-2">Message Received!</h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                  Thank you, <strong>{form.name}</strong>. Our center manager for <strong>{form.center}</strong> will reach out via mobile/email within 1 working hour.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Ananya Patel"
                      value={form.name}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: "" });
                      }}
                      className={`w-full p-3 rounded-xl border ${
                        errors.name ? "border-red-500 bg-red-50/20" : "border-slate-200 bg-slate-50/50"
                      } text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#008fb4]/30`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 mb-1.5">Mobile Number *</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9820012345"
                      value={form.phone}
                      onChange={(e) => {
                        setForm({ ...form, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: "" });
                      }}
                      className={`w-full p-3 rounded-xl border ${
                        errors.phone ? "border-red-500 bg-red-50/20" : "border-slate-200 bg-slate-50/50"
                      } text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#008fb4]/30`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1.5">Work Email *</label>
                    <input
                      type="email"
                      placeholder="e.g. ananya@startup.com"
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                      className={`w-full p-3 rounded-xl border ${
                        errors.email ? "border-red-500 bg-red-50/20" : "border-slate-200 bg-slate-50/50"
                      } text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#008fb4]/30`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 mb-1.5">Interested Location</label>
                    <select
                      value={form.center}
                      onChange={(e) => setForm({ ...form, center: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#008fb4]/30"
                    >
                      {locationsData.map((loc) => (
                        <option key={loc.id} value={loc.name}>
                          {loc.name} ({loc.area})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1.5">Workspace Requirement</label>
                  <select
                    value={form.workspace}
                    onChange={(e) => setForm({ ...form, workspace: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#008fb4]/30"
                  >
                    <option value="Private Office Cabin">Private Office Cabin (2-20+ Seats)</option>
                    <option value="Dedicated Desks">Dedicated Fixed Desks</option>
                    <option value="Flexi Desk (Hot Desk)">Flexi Desk (Hot Desk)</option>
                    <option value="Meeting / Boardroom by the Hour">Meeting / Boardroom by the Hour</option>
                    <option value="Day Pass">Single Day Access Pass</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1.5">Additional Notes / Questions</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your team size, expected move-in date, or specific tech requirements..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#008fb4]/30"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={submitting}
                    icon={<Send className="w-4 h-4" />}
                  >
                    {submitting ? "Transmitting Inquiry..." : "Submit Inquiry to BloomDesk"}
                  </Button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Inquiries are handled directly by BloomDesk center managers. Your privacy is protected.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
