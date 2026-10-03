import type { BlogPost } from "@/lib/content";

/**
 * CONTENT CALENDAR FOR SOCIAL MEDIA.
 *
 * Target keyword: "content calendar for social media", 30,201 searches a month
 * at competition 21.9 in keyword-clusters-25.csv. The cluster around it is
 * unusually strong, so the secondary terms each own one H2 rather than being
 * sprinkled.
 *
 * ⚠️ THE TOP THREE ARE ALL TOOL VENDORS. SocialPilot at roughly 3,650 words,
 * Sprout Social at roughly 4,200, and Hootsuite at roughly 8,750. Average
 * 5,533, so the band is 4,427 to 6,640. This post sits near the bottom of it.
 * Every one of them sells the scheduler the post recommends, which is why all
 * three spend their length on fields, approval workflows and benefits and none
 * of them says where the posts come from.
 *
 * ⚠️ THE FIELD COUNTS ARE COUNTED OFF THE PAGES, not remembered. Sprout's
 * "core fields every social media content calendar needs" list runs to twelve
 * items. Hootsuite splits its list across scheduling, content and workflow.
 * Both were read on 3 October 2026 and both are linked in the prose.
 *
 * ⚠️ THE HOOTSUITE POSTING FREQUENCIES are theirs, attributed, and quoted as a
 * range rather than as settled fact. The Pew figure is the one sentence Pew's
 * own fact sheet states in prose. The percentages in Pew's chart are rendered
 * in an interactive graphic that could not be read off the page directly, so
 * they are not quoted here.
 *
 * ⚠️ BUSINESS FIGURES come from references/stats.md and nowhere else. The
 * prices, the 2018 start and the 14-day guarantee are confirmed. There are no
 * client counts, turnaround times or results, because none are measured.
 *
 * ⚠️ THE PHOTOGRAPHY IS GENERIC STOCK. None of it is a PostSteer client or a
 * PostSteer calendar. Every frame was opened and looked at, and each alt says
 * what is actually in it rather than what the Pexels caption claimed.
 *
 * NO STORY. Every entry in references/stories.md belongs to Bluente or to
 * another writer. One opinion, carrying the counted field lists as its number.
 */
export const contentCalendarForSocialMedia: BlogPost = {
  slug: "content-calendar-for-social-media",
  title: "A content calendar is a supply problem",
  category: "Planning",
  date: "3 October 2026",
  published: "2026-10-03",
  readTime: "24 min",
  author: "PostSteer",
  authorType: "Organization",
  authorBio:
    "PostSteer has been making and publishing content for other businesses since 2018. This post carries a house byline rather than a named writer. What is in it comes from running calendars for people who have a business to run as well, which is the part the software guides leave out.",
  metaTitle: "Content Calendar for Social Media. Build One in an Hour",
  metaDescription:
    "A content calendar for social media that a one-person business can keep. Four fields, one month at a time, and the thing every other guide leaves out.",
  excerpt:
    "Four columns and a month at a time. The planning is the easy half, and almost every guide to it is written by a company selling the scheduler. What breaks is supply.",

  socialImage:
    "/blog/content-calendar-for-social-media/og-content-calendar-for-social-media-1200x630.jpg",
  hero: {
    src: "/blog/content-calendar-for-social-media/wall-planner-1200.webp",
    srcSet:
      "/blog/content-calendar-for-social-media/wall-planner-800.webp 800w, /blog/content-calendar-for-social-media/wall-planner-1200.webp 1200w",
    sizes: "(min-width: 44rem) 44rem, 100vw",
    alt: "Hands holding a framed whiteboard planner marked with the days of the week, writing in one of the empty boxes.",
    width: 1200,
    height: 800,
    priority: true,
    credit: "RDNE Stock project",
    creditUrl: "https://www.pexels.com/@rdne",
    sourceUrl: "https://www.pexels.com/photo/woman-writing-in-calendar-8581118/",
  },

  keywords: {
    primary: "content calendar for social media",
    secondary: [
      "what is a social media content calendar",
      "what to include in a social media content calendar",
      "how far ahead to plan social media content",
      "how often to post on social media",
      "what to post on social media for a small business",
      "where social media content comes from",
      "social media content calendar template",
      "who manages the social media calendar",
      "falling behind on social media posting",
      "social media content calendar metrics",
    ],
    longTail: [
      "how far ahead should i plan my social media content",
      "what should a social media content calendar include",
      "is a spreadsheet good enough for a content calendar",
      "how often should a small business post on social media",
      "what do i do when i fall behind on my content calendar",
      "how much does it cost to have someone run a content calendar",
    ],
  },

  intro: [
    "A content calendar for social media is a dated list of what goes out, on which platform, made by whom. Four columns covers it. The calendar is the easy half. What breaks is supply, because nobody wrote down where the posts come from.",
    "Every guide to this is published by a company that sells a scheduler. That is not a conspiracy, it is just who has the budget to rank. It does shape the advice. You get twelve fields, an approval workflow and a template. You get no answer to the real question. What goes in row four on a Tuesday when nothing happened that week.",
    "This is the version for a business with no marketing department. What the calendar holds, how far out to plan it, how often to post, where the material comes from, who owns it, and what to do in the month you fall behind. That last one is the month everybody has and nobody writes about.",
  ],

  sections: [
    {
      id: "what-a-content-calendar-is",
      heading: "What a content calendar actually is",
      paragraphs: [
        "It is a dated plan for publishing. It answers three questions and no others. What goes out, when it goes out, and who is making it. Anything else you add is optional and most of it is weight.",
        "It is not a strategy. A strategy decides who you are talking to and why they should care. That work happens once a year, not once a week. The calendar is downstream of it. If you have never written the strategy down, the calendar still helps, because an unexamined plan that ships beats a considered one that does not.",
        "It is also not a scheduler. The scheduler is the software that publishes the post at the time you set. The calendar is the decision about what that post is. Buying the first does not produce the second, which is the quiet reason so many businesses own a scheduling subscription and an empty feed.",
        "The useful way to think about it is as a conversion. An open-ended task becomes an appointment. **Post more on social media** is not a task anybody can do, because it has no end and no start. Film four videos on Thursday morning is a task. A business already knows how to keep an appointment, and most of what a calendar does is turn the first sentence into the second.",
        "It has two shapes and you need both. The month view, which is one page, mostly empty, and tells you whether the shape of the month is right. Then the week view, which is the one you actually work from, with the words written and the file attached. People who keep only the month view never write anything. People who keep only the week view are permanently surprised by Christmas.",
        "There is a smaller benefit that nobody mentions and most people feel first. The calendar ends the daily argument with yourself. No morning spent deciding whether today is a posting day. No evening guilt about the account you have not touched. The decision was made in a quiet hour three weeks ago by a version of you who was not tired. That version was also better at it. Deciding what to post and finding the energy to post it are different tasks. Doing both at once does neither well.",
        "It also makes the work visible to other people. An owner who says we should post more is asking for something nobody can act on. A row with a date and a name on it is a request. That is most of the difference between an intention and a job, and it is why the fourth column matters more than the first three.",
      ],
    },
    {
      id: "the-four-fields",
      heading: "Four fields, not twelve",
      image: {
        src: "/blog/content-calendar-for-social-media/spreadsheet-1200.webp",
        srcSet:
          "/blog/content-calendar-for-social-media/spreadsheet-800.webp 800w, /blog/content-calendar-for-social-media/spreadsheet-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "A laptop on a white desk showing a spreadsheet with a column of names selected, a mouse and a bowl of crackers beside it.",
        width: 1200,
        height: 800,
        credit: "Kampus Production",
        creditUrl: "https://www.pexels.com/@kampus",
        sourceUrl: "https://www.pexels.com/photo/man-using-laptop-7983587/",
      },
      paragraphs: [
        "Sprout Social's [guide to the social media calendar](https://sproutsocial.com/insights/social-media-calendar/) lists twelve core fields it says every calendar needs. Publish date, publish time, platform, post format, caption, creative asset, link and CTA, campaign or content pillar, owner, status, approval notes, tags. Hootsuite's [calendar guide](https://blog.hootsuite.com/how-to-create-a-social-media-content-calendar/) splits a similar list across three groups and adds alt text, pinned comment, expiration date and a paid boost flag.",
        "Both lists are correct and neither is for you. They describe a calendar maintained by someone whose whole job is maintaining it, inside a team where a post passes through two people before it goes live. **A twelve-field calendar is a second job.** The eight fields past the fourth are how the calendar stops being the plan and becomes the work.",
        "That is the opinion and here is the honest half of it. If three people touch a post and one is a compliance review, the approval field is not overhead. It is the thing stopping a claim that somebody later has to retract. A marketing team of five needs the twelve. A bakery with one owner and a part-time assistant needs four, and the twelve will quietly kill the calendar inside two months.",
        "Four fields hold everything a small business decision needs. Date. Platform. What it is. Who makes it. The caption does not live in the calendar, it lives in the post. The asset does not live in the calendar, it lives in a folder named after the date.",
        "There is a fifth field worth adding once you have kept the first four for a quarter, and it is status. Not an approval chain. Three words, which are idea, made, and posted. It exists so that on Monday you can see the gap between what you planned and what exists, and that gap is the only early warning the system gives you.",
      ],
      list: {
        intro: "The whole calendar, in the order the columns go.",
        ordered: true,
        items: [
          "**Date.** The day it goes out. Not a week, a day.",
          "**Platform.** One row per platform. The same idea on two platforms is two rows, because it is two pieces of work.",
          "**What it is.** Six words describing the post. The owner answering the question about delivery times, not a finished caption.",
          "**Who makes it.** A person's name. Never a department, never a blank.",
        ],
      },
    },
    {
      id: "how-far-ahead-to-plan",
      heading: "How far ahead to plan",
      paragraphs: [
        "One month. Two weeks of it written properly, two weeks of it as headings you will fill in later. Plan further than that and you are writing fiction about a business that will have changed by then.",
        "The quarterly calendar is a popular recommendation and it fails for a specific reason. A small business in week nine is not the business that planned week one. The supplier changed, the menu changed, somebody left, the thing you thought would be ready is not ready. A quarter of detailed rows becomes a quarter of rows that are now wrong, and rewriting them is demoralising in a way that makes people abandon the whole system.",
        "What does belong a quarter out is the fixed dates. Those are worth collecting the moment you know them, because they are the only things that cannot move. The seasonal change. The closure. The launch. The thing you do every year that customers already ask about.",
        "Build the month in that order. Fixed dates first, into the empty grid. Then the recurring shape, which is the two or three slots a week you always fill with the same kind of thing. Then whatever is left, which is usually less than you feared and more than you planned for.",
        "Two weeks of detail is a deliberate number and not a soft one. It is long enough that a bad week does not empty the account. It is short enough that you are still planning for the business you have. Anything more detailed than that is work you will do twice.",
        "Set the hour for this and keep it in the same place every month. Last Thursday, an hour, whatever suits. Plan the month on the first available afternoon and you plan it on the eleventh. By then a third of the month is gone.",
      ],
    },
    {
      id: "how-often-to-post",
      heading: "How often to post, by platform",
      paragraphs: [
        "The honest answer is whatever you can keep up for a year. A business posting twice a week for twelve months is ahead of one posting daily for five weeks and then stopping, and the second pattern is far more common than the first.",
        "For a starting point rather than a rule, Hootsuite's [calendar guide](https://blog.hootsuite.com/how-to-create-a-social-media-content-calendar/) suggests three to five feed posts a week on Instagram, one to two a day on Facebook, one to two a day on LinkedIn, three to five a week on TikTok and one a week on Pinterest. Those are the numbers a company with a content team can hit. Read them as the ceiling of the market rather than the floor of your obligation.",
        "Which platforms you owe anything to is a separate question and a shorter one. The Pew Research Center's [social media fact sheet](https://www.pewresearch.org/internet/fact-sheet/social-media/) reports that YouTube and Facebook are the most widely used platforms in the United States, and that half of US adults say they use Instagram. For most local businesses that settles it at two, sometimes three. Everything after the third platform costs a real hour and returns a rounding error.",
        "Posting times matter far less than anyone selling a scheduler suggests. The feeds rank on what people watch, not on what was published at nine. Post when you can. The best hour of the day for a business that misses it is worse than a mediocre hour it hits every week.",
        "Cadence is also not evenly spread. Three posts a week does not mean Monday, Wednesday, Friday forever. It means three, and if the useful thing happens on Tuesday then two of them are Tuesday. The calendar exists to guarantee a floor, not to enforce a rhythm nobody is listening for.",
        "Pick the number you can hit in your worst week of the year rather than your best. August is not the test. The week the main supplier lets you down and someone is off sick is the test, and a calendar that survives that week is a calendar you still have in March.",
      ],
      facts: [
        { label: "A workable week", value: "Three posts, one short video" },
        { label: "Platforms to start", value: "Two, rarely three" },
        { label: "Planning horizon", value: "One month, two weeks detailed" },
        { label: "Planning session", value: "One hour, same day each month" },
        { label: "First review", value: "Three months in" },
      ],
    },
    {
      id: "what-goes-in-the-slots",
      heading: "What goes in the slots",
      paragraphs: [
        "Two rules of thumb circulate and both are worth knowing before you ignore them. The 80-20 rule says four posts in five should inform or entertain and one in five should sell. The rule of thirds splits the week three ways, between your own material, other people's, and talking to the people who reply. SocialPilot's guide carries both, as does most of the market.",
        "They are useful as a check and useless as a plan. Nobody has ever sat down on a Monday and thought of a post that was 80% informative. What you can do is look at a finished month and count. Five promotional rows out of six is a catalogue, and people leave catalogues.",
        "The thing that actually fills slots is a short list of recurring kinds of post. Three or four of them, each one a format you can repeat without thinking. The work of inventing a post from nothing happens once, when you choose the formats. After that you are filling a shape you already know how to fill.",
        "Four formats cover most businesses. The thing you made this week. The question you keep being asked. The person who did the work. The notice, which is the hours, the closure, the new thing on the menu. That last one feels too dull to post and it is reliably the one that gets saved and shared, because somebody needed to know.",
        "Give each format a fixed slot in the week and the calendar mostly writes itself. Tuesday is the question. Thursday is the work. Friday is whatever happened. A format with a home gets made. A good idea with no slot sits in a notes app until it stops being true.",
        "Seasonal and national days are the last resort and they deserve their reputation. A hardware shop posting about International Coffee Day is filling a hole rather than saying anything. If the day genuinely connects to what you sell, use it. If you had to look it up, it is a slot you should have left empty.",
      ],
      list: {
        intro: "The four formats, and what each one is for.",
        items: [
          "**The thing you made.** Proof the work exists, which is the post that answers whether you are any good.",
          "**The question you keep answering.** Already written in your head, already asked by the person reading it.",
          "**The person doing the work.** A face does more for a small business than a logo ever will.",
          "**The notice.** Hours, closures, changes. Dull to write and the most useful thing on the page.",
        ],
      },
    },
    {
      id: "where-the-posts-come-from",
      heading: "Where the posts actually come from",
      image: {
        src: "/blog/content-calendar-for-social-media/filming-the-product-1200.webp",
        srcSet:
          "/blog/content-calendar-for-social-media/filming-the-product-800.webp 800w, /blog/content-calendar-for-social-media/filming-the-product-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "A phone mounted inside a ring light, filming a woman who is sitting in front of a clothes rail.",
        width: 1200,
        height: 675,
        credit: "Hanna Pad",
        creditUrl: "https://www.pexels.com/@anna-nekrashevich",
        sourceUrl:
          "https://www.pexels.com/photo/a-woman-video-recording-herself-using-a-cellphone-camera-12432832/",
      },
      paragraphs: [
        "Here is the step every guide skips. All three of the pages ranking above this one say to research and brainstorm your content, then move straight to scheduling it. Brainstorming is not a supply. It produces a list of titles, and a list of titles is what a calendar already is.",
        "A post needs a photograph, or a video, or something true that somebody said. None of those exist because you wrote a row in a spreadsheet. They exist because somebody pointed a camera at something on a specific morning, and that morning has to be in the calendar too.",
        "So put the capture session in first, before the posting slots. One session a month, an hour, with a list of what you are filming written before you start. That hour is the input the whole month runs on, and we have [written about it on its own](/blog/one-recording-a-month) because it is the single change that rescues the most stalled accounts.",
        "An hour produces more than people expect. Eight to twelve short clips, if you work from a list. The stills you take between takes. The written posts that come out of the same answers you gave on camera. What it does not produce is anything at all if you turn up without the list. Forty minutes of rambling yields two usable clips and a strong feeling that filming does not work for you.",
        "The second source is the work itself, and it costs nothing. Whatever your business did today, somebody photographed badly on a phone. The delivery that arrived, the repair halfway through, the room before service. Three photographs a day, from whoever is already standing there, into one shared folder. Build that habit and the calendar stops being a list of things you owe. It becomes a list of things you already have.",
        "The third source is the question you keep answering. Every business has four or five of them. They arrive by phone, in the shop, in the inbox, and the answers are already written in your head because you have given them a hundred times. Each one is a post, and in most cases a [short video](/services/short-form-videos) that will outlive the week it was made in.",
      ],
      list: {
        intro: "What one capture session should leave you holding.",
        items: [
          "Eight to twelve vertical clips, each answering one question.",
          "A folder of stills from the same hour, named by date.",
          "Two or three written posts drawn from what you said out loud.",
          "The next session already in the calendar.",
        ],
      },
    },
    {
      id: "spreadsheet-or-tool",
      heading: "A spreadsheet or a scheduling tool",
      paragraphs: [
        "A spreadsheet is enough and will stay enough for longer than anybody selling software would like. Four columns, one tab per month, shared with whoever else needs it. Google Sheets does this for nothing and has the advantage that it opens on a phone in the car park.",
        "Notion suits people who already live in Notion and nobody else. The same is true of Trello, Airtable and every project tool. The rule is that the calendar lives where the person who owns it already works. A calendar in a system somebody has to remember to open is a calendar that gets opened in week one and abandoned in week three.",
        "Scheduling tools are a different purchase and worth making later. Meta Business Suite schedules Instagram and Facebook for nothing, which covers most small businesses completely. Buffer, Later and Hootsuite add the other platforms and a queue, and they earn their fee at the point where publishing by hand across three platforms has become a real weekly chore.",
        "What scheduling tools are bad at is the month. Their calendar view shows you what is already written and scheduled, which means it shows you the past tense of your plan. The empty Thursday three weeks out, which is the only thing you need to see while planning, is invisible in most of them. Keep the planning document separate from the publishing queue even after you are paying for the queue.",
        "One warning about shared documents. Two versions of a calendar is the same as no calendar. One lives on a laptop. One lives in a group chat. Nobody knows which is true, and the rows that go missing are always the ones somebody assumed were handled. Pick the copy that is correct and delete the other one today.",
        "Templates are worth about ten minutes of your time. Download one if it helps you start, then delete the columns you will not fill in by the second week. Nobody has ever been held back by the layout of their calendar. They have been held back by having nothing to put in it.",
      ],
    },
    {
      id: "who-owns-the-calendar",
      heading: "Somebody has to own it",
      image: {
        src: "/blog/content-calendar-for-social-media/owner-at-the-laptop-1200.webp",
        srcSet:
          "/blog/content-calendar-for-social-media/owner-at-the-laptop-800.webp 800w, /blog/content-calendar-for-social-media/owner-at-the-laptop-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "A woman leaning over a desk writing on a clipboard beside a laptop, surrounded by cardboard boxes and a rail of clothes.",
        width: 1200,
        height: 801,
        credit: "Kampus Production",
        creditUrl: "https://www.pexels.com/@kampus",
        sourceUrl:
          "https://www.pexels.com/photo/woman-standing-among-cardboard-boxes-and-writing-on-a-piece-of-paper-on-a-desk-with-a-laptop-7857557/",
      },
      paragraphs: [
        "One name, written down, who is responsible for the calendar being full. Not the team. A team owning a calendar means nobody owns it, and the way you find out is in week six when you notice nothing has gone out since week four.",
        "Owning the calendar and making the posts are two different jobs and can be two different people. The owner's job is to notice the empty rows and chase them. It takes about fifteen minutes a week and it is the job that keeps the system alive. The making is the longer task and is the one that is easiest to hand to somebody else.",
        "The approval workflow that the software guides describe assumes an approver. Most small businesses do not have one and should not invent one. An approval step staffed by the person who wrote the post is a delay with no reviewer in it. If you are the only one, publish the thing. The cost of a slightly clumsy post is almost always lower than the cost of a post that never went out.",
        "If you do bring in help, be specific about where the boundary falls. Somebody who edits video is not somebody who publishes it, and the two jobs stop at different points in the week. We have [written about that gap before](/blog/posting-is-the-hard-part), because a folder of finished files is where a great many of these arrangements quietly end.",
        "Handing it over properly takes one conversation and most people skip it. Say which four formats are yours. Say what you will never post. Say who answers a comment that needs an actual answer. Ten minutes of that saves a month of posts that are technically correct and sound like nobody who works there.",
        "The last part of owning it is the standing hour. Not the planning session, which is monthly, but a weekly slot where the owner looks at the next seven rows and confirms the material exists. Fifteen minutes on a Monday. It is the dullest recurring meeting in the business and it is the one that decides whether any of this works.",
      ],
    },
    {
      id: "when-you-fall-behind",
      heading: "When you fall behind",
      image: {
        src: "/blog/content-calendar-for-social-media/sticky-note-planning-1200.webp",
        srcSet:
          "/blog/content-calendar-for-social-media/sticky-note-planning-800.webp 800w, /blog/content-calendar-for-social-media/sticky-note-planning-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "Yellow sticky notes on a plain wall, one reading work harder and another reading we need to become bigger.",
        width: 1200,
        height: 800,
        credit: "Tima Miroshnichenko",
        creditUrl: "https://www.pexels.com/@tima-miroshnichenko",
        sourceUrl:
          "https://www.pexels.com/photo/sticky-notes-with-written-messages-posted-on-the-wall-6913186/",
      },
      paragraphs: [
        "You will fall behind. Not might. The quarter where the business gets busy is the quarter the calendar goes unfilled, and that is true of everybody who has ever kept one. None of the guides mention it, which leaves people assuming the failure is theirs alone.",
        "The rule is that you do not backfill. Two weeks of unpublished rows are gone. Publishing them late is worse than not publishing them. A flurry of six posts in a day reads as an apology, and it pushes the one that mattered off the screen. Draw a line at today and start from the current week.",
        "Then cut the cadence rather than abandoning it. Three a week becomes one a week for a month. One is a functioning account. Zero is a dead one, and the distance between one and zero is far larger than the distance between one and three. Most people do the opposite, which is to keep the ambitious number on paper and hit none of it.",
        "If you fall behind twice in a row, the number was wrong rather than the week. Two consecutive failed months is the system telling you what you can actually sustain, and the honest response is to lower the target permanently rather than to resolve to try harder. Trying harder is not a plan and it has never once survived a busy spring.",
        "Say nothing about it when you come back. No post apologising for the gap. No explanation of how busy things have been. Almost nobody noticed, and the ones who did will not care. An account that returns quietly reads as a business that was working. An account that returns with an apology reads as a business that was not.",
        "Keep the capture session even in the month you post nothing. It is an hour, it is cheap, and it means the recovery costs you one afternoon of editing rather than a restart from empty. The businesses that come back fastest are the ones who kept filming while they stopped posting.",
      ],
    },
    {
      id: "knowing-whether-it-worked",
      heading: "Knowing whether it worked",
      paragraphs: [
        "Judge the calendar on the business, not on the feed. The question is whether more of the right people got in touch this quarter than last. Everything the platform shows you is a proxy for that, and some of the proxies are very poor.",
        "Followers are not the measure and neither are likes. An account with four thousand followers and a quiet phone has an audience. It enjoys the posts. It is not buying anything. That is a perfectly nice outcome and it is not the one you built the calendar for.",
        "Three numbers are worth watching and all three are dull. Profile visits, taps on the link, and what new customers say when you ask how they found you. The third one needs a human to ask and is worth more than the other two together, which is inconvenient and true.",
        "Give it a season. A month of data mostly measures the month, and small businesses move with weather, holidays and whatever is happening locally. Three months tells you something real. One post that does unusually well tells you nothing at all, which is the hardest sentence in this post to accept on the morning after a post does unusually well.",
        "Then act on the boring finding rather than the exciting one. If the rows that produce enquiries are the opening hours and the photograph of the empty room, make more of those. The feed is not the product.",
        "Put the review date in the calendar on the day you start it. Three months out. One hour. It is not a decision about whether social media works, which is already settled by the fact that your customers are on it. It is a decision about whether yours is working, and what specifically is in the way.",
        "Most of the time the answer is dull and fixable. Nobody owned it. The capture session never happened. The number was too high for the season. Those are supply problems and they have supply answers. Very occasionally the answer is that the platform was wrong, and you find that out by asking customers rather than by reading a chart.",
        "When the calendar is worth keeping and nobody in the building has the hour, that is the work we do. [Social posts](/services/social-media-posts) are **$69 a month for ten** and [short-form video](/services/short-form-videos) is **$129 a month for five**, planned, made and published. The whole [price](/pricing) is visible before you talk to anyone, and the first fourteen days are refundable if the first batch is wrong.",
      ],
    },
  ],

  faqs: [
    {
      question: "How far ahead should I plan my social media content?",
      answer:
        "One month, with the first two weeks written properly and the rest held as headings. Further out than that and you are planning for a business that will have changed by the time you get there. Fixed dates like closures, launches and seasonal changes are worth collecting a quarter ahead, because those are the only things that cannot move.",
    },
    {
      question: "What should a social media content calendar include?",
      answer:
        "Date, platform, what the post is, and who is making it. Four columns is enough for a business without a marketing team. Vendor guides list twelve or more fields, which suits a team passing work through an approval chain and quietly kills a one-person calendar inside two months.",
    },
    {
      question: "Is a spreadsheet good enough for a content calendar?",
      answer:
        "Yes, and it stays good enough for far longer than the software market suggests. One tab per month in Google Sheets, shared with anyone who needs it, opens on a phone and costs nothing. Scheduling tools are a separate purchase that earns its fee when publishing by hand across three platforms has become a weekly chore.",
    },
    {
      question: "How often should a small business post on social media?",
      answer:
        "Pick the number you can hit in your worst week of the year, not your best. Three posts a week on one platform, kept for a year, beats daily posting that stops after five weeks. Hootsuite suggests three to five feed posts a week on Instagram and one to two a day on Facebook, which is the ceiling a team with staff can hit rather than a floor you owe anyone.",
    },
    {
      question: "What do I do when I fall behind on my content calendar?",
      answer:
        "Draw a line at today and start from the current week. Do not publish the backlog, because six posts in one afternoon reads as an apology and buries the one that mattered. Then cut the cadence rather than abandoning it, since one post a week is a functioning account and zero is a dead one.",
    },
    {
      question: "How much does it cost to have someone run a content calendar?",
      answer:
        "Agencies in North America generally charge from several hundred to a few thousand dollars a month for a small business, and most of that range reflects strategy and account management rather than the number of posts. Our own social posts start at $69 a month for ten and short-form video at $129 a month for five, planned and published rather than delivered to a folder. The price is on the page before you speak to anyone.",
    },
  ],
};
