import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { CONTACT } from "@/data/site";

/* The four ways to reach MEL as a 2x2 grid of cards on the navy header: translucent white cards
   with white text, each with a white icon tile */
const CARD = "flex items-center gap-5 rounded-md border border-white/16 bg-white/7 p-6 transition-colors duration-280 ease-soft";

function CardContent({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: React.ReactNode }) {
  return (
    <>
      <span className="grid size-16 shrink-0 place-items-center rounded-[14px] bg-white text-navy">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="font-head text-[19px] font-medium text-white">{label}</span>
        <span className="text-15 break-words text-white">{children}</span>
      </span>
    </>
  );
}

export default function ContactInfo() {
  return (
    <div className="grid animate-rise gap-4 [animation-delay:60ms] sm:grid-cols-2">
      <div className={CARD}>
        <CardContent icon={MapPin} label="Visit us">{CONTACT.address}</CardContent>
      </div>
      <a className={`${CARD} hover:border-white/40 hover:bg-white/13`} href={CONTACT.phoneHref}>
        <CardContent icon={Phone} label="Call us">{CONTACT.phoneDisplay}</CardContent>
      </a>
      <a className={`${CARD} hover:border-white/40 hover:bg-white/13`} href={`mailto:${CONTACT.email}`}>
        <CardContent icon={Mail} label="Email us">{CONTACT.email}</CardContent>
      </a>
      <div className={CARD}>
        <CardContent icon={Clock} label="Office hours">{CONTACT.hours}<br />Closed weekends</CardContent>
      </div>
    </div>
  );
}
