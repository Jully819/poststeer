/**
 * The long-form block at the foot of a city page: four headings, four
 * paragraphs, no cards.
 *
 * IT IS SET AS AN ARTICLE, NOT A FEATURE SECTION. This exists to answer the
 * four different searches that land on a city page, and it should read as
 * prose someone can actually finish. Breaking it into tiles would make it
 * look like more marketing and be read like less.
 */
export function LandingProse({ blocks }: { blocks: { heading: string; body: string }[] }) {
  return (
    <section className="section-pad bg-sage">
      <article className="container-x mx-auto max-w-3xl">
        {blocks.map((block, i) => (
          <div key={block.heading} className={i > 0 ? "mt-10" : undefined}>
            <h2 className="font-display text-[1.35rem] font-bold tracking-tight text-ink">
              {block.heading}
            </h2>
            <p className="body-text mt-3">{block.body}</p>
          </div>
        ))}
      </article>
    </section>
  );
}
