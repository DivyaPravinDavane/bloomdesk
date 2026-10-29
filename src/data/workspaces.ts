export interface WorkspaceCategory {
  id: string;
  title: string;
  eyebrow: string;
  tagline: string;
  description: string;
  startingPrice: string;
  iconImage: string;
  overlayImage: string;
  idealFor: string;
  highlights: string[];
  specs: {
    label: string;
    value: string;
  }[];
}

export const workspacesData: WorkspaceCategory[] = [
  {
    id: "exclusive-workspaces",
    title: "Exclusive Workspaces",
    eyebrow: "Private Offices & Suites",
    tagline: "Lockable, bespoke private cabins built for confidential work and scaling teams.",
    description:
      "Our private office cabins offer complete privacy, acoustic insulation, and custom desk configurations for teams of 2 to 20+. Enjoy secure biometric access, dedicated storage, branded signage options, and complimentary conference room hours across all BloomDesk Mumbai locations.",
    startingPrice: "From ₹11,990 / month",
    iconImage: "/assets/services/service-1.png",
    overlayImage: "/assets/services/service-2.png",
    idealFor: "Startups, Law Firms, FinTech, Corporate Branch Offices & Creative Agencies",
    highlights: [
      "Fully soundproofed glass and solid partition options",
      "Ergonomic executive chairs and spacious wood-finish desks",
      "Dedicated high-speed LAN connections plus backup Wi-Fi",
      "Custom company logo plaque and lockable storage filing units",
      "24/7 keycard or biometric access for your team",
    ],
    specs: [
      { label: "Capacities", value: "2 to 20+ Members" },
      { label: "Security", value: "Biometric & Lockable Door" },
      { label: "Meeting Hours", value: "Complimentary Credits Included" },
      { label: "Commitment", value: "Flexible Monthly or Annual" },
    ],
  },
  {
    id: "shared-workspaces",
    title: "Shared Workspaces",
    eyebrow: "Dedicated & Flexi Desks",
    tagline: "High-energy collaborative workstations designed for focus and community networking.",
    description:
      "Choose between your own permanently reserved Dedicated Desk or a flexible Hot Desk that lets you plug in and work from any open workstation. Benefit from lightning-fast dual-fiber broadband, power backup, unlimited premium tea & coffee, and vibrant community interaction.",
    startingPrice: "From ₹5,990 / month",
    iconImage: "/assets/services/service-3.png",
    overlayImage: "/assets/services/service-4.png",
    idealFor: "Freelancers, Independent Consultants, Remote Workers & Agile Teams",
    highlights: [
      "Permanent Dedicated Desks with lockable pedestals",
      "Flexible Hot Desks for on-the-go professionals",
      "Ergonomic mesh chairs for all-day posture support",
      "Abundant power ports, USB charging, and fast Wi-Fi",
      "Access to open collaboration lounges and pantry areas",
    ],
    specs: [
      { label: "Access Hours", value: "Standard & 24/7 Tiers" },
      { label: "Internet", value: "High-Speed Dual Fiber" },
      { label: "Beverages", value: "Unlimited Artisan Tea/Coffee" },
      { label: "Locker", value: "Available with Dedicated Desks" },
    ],
  },
  {
    id: "meetings-events",
    title: "Meetings & Events",
    eyebrow: "Conference & Boardrooms",
    tagline: "State-of-the-art presentation rooms and event spaces for high-impact discussions.",
    description:
      "Host client presentations, team scrums, investor pitches, or workshops in our tech-enabled meeting suites. Equipped with large high-definition displays, wireless screencasting, video conferencing hardware, whiteboards, and attentive beverage service by our on-site team.",
    startingPrice: "From ₹499 / hour",
    iconImage: "/assets/services/service-5.png",
    overlayImage: "/assets/services/service-6.png",
    idealFor: "Client Pitches, Board Meetings, Interviews, Workshops & Training Sessions",
    highlights: [
      "Accommodates groups from 4 to 15+ attendees",
      "Large 4K Ultra-HD screen for seamless HDMI / wireless presentations",
      "Enterprise audio-conferencing microphones and webcam systems",
      "Magnetic dry-erase glass board with markers and post-its",
      "Hospitality support with tea, coffee, and water service for guests",
    ],
    specs: [
      { label: "Room Sizes", value: "4, 6, 10, & 15 Seaters" },
      { label: "Tech Gear", value: "4K Screens, Polycom & Wi-Fi" },
      { label: "Booking Slot", value: "By the Hour or Full Day" },
      { label: "Guest Welcoming", value: "Professional Front Desk" },
    ],
  },
];
