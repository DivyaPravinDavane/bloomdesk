"use client";

import React, { useState } from "react";
import { Send, ChevronDown, CheckCircle2 } from "lucide-react";
import { locationsData } from "@/data/locations";

export interface InquiryFormData {
  name: string;
  phone: string;
  email: string;
  center: string;
  workspace: string;
  message: string;
}

export interface InquiryFormProps {
  initialLocation?: string;
  initialWorkspace?: string;
  onSuccess?: (data: InquiryFormData) => void;
  className?: string;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  initialLocation,
  initialWorkspace = "Private Office Cabin (2-20+ Seats)",
  onSuccess,
  className = "",
}) => {
  const defaultCenter = initialLocation || (locationsData.length > 0 ? `${locationsData[0].name} (${locationsData[0].area})` : "Borivali East I (Borivali East)");

  const [form, setForm] = useState<InquiryFormData>({
    name: "",
    phone: "",
    email: "",
    center: defaultCenter,
    workspace: initialWorkspace,
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.phone.trim() || form.phone.length < 10) {
      errs.phone = "Valid 10-digit mobile number is required";
    }
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      errs.email = "Valid work email is required";
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
      if (onSuccess) onSuccess(form);
    }, 600);
  };

  if (submitted) {
    return (
      <div className={`w-full bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm text-center py-12 ${className}`}>
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h4 className="text-2xl font-bold text-slate-900 mb-2">Inquiry Submitted!</h4>
        <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
          Thank you, <strong>{form.name}</strong>. Our center manager for <strong>{form.center}</strong> will reach out via mobile/email within 1 working hour.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm({
              name: "",
              phone: "",
              email: "",
              center: defaultCenter,
              workspace: initialWorkspace,
              message: "",
            });
            setSubmitted(false);
          }}
          className="px-6 py-2.5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-sm transition-colors cursor-pointer"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className={`w-full bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/70 shadow-sm ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Row 1: Name and Mobile Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Ananya Patel"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.name ? "border-red-500 bg-red-50/20" : "border-slate-200 bg-white"
              } text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#3186a2]/25 focus:border-[#3186a2] transition-colors`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Mobile Number *
            </label>
            <input
              type="tel"
              placeholder="e.g. 9820012345"
              value={form.phone}
              onChange={(e) => {
                setForm({ ...form, phone: e.target.value });
                if (errors.phone) setErrors({ ...errors, phone: "" });
              }}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.phone ? "border-red-500 bg-red-50/20" : "border-slate-200 bg-white"
              } text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#3186a2]/25 focus:border-[#3186a2] transition-colors`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Row 2: Work Email and Interested Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Work Email *
            </label>
            <input
              type="email"
              placeholder="e.g. ananya@startup.com"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.email ? "border-red-500 bg-red-50/20" : "border-slate-200 bg-white"
              } text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#3186a2]/25 focus:border-[#3186a2] transition-colors`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Interested Location
            </label>
            <div className="relative">
              <select
                value={form.center}
                onChange={(e) => setForm({ ...form, center: e.target.value })}
                className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#3186a2]/25 focus:border-[#3186a2] transition-colors cursor-pointer"
              >
                {locationsData.map((loc) => (
                  <option key={loc.id} value={`${loc.name} (${loc.area})`}>
                    {loc.name} ({loc.area})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-600">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Workspace Requirement */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Workspace Requirement
          </label>
          <div className="relative">
            <select
              value={form.workspace}
              onChange={(e) => setForm({ ...form, workspace: e.target.value })}
              className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#3186a2]/25 focus:border-[#3186a2] transition-colors cursor-pointer"
            >
              <option value="Private Office Cabin (2-20+ Seats)">Private Office Cabin (2-20+ Seats)</option>
              <option value="Dedicated Fixed Desks">Dedicated Fixed Desks</option>
              <option value="Flexi Desk (Hot Desk)">Flexi Desk (Hot Desk)</option>
              <option value="Meeting / Boardroom by the Hour">Meeting / Boardroom by the Hour</option>
              <option value="Single Day Access Pass">Single Day Access Pass</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-600">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Row 4: Additional Notes / Questions */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Additional Notes / Questions
          </label>
          <textarea
            rows={4}
            placeholder="Tell us about your team size, expected move-in date, or specific tech requirements..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full p-4 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#3186a2]/25 focus:border-[#3186a2] transition-colors resize-y"
          />
        </div>

        {/* Row 5: Action Button and Subtext */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 px-6 rounded-full bg-[#3186a2] hover:bg-[#28738c] active:bg-[#206379] text-white font-medium text-base transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span>{submitting ? "Submitting Inquiry..." : "Submit Inquiry to BloomDesk"}</span>
            <Send className="w-4 h-4 text-white" />
          </button>
          <p className="text-xs text-slate-400 text-center mt-3 font-normal">
            Inquiries are handled directly by BloomDesk center managers. Your privacy is protected.
          </p>
        </div>
      </form>
    </div>
  );
};
