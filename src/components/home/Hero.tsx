import Image from "next/image";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { LINKS } from "@/data/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-16 md:pt-18 md:pb-24">
      <div className="wrap grid items-center gap-10 md:grid-cols-[1.05fr_1fr] md:gap-14">
        <div className="animate-rise">
          <Eyebrow>Recruitment made simple</Eyebrow>
          <h1 className="mb-5 text-hero leading-[1.08] tracking-[-0.02em]">Find a job that fits your career goals</h1>
          <p className="mb-8 max-w-xl text-18 leading-[1.6]">
            Roles in cleaning, care, logistics, hospitality and security with hundreds of employers across the UK.
            Register in minutes, upload your CV and start applying.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={LINKS.jobBoard} arrow>Browse jobs</Button>
            <Button href={LINKS.register} variant="secondary">Register free</Button>
          </div>
        </div>
        {/* multiply blends the illustration's white background into the page */}
        <div className="animate-rise mix-blend-multiply [animation-delay:60ms]">
          <Image
            src="/images/hero.jpg"
            alt="A recruiter talking with a candidate at a desk"
            width={980}
            height={980}
            sizes="(min-width: 900px) 50vw, 100vw"
            className="mx-auto w-full max-w-140"
            priority
          />
        </div>
      </div>
    </section>
  );
}
