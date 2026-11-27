import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/data/posts";

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));

type BlogCardProps = {
  post: Post;
  wide?: boolean; // tablet: a card left alone on the last row spans both columns, image on the left
};

export default function BlogCard({ post, wide = false }: BlogCardProps) {
  const TagIcon = post.tag.icon;
  const card = [
    "group relative flex flex-col overflow-hidden rounded-md border border-hairline bg-white shadow-card",
    // hover (only on devices that can hover): thin blue outline and a deeper shadow
    "transition-[border-color,box-shadow] duration-400 ease-soft hover:border-blue-600 hover:shadow-card-hover",
    // a11y: the title is clipped to 2 lines, which would clip its focus ring, so the ring goes around the card
    "has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-navy",
    wide && "sm:max-md:col-span-full sm:max-md:flex-row",
  ]
    .filter(Boolean)
    .join(" ");
  // no background colour here: each branch sets its own, because two bg-* classes on one element
  // don't combine. Tailwind decides the winner by its own CSS order, not the order in the class string
  const media = `aspect-video overflow-hidden ${wide ? "sm:max-md:aspect-auto sm:max-md:shrink-0 sm:max-md:basis-1/2" : ""}`;

  return (
    <article className={card} data-card data-reveal>
      {post.image ? (
        <div className={`${media} bg-tint`}>
          <Image
            src={post.image}
            alt=""
            width={800}
            height={533}
            sizes="(min-width: 900px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="size-full object-cover"
          />
        </div>
      ) : (
        // Branded fallback when a post has no image, so the grid never looks broken
        <div className={`${media} grid place-items-center bg-navy`}>
          <Image src="/images/logo.png" alt="" width={400} height={160} className="h-auto w-2/5 opacity-90 brightness-0 invert" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2 flex items-center gap-2 text-14 text-muted tabular-nums">
          <span className="inline-flex items-center gap-1 text-ink">
            {TagIcon && <TagIcon className="size-4 text-navy" aria-hidden="true" />}
            {post.tag.label}
          </span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h3 className="mb-2 line-clamp-2 text-18 leading-[1.35]">
          {/* the ::after stretches this link over the whole card, so the whole card is clickable */}
          <a
            href={post.href}
            data-card-link
            className="transition-colors duration-280 ease-soft group-hover:text-blue-600 after:absolute after:inset-0 focus-visible:outline-none"
          >
            {post.title}
          </a>
        </h3>
        <p className="mb-4 line-clamp-3 text-15">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-2 font-head text-15 font-medium text-navy" aria-hidden="true">
          Read more
          <ArrowRight className="size-4 transition-transform duration-320 ease-brand motion-safe:group-hover:translate-x-0.75" />
        </span>
      </div>
    </article>
  );
}
