import { CircleAlert } from "lucide-react";

/* The input look, shared by every input, select and textarea. Red border and tint when invalid. */
export function controlClasses(invalid: boolean) {
  return [
    "min-h-14 w-full rounded-sm border px-4.5 py-3.5 text-16", // 16px stops iOS zooming into inputs
    "transition-[border-color,background-color] duration-280 ease-soft",
    "placeholder:text-muted placeholder:opacity-100", // 4.6:1 placeholder
    // a11y: the same 3px navy ring as every other control
    "focus:outline-3 focus:outline-offset-2 focus:outline-navy",
    // an invalid field keeps its red border and tint while focused, so the error stays visible while it's fixed
    invalid
      ? "border-error bg-error-field"
      : "border-field-border bg-field hover:border-field-border-hover focus:border-navy focus:bg-white",
  ].join(" ");
}

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  full?: boolean; // span both columns
  hint?: React.ReactNode;
  children: React.ReactNode; // the <input>, <select> or <textarea>
};

/* Label + control + error message, reused for every field */
export default function Field({ id, label, required, optional, error, full, hint, children }: FieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${full ? "col-span-full" : ""}`}>
      <label className="font-head text-15 font-medium text-heading" htmlFor={id}>
        {label}{" "}
        {required && <span className="text-error" aria-hidden="true">*</span>}
        {optional && <span className="text-14 font-normal text-ink">(optional)</span>}
      </label>
      {children}
      {hint}
      {/* always in the page, so aria-describedby always points at something; only shown with an error */}
      <p className={`items-center gap-2 text-14 text-error ${error ? "flex" : "hidden"}`} id={`${id}-error`}>
        <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
        <span>{error}</span>
      </p>
    </div>
  );
}
