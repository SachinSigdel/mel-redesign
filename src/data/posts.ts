import { HeartPulse, ShieldCheck, type LucideIcon } from "lucide-react";

export type Post = {
  title: string;
  href: string;
  date: string; // ISO date, formatted for display in the component
  excerpt: string;
  image?: string; // optional: posts without one get the branded fallback
  tag: { label: string; icon?: LucideIcon };
};

export const POSTS: Post[] = [
  {
    title: "Probation periods in 2027: what the six-month unfair dismissal rule means for UK employers",
    href: "https://mymel.co.uk/probation-period-unfair-dismissal-2027/",
    date: "2026-10-26",
    excerpt:
      "From 1 January 2027, employees in Great Britain can claim ordinary unfair dismissal after six months' service instead of two years, and the cap on compensation is removed. Your probation period does not change the law, but it is now…",
    tag: { label: "For employers" },
  },
  {
    title: "How to become a healthcare assistant in the UK (2026): qualifications, pay, DBS checks and your first job",
    href: "https://mymel.co.uk/how-to-become-a-healthcare-assistant-uk-2026/",
    date: "2026-10-14",
    excerpt:
      "If you want to know how to become a healthcare assistant (HCA) in the UK, the good news is that you usually do not need a degree or formal qualifications to start. Most employers want a caring attitude, good English…",
    image: "/images/post-hca.jpg",
    tag: { label: "Healthcare", icon: HeartPulse },
  },
  {
    title: "How to get an SIA licence in 2026: training, costs, renewals and security jobs",
    href: "https://mymel.co.uk/how-to-get-an-sia-licence-2026/",
    date: "2026-10-12",
    excerpt:
      "To get an SIA licence in 2026 you must be 18 or over, complete the licence-linked qualification for the role (door supervision, security guarding or CCTV), hold an Emergency First Aid at Work certificate…",
    image: "/images/post-sia.jpg",
    tag: { label: "Security", icon: ShieldCheck },
  },
];
