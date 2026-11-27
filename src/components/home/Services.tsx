import { MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICES } from "@/data/services";
import ServiceCard from "./ServiceCard";

export default function Services() {
  return (
    <section className="bg-tint py-16 md:py-24" aria-labelledby="services-title">
      <div className="wrap">
        <SectionHeading
          id="services-title"
          tone="deep"
          eyebrow="Workforce specialisms"
          title="The roles we fill, in depth"
          intro="We go beyond generic staffing. Each specialism is a dedicated team with sector knowledge, compliance understanding and ready-to-deploy talent."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}

          {/* 6th card: turns the 3+2 layout into an even 3×2 and adds a call to action */}
          <article data-reveal className="on-dark flex flex-col justify-center rounded-md border border-navy bg-navy p-6 text-white">
            <div className="mb-7"><MessageCircle className="size-6" aria-hidden="true" /></div>
            <h3 className="mb-2 text-24 text-white">Can&apos;t see your sector?</h3>
            <p className="mb-6 text-white/85">
              Tell us what you need. Our team will find the right people for your business, fast
            </p>
            <Button href="/contact" variant="white" arrow className="self-start">Talk to our team</Button>
          </article>
        </div>
      </div>
    </section>
  );
}
