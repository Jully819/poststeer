import {
  brand,
  chat,
  deliverables,
  demoBar,
  faqs,
  finalCta,
  footer,
  gallery,
  guarantee,
  hero,
  logoStrip,
  pricing,
  seo,
  servicesMenu,
  type FooterCopy,
  type HeaderCopy,
  type PricingUi,
} from "@/lib/content";
import { slugify } from "@/lib/landing";

/**
 * THE TRADITIONAL CHINESE HOME PAGE: the same page as lib/content-zh.ts, in
 * Traditional characters and Taiwan / Hong Kong usage.
 *
 * WRITTEN, NOT CONVERTED. A character-for-character conversion of the
 * Simplified file gets the script right and the words wrong: 视频 is 影片
 * here and not 視頻, 软件 is 軟體, 默认 is 預設, Instagram stories are
 * 限時動態. So this is its own translation, with the same rules as the
 * Simplified one: every price, tier, quantity, image key and icon id is
 * spread in from lib/content.ts and only the words are overlaid.
 *
 * Links go to the existing English pages, as on /zh, and the two legal links
 * say so in their label.
 */

export const zhHantSeo: typeof seo = {
  title: "社群內容全託管 | PostSteer",
  description:
    "按月訂閱社群貼文、短影音與排程發布服務。選擇所需服務，提交一份需求，我們便會為您在各個頻道發布。",
};

/* ---------------------------------------------------------------- header */

export const zhHantHeader: HeaderCopy = {
  homeHref: "/zh-hant",
  nav: [
    { label: "公司", href: "#company", dropdown: true },
    { label: "服務", href: "#services", dropdown: true },
    { label: "價格", href: "/pricing", dropdown: false },
    { label: "部落格", href: "/blog", dropdown: false },
  ],
  cta: `${brand.priceFrom}/月起`,
  openMenu: "開啟選單",
  closeMenu: "關閉選單",
  primaryNavLabel: "主導覽",
  mobileNavLabel: "手機導覽",
  langLinks: [
    { label: "English", href: "/", lang: "en", title: "View in English" },
    { label: "简体中文", href: "/zh", lang: "zh-CN", title: "查看简体中文版" },
  ],
};

export const zhHantSkipLink = "跳到內文";

const menuText: Record<string, { name: string; tagline: string; unit: string }> = {
  "social-media-posts": { name: "社群貼文", tagline: "貼文、輪播貼文和限時動態", unit: "/月" },
  "short-form-videos": { name: "短影音", tagline: "Reels、TikTok 和 Shorts", unit: "/月" },
  "chinese-social-media-posts": {
    name: "中文社群媒體",
    tagline: "小紅書貼文（簡體中文）",
    unit: "",
  },
  "seo-blog-posts": { name: "SEO 部落格文章", tagline: "為搜尋排名打造的長篇內容", unit: "/月" },
  "business-website": { name: "企業網站", tagline: "最多 5 個頁面，使用您的網域", unit: "一次性" },
  "landing-pages": { name: "著陸頁", tagline: "以轉換為目標的設計與開發", unit: "一次性" },
  "email-marketing": { name: "電子郵件行銷", tagline: "行銷活動與自動化郵件流程", unit: "/月" },
};
const menuGroupTitle = ["社群媒體", "SEO", "網站與電子郵件"];

export const zhHantServicesMenu: typeof servicesMenu = {
  fromLabel: "",
  fromSuffix: "起",
  onEnquiry: "洽詢報價",
  stats: ["自 2018 年起", "14 天保證"],
  groups: servicesMenu.groups.map((group, i) => ({
    ...group,
    title: menuGroupTitle[i],
    viewAll: "查看全部",
    items: group.items.map((item) => ({ ...item, ...menuText[item.slug] })),
  })),
  footerLeft: "查看全部服務與價格",
  footerRight: `${brand.priceFrom}/月起`,
};

/* ------------------------------------------------------------------ hero */

const highlightText = [
  { title: "客製內容", body: "為您的品牌量身打造貼文、短影音和限時動態。" },
  { title: "品質把關", body: "每項交付內容在發布前都會經過審核。" },
  { title: "無合約", body: "隨時取消。" },
];

export const zhHantHero: typeof hero = {
  ...hero,
  headlineLead: "訂閱制社群內容",
  headlineAccent: `${brand.priceFrom}/月起`,
  subheadParagraph: "每月持續生成新貼文、短影音和限時動態，讓品牌維持曝光與互動。",
  highlights: hero.highlights.map((item, i) => ({ ...item, ...highlightText[i] })),
  showcase: { ...hero.showcase, handle: "[您的品牌]", posted: "2 小時前" },
  primaryCta: "預約示範",
  secondaryCta: `${brand.priceFrom}/月起`,
  footnote: [
    { text: `${brand.priceFrom}/月起`, strong: true },
    { text: "無合約", strong: false },
    { text: "14 天退款保證", strong: false },
  ],
};

export const zhHantLogoStrip: typeof logoStrip = {
  ...logoStrip,
  label: "客戶在哪裡，內容就發布到哪裡。",
};

/* ---------------------------------------------------------- how it works */

const stepText = [
  { title: "了解您的品牌", body: "告訴我們您的業務、目標和品牌風格。" },
  { title: "我們來創作", body: "我們為您設計貼文、短影音和限時動態。" },
  { title: "您來審核", body: "檢視內容、提出修改意見並確認發布。" },
  { title: "我們來發布", body: "我們會為您排程，並發布到各個頻道。" },
];

export const zhHantDeliverables: typeof deliverables = {
  ...deliverables,
  kicker: "服務流程",
  titleLead: "快速見效",
  titleAccent: "只需 4 步",
  steps: deliverables.steps.map((step, i) => ({ ...step, ...stepText[i] })),
  brandForm: {
    ...deliverables.brandForm,
    title: "您的品牌",
    nameLabel: "企業名稱",
    namePlaceholder: "[您的企業]",
    goalLabel: "您的目標是什麼？",
    goalValue: "提升品牌知名度",
    uploadLabel: "上傳靈感參考",
  },
  approve: {
    ...deliverables.approve,
    comment: "看起來很棒。可以試試深色背景的版本嗎？",
    ago: "2 分鐘前",
    label: "已核准",
  },
  publish: {
    ...deliverables.publish,
    title: "本週",
    days: ["週一", "週二", "週三", "週四", "週五"],
  },
};

/* ------------------------------------------------------------- portfolio */

const typeLabel: Record<string, string> = {
  all: "全部",
  posts: "貼文",
  stories: "限時動態",
  shortform: "短影音",
  ads: "廣告",
  email: "電子郵件",
};
const industryLabel: Record<string, string> = {
  food: "餐飲",
  beauty: "健康與美容",
  hospitality: "旅宿與餐旅",
  retail: "零售與產品",
  pets: "寵物",
};

export const zhHantGallery: typeof gallery = {
  ...gallery,
  kicker: "作品集",
  title: "由創意團隊打造，只為讓您脫穎而出",
  types: gallery.types.map((tab) => ({ ...tab, label: typeLabel[tab.id] })),
  featuredLabel: "精選",
  allLabel: "全部",
  industries: gallery.industries.map((item) => ({ ...item, label: industryLabel[item.id] })),
  seeAll: "查看全部範例",
  more: "查看更多範例",
  empty: "作品庫裡暫時沒有符合這兩個條件的案例。",
};

/* --------------------------------------------------------------- pricing */

const serviceText: Record<
  string,
  {
    name: string;
    unit: string;
    description: string;
    details?: { summary: string; includes: string[]; note?: string };
  }
> = {
  posts: {
    name: "社群貼文",
    unit: "則貼文",
    description: "我們為您製作貼文、撰寫貼文文案並規劃內容。您只需檢視並確認。",
  },
  video: {
    name: "短影音",
    unit: "支影片",
    description: "使用您的素材剪輯直式影片，加上字幕，並適配各平台尺寸。",
    details: {
      summary:
        "短影音全流程交給我們。我們將您的素材或精選片段製作成 Reels、TikTok 和 Shorts，並處理吸睛開場、字幕、音樂與品牌化剪輯。",
      includes: [
        "全流程影片剪輯",
        "吸睛開場、字幕與音樂一併處理",
        "品牌視覺與動態效果",
        "適配 Reels、TikTok 和 Shorts",
        "為您排程並發布",
        "包含修改輪次",
      ],
    },
  },
  blog: {
    name: "SEO 部落格文章",
    unit: "篇文章",
    description:
      "依使用者真實搜尋需求研究長篇文章，由真人撰寫，並發布到您的 CMS；標題、中繼資料和內部連結皆已設定完成。",
    details: {
      summary:
        "SEO 部落格文章從關鍵字到上線頁面全程負責。我們與您一起確定目標關鍵字，研究目前排名靠前的頁面，撰寫約 1,000 字、真正有人願意讀完的文章，並連同內部連結發布到您的 CMS。",
      includes: [
        "約 1,000 字文章，交付前完成撰寫與編輯",
        "與您一起確定關鍵字，並透明呈現研究過程",
        "對照目前排名靠前的頁面進行研究",
        "為搜尋結果頁撰寫標題和中繼描述",
        "加入內部連結，並更新舊文章連結至新文章",
        "發布到您的 CMS，並配好圖片",
      ],
      note: "搜尋排名的變化以月計，而不是以週計。建議以至少兩季後的效果來評估這項服務。",
    },
  },
  landing: {
    name: "著陸頁",
    unit: "個頁面",
    description:
      "一個頁面只做一件事：承接貼文和廣告帶來的流量，並將其轉換為預約。從文案、設計、建置到上線一站式完成，表單與追蹤也已串接。",
    details: {
      summary:
        "給流量一個更好的落點。我們打造聚焦轉換的著陸頁，將貼文和廣告帶來的興趣轉換為行動；從文案、設計到上線與追蹤，全程由我們負責。",
      includes: [
        "以轉換為導向的文案與設計",
        "完整建置於您的網域",
        "整合表單或預約功能",
        "上線即串接追蹤",
        "載入快速、適合行動裝置",
      ],
    },
  },
  email: {
    name: "電子郵件行銷",
    unit: "封郵件",
    description: "行銷郵件與自動化流程，由我們撰寫、設計並排程。",
    details: {
      summary:
        "電子郵件行銷從規劃到寄送全程交給我們。電子報、促銷郵件和公告的文案、設計、排程與成效報告皆由我們負責。",
      includes: ["郵件設計與文案", "行銷活動設定", "電子報與促銷郵件", "排程與寄送", "成效報告"],
      note: "不包含聯絡人名單設定和自動化郵件流程。",
    },
  },
  website: {
    name: "企業網站",
    unit: "個網站",
    description:
      "最多 5 個頁面，在您的網域上完成文案、設計與建置。當一個著陸頁不夠用時，這就是承接貼文和廣告流量的網站。",
    details: {
      summary:
        "企業網站從啟動到上線全程交給我們。文案、設計、建置、表單和追蹤皆由我們負責，並全部部署在您自己的網域。",
      includes: [
        "最多 5 個頁面",
        "文案與客製化設計",
        "網站建置與網域設定",
        "整合表單或預約功能",
        "包含追蹤",
        "全站適合行動裝置瀏覽",
      ],
      note: "電商網站和客製 Web 應用另行報價。",
    },
  },
};

const addOnText: Record<string, { name: string; price: string; unit?: string }> = {
  "extra-video": { name: "額外短影音", price: "$39/支", unit: "支影片" },
  rush: { name: "加急交付（24 小時）", price: "每項 +50%" },
};

export const zhHantPricing: typeof pricing = {
  ...pricing,
  kicker: "方案與價格",
  title: "訂閱制社群媒體全託管服務",
  intro: "選擇您需要的服務——貼文、短影音、著陸頁等，自由組合成適合您的方案，並可隨時調整。",
  services: pricing.services.map((service) => {
    const text = serviceText[service.id];
    return {
      ...service,
      name: text.name,
      unit: text.unit,
      description: text.description,
      details: text.details ? { ...service.details, ...text.details } : service.details,
    };
  }),
  infoDialog: { includesLabel: "包含內容", close: "關閉", addCta: "加入方案" },
  moreAddOns: {
    title: "更多附加項目與服務",
    meta: "額外影片 · 加急交付",
    action: "顯示全部",
    actionOpen: "收合",
    groups: pricing.moreAddOns.groups.map((group) => ({
      title: "更多內容",
      items: group.items.map((item) => ({ ...item, ...addOnText[item.id] })),
    })),
  },
  estimate: {
    label: "費用預估",
    subline: "月費方案 · 審核通過後扣款",
    includesIntro: "已包含在您所選社群頻道上的發布服務，每個平台包含 1 個帳號。",
    includes: ["可提供引導式導入與每月檢視", "14 天退款保證", "無合約，隨時取消。"],
    subtotalLabel: "每月小計",
    cta: "選擇此方案開始",
    ctaQuote: "傳送此方案取得報價",
    addOnNote: "額外影片和加急交付會隨方案一起報價，不會在結帳時收費。",
    shareLink: "複製此方案的分享連結",
    shareNote: "將這份完整方案的連結傳給客戶或團隊成員。",
    finePrint:
      "價格均以美元計。所選方案將按月自動續訂，您可隨時取消。訂閱即表示您同意我們的",
    terms: "服務條款（英文）",
    refunds: "退款政策（英文）",
  },
};

export const zhHantPricingUi: PricingUi = {
  mostPopular: "最受歡迎",
  from: "",
  fromSuffix: "起",
  remove: "移除",
  sample: "範例",
  fewer: "減少 {unit}",
  more: "增加 {unit}",
  about: "瞭解 {name}",
  add: "加入 {name}",
  removeNamed: "移除 {name}",
  nothingYet: "尚未加入任何服務。請從左側選擇。",
  oneTime: "單次",
  oneTimeLabel: "單次費用",
  once: " 一次",
  perMonth: "/月",
  linkCopied: "連結已複製",
  and: "和",
  finePrintGap: "",
  end: "。",
  singularise: false,
};

/* ------------------------------------------------------------- guarantee */

export const zhHantGuarantee: typeof guarantee = {
  kicker: "退款保證",
  title: "不滿意，全額退款",
  body: "每個新訂閱方案都享有 14 天滿意保證。",
  points: [
    { title: "14 天考慮期", body: "檢視第一批內容，並與團隊一起完成修改。" },
    { title: "至少 2 輪修改", body: "讓我們有機會把內容微調到更貼合您的品牌。" },
    {
      title: "首月退款",
      body: "如果您仍不滿意，且尚未核准或排程任何內容，我們將退還首月費用。",
    },
  ],
  badgeNumber: guarantee.badgeNumber,
  badgeLabel: "天期限",
};

/* ------------------------------------------------------------------- faq */

export const zhHantFaqs: typeof faqs = [
  {
    question: "內容是 AI 生成的嗎？",
    answer:
      "預設不會。您的內容由真人設計師、撰稿人、編輯和行銷人員創作。我們會運用科技提升效率，但創意與品質把關始終由人負責。只有在您明確提出需求時，我們才會提供 AI 生成影片。",
  },
  {
    question: "支援哪些社群平台？",
    answer:
      "我們支援 Instagram、Facebook、LinkedIn、TikTok、Pinterest、YouTube 和 Google 商家檔案。您的方案包含每個平台 1 個帳號，並可在導入時連結所需頻道。",
  },
  {
    question: "需要我的密碼嗎？",
    answer: "不需要。我們會以團隊成員身分加入各個平台，您可以隨時移除我們的存取權限。",
  },
  {
    question: "如果內容不準確怎麼辦？",
    answer:
      "沒問題——所有內容都會在發布前由您確認。只需在後台留下回饋，團隊就會進行修改。首月最多可修改三輪，之後每月一輪；符合資格的創意服務還享有 14 天滿意保證。",
  },
  {
    question: "退款政策是什麼？",
    answer: [
      "符合資格的創意服務首月享有 14 天滿意保證。如果您完成修改後仍不滿意，只要尚未核准或排程相關內容，我們將全額退還首月費用。",
      "保證適用於社群貼文、短影音、部落格文章、電子郵件設計，以及靜態和影片廣告。涉及較高前期成本或第三方費用的服務不在保障範圍內，包括 Meta 廣告、Google 廣告、託管式 SEO、UGC 影片和 Instagram 成長服務。",
      "您可以隨時取消任何服務，避免產生後續費用。如果註冊後未完成導入，已付款項將保留為永久有效的帳戶餘額。",
    ],
  },
];

export const zhHantFaqHeading = { kicker: "常見問題", title: "常見問題" };

/* ------------------------------------------------------------- final cta */

export const zhHantFinalCta: typeof finalCta = {
  title: "社群媒體管理-省時省力",
  body: "花 20 分鐘看看 PostSteer 是否適合您的業務。沒有推銷簡報，也沒有壓力。",
  primaryCta: "預約 20 分鐘示範",
  secondaryCta: "先看看常見問題",
};

/* ---------------------------------------------------------------- footer */

const columnText: { title: string; items: { label: string; href?: string }[] }[] = [
  {
    title: "社群媒體",
    items: [
      { label: "社群媒體管理代理" },
      { label: "社群媒體行銷" },
      { label: "短影音" },
      { label: "社群媒體案例" },
    ],
  },
  {
    title: "SEO 與內容",
    items: [
      { label: "SEO 服務" },
      { label: "外部連結建置服務" },
      { label: "SEO 部落格寫作" },
      { label: "電子郵件設計" },
    ],
  },
  {
    title: "公司",
    items: [
      { label: "全部服務" },
      { label: "價格", href: "/pricing" },
      { label: "關於我們" },
      { label: "客戶評價" },
      { label: "案例研究" },
      { label: "比較" },
    ],
  },
  {
    title: "資源",
    items: [
      { label: "部落格", href: "/blog" },
      { label: "行銷術語表", href: "/marketing-glossary" },
      { label: "服務地區", href: "/service-areas" },
      { label: "觀看示範" },
      { label: "預約示範", href: "/demo" },
      { label: "退款政策", href: "/legal/refund-policy" },
    ],
  },
];

const cityText = [
  "紐約",
  "洛杉磯",
  "芝加哥",
  "休士頓",
  "邁阿密",
  "亞特蘭大",
  "西雅圖",
  "丹佛",
  "聖地牙哥",
  "多倫多",
  "溫哥華",
  "蒙特婁",
];
const industryText = [
  "餐廳",
  "不動產",
  "牙醫",
  "健身房",
  "律師事務所",
  "美容美髮與水療",
  "電商",
  "醫療",
  "汽車經銷商",
  "教練",
  "居家服務",
];

/* Slugs come from the English names: the pages behind the links are English. */
const placesOf = (english: (string | { label: string; slug: string })[], zh: string[]) =>
  english.map((item, i) => ({
    label: zh[i],
    slug: slugify(typeof item === "string" ? item : item.label),
  }));

export const zhHantFooter: FooterCopy = {
  about:
    "一個一站式內容平台，讓創意團隊與我們自行開發的軟體協同工作，以比代理公司更快、更省的方式交付出眾內容。",
  status: { label: "所有系統運作正常" },
  columns: columnText,
  cities: {
    label: "依城市查看社群媒體管理服務：",
    items: placesOf(footer.cities.items, cityText),
    all: "全部城市",
  },
  industries: {
    label: "依產業查看：",
    items: placesOf(footer.industries.items, industryText),
  },
  legal: {
    leadIn: "PostSteer 是一家",
    linkText: "社群媒體管理代理公司",
    tail: "，自 2018 年起提供服務。",
    gap: "",
    copyrightTail: footer.legal.copyrightTail,
    links: [
      { label: "隱私權政策", href: "/legal/privacy" },
      { label: "服務條款", href: "/legal/terms" },
      { label: "退款政策", href: "/legal/refund-policy" },
    ],
  },
};

/* ----------------------------------------------------- demo bar and chat */

export const zhHantDemoBar: typeof demoBar = {
  title: "想知道整個流程如何運作？",
  subline: "免費 20 分鐘示範 · 瞭解平台並現場解答您的問題",
  cta: "預約示範",
  dismissLabel: "關閉",
};

export const zhHantChat: typeof chat = {
  label: "傳訊息給我們",
  closeLabel: "關閉",
  title: brand.name,
  subtitle: "我們會透過電子郵件回覆",
  greeting:
    "任何問題都可以問：價格、服務包含什麼，或這些服務是否適合您的業務。會有真人閱讀您的訊息，並通常在看到訊息的當天透過電子郵件回覆。",
  emailLabel: "您的電子郵件地址",
  emailPlaceholder: "you@yourbusiness.com",
  messageLabel: "訊息",
  messagePlaceholder: "您想瞭解什麼？",
  send: "傳送",
  sending: "傳送中",
  sentTitle: "已傳送。",
  sentBody:
    "訊息已進入我們的收件匣。回覆會寄到您留下的電子郵件地址，而不是這個視窗，所以無需保持頁面開啟。",
  sendAnother: "再傳一則",
  errorEmail: "這個電子郵件地址似乎有誤，請檢查後再試。",
  errorMessage: "請用一兩句話說明您的需求。",
  errorSend: "傳送失敗。請直接寄電子郵件給我們，訊息會送到同一個收件匣。",
  fallbackBody: "此版本中的訊息表單尚未串接。請直接寄電子郵件給我們，仍會由同一團隊處理。",
  directEmail: chat.directEmail,
  footnote: "我們只會使用您的電子郵件地址回覆，不作其他用途。",
};
