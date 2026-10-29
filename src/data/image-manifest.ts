export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  category: 'brand' | 'hero' | 'locations' | 'gallery' | 'services' | 'amenities' | 'about' | 'cta' | 'clients' | 'testimonials' | 'blog';
}

export const imageManifest = {
  brand: {
    logo: { src: '/assets/brand/logo.png', alt: 'BloomDesk Coworking Space Logo', width: 250, height: 86, category: 'brand' },
  },
  hero: {
    banner: { src: '/assets/hero/hero-banner.png', alt: 'BloomDesk Coworking Spaces Borivali & Kandivali Mumbai', width: 1920, height: 1080, category: 'hero' },
    architectural: { src: '/assets/hero/hero-architectural.jpg', alt: 'BloomDesk Premium Office Interior', width: 1920, height: 2560, category: 'hero' },
    workspace: { src: '/assets/hero/hero-workspace.jpg', alt: 'BloomDesk Modern Coworking Workstations', width: 2560, height: 1920, category: 'hero' },
  },
  locations: {
    borivaliEast1: { src: '/assets/locations/borivali-east-1.jpg', alt: 'BloomDesk Borivali East I Center', width: 879, height: 675, category: 'locations' },
    borivaliEast2: { src: '/assets/locations/borivali-east-2.jpg', alt: 'BloomDesk Borivali East II Center', width: 4032, height: 3024, category: 'locations' },
    borivaliWestOrion: { src: '/assets/locations/borivali-west-orion.jpg', alt: 'BloomDesk Borivali West Orion Center', width: 4032, height: 3024, category: 'locations' },
    borivaliWestNeelkanth: { src: '/assets/locations/borivali-west-neelkanth.jpg', alt: 'BloomDesk Borivali West Neelkanth Center', width: 1280, height: 960, category: 'locations' },
    kandivaliWest: { src: '/assets/locations/kandivali-west.jpg', alt: 'BloomDesk Kandivali West Center', width: 1920, height: 2560, category: 'locations' },
    borivaliKandivaliWest: { src: '/assets/locations/borivali-kandivali-west.jpg', alt: 'BloomDesk Western Suburbs Office', width: 1024, height: 683, category: 'locations' },
  },
  gallery: [
    { id: 'g1', src: '/assets/gallery/gallery-1.jpg', alt: 'Executive Private Cabins', caption: 'Private Executive Cabins & Dedicated Workstations', category: 'Private Office' },
    { id: 'g2', src: '/assets/gallery/gallery-2.jpg', alt: 'Ergonomic Open Desks', caption: 'High-Focus Shared Workstations', category: 'Shared Desk' },
    { id: 'g3', src: '/assets/gallery/gallery-3.jpg', alt: 'High-Ceiling Premium Office Space', caption: 'Modern Interiors & Acoustic Lighting', category: 'Private Office' },
    { id: 'g4', src: '/assets/gallery/gallery-4.jpg', alt: 'Client Conference & Board Room', caption: 'Tech-Equipped Meeting & Conference Rooms', category: 'Meeting Rooms' },
    { id: 'g5', src: '/assets/gallery/gallery-5.jpg', alt: 'Collaborative Work Hub', caption: 'Dynamic Community Hub & Breakout Zones', category: 'Collaboration' },
    { id: 'g6', src: '/assets/gallery/gallery-6.jpg', alt: 'Spacious Corporate Work Desks', caption: 'Furnished Desks for Teams of All Sizes', category: 'Shared Desk' },
    { id: 'g7', src: '/assets/gallery/gallery-7.jpg', alt: 'Executive Boardroom Setup', caption: 'Presentation Screens & Executive Seating', category: 'Meeting Rooms' },
    { id: 'g8', src: '/assets/gallery/gallery-8.jpg', alt: 'BloomDesk Reception & Lounge Area', caption: 'Front Desk Hospitality & Visitor Welcoming', category: 'Collaboration' },
    { id: 'g9', src: '/assets/gallery/gallery-9.jpg', alt: 'Contemporary Open Layout Workstation', caption: 'Natural Sunlight & Clean Architectural Lines', category: 'Shared Desk' },
    { id: 'g10', src: '/assets/gallery/gallery-10.jpg', alt: 'Team Suite & Private Office Units', caption: 'Lockable Private Suites for Scale-ups', category: 'Private Office' },
    { id: 'g11', src: '/assets/gallery/gallery-11.jpg', alt: 'Discussion Pod & Brainstorming Corner', caption: 'Informal Meeting Nooks & Discussion Pods', category: 'Collaboration' },
  ],
  services: {
    exclusive: {
      icon: '/assets/services/service-1.png',
      overlay: '/assets/services/service-2.png',
    },
    shared: {
      icon: '/assets/services/service-3.png',
      overlay: '/assets/services/service-4.png',
    },
    meetings: {
      icon: '/assets/services/service-5.png',
      overlay: '/assets/services/service-6.png',
    },
  },
  amenities: {
    pointerImage: '/assets/amenities/pointer-img.jpg',
    internet: '/assets/amenities/icon-internet.png',
    ups: '/assets/amenities/icon-ups.png',
    tea: '/assets/amenities/icon-tea.png',
    housekeeping: '/assets/amenities/icon-housekeeping.png',
    ac: '/assets/amenities/icon-ac.png',
    printer: '/assets/amenities/icon-printer.png',
    parking: '/assets/amenities/icon-car.png',
    events: '/assets/amenities/icon-events.png',
  },
  about: {
    primary: '/assets/about/about-primary.jpg',
    secondary: '/assets/about/about-secondary.jpg',
  },
  cta: {
    bg: '/assets/cta/cta-bg.jpg',
  },
  clients: [
    { name: 'Daily News', src: '/assets/clients/client-1.png' },
    { name: 'Technology Partners', src: '/assets/clients/client-2.png' },
    { name: 'Futuratech Solutions', src: '/assets/clients/client-3.png' },
    { name: 'Cybertech Global', src: '/assets/clients/client-4.png' },
    { name: 'Art Studio Creative', src: '/assets/clients/client-6.png' },
  ],
  testimonials: {
    user1: '/assets/testimonials/user-1.png',
    user2: '/assets/testimonials/user-2.png',
  },
  blog: [
    { src: '/assets/blog/news-1.jpg', alt: 'Coworking Ecosystem Evolution' },
    { src: '/assets/blog/news-2.jpg', alt: 'Types of Professionals at Modern Workspaces' },
    { src: '/assets/blog/news-3.jpg', alt: 'Guide to Flexible Office Spaces in Mumbai' },
  ],
} as const;
