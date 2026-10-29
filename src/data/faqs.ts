export interface FaqItem {
  question: string;
  answer: string;
  category: 'memberships' | 'facilities' | 'logistics';
}

export const faqsData: FaqItem[] = [
  {
    question: "What types of workspace memberships does BloomDesk offer in Mumbai?",
    answer:
      "BloomDesk offers flexible plans across all 5 centers in Borivali and Kandivali: Daily Passes for ad-hoc drop-ins, Flexi Desks (hot-desking), dedicated reserved desks with lockable storage, private office cabins (2 to 20+ seats), and conference room booking by the hour.",
    category: "memberships",
  },
  {
    question: "Can I access multiple BloomDesk locations with my membership?",
    answer:
      "Yes. Dedicated and Private Cabin members receive preferential access and discounted meeting room credits across all BloomDesk centers in Borivali East, Borivali West, and Kandivali West.",
    category: "memberships",
  },
  {
    question: "What are the standard operational hours for BloomDesk workspaces?",
    answer:
      "Our reception, hospitality, and daily access run Monday through Saturday from 8:00 AM to 9:00 PM. Dedicated Desk and Private Office members enjoy extended and 24/7 access upon request, supported by uninterrupted power and security.",
    category: "logistics",
  },
  {
    question: "How fast and reliable is the internet connectivity?",
    answer:
      "All BloomDesk locations operate on enterprise-grade dual redundant optical fiber connections with automatic failover. Wi-Fi 6 coverage and wired LAN drops ensure consistent high-bandwidth video conferencing, large file transfers, and uninterrupted workflows.",
    category: "facilities",
  },
  {
    question: "What documentation or KYC is needed to get started?",
    answer:
      "For individuals: a government-issued photo ID (Aadhaar or Passport) and address proof. For companies: Certificate of Incorporation, GST registration certificate, PAN card, and authorized signatory identification.",
    category: "logistics",
  },
  {
    question: "Are meeting rooms available for non-members to book by the hour?",
    answer:
      "Yes, non-members can book high-spec conference and presentation suites starting at ₹499/hr. Facilities include 4K presentation screens, conference audio hardware, high-speed Wi-Fi, and beverage service.",
    category: "facilities",
  },
  {
    question: "Can we upgrade our team's seating as our company expands?",
    answer:
      "Absolutely. Many of our scale-ups started with 2 dedicated desks and expanded into full 10-seater private cabins. We offer seamless internal upgrades without cumbersome long-term lock-ins.",
    category: "memberships",
  },
];
