"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, MapPin, Users, CheckCircle2, Phone, Mail, Building } from "lucide-react";
import { locationsData } from "@/data/locations";
import { siteConfig } from "@/data/site-content";
import { Button } from "./Button";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedLocation?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedLocation = "",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: preselectedLocation || locationsData[0].name,
    workspaceType: "Dedicated Desk",
    teamSize: "1",
    date: "",
    time: "11:00 AM",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedLocation) {
      setFormData((prev) => ({ ...prev, location: preselectedLocation }));
    }
  }, [preselectedLocation]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      setIsSubmitted(false);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Please provide your full name";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }
    if (!formData.date) newErrors.date = "Please select a preferred date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate immediate smooth confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

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
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col my-auto border border-slate-100"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-[#008fb4] to-[#075f7a] text-white flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-white/80 block">
                  BloomDesk Visit & Tour
                </span>
                <h3 className="text-xl sm:text-2xl font-bold">Schedule a Free Workspace Tour</h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Form or Confirmation */}
            <div className="p-6 sm:p-8">
              {isSubmitted ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">Tour Request Received!</h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                    Thank you, <strong>{formData.name}</strong>. Our center manager for{" "}
                    <strong>{formData.location}</strong> will call you at <strong>{formData.phone}</strong> to confirm your walkthrough on{" "}
                    <strong>{formData.date} at {formData.time}</strong>.
                  </p>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-500 mb-6">
                    Need immediate assistance? Call our direct desk at{" "}
                    <a href={`tel:${siteConfig.contact.primaryPhone}`} className="text-[#008fb4] font-semibold underline">
                      {siteConfig.contact.primaryPhoneFormatted}
                    </a>
                  </div>
                  <Button variant="primary" onClick={onClose} className="w-full">
                    Done
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  {/* Location Selector */}
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#008fb4]" />
                      Select BloomDesk Center
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#008fb4]/30 focus:border-[#008fb4]"
                    >
                      {locationsData.map((loc) => (
                        <option key={loc.id} value={loc.name}>
                          {loc.name} ({loc.area})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Workspace Type & Team Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-[#008fb4]" />
                        Workspace Type
                      </label>
                      <select
                        value={formData.workspaceType}
                        onChange={(e) => setFormData({ ...formData, workspaceType: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#008fb4]/30 focus:border-[#008fb4]"
                      >
                        <option value="Private Office Cabin">Private Office Cabin</option>
                        <option value="Dedicated Desk">Dedicated Desk</option>
                        <option value="Flexi Desk (Hot Desk)">Flexi Desk (Hot Desk)</option>
                        <option value="Meeting Room / Conference">Meeting Room / Conference</option>
                        <option value="Daily Day Pass">Daily Day Pass</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#008fb4]" />
                        Team Size
                      </label>
                      <select
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#008fb4]/30 focus:border-[#008fb4]"
                      >
                        <option value="1">1 Person (Individual)</option>
                        <option value="2-4">2 - 4 Persons</option>
                        <option value="5-10">5 - 10 Persons</option>
                        <option value="11-25">11 - 25 Persons</option>
                        <option value="25+">25+ Persons (Enterprise Suite)</option>
                      </select>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#008fb4]" />
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => {
                          setFormData({ ...formData, date: e.target.value });
                          if (errors.date) setErrors({ ...errors, date: "" });
                        }}
                        className={`w-full p-3 rounded-xl border ${
                          errors.date ? "border-red-500 bg-red-50/30" : "border-slate-200 bg-slate-50/50"
                        } text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#008fb4]/30 focus:border-[#008fb4]`}
                      />
                      {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#008fb4]" />
                        Preferred Time
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#008fb4]/30 focus:border-[#008fb4]"
                      >
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:30 AM">11:30 AM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                        <option value="06:00 PM">06:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact Info: Name, Phone, Email */}
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: "" });
                      }}
                      className={`w-full p-3 rounded-xl border ${
                        errors.name ? "border-red-500 bg-red-50/30" : "border-slate-200 bg-slate-50/50"
                      } text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#008fb4]/30 focus:border-[#008fb4]`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#008fb4]" />
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 9820012345"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: "" });
                        }}
                        className={`w-full p-3 rounded-xl border ${
                          errors.phone ? "border-red-500 bg-red-50/30" : "border-slate-200 bg-slate-50/50"
                        } text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#008fb4]/30 focus:border-[#008fb4]`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#008fb4]" />
                        Work Email
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. rahul@company.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: "" });
                        }}
                        className={`w-full p-3 rounded-xl border ${
                          errors.email ? "border-red-500 bg-red-50/30" : "border-slate-200 bg-slate-50/50"
                        } text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#008fb4]/30 focus:border-[#008fb4]`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Confirming Booking..." : "Confirm Free Tour Booking"}
                    </Button>
                    <p className="text-[11px] text-slate-400 text-center mt-2">
                      Zero commitment required. Free hot coffee included during your visit!
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
