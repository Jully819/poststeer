/**
 * Placeholder copy for the layout clone.
 *
 * THE STRUCTURE MIRRORS THE REFERENCE; THE WORDS DO NOT. Every string here is
 * written for this file rather than lifted from the site being cloned, so the
 * page can be adjusted section by section without carrying someone else's
 * marketing copy (or their legal exposure) around.
 *
 * Values in [brackets] are placeholders that render as written.
 */

/* The long-form posts live in their own files. A 250-line post object inline
   in `blogPage` buries the short notes underneath it. The import is safe in
   both directions because each post file imports only the `BlogPost` TYPE back
   from here, and a type import is erased before anything runs. */
import { crossPostingVsNativePosting } from "@/lib/posts/cross-posting-vs-native-posting";
import { socialMediaMarketingForRestaurants } from "@/lib/posts/social-media-marketing-for-restaurants";
import { doINeedAWebsiteIfIHaveSocialMedia } from "@/lib/posts/do-i-need-a-website-if-i-have-social-media";
import { contentCalendarForSocialMedia } from "@/lib/posts/content-calendar-for-social-media";
import { youtubeShorts0ViewsProblem } from "@/lib/posts/youtube-shorts-0-views-problem";

/**
 * Canonical origin. Override with NEXT_PUBLIC_SITE_URL at build time.
 *
 * ⚠️ THIS HAS TO BE THE HOST THAT ACTUALLY SERVES THE SITE, and it is one
 * decision shared with the Vercel domain settings rather than two.
 *
 * poststeer.com is the production host. www.poststeer.com and
 * poststeer.vercel.app both answer with a single 308 into it. So the bare
 * domain is the address, and every canonical, sitemap entry, robots.txt
 * pointer, Open Graph url and JSON-LD id below names it.
 *
 * WHY IT MATTERS. Naming a host that redirects spends a redirect on every
 * crawl and splits the signals across two hostnames. In Search Console the
 * two are separate properties, so a sitemap of one host's urls submitted
 * under the other reads as zero coverage and looks like a broken site.
 *
 * If the production host is ever moved in Vercel, move this with it.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://poststeer.com"
).replace(/\/$/, "");

export const brand = {
  name: "PostSteer",
  priceFrom: "$69",
};

/* `dropdown` marks the items that open a panel; the rest are plain links, so
   only the ones that actually have a menu carry a chevron. */
export const nav = [
  { label: "Company", href: "#company", dropdown: true },
  { label: "Services", href: "#services", dropdown: true },
  { label: "Pricing", href: "/pricing", dropdown: false },
  { label: "Blog", href: "/blog", dropdown: false },
];

/**
 * THE SERVICES MEGA-MENU, and the pages behind it.
 *
 * Every item links to a real page — a menu entry that scrolls to a section,
 * or worse to "#", is the thing that makes a nav look finished while the site
 * behind it is not. `planId` ties each page back to a service in the /pricing
 * catalogue, so "Add to plan" arrives with that service already selected.
 *
 * Ads & Creative is deliberately absent, and SEO carries one item.
 */
export interface MenuItem {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  /** "/mo" or "once" — one-time work is never shown as monthly. */
  unit: string;
  icon: ServiceIcon;
  /** Matching service id in the /pricing catalogue. */
  planId: string;
}

export const servicesMenu = {
  stats: ["Since 2018", "14-day guarantee"],
  groups: [
    {
      title: "Social Media",
      viewAll: "View all",
      items: [
        {
          slug: "social-media-posts",
          name: "Social Media Posts",
          tagline: "Posts, carousels & stories",
          price: "$69",
          unit: "/mo",
          icon: "posts",
          planId: "posts",
        },
        {
          slug: "short-form-videos",
          name: "Short-Form Videos",
          tagline: "Reels, TikToks & Shorts",
          price: "$129",
          unit: "/mo",
          icon: "video",
          planId: "video",
        },
      ],
    },
    {
      title: "SEO",
      viewAll: "View all",
      items: [
        {
          slug: "seo-blog-posts",
          name: "SEO Blog Posts",
          tagline: "Long-form, ranking content",
          price: "$189",
          unit: "/mo",
          icon: "blog",
          planId: "blog",
        },
      ],
    },
    {
      title: "Web & Email",
      viewAll: "View all",
      items: [
        {
          slug: "email-marketing",
          name: "Email Marketing",
          tagline: "Campaigns & automated flows",
          price: "$289",
          unit: "/mo",
          icon: "email",
          planId: "email",
        },
        {
          slug: "business-website",
          name: "Business Website",
          tagline: "Up to five pages, on your domain",
          price: "$2,500",
          unit: "once",
          icon: "website",
          planId: "website",
        },
        {
          slug: "landing-pages",
          name: "Landing Pages",
          tagline: "Designed & developed to convert",
          price: "$399",
          unit: "once",
          icon: "landing",
          planId: "landing",
        },
      ],
    },
  ] as { title: string; viewAll: string; items: MenuItem[] }[],
  footerLeft: "View all services & pricing",
  footerRight: "From $69/mo",
};

/**
 * ONE PAGE PER MENU ITEM, and everything on the page is in here.
 *
 * The thin version of this — an intro, two short lists and a link back to
 * pricing — was a dead end. Someone arriving from a search for "short form
 * video agency" landed on four sentences and left. So each service now
 * carries a full page's worth of copy and app/services/[slug] renders the
 * same shell around all six.
 *
 * WHAT IS DELIBERATELY ABSENT. No client counts, no review scores, no case
 * study figures, no "trusted by 20,000 businesses". references/stats.md has
 * none of those confirmed, and a number nobody can defend is worse than a
 * page with no number on it. The only figures on these pages are prices, and
 * those are what Stripe actually charges.
 *
 * `sections` is what stops six pages reading as one page with find-and-
 * replace run over it: the five formats a short video can take, the four
 * flows that earn an email list its keep, the kinds of landing page. `tools`
 * names software we work inside, for the one service where the buyer already
 * owns the account.
 */

/** Keys into `featureIcons` in components/ui/feature-icons.tsx. */
export type FeatureIcon =
  | "design"
  | "pencil"
  | "calendar"
  | "send"
  | "team"
  | "channels"
  | "scissors"
  | "captions"
  | "hook"
  | "motion"
  | "export"
  | "revisions"
  | "search"
  | "doc"
  | "link"
  | "chart"
  | "mail"
  | "flow"
  | "globe"
  | "form"
  | "gauge"
  | "layout"
  | "phone"
  | "target";

export interface ServicePage {
  /** Kicker over the h1. */
  kicker: string;
  /** The h1, split so the second half takes the accent colour. */
  titleLead: string;
  titleAccent: string;
  intro: string;
  /** Four short lines, each on a tick, beside the hero. */
  highlights: string[];
  /** Six cards: what the buyer actually receives. */
  includes: { icon: FeatureIcon; title: string; body: string }[];
  /** How the work runs, in three beats. */
  steps: { title: string; body: string }[];
  /** Service-specific bands between the portfolio and the plan builder. */
  sections?: { title: string; intro?: string; items: { title: string; body: string }[] }[];
  /** Named software, where the buyer already has an account we work inside. */
  tools?: { title: string; intro: string; names: string[] };
  /**
   * Which portfolio tab the grid opens on. ABSENT MEANS NO PORTFOLIO BAND —
   * a wall of Instagram posts under a heading on the Business Website page
   * is worse than no examples at all.
   */
  workType?: "posts" | "stories" | "shortform" | "ads" | "email";
  galleryTitle?: string;
  /** The social channel strip. Only on the services that publish to them. */
  channels?: boolean;
}

export const servicePages: Record<string, ServicePage> = {
  "social-media-posts": {
    kicker: "Social media posts",
    titleLead: "Posts, captions and a calendar",
    titleAccent: "you approve once a month.",
    intro:
      "Custom-branded posts, captions and a monthly calendar you approve. We design, write, schedule and publish them to your channels, so the feed keeps moving without you touching it.",
    highlights: [
      "Custom-designed posts, carousels and stories",
      "Captions written from your own words, not filler",
      "A calendar you approve before anything is published",
      "Every channel included, with no per-channel fee",
    ],
    includes: [
      {
        icon: "design",
        title: "Designed for your brand",
        body: "Every post is drawn for you. Not a stock template with your logo dropped in the corner and the same layout sold to four other businesses.",
      },
      {
        icon: "pencil",
        title: "Captions and hashtags",
        body: "Written in your voice, from what you told us in the brief. Tags are researched against your niche rather than guessed.",
      },
      {
        icon: "calendar",
        title: "A calendar you approve",
        body: "The whole month, laid out in one view. Leave a note on anything, or approve the lot in a single pass.",
      },
      {
        icon: "send",
        title: "Scheduled and published",
        body: "Connect once through the official API. After that we post to every channel for you, on the day and at the time agreed.",
      },
      {
        icon: "team",
        title: "The same people each month",
        body: "A designer and a writer who learn how your business talks, instead of a new freelancer starting from nothing every January.",
      },
      {
        icon: "channels",
        title: "Every channel in the price",
        body: "Instagram, TikTok, Facebook, LinkedIn, YouTube and Pinterest. Adding a channel does not add to the bill.",
      },
    ],
    steps: [
      { title: "Brief", body: "Ten minutes on the business, the audience and the tone." },
      { title: "Calendar", body: "You approve the month's topics before anything is made." },
      { title: "Publish", body: "Approved posts go out on schedule, with a monthly report." },
    ],
    workType: "posts",
    galleryTitle: "Posts we have made for other brands.",
    channels: true,
  },

  "short-form-videos": {
    kicker: "Short-form videos",
    titleLead: "Short-form video,",
    titleAccent: "fully managed.",
    intro:
      "Vertical video cut from your own footage. The hook lands in the first two seconds, the captions survive the mute button, and every file comes sized for the feed it is going to.",
    highlights: [
      "20 to 60 second edits from your own footage",
      "Hook, captions, b-roll and simple motion graphics",
      "One file per platform, sized and titled correctly",
      "Two rounds of changes on every batch",
    ],
    includes: [
      {
        icon: "scissors",
        title: "Cut from your footage",
        body: "A phone recording is enough. We pace it, grade it and throw away the four minutes nobody was going to watch.",
      },
      {
        icon: "hook",
        title: "A hook in the first two seconds",
        body: "Written before the edit starts. Nothing after it matters if the first two seconds do not hold.",
      },
      {
        icon: "captions",
        title: "Captions that survive mute",
        body: "Burned in and timed by hand, not dropped in by a transcription tool and left wrong on every proper noun.",
      },
      {
        icon: "motion",
        title: "B-roll and motion graphics",
        body: "Simple, not showy. Enough to carry a cut from one idea to the next without turning it into a title sequence.",
      },
      {
        icon: "export",
        title: "Sized per platform",
        body: "One export each for Reels, TikTok and Shorts, with the safe zones respected so no caption sits under a button.",
      },
      {
        icon: "revisions",
        title: "Two rounds of changes",
        body: "Per batch, not per clip. Send the notes together and we work through them in one pass.",
      },
    ],
    steps: [
      { title: "Send footage", body: "A phone recording or a call recording is enough." },
      { title: "We edit", body: "Cut, captioned and graded, delivered as one batch." },
      { title: "Publish", body: "Scheduled natively, or handed back as files if you prefer." },
    ],
    sections: [
      {
        title: "Every video is built in one of five formats.",
        intro:
          "The format is picked before anyone opens an edit, from what the video has to do. Nothing here is improvised on the timeline.",
        items: [
          {
            title: "Talking head",
            body: "You on camera, answering one question. The cheapest format to shoot and the hardest to fake, which is why it works.",
          },
          {
            title: "List or tips",
            body: "Three to five points, one beat each. Built for saves and shares rather than for watch time.",
          },
          {
            title: "B-roll and voiceover",
            body: "No camera needed. Footage of the work, a script read over it, captions carrying the rest.",
          },
          {
            title: "Story or POV",
            body: "One situation, told from the customer's side. The format that makes a service business feel like a person.",
          },
          {
            title: "Trend or remix",
            body: "An existing audio or structure, used properly. Dated by design, so it goes out while it still means something.",
          },
        ],
      },
      {
        title: "One production. Three platforms. Each one done properly.",
        items: [
          {
            title: "Instagram Reels",
            body: "Cut to the ratio Reels actually serves, with the caption clear of the overlay and the cover frame chosen rather than taken.",
          },
          {
            title: "TikTok",
            body: "Native text, native pacing, and a hook that reads before the sound has loaded.",
          },
          {
            title: "YouTube Shorts",
            body: "Titled for search, because Shorts is the one feed where people type what they want.",
          },
        ],
      },
    ],
    workType: "shortform",
    galleryTitle: "Short-form video we have cut.",
    channels: true,
  },

  "seo-blog-posts": {
    kicker: "SEO blog posts",
    titleLead: "Articles written to rank,",
    titleAccent: "published with the links in place.",
    intro:
      "Long-form articles researched against what people actually search for, written by a person, and published to your CMS with the titles, metadata and internal links already done.",
    highlights: [
      "1,000-word articles on keywords chosen with you",
      "Researched against the pages ranking today",
      "Titles, meta descriptions and internal links",
      "Published to your CMS, not emailed as a document",
    ],
    includes: [
      {
        icon: "search",
        title: "Keywords chosen with you",
        body: "We bring the list and show the working. You say which of them your business can honestly answer better than the pages already there.",
      },
      {
        icon: "chart",
        title: "Researched against what ranks",
        body: "We read the pages holding the top of the results first, so the brief starts from what the search engine is already rewarding.",
      },
      {
        icon: "pencil",
        title: "Written by a person",
        body: "Drafted, edited and checked before you see it. We use AI where it genuinely saves time and nowhere near the sentences.",
      },
      {
        icon: "doc",
        title: "Titles and meta descriptions",
        body: "Written for the result page, not generated from the first line of the article and left at 180 characters.",
      },
      {
        icon: "link",
        title: "Internal links, both directions",
        body: "New posts link to the pages that sell, and the older posts get updated to link to the new one. That second half is the part everyone skips.",
      },
      {
        icon: "send",
        title: "Published, not handed over",
        body: "Posted in your CMS, formatted, with the images in place. Not a document in your inbox waiting for someone to find an hour.",
      },
    ],
    steps: [
      { title: "Keywords", body: "We pick targets worth the effort and show the working." },
      { title: "Write", body: "Drafted, edited and checked by a person before you see it." },
      { title: "Publish", body: "Posted and linked, with rankings tracked monthly." },
    ],
    sections: [
      {
        title: "Why most business blogs never rank.",
        items: [
          {
            title: "Written for nobody in particular",
            body: "A post about an industry, aimed at everyone in it. Nobody searches for that, so nobody finds it.",
          },
          {
            title: "Published and abandoned",
            body: "Four posts in one month, then nothing for a year. Search rewards the habit, not the burst.",
          },
          {
            title: "Nothing links to them",
            body: "An article with no link pointing at it from your own site is a page you have told the crawler not to care about.",
          },
        ],
      },
    ],
  },

  "email-marketing": {
    kicker: "Email marketing",
    titleLead: "Campaigns and flows,",
    titleAccent: "built in your own account.",
    intro:
      "Designed and written emails for your campaigns and your automations, built inside the platform you already pay for. The list you have now is doing less than it could.",
    highlights: [
      "Campaign emails designed, written and scheduled",
      "Automated flows that keep running without you",
      "Built in your account, not held hostage in ours",
      "Opens, clicks and revenue reported every month",
    ],
    includes: [
      {
        icon: "mail",
        title: "Campaigns, start to send",
        body: "Designed, written, built and scheduled. You approve the proof, we press send.",
      },
      {
        icon: "flow",
        title: "Automated flows",
        body: "Welcome, abandoned cart, post-purchase and win-back. Built once, earning while nobody is looking at them.",
      },
      {
        icon: "design",
        title: "Designed, not templated",
        body: "Laid out for your brand and tested in the clients people actually read mail in, including the one that still ignores half of CSS.",
      },
      {
        icon: "target",
        title: "Segments that mean something",
        body: "Buyers, browsers and the people who have gone quiet, each getting a different email rather than the same one three times.",
      },
      {
        icon: "globe",
        title: "Your account, your list",
        body: "Everything is built where your data already lives. Cancel and the flows keep running, because they were never ours to take away.",
      },
      {
        icon: "chart",
        title: "Reported monthly",
        body: "Opens, clicks and revenue per flow, with what to change next. Not a dashboard link and good luck.",
      },
    ],
    steps: [
      { title: "Audit", body: "What the list is doing now, and what it should be." },
      { title: "Build", body: "Emails and flows built in your account, not ours." },
      { title: "Send", body: "Scheduled, monitored and reported monthly." },
    ],
    sections: [
      {
        title: "The money is in the flows, not the campaigns.",
        intro:
          "A campaign earns once. An automation earns every time somebody triggers it, at three in the morning, for as long as it is switched on.",
        items: [
          {
            title: "Welcome series",
            body: "The one email everybody opens, turned into three. Sent while they still remember signing up.",
          },
          {
            title: "Abandoned cart",
            body: "A reminder, then a reason, then a last call. The highest-earning email most shops never build.",
          },
          {
            title: "Post-purchase",
            body: "What to do with the thing they just bought, and what to buy next. It is also where reviews come from.",
          },
          {
            title: "Win-back",
            body: "For the people who have stopped opening. Cheaper than finding somebody new, and it cleans the list either way.",
          },
        ],
      },
    ],
    tools: {
      title: "Built in the platform you already use.",
      intro:
        "We work inside your account rather than moving you. If yours is not listed, ask before you assume it is a problem.",
      names: [
        "Klaviyo",
        "Mailchimp",
        "HubSpot",
        "Brevo",
        "ActiveCampaign",
        "Constant Contact",
        "Omnisend",
        "Campaign Monitor",
        "MailerLite",
        "Shopify Email",
        "Drip",
        "Salesforce",
      ],
    },
    workType: "email",
    galleryTitle: "Email we have designed.",
  },

  "business-website": {
    kicker: "Business website",
    titleLead: "Up to five pages,",
    titleAccent: "live on your own domain.",
    intro:
      "Written, designed and built on a domain you own. The site your posts and your ads send people to, for the times when one page is not enough.",
    highlights: [
      "Up to five pages, copy and custom design",
      "Built on your own domain, not rented from us",
      "Forms or booking wired up and tested",
      "Fast on a phone, where most of the traffic lands",
    ],
    includes: [
      {
        icon: "layout",
        title: "Five pages, designed",
        body: "Home, services, about, contact and whichever fifth page your business actually needs. Drawn for you, not picked from a gallery.",
      },
      {
        icon: "pencil",
        title: "Copy written, not borrowed",
        body: "Every page written from a conversation with you. Nothing lifted from a competitor and reworded until it is legal.",
      },
      {
        icon: "form",
        title: "Forms that arrive",
        body: "Contact or booking wired up and tested end to end, including the part where the email lands somewhere a person reads.",
      },
      {
        icon: "phone",
        title: "Built for a phone first",
        body: "Laid out at phone width before anything else, because that is where most of your visitors will see it.",
      },
      {
        icon: "globe",
        title: "Your domain, your hosting",
        body: "Everything is handed over on your own accounts. Leaving us does not mean leaving the site behind.",
      },
      {
        icon: "gauge",
        title: "Fast, and findable",
        body: "Titles, descriptions and a sitemap in place at launch, with the pages loading quickly enough that nobody leaves first.",
      },
    ],
    steps: [
      { title: "Scope", body: "Which pages you need, and what each one is for." },
      { title: "Build", body: "Written, designed and built, with one round of changes." },
      { title: "Launch", body: "Live on your domain, forms tested before handover." },
    ],
    sections: [
      {
        title: "What the five pages usually turn out to be.",
        items: [
          {
            title: "Home",
            body: "What you do, who for, and what to press. Most of the traffic sees only this one.",
          },
          {
            title: "Services",
            body: "One section per thing you sell, written so a reader can tell whether it is the thing they want.",
          },
          {
            title: "About",
            body: "The second most read page on nearly every small business site, and the one most of them leave as a paragraph.",
          },
          {
            title: "Contact",
            body: "A form that works, an address, and the hours. Nothing clever.",
          },
          {
            title: "The fifth one",
            body: "Pricing, a case study, a menu, a booking page. It depends on the business, which is why it is not decided here.",
          },
        ],
      },
    ],
  },

  "landing-pages": {
    kicker: "Landing pages",
    titleLead: "A landing page built to convert,",
    titleAccent: "copy included.",
    intro:
      "One page with one job. We handle the strategy, the writing, the design and the build, and hand it over live on your domain with the tracking already connected.",
    highlights: [
      "Copywriting, design and build on your domain",
      "Form or booking widget wired up and tested",
      "Conversion tracking connected from day one",
      "Fast on mobile, where the traffic arrives",
    ],
    includes: [
      {
        icon: "target",
        title: "One offer, one action",
        body: "The page sells one thing and asks for one thing. Every extra option on a landing page is a reason to leave it.",
      },
      {
        icon: "pencil",
        title: "Copy first, design after",
        body: "The words are written and agreed before anyone opens a design file. A pretty page around weak copy is an expensive way to be ignored.",
      },
      {
        icon: "form",
        title: "The form actually works",
        body: "Wired up, submitted, and the test entry chased all the way to the inbox it is meant to reach.",
      },
      {
        icon: "gauge",
        title: "Tracking from day one",
        body: "Conversions firing before the first visitor, so the page can be judged on numbers instead of on how it feels.",
      },
      {
        icon: "phone",
        title: "Fast on mobile",
        body: "Built at phone width first. Paid traffic arrives on a phone, usually on a connection nobody tested on.",
      },
      {
        icon: "globe",
        title: "Live on your domain",
        body: "Not a subdomain of ours. The page, the analytics and the leads stay with you.",
      },
    ],
    steps: [
      { title: "Offer", body: "What the page sells, and to whom." },
      { title: "Build", body: "Written, designed and built, with one round of changes." },
      { title: "Launch", body: "Live on your domain, tracking verified." },
    ],
    sections: [
      {
        title: "Types of landing page we build.",
        intro: "Which one you need comes out of the offer and the traffic, not out of a preference.",
        items: [
          {
            title: "Standard landing page",
            body: "Offer, proof, objections, one form. The default, and the right answer more often than people expect.",
          },
          {
            title: "Advertorial",
            body: "Reads as an article, sells at the end. For offers that need explaining before anyone will consider the price.",
          },
          {
            title: "Listicle",
            body: "Numbered, scannable, built for cold traffic that has not agreed to concentrate yet.",
          },
          {
            title: "Quiz funnel",
            body: "A few questions, then a recommendation. Qualifies the lead and earns the email at the same time.",
          },
          {
            title: "A/B test variant",
            body: "A second version of a page that already runs, changed in one place so the result means something.",
          },
        ],
      },
      {
        title: "Looking good and working are two different jobs.",
        items: [
          {
            title: "The headline is about you",
            body: "Most pages open with the company name and the year it was founded. The reader wants to know what they get.",
          },
          {
            title: "Four things to press",
            body: "A nav bar, a chat bubble, a newsletter box and the actual button. Three of those are exits.",
          },
          {
            title: "Proof that proves nothing",
            body: "Six logos nobody recognises and a quote with no name on it. A reader discounts both instantly.",
          },
          {
            title: "The form asks for too much",
            body: "Nine fields for a quote request. Every field after the third costs you people who were ready.",
          },
        ],
      },
    ],
  },
};

/**
 * THE SAMPLE LIBRARY. One list, two consumers: the hero marquee and the
 * portfolio grid. Kept in one place because both need the same alt text and
 * the same service label, and two copies of nineteen captions drift.
 *
 * Every file in public/work is 520x924 (9:16), exported at that size so the
 * hero's three columns and the grid's four can share them without a second
 * crop. `tag` is the service, printed on the hero tiles; `type` and
 * `industry` are the two axes the portfolio filters on.
 */
export type WorkType = "posts" | "stories" | "shortform" | "ads" | "email";
export type WorkIndustry = "food" | "beauty" | "hospitality" | "retail" | "pets";

export interface WorkItem {
  /** Filename in public/work, without the extension. Doubles as the key. */
  src: string;
  alt: string;
  /** Service label, as printed in the corner of a hero tile. */
  tag: string;
  type: WorkType;
  industry: WorkIndustry;
  /** Picked out by the portfolio's default "Featured" filter. */
  featured?: boolean;
}

export const work = {
  items: [
    {
      src: "cafe-brunch-ig-story",
      alt: "Brunch story for a cafe",
      tag: "IG Story",
      type: "stories",
      industry: "food",
      featured: true,
    },
    {
      src: "skincare-night-cream-social-post",
      alt: "Night cream social post",
      tag: "Social Post",
      type: "posts",
      industry: "beauty",
    },
    {
      src: "candle-gifting-email",
      alt: "Candle gifting email artwork",
      tag: "Email",
      type: "email",
      industry: "retail",
    },
    {
      src: "salon-balayage-carousel",
      alt: "Before-and-after salon carousel",
      tag: "Carousel",
      type: "posts",
      industry: "beauty",
      featured: true,
    },
    {
      src: "restaurant-fresh-pasta-social-post",
      alt: "Fresh pasta social post",
      tag: "Social Post",
      type: "posts",
      industry: "food",
    },
    {
      src: "hotel-afternoon-tea-ig-story",
      alt: "Afternoon tea story for a hotel",
      tag: "IG Story",
      type: "stories",
      industry: "hospitality",
    },
    {
      src: "spa-couples-package-email",
      alt: "Spa package email artwork",
      tag: "Email",
      type: "email",
      industry: "beauty",
    },
    {
      src: "cycling-carbon-road-ad-creative",
      alt: "Carbon road bike ad",
      tag: "Ad Creative",
      type: "ads",
      industry: "retail",
    },
    {
      src: "patisserie-seasonal-box-email",
      alt: "Patisserie seasonal box email artwork",
      tag: "Email",
      type: "email",
      industry: "food",
    },
    {
      src: "private-dining-ig-story",
      alt: "Private dining story for a restaurant",
      tag: "IG Story",
      type: "stories",
      industry: "hospitality",
    },
    {
      src: "hotel-weekend-stay-email",
      alt: "Hotel weekend package email artwork",
      tag: "Email",
      type: "email",
      industry: "hospitality",
      featured: true,
    },
    {
      src: "perfume-midnight-fig-ad-creative",
      alt: "Midnight fig perfume ad",
      tag: "Ad Creative",
      type: "ads",
      industry: "retail",
      featured: true,
    },
    {
      src: "wellness-breakfast-short-form",
      alt: "Captioned wellness short-form frame",
      tag: "Short-form",
      type: "shortform",
      industry: "beauty",
    },
    {
      src: "bubble-tea-tiktok-post",
      alt: "Brown sugar milk tea TikTok post",
      tag: "TikTok Post",
      type: "shortform",
      industry: "food",
      featured: true,
    },
    {
      src: "pet-treats-tiktok-post",
      alt: "Grain-free dog treats TikTok post",
      tag: "TikTok Post",
      type: "shortform",
      industry: "pets",
      featured: true,
    },
    {
      src: "yoga-morning-class-short-form",
      alt: "Morning yoga class short-form frame",
      tag: "Short-form",
      type: "shortform",
      industry: "beauty",
    },
    {
      src: "jewellery-aurelle-social-post",
      alt: "Gold pendant jewellery post",
      tag: "Social Post",
      type: "posts",
      industry: "retail",
    },
    {
      src: "skincare-vitamin-c-carousel",
      alt: "Vitamin C serum carousel",
      tag: "Carousel",
      type: "posts",
      industry: "beauty",
      featured: true,
    },
    {
      src: "ginger-soda-launch-ad-creative",
      alt: "Ginger soda launch ad",
      tag: "Ad Creative",
      type: "ads",
      industry: "food",
      featured: true,
    },
  ] satisfies WorkItem[] as WorkItem[],
  /** Exported so nothing has to guess the intrinsic size of a tile. */
  tileWidth: 520,
  tileHeight: 924,
};

export const hero = {
  headlineLead: "Social content on subscription",
  headlineAccent: `from ${brand.priceFrom}/mo`,
  subheadLead: "Stay active. Stay relevant.",
  /* Two lines, each led by a green tick. */
  subhead: [
    "Fresh posts and short-form video every month.",
    "Created and scheduled to keep your brand visible and engaging.",
  ],
  /* Four, in a 2x2 grid, to match the reference layout. */
  bullets: [
    {
      title: "Reach more of the right people.",
      body: "Help more people discover your brand.",
    },
    {
      title: "Custom content, always on-brand",
      body: "Posts, reels, and stories made for your brand.",
    },
    {
      title: "Quality checked, every time.",
      body: "Every deliverable is reviewed before it reaches you.",
    },
    {
      title: "No contracts, no lock-in",
      body: "Cancel anytime.",
    },
  ],
  /**
   * THE CARD HERO (components/hero.tsx) READS FROM HERE DOWN.
   *
   * `subheadLead`, `subhead` and `bullets` above belong to the marquee hero
   * kept at components/hero-marquee.tsx. Both are live content because both
   * heroes are meant to be swappable; deleting one set breaks the other.
   */
  subheadParagraph:
    "Fresh posts, short-form video and stories created every month to keep your brand visible and engaging.",
  /* Three across, each with an icon, rather than the marquee hero's 2x2. */
  highlights: [
    {
      icon: "pencil" as const,
      title: "Custom content",
      body: "Posts, reels and stories made for your brand.",
    },
    {
      icon: "check" as const,
      title: "Quality checked",
      body: "Every deliverable is reviewed before it goes live.",
    },
    {
      icon: "calendar" as const,
      title: "No contracts",
      body: "Cancel anytime.",
    },
  ],
  /**
   * The arrangement of mocked-up posts on the right.
   *
   * THE PLATFORM PILLS ARE PART OF THE ARTWORK. Each card was supplied with
   * its own "SOCIAL POST" / "CAROUSEL" / "STORIES" / "EMAIL" badge already
   * on it, so the component draws none — an HTML pill on top of a printed
   * one was the bug the first pass at this shipped.
   *
   * THE REEL IS THE EXCEPTION. Its supplied artwork carried a handle, a
   * hashtag caption and a badge that all named another brand, so the file is
   * cropped above and below them and the component puts back a handle, a
   * scrubber and the badge. Its like and comment counts survived the crop
   * and are part of the picture.
   *
   * `w` and `h` are the intrinsic pixels; each card is shown at exactly that
   * ratio so nothing is cropped and no baked-in wording is lost. Swap a file
   * and update the two numbers.
   */
  showcase: {
    handle: "[your brand]",
    posted: "2h ago",
    video: {
      src: "reel-skincare-ritual",
      alt: "Short-form video of a serum poured over oranges",
      w: 941,
      h: 1672,
      label: "Short-form video",
      mark: "tiktok" as const,
    },
    cards: [
      {
        src: "post-weeknight-meals",
        alt: "Social post of a pasta dish",
        w: 1200,
        h: 1016,
      },
      {
        src: "carousel-vitamin-c",
        alt: "Carousel panel for a vitamin C serum",
        w: 1352,
        h: 908,
      },
      {
        src: "story-move-feel-better",
        alt: "Story frame of someone stretching in morning light",
        w: 886,
        h: 1619,
      },
    ],
    /* The newsletter card. Its wordmark named another brand and has been
       painted out of the file, so the component prints ours in its place —
       hence the position, which is where the original sat. */
    email: {
      src: "email-wellness",
      alt: "Email newsletter with a green smoothie",
      w: 1026,
      h: 1111,
      wordmarkLeft: "5.1%",
      wordmarkTop: "7.8%",
    },
    /* The pencilled notes, cut from the same artwork as the cards rather
       than set in a handwriting face: the wording, the slant, the line
       breaks and the curl of each arrow are the reference's own. Their paper
       is keyed to transparency, so they sit on the page's cream with no
       rectangle behind them.
       Decorative: aria-hidden, and dropped below xl where there is no margin
       for them to sit in. */
    notes: [
      { src: "note-stop-the-scroll", w: 134, h: 196 },
      { src: "note-all-done-for-you", w: 136, h: 186 },
    ],
  },
  primaryCta: "Book a demo",
  secondaryCta: `Start at ${brand.priceFrom}/mo`,
  /* The first part is set in ink and the rest in grey, as in the reference.
     Split rather than one string so the emphasis cannot drift from the text. */
  footnote: [
    { text: `From ${brand.priceFrom}/mo`, strong: true },
    { text: "No contracts", strong: false },
    { text: "14-day money-back guarantee", strong: false },
  ],
  /**
   * Right-hand collage: three columns that scroll continuously, the outer two
   * upwards and the middle one down.
   *
   * Each column's tiles are rendered twice by the component so the loop has
   * no seam, which is why the lists can stay short here.
   *
   * Columns hold `work.items` keys rather than tiles of their own: the
   * captions and service labels live in one list, and this is only the
   * running order.
   */
  collage: [
    [
      "cafe-brunch-ig-story",
      "salon-balayage-carousel",
      "spa-couples-package-email",
      "private-dining-ig-story",
      "wellness-breakfast-short-form",
      "yoga-morning-class-short-form",
      "ginger-soda-launch-ad-creative",
    ],
    [
      "skincare-night-cream-social-post",
      "restaurant-fresh-pasta-social-post",
      "cycling-carbon-road-ad-creative",
      "hotel-weekend-stay-email",
      "bubble-tea-tiktok-post",
      "jewellery-aurelle-social-post",
    ],
    [
      "candle-gifting-email",
      "hotel-afternoon-tea-ig-story",
      "patisserie-seasonal-box-email",
      "perfume-midnight-fig-ad-creative",
      "pet-treats-tiktok-post",
      "skincare-vitamin-c-carousel",
    ],
  ],
};

/**
 * The platform row.
 *
 * THESE ARE THE CHANNELS THE SERVICE POSTS TO, not customer logos — which is
 * why it can be real on day one, while a client-logo wall cannot. Marks are
 * drawn in components/platform-logos.tsx rather than pulled from an icon set:
 * lucide dropped most brand glyphs, and mixing one library's Instagram with a
 * hand-drawn TikTok reads as a mismatch immediately.
 */
export const logoStrip = {
  label: "Published wherever your customers are.",
  items: [
    { name: "Instagram", mark: "instagram" as const },
    { name: "TikTok", mark: "tiktok" as const },
    { name: "Facebook", mark: "facebook" as const },
    { name: "LinkedIn", mark: "linkedin" as const },
    { name: "YouTube", mark: "youtube" as const },
    { name: "Pinterest", mark: "pinterest" as const },
  ],
};

export const deliverables = {
  kicker: "How it works",
  /* Two-tone, as in the reference: the second line carries the accent. */
  titleLead: "From idea to impact",
  titleAccent: "In 4 simple steps.",
  /**
   * The four steps, and what each card shows under its words.
   *
   * `art` picks the illustration the component draws — there is one branch
   * per value, so adding a step means adding a branch.
   *
   * EVERY MOCK IS DRAWN SMALL AND TO A FIXED HEIGHT. Each card is about
   * 190px wide on a wide screen, so these are read at a glance or not at
   * all. The art slot is a set height for all four so the cards stay the
   * same size as each other and the block does not grow past what it was.
   */
  steps: [
    {
      title: "Share your brand",
      body: "Tell us about your business, goals and style.",
      art: "brand" as const,
    },
    {
      title: "We create",
      body: "We design posts, reels and stories for you.",
      art: "create" as const,
    },
    {
      title: "You approve",
      body: "Review, request changes, and approve everything.",
      art: "approve" as const,
    },
    {
      title: "We publish",
      body: "We schedule and publish across your channels.",
      art: "publish" as const,
    },
  ],

  /* Step 1: the intake form. Bracketed like every other unfilled value on
     the site, so the mock does not invent a customer. */
  brandForm: {
    title: "Your brand",
    nameLabel: "Business name",
    namePlaceholder: "[Your business]",
    goalLabel: "What are your goals?",
    goalValue: "Grow brand awareness",
    uploadLabel: "Upload inspo",
    thumbs: ["cafe-brunch-ig-story", "candle-gifting-email"],
  },

  /* Step 2: three pieces fanned, from the hero crops. */
  createThumbs: ["post-weeknight-meals", "carousel-vitamin-c", "story-move-feel-better"],

  /* Step 3: a note from the customer, then the state it moves to. The
     avatar is one of the review portraits rather than a sixth face. */
  approve: {
    avatar: "priya-k",
    comment: "This looks great. Can we try a version with a darker background?",
    ago: "2m ago",
    label: "Approved",
  },

  /* Step 4: the week ahead. Weekdays carry no dates — a hardcoded "12" goes
     stale the moment anyone looks twice. */
  publish: {
    title: "This week",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    thumbs: [
      "cafe-brunch-ig-story",
      "bubble-tea-tiktok-post",
      "jewellery-aurelle-social-post",
      "yoga-morning-class-short-form",
      "skincare-vitamin-c-carousel",
    ],
  },
  /* Channels shown on step 4, in the order the logo strip uses. */
  publishMarks: ["instagram", "tiktok", "facebook", "pinterest", "linkedin"] as const,
};

export const gallery = {
  kicker: "Our portfolio",
  title: "Made by creatives. Made to stand out.",
  /**
   * Two rows of filters over one grid, both reading from `work.items`.
   *
   * NO COUNTS ARE WRITTEN HERE. The number beside an industry is counted off
   * the library at render, against whatever type is selected, so the pills
   * cannot promise more work than the grid can show.
   *
   * `types` is the row of tabs; `industries` is the row of pills under it.
   * "Featured" and "All" are not industries, which is why they are separate
   * fields rather than entries with special ids.
   */
  types: [
    { id: "all" as const, label: "All", icon: "all" as const },
    { id: "posts" as const, label: "Posts", icon: "posts" as const },
    { id: "stories" as const, label: "Stories", icon: "stories" as const },
    { id: "shortform" as const, label: "Short-form", icon: "video" as const },
    { id: "ads" as const, label: "Ads", icon: "ads" as const },
    { id: "email" as const, label: "Email", icon: "email" as const },
  ],
  featuredLabel: "Featured",
  allLabel: "All",
  industries: [
    { id: "food" as const, label: "Food & Drink" },
    { id: "beauty" as const, label: "Health & Beauty" },
    { id: "hospitality" as const, label: "Hospitality" },
    { id: "retail" as const, label: "Retail & Products" },
    { id: "pets" as const, label: "Pets" },
  ],
  /** How many cards the grid opens on, and how many each press adds. */
  pageSize: 8,
  seeAll: "See all examples",
  more: "View more examples",
  empty: "Nothing in the library matches that pair yet.",
};

/**
 * The plan builder.
 *
 * PRICE IS PER UNIT, NOT A LABEL. Every figure the panel shows is derived
 * from `perUnit * quantity`, so the stepper, the row price and the subtotal
 * cannot disagree. A hardcoded "$99" next to a control that changes the
 * quantity is the bug nobody notices until a customer does the sum.
 *
 * `unit` is the plural noun used in the stepper and the estimate line.
 */
export interface PricingService {
  id: string;
  name: string;
  /** Icon key, mapped to a lucide icon in the component. */
  icon: "posts" | "video" | "blog" | "growth" | "seo" | "email" | "landing" | "website";
  perUnit: number;
  /**
   * The quantities actually sold, with what each costs.
   *
   * PRESENT MEANS THE STEPPER WALKS THESE and the price comes from the tier
   * rather than `perUnit * quantity`. The two disagree above the entry
   * quantity — usually because the tier carries a volume discount, though
   * blog posts run a dollar the other way — and a home page quoting anything
   * other than what the checkout charges is worse than either number on
   * its own. These must match selectPage's options, which is what /pricing
   * sells and what the Stripe links are priced at.
   *
   * Without it the stepper is a plain multiple of `perUnit`, which is right
   * for a service sold at one rate whatever the quantity.
   */
  tiers?: { qty: number; price: number }[];
  /** Starting quantity when the service is added. */
  defaultQty: number;
  minQty: number;
  step: number;
  unit: string;
  /** Shown only on the expanded card. */
  description?: string;
  /**
   * Three `work.items` keys, shown as thumbnails on the expanded card. A
   * service without real work in the library leaves this out and gets the
   * labelled placeholders instead — a grey box that says "Sample" is honest,
   * and borrowing a post to stand in for a landing page is not.
   */
  previews?: string[];
  popular?: boolean;
  /** Fixed-price services have no stepper. */
  fixed?: boolean;
  /** Charged once, so it is summed apart from the monthly total. */
  oneTime?: boolean;
  /** What the info pop-up shows. Falls back to `description` when absent. */
  details?: {
    summary: string;
    includes: string[];
    /** A highlighted box of conditions, under the list. */
    callout?: { title: string; points: string[] };
    /** A quiet line for what is not included. */
    note?: string;
  };
}

/**
 * A row in the "More add-ons & services" panel.
 *
 * THESE PRICE THREE DIFFERENT WAYS, which is why the mode exists rather than a
 * single number: an extra video is charged per unit, a website is one flat fee,
 * and rush delivery is a share of whatever the plan already costs. The panel
 * and the estimate both read `mode`, so a row cannot be shown one way and
 * charged another.
 */
export interface AddOn {
  id: string;
  name: string;
  /** Icon key, mapped to a lucide icon in the component. */
  icon: "video" | "rush" | "website" | "ads";
  /** The price as it reads on the row before anything is added. */
  price: string;
  mode: "quantity" | "fixed" | "percent";
  /** quantity: charged per unit. fixed: the whole charge. */
  amount?: number;
  /** percent mode only: a share of the monthly subtotal. */
  percent?: number;
  unit?: string;
  defaultQty?: number;
  minQty?: number;
  step?: number;
  /** Charged once, so it is summed apart from the monthly total. */
  oneTime?: boolean;
  /** A quiet line under the price, for what the figure excludes. */
  note?: string;
}

export const pricing = {
  kicker: "Plans & Pricing",
  title: "Social media, fully managed on subscription.",
  intro:
    "Pick the services you need—posts, short-form video, landing pages, and more. Build a plan that fits your needs and change it anytime.",
  services: [
    {
      id: "posts",
      name: "Social Media Posts",
      icon: "posts",
      perUnit: 6.9,
      tiers: [
        { qty: 10, price: 69 },
        { qty: 20, price: 129 },
      ],
      defaultQty: 10,
      minQty: 10,
      step: 10,
      unit: "posts",
      description:
        "We create your posts, write the captions, and plan your content. You simply review and approve.",
      /* Three from the sample library, picked to be different from each other
         at thumbnail size: a dark food shot, a light beauty product and a
         cream-toned still. Three variations on the same pale product photo
         would read as one image repeated. */
      previews: [
        "restaurant-fresh-pasta-social-post",
        "skincare-night-cream-social-post",
        "jewellery-aurelle-social-post",
      ],
      popular: true,
    },
    {
      id: "video",
      name: "Short-Form Videos",
      icon: "video",
      perUnit: 25.8,
      tiers: [
        { qty: 5, price: 129 },
        { qty: 10, price: 249 },
        { qty: 20, price: 479 },
      ],
      defaultQty: 5,
      minQty: 5,
      step: 5,
      unit: "videos",
      description:
        "Vertical edits cut from your footage, captioned and sized for each platform.",
      details: {
        summary:
          "Short-form video, handled end to end. We turn your footage or sourced clips into Reels, TikToks, and Shorts—complete with hooks, captions, music, and on-brand edits.",
        includes: [
          "Video editing from start to finish",
          "Hooks, captions & music handled",
          "Branded graphics & motion",
          "Reels, TikToks & Shorts formatted",
          "Scheduled & published for you",
          "Revisions included",
        ],
      },
    },
    {
      id: "blog",
      name: "SEO Blog Posts",
      icon: "blog",
      /* 189 / 4, the entry tier. The stepper never multiplies this — `tiers`
         is present, so `priceAt` returns a tier price — but the info dialog
         reads `perUnit * defaultQty`, and that has to come out at the $189
         references/stats.md confirms and the Stripe link charges. */
      perUnit: 47.25,
      /* Both quantities /pricing sells, at the figures its two Stripe links
         charge. Unlike the other tiered rows these carry no volume discount:
         eight posts is $379, a dollar above four times the entry rate. The
         tier is still what the checkout takes, which is what matters here. */
      tiers: [
        { qty: 4, price: 189 },
        { qty: 8, price: 379 },
      ],
      defaultQty: 4,
      minQty: 4,
      step: 4,
      unit: "posts",
      description:
        "Long-form articles researched against what people actually search for, written by a person, and published to your CMS with the titles, metadata and internal links already in place.",
      details: {
        summary:
          "SEO blog posts, handled from keyword to published page. We pick the targets with you, read the pages ranking today, write 1,000 words a person would finish, and post them to your CMS with the links already done.",
        includes: [
          "1,000-word articles, drafted and edited before you see them",
          "Keywords chosen with you, with the working shown",
          "Researched against the pages ranking today",
          "Titles & meta descriptions written for the result page",
          "Internal links added, and older posts updated to point at the new one",
          "Published to your CMS, images in place",
        ],
        note: "Rankings move over months, not weeks. Buy this for the quarter after next.",
      },
    },
    {
      id: "landing",
      name: "Landing Pages",
      icon: "landing",
      /* Charged once, not monthly: the builder keeps it out of the /mo total. */
      oneTime: true,
      fixed: true,
      perUnit: 399,
      defaultQty: 1,
      minQty: 1,
      step: 1,
      unit: "page",
      description:
        "One page built to do one job: take the traffic your posts and ads send, and turn it into bookings. Written, designed, built and launched, with the form and tracking already wired up.",
      details: {
        summary:
          "Give your traffic somewhere better to land. A focused landing page designed to turn interest from your posts and ads into action. We handle everything from copy and design to launch and tracking.",
        includes: [
          "Conversion-focused copy & design",
          "Fully built on your domain",
          "Forms or booking integrated",
          "Tracking connected from launch",
          "Fast, mobile-friendly pages",
        ],
      },
    },
    {
      id: "email",
      name: "Email Marketing",
      icon: "email",
      perUnit: 74.5,
      /* Four is the smallest email plan sold: see selectPage's options. */
      defaultQty: 4,
      minQty: 4,
      step: 1,
      unit: "emails",
      description: "Campaigns and flows written, designed and scheduled.",
      details: {
        summary:
          "Your email campaigns, handled from start to send. We take care of the copy, design, scheduling, and reporting for newsletters, promotions, and announcements.",
        includes: [
          "Email design & copy",
          "Campaign setup",
          "Newsletters & promotions",
          "Scheduling & sending",
          "Performance reporting",
        ],
        note: "List setup & automation flows are not included.",
      },
    },
    {
      id: "website",
      name: "Business Website",
      icon: "website",
      /* Charged once, like a landing page build. */
      oneTime: true,
      fixed: true,
      perUnit: 2500,
      defaultQty: 1,
      minQty: 1,
      step: 1,
      unit: "site",
      description:
        "Up to five pages, written, designed and built on your domain. The site your posts and ads send people to when one page is not enough.",
      details: {
        summary:
          "Your business website, handled from start to launch. We take care of the copy, design, build, forms, and tracking—all on your own domain.",
        includes: [
          "Up to 5 pages",
          "Copy & custom design",
          "Build & domain setup",
          "Forms or booking integration",
          "Tracking included",
          "Mobile-ready throughout",
        ],
        note: "Ecommerce and custom web apps are quoted separately.",
      },
    },
  ] as PricingService[],
  infoDialog: {
    includesLabel: "What you get",
    close: "Close",
    addCta: "Add to plan",
  },
  /* The add-ons list is copied from the short-form video site (port 3004),
     where it sits under the heading "Separate jobs, separate prices". */
  moreAddOns: {
    title: "More add-ons & services",
    meta: "Extra videos · Rush delivery",
    action: "Show all",
    actionOpen: "Show less",
    groups: [
      {
        title: "More content",
        items: [
          {
            id: "extra-video",
            name: "Extra short-form video",
            icon: "video",
            price: "$39 each",
            mode: "quantity",
            amount: 39,
            unit: "videos",
            defaultQty: 1,
            minQty: 1,
            step: 1,
          },
          {
            id: "rush",
            name: "Rush delivery (24 hours)",
            icon: "rush",
            price: "+50% per item",
            mode: "percent",
            percent: 50,
          },
        ],
      },
    ] as { title: string; items: AddOn[] }[],
  },

  estimate: {
    label: "Estimate",
    subline: "Monthly plan · billed after approval",
    /* A lead line, then the ticked list under it. */
    includesIntro:
      "Publishing included across your selected social channels, with one account per platform.",
    includes: [
      "Guided onboarding & monthly check-ins available",
      "14-day money-back guarantee",
      "No contracts. Cancel anytime.",
    ],
    subtotalLabel: "Subtotal / mo",
    cta: "Start with this plan",
    /* Add-ons are quoted by hand: neither can be a Payment Link, one varying
       by quantity and the other being a share of a total that moves. */
    ctaQuote: "Send this plan for a quote",
    addOnNote:
      "Extra videos and rush delivery are quoted with your plan, not charged at checkout.",
    shareLink: "Copy a shareable link to this build",
    shareNote: "Send a client or teammate a link to this exact plan.",
    finePrint:
      "Pricing is in USD. Your selected plan renews automatically each month, but you can cancel anytime. By subscribing, you agree to our",
    terms: "Terms & Conditions",
    refunds: "Refund Policy",
  },
};

/**
 * Pricing-builder services taken off the page for now, kept here so they can
 * go back into `pricing.services` unchanged.
 */
export const pricingArchived: PricingService[] = [
  {
    id: "growth",
    name: "Instagram Growth",
    icon: "growth",
    perUnit: 149,
    defaultQty: 1,
    minQty: 1,
    step: 1,
    unit: "month",
    description: "Hashtag and engagement work on the account, reported monthly.",
    fixed: true,
  },
  {
    id: "seo",
    name: "Managed SEO",
    icon: "seo",
    perUnit: 499,
    defaultQty: 1,
    minQty: 1,
    step: 1,
    unit: "month",
    description: "Technical fixes, on-page work and a monthly content plan.",
    fixed: true,
  },
];

/**
 * THE SELECT-SERVICES PAGE (/pricing).
 *
 * Two pricing shapes, because the reference has two: items bought by the
 * quantity (a dropdown of priced options) and items bought outright (a single
 * price and an Add button).
 *
 * `oneTime` items are summed SEPARATELY from monthly ones. A page that adds a
 * one-off build fee into a "/ month" total is lying by arithmetic, and it is
 * the mistake the earlier builder was heading towards with landing pages.
 */
export type ServiceIcon =
  | "posts"
  | "stories"
  | "carousel"
  | "video"
  | "growth"
  | "seo"
  | "website"
  | "landing"
  | "email"
  | "blog";

export interface ServiceOption {
  label: string;
  price: number;
  /**
   * A Stripe Payment Link for this exact quantity.
   *
   * PER OPTION, NOT PER SERVICE. A Payment Link charges one fixed amount, and
   * every quantity is a different amount, so each needs its own link. Options
   * without one simply have no buy button: the visitor adds them to the plan
   * and goes to the brief, which is what every option did before any link
   * existed.
   */
  checkout?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  icon: ServiceIcon;
  description: string;
  /** "quantity" renders a select; "add" renders a single price and a button. */
  mode: "quantity" | "add";
  oneTime?: boolean;
  placeholder?: string;
  options?: ServiceOption[];
  price?: number;
  /**
   * A Stripe Payment Link, for services that can be bought on their own.
   *
   * ONLY ON FIXED, ONE-OFF SERVICES. A Payment Link charges an amount set in
   * Stripe, so it can only stand in for a service whose price never varies.
   * The monthly services are quantities the visitor chooses and combines, and
   * that total exists only in the browser: it goes to the brief instead.
   */
  checkout?: string;
}

export interface ServiceGroup {
  title: string;
  /** Two cards side by side, as in the reference's add-on rows. */
  twoUp?: boolean;
  items: ServiceItem[];
}

export const selectPage = {
  title: "Select Services",
  intro:
    "Pick your services, cancel anytime. The original content subscription. Onboarding call and monthly review meetings are included with every plan.",
  bullets: [
    { strong: "Every service", rest: "on one platform." },
    { strong: "Real marketers", rest: "on your brand, not a content mill." },
    { strong: "Trusted", rest: "by businesses since 2018." },
  ],
  groups: [
    {
      title: "Social Media Posts",
      items: [
        {
          id: "posts",
          name: "Social Media Posts",
          icon: "posts",
          description:
            "Static, single-image posts written, designed and published to your channels every month.",
          mode: "quantity",
          placeholder: "Select post quantity",
          options: [
            { label: "10 posts - $69/mo", price: 69,
              checkout: "https://buy.stripe.com/6oUeV6f557Rh5SMaus6oo07",
            },
            { label: "20 posts - $129/mo", price: 129,
              checkout: "https://buy.stripe.com/14A3cobST8Vl5SM0TS6oo09",
            },
          ],
        },
      ],
    },
    {
      title: "Instagram Add-ons",
      twoUp: true,
      items: [
        {
          id: "stories",
          name: "Instagram Stories",
          icon: "stories",
          description:
            "Full-screen stories designed and published for you. They vanish after 24 hours, so they keep the profile busy without filling up the grid.",
          mode: "quantity",
          placeholder: "Stories quantity",
          options: [
            { label: "10 stories - $69/mo", price: 69,
              checkout: "https://buy.stripe.com/cNi6oAaOPdbBftm8mk6oo06",
            },
            { label: "20 stories - $109/mo", price: 109,
              checkout: "https://buy.stripe.com/cNi9AM2ijfjJftm1XW6oo08",
            },
          ],
        },
        {
          id: "carousels",
          name: "Carousel Posts",
          icon: "carousel",
          description:
            "Three to five slides on one post, for a tip, a list or a before and after. Replaces a regular post, so do not buy more than your post quantity.",
          mode: "quantity",
          placeholder: "Carousel quantity",
          options: [
            { label: "5 carousels - $75/mo", price: 75,
              checkout: "https://buy.stripe.com/6oU5kw4qr6Nd5SM0TS6oo05",
            },
          ],
        },
      ],
    },
    {
      title: "Short-Form Videos",
      items: [
        {
          id: "video",
          name: "Short-Form Videos",
          icon: "video",
          description: "Twenty to sixty second videos for TikTok, Reels and Shorts.",
          mode: "quantity",
          placeholder: "Video quantity",
          options: [
            { label: "5 videos - $129/mo", price: 129,
              checkout: "https://buy.stripe.com/aFa00ccWXb3t1Cw0TS6oo04",
            },
            { label: "10 videos - $249/mo", price: 249,
              checkout: "https://buy.stripe.com/00w9AMbSTdbB3KE9qo6oo0c",
            },
            { label: "20 videos - $479/mo", price: 479,
              checkout: "https://buy.stripe.com/6oU5kwaOPb3tftmfOM6oo0b",
            },
          ],
        },
      ],
    },
    {
      title: "One-time add-ons",
      twoUp: true,
      items: [
        {
          id: "website",
          name: "Business Website",
          icon: "website",
          description:
            "Up to five pages, written, designed and built on your domain. Priced as one build, like a landing page.",
          mode: "add",
          oneTime: true,
          price: 2500,
          checkout: "https://buy.stripe.com/bJe3coaOP5J9a927ig6oo01",
        },
        {
          id: "landing",
          name: "Landing Pages",
          icon: "landing",
          description:
            "Design, copywriting and development of one conversion-focused landing page.",
          mode: "add",
          oneTime: true,
          price: 399,
          checkout: "https://buy.stripe.com/7sYfZaf551sT3KE7ig6oo00",
        },
      ],
    },
    {
      title: "Email Design",
      items: [
        {
          id: "email",
          name: "Email Design",
          icon: "email",
          description:
            "Emails designed and built for your campaigns and flows. Works with any email platform.",
          mode: "quantity",
          placeholder: "Email quantity",
          options: [
            { label: "4 emails - $289/mo", price: 289,
              checkout: "https://buy.stripe.com/00w00cf55fjJgxqaus6oo03",
            },
          ],
        },
      ],
    },
    {
      title: "SEO Blog Posts",
      items: [
        {
          id: "blog",
          name: "Blog Posts",
          icon: "blog",
          description: "SEO-optimised, 1,000-word blog posts to build rankings on Google.",
          mode: "quantity",
          placeholder: "Select plan",
          options: [
            { label: "4 posts - $189/mo", price: 189,
              checkout: "https://buy.stripe.com/eVqbIU0abefFbd6fOM6oo02",
            },
            { label: "8 posts - $379/mo", price: 379,
              checkout: "https://buy.stripe.com/dRmeV6aOPgnNdle0TS6oo0d",
            },
          ],
        },
      ],
    },
  ] as ServiceGroup[],
  summary: {
    title: "Summary",
    totalLabel: "Total",
    currency: "USD",
    monthlySuffix: "/ month",
    oneTimeLabel: "One-time",
    empty: "No services selected yet.",
    next: "Next",
    poweredBy: "Powered by [provider]",
  },
  seoTitle: "Select Services | PostSteer",
  seoDescription: "Pick your services and see the monthly price before you commit.",
};

/**
 * THE BRIEF STEP (/pricing/brief).
 *
 * NO FILE UPLOAD FIELD. A static export has nowhere to put a file, and an
 * upload control that silently discards what someone drags onto it is worse
 * than asking for a link. When there is a backend, swap the link field for a
 * real uploader.
 */
/**
 * THE BLOG.
 *
 * Placeholder writing, in the same sense as every other page here: the shape
 * is real, the words are mine, and nothing claims to be published research.
 * Replace a post wholesale rather than editing around it.
 */
/**
 * A photograph and the credit that has to travel with it.
 *
 * `width`/`height` are the INTRINSIC size of the file served, not the size it
 * is displayed at. They exist so the browser can reserve the box before the
 * image arrives. Getting them wrong is worse than omitting them, because the
 * layout then settles into a shape nothing asked for.
 *
 * Self-hosting the file does not transfer authorship. The credit renders under
 * every image and is not optional.
 */
export interface PostImage {
  src: string;
  /** Width-descriptor set. Omit only for images with a single rendition. */
  srcSet?: string;
  /** Paired with srcSet. Tells the browser the displayed width before layout. */
  sizes?: string;
  alt: string;
  width: number;
  height: number;
  /**
   * Above the fold. Loads eagerly instead of lazily. Exactly one image per page
   * sets this. Lazy-loading the image somebody is already looking at delays the
   * largest paint rather than deferring it.
   */
  priority?: boolean;
  /** Photographer's name, shown under the image. */
  credit: string;
  /** Their profile, linked from the credit. */
  creditUrl: string;
  /** The photo's own page, linked from "Pexels". */
  sourceUrl: string;
}

export interface PostSection {
  /** Anchor id. The contents list links to it. Do not change it once live. */
  id: string;
  heading: string;
  paragraphs: string[];
  image?: PostImage;
  /**
   * The practical block under a section. Keep it to judgement that survives a
   * month. Platform character limits and video ceilings change without telling
   * anyone, so they belong in prose where they can carry a date and a source,
   * not in a panel that reads as settled fact.
   */
  facts?: { label: string; value: string }[];
  /**
   * A real list, for the places where the prose was a list pretending not to
   * be. `intro` is the line above it, since a list dropped straight under a
   * paragraph reads as an interruption.
   */
  list?: { intro?: string; ordered?: boolean; items: string[] };
}

export interface PostFaq {
  question: string;
  answer: string;
}

/**
 * The keyword cluster a post is written against.
 *
 * IT IS NOT RENDERED ANYWHERE, and that is the point. A visible strip of
 * keywords is the oldest spam signal there is. The cluster earns its keep by
 * deciding what the headings and the FAQ questions say, and it lives in the
 * data so the next person editing the post can see what it was aimed at.
 */
export interface KeywordCluster {
  primary: string;
  secondary: string[];
  longTail: string[];
}

/**
 * A post.
 *
 * THE LONG-FORM FIELDS ARE ALL OPTIONAL, deliberately. The three short notes
 * below predate them and still render through `body`, which is the whole
 * reason this type was extended rather than replaced. A post supplies either
 * `sections` or `body`. Supplying both renders both, which is almost never
 * what anyone means.
 */
export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  /** Display date, as written. Shown on the index and under the headline. */
  date: string;
  readTime: string;
  excerpt: string;
  /** Plain paragraphs, for posts with no section structure. */
  body?: string[];

  /* ---- long-form additions ---- */

  /** ISO day. Drives datePublished in the schema, not the visible dateline. */
  published?: string;
  /** ISO day, when the post has been meaningfully revised since publishing. */
  updated?: string;
  author?: string;
  /**
   * What the byline actually is. Defaults to Person.
   *
   * SET THIS TO "Organization" WHEN NOBODY HAS PUT THEIR NAME TO THE POST.
   * CLAUDE.md asks for a Person byline, and the right way to get one is a real
   * writer who will stand behind the words, not a Person node wrapped around a
   * company name. Until this site has named writers, a house byline is
   * Organization and says so in the schema.
   */
  authorType?: "Person" | "Organization";
  /**
   * The byline's credentials. Say what makes whoever wrote this worth reading
   * on this subject. Vague authority is worse than none.
   */
  authorBio?: string;
  /** The <title> tag, when the headline is the wrong length for one. */
  metaTitle?: string;
  /** 150 to 160 characters. */
  metaDescription?: string;
  keywords?: KeywordCluster;
  hero?: PostImage;
  /**
   * The 1200x630 social card, as a site-relative path. Separate from `hero`
   * because the two jobs are different. A hero cropped for the article column
   * gets letterboxed by every platform that renders a card.
   */
  socialImage?: string;
  /** Paragraphs before the first heading. */
  intro?: string[];
  /** The body of a long-form post. Drives the contents list. */
  sections?: PostSection[];
  /** Rendered as a plain list, and as FAQPage JSON-LD. */
  faqs?: PostFaq[];
}

export const blogPage = {
  title: "Notes on getting content out",
  intro:
    "What we learn running content for other people: what gets made, what gets posted, and what actually brings someone back to a booking page.",
  readMore: "Read",
  backLabel: "All posts",
  ctaTitle: "Want this handled for you?",
  ctaBody: "Pick your services and see the price before you talk to anyone.",
  ctaButton: "See pricing",
  posts: [
    contentCalendarForSocialMedia,
    youtubeShorts0ViewsProblem,
    doINeedAWebsiteIfIHaveSocialMedia,
    socialMediaMarketingForRestaurants,
    crossPostingVsNativePosting,
    {
      slug: "one-recording-a-month",
      socialImage: "/blog/one-recording-a-month/og-one-recording-a-month-1200x630.jpg",
      hero: {
        src: "/blog/one-recording-a-month/filming-session-1200.webp",
        srcSet:
          "/blog/one-recording-a-month/filming-session-800.webp 800w, /blog/one-recording-a-month/filming-session-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "A camcorder on a tripod, set up in front of an interview scene.",
        width: 1200,
        height: 800,
        priority: true,
        credit: "Isaiah Ekele",
        creditUrl: "https://www.pexels.com/@isaiah-ekele-102046059",
        sourceUrl: "https://www.pexels.com/photo/close-up-of-a-camcorder-18357250/",
      },
      title: "One recording a month is enough",
      category: "Process",
      date: "12 September 2026",
      readTime: "4 min",
      excerpt:
        "Most businesses do not have a content problem. They have a filming problem, and it is solved by putting one hour in the calendar.",
      body: [
        "The usual failure is not a lack of ideas. It is that filming never gets scheduled, so nothing exists to edit, so nothing goes out. Booking a single hour a month turns an open-ended task into an appointment, and an appointment is something a business already knows how to keep.",
        "An hour of talking to camera produces more usable material than most people expect: eight to twelve short videos, plus the written posts that come out of the same answers. The constraint is useful. Knowing there is one session forces a decision about what actually matters this month.",
        "The part worth protecting is the shot list. Turning up without one produces forty minutes of rambling and two usable clips. Ten questions sent in advance produce ten answers that each stand on their own.",
      ],
    },
    {
      slug: "captions-do-the-work",
      socialImage: "/blog/captions-do-the-work/og-captions-do-the-work-1200x630.jpg",
      hero: {
        src: "/blog/captions-do-the-work/watching-with-captions-1200.webp",
        srcSet:
          "/blog/captions-do-the-work/watching-with-captions-800.webp 800w, /blog/captions-do-the-work/watching-with-captions-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "Someone eating a meal while watching a video on their phone.",
        width: 1200,
        height: 800,
        priority: true,
        credit: "S\u00f3c N\u0103ng \u0110\u1ed9ng",
        creditUrl: "https://www.pexels.com/@soc-nang-d-ng-2150345854",
        sourceUrl: "https://www.pexels.com/photo/young-adult-dining-while-watching-video-on-mobile-34689953/",
      },
      title: "Captions are doing more work than your edit",
      category: "Craft",
      date: "28 August 2026",
      readTime: "3 min",
      excerpt:
        "Most short-form video is watched without sound. If the captions are an afterthought, the video is an afterthought.",
      body: [
        "Sound-off viewing is the default on every feed that matters. A video that only makes sense with audio is a video most people scroll past, regardless of how it was shot or graded.",
        "Good captions are not a transcript. They are timed to the beat of the sentence, short enough to read in a glance, and positioned where the platform's own interface will not cover them. That last point costs more videos than any other detail.",
        "The test is simple: mute it, watch it on a phone, and see whether you still know what the video is about in the first three seconds.",
      ],
    },
    {
      slug: "posting-is-the-hard-part",
      socialImage: "/blog/posting-is-the-hard-part/og-posting-is-the-hard-part-1200x630.jpg",
      hero: {
        src: "/blog/posting-is-the-hard-part/sticky-note-backlog-1200.webp",
        srcSet:
          "/blog/posting-is-the-hard-part/sticky-note-backlog-800.webp 800w, /blog/posting-is-the-hard-part/sticky-note-backlog-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "Someone writing on green sticky notes stuck to a laptop.",
        width: 1200,
        height: 800,
        priority: true,
        credit: "Kaboompics",
        creditUrl: "https://www.pexels.com/@karola-g",
        sourceUrl: "https://www.pexels.com/photo/person-writing-on-green-sticky-notes-8547193/",
      },
      title: "Editing is the easy half. Posting is where it dies.",
      category: "Distribution",
      date: "14 August 2026",
      readTime: "5 min",
      excerpt:
        "Files delivered to a folder are not content. Almost every service in this market stops at the folder.",
      body: [
        "Ask a business with a stalled feed what went wrong and you will usually find an archive of finished, unpublished video. Someone edited it. Nobody had the job of putting it out.",
        "Publishing looks trivial until it is somebody's actual responsibility: native formats per platform, captions rewritten per channel, scheduling around what the business is doing that week, and replying to the comments that follow.",
        "This is the part worth buying. The editing market is crowded and cheap; the gap is the person who takes the finished file and makes sure it goes live on Tuesday.",
      ],
    },
  ] as BlogPost[],
  seoTitle: "Blog | PostSteer",
  seoDescription: "Notes on making content and actually getting it published.",
};

/**
 * /thank-you — where a Stripe Payment Link sends someone after they pay.
 *
 * THE PAGE KNOWS NOTHING ABOUT THE PAYMENT. A static export cannot look a
 * checkout session up, so nothing here names the service, the amount or the
 * buyer. Stripe's own receipt does that. This page has one job: get the
 * brief, because a payment with no brief is money we cannot start work on.
 */
export const thankYouPage = {
  seoTitle: "Thank you | PostSteer",
  seoDescription: "Your payment went through. Next, tell us about the business.",
  title: "Payment received.",
  intro:
    "Stripe has emailed your receipt. Nothing else is needed to secure the work.",
  nextTitle: "One thing left",
  nextBody:
    "We cannot start until we know the business. It takes about ten minutes, once, and it is what the team works from in week one.",
  cta: "Tell us about the business",
  whatNextTitle: "What happens next",
  whatNext: [
    "Your brief reaches the team the moment you send it.",
    "Someone reads it and comes back within one working day, by email.",
    "First work lands about a week after that.",
  ],
  helpLead: "Something wrong with the payment?",
  helpCta: "Email poststeer@gmail.com",
  helpHref: "mailto:poststeer@gmail.com",
};

export const briefPage = {
  title: "Tell us about the business",
  intro:
    "Ten minutes, once. This is what the team works from in month one, so the more specific it is, the less back and forth later.",
  fields: {
    business: "Business name",
    website: "Website",
    email: "Work email",
    industry: "Industry",
    industries: [
      "Restaurants",
      "Clinics and medical",
      "Gyms and fitness",
      "Salons and spas",
      "Real estate",
      "Professional services",
      "E-commerce",
      "Other",
    ],
    channels: "Channels to post on",
    channelOptions: ["Instagram", "TikTok", "LinkedIn", "Facebook", "YouTube"],
    topics: "What should we post about?",
    topicsHint: "Products, services, questions customers ask, anything seasonal.",
    tone: "Brand tone",
    toneOptions: ["Plain and factual", "Warm and friendly", "Expert and technical", "Bold and playful"],
    avoid: "Anything to avoid",
    avoidHint: "Claims you cannot make, competitors, topics that are off limits.",
    assets: "Link to logos, photos or footage",
    assetsHint: "A Drive or Dropbox link. Uploads arrive when the backend does.",
    required: "Required",
  },
  back: "Back to services",
  submit: "Send the brief",
  sending: "Sending",
  /* The state after the brief is away. Nothing has been charged yet, and
     saying otherwise would be a lie told to someone who is about to pay. */
  reviewTitle: "Brief sent",
  reviewNote:
    "It is with the team. Someone reads it and comes back within one working day with an invoice for the plan below. Nothing has been charged yet.",
  editBrief: "Send another brief",
  sendFailed:
    "That did not send. Try again, or email poststeer@gmail.com and we will take the brief that way.",
  sendNotConfigured:
    "The email service for this site is not connected yet, so nothing was sent. Email poststeer@gmail.com and we will take the brief that way.",
  seoTitle: "Your brief | PostSteer",
  seoDescription: "Tell us about the business so the first batch lands right.",
};

export const proStrip = {
  text: "Want someone to run the whole account for you?",
  linkText: `Look at PostSteer Pro`,
  href: "#pricing",
};

export const guarantee = {
  kicker: "Money-back guarantee",
  title: "Love your first batch, or get your money back.",
  body: "Every new subscription comes with a 14-day satisfaction guarantee.",
  /* Lead-in plus the detail behind it, so each point stands on its own rather
     than reading as a three-word tick. */
  points: [
    {
      title: "14 days to decide",
      body: "Review your first batch and work through revisions with your team.",
    },
    {
      title: "2+ revision rounds",
      body: "Give us the opportunity to fine-tune the work to your brand.",
    },
    {
      title: "Your first month refunded",
      body:
        "If you're still not satisfied and haven't approved or scheduled any content, we'll refund your first month.",
    },
  ],
  badgeNumber: "14",
  badgeLabel: "day window",
};

export const costs = {
  kicker: "The alternatives",
  title: "Every other way of buying this costs more.",
  intro: "What the same month of content costs, bought four other ways.",
  columns: [
    { name: "Do it yourself", price: "$0", note: "Plus your evenings" },
    { name: "Freelancer", price: "$[30–150]", note: "Per piece, you manage it" },
    { name: "Agency", price: "$[1,500–5,000]", note: "Retainer, often 6 months" },
    { name: "In-house hire", price: "$[4,500]+", note: "Per month, plus tools" },
  ],
  ours: { name: brand.name, price: `From ${brand.priceFrom}`, note: "Per month, cancel any time" },
};

export const caseStudies = {
  kicker: "Results",
  title: "Real businesses. Numbers they can check.",
  items: [
    { stat: "+[312]%", label: "[Metric]", client: "[Client name]", sector: "[Sector]" },
    { stat: "[40]+", label: "[Metric]", client: "[Client name]", sector: "[Sector]" },
    { stat: "[4.2]x", label: "[Metric]", client: "[Client name]", sector: "[Sector]" },
    { stat: "[1.2]M", label: "[Metric]", client: "[Client name]", sector: "[Sector]" },
  ],
  cta: "Read the case studies",
};

/**
 * Client reviews. Seven cards, in the order the layout places them: two in
 * the first column, three in the second, two in the third. The long quotes
 * sit in the tall cards (1 and 7).
 *
 * THE QUOTES ARE SAMPLE COPY, written to show the layout at a realistic length.
 * Names, roles and every figure stay in brackets on purpose: a filled-in name
 * beside an invented sentence reads as a real person endorsing work they never
 * saw. Replace the whole entry with a real quote, from a real client who has
 * agreed to be named, before this ships.
 */
/**
 * The five client reviews in the slider.
 *
 * ⚠️ THESE ARE MOCK REVIEWS WITH STOCK PORTRAITS. Unlike the rest of the
 * site's placeholders, they do not look like placeholders — they read as real
 * people saying real things, which is the point of the design and also the
 * risk. They must be replaced with quotes real customers have agreed to, or
 * taken down, before app/robots.ts stops disallowing crawlers. A named,
 * photographed endorsement nobody gave is the one thing on this site that
 * would be a lie rather than a mock.
 *
 * `role` is the kind of business, not a company: the reference sheet named
 * companies and those were dropped on request.
 *
 * ⚠️ PARKED, NOT DELETED. Nothing renders this any more. <ClientFeedback />
 * came off the home page, the city pages and the industry pages, and the
 * quote carousel came out of the demo booker, so that the site can be opened
 * to crawlers without publishing endorsements nobody gave. The copy, the
 * names, the roles and the portrait filenames are all kept here so the
 * section can come back the day there are real reviews.
 *
 * TO BRING IT BACK: replace every quote with one a named customer has agreed
 * to in writing, swap `photo` for that person's own picture or drop the
 * portrait panel, then put <ClientFeedback /> back in the three pages. The
 * component in components/ui/testimonial.tsx still works and is unchanged.
 * Do not bring it back with these words in it.
 */
export const testimonials = {
  kicker: "Client Reviews",
  title: "Hear it from our clients.",
  intro: "See what businesses have to say about working with PostSteer.",
  quotes: [
    {
      quote:
        "Our engagement has never been higher. The content feels so on-brand and saves us hours each month.",
      name: "Sarah M.",
      role: "Café Owner",
      photo: "sarah-m",
    },
    {
      quote:
        "Professional, creative and easy to work with. We've seen a real increase in sales since starting.",
      name: "James T.",
      role: "E-commerce Brand",
      photo: "james-t",
    },
    {
      quote:
        "They just get our brand. The content is beautiful, consistent and actually drives results.",
      name: "Priya K.",
      role: "Wellness Studio",
      photo: "priya-k",
    },
    {
      /* The sheet had this one naming another agency; the claim is kept and
         the name is ours. */
      quote:
        "PostSteer has completely elevated our online presence. The content is modern, high-quality and always on brand.",
      name: "Daniel R.",
      role: "Fitness Brand",
      photo: "daniel-r",
    },
    {
      quote:
        "The process is seamless and the results speak for themselves. We get beautiful content every month without the stress.",
      name: "Emily S.",
      role: "Lifestyle Brand",
      photo: "emily-s",
    },
  ],
};

export const faqs = [
  {
    question: "Is the content AI-generated?",
    answer:
      "Not by default. Your content is created by real designers, writers, editors, and marketers. We use technology to work faster, but people remain behind the creative and quality control. AI-generated video is available only when you specifically request it.",
  },
  {
    question: "Which social platforms do you support?",
    answer:
      "We support Instagram, Facebook, LinkedIn, TikTok, Pinterest, YouTube, and Google Business Profile. Your plan includes one account per platform, and you can connect the channels you want during onboarding.",
  },
  {
    question: "Do you need my passwords?",
    answer:
      "No. We are added as a team member on each platform, and you can remove access whenever you want.",
  },
  {
    question: "What if the content isn\u2019t quite right?",
    answer:
      "No problem\u2014you approve everything before it\u2019s published. Simply leave feedback in your dashboard and your team will revise it. You\u2019ll get up to three revision rounds in your first month and one each month after that, plus a 14-day satisfaction guarantee on eligible creative services.",
  },
  {
    question: "What is your refund policy?",
    /* Three paragraphs, so this one is an array — the accordion renders each
       as its own <p> rather than running them together. */
    answer: [
      "Your first month of eligible creative services is covered by our 14-day satisfaction guarantee. If you\u2019ve worked through revisions and still aren\u2019t satisfied, we\u2019ll refund your first month in full, provided you haven\u2019t approved or scheduled the work.",
      "The guarantee covers social posts, short-form video, blog posts, email design, and static and video ads. Services with significant upfront or third-party costs\u2014including Meta Ads, Google Ads, Managed SEO, UGC Videos, and Instagram Growth\u2014aren\u2019t covered.",
      "You can cancel any service anytime to prevent future charges. If you sign up but don\u2019t complete onboarding, your payment remains as credit with no expiration.",
    ],
  },
];

export const finalCta = {
  title: "Your social media could be one less thing to manage.",
  body:
    "Take 20 minutes to see how PostSteer could fit into your business. No pitch deck. No pressure.",
  /* THESE NAME THEIR OWN DESTINATIONS. The primary used to read "Start for
     $69/mo" while opening /demo, and the secondary "Talk to us first" while
     jumping to #faq. Neither did what it said. It also gave the page two
     different links with the identical label "Start for $69/mo", the other
     being the header CTA, which a screen reader announces as one repeated
     choice. A link is a promise about where it goes. */
  primaryCta: "Book a 20-minute demo",
  secondaryCta: "Read the questions first",
};

/**
 * Footer.
 *
 * FIVE LINK COLUMNS, then a city row, then an industry row, then the legal
 * line — the shape the reference uses, and the reason its footer does real
 * SEO work rather than just closing the page. Every href is "#" until the
 * pages behind them exist; they are placeholders in the same way the numbers
 * in brackets are.
 */
export const footer = {
  about:
    "The all-in-one content platform where creatives and software we built ourselves work as one team, shipping standout content faster, and for less, than an agency.",
  status: { label: "all systems operational" },
  columns: [
    {
      title: "Social Media",
      items: [
        "Social Media Management Agency",
        "Social Media Marketing",
        "Short-Form Videos",
        "Social Media Examples",
      ],
    },
    {
      title: "SEO & Content",
      items: [
        "SEO Services",
        "Link Building Services",
        "SEO Blog Writing",
        "Email Design",
      ],
    },
    {
      title: "Company",
      items: [
        "All Services",
        "Pricing",
        "About",
        "Reviews",
        "Case Studies",
        "Compare Us",
      ],
    },
    {
      title: "Resources",
      items: [
        "Blog",
        "Marketing Glossary",
        "Service Areas",
        "Watch Demo",
        "Book a Demo",
        "Refund Policy",
      ],
    },
  ],
  cities: {
    label: "Social media management by city:",
    items: [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Miami",
      "Atlanta",
      "Seattle",
      "Denver",
      "San Diego",
      "Toronto",
      "Vancouver",
      "Montreal",
    ],
    all: "All cities",
  },
  industries: {
    label: "By industry:",
    items: [
      "Restaurants",
      "Real Estate",
      "Dentists",
      "Gyms & Fitness",
      "Law Firms",
      "Salons & Spas",
      "E-commerce",
      "Medical",
      "Car Dealerships",
      "Coaches",
      "Home Services",
    ],
  },
  legal: {
    leadIn: "PostSteer is a",
    linkText: "social media management agency",
    tail: "since 2018.",
    copyrightTail: "Inc. · [US + EU]",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Refunds", href: "/legal/refund-policy" },
    ],
  },
};

/**
 * The sticky demo bar.
 *
 * It appears once "How it works" comes into view and stays for every section
 * below it — the idea being that someone who has read that far is weighing
 * the offer, and someone still in the hero has not asked a question yet.
 */
export const demoBar = {
  title: "Curious how it all works?",
  subline: "Free 20-min demo · see the platform & get your questions answered",
  cta: "Book a demo",
  dismissLabel: "Dismiss",
};

/**
 * The demo page at /demo, where every "Book a demo" button lands.
 *
 * NOTHING IS BOOKED. A static export has no endpoint and no calendar
 * provider, so picking a slot moves to a review state that repeats the
 * choice back and says plainly that the booking backend is missing — the
 * same bargain /pricing/brief makes. A picker that appears to confirm and
 * quietly drops the meeting is the worst possible placeholder.
 */
export const demoPage = {
  seoTitle: "Book a 20-minute demo | PostSteer",
  seoDescription:
    "Pick a time and we will walk through how PostSteer works for your business, recommend the right services, and answer your questions. No pitch deck, no pressure.",
  title: "See how it works for your business",
  intro:
    "In 20 minutes we will learn about your business, recommend the right services, and answer every question. No pitch deck, no pressure.",
  bullets: [
    {
      title: "Real marketers, not AI",
      body: "Designers, copywriters and strategists on your brand. Playbooks refined on every account we run.",
    },
    {
      title: "No contracts, cancel anytime",
      body: "Month to month. Pause or cancel from your dashboard in one click.",
    },
    {
      title: "You stay in control",
      body: "Review and approve everything before it goes live. Revisions included.",
    },
  ],
  booker: {
    /* Printed in the mock window's title bar. */
    window: "Book 20-min demo",
    /* Shown until the component mounts and can read today's date. */
    loading: "Loading available dates",
    prevMonth: "Previous month",
    nextMonth: "Next month",
    todayLabel: "Today",
    pickDate: "Pick a day",
    pickTime: "Pick a time",
    changeDate: "Change day",
    confirm: "Confirm this slot",
    /* The state after both emails are away. */
    confirmedTitle: "You are booked in.",
    confirmedBody:
      "A confirmation is on its way to {email}, and we have your details. Nothing lands in five minutes, check the spam folder.",
    again: "Book another slot",
    timezoneLead: "Times shown in",
    /* Step two: the details taken before the slot is confirmed. NOTHING IS
       POSTED — see the note in components/demo-details-form.tsx. */
    details: {
      changeTime: "Change time",
      name: "Your name",
      email: "Email address",
      goal: "What's the #1 result you're hoping to achieve by working with PostSteer?",
      goalPlaceholder: "Please share anything that will help prepare for our meeting.",
      website: "Website URL (or link to your socials)",
      addGuests: "Add guests",
      guestEmail: "Guest email address",
      addAnotherGuest: "Add another guest",
      removeGuest: "Remove guest",
      countryCode: "Country code",
      phone: "Phone number (Text notifications)",
      phonePlaceholder: "Enter phone number",
      phoneConsent:
        "By entering your phone number you consent to receive SMS messages for this event. SMS rates may apply.",
      smsOptIn:
        "PostSteer can text me about my demo. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms:",
      smsTermsLabel: "poststeer.com/terms",
      smsTermsHref: "/legal/terms",
      submit: "Schedule demo",
      sending: "Sending",
      /* Shown on the form itself: a booking that did not send must not look
         like one that did. */
      sendFailed:
        "That did not send. Try again, or email poststeer@gmail.com and we will put the time in by hand.",
      sendNotConfigured:
        "The email service for this site is not connected yet, so nothing was sent. Email poststeer@gmail.com and we will book the time by hand.",
    },
  },
  reviewsLabel: "Verified review",
  beforeTitle: "Before you book",
  before: [
    {
      question: "What happens during the demo?",
      answer:
        "We learn about your business and goals, walk you through how PostSteer works with a live look at the platform, show examples from your industry, and recommend the right services. It is a conversation, not a hard pitch.",
    },
    {
      question: "How quickly can I get started?",
      answer:
        "Onboarding opens the same day you subscribe. Your first content is usually ready in about a week.",
    },
    {
      question: "Do I need to prepare anything?",
      answer:
        "No. Bring your website and your social handles if you have them. If you already know which services you want, say so and we will spend the time on those instead.",
    },
    {
      question: "Who will I be talking to?",
      answer:
        "Someone from the team who would actually run your account, not a commission-only sales rep.",
    },
    {
      question: "Is there any commitment?",
      answer:
        "None. The demo is free, there is nothing to sign, and plans are month to month if you do go ahead.",
    },
  ],
  trusted: "trusted since 2018",
};

/**
 * The chat launcher.
 *
 * IT SAYS IT IS EMAIL, because it is. A static export has nowhere to keep a
 * conversation, so the panel takes an address and a message and sends them
 * through EmailJS. Every line below is written so a visitor knows the reply
 * lands in their inbox rather than in this window. See lib/chat.ts.
 *
 * NO AGENT PHOTOGRAPH AND NO RESPONSE-TIME PROMISE. The messengers this is
 * modelled on put a face and a "replies within a day" badge in the header.
 * Both are claims. A stock headshot of somebody who does not work here is the
 * same thing as an invented testimonial, and a response time nobody has
 * committed to is worse than saying nothing.
 */
export const chat = {
  label: "Send us a message",
  closeLabel: "Close",
  title: brand.name,
  subtitle: "We answer by email",
  greeting:
    "Ask anything. Pricing, what is included, whether any of this suits the business you run. A person reads it and answers your email, usually the same day we see it.",
  emailLabel: "Your email",
  emailPlaceholder: "you@yourbusiness.com",
  messageLabel: "Message",
  messagePlaceholder: "What would you like to know?",
  send: "Send",
  sending: "Sending",
  sentTitle: "Sent.",
  sentBody:
    "It is in our inbox. The answer comes back to the address you gave, not to this window, so there is nothing to keep open.",
  sendAnother: "Send another",
  errorEmail: "That address does not look right. Check it and try again.",
  errorMessage: "Add a line or two about what you need.",
  errorSend:
    "That did not send. Email us directly and it will reach the same place.",
  /* Shown instead of the form when the build has no EmailJS keys, so the panel
     never silently swallows a message. */
  fallbackBody:
    "The form on this panel is not connected in this build. Email us and it reaches the same people.",
  directEmail: "info@poststeer.com",
  footnote: "We use your address to reply and nothing else.",
};

export const seo = {
  title: "Social Content, Managed | PostSteer",
  description:
    "A managed subscription for social posts, short video and scheduling. Pick your services, send one brief, and we publish on your channels.",
};

/**
 * Instagram Growth and Managed SEO, taken off the whole site for now. Each
 * piece is kept as it was so it can be moved back where it came from:
 * `menuItem` into servicesMenu (Social Media group), `servicePage` into
 * servicePages, `selectGroups` into selectPage.groups (before "One-time
 * add-ons"), and `footerLinks` into the footer's Social Media and
 * SEO & Content columns. (`stepRow` no longer has a home: the how-it-works
 * cards stopped mocking a service picker.)
 */
export const archivedServices = {
  menuItem: {
    slug: "instagram-growth",
    name: "Instagram Growth",
    tagline: "Real, targeted followers",
    price: "$149",
    unit: "/mo",
    icon: "growth",
    planId: "growth",
  } as MenuItem,
  servicePage: {
    "instagram-growth": {
      kicker: "Instagram growth",
      titleLead: "Followers earned by hand,",
      titleAccent: "not bought by the thousand.",
      intro:
        "Manual engagement with the people you actually want following you. No bots, no follow-for-follow, no bought audiences.",
      highlights: [
        "Daily engagement with a defined target audience",
        "Hashtag and keyword research for your niche",
        "Comment replies on weekdays",
        "A monthly report on who arrived and from where",
      ],
      includes: [
        {
          icon: "target",
          title: "A target audience, defined",
          body: "The accounts, topics and tags worth your time, agreed with you before anyone engages with anything.",
        },
        {
          icon: "team",
          title: "Engaged by a person",
          body: "Daily, by hand, from your account. No automation tool holding your login and risking the ban.",
        },
        {
          icon: "search",
          title: "Hashtag and keyword research",
          body: "Refreshed as the niche moves, rather than the same twelve tags pasted under every post for a year.",
        },
        {
          icon: "pencil",
          title: "Comment replies on weekdays",
          body: "Answered in your voice, so the people who did engage get a reason to do it again.",
        },
        {
          icon: "chart",
          title: "Reported monthly",
          body: "Who arrived, from where, and whether they look like customers or like a number going up.",
        },
        {
          icon: "channels",
          title: "No bought audiences",
          body: "Nothing is purchased, inflated or farmed. A follower count that cannot buy anything is a cost, not an asset.",
        },
      ],
      steps: [
        { title: "Target", body: "We agree the accounts and topics worth engaging." },
        { title: "Engage", body: "Manual work, every weekday, logged as it happens." },
        { title: "Report", body: "Monthly numbers, with what to double down on." },
      ],
    },
  } as typeof servicePages,
  selectGroups: [
    {
      title: "Instagram Growth",
      items: [
        {
          id: "growth",
          name: "Instagram Growth",
          icon: "growth",
          description:
            "Real followers through manual engagement with your target audience. No bots, no automation.",
          mode: "add",
          price: 149,
        },
      ],
    },
    {
      title: "Managed SEO",
      items: [
        {
          id: "seo",
          name: "Managed SEO",
          icon: "seo",
          description:
            "Rankings, technical fixes and organic traffic. You pick the budget, we handle strategy, content, backlinks and the technical work.",
          mode: "quantity",
          placeholder: "Select SEO budget",
          options: [
            { label: "Starter - $499/mo", price: 499 },
            { label: "Growth - $999/mo", price: 999 },
            { label: "Aggressive - $1,999/mo", price: 1999 },
          ],
        },
      ],
    },
  ] as ServiceGroup[],
  stepRow: { name: "Managed SEO", price: "$499/mo", icon: "seo" as const },
  footerLinks: { socialMedia: "Instagram Growth", seoContent: "Managed SEO" },
};

/**
 * Taken out of pricing.moreAddOns for now, kept as it was.
 *
 * `podcastClips` and `landingPageBuild` predate the panel's card rows, so they
 * are plain name/price pairs — give them an id, icon and mode (see `AddOn`) to
 * put them back. `paidAds` is already in that shape. Removing paid ads emptied
 * the "Build and grow" group, so that heading went with it; the group has to
 * come back too.
 *
 * `panelHeading` is the copy that sat above the rows, inside the open panel.
 */
export const archivedAddOns = {
  podcastClips: { name: "Podcast or webinar → up to 10 clips", price: "$450 per video" },
  landingPageBuild: {
    name: "Landing page designed and built for your offer",
    price: "from $1,500 one-time",
  },
  paidAds: {
    id: "ads",
    name: "Paid ads setup and management (Meta or TikTok)",
    icon: "ads",
    price: "from $600/month",
    mode: "fixed",
    amount: 600,
    note: "Ad spend is separate.",
  } as AddOn,
  panelHeading: {
    heading: "Separate jobs, separate prices",
    intro:
      "Nothing your plan needs is sold as an extra. Editing, captions and posting are in the price you see. The work below is genuinely different work, so it carries its own price — add it to a plan, or book it on its own.",
  },
};

/**
 * The AI-video note, taken out of the Short-Form Videos info dialog for now.
 * Drop it back in as the `callout` of that service's `details` in
 * pricing.services to bring it back — the dialog renders a callout whenever
 * one is there.
 */
export const archivedAiVideoCallout = {
  title: "AI-generated videos — on request",
  points: [
    "Only made when you ask for one. By default, every video is edited from real footage or premium stock.",
    "Up to 30 seconds long, and each AI video counts toward your monthly video quota.",
    "Standard revision rounds apply. A redo regenerates a fresh variation — often better, but pinpoint edits and unlimited re-rolls aren’t possible.",
    "Expect simple, effective short-form clips, not full commercial productions — exact product and fine-detail accuracy can’t be guaranteed.",
  ],
};

/**
 * THE SERVICE-AREAS PAGE (/service-areas).
 *
 * The page behind the footer's "All cities" link, and the top of the city
 * tree: one card per market, each of which will eventually point at its own
 * "social media management <city>" page. Until those exist the cards link to
 * "#", exactly like the footer row they came from.
 *
 * THE COUNT IS NOT WRITTEN DOWN. "20 cities served" is derived from `cities`
 * in the component, so adding a market cannot leave the label saying twenty.
 */
export const serviceAreas = {
  kicker: "Service areas",
  title: "Social media management, wherever you are.",
  intro:
    "A dedicated team that knows your market. Find done-for-you social media in your city, at the same fixed rate, with no contracts, anywhere in the US and Canada.",
  search: {
    label: "Search your city",
    placeholder: "Search your city…",
    clear: "Clear search",
  },
  /* Reads "20 cities served", or "1 city served" when a search narrows it. */
  count: { one: "city served", many: "cities served", filtered: "matching" },
  cardMeta: "Social media agency",
  empty: {
    title: "No city by that name yet.",
    body: "We work with businesses across the country. Book a demo and we will start yours.",
    cta: "Book a demo",
  },
  cities: [
    "Atlanta",
    "Calgary",
    "Chicago",
    "Connecticut",
    "Denver",
    "Edmonton",
    "Houston",
    "Kansas City",
    "Los Angeles",
    "Miami",
    "Montreal",
    "New Jersey",
    "New York",
    "Ottawa",
    "San Antonio",
    "San Diego",
    "Seattle",
    "Texas",
    "Toronto",
    "Vancouver",
  ],
  cta: {
    kicker: "Begin",
    title: "Don't see your city?",
    body:
      "We work with businesses across the country. Book a demo and we will get you started, wherever you are.",
    primary: "Book a demo",
    secondary: `Start at ${brand.priceFrom}/mo`,
    footnote: [
      `From ${brand.priceFrom}/mo`,
      "cancel anytime",
      "14-day satisfaction guarantee",
    ],
    stats: [
      { value: "Since 2018", label: "Doing this for businesses" },
    ],
  },
  seoTitle: "Service Areas | PostSteer",
  seoDescription:
    "Done-for-you social media in your city. Find your market, or book a demo and we will start one.",
};
