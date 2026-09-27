import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { blogPage } from "@/lib/content";
import { Placeholder } from "@/components/ui/placeholder";
import { withBase } from "@/lib/utils";

/** Static per post; an unknown slug 404s rather than rendering an empty shell. */
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPage.posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPage.posts.find((candidate) => candidate.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    robots: { index: false, follow: false },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPage.posts.find((candidate) => candidate.slug === slug);
  if (!post) notFound();

  const others = blogPage.posts.filter((candidate) => candidate.slug !== slug);

  return (
    <article className="container-x py-14">
      <a
        href={withBase("/blog")}
        className="inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-body transition-colors hover:text-ink"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        {blogPage.backLabel}
      </a>

      <header className="mt-6 max-w-[46rem]">
        <p className="font-mono text-[0.7rem] tracking-[0.12em] text-accent-ink uppercase">
          {post.category}
        </p>
        <h1 className="mt-3 font-display text-[2.1rem] leading-tight font-bold tracking-tight text-ink">
          {post.title}
        </h1>
        <p className="mt-3 flex items-center gap-2 font-mono text-[0.75rem] text-muted">
          {post.date}
          <span aria-hidden="true">·</span>
          {post.readTime}
        </p>
      </header>

      <Placeholder label="Post image" ratio="aspect-[21/9]" className="mt-8" />

      <div className="mt-8 max-w-[42rem]">
        <p className="text-[1.05rem] leading-relaxed font-medium text-ink">{post.excerpt}</p>
        {post.body.map((paragraph) => (
          <p key={paragraph} className="mt-5 text-[1rem] leading-relaxed text-body">
            {paragraph}
          </p>
        ))}
      </div>

      <section className="mt-14 border-t border-hairline pt-8">
        <h2 className="font-display text-[1.1rem] font-bold text-ink">More posts</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {others.map((other) => (
            <li key={other.slug}>
              <a
                href={withBase(`/blog/${other.slug}`)}
                className="flex items-center justify-between gap-4 rounded-xl border border-hairline bg-wash p-4 transition-colors hover:border-ink"
              >
                <span>
                  <span className="block font-display text-[0.95rem] font-semibold text-ink">
                    {other.title}
                  </span>
                  <span className="block font-mono text-[0.72rem] text-muted">{other.date}</span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
