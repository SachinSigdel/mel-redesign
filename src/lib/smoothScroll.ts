import type Lenis from "lenis";

let instance: Lenis | null = null;

export const setSmoothScroll = (lenis: Lenis | null) => {
  instance = lenis;
};
export const getSmoothScroll = () => instance;
