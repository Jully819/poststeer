/**
 * The three legal documents: Terms, Privacy, Refund Policy.
 *
 * SAME RULE AS content.ts — the structure mirrors what a subscription agency
 * needs to cover; the wording is written for this file rather than lifted
 * from anyone else's terms. Values in [brackets] are placeholders that render
 * as written, and every one of them has to be filled in by a lawyer before
 * this site is anything other than a layout.
 *
 * Each section carries a `plain` note: the sidebar callout that says the same
 * thing in one sentence. The formal text is what governs; the note is there
 * so nobody has to guess what a clause means.
 */

export interface LegalSection {
  /** Heading, numbered by the renderer. */
  title: string;
  /** Formal text. One string per paragraph. */
  body: string[];
  /** The "in plain terms" callout beside it. */
  plain: string;
}

export interface LegalDoc {
  slug: "privacy" | "terms" | "refund-policy";
  /** Sidebar and breadcrumb label. */
  label: string;
  title: string;
  updated: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  sections: LegalSection[];
}

/** Sidebar order, shared by all three pages. */
export const legalNav = {
  label: "Legal",
  heading: "Documents",
  items: [
    { slug: "privacy", label: "Privacy Policy", href: "/legal/privacy" },
    { slug: "terms", label: "Terms & Conditions", href: "/legal/terms" },
    { slug: "refund-policy", label: "Refund Policy", href: "/legal/refund-policy" },
  ],
};

/** The callout label, and the note that closes every document. */
export const legalUi = {
  plainLabel: "In plain terms",
  updatedLabel: "Updated",
  footnote:
    "The “in plain terms” notes are a summary written for clarity. They are not legal advice, and where the two differ the formal text governs. Questions? Email",
  contactEmail: "info@poststeer.com",
};

const terms: LegalDoc = {
  slug: "terms",
  label: "Terms & Conditions",
  title: "Terms & Conditions",
  updated: "[2 July 2025]",
  intro:
    "These Terms cover your use of the PostSteer website and services. Subscribing means you accept them. There is a plain-English note beside each section; the formal text is what governs.",
  seoTitle: "Terms & Conditions | PostSteer",
  seoDescription:
    "The terms covering PostSteer subscriptions: how we work together, fees, refunds, liability and governing law.",
  sections: [
    {
      title: "How we work together",
      body: [
        "We aim to deliver good work on time. You will work with an account manager as your first point of contact. Approval of a deliverable is final, and revisions after that point are closed and billed as new work.",
        "Day-to-day support and communication run through your dashboard, live chat and email. Scheduled calls — onboarding, monthly reviews, technical sessions — are included in the plans that list them, and decisions made on a call stay in writing in the dashboard so there is one record of what was agreed.",
        "We ask that communication stays open and respectful in both directions. Abusive behaviour towards our team ends the engagement immediately and without refund.",
      ],
      plain:
        "Day-to-day contact happens in your dashboard and chat. Calls come with the plans that include them. Once you approve a piece of content, it is final.",
    },
    {
      title: "Content, feedback & storage",
      body: [
        "Please review and approve deliverables promptly. If more than [30] days pass after we send a batch, the work in it is treated as approved and the revision rounds attached to it close. Unapproved content does not roll forward into the next billing cycle, and unused capacity does not accumulate.",
        "We keep your deliverables available in the dashboard for up to [3] months. After that they may be removed from our systems, so keep your own copies of anything you want to hold on to long term.",
      ],
      plain:
        "Give feedback within [30] days or a batch closes. Unapproved work does not carry over. Download your files — we store them for [3] months.",
    },
    {
      title: "Fees & payment",
      body: [
        "Fees are payable in advance, and a valid payment method has to stay on file. We manage subscription fees through [Stripe]. We will continue to attempt payment until a charge succeeds or you cancel, and unpaid charges put the service on hold until the balance is cleared.",
        "You can cancel at any time in the client portal, under Manage subscription → Cancel. Cancelling stops the next renewal; it does not refund the current period. Service continues to the end of the period you have already paid for.",
      ],
      plain:
        "You pay monthly, in advance, by card. Cancel whenever you like in the portal — no refund on the current month, and the service runs to the end of it.",
    },
    {
      title: "Refunds & results",
      body: [
        "New subscriptions are covered by the 14-day satisfaction guarantee set out in our Refund Policy. It applies to your first batch only. Once you have approved or scheduled any deliverable from that batch, the guarantee no longer applies.",
        "Outside that guarantee, and except where we are in material breach of these Terms, fees are non-refundable. The work is personalised and produced manually, so it cannot be resold. Where we make an error, we will correct it or issue a credit rather than a refund.",
        "We do not guarantee specific business results. Reach, engagement, ranking and revenue depend on factors outside our control — your market, your offer, your pricing, and the platforms themselves. Your payment covers the creative work produced to your brief, not an outcome.",
      ],
      plain:
        "The 14-day guarantee covers your first batch, as long as you have not approved or scheduled any of it. Beyond that, fees are not refundable, and we do not promise results.",
    },
    {
      title: "Using your brand & showcasing work",
      body: [
        "You give us permission to show your company name, logo and social links, and to use anonymised samples of the work we produce for you, in our portfolio, case studies and marketing.",
        "If you would rather we did not, tell us in writing at any time and we will remove the material from anything we control going forward.",
      ],
      plain:
        "We may show your logo and anonymised samples of your work in our portfolio. Ask us in writing and we will stop.",
    },
    {
      title: "White-label & resellers",
      body: [
        "White-label partners and resellers are bound by these Terms on behalf of their own clients. If you resell our services, you are responsible for what you promise those clients, for collecting payment from them, and for support you have agreed to provide them.",
        "Your obligations to us are unchanged by any arrangement you have with an end client. A dispute between you and your client is not grounds to withhold payment to us.",
      ],
      plain:
        "Resellers pay us in advance and stay responsible for billing and supporting their own clients.",
    },
    {
      title: "Warranties & limitation of liability",
      body: [
        "To the fullest extent permitted by law, PostSteer disclaims all warranties, including merchantability, fitness for a particular purpose, title and non-infringement. The service is provided “as is”.",
        "We are not liable for indirect, consequential, incidental or special damages, including lost profits, lost revenue or lost data. Our total liability for any claim is capped at the amount you paid us in the [1] month before the claim arose.",
      ],
      plain:
        "The service is provided “as is”, and the most we can owe you is what you paid us in the previous month.",
    },
    {
      title: "Your responsibilities & indemnity",
      body: [
        "You are responsible for the accuracy of the material you give us, and for holding the rights to it — brand assets, logos, photography, music, product claims and anything else you share.",
        "You agree to indemnify PostSteer and its affiliates against losses arising from a breach of these Terms, from content you supplied, and from third-party claims connected to your accounts. That includes copyright claims, platform suspensions and loss of access to an account.",
      ],
      plain:
        "You own the rights to what you send us, and you cover us against claims about it — including copyright complaints and account suspensions.",
    },
    {
      title: "Confidentiality",
      body: [
        "We treat the business information you share with us as confidential, use it only to deliver your services, and do not disclose it for any other purpose. That obligation runs for [2] years after our engagement ends.",
        "It does not cover information that is already public, that you make public, or that we are required to disclose by law.",
      ],
      plain:
        "We keep your business information confidential and use it only to do your work.",
    },
    {
      title: "Credit-card disputes",
      body: [
        "Charges are presumed accurate unless you dispute them with us within [14] days. Please raise any billing question with us first — most are resolved the same day.",
        "A chargeback filed before you have raised it with us pauses all credits, refunds and work on your account, and suspends your subscription while it is open. If a dispute is decided against PostSteer despite our compliance with these Terms, we may invoice you for the disputed amount plus the fees charged to us.",
      ],
      plain:
        "Raise a billing problem with us within [14] days. A chargeback pauses your account and deletes nothing — but it stops all work until it is settled.",
    },
    {
      title: "Governing law",
      body: [
        "These Terms, together with our Privacy Policy and Refund Policy, are the entire agreement between us and replace anything discussed beforehand. They can only be amended in writing.",
        "They are governed by the laws of [State/Country], and disputes will be resolved in the courts of [State/Country].",
      ],
      plain: "These Terms are governed by the laws of [State/Country].",
    },
    {
      title: "Changes & contact",
      body: [
        "Our rules, policies, pricing and what each package includes may change at our discretion. Material changes are posted here with a new date at the top of the page, and continuing to use the service after that date means you accept the updated Terms.",
        `Questions about any of this? Email ${legalUi.contactEmail} and ask. We would rather explain a clause than argue about it later.`,
      ],
      plain:
        `We may update these Terms; continuing to use the service means you accept them. Questions go to ${legalUi.contactEmail}.`,
    },
  ],
};

const privacy: LegalDoc = {
  slug: "privacy",
  label: "Privacy Policy",
  title: "Privacy Policy",
  updated: "[2 July 2025]",
  intro:
    "What PostSteer collects, why we collect it, and what you can ask us to do with it. There is a plain-English note beside each section; the formal text is what governs.",
  seoTitle: "Privacy Policy | PostSteer",
  seoDescription:
    "What data PostSteer collects, how it is used, who it is shared with, how long it is kept, and the rights you have over it.",
  sections: [
    {
      title: "What we collect",
      body: [
        "Account data: your name, business name, email address, phone number and billing details. Brief data: everything you send us to produce your content — brand assets, product information, photography and written notes.",
        "Usage data: pages visited on this site, actions taken in the dashboard, device and browser type, and approximate location derived from your IP address. We do not ask for, and do not want, sensitive personal data such as health, biometric or government identity information.",
      ],
      plain:
        "Your contact and billing details, whatever you send us for your content, and basic usage data from the site.",
    },
    {
      title: "How we use it",
      body: [
        "To deliver the service you bought: producing content, scheduling it, running your account, taking payment and providing support. To operate the business: fraud prevention, security, accounting and meeting our legal obligations.",
        "To improve what we do: understanding which parts of the product are used and where people get stuck. We do not sell your personal data, and we do not use your brief data to train third-party AI models.",
      ],
      plain:
        "To do your work, run the account and improve the product. We do not sell your data.",
    },
    {
      title: "Cookies & analytics",
      body: [
        "We use cookies that are necessary for the site and dashboard to function — sign-in, session state, security. Those cannot be turned off without breaking the service.",
        "We also use analytics cookies to understand traffic and product usage. You can decline these in the cookie banner or through your browser settings, and the site will still work.",
      ],
      plain:
        "Necessary cookies keep you signed in. Analytics cookies are optional and you can decline them.",
    },
    {
      title: "Who we share it with",
      body: [
        "Service providers who help us run the business, each under contract and only for the purpose we engaged them for: [Stripe] for payments, [hosting, email and analytics providers], and the social platforms you connect.",
        "We also disclose data where the law requires it, and to a buyer in the event of a merger or sale of the business — in which case this policy continues to apply until it is replaced and you are told.",
      ],
      plain:
        "Payment, hosting and analytics providers, the social platforms you connect, and anyone the law requires.",
    },
    {
      title: "Connected social accounts",
      body: [
        "When you connect a social account, we receive an access token that lets us publish and read performance data on your behalf. We use it for nothing else.",
        "You can disconnect an account at any time in the dashboard or from the platform’s own settings. Disconnecting revokes the token immediately; content already published stays published, because it lives on that platform and not on ours.",
      ],
      plain:
        "Connecting an account lets us post and read stats. Disconnect whenever you like — already-published posts stay up.",
    },
    {
      title: "How long we keep it",
      body: [
        "Deliverables stay available in the dashboard for up to [3] months, in line with our Terms. Account and brief data is kept for the life of your account and for [12] months after it closes, so the account can be reopened.",
        "Billing records are kept for [7] years because tax law requires it. Anonymised usage statistics, which cannot be traced back to you, may be kept indefinitely.",
      ],
      plain:
        "Deliverables [3] months, account data [12] months after you leave, invoices [7] years.",
    },
    {
      title: "Your rights",
      body: [
        "Depending on where you live, you can ask for a copy of your data, ask us to correct it, ask us to delete it, object to particular uses, or ask for it in a portable format.",
        `Email ${legalUi.contactEmail} and we will respond within [30] days. We will not charge you for a request or treat you differently for making one.`,
      ],
      plain:
        `Ask us for a copy, a correction or a deletion at ${legalUi.contactEmail}. We reply within [30] days.`,
    },
    {
      title: "Security",
      body: [
        "Data is encrypted in transit and at rest. Access inside the company is limited to the people who need it to do your work, and is logged.",
        "No system is perfectly secure. If a breach affects your personal data, we will notify you and the relevant regulator within the time the law requires.",
      ],
      plain:
        "Encrypted, access-limited, logged. If something goes wrong, we tell you.",
    },
    {
      title: "International transfers",
      body: [
        "We operate in [the US and EU], and your data may be processed in either. Transfers out of the [EEA/UK] are covered by [Standard Contractual Clauses] or another lawful transfer mechanism.",
      ],
      plain: "Your data may be processed in [the US or EU], under standard legal safeguards.",
    },
    {
      title: "Children",
      body: [
        "The service is sold to businesses and is not directed at anyone under [16]. We do not knowingly collect their data, and we delete it if we discover we have.",
      ],
      plain: "Not a service for under-[16]s, and we do not collect their data.",
    },
    {
      title: "Changes & contact",
      body: [
        "If this policy changes materially, we post the new version here with a new date and email account holders before it takes effect.",
        `Questions, or a request about your data: ${legalUi.contactEmail}.`,
      ],
      plain:
        `Material changes are emailed to account holders. Questions go to ${legalUi.contactEmail}.`,
    },
  ],
};

const refundPolicy: LegalDoc = {
  slug: "refund-policy",
  label: "Refund Policy",
  title: "Refund Policy",
  updated: "[2 July 2025]",
  intro:
    "When you get your money back, when you do not, and how to ask. There is a plain-English note beside each section; the formal text is what governs.",
  seoTitle: "Refund Policy | PostSteer",
  seoDescription:
    "PostSteer’s 14-day satisfaction guarantee: what it covers, what it does not, how cancellation works, and how to request a refund.",
  sections: [
    {
      title: "The 14-day satisfaction guarantee",
      body: [
        "Every new subscription comes with a 14-day satisfaction guarantee. The window opens the day we deliver your first batch, not the day you sign up — so the clock only starts once there is something to judge.",
        "Inside it, review the work and go through at least [2] rounds of revisions with your account manager. If it is still not right and you have not approved or scheduled any of the content, we refund your first month in full.",
      ],
      plain:
        "14 days from your first batch. Use your revisions, and if it is still wrong, the first month is refunded.",
    },
    {
      title: "What the guarantee covers",
      body: [
        "The first monthly subscription fee on a new account, for the deliverables in the first batch.",
        "It applies once per customer. Reopening a cancelled account, or opening a second account for the same business, does not reset it.",
      ],
      plain: "Your first month, on a new account, once per customer.",
    },
    {
      title: "What it does not cover",
      body: [
        "Content you have approved or scheduled. Approval is the point at which work is finished, and it closes the guarantee for that batch.",
        "One-time and third-party costs: setup and onboarding fees, rush fees, paid media spend, licensed stock, fonts and music, and anything bought on your behalf.",
        "Requests made after the 14 days, months after the first, and accounts cancelled for breach of the Terms.",
      ],
      plain:
        "Anything you approved or scheduled, one-time and third-party costs, and anything after day 14.",
    },
    {
      title: "Cancelling your subscription",
      body: [
        "Cancel at any time in the client portal, under Manage subscription → Cancel. There is no cancellation fee and no notice period.",
        "Cancelling stops the next renewal. Service continues to the end of the period you have already paid for, and you keep everything delivered up to that point.",
      ],
      plain:
        "Cancel in the portal whenever you like. No fee, and the service runs to the end of the month you paid for.",
    },
    {
      title: "Prorated refunds",
      body: [
        "We do not issue prorated refunds for a partly used month, because capacity is reserved and work is produced across the month rather than at a single point in it.",
        "If we cancel your subscription for a reason that is not your breach of the Terms, we refund the unused part of the period.",
      ],
      plain:
        "No part-month refunds if you cancel. If we cancel on you, you get the unused part back.",
    },
    {
      title: "One-time and rush work",
      body: [
        "One-time projects can be cancelled for a full refund any time before production starts. Once production has started, the refund is the fee less the work completed to that point.",
        "Rush fees pay for schedule priority rather than a deliverable, and are non-refundable once the work has been scheduled.",
      ],
      plain:
        "Full refund before we start a one-time project, partial after. Rush fees are not refundable once scheduled.",
    },
    {
      title: "Chargebacks",
      body: [
        "Please raise a billing problem with us before your bank. Most are a misread invoice line and are resolved the same day.",
        "A chargeback filed first suspends your account and pauses all work, credits and refunds while it is open. Where a dispute is decided against PostSteer despite our compliance with the Terms, we may invoice you for the disputed amount plus the fees charged to us.",
      ],
      plain:
        "Come to us first. A chargeback pauses your account and everything on it until it is settled.",
    },
    {
      title: "How to request a refund",
      body: [
        `Email ${legalUi.contactEmail} from the address on the account, with the account name and one line on what is wrong. You do not need a form or a reason we approve of — a plain description is enough.`,
        "We respond within [2] business days. Approved refunds are returned to the original payment method within [5–10] business days, depending on your bank.",
      ],
      plain:
        `Email ${legalUi.contactEmail} from the account address. We reply in [2] business days; the money lands in [5–10].`,
    },
  ],
};

export const legalDocs: Record<LegalDoc["slug"], LegalDoc> = {
  privacy,
  terms,
  "refund-policy": refundPolicy,
};
