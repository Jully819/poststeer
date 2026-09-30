import { brand, serviceAreas, footer, type WorkIndustry } from "@/lib/content";

/**
 * The two families of landing page: one per city under /service-areas, one
 * per industry under /industries.
 *
 * WHY THIS IS A TEMPLATE AND NOT THIRTY-ONE PAGES. Every one of these sells
 * the same subscription at the same price with the same deliverables; the
 * only honest difference is the noun. So the shell is shared and this file
 * holds what actually changes — the name, the slug, and for industries the
 * handful of specifics that stop eleven pages reading as one page with
 * find-and-replace run over it.
 *
 * NO INVENTED LOCAL FACTS. A city page does not claim an office, a local
 * team, a client count or a case study in that city, because none of those
 * exist. It says what is true everywhere and names the market it is being
 * read in. Inventing "our New York studio" is the one thing that would make
 * these pages a liability rather than an asset.
 */

export function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/* ---------------------------------------------------------------------------
   CITIES. Drawn from the hub page's own list so /service-areas and its
   children can never disagree about which cities exist. */

export const cities = serviceAreas.cities.map((name) => ({ name, slug: slugify(name) }));

export function findCity(slug: string) {
  return cities.find((city) => city.slug === slug);
}

/* ---------------------------------------------------------------------------
   INDUSTRIES. The footer row is the source of the names, and each one carries
   the specifics the shared shell cannot guess. */

export interface IndustryPage {
  name: string;
  slug: string;
  /** Used mid-sentence: "for a restaurant", "your restaurant". */
  singular: string;
  /** Used as the plural subject: "restaurants win on social". */
  plural: string;
  /** Filters the portfolio grid when the library has work in that field. */
  work?: WorkIndustry;
  /** The three things that actually go wrong for this trade. */
  pains: { title: string; body: string }[];
  /** Four reasons the subscription fits this trade specifically. */
  wins: { title: string; body: string }[];
  /** A month of posts this trade could realistically run. */
  checklist: string[];
}

const industryData: Omit<IndustryPage, "slug">[] = [
  {
    name: "Restaurants",
    singular: "restaurant",
    plural: "restaurants",
    work: "food",
    pains: [
      {
        title: "Posting dies on the busy weeks",
        body: "The weeks worth posting about are the weeks nobody has a free hand. The feed goes quiet exactly when the room is full.",
      },
      {
        title: "Phone photos undersell the food",
        body: "A dish that took a chef four years to get right should not go out under a ceiling light at eleven at night.",
      },
      {
        title: "Specials never reach the locals",
        body: "The people who would walk in tonight are three streets away and have never seen the post.",
      },
    ],
    wins: [
      {
        title: "Menu and dish spotlights",
        body: "Designed posts and stories for the dishes you want to move, shot or styled from what you already have.",
      },
      {
        title: "Reels that travel",
        body: "Short vertical cuts of the pass, the prep and the room. The format that still reaches people who do not follow you.",
      },
      {
        title: "Local, not national",
        body: "Copy written for people who can reach your door, with the neighbourhood named rather than implied.",
      },
      {
        title: "Google Business Profile",
        body: "Posts and photos kept current on the listing most people actually see before they book.",
      },
    ],
    checklist: [
      "Dish of the week, shot properly",
      "Behind the pass, one reel",
      "Staff pick and why",
      "This week's specials",
      "A regular's order",
      "Reservations open for the month",
    ],
  },
  {
    name: "Real Estate",
    singular: "brokerage",
    plural: "agents",
    pains: [
      {
        title: "Every listing looks the same",
        body: "Four photos and an address is what everyone posts. Nothing in it says why this one is worth the viewing.",
      },
      {
        title: "The feed stops between listings",
        body: "Nothing to sell this fortnight means nothing posted, and the audience you paid to build forgets you.",
      },
      {
        title: "Sold posts are the only posts",
        body: "A wall of sold boards tells sellers you are busy. It tells buyers nothing at all.",
      },
    ],
    wins: [
      {
        title: "Listing sets, not single photos",
        body: "A carousel per property with the price, the rooms and the reason it will go, laid out to the same template every time.",
      },
      {
        title: "Walkthrough edits",
        body: "Vertical cuts from the footage you already shoot on viewings, captioned so they work on mute.",
      },
      {
        title: "Between-listing content",
        body: "Market notes, neighbourhood guides and process explainers, so the weeks with nothing to sell still post.",
      },
      {
        title: "Just-sold with the numbers",
        body: "Days on market, asking against achieved. The proof a seller is actually looking for.",
      },
    ],
    checklist: [
      "New listing carousel",
      "One walkthrough reel",
      "Neighbourhood guide",
      "Market update with a real figure",
      "Just sold, with days on market",
      "One question sellers keep asking",
    ],
  },
  {
    name: "Dentists",
    singular: "practice",
    plural: "practices",
    pains: [
      {
        title: "Nobody wants to look at teeth",
        body: "Clinical photography scrolls past. The people you want are nervous, and a close-up of a drill does not help.",
      },
      {
        title: "Reception has no time",
        body: "Posting falls to whoever is free, which on any given week is nobody.",
      },
      {
        title: "Private treatments never get explained",
        body: "The treatments worth the most are the ones patients understand least, and the page never gets round to them.",
      },
    ],
    wins: [
      {
        title: "Before and after, handled properly",
        body: "Consented cases presented cleanly, with the claim kept to what the photo actually shows.",
      },
      {
        title: "Meet the team",
        body: "Faces and names, because a nervous patient books a person, not a practice.",
      },
      {
        title: "Treatment explainers",
        body: "One treatment, one post, in plain words: what it is, how long, roughly what it costs.",
      },
      {
        title: "Review-led posts",
        body: "The reviews you already have, set as posts instead of sitting on a listing nobody reads.",
      },
    ],
    checklist: [
      "One treatment explained plainly",
      "Meet a member of the team",
      "A consented before and after",
      "A patient review, set as a post",
      "One myth about a treatment",
      "How to book, and what happens first",
    ],
  },
  {
    name: "Gyms & Fitness",
    singular: "gym",
    plural: "gyms",
    pains: [
      {
        title: "January carries the whole year",
        body: "Six weeks of sign-ups and then a feed that goes quiet until the next January.",
      },
      {
        title: "Members do the posting",
        body: "The content that works is members training, and asking them every week is a job nobody owns.",
      },
      {
        title: "It all looks intimidating",
        body: "Heaviest lifts and leanest bodies reach people who already train. They put off everyone else.",
      },
    ],
    wins: [
      {
        title: "Class and timetable posts",
        body: "The schedule as content, so the thing people actually want to know is never three clicks away.",
      },
      {
        title: "Member stories",
        body: "Real progress from real members, written so the person who has not started yet sees themselves in it.",
      },
      {
        title: "Coach-led short video",
        body: "One movement, done properly, in under thirty seconds. The format that still reaches non-followers.",
      },
      {
        title: "Off-season content",
        body: "A plan for the ten months that are not January, so the feed does not go dark and come back cold.",
      },
    ],
    checklist: [
      "This week's timetable",
      "One movement, coached",
      "A member's progress, with permission",
      "What a first session is actually like",
      "Coach introduction",
      "One myth about training",
    ],
  },
  {
    name: "Law Firms",
    singular: "firm",
    plural: "firms",
    pains: [
      {
        title: "Compliance kills every draft",
        body: "By the time a post has been through review it has been through three partners and is four weeks old.",
      },
      {
        title: "The writing reads like a contract",
        body: "Accurate, careful, and completely unreadable to the person who needed to call you.",
      },
      {
        title: "Referrals are the only channel",
        body: "It works until it does not, and there is nothing built underneath it.",
      },
    ],
    wins: [
      {
        title: "Plain-English explainers",
        body: "One question, one answer, in the words a client would actually use to ask it.",
      },
      {
        title: "Built for review",
        body: "Everything comes to you before it goes live, so the approval step is the normal step rather than an emergency.",
      },
      {
        title: "Practice-area series",
        body: "A run of posts per area, so the page shows what you do rather than that you exist.",
      },
      {
        title: "Partner profiles",
        body: "The people, not the letterhead. Instructions follow a name far more often than a firm.",
      },
    ],
    checklist: [
      "One question answered plainly",
      "A deadline people miss",
      "What a first meeting involves",
      "Partner profile",
      "A change in the law, in two sentences",
      "When not to call a solicitor",
    ],
  },
  {
    name: "Salons & Spas",
    singular: "salon",
    plural: "salons",
    work: "beauty",
    pains: [
      {
        title: "The chair is always full",
        body: "Which is the point, and also why the transformation you just finished never gets photographed.",
      },
      {
        title: "Lighting ruins the work",
        body: "Colour work that took four hours goes out under a warm bulb and looks nothing like the room saw.",
      },
      {
        title: "Quiet weeks arrive unannounced",
        body: "A gap in the book is a gap you find out about on the day, with nothing scheduled to fill it.",
      },
    ],
    wins: [
      {
        title: "Before and after sets",
        body: "Colour-corrected, consistently framed, and captioned with the service and the price.",
      },
      {
        title: "Stylist spotlights",
        body: "Clients book a person. Give each chair a face and a speciality.",
      },
      {
        title: "Treatment menus as content",
        body: "One service per post, with what it involves and what it costs, so the DMs stop being a price list.",
      },
      {
        title: "Fill-the-gap posts",
        body: "Last-minute availability posted as a story the moment a slot opens.",
      },
    ],
    checklist: [
      "One before and after",
      "A stylist and what they are best at",
      "One treatment, priced",
      "Aftercare in three steps",
      "This week's availability",
      "A client review, set as a post",
    ],
  },
  {
    name: "E-commerce",
    singular: "store",
    plural: "stores",
    work: "retail",
    pains: [
      {
        title: "Product shots on repeat",
        body: "The same packshot on a white background, twelve times a month. Nothing to stop a thumb.",
      },
      {
        title: "Ads eat everything",
        body: "Every pound goes to paid, the organic feed goes stale, and the ad account has nothing fresh to test.",
      },
      {
        title: "Launches land flat",
        body: "A drop gets one post on the day and nothing before it, so nobody was waiting.",
      },
    ],
    wins: [
      {
        title: "Product content that is not a packshot",
        body: "Lifestyle, detail and in-use shots built from the product photography you already own.",
      },
      {
        title: "UGC-style short video",
        body: "The format that converts, produced properly rather than begged for from customers.",
      },
      {
        title: "Launch runs",
        body: "A sequence before the drop, on the day and after it, so a launch is a week rather than a post.",
      },
      {
        title: "Creative for the ad account",
        body: "Variants built to be tested, so paid always has something new to put in front of cold traffic.",
      },
    ],
    checklist: [
      "Hero product, styled",
      "One detail shot with the reason it matters",
      "UGC-style short video",
      "Customer review as a post",
      "Restock or drop announcement",
      "A bundle or gifting set",
    ],
  },
  {
    name: "Medical",
    singular: "clinic",
    plural: "clinics",
    pains: [
      {
        title: "Every claim needs checking",
        body: "Regulated copy and a marketing calendar do not naturally get along, and the calendar always loses.",
      },
      {
        title: "Patients arrive already wrong",
        body: "They read something elsewhere. The page that should have answered it never posted.",
      },
      {
        title: "Clinicians have no spare hour",
        body: "The only people qualified to sign off the content are the people with the fullest diaries.",
      },
    ],
    wins: [
      {
        title: "Everything approved before it posts",
        body: "You see every asset first. Nothing goes live on a claim a clinician has not read.",
      },
      {
        title: "Condition explainers",
        body: "One condition, one post, in plain words, staying inside what the evidence supports.",
      },
      {
        title: "Clinician profiles",
        body: "Qualifications and a face, which is what a patient is really checking before they book.",
      },
      {
        title: "Service and pathway posts",
        body: "What you treat, how a referral works, and how long it takes.",
      },
    ],
    checklist: [
      "One condition explained plainly",
      "Meet a clinician",
      "What a first appointment involves",
      "A service and who it is for",
      "One common misconception",
      "How to refer or self-refer",
    ],
  },
  {
    name: "Car Dealerships",
    singular: "dealership",
    plural: "dealerships",
    pains: [
      {
        title: "The forecourt is the only content",
        body: "Stock photos of stock, posted the day it lands, and nothing else all month.",
      },
      {
        title: "Aftersales never gets a mention",
        body: "Service and parts pay the bills and never appear on the page.",
      },
      {
        title: "Nobody films the handover",
        body: "The one genuinely good moment on the site happens weekly and is never captured.",
      },
    ],
    wins: [
      {
        title: "Walkaround video",
        body: "A vertical cut per car, shot to a template, so new stock goes up the day it arrives.",
      },
      {
        title: "Handover moments",
        body: "The keys, the smile, the plate. Consented, edited and posted while it still feels new.",
      },
      {
        title: "Aftersales content",
        body: "Servicing, MOT reminders and parts, which is the revenue the feed usually ignores.",
      },
      {
        title: "Finance explained",
        body: "Plain posts on how the payment actually works, because that is the question holding up the sale.",
      },
    ],
    checklist: [
      "One walkaround video",
      "New arrivals this week",
      "A handover, with permission",
      "Finance explained in plain words",
      "A service or MOT reminder",
      "Meet the sales or service team",
    ],
  },
  {
    name: "Coaches",
    singular: "practice",
    plural: "coaches",
    pains: [
      {
        title: "You are the product",
        body: "Which means nothing gets posted unless you post it, on top of the coaching itself.",
      },
      {
        title: "Everyone sounds the same",
        body: "The same quote cards, the same advice, the same font. Nothing that says why you.",
      },
      {
        title: "Launches depend on a live audience",
        body: "No consistent feed means every cohort starts from a cold list.",
      },
    ],
    wins: [
      {
        title: "Your voice, not a template",
        body: "We work from your recordings and notes, so the posts sound like you rather than like a quote generator.",
      },
      {
        title: "Short video from what you already say",
        body: "One idea per clip, cut and captioned from calls and talks you have already given.",
      },
      {
        title: "Proof, not promises",
        body: "Client outcomes presented with the specifics that make them believable.",
      },
      {
        title: "Cohort runs",
        body: "A build-up sequence before each intake, so a launch has an audience already warmed.",
      },
    ],
    checklist: [
      "One idea, in your own words",
      "A client outcome with a real number",
      "Short video from a recent call",
      "The mistake you see most",
      "Who this is not for",
      "Next cohort dates",
    ],
  },
  {
    name: "Home Services",
    singular: "business",
    plural: "trades",
    pains: [
      {
        title: "The phone is the whole marketing plan",
        body: "It works until the referrals thin out, and by then there is nothing else running.",
      },
      {
        title: "The best photos stay on the van",
        body: "Every job produces a good before and after. It sits on a phone and never goes anywhere.",
      },
      {
        title: "Nobody posts after a twelve-hour day",
        body: "Which is fair, and is also why the page has not been touched since last spring.",
      },
    ],
    wins: [
      {
        title: "Job before and afters",
        body: "The photos you already take, cropped, corrected and captioned into a post that sells the next job.",
      },
      {
        title: "Area-by-area posts",
        body: "Named neighbourhoods, so the people who can actually book you know you work their street.",
      },
      {
        title: "Google Business Profile",
        body: "Kept current with photos and posts, because that listing is where most of these searches end.",
      },
      {
        title: "Review-led content",
        body: "Your reviews turned into posts, which is the only proof that matters in a trade.",
      },
    ],
    checklist: [
      "One job, before and after",
      "An area you covered this week",
      "A review, set as a post",
      "What a call-out actually costs",
      "One thing to check before you call anyone",
      "Meet the person turning up",
    ],
  },
];

export const industries: IndustryPage[] = industryData.map((item) => ({
  ...item,
  slug: slugify(item.name),
}));

export function findIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}

/* The footer's industry row is what people actually click, and its labels are
   the eleven above verbatim. Adding a name there without adding it here would
   ship a link to a 404, so this fails the build instead. */
const missing = footer.industries.items.filter(
  (name) => !industries.some((industry) => industry.name === name),
);
if (missing.length > 0) {
  throw new Error(`lib/landing.ts: no industry page for footer entries: ${missing.join(", ")}`);
}

/* ---------------------------------------------------------------------------
   THE SHARED COPY. One function per family, so a wording change lands on all
   twenty or all eleven at once. */

export function cityCopy(name: string) {
  return {
    kicker: `Social media management · ${name}`,
    titleLead: `Social media agency in ${name},`,
    titleAccent: `from ${brand.priceFrom}/mo.`,
    intro: `Running a business in ${name} is hard enough on its own. Pick the services you need, send one brief, and we write, design, shoot and schedule the content — then publish it on your channels.`,
    stats: [
      { value: "Since 2018", label: "doing this" },
      { value: `${brand.priceFrom}/mo`, label: "to start" },
    ],
    reasonsTitle: `Why ${name} businesses pick us over an agency or DIY.`,
    /* The long-form block at the foot. Four headings, because that is what the
       reference does and because each one answers a different search. */
    prose: [
      {
        heading: `Social media agency in ${name}`,
        body: `We are a social media agency working with ${name} businesses on a monthly subscription rather than a retainer or an hourly rate. You pick the services you want — posts, short-form video, carousels, stories, email, landing pages — and you pay a fixed price per unit with no contract and no minimum term. There is no account manager layer to pay for and no annual commitment to sign. If a month does not work for you, you cancel from the dashboard.`,
      },
      {
        heading: `Social media management for ${name} businesses`,
        body: `Management means the whole loop, not just the posting. We write the copy, produce the creative, send it to you for approval, and publish to the channels you connect. You review everything in one place and either approve it or leave a note asking for a change. Nothing goes live on your accounts without you seeing it first, and we never need your passwords — we are added as a team member on each platform and you can remove that access whenever you like.`,
      },
      {
        heading: `What it costs`,
        body: `Pricing starts at ${brand.priceFrom} a month and is built per unit, so the figure on the estimate is the number of things you asked for multiplied by what each one costs. Add a service and the total moves; remove it and the total moves back. There is no tier you have to jump to in order to unlock a feature, and no setup fee. The full builder is on this page — put your plan together and the price is on screen before you give us an email address.`,
      },
      {
        heading: `Local content, planned for ${name}`,
        body: `Content written for ${name} means naming the place rather than gesturing at it: the neighbourhoods your customers are actually in, the seasons your trade actually turns on, and the events that move your week. We ask for that context in the brief and it shows up in the copy. What we will not do is invent a local presence we do not have — we are a remote team serving businesses across the US and Canada, and the work is the same standard wherever you are reading this from.`,
      },
    ],
  };
}

export function industryCopy(industry: IndustryPage) {
  const { name, singular, plural } = industry;
  return {
    kicker: `Social media management · ${name}`,
    titleLead: "Social media management",
    titleAccent: `for ${plural}.`,
    intro: `Your ${singular} deserves better than an empty feed. Pick the services you need, send one brief, and we write, shoot, design and schedule the content — then publish it on your channels, while you run the ${singular}.`,
    stats: [
      { value: brand.priceFrom, label: "per month, from" },
      { value: "Since 2018", label: "doing this" },
    ],
    painsTitle: `What usually goes wrong for ${plural}.`,
    winsTitle: `Built for how ${plural} actually win on social.`,
    checklistTitle: `Content your ${singular} could be posting this month.`,
    checklistNote: `Pick any of these in the builder below. Everything is produced, approved by you, and scheduled.`,
  };
}
