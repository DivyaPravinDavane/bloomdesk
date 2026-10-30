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
  const defaultCenter =
    initialLocation ||
    (locationsData.length > 0
      ? `${locationsData[0].name} (${locationsData[0].area})`
      : "Borivali East I (Borivali East)");

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
      <div
        className={`w-full max-w-[780px] mx-auto bg-white p-8 sm:p-12 rounded-[28px] sm:rounded-[32px] border border-slate-200/80 shadow-sm text-center py-14 ${className}`}
      >
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h4 className="text-2xl font-bold text-slate-900 mb-2">Inquiry Submitted!</h4>
        <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
          Thank you, <strong>{form.name}</strong>. Our center manager for{" "}
          <strong>{form.center}</strong> will reach out via mobile/email within 1 working hour.
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
    <div
      className={`w-full max-w-[780px] mx-auto bg-white p-8 sm:p-12 rounded-[28px] sm:rounded-[32px] border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] ${className}`}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Name and Mobile Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
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
              className={`w-full px-4 py-3.5 rounded-xl border ${
                errors.name ? "border-red-500 bg-red-50/20" : "border-slate-200 bg-white"
              } text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#31829e]/20 focus:border-[#31829e] transition-all`}
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
              className={`w-full px-4 py-3.5 rounded-xl border ${
                errors.phone ? "border-red-500 bg-red-50/20" : "border-slate-200 bg-white"
              } text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#31829e]/20 focus:border-[#31829e] transition-all`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Row 2: Work Email and Interested Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
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
              className={`w-full px-4 py-3.5 rounded-xl border ${
                errors.email ? "border-red-500 bg-red-50/20" : "border-slate-200 bg-white"
              } text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#31829e]/20 focus:border-[#31829e] transition-all`}
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
                className="w-full appearance-none px-4 py-3.5 pr-10 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#31829e]/20 focus:border-[#31829e] transition-all cursor-pointer"
              >
                {locationsData.map((loc) => (
                  <option key={loc.id} value={`${loc.name} (${loc.area})`}>
                    {loc.name} ({loc.area})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500">
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
              className="w-full appearance-none px-4 py-3.5 pr-10 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#31829e]/20 focus:border-[#31829e] transition-all cursor-pointer"
            >
              <option value="Private Office Cabin (2-20+ Seats)">
                Private Office Cabin (2-20+ Seats)
              </option>
              <option value="Dedicated Fixed Desks">Dedicated Fixed Desks</option>
              <option value="Flexi Desk (Hot Desk)">Flexi Desk (Hot Desk)</option>
              <option value="Meeting / Boardroom by the Hour">Meeting / Boardroom by the Hour</option>
              <option value="Single Day Access Pass">Single Day Access Pass</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500">
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
            className="w-full p-4 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#31829e]/20 focus:border-[#31829e] transition-all resize-y min-h-[110px]"
          />
        </div>

        {/* Row 5: Action Button and Subtext */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full h-14 rounded-full bg-[#31829e] hover:bg-[#28738c] active:bg-[#206177] text-white font-medium text-base transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-sm hover:shadow active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span>{submitting ? "Submitting Inquiry..." : "Submit Inquiry to BloomDesk"}</span>
            <Send className="w-4 h-4 text-white stroke-[2.2]" />
          </button>
          <p className="text-xs text-slate-400 text-center mt-3.5 font-normal tracking-wide">
            Inquiries are handled directly by BloomDesk center managers. Your privacy is protected.
          </p>
        </div>
      </form>
    </div>
  );
};
