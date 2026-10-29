export interface LogoItem {
  id: string;
  name: string;
  src: string;
  category?: string;
}

export const TRUSTED_LOGOS: LogoItem[] = [
  { id: "1", name: "Furturatech", src: "/logos/furturatech.svg", category: "AI & Innovation" },
  { id: "2", name: "Cybertech", src: "/logos/cybertech.svg", category: "Cybersecurity" },
  { id: "3", name: "Art Studio", src: "/logos/art-studio.svg", category: "Creative Agency" },
  { id: "4", name: "Apex Capital", src: "/logos/apex-capital.svg", category: "Venture Capital" },
  { id: "5", name: "Daily News", src: "/logos/daily-news.svg", category: "Media & Press" },
  { id: "6", name: "Quantum Media", src: "/logos/quantum-media.svg", category: "Digital Media" },
  { id: "7", name: "Lumina", src: "/logos/lumina.svg", category: "Product Studio" },
  { id: "8", name: "Velocity", src: "/logos/velocity.svg", category: "Growth Advisory" },
  { id: "9", name: "Zenith Legal", src: "/logos/zenith-legal.svg", category: "Corporate Law" },
  { id: "10", name: "Technology", src: "/logos/technology.svg", category: "Enterprise Tech" },
];
