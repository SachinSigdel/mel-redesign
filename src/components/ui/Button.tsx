import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { isInternal } from "@/data/site";

type Variant = "primary" | "secondary" | "white";
type Size = "md" | "sm";

const VARIANTS: Record<Variant, string> = {
  // each variant sets its own hover shadow: two shadow classes on one element would clash
  primary: "border-transparent bg-navy text-white hover:bg-navy-700 hover:not-aria-disabled:shadow-btn", // a slightly darker navy
  secondary: "border-navy bg-transparent text-navy hover:bg-navy hover:text-white hover:shadow-btn", // fills navy, on top of the lift
  white: "border-transparent bg-white text-blue-600 hover:bg-tint hover:shadow-btn-dark", // on blue and navy panels the shadow needs more depth
};

const SIZES: Record<Size, string> = {
  md: "min-h-12 px-6 py-3",
  sm: "min-h-10 px-5 py-2",
};

/* The button look as one class string, so other elements (the form's submit button,
   the drawer's link) can look like buttons without being this component. */
export function buttonClasses(variant: Variant = "primary", size: Size = "md") {
  return [
    "group inline-flex items-center justify-center gap-2 rounded-sm border-2",
    "font-head text-15 leading-none font-medium",
    // hover: lift 2px onto a soft neutral shadow, and each variant shifts its colour (set in VARIANTS).
    // Tailwind's hover: only applies on devices that can hover, so a tap on a phone doesn't leave it stuck
    "transition-[color,background-color,border-color,box-shadow,translate,scale] duration-280 ease-soft",
    "hover:not-aria-disabled:-translate-y-0.5",
    // press: back down, slightly smaller, shadow tucked in, and quick so clicks never feel laggy
    "active:translate-y-0 active:scale-[0.98] active:shadow-btn-press active:duration-120",
    "motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
    // while the form is sending (aria-disabled): no lift, no shadow
    "aria-disabled:cursor-progress aria-disabled:opacity-70",
    VARIANTS[variant],
    SIZES[size],
  ].join(" ");
}

type ButtonProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function Button({ href, variant = "primary", size = "md", arrow = false, className, children }: ButtonProps) {
  const classes = [buttonClasses(variant, size), className].filter(Boolean).join(" ");
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          // the arrow slides 3px on hover: "this takes you somewhere" (it glides slightly behind the lift)
          className="size-4.5 shrink-0 transition-transform duration-320 ease-brand motion-safe:group-hover:translate-x-0.75"
        />
      )}
    </>
  );

  // Internal pages use <Link> (client-side navigation); external pages use a normal <a>.
  return isInternal(href) ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}
