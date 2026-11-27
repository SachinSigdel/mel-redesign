type EyebrowProps = {
  children: React.ReactNode;
  tone?: "blue" | "deep" | "white" | "soft-white";
  className?: string;
};

// Pill label, the original site's style. The text is blue-800 (5.0:1 on the tint),
// because the original's light blue was only 2.6:1.
const TONES = {
  blue: "border-tint-border bg-tint text-blue-800", // on white sections
  deep: "border-tint-border bg-white text-blue-800", // on the pale blue services section, so the pill still stands out
  white: "border-white/70 bg-transparent text-white", // on the blue CTA panel
  "soft-white": "border-white/70 bg-transparent text-white", // on the navy contact header
};

/* The small label above a heading ("Welcome to MEL", "Insights"…) */
export default function Eyebrow({ children, tone = "blue", className }: EyebrowProps) {
  const classes = [
    "mb-4 inline-block rounded-full border px-4.5 py-1.5 font-body text-15 leading-normal",
    TONES[tone],
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <span className={classes}>{children}</span>;
}
