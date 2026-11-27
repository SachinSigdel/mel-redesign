"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Fades and raises every [data-reveal] element 16px, once, the first time it scrolls into view.
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

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    els.forEach((el) => {
      if (!el.classList.contains("is-revealed")) io.observe(el);
    });

    // a11y: keyboard focus inside a hidden block shows it at once (CSS :focus-within shows it instantly;
    // this keeps it shown after focus moves on)
    const onFocusIn = (e: FocusEvent) => {
      const block = (e.target as Element).closest?.("[data-reveal]");
      if (block && !block.classList.contains("is-revealed")) {
        block.classList.add("is-revealed");
        io.unobserve(block);
      }
    };
    document.addEventListener("focusin", onFocusIn);

    return () => {
      io.disconnect();
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [pathname]);

  return null;
}
