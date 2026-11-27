type EyebrowProps = {
  children: React.ReactNode;
  tone?: "blue" | "deep" | "white" | "soft-white";
  rule?: boolean; // the short underline, sized to the label
  centred?: boolean; // centre the underline under a centred heading
  className?: string;
};

const TONES = {
  blue: "text-blue-600", // 4.6:1 on white
  deep: "text-blue-800", // for the pale blue services background, where blue-600 is only 4.3:1
  white: "text-white",
  "soft-white": "text-white/75",
};

/* The small label above a heading ("Welcome to MEL", "Insights"…) */
export default function Eyebrow({ children, tone = "blue", rule = true, centred = false, className }: EyebrowProps) {
  const classes = [
    "inline-block font-body text-15 font-medium",
    TONES[tone],
    rule ? "eyebrow-rule mb-4" : "mb-3",
    rule && centred && "is-centred",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <span className={classes}>{children}</span>;
}
