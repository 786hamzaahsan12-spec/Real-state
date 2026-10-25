import type { Metadata } from "next";
import LegalPage from "@/components/ui/layout/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy placeholder for the RealHome demo website.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This page explains, in simple terms, how a website like RealHome could handle visitor information."
      sections={[
        {
          heading: "Information we collect",
          body: "This demo does not send any form data to a server. Your saved favourite properties are stored only in your own browser using local storage.",
        },
        {
          heading: "How information is used",
          body: "If a backend is connected in future, details you submit through the contact form would be used only to respond to your enquiry.",
        },
        {
          heading: "Your choices",
          body: "You can clear saved favourites at any time by removing them in the app or clearing your browser storage.",
        },
      ]}
    />
  );
}