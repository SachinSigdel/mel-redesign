import { MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICES } from "@/data/services";
import ServiceCard, { type CardTone } from "./ServiceCard";

/* Calm: the five sectors are white cards, so they read as equals, and only the CTA card is solid
   navy, because it's the one that asks you to act. (Alternating dark blue, navy and light blue
   cards were tried and were too noisy.) Other tones stay available in ServiceCard. */
const TONES: CardTone[] = ["light", "light", "light", "light", "light"];

export default function Services() {
  return (
    <section className="bg-tint py-16 md:py-24" aria-labelledby="services-title">
      {/* wider than the rest of the page, so the cards use the screen and wrap less (shorter cards) */}
      <div className="wrap md:max-w-[calc(1360px+40px)] md:px-5">
        <SectionHeading
          id="services-title"
          tone="deep"
          eyebrow="Workforce specialisms"
          title="The roles we fill, in depth"
          intro="We go beyond generic staffing. Each specialism is a dedicated team with sector knowledge, compliance understanding and ready-to-deploy talent."
        />
        {/* the same 24px gap at every width, edge to edge */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} tone={TONES[i]} />
          ))}

          {/* 6th card: turns the 3+2 layout into an even 3×2 and adds a call to action */}
          <article data-reveal className="on-dark flex flex-col justify-center rounded-panel border border-navy bg-navy p-7 text-white">
            <div className="mb-2 flex items-center gap-3">
              <MessageCircle className="size-6 shrink-0" aria-hidden="true" />
              <h3 className="text-24 text-white">Can&apos;t see your sector?</h3>
            </div>
            <p className="mb-6 text-white">
              Tell us what you need. Our team will find the right people for your business, fast
            </p>
            <Button href="/contact" variant="white" arrow className="self-start">Talk to our team</Button>
          </article>
        </div>
      </div>
    </section>
  );
}
