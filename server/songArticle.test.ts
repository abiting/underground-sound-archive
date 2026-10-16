import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { articles } from "../client/src/data/catalog";
import { artistSlug, buildArtistIndex } from "../client/src/lib/catalogSearch";
import { getPublicPaths, metadataForPath } from "../client/src/seo/metadata";
import { renderDocument } from "../client/src/seo/renderPage";

const template = fs.readFileSync(new URL("../client/index.html", import.meta.url), "utf8");
const options = { origin: "https://abiting.github.io", basePath: "/underground-sound-archive/" };
const artist = "生物股長";
const article = articles.find(item => item.id === "ikimono-gakari-egao")!;
const articlePath = "/article/ikimono-gakari-egao";
const artistPath = "/artist/ikimono-gakari";
const genesectLink = "https://list.abitingpokedex.com/pokemon/genesect/zh";

describe("生物股長《笑顏》單曲導讀", () => {
  it("有完整原創故事、發行脈絡與至少兩個來源", () => {
    const hanCount = (article.body.match(/[\u3400-\u9fff]/g) ?? []).length;
    const paragraphs = article.body.split(/\n\s*\n/).filter(Boolean);
    expect(article.artist).toBe(artist);
    expect(article.year).toBe("2013");
    expect(hanCount).toBeGreaterThanOrEqual(500);
    expect(hanCount).toBeLessThanOrEqual(800);
    expect(paragraphs.length).toBeGreaterThanOrEqual(4);
    expect(paragraphs.length).toBeLessThanOrEqual(6);
    expect(article.sources.length).toBeGreaterThanOrEqual(2);
    expect(article.sources.some(source => source.url.includes("sonymusic.co.jp"))).toBe(true);
  });

  it("電影標題中的蓋諾賽克特連到指定圖鑑，並以安全外鏈呈現", () => {
    const page = renderDocument(template, articlePath, options);
    expect(page.status).toBe(200);
    expect(page.html).toContain(`href="${genesectLink}"`);
    expect(page.html).toContain(`>${"蓋諾賽克特"}</a>`);
    expect(page.html).toContain('rel="noopener noreferrer"');
    expect(page.html).toContain("Sony Music 官方《笑顔》單曲頁");
    expect(page.html).toContain('href="/underground-sound-archive/artist/ikimono-gakari/"');
  });

  it("文章和生物股長藝人頁皆納入路由、SEO、索引及子目錄連結", () => {
    expect(artistSlug(artist)).toBe("ikimono-gakari");
    expect(getPublicPaths()).toContain(articlePath);
    expect(getPublicPaths()).toContain(artistPath);
    const songMeta = metadataForPath(articlePath, options);
    expect(songMeta.status).toBe(200);
    expect(songMeta.title).toContain(artist);
    expect(songMeta.imageAlt).toContain(artist);
    expect(songMeta.imageAlt).not.toContain("Spitz");
    const home = renderDocument(template, "/", options).html;
    expect(home).toContain('href="/underground-sound-archive/artist/ikimono-gakari/"');
    expect(home).toContain(artist);
    const artistPage = renderDocument(template, artistPath, options);
    expect(artistPage.status).toBe(200);
    expect(artistPage.html).toContain("相關導讀");
    expect(artistPage.html).toContain(`href="/underground-sound-archive/article/ikimono-gakari-egao"`);
    expect(artistPage.html).toContain(`href="${genesectLink}"`);
  });
});
