import { Check } from "lucide-react";
import type { Service } from "@/data/services";

/* Hover: a thin brand-blue outline and a deeper shadow, drawn on an ::after layer that fades in.
   The card's own transition is used by the scroll reveal (with a stagger delay), so the hover
   gets its own layer and reacts straight away. */
const HOVER_LAYER =
  "after:pointer-events-none after:absolute after:-inset-px after:rounded-[inherit] after:border after:border-blue-600 after:opacity-0 after:shadow-card-hover after:transition-opacity after:duration-160 after:ease-brand hover:after:opacity-100";

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article data-reveal className={`group relative flex flex-col rounded-md border border-hairline bg-white p-6 shadow-card ${HOVER_LAYER}`}>
      {/* the sector glyph: the same icon means the same sector everywhere (the signature detail) */}
      <div className="mb-7 text-navy transition-colors duration-160 ease-brand group-hover:text-blue-600">
        <Icon className="size-6" aria-hidden="true" />
      </div>
      <h3 className="mb-2 text-20">{service.title}</h3>
      <p className="mb-5 text-muted">{service.lead}</p>
      <ul className="grid gap-4 border-t border-hairline pt-5">
        {service.roles.map((role) => (
          <li key={role.name} className="relative pl-7 text-15 leading-[1.6]">
            <Check className="absolute top-0.75 left-0 size-4 text-muted" aria-hidden="true" />
            <strong className="block font-medium text-heading">{role.name}</strong>
            {role.description}
          </li>
        ))}
      </ul>
    </article>
  );
}
