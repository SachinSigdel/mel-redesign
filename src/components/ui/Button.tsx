import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { isInternal } from "@/data/site";

type Variant = "primary" | "secondary" | "white";
type Size = "md" | "sm";

const VARIANTS: Record<Variant, string> = {
  primary: "border-transparent bg-navy text-white hover:bg-navy-700",
  secondary: "border-navy bg-transparent text-navy hover:bg-navy hover:text-white",
  white: "border-transparent bg-white text-blue-600 hover:bg-tint",
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
    // colour changes fade over 280ms on an even curve; the press is instant
    "transition-colors duration-280 ease-soft active:scale-[0.98]",
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
          // the arrow slides 3px on hover: "this takes you somewhere"
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
