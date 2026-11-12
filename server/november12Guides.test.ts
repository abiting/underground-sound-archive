import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { albums, articles } from "../client/src/data/catalog";
import { november12Albums } from "../client/src/data/november12Albums";
import { november12Articles } from "../client/src/data/november12Articles";
import { artistSlug, buildArtistIndex, catalogCategories, catalogGuideCount, filterAlbums, filterArticles } from "../client/src/lib/catalogSearch";
import { getPublicPaths, metadataForPath, renderSeoDocuments } from "../client/src/seo/metadata";
import { renderDocument } from "../client/src/seo/renderPage";

const template = fs.readFileSync(new URL("../client/index.html", import.meta.url), "utf8");
const origin = "https://chrysalismusicusa.com";
const options = { origin, basePath: "/" };
const filters = (query: string, category = "全部") => ({ query, category, decade: "全部年代" });
const cjkCount = (text: string) => (text.match(/[\u3400-\u9fff]/g) ?? []).length;
const paragraphs = (text: string) => text.split(/\n\s*\n/).filter(Boolean).length;
const readable = (html: string) => html.replace(/<!--[\s\S]*?-->/g, "").replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, "&");
const nightmare = () => november12Albums.find((item) => item.id === "avenged-sevenfold-nightmare")!;
const mahler = () => november12Albums.find((item) => item.artist === "Berliner Philharmoniker")!;

function assertUniqueSources(html: string) {
  const section = html.match(/<div class="article-sources">([\s\S]*?)<\/div>/)?.[1];
  expect(section).toBeTruthy();
  const urls = [...section!.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((match) => match[1]);
  expect(new Set(urls).size).toBe(urls.length);
}

describe("Nightmare、Fiction 與 Rattle／柏林愛樂馬勒九號", () => {
  it("新增三篇不同導讀，保留既有專輯並更新全站 235 個公開路由", () => {
    expect(november12Albums).toHaveLength(2);
    expect(november12Articles).toHaveLength(1);
    expect(albums).toHaveLength(91);
    expect(articles).toHaveLength(68);
    expect(buildArtistIndex(albums, articles)).toHaveLength(75);
    expect(catalogGuideCount(albums, articles)).toBe(149);
    expect(getPublicPaths()).toHaveLength(235);
    expect(new Set(albums.map((item) => item.id)).size).toBe(albums.length);
    expect(albums.some((item) => item.artist === "Avenged Sevenfold" && item.title === "City of Evil")).toBe(true);
    expect(articles.some((item) => item.artist === "Avenged Sevenfold" && /Bat Country/.test(item.title))).toBe(true);
    for (const album of november12Albums) expect(album.articleId).toBeUndefined();
  });

  it("三篇各有 500–800 中文字、4–6 段和至少兩個可靠 HTTPS 來源", () => {
    for (const entry of [...november12Albums, ...november12Articles]) {
      const body = "body" in entry ? entry.body : entry.listeningNotes ?? "";
      expect(cjkCount(body), entry.id).toBeGreaterThanOrEqual(500);
      expect(cjkCount(body), entry.id).toBeLessThanOrEqual(800);
      expect(paragraphs(body), entry.id).toBeGreaterThanOrEqual(4);
      expect(paragraphs(body), entry.id).toBeLessThanOrEqual(6);
      expect(body).not.toMatch(/(^|\n)\s*#{1,6}\s|\*\*/);
      expect(entry.sources?.length, entry.id).toBeGreaterThanOrEqual(2);
      expect(entry.sources?.every((source) => source.url.startsWith("https://"))).toBe(true);
    }
    for (const album of november12Albums) {
      expect(album.coverUrl).toMatch(/^https:\/\//);
      expect(album.coverSourceUrl).toMatch(/^https:\/\//);
      expect(album.coverSource).toBeTruthy();
      expect(album.storeUrl).toMatch(/^https:\/\//);
      expect(album.tracks.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("Nightmare 採標準 11 曲版本，Fiction 為第十首且保留 The Rev 演出脈絡", () => {
    const album = nightmare();
    const song = november12Articles[0];
    expect(album).toMatchObject({ title: "Nightmare", year: "2010", trackCount: 11, artist: "Avenged Sevenfold" });
    expect(song).toMatchObject({ id: "avenged-sevenfold-fiction", slug: "avenged-sevenfold-fiction", albumId: album.id, year: "2010", artist: album.artist });
    expect(song.body).toMatch(/第\s*10\s*首|第十首/);
    expect(song.body).toContain("The Rev");
    const songHtml = renderDocument(template, `/article/${song.slug}`, options).html;
    const albumHtml = renderDocument(template, `/album/${album.id}`, options).html;
    expect(songHtml).toContain(`href="/album/${album.id}"`);
    expect(albumHtml).toContain(`href="/article/${song.slug}"`);
    expect(songHtml).toContain(album.coverUrl);
    assertUniqueSources(songHtml);
    assertUniqueSources(albumHtml);
  });

  it("古典分類、柏林愛樂與 Rattle／Mahler 中英文名稱可搜尋且有樂團索引", () => {
    const album = mahler();
    expect(album.genre).toBe("古典音樂");
    expect(catalogCategories(albums, articles)).toContain("古典音樂");
    for (const query of ["柏林愛樂", "Berlin Philharmonic", "Berliner Philharmoniker", "Simon Rattle", "Mahler", "馬勒"]) {
      expect(filterAlbums(albums, filters(query)), query).toContain(album);
    }
    expect(filterAlbums(albums, filters("", "古典音樂"))).toContain(album);
    expect(buildArtistIndex(albums, articles).find((entry) => entry.slug === artistSlug(album.artist))).toMatchObject({ albumCount: 1, guideCount: 1, category: "古典音樂" });
    for (const query of ["A7X", "AX7", "Fiction"]) {
      expect(filterAlbums(albums, filters(query)), query).toContain(nightmare());
      expect(filterArticles(articles, filters(query)), query).toContain(november12Articles[0]);
    }
    expect(buildArtistIndex(albums, articles).find((entry) => entry.name === "Avenged Sevenfold")).toMatchObject({ albumCount: 2, guideCount: 4 });
  });

  it("新路由初始 HTML 有正文與 canonical，sitemap 與 manifest 完整同步", () => {
    const routes = [
      ...november12Albums.map((album) => `/album/${album.id}`),
      `/article/${november12Articles[0].slug}`,
      `/artist/${artistSlug(mahler().artist)}`,
    ];
    const sitemap = renderSeoDocuments(options).sitemap;
    const manifest = JSON.parse(fs.readFileSync(new URL("../client/public/manus-routes.json", import.meta.url), "utf8"));
    expect(manifest.routes).toHaveLength(235);
    expect((sitemap.match(/<loc>/g) ?? [])).toHaveLength(235);
    for (const path of routes) {
      expect(getPublicPaths()).toContain(path);
      const metadata = metadataForPath(path, options);
      expect(metadata.canonical).toBe(`${origin}${path}/`);
      const page = renderDocument(template, path, options);
      expect(page.status).toBe(200);
      expect(page.html).toContain(`href="${origin}${path}/"`);
      expect(page.html).toContain('type="application/ld+json"');
      expect(sitemap).toContain(`${origin}${path}/`);
      expect(manifest.routes.some((entry: { path: string }) => entry.path === path)).toBe(true);
    }
    for (const album of november12Albums) {
      const page = renderDocument(template, `/album/${album.id}`, options);
      const firstParagraph = album.listeningNotes!.split("\n\n")[0];
      expect(readable(page.html)).toContain(firstParagraph);
      expect(page.html).toContain('"@type":"MusicAlbum"');
    }
    const home = readable(renderDocument(template, "/", options).html);
    expect(home).toContain("不重複導讀 149 篇");
    expect(home).toContain("古典音樂");
  });
});
