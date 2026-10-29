export type LocationFilter = "All" | "Borivali" | "Kandivali";

export interface CenterLocation {
  id: string;
  name: string;
  area: "Borivali" | "Kandivali";
  areaLabel: string;
  price: number;
  priceFormatted?: string;
  spaces: string;
  sqft: string;
  tagline: string;
  slug: string;
  image: string;
}

export const CENTERS_DATA: CenterLocation[] = [
  {
    id: "borivali-east-1",
    name: "Borivali East I",
    area: "Borivali",
    areaLabel: "Borivali East",
    price: 11990,
    spaces: "126 Spaces",
    sqft: "4,000 Sq. Ft.",
    tagline: "Next to Metro Line 7",
    slug: "borivali-east-i",
    image: "/images/center-1.jpg",
  },
  {
    id: "borivali-east-2",
    name: "Borivali East II",
    area: "Borivali",
    areaLabel: "Borivali East",
    price: 29990,
    spaces: "165 Spaces",
    sqft: "4,000 Sq. Ft.",
    tagline: "Direct WEH connectivity",
    slug: "borivali-east-ii",
    image: "/images/center-2.jpg",
  },
  {
    id: "borivali-west-orion",
    name: "Borivali West Orion",
    area: "Borivali",
    areaLabel: "Borivali West",
    price: 14990,
    spaces: "126 Spaces",
    sqft: "4,000 Sq. Ft.",
    tagline: "Near Railway Station",
    slug: "borivali-west-orion",
    image: "/images/center-3.jpg",
  },
  {
    id: "borivali-west-neelkanth",
    name: "Borivali West Neelkanth",
    area: "Borivali",
    areaLabel: "Borivali West",
    price: 16990,
    spaces: "165 Spaces",
    sqft: "4,000 Sq. Ft.",
    tagline: "2 min from Station",
    slug: "borivali-west-neelkanth",
    image: "/images/center-4.jpg",
  },
  {
    id: "kandivali-west",
    name: "Kandivali West (BloomDesk 4.0)",
    area: "Kandivali",
    areaLabel: "Kandivali West",
    price: 13990,
    spaces: "165 Spaces",
    sqft: "4,000 Sq. Ft.",
    tagline: "Opposite Metro Line station",
    slug: "kandivali-west",
    image: "/images/center-5.jpg",
  },
];
