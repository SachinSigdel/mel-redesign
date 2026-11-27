"use client";

import { useEffect } from "react";

/* Keeps the whole focused blog card in view, below the sticky header.
   The focus ring is drawn around the whole card, but the browser only scrolls the title link
   into view. The image sits above the title, so when tabbing backwards the top of the ring could
   end up under the header. Giving each title link a scroll-margin equal to its distance from the
   top and bottom of its card makes the browser's own focus scroll keep the whole card in view.
   Recalculated on resize and once everything has loaded, because the distances change with the layout. */
export default function BlogCardFocus() {
  useEffect(() => {
    const links = document.querySelectorAll<HTMLElement>("[data-card-link]");
    if (!links.length) return;

    const update = () => {
      links.forEach((link) => {
        const card = link.closest("[data-card]");
        if (!card) return;
        const l = link.getBoundingClientRect();
        const c = card.getBoundingClientRect();
        // +6px covers the ring (3px wide, 2px away from the card)
        link.style.scrollMarginTop = `${Math.max(0, Math.round(l.top - c.top) + 6)}px`;
        link.style.scrollMarginBottom = `${Math.max(0, Math.round(c.bottom - l.bottom) + 6)}px`;
      });
    };

    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("resize", onResize);
    window.addEventListener("load", update); // fonts and images can change the layout
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", update);
    };
  }, []);

  return null;
}
