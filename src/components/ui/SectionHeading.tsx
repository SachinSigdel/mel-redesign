import Eyebrow from "./Eyebrow";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
  tone?: "blue" | "deep";
};

/* A centred section heading: pill label, title and an optional intro */
export default function SectionHeading({ eyebrow, title, intro, id, tone = "blue" }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-12 max-w-180 text-center">
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 id={id} className="mb-4 text-section" data-heading>
        {title}
      </h2>
      {intro && <p className="text-17">{intro}</p>}
    </div>
  );
}
