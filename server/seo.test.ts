import fs from "node:fs";
import { describe, it, expect } from "vitest";
import { articles, albums } from "../client/src/data/catalog";
import {
  SITE_NAME, getPublicPaths, metadataForPath, renderSeoHead, normalizePublicOrigin,
  renderSeoDocuments, jsonLdText,
} from "../client/src/seo/metadata";
import { renderDocument, renderPage } from "../client/src/seo/renderPage";

const origin = "https://sound-archive.example";
const template = fs.readFileSync(new URL("../client/index.html", import.meta.url), "utf8");

describe("破繭之聲 SEO metadata", () => {
  it("首頁標題完全符合指定文字，且中英文間有空格", () => {
    expect(metadataForPath("/").title).toBe("破繭之聲 Underground Sound Archive｜搖滾與金屬唱片誌");
    expect(SITE_NAME).toContain("破繭之聲 Underground");
  });

  it("56 個公開頁面各有獨立 title、description 與完整分享 metadata", () => {
    const paths = getPublicPaths();
    expect(paths).toHaveLength(56);
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const path of paths) {
      const metadata = metadataForPath(path, { origin });
      expect(metadata.status).toBe(200);
      expect(metadata.title.length, path).toBeGreaterThanOrEqual(30);
      expect(metadata.title.length, path).toBeLessThanOrEqual(60);
      expect(metadata.description.length, path).toBeGreaterThanOrEqual(50);
      expect(metadata.description.length, path).toBeLessThanOrEqual(160);
      expect(metadata.keywords.length).toBeGreaterThanOrEqual(3);
      expect(metadata.keywords.length).toBeLessThanOrEqual(8);
      const head = renderSeoHead(metadata);
      for (const key of ["og:type", "og:title", "og:description", "og:url", "og:site_name", "og:image", "og:image:alt", "twitter:card", "twitter:title", "twitter:description", "twitter:image", "twitter:image:alt"]) {
        expect(head, `${path} ${key}`).toContain(`"${key}"`);
      }
      expect(metadata.canonical).toBe(`${origin}${path === "/" ? "/" : `${path}/`}`);
      expect(metadata.image).toMatch(/^https:\/\//);
      expect(metadata.structuredData.length).toBeGreaterThan(0);
      titles.add(metadata.title);
      descriptions.add(metadata.description);
    }
    expect(titles.size).toBe(56);
    expect(descriptions.size).toBe(56);
  });

  it("未設定公開網域時不猜測 canonical，也不讓暫時預覽被收錄", () => {
    const metadata = metadataForPath("/");
    expect(metadata.canonical).toBeUndefined();
    expect(metadata.robots).toContain("noindex");
    expect(renderSeoHead(metadata)).not.toContain('rel="canonical"');
    expect(renderSeoHead(metadata)).not.toContain('property="og:url"');
    expect(renderSeoDocuments().robots).toBe("User-agent: *\nDisallow: /\n");
    expect(renderSeoDocuments().sitemap).not.toContain("<loc>");
  });

  it("正式 sitemap 與 robots 只包含實際公開路由，排除缺頁與 API", () => {
    const docs = renderSeoDocuments({ origin });
    expect((docs.sitemap.match(/<loc>/g) || []).length).toBe(56);
    expect(docs.sitemap).not.toContain("/404");
    expect(docs.sitemap).not.toContain("/api/");
    expect(docs.robots).toContain(`Sitemap: ${origin}/sitemap.xml`);
    expect(docs.robots).toContain("Allow: /");
  });

  it("拒絕內部網址與混入帳密的公開網址，JSON-LD 不允許突破 script 標籤", () => {
    for (const url of ["http://example.com", "https://localhost", "https://127.0.0.1", "https://3000-host.manus.computer", "https://test.manuspre.computer", "https://test.manus-asia.computer", "https://test.manuscomputer.ai", "https://test.manusvm.computer", "https://user:password@example.com", "https://example.com/path"]) {
      expect(() => normalizePublicOrigin(url)).toThrow();
    }
    expect(jsonLdText({ value: "</script><script>alert(1)</script>" })).not.toContain("</script>");
  });
});

describe("不執行 JavaScript 的內容可見性", () => {
  it("所有文章與專輯頁的實際正文已在初始 HTML，圖片均有 alt", () => {
    for (const path of getPublicPaths()) {
      const { body, metadata } = renderPage(path, { origin });
      expect(body, path).toContain("<h1");
      expect(body, path).toContain("<h2");
      expect(body).toContain("破繭之聲");
      expect(body.replace(/<!--[\s\S]*?-->/g, "")).toContain("</strong> <small>Underground Sound Archive");
      expect(body).not.toContain("RIFF//ATLAS");
      for (const img of body.match(/<img\b[^>]*>/g) || []) {
        expect(img, path).toMatch(/alt="[^"]+"/);
      }
      if (metadata.kind === "article") {
        const article = articles.find((item) => `/article/${item.slug}` === path)!;
        const firstParagraph = article.body.split("\n\n")[0].replace(/\[([^\]]+)\]\(https:\/\/[^)]+\)/g, "$1");
        const visibleText = body.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&");
        expect(visibleText).toContain(firstParagraph);
      }
      if (metadata.kind === "album") {
        const album = albums.find((item) => `/album/${item.id}` === path)!;
        expect(body).toContain("專輯導讀");
        expect(body).toContain(album.title.replace(/&/g, "&amp;"));
      }
    }
  });

  it("首頁大標不重複站名，保留原標語與精確電影外鏈", () => {
    const home = renderDocument(template, "/");
    expect(home.html).not.toContain('aria-label="Notifications alt+T"');
    const h1 = home.html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1];
    expect(h1).toContain("把音量開到");
    expect(h1).toContain("失真以外。");
    expect(h1).not.toContain("破繭之聲");
    expect(home.html).toContain('href="https://abiurl.me/Jc8uTl"');
    expect(home.html).toContain("資料來源與授權說明");
    expect(home.html).toContain('href="https://abiting.cc"');
    expect(home.html).toContain("本站由");
    expect(home.html).toContain("協助架設與維護");
    const special = renderDocument(template, "/article/spitz-beautiful-fin");
    expect(special.html).toContain('href="https://coai.abiting.cc/archives/1437"');
    expect(special.html).toContain('type="application/ld+json"');
    expect(special.html).not.toContain('<div id="root"></div>');
    expect(special.html).not.toContain("<!--site-seo:config-->");
  });

  it("未知路由與不存在的專輯／文章／樂團回傳 404 並 noindex", () => {
    for (const path of ["/not-a-page", "/album/missing", "/article/missing", "/artist/missing"]) {
      const document = renderDocument(template, path, { origin });
      expect(document.status).toBe(404);
      expect(document.metadata.robots).toBe("noindex, nofollow");
      expect(document.html).toContain("這一頁還沒印出來");
    }
  });
});
