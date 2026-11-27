"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setSmoothScroll } from "@/lib/smoothScroll";

/* Eases mouse-wheel and trackpad scrolling so it settles in about a third of a second.
   It moves the real page scroll, so the sticky header, keyboard scrolling, focus and screen
   readers behave as normal. Touch keeps the phone's own scrolling. Off for "reduce motion". */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.2, smoothWheel: true, autoRaf: true });
    setSmoothScroll(lenis);
    return () => {
      lenis.destroy();
      setSmoothScroll(null);
    };
  }, []);

  return null;
}
