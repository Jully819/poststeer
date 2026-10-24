import type { BlogPost } from "@/lib/content";

/**
 * SINGLES DAY MARKETING ON XIAOHONGSHU.
 *
 * Target keyword: "singles day marketing". ⚠️ NOT IN EITHER KEYWORD FILE, same
 * as the October Xiaohongshu post. No Singles Day, Double 11, 11.11 or
 * Chinese-platform term appears in keyword-clusters.csv or
 * keyword-clusters-25.csv. The owner named the topic.
 *
 * ⚠️ DELIBERATELY NOT "XIAOHONGSHU MARKETING". That keyword already belongs to
 * lib/posts/xiaohongshu-marketing-for-small-business.ts, published 5 October
 * 2026. Two posts on one term compete and the newer one usually loses, so this
 * one is aimed at the seasonal query and hands the platform primer off to that
 * post by link. The overlapping section here is kept deliberately short for
 * the same reason.
 *
 * ⚠️ THE DATES ARE COMPUTED. Singles Day is Wednesday 11 November 2026,
 * checked against the calendar on 24 October 2026, which is eighteen days
 * before it.
 *
 * COMPETITORS READ ON 24 OCTOBER 2026. Shopify's Singles Day guide, about
 * 1,200 words and dated September 2021. KAWO, about 2,000 words and built on
 * the 2022 calendar. iClick, about 600 words. Average about 1,267, so the band
 * is 1,013 to 1,520. These pages are short and several are stale, which is why
 * this one is short too rather than padded past them.
 *
 * ⚠️ FOUR COMPETITOR PAGES COULD NOT BE READ and were replaced rather than
 * quietly skipped. CBBC served a certificate that does not match its hostname.
 * ADA Global is blocked at the network. Retail TouchPoints returned 403. DHL
 * timed out. iClick is the third page because those four failed.
 *
 * THE GAP. Every one of the three assumes a China e-commerce presence.
 * Shopify's page never mentions Xiaohongshu at all. KAWO and iClick both
 * assume a Tmall, Taobao or JD store to send people to. None of them answers
 * what a brand with no mainland entity and no marketplace listing can do, and
 * that is the whole back half of this post.
 *
 * ⚠️ EVERY FIGURE BELONGS TO A THIRD PARTY AND IS ATTRIBUTED IN THE PROSE.
 * iClick's four phases and its seeding start of 20 September. KAWO's 2022
 * platform pre-sale dates, flagged in the text as a 2022 calendar rather than
 * this year's. Shopify's 90 per cent mobile figure, which Shopify attributes
 * to Marketing Dive and which sits on a page dated 2021, so it is given with
 * both caveats.
 *
 * ⚠️ NOT USED, BECAUSE NOT VERIFIED AT SOURCE. The 1.7 trillion yuan and 17.6
 * per cent 2025 growth figures reached me through a search summary of
 * eMarketer quoting Syntun, three hands from the data. The 3.6x product-note
 * GMV claim came the same way from a secondary summary of a Xiaohongshu
 * report. Neither is in this post.
 *
 * ⚠️ NO SHENZHEN OR HONG KONG CLAIM. The brief for this post suggested leaning
 * on one. references/stats.md confirms no office, staff or presence anywhere,
 * and lib/content.ts lists thirteen North American service areas and no Asian
 * ones. Claiming a China-side edge would be inventing a credential, so the
 * post rests on the Chinese-language service and the Chinese-language pages
 * that do exist.
 *
 * ⚠️ BUSINESS FIGURES come from references/stats.md only. The Chinese social
 * media service is quoted from a brief and has no price, so none is given.
 *
 * ⚠️ THE PHOTOGRAPHY IS GENERIC STOCK and none of it is Chinese, a Xiaohongshu
 * screen or a client. The first hero the script returned was a European street
 * scene, which would have implied a place the photograph is not of, so it was
 * refetched for something placeless.
 *
 * NO STORY. Every entry in references/stories.md belongs to someone else. One
 * opinion, carrying iClick's 20 September seeding date as its number.
 *
 * NO "WHO THIS IS NOT FOR" SECTION. Settled by the owner on 3 October 2026.
 */
export const singlesDayMarketingXiaohongshu: BlogPost = {
  slug: "singles-day-marketing-xiaohongshu",
  title: "Singles' Day without a store in China",
  category: "Distribution",
  date: "24 October 2026",
  published: "2026-10-24",
  readTime: "8 min",
  author: "PostSteer",
  authorType: "Organization",
  authorBio:
    "PostSteer has been making and publishing social content for other businesses since 2018, and writes Xiaohongshu notes in Simplified Chinese for brands selling into China. This post carries a house byline rather than a named writer. Every platform figure in it is credited to the guide it came from.",
  metaTitle: "Singles Day Marketing With No Store in China. A Guide",
  metaDescription:
    "Singles day marketing for a brand with no Tmall listing and no mainland entity. What the phases are, what a Xiaohongshu note looks like, and what to do now.",
  excerpt:
    "Every guide to 11.11 assumes you already sell in China. This is the version for a brand that does not, written three weeks out, when the seeding window has already closed and there is still work worth doing.",

  socialImage:
    "/blog/singles-day-marketing-xiaohongshu/og-singles-day-marketing-xiaohongshu-1200x630.jpg",
  hero: {
    src: "/blog/singles-day-marketing-xiaohongshu/photographing-the-note-1200.webp",
    srcSet:
      "/blog/singles-day-marketing-xiaohongshu/photographing-the-note-800.webp 800w, /blog/singles-day-marketing-xiaohongshu/photographing-the-note-1200.webp 1200w",
    sizes: "(min-width: 44rem) 44rem, 100vw",
    alt: "A phone clamped to a stand, angled down over a wooden board, with a large green leaf behind it.",
    width: 1200,
    height: 800,
    priority: true,
    credit: "Lisett Kruusimäe",
    creditUrl: "https://www.pexels.com/@lisettkruusimae",
    sourceUrl: "https://www.pexels.com/photo/smartphone-on-mount-captures-artistic-setup-30173139/",
  },

  keywords: {
    primary: "singles day marketing",
    secondary: [
      "what is singles day 11.11",
      "singles day for overseas brands",
      "xiaohongshu singles day campaign",
      "xiaohongshu note vs instagram post",
      "selling to chinese shoppers without tmall",
      "what to do after singles day",
    ],
    longTail: [
      "when is singles day 2026",
      "can i sell on singles day without a tmall store",
      "is three weeks enough to prepare for singles day",
      "what does a xiaohongshu note look like",
      "do i need to post in chinese for singles day",
      "is singles day bigger than black friday",
    ],
  },

  intro: [
    "Singles day marketing is a seven-week job and almost every guide to it is written for a brand that already sells in China. Singles' Day is Wednesday 11 November 2026. If you have no Tmall listing and no mainland company, most of that advice does not apply to you, and some of it is still worth doing.",
    "The honest position first. You are not going to win 11.11 from a standing start. iClick's breakdown of the platform's own campaign phases puts the seeding stage opening on 20 September, which is seven weeks out. **Three weeks before the day, the window the big brands used has already closed.**",
    "What is left is still worth the hours, because the demand does not switch off on the twelfth. This is what the phases actually are, what a Xiaohongshu note looks like beside an Instagram post, and what three weeks of work buys you.",
  ],

  sections: [
    {
      id: "what-you-can-actually-do",
      heading: "What an overseas brand can actually do",
      paragraphs: [
        "Start by separating two things the guides treat as one. Selling into China and being visible in China are different projects.",
        "Selling needs an entity, a listing and a logistics chain behind it. [KAWO's Double 11 guide](https://kawo.com/en/blog/how-to-plan-and-execute-a-winning-double-11-strategy) and iClick both assume that chain exists. That is months of work. It is not a November decision.",
        "Being visible is cheaper. It starts the day you publish. Chinese shoppers research on Xiaohongshu before they buy anywhere, including abroad and through cross-border channels that exist whether or not you set them up. A brand with nothing on the platform returns no results when somebody searches its name in Chinese.",
        "That is the realistic goal for November. Not a campaign. A presence that answers the question a searcher is already asking, so the demand has somewhere to land.",
        "It changes the measure too. Nobody should be counting sales on the twelfth. Count whether your name returns notes rather than nothing, and whether anyone asked a question underneath them.",
      ],
    },
    {
      id: "the-dates-that-matter",
      heading: "The dates that matter",
      paragraphs: [
        "Singles' Day is 11 November and the sale is not one day. [iClick's account of the Xiaohongshu calendar](https://www.i-click.com/resources/unboxing-chinas-digital-trends-xiaohongshu-leads-the-double-11-gadget-boom/) splits it into four stages. Seeding from 20 September, pre-heat in mid-October, a peak from late October to early November, and an extension through the second half of the month.",
        "The extension stage is the one that matters most to anybody arriving late, and it is the one every guide gives the least space to. Buying carries on well past the eleventh, and the notes that get read in the second half of November are the ones about what people actually bought.",
        "The marketplace pre-sale dates move every year. They still show the shape. KAWO records that in the 2022 cycle Kuaishou opened pre-sales on 13 October, JD and Pinduoduo on the 20th, and Tmall and Douyin on the 24th. That is a 2022 calendar, not this year's. By the time the day arrives, weeks of buying have already happened.",
        "So the practical reading is that you are not late for the extension. You are late for the part you could not have done anyway.",
      ],
      facts: [
        { label: "Singles' Day 2026", value: "Wednesday 11 November" },
        { label: "Seeding stage opens", value: "Around 20 September, per iClick" },
        { label: "Peak stage", value: "Late October to early November" },
        { label: "Extension stage", value: "The second half of November" },
        { label: "Realistic goal from here", value: "A presence, not a campaign" },
      ],
    },
    {
      id: "what-a-note-looks-like",
      heading: "What a note looks like beside an Instagram post",
      image: {
        src: "/blog/singles-day-marketing-xiaohongshu/flat-lay-product-1200.webp",
        srcSet:
          "/blog/singles-day-marketing-xiaohongshu/flat-lay-product-800.webp 800w, /blog/singles-day-marketing-xiaohongshu/flat-lay-product-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "Three unlabelled white squeeze bottles arranged on a cream coloured fabric, shot from above.",
        width: 1200,
        height: 800,
        credit: "Cup of Couple",
        creditUrl: "https://www.pexels.com/@cup-of-couple",
        sourceUrl: "https://www.pexels.com/photo/squeeze-bottles-on-a-fabric-8049849/",
      },
      paragraphs: [
        "The short version, because [we have written the long one already](/blog/xiaohongshu-marketing-for-small-business). A note is closer to a short review than to a photograph with a caption.",
        "The cover image carries text. On Instagram, text burned into the image reads as an advert. On Xiaohongshu it reads as a title, because that is what the format is, and a cover with nothing written on it gives a browsing reader no reason to tap.",
        "The body is long by Instagram standards. A paragraph or several, first person, honest about the parts that are not perfect. Posts that read as marketing get scrolled past.",
        "It is also a search engine. That is the difference that trips up most Western brands. People type a category and a problem into it the way they would into Google. The words matter as much as the picture. A note in English returns nothing for anybody searching in Chinese.",
        "For 11.11 the format that performs is the shopping list. iClick describes native storytelling built on real experience, and the agency guides agree that a list of what to buy, with reasons, beats a single product advert. A brand can write one about its own range, as long as it says that is what it is.",
      ],
    },
    {
      id: "three-weeks-of-work",
      heading: "Three weeks of work, in order",
      image: {
        src: "/blog/singles-day-marketing-xiaohongshu/bags-and-phone-1200.webp",
        srcSet:
          "/blog/singles-day-marketing-xiaohongshu/bags-and-phone-800.webp 800w, /blog/singles-day-marketing-xiaohongshu/bags-and-phone-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "A paper gift bag, a bank card and a phone reading Shop now, laid out on a green background.",
        width: 1200,
        height: 800,
        credit: "Nataliya Vaitkevich",
        creditUrl: "https://www.pexels.com/@n-voitkevich",
        sourceUrl: "https://www.pexels.com/photo/smartphone-on-green-background-6214362/",
      },
      paragraphs: [
        "Three weeks buys a small library and somebody to answer the comments. Reasonable to own by the end of November. Unreasonable to expect sales from by the eleventh.",
        "Write five or six notes rather than one. One brand introduction, three on individual products, and one shopping list that puts them together. Written in Simplified Chinese from the brief rather than translated, because a translated English post reads as exactly that.",
        "Decide where the buying happens before you publish, and say so in the note. Your own site with international shipping, with the shipping time given honestly. Or a stockist, named. A note that strands the reader is worse than no note.",
        "Then stay for the comments. The questions underneath are the mechanism, and they arrive in Chinese. Somebody has to answer within a day or two. That person has to exist before you publish.",
        "What we do is the writing and the design, in Simplified Chinese, handed to you ready to publish from your own account. The service page sets out [how Chinese social media posts work](/services/chinese-social-media-posts) and why we hand over rather than publish. There are also [Chinese-language versions of this site](/zh) if you want to see the writing before commissioning any.",
      ],
      list: {
        intro: "What three weeks should leave you holding.",
        ordered: true,
        items: [
          "**Five or six notes**, written in Chinese, not translated.",
          "**One shopping list note**, which is the format the season rewards.",
          "**A named destination**, with an honest shipping time next to it.",
          "**Somebody who answers comments**, in Chinese, within a day or two.",
        ],
      },
    },
    {
      id: "after-the-eleventh",
      heading: "After the eleventh",
      paragraphs: [
        "Keep publishing through the extension stage. The second half of November is when people post what arrived and search for what they nearly bought. It is the cheapest attention in the cycle, because the brands with budgets have stopped spending.",
        "Mobile is the whole of it. Obvious, and still missed. [Shopify's Singles' Day guide](https://www.shopify.com/blog/how-to-prepare-for-the-largest-selling-holiday-singles-day) cites ninety per cent of purchases made on phones, attributed to Marketing Dive, on a page dated 2021. Old, and nobody expects the direction to have reversed. If your site is slow on a phone over a Chinese connection, that is the thing to fix before you write anything.",
        "Then look at the right number. Not sales. Whether a search for your brand name in Chinese returns notes, how many questions arrived, and what they asked about. The questions are the most useful thing 11.11 will give a brand that arrived late, because they tell you what next year's notes should answer.",
        "Start the next one in September. That is the real lesson of the calendar, and it is the one thing on this page that costs nothing to act on.",
      ],
    },
  ],

  faqs: [
    {
      question: "When is Singles' Day 2026?",
      answer:
        "Wednesday 11 November 2026. The shopping period runs much longer than the day itself, with marketplace pre-sales opening in the second half of October and buying continuing well into the second half of November.",
    },
    {
      question: "Can I sell on Singles' Day without a Tmall store?",
      answer:
        "Not into the marketplace event itself, which needs an entity and a listing behind it. You can still be visible to the people shopping, through your own site with international shipping or through a stockist. Say which one in the note, because interest with nowhere to go is wasted.",
    },
    {
      question: "Is three weeks enough to prepare for Singles' Day?",
      answer:
        "Not to run a campaign. iClick puts the platform seeding stage as opening around 20 September, seven weeks ahead, so the window the larger brands used has closed. Three weeks is enough to build a small library of notes and be present for the extension stage, which runs through the second half of November.",
    },
    {
      question: "What does a Xiaohongshu note look like?",
      answer:
        "Closer to a short review than an Instagram post. The cover image carries a written title, the body runs to a paragraph or more in the first person, and honest detail outperforms polish. It also works as a search engine, so the words carry as much weight as the picture.",
    },
    {
      question: "Do I need to post in Chinese for Singles' Day?",
      answer:
        "Yes, in Simplified Chinese, and written rather than translated. People search the platform in Chinese, so an English note returns nothing for the queries that matter. A translated English post also reads as translated, which is the opposite of the register the platform rewards.",
    },
    {
      question: "Is Singles' Day bigger than Black Friday?",
      answer:
        "By transaction volume it is generally reported as the larger event, though the figures circulating come through several hands and are worth checking at source. The more useful difference is structural. Singles' Day runs for weeks rather than a weekend, so arriving late costs you less.",
    },
  ],
};
