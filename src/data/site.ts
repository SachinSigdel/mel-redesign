export type NavLink = { label: string; href: string };

// Internal pages start with "/", everything else stays on the live site (out of scope).
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "https://mymel.co.uk/about/" },
  { label: "Services", href: "https://mymel.co.uk/our-services/" },
  { label: "Job board", href: "https://mymel.co.uk/job-board/" },
  { label: "Blog", href: "https://mymel.co.uk/blogs/" },
  { label: "Contact", href: "/contact" },
];

export const LINKS = {
  apply: "https://mymel.co.uk/register/",
  register: "https://mymel.co.uk/register/",
  jobBoard: "https://mymel.co.uk/job-board/",
  about: "https://mymel.co.uk/about/",
  services: "https://mymel.co.uk/our-services/",
  blog: "https://mymel.co.uk/blogs/",
  policies: "https://mymel.co.uk/policies/",
};

export const CONTACT = {
  address: "6-9 The Square, Stockley Park, Uxbridge, UB11 1FW",
  phoneDisplay: "020 8064 0994",
  phoneHref: "tel:+442080640994",
  email: "info@mymel.co.uk",
  hours: "Mon–Fri, 8:00am–5:00pm",
};

export const isInternal = (href: string) => href.startsWith("/");
