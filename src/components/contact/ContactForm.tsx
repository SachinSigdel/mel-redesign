"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheck, Send } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/contactSchema";
import { buttonClasses } from "@/components/ui/Button";
import Field, { controlClasses } from "./Field";

type Status =
  | { type: "idle" }
  | { type: "invalid" }
  | { type: "success"; name: string }
  | { type: "error" };

// Visible message styles. While empty, the box is sr-only: hidden on screen but still a live region
// screen readers know about, so they announce the message as soon as it's filled in.
const VISIBLE = "flex items-start gap-3 rounded-sm px-4 py-3 text-15";
const STATUS_CLASSES: Record<Status["type"], string> = {
  idle: "sr-only",
  success: `${VISIBLE} bg-success-soft text-success`,
  error: `${VISIBLE} bg-error-soft text-error`,
  invalid: `${VISIBLE} bg-error-soft text-error`,
};

const EMPTY: ContactInput = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  enquiryType: "",
  message: "",
  company: "",
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const timer = useRef<number | undefined>(undefined);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: EMPTY,
    mode: "onTouched", // check a field when you leave it, then live once it has an error
  });

  // live character count for the message (useWatch re-renders only when this field changes)
  const messageLength = useWatch({ control, name: "message" })?.length ?? 0;

  // a11y: the status box is a live region that's always in the page. To make screen readers announce
  // every message, even the same one twice in a row, it's emptied first and filled 100ms later.
  // Focus is NOT moved to it: the live region reads it out, and focus stays on the Send button.
  const announce = (next: Status) => {
    window.clearTimeout(timer.current);
    setStatus({ type: "idle" });
    timer.current = window.setTimeout(() => setStatus(next), 100);
  };
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onSubmit = async (data: ContactInput) => {
    window.clearTimeout(timer.current);
    setStatus({ type: "idle" }); // clear any earlier message while this attempt runs
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      reset(EMPTY);
      announce({ type: "success", name: data.firstName });
    } catch {
      announce({ type: "error" });
    }
  };

  // Helper: the aria attributes every control needs
  const a11y = (name: keyof ContactInput, extra?: string) => ({
    "aria-invalid": errors[name] ? true : false,
    "aria-describedby": [`${name}-error`, extra].filter(Boolean).join(" "),
  });

  return (
    <form
      className="grid gap-5 sm:grid-cols-2"
      noValidate
      onSubmit={(e) => {
        if (isSubmitting) return e.preventDefault(); // already sending: ignore extra clicks
        // validate with the schema; on failure, focus the first invalid field and show the summary
        handleSubmit(onSubmit, () => announce({ type: "invalid" }))(e);
      }}
    >
      <Field id="firstName" label="First name" required error={errors.firstName?.message}>
        <input className={controlClasses(!!errors.firstName)} id="firstName" type="text" autoComplete="given-name"
          placeholder="e.g. Jane" required {...register("firstName")} {...a11y("firstName")} />
      </Field>

      <Field id="lastName" label="Last name" optional error={errors.lastName?.message}>
        <input className={controlClasses(!!errors.lastName)} id="lastName" type="text" autoComplete="family-name"
          placeholder="e.g. Smith" {...register("lastName")} {...a11y("lastName")} />
      </Field>

      <Field id="email" label="Email" required error={errors.email?.message}>
        <input className={controlClasses(!!errors.email)} id="email" type="email" inputMode="email" autoComplete="email"
          placeholder="name@example.com" required {...register("email")} {...a11y("email")} />
      </Field>

      <Field id="phone" label="Phone" optional error={errors.phone?.message}>
        <input className={controlClasses(!!errors.phone)} id="phone" type="tel" inputMode="tel" autoComplete="tel"
          placeholder="e.g. 07700 900123" {...register("phone")} {...a11y("phone")} />
      </Field>

      <Field id="enquiryType" label="I am a…" required full error={errors.enquiryType?.message}>
        <select className={`${controlClasses(!!errors.enquiryType)} select-arrow appearance-none pr-10`} id="enquiryType" required {...register("enquiryType")} {...a11y("enquiryType")}>
          <option value="">Please choose</option>
          <option value="candidate">Candidate looking for work</option>
          <option value="employer">Employer looking for staff</option>
          <option value="other">Other enquiry</option>
        </select>
      </Field>

      <Field
        id="message"
        label="Your message"
        required
        full
        error={errors.message?.message}
        hint={
          <div className="flex justify-between text-13 text-ink" id="message-hint">
            <span>At least 10 characters</span>
            <span>{messageLength}/1000</span>
          </div>
        }
      >
        <textarea className={`${controlClasses(!!errors.message)} min-h-35 resize-y`} id="message" placeholder="How can we help?" required maxLength={1000}
          {...register("message")} {...a11y("message", "message-hint")} />
      </Field>

      {/* Honeypot: hidden from people, bots fill it in */}
      <div className="absolute -left-[9999px] size-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div className="col-span-full">
        {/* aria-disabled, not disabled: a disabled button loses keyboard focus, which jumps to the top of the page */}
        <button type="submit" className={`${buttonClasses("primary")} w-full`} aria-disabled={isSubmitting || undefined}>
          {isSubmitting ? (
            <>
              <span className="size-4 animate-[spin_0.7s_linear_infinite] rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Send message <Send className="size-4.5 transition-transform duration-320 ease-brand motion-safe:group-hover:translate-x-0.75" aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      {/* Always rendered. When empty it's visually hidden (CSS) but still known to screen readers */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={`col-span-full ${STATUS_CLASSES[status.type]}`}
      >
        {status.type === "success" && (
          <>
            <CircleCheck className="mt-0.5 size-4.5 shrink-0" aria-hidden="true" />
            <div>
              <strong className="block">Thanks {status.name}, your message has been sent</strong> Our team will be in touch using the
              details you gave us.
            </div>
          </>
        )}
        {status.type === "error" && (
          <>
            <CircleAlert className="mt-0.5 size-4.5 shrink-0" aria-hidden="true" />
            <div>
              <strong className="block">Sorry, something went wrong</strong> Please try again or email info@mymel.co.uk.
            </div>
          </>
        )}
        {status.type === "invalid" && (
          <>
            <CircleAlert className="mt-0.5 size-4.5 shrink-0" aria-hidden="true" />
            <div><strong className="block">Please fix the highlighted fields</strong></div>
          </>
        )}
      </div>
    </form>
  );
}
