import type { City, Property, PropertyCategory } from "@/lib/types";

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/**
 * DEMO DATA: every listing below is a sample for design and development.
 * These are not verified live listings and the prices are illustrative.
 */
export const DEMO_NOTICE =
  "Sample listing for demonstration purposes. Not a verified live listing.";

export const properties: Property[] = [
  {
    id: "dha-lahore-modern-villa",
    title: "Modern Luxury Villa",
    city: "Lahore",
    area: "DHA Phase 6",
    price: 185_000_000,
    status: "For Sale",
    category: "House",
    bedrooms: 5,
    bathrooms: 6,
    areaSize: 1,
    areaUnit: "Kanal",
    images: [
      u("photo-1613490493576-7fde63acd811"),
      u("photo-1600607687939-ce8a6c25118c"),
      u("photo-1600566753190-17f0baa2a6c3"),
      u("photo-1600573472550-8090b5e0745e"),
    ],
    description:
      "A striking one kanal contemporary villa with double-height ceilings, a private pool and landscaped lawns. The layout separates family living from entertaining spaces, with a home theatre and a covered terrace overlooking the garden.",
    amenities: ["Parking", "Garden", "Security", "Gym", "Wi-Fi", "Swimming Pool", "Home Theatre"],
    featured: true,
    agentId: "ahmed-raza",
    createdAt: "2026-10-12",
  },
  {
    id: "f7-islamabad-luxury-apartment",
    title: "Executive Apartment near F-7 Markaz",
    city: "Islamabad",
    area: "F-7",
    price: 62_500_000,
    status: "For Sale",
    category: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    areaSize: 2100,
    areaUnit: "Sq Ft",
    images: [
      u("photo-1545324418-cc1a3fa10c00"),
      u("photo-1560448204-e02f11c3d0e2"),
      u("photo-1502672260266-1c1ef2d93688"),
    ],
    description:
      "A bright, well-finished apartment a short walk from F-7 Markaz. Floor-to-ceiling windows, an open-plan lounge and secure basement parking make it ideal for professionals and small families.",
    amenities: ["Parking", "Security", "Gym", "Wi-Fi", "Elevator", "Backup Power"],
    featured: true,
    agentId: "sara-khan",
    createdAt: "2026-10-18",
  },
  {
    id: "clifton-karachi-sea-view-apartment",
    title: "Sea View Penthouse Apartment",
    city: "Karachi",
    area: "Clifton Block 4",
    price: 95_000_000,
    status: "For Sale",
    category: "Apartment",
    bedrooms: 3,
    bathrooms: 4,
    areaSize: 2800,
    areaUnit: "Sq Ft",
    images: [
      u("photo-1522708323590-d24dbb6b0267"),
      u("photo-1545324418-cc1a3fa10c00"),
      u("photo-1600047509807-ba8f99d2cdde"),
    ],
    description:
      "A spacious upper-floor apartment in Clifton with open views toward the coast. Generous living areas, a private balcony and building amenities make this a comfortable city residence.",
    amenities: ["Parking", "Security", "Gym", "Wi-Fi", "Elevator", "Backup Power", "Balcony"],
    featured: true,
    agentId: "ayesha-malik",
    createdAt: "2026-10-09",
  },
  {
    id: "bosan-road-multan-family-house",
    title: "Contemporary Family House",
    city: "Multan",
    area: "Bosan Road",
    price: 42_000_000,
    status: "For Sale",
    category: "House",
    bedrooms: 4,
    bathrooms: 4,
    areaSize: 10,
    areaUnit: "Marla",
    images: [
      u("photo-1600596542815-ffad4c1539a9"),
      u("photo-1600585154340-be6161a56a0c"),
      u("photo-1600566753190-17f0baa2a6c3"),
      u("photo-1502672260266-1c1ef2d93688"),
    ],
    description:
      "A well-planned ten marla home on Bosan Road with a modern elevation, spacious lounge, fitted kitchen and a rooftop terrace. Close to schools, markets and main roads.",
    amenities: ["Parking", "Garden", "Security", "Wi-Fi", "Backup Power"],
    featured: true,
    agentId: "bilal-ahmed",
    createdAt: "2026-10-20",
  },
  {
    id: "bahria-enclave-islamabad-plot",
    title: "Corner Residential Plot",
    city: "Islamabad",
    area: "Bahria Enclave",
    price: 32_000_000,
    status: "For Sale",
    category: "Plot",
    bedrooms: null,
    bathrooms: null,
    areaSize: 1,
    areaUnit: "Kanal",
    images: [
      u("photo-1500382017468-9049fed747ef"),
      u("photo-1469854523086-cc02fe5d8800"),
    ],
    description:
      "A one kanal corner plot in a developed sector with paved roads and utilities nearby. A good option for building a custom home or holding as a long-term investment.",
    amenities: ["Corner Plot", "Security", "Paved Roads", "Nearby Utilities"],
    featured: false,
    agentId: "sara-khan",
    createdAt: "2026-09-28",
  },
  {
    id: "gulberg-lahore-commercial-floor",
    title: "Prime Commercial Floor",
    city: "Lahore",
    area: "Gulberg III",
    price: 210_000_000,
    status: "For Sale",
    category: "Commercial",
    bedrooms: null,
    bathrooms: 4,
    areaSize: 4500,
    areaUnit: "Sq Ft",
    images: [
      u("photo-1486406146926-c627a92ad1ab"),
      u("photo-1497366216548-37526070297c"),
      u("photo-1486325212027-8081e485255e"),
    ],
    description:
      "An entire commercial floor in a high-visibility Gulberg building, suited to corporate offices, studios or showrooms. Includes reserved parking and 24/7 building security.",
    amenities: ["Parking", "Security", "Elevator", "Wi-Fi", "Backup Power"],
    featured: false,
    agentId: "ahmed-raza",
    createdAt: "2026-09-15",
  },
  {
    id: "dha-karachi-phase-8-house-rent",
    title: "Elegant Villa for Rent",
    city: "Karachi",
    area: "DHA Phase 8",
    price: 650_000,
    status: "For Rent",
    category: "House",
    bedrooms: 5,
    bathrooms: 5,
    areaSize: 500,
    areaUnit: "Sq Yd",
    images: [
      u("photo-1512917774080-9991f1c4c750"),
      u("photo-1600573472550-8090b5e0745e"),
      u("photo-1600607687939-ce8a6c25118c"),
    ],
    description:
      "A 500 square yard villa in DHA Phase 8 with a large lawn, a separate guest wing and servant quarters. Quiet street with easy access to the main boulevard.",
    amenities: ["Parking", "Garden", "Security", "Wi-Fi", "Servant Quarter", "Backup Power"],
    featured: false,
    agentId: "ayesha-malik",
    createdAt: "2026-10-22",
  },
  {
    id: "gulgasht-multan-apartment-rent",
    title: "Cosy Apartment for Rent",
    city: "Multan",
    area: "Gulgasht Colony",
    price: 55_000,
    status: "For Rent",
    category: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    areaSize: 950,
    areaUnit: "Sq Ft",
    images: [
      u("photo-1560448204-e02f11c3d0e2"),
      u("photo-1522708323590-d24dbb6b0267"),
      u("photo-1545324418-cc1a3fa10c00"),
    ],
    description:
      "A neat two-bedroom apartment in Gulgasht with a modern kitchen, tiled floors and a private balcony. Convenient for small families and working professionals.",
    amenities: ["Parking", "Security", "Wi-Fi", "Balcony"],
    featured: false,
    agentId: "bilal-ahmed",
    createdAt: "2026-10-24",
  },
  {
    id: "bahria-town-lahore-plot",
    title: "Ten Marla Residential Plot",
    city: "Lahore",
    area: "Bahria Town",
    price: 14_500_000,
    status: "For Sale",
    category: "Plot",
    bedrooms: null,
    bathrooms: null,
    areaSize: 10,
    areaUnit: "Marla",
    images: [
      u("photo-1500382017468-9049fed747ef"),
      u("photo-1469854523086-cc02fe5d8800"),
    ],
    description:
      "A ten marla plot in a gated community with 24/7 security and developed surroundings. Suitable for building a family home on a manageable budget.",
    amenities: ["Gated Community", "Security", "Paved Roads", "Nearby Utilities"],
    featured: false,
    agentId: "ahmed-raza",
    createdAt: "2026-09-30",
  },
  {
    id: "blue-area-islamabad-office-rent",
    title: "Blue Area Office Space",
    city: "Islamabad",
    area: "Blue Area",
    price: 1_200_000,
    status: "For Rent",
    category: "Commercial",
    bedrooms: null,
    bathrooms: 3,
    areaSize: 3200,
    areaUnit: "Sq Ft",
    images: [
      u("photo-1497366216548-37526070297c"),
      u("photo-1486406146926-c627a92ad1ab"),
      u("photo-1486325212027-8081e485255e"),
    ],
    description:
      "A professional open-plan office in the Blue Area business district with meeting rooms, reception space and dedicated parking. Ready for immediate fit-out.",
    amenities: ["Parking", "Security", "Elevator", "Wi-Fi", "Backup Power", "Meeting Rooms"],
    featured: false,
    agentId: "sara-khan",
    createdAt: "2026-10-05",
  },
  {
    id: "dha-multan-residential-plot",
    title: "One Kanal Plot in DHA Multan",
    city: "Multan",
    area: "DHA Multan",
    price: 18_500_000,
    status: "For Sale",
    category: "Plot",
    bedrooms: null,
    bathrooms: null,
    areaSize: 1,
    areaUnit: "Kanal",
    images: [
      u("photo-1469854523086-cc02fe5d8800"),
      u("photo-1500382017468-9049fed747ef"),
    ],
    description:
      "A one kanal plot in a planned housing scheme with wide roads and a secure perimeter. A solid choice for a luxury home build or a long-term hold.",
    amenities: ["Gated Community", "Security", "Paved Roads", "Nearby Utilities"],
    featured: false,
    agentId: "bilal-ahmed",
    createdAt: "2026-09-20",
  },
  {
    id: "gulshan-karachi-family-apartment",
    title: "Family Apartment in Gulshan-e-Iqbal",
    city: "Karachi",
    area: "Gulshan-e-Iqbal",
    price: 31_000_000,
    status: "For Sale",
    category: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    areaSize: 1650,
    areaUnit: "Sq Ft",
    images: [
      u("photo-1545324418-cc1a3fa10c00"),
      u("photo-1502672260266-1c1ef2d93688"),
      u("photo-1560448204-e02f11c3d0e2"),
    ],
    description:
      "A comfortable three-bedroom apartment in an established neighbourhood, with generous natural light, a separate dining area and easy access to schools and markets.",
    amenities: ["Parking", "Security", "Elevator", "Backup Power"],
    featured: false,
    agentId: "ayesha-malik",
    createdAt: "2026-10-01",
  },
];

export const CITIES: City[] = ["Multan", "Lahore", "Islamabad", "Karachi"];

export const CATEGORIES: PropertyCategory[] = ["House", "Apartment", "Plot", "Commercial"];

export function getPropertyById(id: string): Property | undefined {
  return properties.find((property) => property.id === id);
}

export function getFeaturedProperties(limit = 4): Property[] {
  return properties.filter((property) => property.featured).slice(0, limit);
}

export function getPropertyCountByCity(city: City): number {
  return properties.filter((property) => property.city === city).length;
}

export function getSimilarProperties(property: Property, limit = 3): Property[] {
  return properties
    .filter((candidate) => candidate.id !== property.id)
    .map((candidate) => ({
      candidate,
      score:
        (candidate.category === property.category ? 2 : 0) +
        (candidate.city === property.city ? 1 : 0),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.candidate);
}