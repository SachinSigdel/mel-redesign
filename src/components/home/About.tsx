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
      <div className="wrap grid items-center gap-10 md:grid-cols-[1.15fr_1fr] md:gap-18">
        <div data-reveal>
          <Image
            src="/images/welcome.jpg"
            alt="A team meeting around a table, connected by a network of lines"
            width={760}
            height={801}
            sizes="(min-width: 900px) 55vw, 100vw"
            // cropped to 4:3 on phones and tablets, the full image on desktop
            className="aspect-4/3 w-full rounded-panel object-cover object-[center_70%] md:aspect-760/801 md:object-center"
          />
        </div>
        <div>
          <Eyebrow>Welcome to MEL</Eyebrow>
          <h2 className="mb-4 text-about">We believe in the power of human connection</h2>
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
