"use client";

import { useEffect, useRef, type RefObject } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { LINKS, NAV_LINKS, isInternal } from "@/data/site";
import { getSmoothScroll } from "@/lib/smoothScroll";
import { buttonClasses } from "@/components/ui/Button";
import { iconButton } from "./navStyles";

// Everything behind the drawer. The drawer itself is a separate child of <body>, so it isn't included.
const BACKGROUND = "body > header, body > main, body > footer, body > [data-mobile-cta]";

const DRAWER_LINK =
  "block py-3 font-head font-medium text-heading aria-[current=page]:text-navy aria-[current=page]:underline aria-[current=page]:decoration-blue aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-6";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
};

export default function MobileNav({ open, onClose, pathname, returnFocusRef }: MobileNavProps) {
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = () => panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    const background = document.querySelectorAll<HTMLElement>(BACKGROUND);
    const returnTo = returnFocusRef.current;

    document.body.classList.add("overflow-hidden"); // stop the page behind from scrolling…
    getSmoothScroll()?.stop(); // …including the smooth wheel scrolling
    // a11y: make the page behind inert, so screen readers can't wander into it and nothing behind can be clicked or focused
    background.forEach((el) => (el.inert = true));
    focusables()[0]?.focus(); // move focus into the drawer

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      // Focus trap: Tab and Shift+Tab loop inside the drawer
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      // runs when the drawer closes: undo everything and give focus back
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("overflow-hidden");
      getSmoothScroll()?.start();
      background.forEach((el) => (el.inert = false)); // must come before focusing the menu button, which is inside the header
      returnTo?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  return (
    <div className={`fixed inset-0 z-60 ${open ? "visible" : "invisible"}`} id="mobile-nav" aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-footer/50 transition-opacity duration-220 ease-brand ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <nav
        ref={panelRef}
        aria-label="Mobile"
        className={`absolute inset-y-0 right-0 flex w-[min(320px,85vw)] flex-col bg-white px-6 pt-5 pb-7 transition-transform duration-300 ease-brand ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button className={`${iconButton} mb-4 self-end`} type="button" aria-label="Close menu" onClick={onClose}>
          <X className="size-7.5" aria-hidden="true" />
        </button>
        <ul>
          {NAV_LINKS.map((link) => {
            const current = isInternal(link.href) && pathname === link.href ? ("page" as const) : undefined;
            return (
              <li key={link.label} className="border-b border-line">
                {isInternal(link.href) ? (
                  <Link href={link.href} className={DRAWER_LINK} aria-current={current} onClick={onClose}>{link.label}</Link>
                ) : (
                  <a href={link.href} className={DRAWER_LINK} aria-current={current}>{link.label}</a>
                )}
              </li>
            );
          })}
        </ul>
        <a href={LINKS.apply} className={`${buttonClasses("primary")} mt-auto w-full`}>Apply now</a>
      </nav>
    </div>
  );
}
