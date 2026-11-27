"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { LINKS, NAV_LINKS, isInternal } from "@/data/site";
import Button from "@/components/ui/Button";
import MobileNav from "./MobileNav";
import { iconButton } from "./navStyles";

// The blue underline grows from the centre on hover and stays on the current page
const NAV_LINK = [
  "relative py-2 font-head text-15 font-medium text-heading transition-colors duration-160 ease-brand",
  "hover:text-navy aria-[current=page]:text-navy",
  "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-blue",
  "after:scale-x-0 after:transition-transform after:duration-160 after:ease-brand",
  "hover:after:scale-x-100 aria-[current=page]:after:scale-x-100",
].join(" ");

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Shadow under the header once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer if the window grows to desktop width while it's open
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white/96 backdrop-blur-sm backdrop-saturate-180 transition-shadow duration-160 ease-brand ${
          scrolled ? "shadow-header" : ""
        }`}
      >
        <div className="wrap flex h-18 items-center gap-8 md:h-21">
          <Link href="/" aria-label="MEL home">
            <Image src="/images/logo.png" alt="MEL" width={104} height={42} className="w-26" priority />
          </Link>

          <nav className="ml-auto hidden md:block" aria-label="Main">
            <ul className="flex gap-7">
              {NAV_LINKS.map((link) => {
                const current = isInternal(link.href) && pathname === link.href ? ("page" as const) : undefined;
                return (
                  <li key={link.label}>
                    {isInternal(link.href) ? (
                      <Link href={link.href} className={NAV_LINK} aria-current={current}>{link.label}</Link>
                    ) : (
                      <a href={link.href} className={NAV_LINK} aria-current={current}>{link.label}</a>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden md:block">
            <Button href={LINKS.apply} size="sm">Apply now</Button>
          </div>

          <button
            ref={menuButtonRef}
            className={`${iconButton} ml-auto md:hidden`}
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="size-4.5" aria-hidden="true" />
          </button>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={closeMenu} pathname={pathname} returnFocusRef={menuButtonRef} />
    </>
  );
}
