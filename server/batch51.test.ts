import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { batch51Albums } from "../client/src/data/batch51Albums";
import { batch51Articles } from "../client/src/data/batch51Articles";
import { october29Albums } from "../client/src/data/october29Albums";
import { albums, articles } from "../client/src/data/catalog";
import { artistSlug, buildArtistIndex, catalogGuideCount, filterAlbums, filterArticles } from "../client/src/lib/catalogSearch";
import { getPublicPaths } from "../client/src/seo/metadata";
import { renderDocument } from "../client/src/seo/renderPage";

const template = fs.readFileSync(new URL("../client/index.html", import.meta.url), "utf8");
const origin = "https://chrysalismusicusa.com";
const rootOptions = { origin, basePath: "/" };
const albumIds = new Set(batch51Albums.map((item) => item.id));
const articleIds = new Set(batch51Articles.map((item) => item.id));
const laterAlbumIds = new Set(october29Albums.map((item) => item.id));
const cjkCount = (text: string) => (text.match(/[\u3400-\u9fff]/g) ?? []).length;
const paragraphCount = (text: string) => text.split(/\n\s*\n/).filter(Boolean).length;
const normalizeArtist = (name: string) => name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const filters = (query: string) => ({ query, category: "全部", decade: "全部年代" });

describe("50 個新樂團專輯與 DEEN 第 51 組資料", () => {
  it("保留每張專輯及歌曲的獨立介紹，並完整更新全站目錄數量", () => {
    expect(batch51Albums).toHaveLength(51);
    expect(batch51Articles).toHaveLength(51);
    expect(new Set(batch51Albums.map((item) => item.artist)).size).toBe(51);
    expect(new Set(batch51Albums.map((item) => item.id)).size).toBe(51);
    expect(new Set(batch51Articles.map((item) => item.slug)).size).toBe(51);
    expect(albums).toHaveLength(87);
    expect(articles).toHaveLength(65);
    expect(buildArtistIndex(albums, articles)).toHaveLength(72);
    expect(catalogGuideCount(albums, articles)).toBe(142);
    expect(getPublicPaths()).toHaveLength(225);

    const oldArtists = new Set([
      ...albums.filter((item) => !albumIds.has(item.id) && !laterAlbumIds.has(item.id)).map((item) => normalizeArtist(item.artist)),
      ...articles.filter((item) => !articleIds.has(item.id)).map((item) => normalizeArtist(item.artist)),
    ]);
    for (const item of batch51Albums) expect(oldArtists.has(normalizeArtist(item.artist)), item.artist).toBe(false);
  });

  it("每組內容有 500–800 個中文字、4–6 段、至少兩個 HTTPS 來源與準確封面歸屬", () => {
    for (const album of batch51Albums) {
      const article = batch51Articles.find((item) => item.albumId === album.id);
      expect(article, album.artist).toBeDefined();
      expect(article?.artist).toBe(album.artist);
      expect(album.articleId, album.artist).toBeUndefined();
      for (const [kind, body] of [["專輯", album.listeningNotes ?? ""], ["歌曲", article?.body ?? ""]] as const) {
        expect(cjkCount(body), `${album.artist} ${kind}`).toBeGreaterThanOrEqual(500);
        expect(cjkCount(body), `${album.artist} ${kind}`).toBeLessThanOrEqual(800);
        expect(paragraphCount(body), `${album.artist} ${kind}`).toBeGreaterThanOrEqual(4);
        expect(paragraphCount(body), `${album.artist} ${kind}`).toBeLessThanOrEqual(6);
        expect(body, `${album.artist} ${kind}`).not.toMatch(/(^|\n)\s*#{1,6}\s|\*\*/);
      }
      expect(album.sources?.length, album.artist).toBeGreaterThanOrEqual(2);
      expect(article?.sources.length, album.artist).toBeGreaterThanOrEqual(2);
      expect(album.sources?.every((item) => item.url.startsWith("https://"))).toBe(true);
      expect(article?.sources.every((item) => item.url.startsWith("https://"))).toBe(true);
      expect(album.coverUrl, album.artist).toMatch(/^https:\/\//);
      expect(album.coverSourceUrl, album.artist).toMatch(/^https:\/\//);
      expect(album.storeUrl, album.artist).toMatch(/^https:\/\//);
      expect(album.coverSource, album.artist).toBeTruthy();
    }
  });

  it("每首歌可由團名／曲名搜尋，特殊藝名有穩定團頁路由，每團分列兩篇導讀", () => {
    const index = buildArtistIndex(albums, articles);
    for (const album of batch51Albums) {
      const article = batch51Articles.find((item) => item.albumId === album.id)!;
      expect(filterAlbums(albums, filters(album.artist))).toContain(album);
      expect(filterAlbums(albums, filters(album.title))).toContain(album);
      expect(filterArticles(articles, filters(article.title))).toContain(article);
      const entry = index.find((item) => item.slug === artistSlug(album.artist));
      const laterAlbumCount = october29Albums.filter((item) => item.artist === album.artist).length;
      expect(entry, album.artist).toMatchObject({ albumCount: 1 + laterAlbumCount, guideCount: 2 + laterAlbumCount });
      expect(getPublicPaths()).toContain(`/artist/${artistSlug(album.artist)}`);
      expect(getPublicPaths()).toContain(`/album/${album.id}`);
      expect(getPublicPaths()).toContain(`/article/${article.slug}`);
    }
    expect(artistSlug("Motörhead")).toBe("motorhead");
  });

  it("歌曲與專輯來源依 URL 去重，不輸出重複 citation key", () => {
    const assertUniqueSourceUrls = (html: string) => {
      const section = html.match(/<div class="article-sources">([\s\S]*?)<\/div>/)?.[1];
      expect(section).toBeTruthy();
      const urls = [...section!.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((match) => match[1]);
      expect(new Set(urls).size).toBe(urls.length);
    };
    for (const article of batch51Articles) {
      const page = renderDocument(template, `/article/${article.slug}`, rootOptions);
      assertUniqueSourceUrls(page.html);
    }
    const linkedAlbum = albums.find((item) => item.articleId)!;
    assertUniqueSourceUrls(renderDocument(template, `/album/${linkedAlbum.id}`, rootOptions).html);
  });

  it("DEEN《SINGLES +1》與〈君がいない夏〉互相連結並保留指定柯南片尾外鏈", () => {
    const album = batch51Albums.find((item) => item.artist === "DEEN")!;
    const article = batch51Articles.find((item) => item.artist === "DEEN")!;
    expect(album.title).toBe("SINGLES +1");
    expect(article.slug).toBe("deen-kimi-ga-inai-natsu");
    expect(article.albumId).toBe(album.id);
    const exactLink = "[《名偵探柯南》第 71 集 ～ 第 83 集片尾曲](https://coai.abiting.cc)";
    expect(article.body).toContain(exactLink);
    expect(filterAlbums(albums, filters("DEEN"))).toContain(album);
    expect(filterArticles(articles, filters("君がいない夏"))).toContain(article);

    const songPage = renderDocument(template, `/article/${article.slug}`, rootOptions);
    expect(songPage.status).toBe(200);
    expect(songPage.html).toContain('href="https://coai.abiting.cc"');
    expect(songPage.html).toContain("《名偵探柯南》第 71 集 ～ 第 83 集片尾曲</a>");
    expect(songPage.html).toContain(`href="/album/${album.id}"`);
    const albumPage = renderDocument(template, `/album/${album.id}`, rootOptions);
    expect(albumPage.status).toBe(200);
    expect(albumPage.html).toContain(`href="/article/${article.slug}"`);
  });
});
