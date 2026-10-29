"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustedSection } from "@/components/sections/trusted";
import { LocationsSection } from "@/components/sections/LocationsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { AmenitiesSection } from "@/components/sections/AmenitiesSection";
import { StatisticsSection } from "@/components/sections/StatisticsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { InsightsSection } from "@/components/sections/InsightsSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { BookingModal } from "@/components/ui/BookingModal";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingLocation, setBookingLocation] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOpenBooking = (locationName?: string) => {
    if (locationName) setBookingLocation(locationName);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#0F172A] selection:bg-[#008fb4]/20 selection:text-[#075f7a]">
      {/* Global Navigation Header */}
      <Header
        onBookTour={() => handleOpenBooking()}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onBookTour={() => handleOpenBooking()}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection onBookTour={() => handleOpenBooking()} />

        {/* 2. Client & Community Partner Logos */}
        <TrustedSection />

        {/* 3. Our 5 Mumbai Locations */}
        <LocationsSection onBookTour={(loc) => handleOpenBooking(loc)} />

        {/* 4. What We Offer: Exclusive, Shared, Meetings */}
        <ServicesSection onBookTour={(type) => handleOpenBooking(type)} />

        {/* 5. About BloomDesk: Story & Mission */}
        <AboutSection onBookTour={() => handleOpenBooking()} />

        {/* 6. Inspirational Workspace Gallery */}
        <GallerySection onBookTour={() => handleOpenBooking()} />

        {/* 7. Comprehensive Amenities & Features */}
        <AmenitiesSection />

        {/* 8. Verified Statistics & Numerical Highlights */}
        <StatisticsSection />

        {/* 9. Authentic Community Testimonials */}
        <TestimonialsSection />

        {/* 10. Blog & Commuter Insights */}
        <InsightsSection />

        {/* 11. Conversion Call To Action */}
        <CtaSection onBookTour={() => handleOpenBooking()} />

        {/* 12. Frequently Asked Questions */}
        <FaqSection />

        {/* 13. Contact & Location Information */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Booking & Tour Walkthrough Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedLocation={bookingLocation}
      />

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />
    </div>
  );
}
