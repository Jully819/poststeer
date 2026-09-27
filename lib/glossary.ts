/**
 * THE MARKETING GLOSSARY (/marketing-glossary).
 *
 * The page behind the footer's "Marketing Glossary" link. Unlike the rest of
 * this clone, THESE DEFINITIONS ARE REAL. A glossary of placeholder text is
 * not a glossary, and the terms below are general marketing vocabulary, not
 * anybody's copy — so they can stay as written when the site goes live.
 *
 * Each entry is a term, the area it belongs to, a plain definition, and one
 * line on why it matters. The definition is what the card shows; the detail
 * is behind the card's disclosure.
 *
 * ONE FLAT ARRAY, GROUPED AT RENDER TIME. The letter sections and the A–Z
 * index are both derived from this list in the component, so adding a term is
 * one entry here and nothing else — no section to create, no index to update,
 * and no way for the two to disagree.
 *
 * House style: start with what the thing IS, then what it is for. No
 * "simply", no "powerful", no sentence that could describe any term.
 */

export type GlossaryCategory =
  | "SEO"
  | "Paid ads"
  | "Social"
  | "Email"
  | "Analytics"
  | "Content"
  | "Strategy";

export interface GlossaryTerm {
  term: string;
  category: GlossaryCategory;
  /** Shown on the card. One or two sentences. */
  definition: string;
  /** Behind the disclosure. Why it matters, or how it goes wrong. */
  detail: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "A/B Testing",
    category: "Strategy",
    definition:
      "Running two versions of something — an email subject line, an ad, a landing page — against each other to see which performs better.",
    detail:
      "The test is only worth running if you change one thing at a time and wait for enough traffic to tell the difference from noise. Most small-business A/B tests are called far too early.",
  },
  {
    term: "Attribution",
    category: "Analytics",
    definition:
      "Deciding which marketing touchpoint gets credit for a sale. If someone sees a reel, searches your name a week later, then books, attribution is how you decide what earned the booking.",
    detail:
      "There is no correct answer, only models. Last-click attribution over-credits search, because search is usually the last step before someone who already decided takes action.",
  },
  {
    term: "Average Order Value",
    category: "Analytics",
    definition:
      "Total revenue divided by number of orders. It tells you what a typical customer spends in one transaction.",
    detail:
      "Raising it is often cheaper than finding more customers, because the person is already buying. Bundles and a sensible upsell move it more than a discount does.",
  },
  {
    term: "Awareness Stage",
    category: "Strategy",
    definition:
      "The point where someone knows they have a problem but does not yet know the solutions, let alone your name.",
    detail:
      "Content aimed here answers questions rather than selling. Pushing a booking link at someone in the awareness stage is the most common reason good content converts badly.",
  },
  {
    term: "Backlink",
    category: "SEO",
    definition:
      "A link from another website to yours. Search engines read them as votes, so links from trusted, relevant sites lift your rankings.",
    detail:
      "Relevance beats volume. One link from a respected site in your industry is worth more than fifty from directories nobody reads, and bought link packages tend to do damage.",
  },
  {
    term: "Bounce Rate",
    category: "Analytics",
    definition:
      "The share of visitors who land on a page and leave without doing anything else.",
    detail:
      "A high bounce rate is not automatically bad. On a page that answers one question — opening hours, a phone number — someone leaving satisfied looks identical to someone leaving annoyed.",
  },
  {
    term: "Brand Voice",
    category: "Content",
    definition:
      "The consistent personality your writing has across every channel: the vocabulary, the sentence length, the things you refuse to say.",
    detail:
      "It is defined more by exclusions than inclusions. Deciding you will never use exclamation marks or the word 'excited' does more for consistency than a page of adjectives.",
  },
  {
    term: "Buyer Persona",
    category: "Strategy",
    definition:
      "A short profile of one type of customer: what they want, what they worry about, and what would make them choose someone else.",
    detail:
      "Useful when built from real customer conversations, useless when invented in a meeting. If the persona has a stock photo and a name but no real quotes behind it, it will not change any decision.",
  },
  {
    term: "Call to Action",
    category: "Content",
    definition:
      "The specific thing you ask the reader to do next: book a call, get the guide, reply to this email.",
    detail:
      "One per page, stated plainly. 'Learn more' asks for nothing and gets it; 'See the pricing' tells someone exactly what happens when they click.",
  },
  {
    term: "Canonical URL",
    category: "SEO",
    definition:
      "A tag that tells search engines which version of a page is the original, when the same content sits at more than one address.",
    detail:
      "Matters most on e-commerce sites, where filters and sort orders generate dozens of URLs for one product. Without it, those versions compete with each other in search results.",
  },
  {
    term: "Churn Rate",
    category: "Analytics",
    definition:
      "The share of customers who cancel in a given period. For a subscription, it is the number that decides whether growth compounds or leaks.",
    detail:
      "At five per cent monthly churn, the average customer stays twenty months. At ten per cent, ten. Halving churn does more for revenue than doubling ad spend.",
  },
  {
    term: "Click-Through Rate",
    category: "Paid ads",
    definition:
      "Clicks divided by impressions, as a percentage. It measures how compelling something is to the people who saw it.",
    detail:
      "A high rate on the wrong audience costs money without producing customers. Read it next to conversion rate, never on its own.",
  },
  {
    term: "Content Calendar",
    category: "Content",
    definition:
      "A schedule of what gets published, where, and when — agreed in advance rather than decided the morning it goes out.",
    detail:
      "The value is less in the planning than in removing the daily decision. Businesses that stop posting almost never decide to stop; they just run out of days where somebody chose a topic.",
  },
  {
    term: "Conversion Rate",
    category: "Analytics",
    definition:
      "The share of visitors who do the thing you wanted — bought, booked, subscribed, filled in the form.",
    detail:
      "Always state what it converts from and to. A three per cent conversion rate means nothing until you know whether it is of all traffic, of ad clicks, or of people who reached the checkout.",
  },
  {
    term: "Cost Per Click",
    category: "Paid ads",
    definition:
      "What you pay each time somebody clicks an ad. Set by auction, so it moves with competition and with how relevant the platform thinks your ad is.",
    detail:
      "A cheap click is not a cheap customer. Legal and insurance keywords cost many times what most terms do precisely because the customers behind them are worth it.",
  },
  {
    term: "Customer Acquisition Cost",
    category: "Analytics",
    definition:
      "Everything you spent on marketing and sales in a period, divided by the customers it won.",
    detail:
      "It only means something beside lifetime value. Spending £300 to win a customer is reckless at a £200 lifetime value and a bargain at £3,000.",
  },
  {
    term: "Customer Lifetime Value",
    category: "Analytics",
    definition:
      "The total profit you expect from one customer across the whole relationship, not just their first purchase.",
    detail:
      "Knowing it sets your ceiling on acquisition spend. Most small businesses underestimate it because they count the first sale and ignore repeat business and referrals.",
  },
  {
    term: "Domain Authority",
    category: "SEO",
    definition:
      "A third-party score, usually out of 100, predicting how well a site is likely to rank based on its link profile.",
    detail:
      "Invented by SEO tools, not by Google, so treat it as a rough comparison between sites rather than a number to optimise. It is useful for judging whether a link is worth pursuing.",
  },
  {
    term: "Drip Campaign",
    category: "Email",
    definition:
      "A fixed sequence of emails sent on a schedule after someone joins a list — day one, day three, day seven — regardless of what else they do.",
    detail:
      "Simple to build and easy to leave running past its usefulness. Re-read a drip sequence once a year, because it will still be referring to last year's offer.",
  },
  {
    term: "Dwell Time",
    category: "SEO",
    definition:
      "How long someone stays on your page after clicking it in search results, before returning to the results.",
    detail:
      "An immediate return suggests the page did not answer the question. Whether search engines measure it directly is debated; writing pages that hold attention is a good idea regardless.",
  },
  {
    term: "Email Automation",
    category: "Email",
    definition:
      "Emails triggered by behaviour rather than sent by hand: a welcome after signup, a reminder after an abandoned cart, a check-in after ninety days of silence.",
    detail:
      "Usually the highest-return work in email, because the message arrives when the person is already thinking about you. A welcome sequence typically outperforms every newsletter you send.",
  },
  {
    term: "Engagement Rate",
    category: "Social",
    definition:
      "Interactions — likes, comments, shares, saves — as a share of the people who saw a post.",
    detail:
      "Saves and shares are the signals worth watching. A like costs nothing; a share means somebody put their own name behind your content.",
  },
  {
    term: "Evergreen Content",
    category: "Content",
    definition:
      "Content that stays accurate and useful long after it is published, as opposed to news, trends or seasonal posts.",
    detail:
      "It compounds. A guide that answers a question customers ask every week will still bring traffic in three years, while a post about a platform update is dead in a month.",
  },
  {
    term: "First-Party Data",
    category: "Analytics",
    definition:
      "Information you collected directly from your own customers — your email list, your purchase history, your site analytics.",
    detail:
      "It became the valuable kind as tracking restrictions tightened. Anything that depends on third-party cookies has been degrading for years; an email list has not.",
  },
  {
    term: "Funnel",
    category: "Strategy",
    definition:
      "The path from first hearing about you to buying, described in stages so you can see where people drop out.",
    detail:
      "The metaphor is tidier than reality — people loop, leave and come back — but it earns its place by forcing the question of which stage is actually losing you money.",
  },
  {
    term: "Geotargeting",
    category: "Paid ads",
    definition:
      "Restricting who sees an ad based on where they are, from a country down to a radius around an address.",
    detail:
      "For a business that serves one city, it is the single highest-return setting in the account. Check it monthly; platforms quietly widen targeting when a campaign struggles to spend.",
  },
  {
    term: "Google Business Profile",
    category: "SEO",
    definition:
      "The free listing that puts a business in Google Maps and in the local results box, with hours, photos, reviews and a phone number.",
    detail:
      "For any business with a location or a service area, this outperforms most of what people spend on SEO. Complete it fully, post to it, and answer every review.",
  },
  {
    term: "Hashtag",
    category: "Social",
    definition:
      "A keyword prefixed with # that groups a post with others on the same topic and makes it findable by that topic.",
    detail:
      "Their reach has fallen sharply as platforms moved to recommending content by interest instead. A handful of specific, relevant tags is now worth more than thirty broad ones.",
  },
  {
    term: "Header Tag",
    category: "SEO",
    definition:
      "The HTML headings that structure a page, from H1 down to H6. The H1 is the page's title; the rest break the content into sections.",
    detail:
      "One H1 per page, describing what the page is about. Headings are how both a screen reader and a search engine work out the shape of an article without reading every word.",
  },
  {
    term: "Impressions",
    category: "Analytics",
    definition:
      "The number of times something was displayed. Not the number of people who saw it, and not the number who noticed.",
    detail:
      "The most inflatable number in marketing. Ten thousand impressions across two hundred people is a different story from ten thousand across ten thousand, and the headline figure hides which.",
  },
  {
    term: "Inbound Marketing",
    category: "Strategy",
    definition:
      "Earning attention with content people choose to read, rather than buying it by interrupting them.",
    detail:
      "Slower to start and cheaper to sustain. The work compounds, which is why it suits businesses that can wait two quarters and badly suits those that need bookings this month.",
  },
  {
    term: "Influencer Marketing",
    category: "Social",
    definition:
      "Paying someone with an established audience to feature your product to that audience.",
    detail:
      "Audience fit beats audience size. A creator with 8,000 followers who all live in your city will usually outperform one with 400,000 scattered across the world.",
  },
  {
    term: "Journey Mapping",
    category: "Strategy",
    definition:
      "Writing down every step a customer takes with you, including the ones that are not marketing — the phone call, the wait, the invoice.",
    detail:
      "It tends to find the real problem. Plenty of businesses buy more traffic when what they have is a booking form that fails on mobile.",
  },
  {
    term: "Keyword Difficulty",
    category: "SEO",
    definition:
      "An estimate of how hard it would be to rank on the first page for a search term, based on who already ranks there.",
    detail:
      "New sites should ignore high-difficulty terms entirely for the first year. Specific, lower-volume phrases convert better anyway, because the person searching them knows what they want.",
  },
  {
    term: "Key Performance Indicator",
    category: "Analytics",
    definition:
      "The small number of measures you have agreed actually indicate whether the work is succeeding.",
    detail:
      "The discipline is in keeping the list short. A dashboard with thirty KPIs has none; nobody changes a decision because the twenty-second number moved.",
  },
  {
    term: "Landing Page",
    category: "Content",
    definition:
      "A page built for one campaign and one action, without the navigation and distractions of a normal site page.",
    detail:
      "Sending ad traffic to a homepage is the most expensive habit in small-business advertising. The homepage has to serve everyone, so it persuades nobody in particular.",
  },
  {
    term: "Lead Magnet",
    category: "Email",
    definition:
      "Something useful offered in exchange for an email address — a guide, a checklist, a template, a discount code.",
    detail:
      "It should solve a small, real problem in one sitting. A vague 'newsletter signup' converts a fraction as well as a specific thing someone can use today.",
  },
  {
    term: "Lookalike Audience",
    category: "Paid ads",
    definition:
      "An audience an ad platform builds by finding people who resemble a list you supplied, such as your existing customers.",
    detail:
      "Quality depends entirely on the source list. Feed it your best customers rather than everyone who ever bought, or you teach the platform to find more of your worst.",
  },
  {
    term: "Meta Description",
    category: "SEO",
    definition:
      "The short summary shown under a page's title in search results. It does not affect rankings; it affects whether anyone clicks.",
    detail:
      "Around 155 characters before it truncates. Write it as an advert for the page, not a summary of it, and include the phrase someone actually searched.",
  },
  {
    term: "Micro-Influencer",
    category: "Social",
    definition:
      "A creator with a small audience, typically between 1,000 and 50,000 followers, usually focused on one subject or place.",
    detail:
      "Engagement rates run higher than on large accounts and the cost is a fraction. For local businesses this is where influencer spend generally works.",
  },
  {
    term: "Monthly Recurring Revenue",
    category: "Analytics",
    definition:
      "Predictable subscription revenue in a month, excluding one-off charges.",
    detail:
      "Its usefulness is that it is boring. Stripping out one-off work shows whether the base of the business grew, which a headline revenue figure can easily hide.",
  },
  {
    term: "Native Advertising",
    category: "Paid ads",
    definition:
      "Paid content designed to match the form of the platform it appears on, so it reads like an article or a post rather than an advert.",
    detail:
      "Disclosure is a legal requirement in most markets, not a courtesy. Undisclosed native advertising is the fastest way to lose an audience you paid to reach.",
  },
  {
    term: "Negative Keyword",
    category: "Paid ads",
    definition:
      "A term you tell an ad platform to exclude, so your ad never shows for searches containing it.",
    detail:
      "Adding 'free', 'jobs', 'cheap' and 'DIY' cuts wasted spend in most new accounts. Review the search terms report monthly and keep adding.",
  },
  {
    term: "Net Promoter Score",
    category: "Analytics",
    definition:
      "A survey score from asking how likely someone is to recommend you, on a scale of nought to ten, then subtracting detractors from promoters.",
    detail:
      "The number is less useful than the comment box under it. The reasons people give for a six are the roadmap; the score itself is a summary.",
  },
  {
    term: "Nurture Sequence",
    category: "Email",
    definition:
      "A series of emails that keeps a lead who is not ready to buy in touch with you until they are.",
    detail:
      "Most leads do not say no, they say not now. A sequence that stays useful for six months costs almost nothing and catches people at the point the timing changes.",
  },
  {
    term: "Off-Page SEO",
    category: "SEO",
    definition:
      "Everything that affects your search rankings from outside your own site: links, mentions, reviews and citations.",
    detail:
      "Less controllable than on-page work and slower to move, which is why it is usually the part that has been neglected when rankings stall.",
  },
  {
    term: "On-Page SEO",
    category: "SEO",
    definition:
      "The parts of ranking you control on the page itself: titles, headings, content, internal links, image attributes and page speed.",
    detail:
      "Do this before chasing links. A site with thin content and duplicated titles will not rank however many links point at it.",
  },
  {
    term: "Open Rate",
    category: "Email",
    definition:
      "The share of delivered emails that were opened. Measured with a tracking pixel, which is why it has become unreliable.",
    detail:
      "Mail privacy features pre-open images automatically, inflating the figure. Click rate and replies now tell you far more about whether an email worked.",
  },
  {
    term: "Organic Reach",
    category: "Social",
    definition:
      "How many people saw your content without you paying to put it in front of them.",
    detail:
      "It has declined on every major platform for a decade. Planning a strategy that assumes a fixed share of your followers will see a post is planning for 2014.",
  },
  {
    term: "Pay-Per-Click",
    category: "Paid ads",
    definition:
      "Advertising where you are charged when someone clicks, rather than when the ad is shown.",
    detail:
      "Fast to turn on and fast to waste money with. Set conversion tracking before the first pound is spent, or you will be optimising for clicks you cannot value.",
  },
  {
    term: "Pixel",
    category: "Paid ads",
    definition:
      "A snippet of code on your site that reports visitor actions back to an ad platform, so it can measure conversions and build audiences.",
    detail:
      "Install it before you advertise, not when you start. It needs history to be useful, and an account with no conversion data optimises towards nothing.",
  },
  {
    term: "Programmatic Advertising",
    category: "Paid ads",
    definition:
      "Buying ad space automatically through real-time auctions, rather than negotiating placements with publishers.",
    detail:
      "Efficient at scale and opaque at small budgets. For most small businesses the fees and the lack of visibility outweigh the reach.",
  },
  {
    term: "Qualified Lead",
    category: "Strategy",
    definition:
      "A lead that matches who you actually sell to — right budget, right need, right authority to decide.",
    detail:
      "Agreeing the definition between marketing and sales settles most arguments about lead quality before they start, because both sides are finally counting the same thing.",
  },
  {
    term: "Quality Score",
    category: "Paid ads",
    definition:
      "Google Ads' rating of how relevant your keyword, ad and landing page are to each other, from one to ten.",
    detail:
      "It directly changes what you pay. A high score can cut click costs by half against a competitor bidding the same amount with a mismatched landing page.",
  },
  {
    term: "Reach",
    category: "Social",
    definition:
      "The number of distinct people who saw your content, as opposed to impressions, which counts every time it appeared.",
    detail:
      "Reach divided into impressions gives average frequency. When that climbs, you are showing the same thing to the same people rather than finding new ones.",
  },
  {
    term: "Retargeting",
    category: "Paid ads",
    definition:
      "Showing ads to people who already visited your site or engaged with your content.",
    detail:
      "Usually the best-performing campaign in an account, and the easiest to overdo. Cap frequency and exclude people who already bought.",
  },
  {
    term: "Return on Ad Spend",
    category: "Paid ads",
    definition:
      "Revenue generated by advertising divided by what the advertising cost. A ROAS of 4 means £4 back for every £1 in.",
    detail:
      "It is revenue, not profit. At a 25 per cent margin, a ROAS of 4 breaks even exactly, which is why a healthy-looking number can still be losing money.",
  },
  {
    term: "Rich Snippet",
    category: "SEO",
    definition:
      "A search result enhanced with extra detail — star ratings, prices, cooking times, FAQs — pulled from structured data on the page.",
    detail:
      "Earned by adding schema markup, not by asking. They take up more space in the results and reliably lift click-through, even at the same ranking position.",
  },
  {
    term: "Schema Markup",
    category: "SEO",
    definition:
      "Structured data added to a page's code that tells search engines exactly what things are: this is a price, this is a review, this is an opening time.",
    detail:
      "The prerequisite for rich results. It is invisible to visitors, which is why it is so often missing from otherwise well-built sites.",
  },
  {
    term: "Search Engine Results Page",
    category: "SEO",
    definition:
      "The page of results returned for a search, including ads, maps, featured snippets and the ordinary blue links.",
    detail:
      "Ranking first no longer means being at the top. On many searches the first organic result sits below ads, a map pack and an answer box.",
  },
  {
    term: "Share of Voice",
    category: "Strategy",
    definition:
      "Your share of the total market conversation or advertising in your category, against competitors.",
    detail:
      "Useful as a relative measure over time. Falling share of voice while your own numbers hold steady means competitors are spending more, and it usually shows up in results a quarter later.",
  },
  {
    term: "Social Proof",
    category: "Content",
    definition:
      "Evidence that other people already chose you: reviews, testimonials, case studies, client logos, visible follower counts.",
    detail:
      "Specific beats glowing. A review naming the problem and the result persuades far more than five stars and the word 'amazing'.",
  },
  {
    term: "Target Audience",
    category: "Strategy",
    definition:
      "The specific group your marketing is written for, defined tightly enough that you can say who it excludes.",
    detail:
      "If you cannot name someone it is not for, it is not a target audience. Copy written for everyone reads as written by a committee.",
  },
  {
    term: "Top of Funnel",
    category: "Strategy",
    definition:
      "Marketing aimed at people who do not yet know they need you, measured by reach and attention rather than sales.",
    detail:
      "Judging it by conversion rate kills it every time. It exists to fill the stages below, and its payoff shows up in searches for your name weeks later.",
  },
  {
    term: "User-Generated Content",
    category: "Social",
    definition:
      "Photos, videos and reviews made by customers rather than by you or your agency.",
    detail:
      "It outperforms polished production on most social platforms because it looks like the rest of the feed. Get written permission before reusing any of it in ads.",
  },
  {
    term: "UTM Parameter",
    category: "Analytics",
    definition:
      "Tags added to the end of a link that tell your analytics where a visitor came from — which campaign, which channel, which post.",
    detail:
      "Without them, traffic from your newsletter and your Instagram bio both land in the same undifferentiated bucket. Agree a naming convention once and stick to it.",
  },
  {
    term: "Vanity Metric",
    category: "Analytics",
    definition:
      "A number that looks impressive and changes no decision: follower counts, impressions, page views in isolation.",
    detail:
      "The test is whether a change in the number would make you do something differently. If not, it belongs in a footnote rather than a report.",
  },
  {
    term: "Video Completion Rate",
    category: "Social",
    definition:
      "The share of viewers who watched a video to the end.",
    detail:
      "On short-form platforms this is close to the whole algorithm. The first two seconds decide it, which is why the hook gets rewritten more often than the rest of the script.",
  },
  {
    term: "Webinar",
    category: "Content",
    definition:
      "A scheduled online presentation, usually teaching something, used to gather qualified leads and sell to them at the end.",
    detail:
      "Registrations are not attendance; expect between a third and half to show up live. The recording sent afterwards often produces more sales than the event.",
  },
  {
    term: "White Paper",
    category: "Content",
    definition:
      "A long, researched document making an argument, used mainly in business-to-business marketing as a lead magnet.",
    detail:
      "It has to be genuinely researched to work. A sales brochure in a serif font and a PDF wrapper is recognised instantly and costs you the email address anyway.",
  },
  {
    term: "Word of Mouth",
    category: "Strategy",
    definition:
      "Customers recommending you to other people, unprompted and unpaid.",
    detail:
      "Still the highest-converting channel there is, and the one least helped by marketing spend. It is built by the product and the service, then amplified by making referral easy.",
  },
  {
    term: "Zero-Click Search",
    category: "SEO",
    definition:
      "A search that ends without anyone clicking a result, because the answer appeared directly on the results page.",
    detail:
      "Now a majority of searches. It makes ranking for simple factual questions much less valuable and raises the value of queries where people need to compare, buy or book.",
  },
];

export const glossaryPage = {
  kicker: "Marketing · Glossary",
  titleLead: "Every marketing term,",
  titleAccent: "explained simply.",
  intro:
    "Plain-English definitions of the acronyms, metrics and jargon that get used around a small business without anyone stopping to explain them.",
  search: {
    label: "Search the glossary",
    placeholder: "Search terms…",
    clear: "Clear search",
  },
  /* Reads "72 terms", or "3 terms matching “rate”" once a query is typed. */
  count: { one: "term", many: "terms", filtered: "matching" },
  jumpLabel: "Jump to letter",
  empty: {
    title: "No term by that name yet.",
    body: "Ask us and we will add it. In the meantime, the team can explain anything on this list on a call.",
    cta: "Book a demo",
  },
  seoTitle: "Marketing Glossary | PostSteer",
  seoDescription:
    "Plain-English definitions of the marketing terms, metrics and acronyms that matter to a small business.",
};
