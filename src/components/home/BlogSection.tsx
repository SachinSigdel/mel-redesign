import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { LINKS } from "@/data/site";
import { POSTS } from "@/data/posts";
import BlogCard from "./BlogCard";
import BlogCardFocus from "./BlogCardFocus";

export default function BlogSection() {
  // With an odd number of posts, the last one is alone on its row in the 2-column tablet layout
  const lastIsAlone = POSTS.length % 2 === 1;

  return (
    // less space above: the CTA panel already separates the two sections
    <section className="pt-8 pb-16 md:pt-16 md:pb-24" aria-labelledby="blog-title">
      <div className="wrap">
        {/* Phones: stacked. Tablet and up: a grid, with "View all posts" on the same row as the title */}
        <div data-reveal className="mb-10 flex flex-col items-start sm:grid sm:grid-cols-[1fr_auto] sm:gap-x-8">
          <Eyebrow className="sm:col-start-1 sm:row-start-1 sm:justify-self-start">Insights</Eyebrow>
          <h2 id="blog-title" className="mb-4 text-section sm:col-start-1 sm:row-start-2 sm:mb-0">Recent posts</h2>
          <p className="max-w-160 text-17 sm:col-start-1 sm:row-start-3 sm:mt-4">
            Practical guides for candidates and employers in the UK job market
          </p>
          <Button href={LINKS.blog} variant="secondary" arrow className="mt-5 sm:col-start-2 sm:row-start-2 sm:mt-0 sm:self-center">
            View all posts
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {POSTS.map((post, i) => (
            <BlogCard key={post.href} post={post} wide={lastIsAlone && i === POSTS.length - 1} />
          ))}
        </div>
        <BlogCardFocus />
      </div>
    </section>
  );
}
