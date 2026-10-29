export interface PricingItem {
  plan: string;
  price: string;
  period: string;
  capacity?: string;
  features: string[];
}

export interface LocationItem {
  id: string;
  slug: string;
  name: string;
  subTitle: string;
  area: string;
  spaceCount: string;
  sqft: string;
  image: string;
  address: string;
  landmark: string;
  transit: {
    metro: string;
    railway: string;
    bus: string;
    airport: string;
  };
  overview: string;
  pricing: PricingItem[];
  amenities: string[];
  featured?: boolean;
}

export const locationsData: LocationItem[] = [
  {
    id: "borivali-east-1",
    slug: "borivali-east-i",
    name: "Borivali East I",
    subTitle: "Western Express Highway & Metro Line 7",
    area: "Borivali East",
    spaceCount: "126 Spaces",
    sqft: "4,000 Sq. Ft.",
    image: "/assets/locations/borivali-east-1.jpg",
    address: "Opposite Western Express Highway, Near Borivali East Railway Station, Borivali East, Mumbai 400066",
    landmark: "Directly adjacent to Metro Line 7 Station and 2 minutes from Borivali Railway Station",
    transit: {
      metro: "Right next to Metro Line 7 station",
      railway: "2 mins walk to Borivali East Railway Station",
      bus: "2 mins walk to national park / highway bus stop",
      airport: "35 mins direct drive via Western Express Highway",
    },
    overview:
      "Located in one of the most premium commercial office buildings in Mumbai's western suburbs. Perfectly situated on the Western Express Highway, offering unmatched pricing with high-touch personal service for over 50 growing businesses and scale-ups.",
    pricing: [
      {
        plan: "Private Office",
        price: "₹11,990",
        period: "per month",
        capacity: "1 - 5 Persons",
        features: ["Lockable sound-insulated cabin", "Ergonomic executive chairs", "24/7 dedicated access", "Includes meeting credits"],
      },
      {
        plan: "Dedicated Desk",
        price: "₹8,990",
        period: "per month",
        capacity: "Personal Desk",
        features: ["Assigned fixed desk", "Lockable storage pedestal", "High-speed optical fiber LAN/Wi-Fi", "Daily housekeeping"],
      },
      {
        plan: "Flexi Desk",
        price: "₹6,990",
        period: "per 30 days",
        capacity: "Hot Desk",
        features: ["Choice of any open seat", "Seamless Wi-Fi access", "Tea/coffee complimentary", "Community lounge access"],
      },
      {
        plan: "Meeting Room",
        price: "₹590",
        period: "per hour",
        capacity: "1 - 15 Persons",
        features: ["Large LED presentation screen", "Whiteboard & marker supplies", "Conference audio system", "Beverage service"],
      },
      {
        plan: "Daily Day Pass",
        price: "₹590",
        period: "per day",
        capacity: "Flexible Day Access",
        features: ["Full day workstation access", "High-speed internet", "Unlimited tea/coffee", "Power backup protected"],
      },
    ],
    amenities: ["Air Conditioning", "High-Speed Internet", "UPS Power Backup", "Tea & Coffee", "Housekeeping", "Scanner & Printer", "Meeting Facilities"],
    featured: true,
  },
  {
    id: "borivali-east-2",
    slug: "borivali-east-ii",
    name: "Borivali East II",
    subTitle: "Flagship Corporate Hub",
    area: "Borivali East",
    spaceCount: "126 Spaces",
    sqft: "4,000 Sq. Ft.",
    image: "/assets/locations/borivali-east-2.jpg",
    address: "Western Express Highway Corridor, Borivali East, Mumbai 400066",
    landmark: "Direct WEH connectivity, adjacent to Metro Line 7 hub",
    transit: {
      metro: "1 min to Metro Line 7 station",
      railway: "2 mins to Borivali Station",
      bus: "2 mins walk to highway bus stop",
      airport: "35 mins to Chhatrapati Shivaji Maharaj International Airport",
    },
    overview:
      "A flagship BloomDesk center hosting over 100 enterprise members, scale-ups, and corporate teams. Delivers enterprise-grade infrastructure with multi-seater private cabins, high-speed fiber connectivity, and dedicated on-site support.",
    pricing: [
      {
        plan: "Private Office (2-Seater)",
        price: "₹29,990",
        period: "per month",
        capacity: "2 Persons",
        features: ["Private corporate cabin", "High-grade acoustic isolation", "Complimentary boardroom hours", "Secure biometric access"],
      },
      {
        plan: "Private Office (4-Seater)",
        price: "₹49,990",
        period: "per month",
        capacity: "4 Persons",
        features: ["Full executive team suite", "Custom branding options", "Dedicated IP support", "Priority meeting access"],
      },
      {
        plan: "Premium Cubicle",
        price: "₹11,990",
        period: "per month",
        capacity: "Semi-Private",
        features: ["Enhanced privacy dividers", "Executive desk layout", "Filing cabinet with lock", "Full hospitality support"],
      },
      {
        plan: "Dedicated Desk",
        price: "₹8,990",
        period: "per month",
        capacity: "1 Person",
        features: ["Fixed dedicated desk", "High-speed internet", "Clean housekeeping", "Power backup 100%"],
      },
      {
        plan: "Conference Room",
        price: "₹690",
        period: "per hour",
        capacity: "8 - 10 Persons",
        features: ["4K Video Conference Setup", "High-speed presentation Wi-Fi", "Conference phone", "Refreshments on demand"],
      },
    ],
    amenities: ["Air Conditioning", "High-Speed Internet", "UPS Power Backup", "Tea & Coffee", "Housekeeping", "Scanner & Printer", "Car Parking"],
    featured: false,
  },
  {
    id: "borivali-west-orion",
    slug: "borivali-west-orion",
    name: "Borivali West Orion",
    subTitle: "Commercial Retail & Banking Hub",
    area: "Borivali West",
    spaceCount: "126 Spaces",
    sqft: "4,000 Sq. Ft.",
    image: "/assets/locations/borivali-west-orion.jpg",
    address: "Orion Commercial Hub, SV Road / Link Road Junction, Borivali West, Mumbai 400092",
    landmark: "Centrally positioned between Railway Station, Western Express Highway & Link Road",
    transit: {
      metro: "3 mins to Borivali West Metro Station",
      railway: "3 mins to Borivali West Railway Station",
      bus: "2 mins walk to SV Road bus hub",
      airport: "40 mins to Airport",
    },
    overview:
      "Centrally situated in the bustling commercial heart of Borivali West with immediate access to major banks, retail avenues, and eateries. An energetic space built for creative teams, independent professionals, and financial consultancies.",
    pricing: [
      {
        plan: "Private Office",
        price: "₹13,000",
        period: "per month",
        capacity: "1 - 5 Persons",
        features: ["Fully furnished private suite", "Ergonomic seating", "Business address & mail handling", "Meeting credits included"],
      },
      {
        plan: "Dedicated Desk",
        price: "₹6,999",
        period: "per month",
        capacity: "1 Person",
        features: ["Your personal reserved desk", "Power points & high-speed Wi-Fi", "Free unlimited hot beverages", "Secure locker storage"],
      },
      {
        plan: "Flexi Desk",
        price: "₹5,990",
        period: "for 30 days",
        capacity: "Flexible Access",
        features: ["Access to modern hot desk areas", "Plug & work infrastructure", "Lounge & networking events", "Clean sanitization"],
      },
      {
        plan: "Meeting Room",
        price: "₹499",
        period: "per hour",
        capacity: "1 - 6 Persons",
        features: ["Smart HD display", "High-speed conference Wi-Fi", "Quiet acoustic treatment", "Whiteboard setup"],
      },
      {
        plan: "Daily Pass",
        price: "₹490",
        period: "per day",
        capacity: "Single Day",
        features: ["Single day full access", "Fast internet & power backup", "Free tea and coffee", "Community reception"],
      },
    ],
    amenities: ["Air Conditioning", "Fast Internet", "UPS Power Backup", "Tea & Coffee", "Housekeeping", "Scanner & Printer", "Event Space"],
    featured: true,
  },
  {
    id: "borivali-west-neelkanth",
    slug: "borivali-west-neelkanth",
    name: "Borivali West Neelkanth",
    subTitle: "Connected & High-Productivity Hub",
    area: "Borivali West",
    spaceCount: "165 Spaces",
    sqft: "4,000 Sq. Ft.",
    image: "/assets/locations/borivali-west-neelkanth.jpg",
    address: "Neelkanth Commercial Complex, Near Borivali West Station, Mumbai 400092",
    landmark: "2 minutes from Borivali Station with seamless Link Road & Highway connectivity",
    transit: {
      metro: "3 mins to Metro station",
      railway: "2 mins to Borivali Station",
      bus: "2 mins walk to bus station",
      airport: "40 mins to Airport",
    },
    overview:
      "A spacious center crafted around community, productivity, and mutual respect. Built with large workstation clusters, private offices, and state-of-the-art breakout areas where diverse disciplines collaborate and grow together.",
    pricing: [
      {
        plan: "Private Office",
        price: "₹13,000",
        period: "per month",
        capacity: "1 - 5 Persons",
        features: ["Private corporate cabin", "High acoustic isolation", "Complimentary boardroom hours", "Secure biometric access"],
      },
      {
        plan: "Dedicated Desk",
        price: "₹6,999",
        period: "per month",
        capacity: "1 - 15 Seats",
        features: ["Reserved desks for teams", "Dedicated network drops", "Lockers & pedestal units", "24/7 power backup"],
      },
      {
        plan: "Flexi Desk",
        price: "₹5,990",
        period: "per month",
        capacity: "Hot Desk",
        features: ["Flexible seat selection", "Rapid optical fiber internet", "Unlimited tea & coffee", "Community lounge"],
      },
      {
        plan: "Meeting Rooms",
        price: "₹499",
        period: "per hour",
        capacity: "10+ Persons",
        features: ["Large table layout", "Screen sharing setup", "High-speed video calling", "Refreshments support"],
      },
      {
        plan: "Daily Desk",
        price: "₹490",
        period: "per day",
        capacity: "Daily Pass",
        features: ["Instant check-in desk", "Full day access", "Air conditioning", "Printing & scanning"],
      },
    ],
    amenities: ["Air Conditioning", "Fast Internet", "UPS Power Backup", "Tea & Coffee", "Housekeeping", "Scanner & Printer", "Car Parking"],
    featured: false,
  },
  {
    id: "kandivali-west",
    slug: "kandivali-west",
    name: "Kandivali West (BloomDesk 4.0)",
    subTitle: "Premier Metro-Connected Complex",
    area: "Kandivali West",
    spaceCount: "165 Spaces",
    sqft: "4,000 Sq. Ft.",
    image: "/assets/locations/kandivali-west.jpg",
    address: "BloomDesk 4.0, Premier Commercial Complex, Link Road, Kandivali West, Mumbai 400067",
    landmark: "Directly opposite the Metro Line station entrance, bordering Kandivali & Malad",
    transit: {
      metro: "Right outside the building main entrance",
      railway: "5 mins to Kandivali Railway Station",
      bus: "1 min walk to Link Road bus stop",
      airport: "40 mins to Airport",
    },
    overview:
      "BloomDesk 4.0 is situated in one of the finest commercial developments along the Kandivali-Malad corridor. With the Metro line right outside the entrance, this center delivers unparalleled commuter convenience, sleek architectural design, and premium corporate facilities.",
    pricing: [
      {
        plan: "Co-Working Space",
        price: "₹10,990",
        period: "per month",
        capacity: "All-Inclusive Member",
        features: ["Full facility access", "Priority meeting room booking", "Dedicated locker unit", "Business registration support"],
      },
      {
        plan: "Dedicated Desks",
        price: "₹8,990",
        period: "per month",
        capacity: "1 - 15 Seats",
        features: ["Reserved ergonomic workstation", "High-speed LAN & Wi-Fi", "Unlimited artisan coffee/tea", "Daily sanitization"],
      },
      {
        plan: "Flexi Desk",
        price: "₹6,990",
        period: "for 30 days",
        capacity: "Hot Desk",
        features: ["Dynamic seat selection", "Air conditioned comfort", "Networking events & lounge", "High uptime power"],
      },
      {
        plan: "Meeting Room (6 Seater)",
        price: "₹590",
        period: "per hour",
        capacity: "1 - 6 Persons",
        features: ["Executive video conference TV", "HDMI/Wireless screen sharing", "Magnetic glass board", "Coffee & water service"],
      },
      {
        plan: "Meeting Room (10 Seater)",
        price: "₹690",
        period: "per hour",
        capacity: "8 - 10 Persons",
        features: ["Expansive boardroom table", "Enterprise audio mic system", "Presentation display", "Priority support"],
      },
    ],
    amenities: ["Air Conditioning", "Fast Internet", "UPS Power Backup", "Tea & Coffee", "Housekeeping", "Scanner & Printer", "Event Space"],
    featured: true,
  },
];
