import Image from "next/image";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { LINKS } from "@/data/site";

/* The team photo fills the hero (the right part on desktop) and fades into white behind the
   text (hero-photo in globals.css), so the hero stays light above the blue steps strip.
   hero-bg.webp is the team photo upscaled 4x (760 → 3040px) with EDSR, an AI super-resolution
   model, after a light denoise that removes the original's JPEG blocks. */
export default function Hero() {
  return (
    <section className="hero-photo relative overflow-hidden pt-16 pb-28 md:flex md:min-h-167 md:items-center md:pt-30 md:pb-36">
      <div className="hero-photo__bg absolute inset-x-0 top-0 bottom-12 md:left-[35%]" aria-hidden="true">
        <Image
          src="/images/hero-bg.webp"
          alt=""
          fill
          sizes="(min-width: 900px) 65vw, 100vw"
          className="object-cover object-[center_35%]"
          priority
        />
      </div>
      <div className="wrap relative grid w-full items-end gap-10 md:grid-cols-[1.3fr_1fr] md:gap-14">
        <div className="animate-rise">
          <Eyebrow>Recruitment made simple</Eyebrow>
          <h1 className="mb-5 text-hero leading-[1.08] tracking-[-0.02em]">
            Find a job that fits your career goals
          </h1>
          <p className="mb-8 max-w-xl text-18 leading-[1.6]">
            Roles in cleaning, care, logistics, hospitality and security with hundreds of employers across the UK.
            Register in minutes, upload your CV and start applying.
          </p>
          <div className="flex flex-wrap gap-3" data-cta-anchor>
            <Button href={LINKS.jobBoard} arrow>Browse jobs</Button>
            <Button href={LINKS.register} variant="secondary">Register free</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
