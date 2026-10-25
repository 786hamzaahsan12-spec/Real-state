import {
  Car,
  Check,
  Dumbbell,
  Film,
  Lock,
  MapPin,
  MoveVertical,
  Plug,
  Presentation,
  Route,
  ShieldCheck,
  Sunrise,
  TreePine,
  Users,
  Waves,
  Wifi,
  Zap,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Parking: Car,
  Garden: TreePine,
  Security: ShieldCheck,
  Gym: Dumbbell,
  "Wi-Fi": Wifi,
  "Swimming Pool": Waves,
  "Home Theatre": Film,
  Elevator: MoveVertical,
  "Backup Power": Zap,
  Balcony: Sunrise,
  "Servant Quarter": Users,
  "Corner Plot": MapPin,
  "Paved Roads": Route,
  "Nearby Utilities": Plug,
  "Gated Community": Lock,
  "Meeting Rooms": Presentation,
};

export default function AmenityList({ amenities }: { amenities: string[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {amenities.map((amenity) => {
        const Icon = icons[amenity] ?? Check;
        return (
          <li
            key={amenity}
            className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3 text-sm text-fg transition-colors hover:border-gold/40"
          >
            <Icon className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            {amenity}
          </li>
        );
      })}
    </ul>
  );
}