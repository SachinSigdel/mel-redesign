import Image from "next/image";
import { Headset, Layers, Map as MapIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { LINKS } from "@/data/site";

const HIGHLIGHTS = [
  { icon: Headset, title: "24/7 support", text: "Our team is here for work or personal concerns" },
  { icon: MapIcon, title: "UK-wide coverage", text: "Roles available in every region" },
  { icon: Layers, title: "5 specialist sectors", text: "Dedicated teams with sector knowledge" },
];

export default function About() {
  return (
    <section className="py-16 md:py-24">
      <div className="wrap grid items-center gap-10 md:grid-cols-2 md:gap-18">
        {/* the illustration, half the width; multiply blends its white background into the page */}
        <div className="mix-blend-multiply" data-reveal>
          <Image
            src="/images/hero.jpg"
            alt="A recruiter talking with a candidate at a desk"
            width={980}
            height={980}
            sizes="(min-width: 900px) 50vw, 100vw"
            className="mx-auto w-full max-w-110 md:max-w-none"
          />
        </div>
        <div>
          <Eyebrow>Welcome to MEL</Eyebrow>
          <h2 className="mb-4 text-about" data-heading>We believe in the power of human connection</h2>
          <p className="mb-7 text-17">
            It&apos;s not just about handshakes and small talk. It&apos;s about making sure you feel heard, understood
            and supported by a team that truly cares, at work and beyond.
          </p>
          <ul className="mb-8 grid gap-4">
            {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
              <li className="flex items-center gap-3" key={title}>
                <span className="grid size-11 shrink-0 place-items-center rounded-tile bg-raised text-ink">
                  <Icon className="size-4.5" aria-hidden="true" />
                </span>
                <div>
                  <strong className="block font-head leading-[1.3] font-medium text-heading">{title}</strong>
                  <span className="text-15 text-muted">{text}</span>
                </div>
              </li>
            ))}
          </ul>
          <Button href={LINKS.about} variant="secondary" arrow>About us</Button>
        </div>
      </div>
    </section>
  );
}
