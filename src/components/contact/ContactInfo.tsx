import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { CONTACT } from "@/data/site";

const CARD = "flex flex-col gap-1 rounded-md border border-hairline bg-white p-6 transition-colors duration-160 ease-brand";

function CardContent({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: React.ReactNode }) {
  return (
    <>
      <span className="mb-3 grid size-11 place-items-center rounded-tile bg-raised text-ink">
        <Icon className="size-4.5" aria-hidden="true" />
      </span>
      <span className="font-head font-medium text-heading">{label}</span>
      <span className="text-15 break-words">{children}</span>
    </>
  );
}

export default function ContactInfo() {
  return (
    <div>
      <h2 className="mb-3 text-contact">Talk to our team</h2>
      <p className="mb-7">
        Send us any enquiry, feedback or suggestion. You can also reach us directly using the details below.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className={CARD}>
          <CardContent icon={MapPin} label="Visit us">{CONTACT.address}</CardContent>
        </div>
        <a className={`${CARD} hover:border-hairline-strong`} href={CONTACT.phoneHref}>
          <CardContent icon={Phone} label="Call us">{CONTACT.phoneDisplay}</CardContent>
        </a>
        <a className={`${CARD} hover:border-hairline-strong`} href={`mailto:${CONTACT.email}`}>
          <CardContent icon={Mail} label="Email us">{CONTACT.email}</CardContent>
        </a>
        <div className={CARD}>
          <CardContent icon={Clock} label="Office hours">{CONTACT.hours}<br />Closed weekends</CardContent>
        </div>
      </div>
    </div>
  );
}
