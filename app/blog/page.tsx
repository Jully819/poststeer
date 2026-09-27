import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { blogPage } from "@/lib/content";
import { Placeholder } from "@/components/ui/placeholder";

export const metadata: Metadata = {
  title: blogPage.seoTitle,
  description: blogPage.seoDescription,
  alternates: { canonical: "/blog" },
  robots: { index: false, follow: false },
};

export default function BlogIndex() {
  return (
    <div className="container-x py-14">
      <header className="max-w-2xl">
        <p className="font-mono text-[0.72rem] tracking-[0.16em] text-muted uppercase">
          <span aria-hidden="true" className="text-hairline">
            //{" "}
          </span>
          Blog
        </p>
        <h1 className="mt-4 font-display text-[2.2rem] leading-tight font-bold tracking-tight text-ink">
          {blogPage.title}
        </h1>
        <p className="mt-4 text-[1rem] leading-relaxed text-body">{blogPage.intro}</p>
      </header>

      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPage.posts.map((post) => (
          <li key={post.slug} className="card overflow-hidden">
            <a href={`/blog/${post.slug}`} className="block">
              <Placeholder
                label="Post image"
                ratio="aspect-[16/10]"
                className="rounded-none border-0 border-b border-hairline"
              />
              <div className="p-5">
                <p className="font-mono text-[0.7rem] tracking-[0.12em] text-accent-ink uppercase">
                  {post.category}
                </p>
                <h2 className="mt-2 font-display text-[1.1rem] leading-snug font-bold text-ink">
                  {post.title}
                </h2>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-body">{post.excerpt}</p>
                <p className="mt-4 flex items-center gap-2 font-mono text-[0.72rem] text-muted">
                  {post.date}
                  <span aria-hidden="true">·</span>
                  {post.readTime}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <section className="card mt-14 flex flex-wrap items-center justify-between gap-4 rounded-2xl p-8">
        <div>
          <h2 className="font-display text-[1.15rem] font-bold text-ink">{blogPage.ctaTitle}</h2>
          <p className="mt-1 text-[0.9rem] text-body">{blogPage.ctaBody}</p>
        </div>
        <a href="/start" className="btn btn-accent min-h-[2.8rem] px-6 text-[0.92rem]">
          {blogPage.ctaButton}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </section>
    </div>
  );
}
