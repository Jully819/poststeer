import type { BlogPost } from "@/lib/content";

/**
 * SOCIAL MEDIA MARKETING FOR RESTAURANTS.
 *
 * The first vertical post. The framework is meant to be run again for
 * dentists, law firms, home services and the rest of lib/landing.ts, each one
 * feeding an industry page that already exists and currently has nothing
 * pointing at it.
 *
 * ⚠️ THE STATISTICS COME FROM THE PRIMARY SOURCE, NOT A SUMMARY. A search
 * result attributed "90% of restaurants" and "9.9% revenue" to Sprout Social.
 * Neither number is on that page. The 9.9% and 14.1% figures are real and
 * belong to Deloitte Digital, read off Deloitte's own page and attributed to
 * it here. The TikTok figure is Sprout quoting an MGH survey and is attributed
 * that way, second hand, because that is what it is.
 *
 * ⚠️ BUSINESS FIGURES ARE NOW ALLOWED and used. references/stats.md exists as
 * of 30 September 2026 and confirms the prices, the 2018 start and the 14-day
 * guarantee. Quote those exactly. Nothing else about the business is claimed,
 * and there are still no client counts or results, because none are measured.
 *
 * ⚠️ THE PHOTOGRAPHY IS GENERIC STOCK of other people's kitchens and dining
 * rooms. None of it is a PostSteer client. Each alt describes what is actually
 * in the frame, and every frame was opened and looked at rather than trusted
 * from the Pexels caption. Two queries returned the same photograph, which is
 * why the fourth one was refetched.
 *
 * NO STORY. Every entry in references/stories.md belongs to Bluente or to
 * another writer. One opinion, carrying the Deloitte spread as its number.
 */
export const socialMediaMarketingForRestaurants: BlogPost = {
  slug: "social-media-marketing-for-restaurants",
  title: "Nobody on the roster is holding the camera",
  category: "Industry",
  date: "1 October 2026",
  published: "2026-10-01",
  readTime: "18 min",
  author: "PostSteer",
  authorType: "Organization",
  authorBio:
    "PostSteer has been making and publishing content for other businesses since 2018, restaurants among them. This post carries a house byline rather than a named writer. What is in it comes from the parts of the job that go wrong, which are rarely the parts about cameras.",
  metaTitle: "Social Media Marketing for Restaurants. What Works",
  metaDescription:
    "Social media marketing for restaurants, from someone who has to publish it. What to film, why your dining room light ruins it, and who actually holds the phone.",
  excerpt:
    "Most restaurant social media fails on a rota, not on a camera. The food is fine. The ideas are fine. What is missing is a named person, a time in the week, and a room bright enough to film in.",

  socialImage:
    "/blog/social-media-marketing-for-restaurants/og-social-media-marketing-for-restaurants-1200x630.jpg",
  hero: {
    src: "/blog/social-media-marketing-for-restaurants/chef-plating-1200.webp",
    srcSet:
      "/blog/social-media-marketing-for-restaurants/chef-plating-800.webp 800w, /blog/social-media-marketing-for-restaurants/chef-plating-1200.webp 1200w",
    sizes: "(min-width: 44rem) 44rem, 100vw",
    alt: "A chef in whites using tweezers to garnish a plate in a stainless steel kitchen.",
    width: 1200,
    height: 800,
    priority: true,
    credit: "Willians Huerta",
    creditUrl: "https://www.pexels.com/@willians-huerta-2157111846",
    sourceUrl:
      "https://www.pexels.com/photo/chef-adding-finishing-touches-to-gourmet-dish-36430088/",
  },

  keywords: {
    primary: "social media marketing for restaurants",
    secondary: [
      "best social media platforms for restaurants",
      "restaurant instagram profile",
      "what to post on social media for a restaurant",
      "restaurant food photography lighting",
      "who manages restaurant social media",
      "user generated content for restaurants",
      "restaurant social media metrics",
      "is social media worth it for a small restaurant",
    ],
    longTail: [
      "how often should a restaurant post on social media",
      "what should a restaurant post on instagram",
      "does a restaurant need tiktok",
      "how much does restaurant social media management cost",
      "should restaurants pay food influencers",
      "is social media worth it for a small restaurant",
    ],
  },

  intro: [
    "Social media marketing for restaurants fails on a rota, not on a camera. The food is already good. The ideas are not the hard part. What is missing is a named person, a fixed time in the week, and somewhere bright enough to film, and almost every guide skips all three.",
    "This is the general case. There is a [page for restaurants](/industries/restaurants) if you want the short version aimed at your room instead.",
    "What follows is the per-week reality of it. Which platforms earn the effort, what there is to point a phone at, why your dining room is the worst possible room to shoot in, and who on a Tuesday is actually free to do any of it. There is a section at the end on not bothering, which is the right answer for more restaurants than anyone selling this will admit.",
  ],

  sections: [
    {
      id: "which-platforms-are-worth-it",
      heading: "Which platforms are worth a restaurant's time",
      paragraphs: [
        "Two, and a distant third. Instagram and Facebook carry the work. TikTok is worth adding when somebody on the team genuinely enjoys it, and is worth skipping when nobody does.",
        "Instagram is where the food lives. It rewards the plate, the room and the short vertical video, and it is where someone looks when a friend says the name of your restaurant out loud. Facebook does a quieter job that matters more than its reputation suggests. It carries the opening hours, the holiday closure, the new menu, and it reaches the older half of your room who will never open Instagram.",
        "TikTok is the one where the advice gets loose. Sprout Social's [restaurant guide](https://sproutsocial.com/insights/bars-restaurants-social-media-guide/) cites an MGH survey finding that **58% of users have visited a restaurant after seeing it on TikTok**, which is a real and large number, and it is quoted here second hand because that is what it is. The honest version is that TikTok rewards frequency and personality rather than production, and a restaurant that cannot sustain either will do better putting that hour into the other two.",
        "Google is not a social platform and belongs in this list anyway. Your Business Profile is the first thing most people see, it carries the reviews and the map pin, and a restaurant with a neglected profile and a polished Instagram has its priorities inverted.",
      ],
      list: {
        intro: "In the order a restaurant should fix them.",
        ordered: true,
        items: [
          "**Google Business Profile.** Hours, photos, replies to reviews. Not social, still first.",
          "**Instagram.** The food, the room, the short video.",
          "**Facebook.** The practical notices, and the audience that still reads them.",
          "**TikTok.** Only if somebody wants to. It punishes reluctance.",
        ],
      },
    },
    {
      id: "the-profile-does-the-selling",
      heading: "The profile does more selling than the posts",
      paragraphs: [
        "Someone hears your name, searches it, and lands on your profile. They are not browsing. They have one question, which is whether to come, and usually a second about whether they can get in tonight.",
        "That visit lasts a few seconds and almost nothing in it is your latest post. It is the name, the one line under it, and the link. Then whether the first nine squares look like somewhere worth sitting. Most profiles fail on the line and the link. The photography is rarely the problem.",
        "Write the line for a stranger. The kind of food, the neighbourhood, and the thing that is actually true about you. Not a slogan. Somebody reading it should be able to say what you serve and roughly what it costs.",
        "**Then make booking one tap.** If the link goes to a homepage where the reservation button is below the fold on a phone, the profile is doing half a job. The booking link is the single highest-value element on the page and it is the one most often left pointing at a generic site.",
      ],
      facts: [
        {
          label: "Name field",
          value:
            "Your restaurant name plus the thing you serve. The name field is searchable and a bare name wastes it.",
        },
        {
          label: "The one line",
          value:
            "What you serve, where you are, and when you are open. In that order, because that is the order the questions arrive.",
        },
        {
          label: "The link",
          value:
            "Straight to booking, not to a homepage. If you take walk-ins only, say that instead and save everyone the tap.",
        },
        {
          label: "First nine squares",
          value:
            "Treat them as the window. Somebody decides from these before reading a word.",
        },
      ],
    },
    {
      id: "what-there-is-to-film",
      heading: "What there is to actually film in a restaurant",
      image: {
        src: "/blog/social-media-marketing-for-restaurants/hands-prepping-1200.webp",
        srcSet:
          "/blog/social-media-marketing-for-restaurants/hands-prepping-800.webp 800w, /blog/social-media-marketing-for-restaurants/hands-prepping-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "An older cook's hands holding a ball of dough beside steel pans in a kitchen.",
        width: 1200,
        height: 800,
        credit: "juliane Monari",
        creditUrl: "https://www.pexels.com/@julianemonarifotografia",
        sourceUrl:
          "https://www.pexels.com/photo/dough-in-woman-hand-19987046/",
      },
      paragraphs: [
        "Owners get stuck here because they are looking for events. A new dish, a party, a visiting supplier. Those come round a few times a year and the feed needs feeding every week.",
        "The material is the ordinary work. Hands doing something practised. Dough, a knife, a pass, a pour. The thing that reads on camera is competence, and competence is on display in your kitchen every single service whether anyone films it or not.",
        "The second seam is the room before service. Empty, laid, lights on, nobody in it yet. That shot sells a table better than the food does, because it answers the question the food cannot, which is what it feels like to sit there.",
        "Whatever you film, assume it is watched with the sound off. That is what [captions](/blog/captions-do-the-work) are for. A kitchen video with no words on it is a video nobody understands on a train.",
        "The third seam is people, and it is the one restaurants waste. Not staged smiling staff. The chef explaining why the sauce is split that way. Thirty seconds of somebody who knows something beats a minute of b-roll with music over it.",
      ],
      list: {
        intro: "A week's worth, from one service, without stopping the kitchen.",
        items: [
          "A dish being finished. Hands only, no face needed, ten seconds.",
          "The room laid and empty, before the first booking.",
          "One ingredient arriving or being broken down.",
          "Somebody saying one true thing about the menu, to camera.",
          "The pass at the moment it is full, shot from the side.",
        ],
      },
    },
    {
      id: "the-light-is-the-problem",
      heading: "Your dining room is lit for dinner, not for video",
      image: {
        src: "/blog/social-media-marketing-for-restaurants/dining-room-evening-1200.webp",
        srcSet:
          "/blog/social-media-marketing-for-restaurants/dining-room-evening-800.webp 800w, /blog/social-media-marketing-for-restaurants/dining-room-evening-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "A dim restaurant interior lit by small warm lamps, with laid tables and a waiter at the bar.",
        width: 1200,
        height: 800,
        credit: "letizia",
        creditUrl: "https://www.pexels.com/@letizia-2153189707",
        sourceUrl:
          "https://www.pexels.com/photo/cozy-dimly-lit-restaurant-interior-with-waiter-39604990/",
      },
      paragraphs: [
        "This is the part no guide covers and it is why most restaurant content looks worse than the restaurant. You spent money making the room feel good in the evening. Low, warm, pooled light. That is the correct decision for dining and close to the worst possible condition for a phone camera.",
        "A phone in dim light does three things you will not like. It raises the sensitivity until the picture goes grainy. It slows the shutter, so any movement smears. And it pushes the colour so far toward orange that the food stops looking like the food. Steak goes brown. Greens go grey. The picture on the screen is not what is on the plate, and the customer notices even if they cannot name why.",
        "The fix is not equipment and not a filter. **It is filming at a different time of day, in a different part of the room.** Daylight through the front window at eleven in the morning will beat anything your evening lighting can do, and it costs nothing.",
        "So the shot list gets split in two. Anything that has to look appetising is filmed in daylight, before service. Anything where atmosphere is the point gets filmed in the evening. The full room, the noise, the candles. Accept those as moody rather than appetising. Trying to get both out of one session is where the grainy orange video comes from.",
      ],
      facts: [
        {
          label: "Film food",
          value:
            "Late morning, near the largest window, lights off. Daylight is free and it is better than anything you can buy.",
        },
        {
          label: "Film atmosphere",
          value:
            "During service, and accept that it will be dark. Dark reads as warm when the subject is a room and as dirty when the subject is a plate.",
        },
        {
          label: "Never",
          value:
            "The phone's flash. It flattens the food and announces itself to every table around you.",
        },
        {
          label: "Worth knowing",
          value:
            "Wipe the lens first. A phone that has been in a kitchen pocket all day is filming through grease.",
        },
      ],
    },
    {
      id: "nobody-is-holding-the-camera",
      heading: "The rota is where this actually fails",
      image: {
        src: "/blog/social-media-marketing-for-restaurants/kitchen-service-1200.webp",
        srcSet:
          "/blog/social-media-marketing-for-restaurants/kitchen-service-800.webp 800w, /blog/social-media-marketing-for-restaurants/kitchen-service-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "Cooks in white jackets and caps working along a busy service counter.",
        width: 1200,
        height: 800,
        credit: "Ali Alcántara",
        creditUrl: "https://www.pexels.com/@alialcantara",
        sourceUrl:
          "https://www.pexels.com/photo/workers-in-restaurant-12203611/",
      },
      paragraphs: [
        "Here is the actual failure. Not the camera, not the ideas, not the algorithm. The best moments in a restaurant happen exactly when every pair of hands is already committed, and nobody has been given the job of putting a phone in front of them.",
        "Deloitte Digital's research into [restaurant social media](https://www.deloittedigital.com/us/en/insights/perspective/social-media-strategies-restaurants.html) puts a number on what that costs. In 2024 restaurants reported an average **9.9% increase in consumer revenue** they attributed to their social strategies. The brands Deloitte calls social-first, the ones with the most developed approach, averaged **14.1%**.",
        "**The gap between those two numbers is not talent and it is not budget. It is whether somebody owns it.** Both groups post. One group has a name against the task and a slot in the week, and the other has an intention and a busy Tuesday. Four points of revenue sit in that difference.",
        "The honest half is that owning it costs a person's time, every week, for as long as the restaurant exists. For a small room running on thin margins, that hour may genuinely be worth more on the floor. That is a real trade and anyone who tells you otherwise is selling something.",
        "If you keep it in house, the fix is boring and it works. Name one person. Give them one slot, before service, same day each week. Give them the five-shot list from earlier so they are not inventing it each time. Twenty minutes with a list beats two hours without one.",
        "The other half of the job is the part that kills it, which is the publishing. Filming is the fun bit and it is the bit that gets done. Someone still has to crop it, caption it, put it out at the right hour and answer the replies, and that is the half we have [written about before](/blog/posting-is-the-hard-part).",
      ],
      facts: [
        {
          label: "Name",
          value:
            "One person, not the team. A task owned by everyone is owned by nobody, and in a kitchen it loses to service every time.",
        },
        {
          label: "Slot",
          value:
            "One fixed time a week, before doors. Not when it is quiet, because it is never quiet.",
        },
        {
          label: "List",
          value:
            "The same five shots every week. Invention is what makes it feel like work.",
        },
        {
          label: "Time",
          value:
            "Twenty minutes filming. The publishing takes longer and is the part that gets dropped.",
        },
      ],
    },
    {
      id: "what-actually-fills-a-table",
      heading: "The post that fills a table is rarely the pretty one",
      paragraphs: [
        "There is a gap between the content restaurants enjoy making and the content that puts people in chairs. The plate shot is the enjoyable one. It is not usually the one that moves a booking.",
        "Deloitte asked restaurants what actually works. **Fifty-one percent said promoting in-person events on social media was the most effective way to drive visits**, ahead of everything else they tested. Second, at 48%, was making their own booking and ordering surfaces work properly on a phone.",
        "Neither of those is a photograph. Both are closer to admin than to art, which is probably why they get less attention than they earn.",
        "An event does not have to be large. A set menu for one week. A supplier evening. A quiz, a tasting, a Sunday roast that only exists in winter. The point is that it has a date, and a date gives somebody a reason to act now rather than file you away for later. A beautiful photo of a plate asks nothing of the viewer. An event asks them to pick a night.",
        "The second finding is less glamorous still. If your Instagram sends people to a site where the booking button is somewhere below the fold on a phone, the chain breaks at the last step. Everything upstream worked and the table stays empty. Worth opening your own profile on your own phone and trying to book a table in under thirty seconds. Most owners have never done it.",
        "The practical notices belong here too. Closed Monday. New hours from October. The kitchen is shut but the bar is open. These feel too dull to post and they are among the most read things a restaurant publishes, because somebody is checking before they walk over.",
      ],
      list: {
        intro: "Things with a date, in rough order of how little effort they take.",
        items: [
          "A dish that exists for one week only, with the week stated.",
          "A change to the hours, posted before it happens rather than after.",
          "A one-night set menu, a tasting, or a supplier evening.",
          "A seasonal return. The thing regulars already ask about.",
          "A closure. People remember being told.",
        ],
      },
    },
    {
      id: "what-guests-post",
      heading: "What your guests post beats what you post",
      image: {
        src: "/blog/social-media-marketing-for-restaurants/guests-at-the-table-1200.webp",
        srcSet:
          "/blog/social-media-marketing-for-restaurants/guests-at-the-table-800.webp 800w, /blog/social-media-marketing-for-restaurants/guests-at-the-table-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "Four young adults sharing a pizza around a cafe table.",
        width: 1200,
        height: 675,
        credit: "Vitaly Gariev",
        creditUrl: "https://www.pexels.com/@silverkblack",
        sourceUrl:
          "https://www.pexels.com/photo/friends-enjoying-pizza-in-a-cozy-cafe-setting-36729761/",
      },
      paragraphs: [
        "A guest's blurry photo of your plate carries something yours cannot, which is that they chose to take it. Nobody doubts a customer's motive. Everybody discounts yours.",
        "So the work is collection rather than creation. Most restaurants already have more of this than they realise, sitting unseen in tagged posts and stories that expire in a day. Checking tags once a week and saving what is good takes about five minutes.",
        "Ask before you reshare, every time. A story mention is not permission to put somebody's face on your grid. Most people say yes and are pleased to be asked, and the one who says no is exactly the person you would not want to have posted without asking.",
        "What actually produces it is not a hashtag campaign. It is a dish that looks like something, a room with one good corner, and staff who notice when a table is photographing their food and do not hover. The marketing version of this is a sign asking people to tag you. It works far less well than the food being worth photographing.",
        "Paid creators sit next to this and the industry is strange about them. Deloitte found that restaurants ranked working with creators as their **lowest-priority** tactic. The same survey found **46% of respondents reported it as the second-highest return strategy** they had, behind only loyalty and rewards.",
        "Lowest priority and second-best return. That is a gap worth looking at, and it does not mean rushing out to pay the first person with a food account. It means the local creator with four thousand genuinely local followers is probably underpriced. The national one with four hundred thousand scattered followers is probably not worth it at any price. Proximity beats reach when the product is a table in one specific street.",
      ],
    },
    {
      id: "knowing-whether-it-worked",
      heading: "Knowing whether any of it worked",
      image: {
        src: "/blog/social-media-marketing-for-restaurants/filming-the-plate-1200.webp",
        srcSet:
          "/blog/social-media-marketing-for-restaurants/filming-the-plate-800.webp 800w, /blog/social-media-marketing-for-restaurants/filming-the-plate-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "Two hands holding a phone horizontally, framing a plate of food on a table.",
        width: 1200,
        height: 800,
        credit: "Andrea Piacquadio",
        creditUrl: "https://www.pexels.com/@olly",
        sourceUrl:
          "https://www.pexels.com/photo/photo-of-person-taking-picture-of-food-3756456/",
      },
      paragraphs: [
        "Likes are not the measure and neither are followers. A restaurant with twelve thousand followers and empty Wednesdays has an audience somewhere else, or an audience that likes looking at food and does not live near you.",
        "Three things are worth watching and all three are boring. Profile visits, taps on the booking link, and where new bookings say they heard about you. The last one needs a human to ask and is worth more than the other two combined.",
        "Give it a season before judging. Restaurant demand moves with weather, holidays and the local calendar, and a month of data mostly measures the month. Three months tells you something. One viral video tells you nothing, which is the hardest part for anyone to accept after a video does well.",
        "Then act on the dull finding rather than the exciting one. If the posts that lead to bookings are the empty room and the opening hours, and the ones that get likes are the close-up food, make more of the empty room. The feed is not the product. The full table is.",
        "There is one number worth knowing before you start, because it reframes the rest. Deloitte found that **41% of people who follow brands on social media follow restaurant brands**. The audience is there and it is already interested. That is unusual. Most industries are fighting for attention that does not want to be given, and restaurants are not.",
        "Which changes what a poor result means. If a restaurant posts for six months and nothing moves, the likely problem is not that nobody wants to follow a restaurant. It is the room, the booking link, the light, or the fact that it was nobody's job. Those are fixable. A disinterested audience would not be.",
        "Set a review date when you start. Three months out, put an hour in the diary and look at the three numbers honestly. Not to decide whether social media works, which is already settled, but to decide whether yours is working and what specifically is in the way.",
        "When it is worth handling properly, that is the work we do. The [social posts](/services/social-media-posts) are **$69 a month for ten** and [short-form video](/services/short-form-videos) is **$129 a month for five**. You can see the whole plan and its [price](/pricing) before you speak to anyone.",
      ],
    },
  ],

  faqs: [
    {
      question: "How often should a restaurant post on social media?",
      answer:
        "Three to five times a week on Instagram is plenty, and consistency matters more than the number. One session before service can produce a week of material if you work from a fixed shot list. A restaurant posting twice a week for a year beats one posting daily for a month and then stopping.",
    },
    {
      question: "What should a restaurant post on Instagram?",
      answer:
        "Hands doing practised work, the room laid and empty before service, and somebody saying one true thing about the menu. Owners look for events and events are rare. The ordinary competence on display every service is the material, and it is already happening whether anyone films it or not.",
    },
    {
      question: "Does a restaurant need TikTok?",
      answer:
        "It is the natural second channel, once somebody on the team enjoys being on camera. TikTok rewards frequency and personality rather than production value, so a kitchen that likes filming does unusually well there. Instagram and the Google Business Profile carry most restaurants on their own, and TikTok is what you add when you have the person for it.",
    },
    {
      question: "How much does restaurant social media management cost?",
      answer:
        "Agencies in North America typically charge from several hundred to a few thousand dollars a month for small businesses. Our own social posts start at $69 a month for ten posts and short-form video at $129 a month for five, with the full price visible before you talk to anyone. The wider range reflects how much strategy and account management is included rather than how many posts you get.",
    },
    {
      question: "Should restaurants pay food influencers?",
      answer:
        "Sometimes, and later than most people try it. A guest's unpaid photo carries credibility a paid post does not, because nobody doubts a customer's motive. Get the room and the dish worth photographing first, because paying someone to photograph a plate that does not look like anything is money spent twice.",
    },
    {
      question: "Is social media worth it for a small restaurant?",
      answer:
        "Yes, and restaurants start from a better position than most trades. Deloitte found that 41% of people who follow brands on social media follow restaurant brands, so the audience is already there and already interested. It pays back fastest when you have covers to fill, a booking link to send people to, and one person who owns the hour each week. Get those three lined up and the posting does real work.",
    },
  ],
};
