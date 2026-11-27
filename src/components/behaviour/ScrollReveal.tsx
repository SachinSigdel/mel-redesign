"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Fades and raises every [data-reveal] element 16px each time it scrolls into view, and resets it
   once it has left the screen completely, so the animation plays again next time.
   Siblings are staggered 80ms (max 240ms). The motion itself is CSS (globals.css, "Scroll reveal");
   this only adds the classes. Runs again after each client-side navigation, for the new page. */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!els.length || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // no motion: show everything as is

    els.forEach((el) => {
      const siblings = Array.from(el.parentElement?.children ?? []).filter((c) => c.hasAttribute("data-reveal"));
      const i = siblings.indexOf(el);
      if (i > 0) el.style.setProperty("--reveal-delay", `${Math.min(i, 3) * 80}ms`);
      // anything already on screen stays as it is (no flash of hidden content)
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-revealed");
    });
    // content is only hidden once this class is on <html>, so without JS everything is visible
    document.documentElement.classList.add("js-reveal");

    // show: once the element is 10% above the bottom of the screen
    const show = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-revealed")),
      { rootMargin: "0px 0px -10% 0px" },
    );
    // reset: only when the element is completely off screen, so it never vanishes while you can see it
    const hide = new IntersectionObserver((entries) =>
      entries.forEach((entry) => !entry.isIntersecting && entry.target.classList.remove("is-revealed")),
    );
    els.forEach((el) => {
      show.observe(el);
      hide.observe(el);
    });

    // a11y: keyboard focus inside a hidden block shows it at once (CSS :focus-within shows it instantly;
    // this keeps it shown after focus moves on)
    const onFocusIn = (e: FocusEvent) => {
      const block = (e.target as Element).closest?.("[data-reveal]");
      if (block) block.classList.add("is-revealed");
    };
    document.addEventListener("focusin", onFocusIn);

    return () => {
      show.disconnect();
      hide.disconnect();
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [pathname]);

  return null;
}
