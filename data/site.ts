import type { City } from "@/lib/types";

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** DEMO contact details. Replace with your real business information. */
export const SITE = {
  name: "RealHome",
  phone: "+92 300 0000000",
  whatsapp: "923000000000",
  email: "hello@realhome.example",
  address: "Demo Office, Multan, Punjab, Pakistan",
  hours: "Mon to Sat, 9:00 AM to 6:00 PM",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About", href: "/about" },
  { label: "Agents", href: "/agents" },
  { label: "Contact", href: "/contact" },
];

/** These point to the platforms' home pages. Replace with your real profile URLs. */
export const socials: { label: "Facebook" | "Instagram" | "LinkedIn"; href: string }[] = [
  { label: "Facebook", href: "https://www.facebook.com" },
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
];

export const IMAGES = {
  hero: u("photo-1613490493576-7fde63acd811", 2400),
  whyChoose: u("photo-1600607687939-ce8a6c25118c", 2000),
  propertiesBanner: u("photo-1512917774080-9991f1c4c750", 2000),
  aboutBanner: u("photo-1600596542815-ffad4c1539a9", 2000),
  aboutSide: u("photo-1600566753190-17f0baa2a6c3", 1400),
  agentsBanner: u("photo-1486325212027-8081e485255e", 2000),
  contactBanner: u("photo-1545324418-cc1a3fa10c00", 2000),
  legalBanner: u("photo-1486406146926-c627a92ad1ab", 2000),
};

/**
 * City cards use architecture photos as stand-ins.
 * Swap the image ids here for real city photography whenever you like.
 */
export const locations: { city: City; image: string }[] = [
  { city: "Multan", image: u("photo-1568605114967-8130f3a36994", 1000) },
  { city: "Islamabad", image: u("photo-1486325212027-8081e485255e", 1000) },
  { city: "Karachi", image: u("photo-1545324418-cc1a3fa10c00", 1000) },
  { city: "Lahore", image: u("photo-1580587771525-78b9dba3b914", 1000) },
];