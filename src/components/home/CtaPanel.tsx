import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { LINKS } from "@/data/site";

const FEATURES = [
  { title: "Hundreds of live jobs", text: "Updated daily across all key sectors" },
  { title: "Fast, personal support", text: "A real recruiter not a bot responds within 2 hours" },
  { title: "Free to register, always", text: "No fees, no subscriptions, no catches for candidates" },
  { title: "Nationwide coverage", text: "Roles available across every region of the UK" },
];

export default function CtaPanel() {
  return (
    <section className="px-3 py-16 md:py-24" aria-labelledby="cta-title">
      {/* cta-bg: the swirl image under a blue layer (globals.css) */}
      <div className="on-dark cta-bg mx-auto max-w-340 rounded-lg py-14 text-white md:rounded-xl md:py-27.5">
        <div className="wrap grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <div data-reveal>
            <Eyebrow tone="white">Continue your job hunt on the go</Eyebrow>
            <h2 id="cta-title" className="mb-4 text-cta text-white">Your next role is one click away</h2>
            <p className="mb-8 max-w-130 text-17">
              Looking for a job that fits you has never been this easy. Reach out to endless opportunities and get
              involved in revolutionising the world. We provide you with the best working experience.
            </p>
            <Button href={LINKS.jobBoard} variant="white" arrow>Start looking</Button>
          </div>
          <ul className="grid gap-6">
            {FEATURES.map((f) => (
              <li key={f.title} data-reveal>
                <strong className="block font-head font-medium">{f.title}</strong>
                <span className="text-15">{f.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
