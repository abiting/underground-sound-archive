import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { albums, articles } from "../client/src/data/catalog";
import { artistSlug, buildArtistIndex, catalogGuideCount, filterAlbums, filterArticles } from "../client/src/lib/catalogSearch";
import { getPublicPaths, metadataForPath, renderSeoDocuments } from "../client/src/seo/metadata";
import { renderDocument } from "../client/src/seo/renderPage";

const template = fs.readFileSync(new URL("../client/index.html", import.meta.url), "utf8");
const options = { origin: "https://chrysalismusicusa.com", basePath: "/" };
const albumId = "men-envy-children-third-wish";
const albumPath = `/album/${albumId}`;
const articlePath = "/article/men-envy-children-turn-my-back";
const artistPath = "/artist/men-envy-children";
const album = albums.find((item) => item.id === albumId);
const article = articles.find((item) => item.id === "men-envy-children-turn-my-back");
if (!album || !article) throw new Error("缺少小男孩樂團〈轉身以後〉或《第三個願望》資料。");

describe("小男孩樂團〈轉身以後〉與《第三個願望》", () => {
  it("核實標準版年份、曲數、封面和歌曲曲序，歌曲與專輯各有獨立篇幅", () => {
    const articleHan = (article.body.match(/[\u3400-\u9fff]/g) ?? []).length;
    const articleParagraphs = article.body.split(/\n\s*\n/).filter(Boolean);
    const albumHan = (album.listeningNotes?.match(/[\u3400-\u9fff]/g) ?? []).length;
    const albumParagraphs = album.listeningNotes?.split(/\n\s*\n/).filter(Boolean) ?? [];
    expect(album).toMatchObject({
      artist: "小男孩樂團", title: "第三個願望 The 3rd Wish", year: "2019", trackCount: 10,
      genre: "台灣流行搖滾", coverSource: "Apple Music／iTunes 專輯 artwork", musicbrainzUrl: "",
    });
    expect(album.trackCountNote).toContain("2019 年 6 月 12 日");
    expect(album.trackCountNote).toContain("分享典藏版");
    expect(album.trackCountNote).toContain("第 4 首");
    expect(article).toMatchObject({ artist: "小男孩樂團", year: "2019", albumId });
    expect(article.slug).toBe("men-envy-children-turn-my-back");
    expect(article.body).toContain("3 分 54 秒");
    expect(article.body).toContain("昌哥作詞、黃建為與陶山作曲");
    expect(article.sources.length).toBeGreaterThanOrEqual(3);
    expect(article.sources.every((source) => source.url.startsWith("https://"))).toBe(true);
    expect(articleHan).toBeGreaterThanOrEqual(500);
    expect(articleHan).toBeLessThanOrEqual(800);
    expect(articleParagraphs).toHaveLength(5);
    expect(albumHan).toBeGreaterThanOrEqual(500);
    expect(albumHan).toBeLessThanOrEqual(800);
    expect(albumParagraphs).toHaveLength(5);
    expect(album.sources?.length).toBeGreaterThanOrEqual(3);
    expect(album.sources?.every((source) => source.url.startsWith("https://"))).toBe(true);
    expect(album.coverUrl).toBe("https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/eb/1b/80/eb1b8062-fba1-1855-046e-4749b7cb3292/4710149672278.jpg/600x600bb.jpg");
    expect(album.coverSourceUrl).toContain("music.apple.com/tw/album/");
    expect(album.articleId).toBeUndefined();
  });

  it("繁體中文團名有固定 artist slug，歌曲與專輯故事在搜尋及導讀數各自可見", () => {
    expect(artistSlug("小男孩樂團")).toBe("men-envy-children");
    expect(artistSlug("Men Envy Children")).toBe("men-envy-children");
    expect(filterAlbums(albums, { query: "小男孩樂團", category: "全部", decade: "全部年代" })).toContain(album);
    expect(filterAlbums(albums, { query: "Men Envy Children", category: "全部", decade: "全部年代" })).toContain(album);
    expect(filterAlbums(albums, { query: "轉身以後", category: "全部", decade: "全部年代" })).toContain(album);
    for (const query of ["小男孩樂團", "轉身以後", "黃建為", "速度變慢"]) {
      expect(filterArticles(articles, { query, category: "全部", decade: "全部年代" })).toContain(article);
    }
    expect(filterArticles(articles, { query: "Men Envy Children", category: "全部", decade: "全部年代" })).toContain(article);
    const entry = buildArtistIndex(albums, articles).find((item) => item.slug === artistSlug("小男孩樂團"));
    expect(entry).toMatchObject({ name: "小男孩樂團", albumCount: 1, guideCount: 2 });
    expect(articles.filter((item) => item.albumId === albumId)).toEqual([article]);
    expect(catalogGuideCount(albums, articles)).toBe(137);
    expect(albums).toHaveLength(82);
    expect(articles).toHaveLength(65);
    expect(buildArtistIndex(albums, articles)).toHaveLength(71);
  });

  it("歌曲文章和專輯頁互相連結，兩篇全文都在正式網域初始 HTML", () => {
    expect(getPublicPaths()).toHaveLength(219);
    expect(getPublicPaths()).toEqual(expect.arrayContaining([albumPath, articlePath, artistPath]));
    const albumPage = renderDocument(template, albumPath, options);
    const articlePage = renderDocument(template, articlePath, options);
    const artistPage = renderDocument(template, artistPath, options);
    for (const page of [albumPage, articlePage, artistPage]) expect(page.status).toBe(200);
    expect(albumPage.html).toContain("專輯導讀");
    expect(albumPage.html).toContain("<b>10</b><small>曲目數</small>");
    expect(albumPage.html).toContain(album.coverUrl);
    expect(albumPage.html).toContain("Apple Music／iTunes 專輯 artwork");
    expect(albumPage.html).toContain("所屬歌曲導讀");
    expect(albumPage.html).toContain(`href="${articlePath}"`);
    expect(articlePage.html).toContain("查看所屬專輯介紹");
    expect(articlePage.html).toContain(`href="${albumPath}"`);
    expect(articlePage.html).toContain(album.coverUrl);
    expect(articlePage.html.replace(/<!--[\s\S]*?-->/g, "")).toContain("封面來源：Apple Music／iTunes 專輯 artwork");
    expect(articlePage.html).not.toContain('href=""');
    expect(artistPage.html).toContain(`href="${albumPath}"`);
    expect(artistPage.html).toContain(`href="${articlePath}"`);
    expect(artistPage.html).toContain("小男孩樂團");
  });

  it("SEO canonical、文章與音樂專輯 JSON-LD、sitemap 和 root manifest 都同步", () => {
    expect(metadataForPath(articlePath, options).canonical).toBe(`https://chrysalismusicusa.com${articlePath}/`);
    expect(metadataForPath(albumPath, options).canonical).toBe(`https://chrysalismusicusa.com${albumPath}/`);
    expect(metadataForPath(artistPath, options).canonical).toBe(`https://chrysalismusicusa.com${artistPath}/`);
    expect(metadataForPath(albumPath, options).image).toBe(album.coverUrl);
    expect(metadataForPath(albumPath, options).structuredData.some((entry) => entry["@type"] === "MusicAlbum" && entry.numTracks === 10)).toBe(true);
    expect(metadataForPath(articlePath, options).structuredData.some((entry) => entry["@type"] === "Article")).toBe(true);
    const sitemap = renderSeoDocuments(options).sitemap;
    expect(sitemap).toContain(`https://chrysalismusicusa.com${albumPath}/`);
    expect(sitemap).toContain(`https://chrysalismusicusa.com${articlePath}/`);
    expect(sitemap).toContain(`https://chrysalismusicusa.com${artistPath}/`);
    expect((sitemap.match(/<loc>/g) ?? [])).toHaveLength(219);
    const manifest = JSON.parse(fs.readFileSync(new URL("../client/public/manus-routes.json", import.meta.url), "utf8")) as { routes: Array<{ path: string }> };
    expect(manifest.routes).toHaveLength(219);
    expect(manifest.routes.map((route) => route.path)).toEqual(expect.arrayContaining([albumPath, articlePath, artistPath]));
  });
});
