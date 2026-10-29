export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  author: string;
}

export const insightsData: InsightArticle[] = [
  {
    id: "insight-1",
    slug: "evolution-of-coworking-spaces-mumbai",
    title: "Why Suburban Coworking Is Winning Over South Mumbai Leases",
    category: "Market Trends",
    date: "October 2026",
    readTime: "4 min read",
    excerpt:
      "How decentralized office hubs in Borivali, Kandivali, and Malad are helping founders recruit top suburban talent while slashing commute times and rental overhead.",
    image: "/assets/blog/news-1.jpg",
    author: "BloomDesk Editorial",
  },
  {
    id: "insight-2",
    slug: "types-of-professionals-shared-workspaces",
    title: "From FinTech Scale-Ups to Legal Advisors: Who Thrives in Shared Spaces?",
    category: "Community & Culture",
    date: "September 2026",
    readTime: "5 min read",
    excerpt:
      "A deep dive into cross-disciplinary synergy inside modern flexible offices, and how diverse skillsets spark new business partnerships.",
    image: "/assets/blog/news-2.jpg",
    author: "Workspace Insights",
  },
  {
    id: "insight-3",
    slug: "guide-to-flexible-office-spaces-western-suburbs",
    title: "Navigating Metro Line 7 & Transit-Connected Work Hubs in Mumbai",
    category: "Location Guide",
    date: "August 2026",
    readTime: "6 min read",
    excerpt:
      "A commuter-friendly guide to selecting office locations along Western Express Highway, Link Road, and Mumbai's rapid transit corridors.",
    image: "/assets/blog/news-3.jpg",
    author: "Real Estate Desk",
  },
];
