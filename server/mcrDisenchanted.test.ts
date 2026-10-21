import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { albums, articles } from "../client/src/data/catalog";
import { buildArtistIndex, filterArticles } from "../client/src/lib/catalogSearch";
import { getPublicPaths, metadataForPath, renderSeoDocuments } from "../client/src/seo/metadata";
import { renderDocument } from "../client/src/seo/renderPage";

const template = fs.readFileSync(new URL("../client/index.html", import.meta.url), "utf8");
const options = { origin: "https://abiting.github.io", basePath: "/underground-sound-archive/" };
const articlePath = "/article/my-chemical-romance-disenchanted";
const artistPath = "/artist/my-chemical-romance";
const article = articles.find((item) => item.id === "my-chemical-romance-disenchanted");
if (!article) throw new Error("缺少 My Chemical Romance《Disenchanted》文章資料。");

function visibleParagraphStart(paragraph: string) {
  return paragraph.replace(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/g, "$1").slice(0, 12);
}

describe("My Chemical Romance《Disenchanted》文章導讀", () => {
  it("資料具備正確作品欄位、篇幅段落與查證來源", () => {
    const hanCount = (article.body.match(/[\u3400-\u9fff]/g) ?? []).length;
    const paragraphs = article.body.split(/\n\s*\n/).filter(Boolean);
    expect(article.slug).toBe("my-chemical-romance-disenchanted");
    expect(article.artist).toBe("My Chemical Romance");
    expect(article.year).toBe("2006");
    expect(article.category).toBe("另類搖滾");
    expect(article.tags).toEqual(expect.arrayContaining(["MCR", "Disenchanted", "The Black Parade"]));
    expect(article.albumId).toBeUndefined();
    expect(hanCount).toBeGreaterThanOrEqual(500);
    expect(hanCount).toBeLessThanOrEqual(800);
    expect(paragraphs).toHaveLength(5);
    expect(article.body).toContain("第 12 首");
    expect(article.body).toContain("4 分 55 秒");
    expect(article.body).toContain("Teenagers");
    expect(article.body).toContain("Famous Last Words");
    expect(article.body).toContain("本文將");
    expect(article.sources.length).toBeGreaterThanOrEqual(3);
    expect(article.sources.every((source) => source.url.startsWith("https://"))).toBe(true);
    expect(article.sources.some((source) => /music\.apple\.com/i.test(source.url))).toBe(true);
    expect(article.sources.some((source) => /altpress\.com|kerrang\.com/i.test(source.url))).toBe(true);
  });

  it("可用 MCR、歌名、分類與年代搜尋，且藝人索引只掛一份導讀", () => {
    const matching = filterArticles(articles, { query: "Disenchanted", category: "另類搖滾", decade: "2000s" });
    expect(matching).toContain(article);
    expect(filterArticles(articles, { query: "MCR", category: "全部", decade: "全部年代" })).toContain(article);
    expect(filterArticles(articles, { query: "Teenagers", category: "全部", decade: "全部年代" })).toContain(article);
    const entry = buildArtistIndex(albums, articles).find((artist) => artist.slug === "my-chemical-romance");
    expect(entry).toMatchObject({ name: "My Chemical Romance", albumCount: 1, guideCount: 2 });
  });

  it("文章與藝人頁納入公開路由，SSR 輸出五段正文及子目錄回鏈", () => {
    expect(getPublicPaths()).toContain(articlePath);
    expect(getPublicPaths()).toContain(artistPath);
    const articlePage = renderDocument(template, articlePath, options);
    expect(articlePage.status).toBe(200);
    for (const paragraph of article.body.split(/\n\s*\n/).filter(Boolean)) {
      expect(articlePage.html).toContain(visibleParagraphStart(paragraph));
    }
    const artistPage = renderDocument(template, artistPath, options);
    expect(artistPage.status).toBe(200);
    expect(artistPage.html).toContain("My Chemical Romance");
    expect(artistPage.html).toContain(`href="/underground-sound-archive/article/${article.id}"`);
    expect(articlePage.html).toContain('href="/underground-sound-archive/artist/my-chemical-romance/"');
  });

  it("文章的 canonical、分享 meta、JSON-LD 與 sitemap 均指向正式路徑", () => {
    const metadata = metadataForPath(articlePath, options);
    expect(metadata.status).toBe(200);
    expect(metadata.canonical).toBe("https://abiting.github.io/underground-sound-archive/article/my-chemical-romance-disenchanted/");
    expect(metadata.imageAlt).toContain("My Chemical Romance");
    expect(metadata.structuredData.some((entry) => entry["@type"] === "Article")).toBe(true);
    const page = renderDocument(template, articlePath, options);
    expect(page.html).toContain('rel="canonical"');
    expect(page.html).toContain('property="og:url"');
    expect(page.html).toContain('type="application/ld+json"');
    expect(renderSeoDocuments(options).sitemap).toContain("/underground-sound-archive/article/my-chemical-romance-disenchanted/");
  });

  it("網站 route manifest 宣告這篇文章與對應藝人頁", () => {
    const manifest = JSON.parse(fs.readFileSync(new URL("../client/public/manus-routes.json", import.meta.url), "utf8")) as { routes: Array<{ path: string }> };
    expect(manifest.routes.some((route) => route.path === articlePath)).toBe(true);
    expect(manifest.routes.some((route) => route.path === artistPath)).toBe(true);
  });
});
