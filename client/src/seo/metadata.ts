import { albums, articles } from "../data/catalog";
import { normalizeBasePath, withBasePath } from "../lib/sitePaths";

export const SITE_NAME = "破繭之聲 Underground Sound Archive｜搖滾與金屬唱片誌";
export const BRAND_NAME = "破繭之聲";
export const ENGLISH_NAME = "Underground Sound Archive";
export const SITE_DESCRIPTION = "破繭之聲 Underground Sound Archive 是以繁體中文探索搖滾、重金屬與唱片文化的線上場刊。從 Queen、Pink Floyd 到 Metallica 與 Slipknot，閱讀專輯導讀、樂團背景、代表曲目與聲音脈絡，依類型或年代尋找下一張值得重播的唱片。";
export const SITE_KEYWORDS = ["搖滾", "重金屬", "專輯導讀", "樂團介紹", "唱片評論", "音樂史", "破繭之聲"];
export const SOCIAL_IMAGE_PATH = "/images/underground-social.jpg";
export const DEFAULT_SOCIAL_IMAGE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663217818186/wjjvFTNJhRwXPVCd.jpg";

export type PageMetadata = {
  kind: "home" | "article" | "album" | "artist" | "not-found";
  path: string;
  title: string;
  description: string;
  keywords: string[];
  image: string;
  imageAlt: string;
  ogType: "website" | "article";
  status: 200 | 404;
  canonical?: string;
  robots: string;
  structuredData: Record<string, unknown>[];
};

export type SeoOptions = { origin?: string; socialImage?: string; basePath?: string };

export function normalizePublicOrigin(value?: string): string | undefined {
  if (!value?.trim()) return undefined;
  let url: URL;
  try { url = new URL(value.trim()); } catch { throw new Error("PUBLIC_SITE_ORIGIN 必須是完整 HTTPS 網址。"); }
  if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("PUBLIC_SITE_ORIGIN 只能包含正式 HTTPS 網域，不含帳密、路徑或查詢字串。");
  }
  const previewDomains = ["manus.computer", "manuspre.computer", "manus-asia.computer", "manuscomputer.ai", "manusvm.computer"];
  const isPreview = previewDomains.some((domain) => url.hostname === domain || url.hostname.endsWith(`.${domain}`));
  const isLocal = url.hostname === "localhost" || url.hostname === "0.0.0.0" || url.hostname === "[::1]" || /^127\./.test(url.hostname);
  if (isPreview || isLocal) {
    throw new Error("PUBLIC_SITE_ORIGIN 不可設定為內部位址或暫時預覽網址。");
  }
  return url.origin;
}

export function artistSlug(name: string): string {
  return name.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function getPublicPaths(): string[] {
  return [
    "/",
    ...articles.map((article) => `/article/${article.slug}`),
    ...Array.from(new Set([
      ...articles.map((article) => `/artist/${artistSlug(article.artist)}`),
      ...albums.map((album) => `/artist/${artistSlug(album.artist)}`),
    ])),
    ...albums.map((album) => `/album/${album.id}`),
  ];
}

function publicPagePath(path: string, basePath: string): string {
  const prefixed = withBasePath(path, basePath).replace(/\/+$/, "");
  return `${prefixed}/` || "/";
}

function uniqueKeywords(values: string[]): string[] {
  return Array.from(new Set(values)).slice(0, 8);
}

export function metadataForPath(pathname: string, options: SeoOptions = {}): PageMetadata {
  const path = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const origin = normalizePublicOrigin(options.origin);
  const basePath = normalizeBasePath(options.basePath);
  const homeUrl = origin ? `${origin}${withBasePath("/", basePath)}` : undefined;
  const socialImage = options.socialImage || DEFAULT_SOCIAL_IMAGE;
  const metadata: PageMetadata = {
    kind: "not-found", path, title: `找不到頁面｜${BRAND_NAME} ${ENGLISH_NAME}`,
    description: "這個唱片誌頁面不存在或已移動。回到破繭之聲 Underground Sound Archive，從搖滾與金屬專輯導讀、樂團索引及年代分類重新探索音樂。",
    keywords: SITE_KEYWORDS, image: socialImage, imageAlt: "破繭之聲：紅色燈光下的地下搖滾演出主視覺",
    ogType: "website", status: 404, robots: "noindex, nofollow", structuredData: [],
  };
  let mainEntity: Record<string, unknown> | undefined;
  if (path === "/") {
    Object.assign(metadata, { kind: "home", title: SITE_NAME, description: SITE_DESCRIPTION, status: 200 });
  } else if (path.startsWith("/article/")) {
    const article = articles.find((item) => path === `/article/${item.slug}`);
    if (article) {
      const album = albums.find((item) => item.id === article.albumId);
      Object.assign(metadata, {
        kind: "article", status: 200, title: article.albumId ? `${article.title}｜${BRAND_NAME}` : `${article.title}｜${BRAND_NAME} ${ENGLISH_NAME}`,
        description: `${article.summary} 本篇從 ${article.year} 年的作品脈絡、聲音風格與聆聽細節切入，附查證來源與延伸閱讀。`,
        keywords: uniqueKeywords([article.artist, article.category, ...article.tags, "專輯導讀", BRAND_NAME]),
        image: album?.coverUrl || socialImage,
        imageAlt: album ? `${album.artist}《${album.title}》專輯封面` : "紅色燈光下的地下搖滾演出：Spitz〈美しい鰭〉文章配圖",
        ogType: "article",
      });
      mainEntity = {
        "@type": "Article", headline: article.title, description: metadata.description,
        inLanguage: "zh-Hant", articleSection: article.category, keywords: metadata.keywords.join(","),
        image: metadata.image, author: { "@type": "Organization", name: BRAND_NAME },
        publisher: { "@type": "Organization", name: SITE_NAME },
        about: { "@type": "MusicGroup", name: article.artist },
      };
    }
  } else if (path.startsWith("/album/")) {
    const album = albums.find((item) => path === `/album/${item.id}`);
    if (album) {
      Object.assign(metadata, {
        kind: "album", status: 200, title: `${album.artist}《${album.title}》${album.title.length > 25 ? "專輯導讀" : "專輯導讀、曲目與聆聽指南"}｜${BRAND_NAME}`,
        description: `探索 ${album.artist} 在 ${album.year} 年推出的《${album.title}》：${album.genre} 聲音風格、${album.trackCount} 首曲目與代表聽點。閱讀原創專輯導讀、封面來源和相關樂團文章，找到完整唱片脈絡。`,
        keywords: uniqueKeywords([album.artist, album.title, album.genre, "專輯評論", "曲目介紹", BRAND_NAME]),
        image: album.coverUrl, imageAlt: `${album.artist}《${album.title}》專輯封面`,
      });
      mainEntity = { "@type": "MusicAlbum", name: album.title, byArtist: { "@type": "MusicGroup", name: album.artist },
        datePublished: album.year, numTracks: album.trackCount, genre: album.genre, image: album.coverUrl,
        sameAs: [album.musicbrainzUrl], description: metadata.description };
    }
  } else if (path.startsWith("/artist/")) {
    const related = articles.filter((item) => path === `/artist/${artistSlug(item.artist)}`);
    const records = albums.filter((item) => path === `/artist/${artistSlug(item.artist)}`);
    if (related.length || records.length) {
      const artist = related[0]?.artist ?? records[0].artist;
      const category = related[0]?.category ?? records[0].genre;
      const representative = records[0];
      const tagKeywords = related[0]?.tags ?? ["代表專輯"];
      Object.assign(metadata, {
        kind: "artist", status: 200, title: `${artist} 樂團介紹與代表專輯｜${BRAND_NAME} ${ENGLISH_NAME}`,
        description: related[0]
          ? `認識 ${artist} 的${category}聲音風格、代表作品與唱片脈絡。破繭之聲樂團索引彙整原創專輯導讀、代表曲目和可核對的發行資料，帶你從樂團名字開始深入探索搖滾與金屬。`
          : `查看破繭之聲收錄的 ${artist} 專輯資料、曲目重點與封面來源。從《${representative.title}》開始，認識這張 ${representative.year} 年的${category}代表作品。`,
        keywords: uniqueKeywords([artist, category, "樂團介紹", "代表專輯", ...tagKeywords, BRAND_NAME]),
        image: representative?.coverUrl || socialImage,
        imageAlt: representative ? `${artist} 代表專輯《${representative.title}》封面` : "紅色燈光下的地下搖滾演出：樂團索引頁配圖",
      });
      mainEntity = { "@type": "MusicGroup", name: artist, genre: category, description: metadata.description };
    }
  }

  if (metadata.status === 404) return metadata;
  metadata.robots = origin ? "index, follow, max-image-preview:large" : "noindex, follow";
  if (origin) metadata.canonical = `${origin}${publicPagePath(path, basePath)}`;
  const website: Record<string, unknown> = { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME,
    alternateName: [BRAND_NAME, ENGLISH_NAME], description: SITE_DESCRIPTION, inLanguage: "zh-Hant" };
  if (homeUrl) website.url = homeUrl;
  metadata.structuredData.push(website);
  if (mainEntity) {
    mainEntity["@context"] = "https://schema.org";
    if (metadata.canonical) mainEntity.url = metadata.canonical;
    metadata.structuredData.push(mainEntity);
  }
  if (metadata.canonical && path !== "/") {
    metadata.structuredData.push({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: BRAND_NAME, item: homeUrl },
      { "@type": "ListItem", position: 2, name: metadata.title.split("｜")[0], item: metadata.canonical },
    ] });
  }
  return metadata;
}

export function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export function jsonLdText(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
}

export function renderSeoHead(meta: PageMetadata): string {
  const tag = (key: string, value: string, property = false) => `<meta ${property ? "property" : "name"}="${key}" content="${escapeHtml(value)}" data-site-seo="true" />`;
  return [
    `<title data-site-seo="true">${escapeHtml(meta.title)}</title>`, tag("description", meta.description),
    tag("keywords", meta.keywords.join(", ")), tag("robots", meta.robots), tag("author", BRAND_NAME),
    tag("og:locale", "zh_TW", true), tag("og:type", meta.ogType, true), tag("og:site_name", SITE_NAME, true),
    tag("og:title", meta.title, true), tag("og:description", meta.description, true),
    tag("og:image", meta.image, true), tag("og:image:alt", meta.imageAlt, true),
    tag("twitter:card", "summary_large_image"), tag("twitter:title", meta.title), tag("twitter:description", meta.description),
    tag("twitter:image", meta.image), tag("twitter:image:alt", meta.imageAlt),
    ...(meta.canonical ? [`<link rel="canonical" href="${escapeHtml(meta.canonical)}" data-site-seo="true" />`, tag("og:url", meta.canonical, true)] : []),
    ...meta.structuredData.map((entry) => `<script type="application/ld+json" data-site-seo="true">${jsonLdText(entry)}</script>`),
  ].join("\n    ");
}

export function renderSeoDocuments(options: SeoOptions = {}) {
  const origin = normalizePublicOrigin(options.origin);
  const basePath = normalizeBasePath(options.basePath);
  const urls = getPublicPaths().map(route => publicPagePath(route, basePath));
  const sitemapTemplate = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((path) => `  <url><loc>{{PUBLIC_SITE_ORIGIN}}${path}</loc></url>`).join("\n")}\n</urlset>\n`;
  return {
    robots: origin ? `User-agent: *\nAllow: /\nDisallow: ${withBasePath("/api/", basePath)}\nDisallow: ${withBasePath("/__manus__/", basePath)}\nDisallow: ${withBasePath("/__system__/", basePath)}\nSitemap: ${origin}${withBasePath("/sitemap.xml", basePath)}\n` : "User-agent: *\nDisallow: /\n",
    sitemap: origin ? sitemapTemplate.replaceAll("{{PUBLIC_SITE_ORIGIN}}", escapeHtml(origin)) : '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>\n',
    sitemapTemplate,
  };
}
