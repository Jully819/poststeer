import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { SITE_URL, blogPage, brand, type BlogPost, type PostImage } from "@/lib/content";
import { Placeholder } from "@/components/ui/placeholder";
import { withBase } from "@/lib/utils";

/**
 * /blog/[slug] — one article.
 *
 * WHAT THIS PAGE OWES A LONG-FORM POST, per the on-page rules in CLAUDE.md:
 * breadcrumbs with BreadcrumbList schema, an author byline with Person schema,
 * a contents list anchored to the headings, an FAQ with FAQPage schema, and
 * Open Graph plus Twitter card meta.
 *
 * ALL OF IT IS DRIVEN OFF THE POST DATA. A post carrying no `sections` or
 * `faqs` renders without those parts rather than emitting empty schema. An
 * FAQPage block with no questions in it is a structured-data error, not a
 * neutral omission. This is also why the three short notes still render: they
 * have `body` and nothing else, and every long-form branch below is guarded.
 *
 * DO NOT hand-build a post's markup in here. If a post needs something this
 * file cannot render, add it to the `BlogPost` type so every future post gets
 * it too.
 */

/** Static per post; an unknown slug 404s rather than rendering an empty shell. */
export const dynamicParams = false;

function getPost(slug: string): BlogPost | undefined {
  return blogPage.posts.find((candidate) => candidate.slug === slug);
}

export function generateStaticParams() {
  return blogPage.posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  /* Absolute, and the 1200x630 card rather than the article hero. Relative
     paths in og:image are ignored by most crawlers. */
  const card = post.socialImage ?? post.hero?.src;
  const images = card
    ? [{ url: `${SITE_URL}${card}`, width: 1200, height: 630, alt: post.title }]
    : undefined;

  return {
    title: post.metaTitle ? { absolute: post.metaTitle } : post.title,
    description: post.metaDescription ?? post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    /* Still closed to crawlers with the rest of the site. See app/sitemap.ts —
       this flips with everything else, not on its own. */
    robots: { index: false, follow: false },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      /* Deliberately the fuller excerpt rather than the trimmed meta
         description. A social card has room the SERP does not. */
      description: post.excerpt,
      publishedTime: post.published,
      modifiedTime: post.updated ?? post.published,
      ...(post.author ? { authors: [post.author] } : {}),
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images,
    },
  };
}

/**
 * Renders `[label](href)` and `**bold**` inside a paragraph, and leaves
 * everything else alone.
 *
 * Deliberately the smallest thing that works rather than a Markdown parser:
 * the only inline formatting these posts need is links and the occasional bold
 * sentence, and pulling in a parser to get them would also pull in its
 * escaping rules, its sanitising question and its bundle.
 */
function renderInline(text: string, keyPrefix: string) {
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  const out: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) out.push(text.slice(last, match.index));

    if (match[3]) {
      out.push(
        <strong key={`${keyPrefix}-b${i}`} className="font-semibold text-ink">
          {match[3]}
        </strong>,
      );
      last = match.index + match[0].length;
      i += 1;
      continue;
    }

    const [, label, href] = match;
    const className =
      "underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink";

    out.push(
      href.startsWith("/") ? (
        <a key={`${keyPrefix}-${i}`} href={withBase(href)} className={className}>
          {label}
        </a>
      ) : (
        <a
          key={`${keyPrefix}-${i}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {label}
        </a>
      ),
    );

    last = match.index + match[0].length;
    i += 1;
  }

  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Photograph plus the credit that has to travel with it. */
function Figure({
  image,
  className = "mt-8",
}: {
  image: PostImage;
  className?: string;
}) {
  return (
    <figure className={className}>
      {/* Raw <img> rather than next/image: `output: "export"` ships no
          optimiser, and these files are already resized and encoded to WebP at
          build time. width and height are the intrinsic size, so the box is
          reserved before the file lands and the text below does not jump. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={withBase(image.src)}
        srcSet={image.srcSet}
        sizes={image.sizes}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={image.priority ? "eager" : "lazy"}
        fetchPriority={image.priority ? "high" : undefined}
        decoding={image.priority ? undefined : "async"}
        className="w-full rounded-xl"
      />
      <figcaption className="mt-2 font-mono text-[0.72rem] text-muted">
        Photo by{" "}
        <a
          href={image.creditUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-ink"
        >
          {image.credit}
        </a>{" "}
        on{" "}
        <a
          href={image.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-ink"
        >
          Pexels
        </a>
      </figcaption>
    </figure>
  );
}

/**
 * BlogPosting + Person, BreadcrumbList, and FAQPage when there are questions.
 *
 * One <script> holding an array rather than three separate tags: it is the
 * same thing to a parser and one less place for a stray block to survive after
 * the data behind it is gone.
 */
function PostSchema({ post }: { post: BlogPost }) {
  const url = `${SITE_URL}/blog/${post.slug}`;

  const graph: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      ...(post.published ? { datePublished: post.published } : {}),
      ...(post.published
        ? { dateModified: post.updated ?? post.published }
        : {}),
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      ...(post.author
        ? {
            author: {
              /* Organization when the post carries a house byline. A Person
                 node wrapped around a company name is a claim that somebody
                 wrote it, and nobody did. See the note on `authorType`. */
              "@type": post.authorType ?? "Person",
              name: post.author,
              /* No url. There is no /about page on this site yet, and an
                 author pointing at a 404 is worse than one without a link.
                 Add it the day that page exists. */
              ...(post.authorBio ? { description: post.authorBio } : {}),
            },
          }
        : {}),
      publisher: { "@type": "Organization", name: brand.name, url: SITE_URL },
      ...(post.socialImage
        ? { image: `${SITE_URL}${post.socialImage}` }
        : post.hero
          ? { image: `${SITE_URL}${post.hero.src}` }
          : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${SITE_URL}/blog`,
        },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  if (post.faqs?.length) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = blogPage.posts.filter((candidate) => candidate.slug !== slug);

  return (
    <article id="top" className="container-x py-14">
      <PostSchema post={post} />

      {/* Breadcrumbs. The visible trail and the BreadcrumbList above say the
          same thing, so a crawler that trusts one and not the other still gets
          a consistent answer. */}
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-[0.78rem] text-muted">
          <li>
            <a href={withBase("/")} className="transition-colors hover:text-ink">
              Home
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <a href={withBase("/blog")} className="transition-colors hover:text-ink">
              Blog
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-body">
            {post.title}
          </li>
        </ol>
      </nav>

      <header className="mt-6 max-w-[46rem]">
        <p className="font-mono text-[0.7rem] tracking-[0.12em] text-accent-ink uppercase">
          {post.category}
        </p>
        <h1 className="mt-3 font-display text-[2.1rem] leading-tight font-bold tracking-tight text-balance text-ink">
          {post.title}
        </h1>

        {/* Byline. The author is plain text, not a link, for the same reason
            the Person schema carries no url. "Updated" only appears when the
            post has actually been revised: a refresh date on unchanged content
            is a claim about work nobody did. */}
        <p className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[0.75rem] text-muted">
          {post.author && (
            <>
              <span>By {post.author}</span>
              <span aria-hidden="true">·</span>
            </>
          )}
          {post.published ? (
            <time dateTime={post.published}>{post.date}</time>
          ) : (
            <span>{post.date}</span>
          )}
          {post.updated && post.updated !== post.published && (
            <>
              <span aria-hidden="true">·</span>
              <time dateTime={post.updated}>Updated {post.updated}</time>
            </>
          )}
          <span aria-hidden="true">·</span>
          {post.readTime}
        </p>
      </header>

      {post.hero ? (
        <Figure image={post.hero} className="mt-8" />
      ) : (
        <Placeholder label="Post image" ratio="aspect-[21/9]" className="mt-8" />
      )}

      <div className="mt-8 max-w-[42rem]">
        <p className="text-[1.05rem] leading-relaxed font-medium text-ink">{post.excerpt}</p>

        {post.intro && (
          <div className="mt-5 space-y-5 text-[1rem] leading-relaxed text-body">
            {post.intro.map((paragraph, i) => (
              <p key={i}>{renderInline(paragraph, `intro-${i}`)}</p>
            ))}
          </div>
        )}

        {/* Contents. Generated from the sections, so it cannot list a heading
            that is not there or miss one that is. */}
        {post.sections && post.sections.length > 1 && (
          <aside
            aria-label="On this page"
            className="mt-10 rounded-xl border border-hairline bg-wash px-5 py-4"
          >
            <p className="font-mono text-[0.7rem] tracking-[0.12em] text-muted uppercase">
              On this page
            </p>
            <nav aria-label="Table of contents">
              <ol className="mt-3 space-y-1.5">
                {post.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-[0.88rem] text-body underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        )}

        {post.sections?.map((section) => (
          <section key={section.id} id={section.id} className="mt-12 scroll-mt-24">
            {/* Image ABOVE the heading. It works as the divider between one
                item and the next, which is what a long post needs more than an
                illustration halfway down a paragraph. */}
            {section.image && <Figure image={section.image} className="mb-6 mt-0" />}

            <h2 className="font-display text-[1.45rem] leading-tight font-bold tracking-tight text-balance text-ink">
              {section.heading}
            </h2>

            <div className="mt-4 space-y-5 text-[1rem] leading-relaxed text-body">
              {section.paragraphs.map((paragraph, i) => (
                <p key={i}>{renderInline(paragraph, `${section.id}-${i}`)}</p>
              ))}
            </div>

            {section.list && (
              <div className="mt-5">
                {section.list.intro && (
                  <p className="text-[1rem] leading-relaxed text-body">
                    {renderInline(section.list.intro, `${section.id}-li`)}
                  </p>
                )}
                {section.list.ordered ? (
                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-[0.95rem] leading-relaxed text-body marker:text-muted">
                    {section.list.items.map((item, i) => (
                      <li key={i}>{renderInline(item, `${section.id}-o${i}`)}</li>
                    ))}
                  </ol>
                ) : (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-[0.95rem] leading-relaxed text-body marker:text-muted">
                    {section.list.items.map((item, i) => (
                      <li key={i}>{renderInline(item, `${section.id}-u${i}`)}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {section.facts && (
              /* dl rather than a table: these are label-and-value pairs, not
                 rows that relate to each other across columns. */
              <dl className="mt-6 rounded-xl border border-hairline bg-wash px-5 py-4 text-[0.88rem]">
                {section.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex flex-col gap-0.5 py-1.5 sm:flex-row sm:gap-4"
                  >
                    <dt className="shrink-0 font-mono text-[0.7rem] tracking-[0.1em] text-muted uppercase sm:w-[9rem] sm:pt-0.5">
                      {fact.label}
                    </dt>
                    <dd className="leading-relaxed text-body">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {/* Back to top, per section. An anchor rather than a floating
                button that follows the reader down: no client JavaScript, it
                works with a keyboard, and it cannot end up sitting on top of
                the text on a small screen. */}
            <p className="mt-6 text-right">
              <a
                href="#top"
                className="font-mono text-[0.72rem] text-muted underline underline-offset-4 transition-colors hover:text-ink"
              >
                Back to top
              </a>
            </p>
          </section>
        ))}

        {/* Posts with no section structure — the short notes — render flat. */}
        {post.body && (
          <div className="mt-5 space-y-5 text-[1rem] leading-relaxed text-body">
            {post.body.map((paragraph, i) => (
              <p key={i}>{renderInline(paragraph, `body-${i}`)}</p>
            ))}
          </div>
        )}

        {post.faqs && post.faqs.length > 0 && (
          <section id="faq" className="mt-16 scroll-mt-24 border-t border-hairline pt-10">
            <h2 className="font-display text-[1.45rem] leading-tight font-bold tracking-tight text-ink">
              Questions people ask
            </h2>

            <dl className="mt-8 space-y-7">
              {post.faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-display text-[1.02rem] leading-tight font-semibold text-ink">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-[0.95rem] leading-relaxed text-body">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* Author bio. E-E-A-T wants credentials attached to the byline, and
            the honest version here is what the work actually involves rather
            than a qualification nobody holds. */}
        {post.authorBio && (
          <aside className="mt-16 border-t border-hairline pt-8">
            <p className="font-mono text-[0.7rem] tracking-[0.12em] text-muted uppercase">
              About the author
            </p>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-body">{post.authorBio}</p>
          </aside>
        )}
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

      <a
        href={withBase("/blog")}
        className="mt-12 inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-body transition-colors hover:text-ink"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        {blogPage.backLabel}
      </a>
    </article>
  );
}
