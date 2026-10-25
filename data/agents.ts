import type { Agent } from "@/lib/types";

const u = (id: string, w = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/**
 * DEMO DATA: sample agent profiles, not real people.
 * Phone and WhatsApp numbers are placeholders. Replace before going live.
 */
export const agents: Agent[] = [
  {
    id: "ahmed-raza",
    name: "Ahmed Raza",
    specialty: "Luxury Houses & Villas",
    city: "Lahore",
    phone: "+92 300 0000001",
    whatsapp: "923000000001",
    email: "ahmed.raza@example.com",
    image: u("photo-1507003211169-0a1dd7228f2d"),
    bio: "Sample profile. Focuses on premium houses in DHA and Gulberg.",
  },
  {
    id: "sara-khan",
    name: "Sara Khan",
    specialty: "Apartments & Rentals",
    city: "Islamabad",
    phone: "+92 300 0000002",
    whatsapp: "923000000002",
    email: "sara.khan@example.com",
    image: u("photo-1494790108377-be9c29b29330"),
    bio: "Sample profile. Helps families find apartments and rentals across Islamabad.",
  },
  {
    id: "bilal-ahmed",
    name: "Bilal Ahmed",
    specialty: "Plots & Investment",
    city: "Multan",
    phone: "+92 300 0000003",
    whatsapp: "923000000003",
    email: "bilal.ahmed@example.com",
    image: u("photo-1472099645785-5658abf4ff4e"),
    bio: "Sample profile. Specialises in residential plots and long-term investment property.",
  },
  {
    id: "ayesha-malik",
    name: "Ayesha Malik",
    specialty: "Commercial & Coastal Property",
    city: "Karachi",
    phone: "+92 300 0000004",
    whatsapp: "923000000004",
    email: "ayesha.malik@example.com",
    image: u("photo-1438761681033-6461ffad8d80"),
    bio: "Sample profile. Works on commercial spaces and sea-facing apartments in Karachi.",
  },
];

export function getAgentById(id: string): Agent | undefined {
  return agents.find((agent) => agent.id === id);
}