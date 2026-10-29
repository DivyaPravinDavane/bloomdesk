export interface AmenityItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  originalIconPath?: string;
  category: 'core' | 'technology' | 'hospitality' | 'facilities';
}

export const amenitiesData: AmenityItem[] = [
  {
    id: "fast-internet",
    name: "Fast Optical Fiber",
    description: "High-speed redundant dual-ISP fiber optic internet with low-latency Wi-Fi 6 coverage across every corner.",
    iconName: "Wifi",
    originalIconPath: "/assets/amenities/icon-internet.png",
    category: "technology",
  },
  {
    id: "ups-backup",
    name: "100% UPS & DG Backup",
    description: "Uninterrupted power supply with automatic diesel generator switchover to keep your workstations alive 24/7.",
    iconName: "Zap",
    originalIconPath: "/assets/amenities/icon-ups.png",
    category: "core",
  },
  {
    id: "tea-coffee",
    name: "Unlimited Tea & Coffee",
    description: "Freshly brewed artisan coffee, masala chai, green tea varieties, and pure reverse-osmosis drinking water on tap.",
    iconName: "Coffee",
    originalIconPath: "/assets/amenities/icon-tea.png",
    category: "hospitality",
  },
  {
    id: "air-conditioner",
    name: "Precision Climate Control",
    description: "Commercial multi-zone air conditioning ensuring ideal ambient temperatures for focused and productive work.",
    iconName: "Wind",
    originalIconPath: "/assets/amenities/icon-ac.png",
    category: "core",
  },
  {
    id: "housekeeping",
    name: "Dedicated Housekeeping",
    description: "Full-time on-site cleaning staff conducting continuous desk sanitization, waste collection, and restroom maintenance.",
    iconName: "Sparkles",
    originalIconPath: "/assets/amenities/icon-housekeeping.png",
    category: "hospitality",
  },
  {
    id: "scanner-printer",
    name: "Business Scanner & Printer",
    description: "High-capacity multifunction laser printing, copying, and optical document scanning for all your business documentation.",
    iconName: "Printer",
    originalIconPath: "/assets/amenities/icon-printer.png",
    category: "technology",
  },
  {
    id: "sanitization",
    name: "Sanitization & Hygiene",
    description: "Hospital-grade air filters, touchless hand sanitizing stations, and pristine executive washrooms maintained hourly.",
    iconName: "ShieldCheck",
    originalIconPath: "/assets/amenities/icon-internet.png",
    category: "facilities",
  },
  {
    id: "parking",
    name: "Vehicle Parking Access",
    description: "Designated two-wheeler and four-wheeler parking slots with easy basement and building access across centers.",
    iconName: "Car",
    originalIconPath: "/assets/amenities/icon-car.png",
    category: "facilities",
  },
  {
    id: "event-space",
    name: "Event & Workshop Hub",
    description: "Configurable communal space for evening workshops, weekend bootcamps, community mixers, and networking events.",
    iconName: "Users",
    originalIconPath: "/assets/amenities/icon-events.png",
    category: "facilities",
  },
  {
    id: "reception",
    name: "Front Desk Hospitality",
    description: "Warm front office management to greet your guests, receive packages, and assist with immediate facility requests.",
    iconName: "Smile",
    originalIconPath: "/assets/amenities/icon-housekeeping.png",
    category: "hospitality",
  },
];
