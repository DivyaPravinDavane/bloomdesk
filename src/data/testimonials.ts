export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  quote: string;
  avatar: string;
  rating: number;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "t1",
    name: "Rohan Varma",
    role: "Founder & Creative Director",
    company: "PixelCraft Digital",
    location: "Borivali West Orion",
    quote:
      "Transitioning our design studio from a conventional lease to BloomDesk Orion cut our overhead by nearly 45% while upgrading our client presentation setup. The 2-minute walk from Borivali station makes client meetings effortless.",
    avatar: "/assets/testimonials/user-1.png",
    rating: 5,
  },
  {
    id: "t2",
    name: "Meera Sen",
    role: "Senior Consultant",
    company: "FinAdvisory Partners",
    location: "Borivali East II",
    quote:
      "The quiet, professional atmosphere and rock-solid optical fiber connection are what keep our financial consulting team here. Having professional meeting rooms on Western Express Highway right next to Metro Line 7 is a massive advantage.",
    avatar: "/assets/testimonials/user-2.png",
    rating: 5,
  },
  {
    id: "t3",
    name: "Aditya Kulkarni",
    role: "Engineering Lead",
    company: "NexScale Cloud",
    location: "Kandivali West",
    quote:
      "We took a 6-seater private cabin at BloomDesk 4.0 in Kandivali. Having the Metro entrance literally outside the building front door has eliminated commuting stress for our entire tech crew. Super clean facilities and prompt management.",
    avatar: "/assets/testimonials/user-1.png",
    rating: 5,
  },
];
