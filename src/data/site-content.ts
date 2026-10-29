export interface ContactDetails {
  primaryPhone: string;
  secondaryPhone: string;
  primaryPhoneFormatted: string;
  secondaryPhoneFormatted: string;
  email: string;
  operationalHours: string;
  headquarters: string;
  foundedYear: string;
}

export const siteConfig = {
  name: "BloomDesk",
  tagline: "Inspiring Coworking & Flexible Office Spaces in Mumbai",
  shortDescription:
    "BloomDesk offers premium coworking and shared office spaces in Mumbai's western suburbs (Borivali & Kandivali), providing high-speed internet, fully furnished workstations, meeting rooms, and flexible membership plans for freelancers, startups, and growing teams.",
  contact: {
    primaryPhone: "+917506600877",
    primaryPhoneFormatted: "+91 75066 00877",
    secondaryPhone: "+919769508264",
    secondaryPhoneFormatted: "+91 97695 08264",
    email: "info@bloomdesk.in",
    operationalHours: "Monday - Saturday: 8:00 AM - 9:00 PM (24/7 Access for Dedicated Members)",
    headquarters: "Borivali West & East / Kandivali West, Mumbai, Maharashtra 400092",
    foundedYear: "2015",
  },
  socialLinks: {
    linkedin: "https://www.linkedin.com/company/bloomdesk",
    instagram: "https://www.instagram.com/bloomdesk",
    facebook: "https://www.facebook.com/bloomdesk",
    whatsapp: "https://wa.me/917506600877?text=Hello%20BloomDesk%2C%20I%20am%20interested%20in%20workspace%20membership.",
  },
  navItems: [
    { label: "Home", href: "#hero" },
    { label: "Locations", href: "#locations" },
    { label: "What We Offer", href: "#services" },
    { label: "Who We Are", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Amenities", href: "#amenities" },
    { label: "FAQs", href: "#faqs" },
    { label: "Contact", href: "#contact" },
  ],
  stats: [
    {
      value: 100,
      suffix: "+",
      label: "Active Member Teams",
      description: "SMEs, tech startups, creative agencies, and professionals working daily",
      iconPath: "/assets/icons/stat-members.png",
    },
    {
      value: 5,
      suffix: " Prime",
      label: "Mumbai Centers",
      description: "Conveniently located across Borivali West, Borivali East & Kandivali West",
      iconPath: "/assets/icons/stat-locations.png",
    },
    {
      value: 20000,
      suffix: "+",
      label: "Sq. Ft. Managed",
      description: "High-quality, thoughtfully designed collaborative real estate",
      iconPath: "/assets/icons/stat-mumbai.png",
    },
    {
      value: 40,
      suffix: "+",
      label: "Modern Amenities",
      description: "High-speed optical fiber, power backup, ergonomic seating & conference suites",
      iconPath: "/assets/icons/stat-workspaces.png",
    },
  ],
};
