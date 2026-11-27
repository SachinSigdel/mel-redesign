import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, LINKS } from "@/data/site";

// a11y: below 900px (touch) each link has a 44px-tall tap area; on desktop they go back to 12px apart
const LINK_LIST = "-my-2.5 md:my-0 md:space-y-3";
const LINK = "inline-block min-w-11 py-2.5 transition-colors duration-280 ease-soft hover:text-white md:py-0";
// phone, email and "All policies": the same 44px tap area, with a negative margin so the rows don't move
const INLINE_LINK = "-my-2.5 inline-block py-2.5 transition-colors duration-280 ease-soft hover:text-white";
const ICON = "mt-1 size-4.5 shrink-0 text-white/60";

export default function Footer() {
  return (
    <footer className="on-dark bg-footer text-15 text-white/75">
      <div className="wrap grid gap-9 pt-14 pb-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1.4fr] md:gap-10 md:pt-18 md:pb-14">
        <div>
          <Link href="/" className="block w-fit" aria-label="MEL home">
            <Image src="/images/logo.png" alt="MEL" width={140} height={56} className="mb-4 w-35" />
          </Link>
          <p className="max-w-75">
            Recruitment made simple. Connecting UK employers with reliable, vetted people across five specialist sectors.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-16 text-white">Company</h2>
          <ul className={LINK_LIST}>
            <li><Link href="/" className={LINK}>Home</Link></li>
            <li><a href={LINKS.about} className={LINK}>About</a></li>
            <li><a href={LINKS.services} className={LINK}>Services</a></li>
            <li><a href={LINKS.blog} className={LINK}>Blog</a></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-16 text-white">Candidates</h2>
          <ul className={LINK_LIST}>
            <li><a href={LINKS.jobBoard} className={LINK}>Job board</a></li>
            <li><a href={LINKS.register} className={LINK}>Register</a></li>
            <li><Link href="/contact" className={LINK}>Contact us</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-16 text-white">Get in touch</h2>
          <ul className="space-y-5">
            <li className="flex items-start gap-3"><MapPin className={ICON} aria-hidden="true" /><span>{CONTACT.address}</span></li>
            <li className="flex items-start gap-3"><Phone className={ICON} aria-hidden="true" /><a href={CONTACT.phoneHref} className={INLINE_LINK}>{CONTACT.phoneDisplay}</a></li>
            <li className="flex items-start gap-3"><Mail className={ICON} aria-hidden="true" /><a href={`mailto:${CONTACT.email}`} className={INLINE_LINK}>{CONTACT.email}</a></li>
            <li className="flex items-start gap-3"><Clock className={ICON} aria-hidden="true" /><span>{CONTACT.hours}</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="wrap flex flex-wrap justify-between gap-3 py-5 text-14">
          <p>© {new Date().getFullYear()} MEL. All rights reserved.</p>
          <div className="flex gap-5">
            <a href={LINKS.policies} className={INLINE_LINK}>All policies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
