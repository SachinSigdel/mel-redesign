import type { CSSProperties } from "react";
import { FileUp, Send, UserPlus } from "lucide-react";

const STEPS = [
  { icon: UserPlus, title: "Register your account", text: "Create a free profile to begin applying" },
  { icon: FileUp, title: "Upload your CV", text: "Add your CV so employers can find you" },
  { icon: Send, title: "Apply for jobs", text: "One click to apply in seconds" },
];

export default function Steps() {
  return (
    // on-dark: focus rings turn white on the blue background
    <section className="on-dark bg-blue-600 py-14 text-white" aria-labelledby="steps-title">
      <div className="wrap">
        <h2 id="steps-title" className="sr-only">How it works</h2>
        <ol className="steps-list grid gap-6 sm:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              data-reveal
              // phones: compact rows with the icon on the left; tablet and up: centred columns
              className="step group relative text-center max-sm:grid max-sm:grid-cols-[64px_1fr] max-sm:items-center max-sm:gap-x-4 max-sm:text-left"
            >
              <div
                // step-pulse: the ring that spreads out of the circle in turn (globals.css)
                className="step-pulse relative z-1 mx-auto mb-4 grid size-18 place-items-center rounded-full bg-white text-blue-600 shadow-md transition-transform duration-400 ease-brand after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:opacity-0 motion-safe:group-hover:-translate-y-1 max-sm:row-span-2 max-sm:m-0 max-sm:size-16"
              >
                <Icon className="size-6" aria-hidden="true" />
                <span
                  className="absolute -top-1 -right-1 grid size-6 place-items-center rounded-full border-2 border-blue-600 bg-navy font-head text-12 font-medium text-white tabular-nums"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
              </div>
              <h3 className="mb-1 text-20 text-white max-sm:m-0 max-sm:self-end max-sm:text-18">{title}</h3>
              <p className="max-sm:self-start max-sm:text-15">{text}</p>

              {/* the wavy dotted path to the next step; --i delays the second one */}
              {i < STEPS.length - 1 && (
                <span
                  className="step-connector pointer-events-none absolute top-2 left-[calc(50%+48px)] block h-14 w-[calc(100%-72px)] after:absolute after:top-1/2 after:right-0.5 after:-mt-1 after:size-2 after:rotate-45 after:rounded-[1px] after:border-t-2 after:border-r-2 after:border-white max-sm:hidden"
                  style={{ "--i": i } as CSSProperties}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 200 56" preserveAspectRatio="none" focusable="false" className="block h-full w-[calc(100%-6px)] overflow-visible">
                    <path className="step-path" d="M0 28 C25 28 30 4 50 4 S80 52 100 52 S130 4 150 4 S175 28 200 28" />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
