import type { CSSProperties } from "react";
import { Quote, Star } from "lucide-react";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { TESTIMONIALS } from "@/data/home";

/* SAMPLE CONTENT for now: every card is tagged "Sample review" until real quotes replace them.
   Desktop: the intro column stays put (sticky) while the cards stack. Each card sticks a step
   lower than the one before, so the next one slides up over it. Pure CSS, no scroll script.
   Phones and tablets: a normal list. */
export default function Testimonials() {
  return (
    <section className="bg-tint py-16 md:py-24" aria-labelledby="testimonials-title">
      <div className="wrap grid gap-10 md:grid-cols-[1fr_1.5fr] md:items-start md:gap-16">
        <div className="md:sticky md:top-[calc(var(--header-h)+48px)]">
          <Eyebrow tone="deep">Testimonials</Eyebrow>
          <h2 id="testimonials-title" className="mb-4 text-section" data-heading>
            What people say about MEL
          </h2>
          <p className="mb-7 max-w-104 text-17">
            Sample reviews for now, to be replaced with real ones from candidates and employers
          </p>
          <Button href="/contact" variant="secondary" arrow>Share your experience</Button>
        </div>

        {/* 48px gaps: a little scroll room before the next card covers the last */}
        <div className="grid gap-6 pb-6 md:gap-12">
          {TESTIMONIALS.map(({ initials, who, role, quote }, i) => (
            <figure
              key={role}
              style={{ "--i": i } as CSSProperties}
              className="relative grid gap-5 overflow-hidden rounded-panel border border-hairline bg-white p-8 shadow-card md:sticky md:top-[calc(var(--header-h)+32px+var(--i)*24px)] md:grid-cols-[140px_1fr] md:gap-7 md:p-9"
            >
              <figcaption className="flex flex-col items-start gap-0.5">
                <span aria-hidden="true" className="mb-2.5 grid size-13 place-items-center rounded-full bg-tint font-head font-medium text-navy">
                  {initials}
                </span>
                <span className="font-head font-medium text-heading">Sample {who}</span>
                <span className="text-14 text-muted">{role}</span>
              </figcaption>
              <div>
                <div className="mb-3.5 flex items-center justify-between gap-3">
                  {/* warm amber stars: 4.6:1 on white */}
                  <span role="img" aria-label="Sample rating, 5 out of 5" className="inline-flex gap-0.5 text-[#b4570f]">
                    {Array.from({ length: 5 }, (_, s) => (
                      <Star key={s} className="size-4 fill-current" strokeWidth={0} aria-hidden="true" />
                    ))}
                  </span>
                  <span className="rounded-full bg-raised px-2.5 py-0.5 text-13 whitespace-nowrap text-ink">Sample review</span>
                </div>
                <blockquote className="text-17 leading-[1.65] text-heading italic">
                  <p>{quote}</p>
                </blockquote>
              </div>
              {/* a large, faint quote mark in the corner */}
              <Quote className="absolute right-6 bottom-4 size-18 text-heading opacity-6" aria-hidden="true" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
