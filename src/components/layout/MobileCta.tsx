"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { CONTACT, LINKS } from "@/data/site";

/* Phones and small tablets only: a fixed bar at the bottom with "Browse jobs" and a call button.
   It slides up once the hero's own buttons (or the contact page's top section) have scrolled out
   of view, and is invisible to clicks and keyboards while hidden. The body gets bottom padding on
   small screens (globals.css) so the bar never covers the footer. */
export default function MobileCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const anchor = document.querySelector("[data-cta-anchor]");
    const update = () => setVisible(anchor ? anchor.getBoundingClientRect().bottom < 0 : window.scrollY > 400);
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return (
    <nav
      aria-label="Quick actions"
      data-mobile-cta
      className={`fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-hairline bg-white px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] shadow-[0_-6px_20px_rgb(0_0_0/0.08)] transition-[translate,visibility] duration-320 ease-brand md:hidden ${
        visible ? "visible translate-y-0" : "invisible translate-y-[110%]"
      }`}
    >
      <a href={LINKS.jobBoard} className={`${buttonClasses("primary")} flex-1`}>
        Browse jobs
        <ArrowRight className="size-4.5" aria-hidden="true" />
      </a>
      <a
        href={CONTACT.phoneHref}
        aria-label={`Call MEL on ${CONTACT.phoneDisplay}`}
        className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-navy text-navy transition-colors duration-280 ease-soft hover:bg-navy hover:text-white"
      >
        <Phone className="size-5" aria-hidden="true" />
      </a>
    </nav>
  );
}
