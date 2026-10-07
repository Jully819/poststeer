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
 * THE SIMPLIFIED CHINESE HOME PAGE, and only the home page.
 *
 * A TRANSLATION, NOT A REWRITE. Every figure, plan, guarantee term and
 * product claim below is the English page's, word for word in meaning. The
 * numbers are never typed again here: prices, quantities, tiers, image keys
 * and icon ids are spread in from lib/content.ts, and only the words are
 * overlaid. So a price changed in the English catalogue changes here with it,
 * and this file cannot quote one that the checkout does not charge.
 *
 * WHERE A LINK LEADS. The buttons and links on /zh go to the existing English
 * pages (/pricing, /demo, /blog, the legal pages). Those pages have no
 * Chinese version, and the two legal links say so in their label.
 *
 * Typed against the English shapes, so adding a field there fails the build
 * here until it is translated.
 */

export const zhSeo: typeof seo = {
  title: "社交内容全托管 | PostSteer",
  description:
    "按月订阅社交帖子、短视频与排期发布服务。选择所需服务，提交一份需求，我们便会为您在各个渠道发布。",
};

/* ---------------------------------------------------------------- header */

export const zhHeader: HeaderCopy = {
  homeHref: "/zh",
  nav: [
    { label: "公司", href: "#company", dropdown: true },
    { label: "服务", href: "#services", dropdown: true },
    { label: "价格", href: "/pricing", dropdown: false },
    { label: "博客", href: "/blog", dropdown: false },
  ],
  cta: `${brand.priceFrom}/月起`,
  openMenu: "打开菜单",
  closeMenu: "关闭菜单",
  primaryNavLabel: "主导航",
  mobileNavLabel: "手机导航",
  langLinks: [
    { label: "English", href: "/", lang: "en", title: "View in English" },
    { label: "繁體中文", href: "/zh-hant", lang: "zh-Hant", title: "檢視繁體中文版" },
  ],
};

export const zhSkipLink = "跳到正文";

/* Names and taglines by slug; slugs, prices and icons come from the English
   menu, so a row cannot point at a page that is not there. */
const menuText: Record<string, { name: string; tagline: string; unit: string }> = {
  "social-media-posts": { name: "社交媒体帖子", tagline: "帖子、轮播帖和快拍", unit: "/月" },
  "short-form-videos": { name: "短视频", tagline: "Reels、TikTok 和 Shorts", unit: "/月" },
  "chinese-social-media-posts": {
    name: "中文社交媒体",
    tagline: "小红书帖子（简体中文）",
    unit: "",
  },
  "seo-blog-posts": { name: "SEO 博客文章", tagline: "面向搜索排名的长篇内容", unit: "/月" },
  "business-website": { name: "企业网站", tagline: "最多 5 个页面，使用您的域名", unit: "一次性" },
  "landing-pages": { name: "落地页", tagline: "以转化为目标的设计与开发", unit: "一次性" },
  "email-marketing": { name: "邮件营销", tagline: "营销活动与自动化邮件流程", unit: "/月" },
};
const menuGroupTitle = ["社交媒体", "SEO", "网站与邮件"];

export const zhServicesMenu: typeof servicesMenu = {
  fromLabel: "",
  fromSuffix: "起",
  onEnquiry: "询价",
  stats: ["自 2018 年起", "14 天保证"],
  groups: servicesMenu.groups.map((group, i) => ({
    ...group,
    title: menuGroupTitle[i],
    viewAll: "查看全部",
    items: group.items.map((item) => ({ ...item, ...menuText[item.slug] })),
  })),
  footerLeft: "查看全部服务与价格",
  footerRight: `${brand.priceFrom}/月起`,
};

/* ------------------------------------------------------------------ hero */

const highlightText = [
  { title: "定制内容", body: "为您的品牌量身打造帖子、短视频和快拍。" },
  { title: "质量把关", body: "每项交付内容在发布前都会经过审核。" },
  { title: "无合约", body: "随时取消。" },
];

export const zhHero: typeof hero = {
  ...hero,
  headlineLead: "订阅制社交内容",
  headlineAccent: `${brand.priceFrom}/月起`,
  subheadParagraph:
    "每月持续产出新帖子、短视频和快拍，让品牌保持曝光与互动。",
  highlights: hero.highlights.map((item, i) => ({ ...item, ...highlightText[i] })),
  showcase: { ...hero.showcase, handle: "[您的品牌]", posted: "2 小时前" },
  primaryCta: "预约演示",
  secondaryCta: `${brand.priceFrom}/月起`,
  footnote: [
    { text: `${brand.priceFrom}/月起`, strong: true },
    { text: "无合约", strong: false },
    { text: "14 天退款保证", strong: false },
  ],
};

export const zhLogoStrip: typeof logoStrip = {
  ...logoStrip,
  label: "客户在哪里，内容就发布到哪里。",
};

/* ---------------------------------------------------------- how it works */

const stepText = [
  { title: "了解您的品牌", body: "告诉我们您的业务、目标和品牌风格。" },
  { title: "我们来创作", body: "我们为您设计帖子、短视频和快拍。" },
  { title: "您来审核", body: "查看内容、提出修改意见并确认发布。" },
  { title: "我们来发布", body: "我们会为您排期，并发布到各个渠道。" },
];

export const zhDeliverables: typeof deliverables = {
  ...deliverables,
  kicker: "服务流程",
  titleLead: "快速见效",
  titleAccent: "只需 4 步",
  steps: deliverables.steps.map((step, i) => ({ ...step, ...stepText[i] })),
  brandForm: {
    ...deliverables.brandForm,
    title: "您的品牌",
    nameLabel: "企业名称",
    namePlaceholder: "[您的企业]",
    goalLabel: "您的目标是什么？",
    goalValue: "提升品牌知名度",
    uploadLabel: "上传灵感参考",
  },
  approve: {
    ...deliverables.approve,
    comment: "看起来很棒。可以试试深色背景的版本吗？",
    ago: "2 分钟前",
    label: "已通过",
  },
  publish: {
    ...deliverables.publish,
    title: "本周",
    days: ["周一", "周二", "周三", "周四", "周五"],
  },
};

/* ------------------------------------------------------------- portfolio */

const typeLabel: Record<string, string> = {
  all: "全部",
  posts: "帖子",
  stories: "快拍",
  shortform: "短视频",
  ads: "广告",
  email: "邮件",
};
const industryLabel: Record<string, string> = {
  food: "餐饮",
  beauty: "健康与美容",
  hospitality: "酒店与住宿",
  retail: "零售与产品",
  pets: "宠物",
};

export const zhGallery: typeof gallery = {
  ...gallery,
  kicker: "作品集",
  title: "创意团队打造，为脱颖而出而生",
  types: gallery.types.map((tab) => ({ ...tab, label: typeLabel[tab.id] })),
  featuredLabel: "精选",
  allLabel: "全部",
  industries: gallery.industries.map((item) => ({ ...item, label: industryLabel[item.id] })),
  seeAll: "查看全部示例",
  more: "查看更多示例",
  empty: "作品库里暂时没有符合这两个条件的案例。",
};

/* --------------------------------------------------------------- pricing */

/* Text only. `perUnit`, `tiers`, quantities, `fixed`, `oneTime` and
   `previews` are the English catalogue's, matched by id. */
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
    name: "社交媒体帖子",
    unit: "条帖子",
    description: "我们为您制作帖子、撰写配文并规划内容。您只需查看并确认。",
  },
  video: {
    name: "短视频",
    unit: "条视频",
    description: "使用您的素材剪辑竖版视频，加上字幕，并适配各个平台尺寸。",
    details: {
      summary:
        "短视频全流程交给我们。我们将您的素材或精选片段制作成 Reels、TikTok 和 Shorts，并处理吸睛开场、字幕、音乐与品牌化剪辑。",
      includes: [
        "全流程视频剪辑",
        "吸睛开场、字幕与音乐一并处理",
        "品牌视觉与动态效果",
        "适配 Reels、TikTok 和 Shorts",
        "为您排期并发布",
        "包含修改轮次",
      ],
    },
  },
  blog: {
    name: "SEO 博客文章",
    unit: "篇文章",
    description:
      "根据用户真实搜索需求调研长篇文章，由真人撰写，并发布到您的 CMS；标题、元数据和内部链接均已设置完成。",
    details: {
      summary:
        "SEO 博客文章从关键词到上线页面全程负责。我们与您一起确定目标关键词，研究当前排名靠前的页面，撰写约 1,000 字、真正有人愿意读完的文章，并连同内部链接发布到您的 CMS。",
      includes: [
        "约 1,000 字文章，交付前完成撰写与编辑",
        "与您一起确定关键词，并透明展示研究过程",
        "对照当前排名靠前的页面进行调研",
        "为搜索结果页撰写标题和元描述",
        "添加内部链接，并更新旧文章链接至新文章",
        "发布到您的 CMS，并配好图片",
      ],
      note: "搜索排名的变化以月计，而不是以周计。建议以至少两个季度后的效果来评估这项服务。",
    },
  },
  landing: {
    name: "落地页",
    unit: "个页面",
    description:
      "一个页面只做一件事：承接帖子和广告带来的流量，并将其转化为预约。从文案、设计、搭建到上线一站式完成，表单与追踪也已接好。",
    details: {
      summary:
        "给流量一个更好的落点。我们打造聚焦转化的落地页，将帖子和广告带来的兴趣转化为行动；从文案、设计到上线与追踪，全程由我们负责。",
      includes: [
        "以转化为导向的文案与设计",
        "完整搭建在您的域名上",
        "集成表单或预约功能",
        "上线即接通追踪",
        "加载快速、适配移动端",
      ],
    },
  },
  email: {
    name: "邮件营销",
    unit: "封邮件",
    description: "营销邮件与自动化流程，由我们撰写、设计并排期。",
    details: {
      summary:
        "邮件营销从策划到发送全程交给我们。新闻通讯、促销邮件和公告的文案、设计、排期与数据报告均由我们负责。",
      includes: ["邮件设计与文案", "营销活动设置", "新闻通讯与促销邮件", "排期与发送", "成效报告"],
      note: "不包含联系人名单设置和自动化邮件流程。",
    },
  },
  website: {
    name: "企业网站",
    unit: "个网站",
    description:
      "最多 5 个页面，在您的域名上完成文案、设计与搭建。当一个落地页不够用时，这就是承接帖子和广告流量的网站。",
    details: {
      summary:
        "企业网站从启动到上线全程交给我们。文案、设计、搭建、表单和追踪均由我们负责，并全部部署在您自己的域名上。",
      includes: [
        "最多 5 个页面",
        "文案与定制设计",
        "网站搭建与域名设置",
        "集成表单或预约功能",
        "包含追踪",
        "全站适配移动端",
      ],
      note: "电商网站和定制 Web 应用另行报价。",
    },
  },
};

const addOnText: Record<string, { name: string; price: string; unit?: string }> = {
  "extra-video": { name: "额外短视频", price: "$39/条", unit: "条视频" },
  rush: { name: "加急交付（24 小时）", price: "每项 +50%" },
};

export const zhPricing: typeof pricing = {
  ...pricing,
  kicker: "方案与价格",
  title: "订阅制社交媒体全托管服务",
  intro:
    "选择您需要的服务——帖子、短视频、落地页等，自由组合成适合您的方案，并可随时调整。",
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
  infoDialog: { includesLabel: "包含内容", close: "关闭", addCta: "加入方案" },
  moreAddOns: {
    title: "更多附加项与服务",
    meta: "额外视频 · 加急交付",
    action: "显示全部",
    actionOpen: "收起",
    groups: pricing.moreAddOns.groups.map((group) => ({
      title: "更多内容",
      items: group.items.map((item) => ({ ...item, ...addOnText[item.id] })),
    })),
  },
  estimate: {
    label: "预估费用",
    subline: "月度方案 · 审核通过后扣款",
    includesIntro: "已包含在您所选社交渠道上的发布服务，每个平台包含 1 个账号。",
    includes: ["可提供引导式入驻和每月回访", "14 天退款保证", "无合约，随时取消。"],
    subtotalLabel: "每月小计",
    cta: "选择此方案开始",
    ctaQuote: "发送此方案获取报价",
    addOnNote: "额外视频和加急交付会随方案一起报价，不会在结账时收费。",
    shareLink: "复制此方案的分享链接",
    shareNote: "将这份完整方案的链接发送给客户或团队成员。",
    finePrint:
      "价格均以美元计。所选方案将按月自动续订，您可随时取消。订阅即表示您同意我们的",
    terms: "服务条款（英文）",
    refunds: "退款政策（英文）",
  },
};

export const zhPricingUi: PricingUi = {
  mostPopular: "最受欢迎",
  from: "",
  fromSuffix: "起",
  remove: "移除",
  sample: "示例",
  fewer: "减少 {unit}",
  more: "增加 {unit}",
  about: "了解 {name}",
  add: "添加 {name}",
  removeNamed: "移除 {name}",
  nothingYet: "尚未添加任何服务。请从左侧选择。",
  oneTime: "一次性",
  oneTimeLabel: "一次性费用",
  once: " 一次",
  perMonth: "/月",
  linkCopied: "链接已复制",
  and: "和",
  finePrintGap: "",
  end: "。",
  singularise: false,
};

/* ------------------------------------------------------------- guarantee */

export const zhGuarantee: typeof guarantee = {
  kicker: "退款保证",
  title: "不满意，全额退款",
  body: "每个新订阅方案都享有 14 天满意保证。",
  points: [
    { title: "14 天考虑期", body: "查看第一批内容，并与团队一起完成修改。" },
    { title: "至少 2 轮修改", body: "让我们有机会把内容微调到更贴合您的品牌。" },
    {
      title: "首月退款",
      body: "如果您仍不满意，且尚未批准或排期任何内容，我们将退还首月费用。",
    },
  ],
  badgeNumber: guarantee.badgeNumber,
  badgeLabel: "天期限",
};

/* ------------------------------------------------------------------- faq */

export const zhFaqs: typeof faqs = [
  {
    question: "内容是 AI 生成的吗？",
    answer:
      "默认不会。您的内容由真人设计师、撰稿人、编辑和营销人员创作。我们会借助技术提升效率，但创意与质量把关始终由人负责。只有在您明确提出需求时，我们才会提供 AI 生成视频。",
  },
  {
    question: "支持哪些社交平台？",
    answer:
      "我们支持 Instagram、Facebook、LinkedIn、TikTok、Pinterest、YouTube 和 Google 商家资料。您的方案包含每个平台 1 个账号，并可在入驻时连接所需渠道。",
  },
  {
    question: "需要我的密码吗？",
    answer: "不需要。我们会以团队成员身份加入各个平台，您可以随时移除我们的访问权限。",
  },
  {
    question: "如果内容不准确怎么办？",
    answer:
      "没问题——所有内容都会在发布前由您确认。只需在后台留下反馈，团队就会进行修改。首月最多可修改三轮，之后每月一轮；符合条件的创意服务还享有 14 天满意保证。",
  },
  {
    question: "退款政策是什么？",
    answer: [
      "符合条件的创意服务首月享有 14 天满意保证。如果您完成修改后仍不满意，只要尚未批准或排期相关内容，我们将全额退还首月费用。",
      "保证适用于社交帖子、短视频、博客文章、邮件设计，以及静态和视频广告。涉及较高前期成本或第三方费用的服务不在保障范围内，包括 Meta 广告、Google 广告、托管式 SEO、UGC 视频和 Instagram 增长服务。",
      "您可以随时取消任何服务，避免产生后续费用。如果注册后未完成入驻，已付款项将保留为永久有效的账户余额。",
    ],
  },
];

export const zhFaqHeading = { kicker: "常见问题", title: "常见问题" };

/* ------------------------------------------------------------- final cta */

export const zhFinalCta: typeof finalCta = {
  title: "社交媒体管理-省时省力",
  body: "花 20 分钟看看 PostSteer 是否适合您的业务。没有推销简报，也没有压力。",
  primaryCta: "预约 20 分钟演示",
  secondaryCta: "先看看常见问题",
};

/* ---------------------------------------------------------------- footer */

const columnText: { title: string; items: { label: string; href?: string }[] }[] = [
  {
    title: "社交媒体",
    items: [
      { label: "社交媒体管理代理" },
      { label: "社交媒体营销" },
      { label: "短视频" },
      { label: "社交媒体案例" },
    ],
  },
  {
    title: "SEO 与内容",
    items: [
      { label: "SEO 服务" },
      { label: "外链建设服务" },
      { label: "SEO 博客写作" },
      { label: "邮件设计" },
    ],
  },
  {
    title: "公司",
    items: [
      { label: "全部服务" },
      { label: "价格", href: "/pricing" },
      { label: "关于我们" },
      { label: "客户评价" },
      { label: "案例研究" },
      { label: "对比" },
    ],
  },
  {
    title: "资源",
    items: [
      { label: "博客", href: "/blog" },
      { label: "营销术语表", href: "/marketing-glossary" },
      { label: "服务地区", href: "/service-areas" },
      { label: "观看演示" },
      { label: "预约演示", href: "/demo" },
      { label: "退款政策", href: "/legal/refund-policy" },
    ],
  },
];

const cityText = [
  "纽约",
  "洛杉矶",
  "芝加哥",
  "休斯敦",
  "迈阿密",
  "亚特兰大",
  "西雅图",
  "丹佛",
  "圣迭戈",
  "多伦多",
  "温哥华",
  "蒙特利尔",
];
const industryText = [
  "餐厅",
  "房地产",
  "牙医",
  "健身房",
  "律所",
  "美容美发与水疗",
  "电商",
  "医疗",
  "汽车经销商",
  "教练",
  "家政服务",
];

/* The slugs come from the English names, because the pages behind the links
   are the English ones. */
const placesOf = (english: (string | { label: string; slug: string })[], zh: string[]) =>
  english.map((item, i) => ({
    label: zh[i],
    slug: slugify(typeof item === "string" ? item : item.label),
  }));

export const zhFooter: FooterCopy = {
  about:
    "一个一站式内容平台，让创意团队与我们自研的软件协同工作，以比代理公司更快、更省的方式交付出众内容。",
  status: { label: "所有系统运行正常" },
  columns: columnText,
  cities: {
    label: "按城市查看社交媒体管理服务：",
    items: placesOf(footer.cities.items, cityText),
    all: "全部城市",
  },
  industries: {
    label: "按行业查看：",
    items: placesOf(footer.industries.items, industryText),
  },
  legal: {
    leadIn: "PostSteer 是一家",
    linkText: "社交媒体管理代理公司",
    tail: "，自 2018 年起提供服务。",
    gap: "",
    copyrightTail: footer.legal.copyrightTail,
    links: [
      { label: "隐私政策", href: "/legal/privacy" },
      { label: "服务条款", href: "/legal/terms" },
      { label: "退款政策", href: "/legal/refund-policy" },
    ],
  },
};

/* ----------------------------------------------------- demo bar and chat */

export const zhDemoBar: typeof demoBar = {
  title: "想知道整个流程怎么运作？",
  subline: "免费 20 分钟演示 · 了解平台并现场解答您的问题",
  cta: "预约演示",
  dismissLabel: "关闭",
};

export const zhChat: typeof chat = {
  label: "给我们留言",
  closeLabel: "关闭",
  title: brand.name,
  subtitle: "我们会通过邮件回复",
  greeting:
    "任何问题都可以问：价格、服务包含什么，或这些服务是否适合您的业务。会有真人阅读您的留言，并通常在看到留言的当天通过邮件回复。",
  emailLabel: "您的邮箱",
  emailPlaceholder: "you@yourbusiness.com",
  messageLabel: "留言",
  messagePlaceholder: "您想了解什么？",
  send: "发送",
  sending: "发送中",
  sentTitle: "已发送。",
  sentBody:
    "消息已进入我们的收件箱。回复会发送到您留下的邮箱，而不是这个窗口，所以无需保持页面开启。",
  sendAnother: "再发一条",
  errorEmail: "这个邮箱地址似乎有误，请检查后重试。",
  errorMessage: "请用一两句话说明您的需求。",
  errorSend: "发送失败。请直接给我们发邮件，消息会送到同一个收件箱。",
  fallbackBody: "此版本中的留言表单尚未接通。请直接给我们发邮件，仍会由同一团队处理。",
  directEmail: chat.directEmail,
  footnote: "我们只会使用您的邮箱地址回复，不作其他用途。",
};
