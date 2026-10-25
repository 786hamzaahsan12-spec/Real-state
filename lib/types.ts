export type City = "Multan" | "Lahore" | "Islamabad" | "Karachi";

export type PropertyCategory = "House" | "Apartment" | "Plot" | "Commercial";

export type ListingStatus = "For Sale" | "For Rent";

export type AreaUnit = "Marla" | "Kanal" | "Sq Ft" | "Sq Yd";

export interface Property {
  /** Unique slug, also used in the URL: /properties/[id] */
  id: string;
  title: string;
  city: City;
  area: string;
  /** Price in PKR. For rent listings this is the monthly rent. */
  price: number;
  status: ListingStatus;
  category: PropertyCategory;
  bedrooms: number | null;
  bathrooms: number | null;
  areaSize: number;
  areaUnit: AreaUnit;
  images: string[];
  description: string;
  amenities: string[];
  featured: boolean;
  agentId: string;
  /** ISO date, used for "Newest" sorting */
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  specialty: string;
  city: City;
  phone: string;
  /** International format without "+" or spaces, e.g. 923001234567 */
  whatsapp: string;
  email: string;
  image: string;
  bio: string;
}