import { Check } from "lucide-react";
import type { Service } from "@/data/services";

export type CardTone = "light" | "navy" | "blue";

/* Card tones: white (used for all five sectors now), navy and dark blue (white text on
   blue-600 is 4.6:1). Each tone sets its own colours, so no two classes ever compete. */
const TONES: Record<CardTone, { card: string; icon: string; lead: string; strong: string; row: string; check: string; outline: string }> = {
  light: {
    card: "border-hairline bg-white",
    icon: "text-navy group-hover:text-blue-600",
    lead: "text-muted",
    strong: "text-heading",
    row: "border-hairline",
    check: "text-blue-600",
    outline: "after:border-blue-600",
  },
  navy: {
    card: "on-dark border-navy bg-navy text-white",
    icon: "text-white",
    lead: "text-white",
    strong: "text-white",
    row: "border-white/22",
    check: "text-white",
    outline: "after:border-white/55",
  },
  blue: {
    card: "on-dark border-blue-600 bg-blue-600 text-white",
    icon: "text-white",
    lead: "text-white",
    strong: "text-white",
    row: "border-white/22",
    check: "text-white",
    outline: "after:border-white/55",
  },
};

/* Hover: an outline and a deeper shadow, drawn on an ::after layer that fades in. The card's own
   transition is used by the scroll reveal (with a stagger delay), so the hover gets its own layer
   and reacts straight away. */
const HOVER_LAYER =
  "after:pointer-events-none after:absolute after:-inset-px after:rounded-[inherit] after:border after:opacity-0 after:shadow-card-hover after:transition-opacity after:duration-400 after:ease-soft hover:after:opacity-100";

export default function ServiceCard({ service, tone = "light" }: { service: Service; tone?: CardTone }) {
  const Icon = service.icon;
  const t = TONES[tone];
  return (
    <article data-reveal className={`group relative flex flex-col rounded-panel border p-7 shadow-card ${t.card} ${HOVER_LAYER} ${t.outline}`}>
      {/* icon and heading on one line. The sector glyph: the same icon means the same sector
          everywhere (the signature detail) */}
      <div className="mb-2 flex items-center gap-3">
        <Icon className={`size-6 shrink-0 transition-colors duration-280 ease-soft ${t.icon}`} aria-hidden="true" />
        <h3 className={`text-[21px] ${tone === "light" ? "" : "text-white"}`}>{service.title}</h3>
      </div>
      <p className={`mb-3 leading-[1.5] ${t.lead}`}>{service.lead}</p>
      {/* roles as rows divided by hairlines, each with a small check */}
      <ul>
        {service.roles.map((role) => (
          <li key={role.name} className={`relative border-t py-2.5 pl-6.5 text-15 leading-[1.5] ${t.row}`}>
            <Check className={`absolute top-3.25 left-0 size-4 ${t.check}`} aria-hidden="true" />
            <strong className={`block font-head font-medium ${t.strong}`}>{role.name}</strong>
            {role.description}
          </li>
        ))}
      </ul>
    </article>
  );
}
