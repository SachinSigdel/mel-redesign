import Image from "next/image";
import { PARTNERS } from "@/data/home";

/* One logo tile. `copy` marks the repeats that only exist to make the scroll seamless:
   they get empty alt text so screen readers hear each company once. */
function Logo({ logo, copy }: { logo: (typeof PARTNERS)[number]; copy?: boolean }) {
  return (
    <li className={`grid h-28 w-55 flex-none place-items-center rounded-md border border-hairline bg-white shadow-card ${copy ? "marquee-dup" : ""}`}>
      <Image
        src={logo.src}
        alt={copy ? "" : logo.name}
        width={logo.width}
        height={logo.height}
        className="h-auto max-h-16 w-auto max-w-40"
      />
    </li>
  );
}

/* An endless, slow scroll of partner logos (the motion is in globals.css, "Partner logos") */
export default function Partners() {
  // the last section before the footer, on plain white; the tiles get a hairline so they still read as cards
  return (
    <section className="pt-4 pb-20" aria-labelledby="partners-title">
      <div className="wrap">
        <h2 id="partners-title" className="mb-8 text-center text-20 font-medium" data-heading>
          Companies we work with
        </h2>
      </div>
      {/* the logos are listed twice per half, and the half is repeated, so the loop never shows a gap */}
      <div className="marquee overflow-hidden">
        <div className="marquee-track flex w-max">
          <ul className="flex gap-6 pr-6">
            {PARTNERS.map((logo) => <Logo key={logo.name} logo={logo} />)}
            {PARTNERS.map((logo) => <Logo key={`${logo.name}-2`} logo={logo} copy />)}
          </ul>
          <ul className="marquee-copy flex gap-6 pr-6" aria-hidden="true">
            {[...PARTNERS, ...PARTNERS].map((logo, i) => <Logo key={`${logo.name}-${i}`} logo={logo} copy />)}
          </ul>
        </div>
      </div>
    </section>
  );
}
