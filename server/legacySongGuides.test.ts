import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { albums, articles } from "../client/src/data/catalog";
import { legacySongAlbums } from "../client/src/data/legacySongAlbums";
import { artistSlug, buildArtistIndex, catalogGuideCount, filterAlbums, filterArticles } from "../client/src/lib/catalogSearch";
import { getPublicPaths } from "../client/src/seo/metadata";
import { renderDocument } from "../client/src/seo/renderPage";

const template = fs.readFileSync(new URL("../client/index.html", import.meta.url), "utf8");
const origin = "https://chrysalismusicusa.com";
const options = { origin, basePath: "/" };
const cjkCount = (text: string) => (text.match(/[\u3400-\u9fff]/g) ?? []).length;
const paragraphCount = (text: string) => text.split(/\n\s*\n/).filter(Boolean).length;
const filters = (query: string) => ({ query, category: "全部", decade: "全部年代" });

function assertUniqueSourceUrls(html: string) {
  const section = html.match(/<div class="article-sources">([\s\S]*?)<\/div>/)?.[1];
  expect(section).toBeTruthy();
  const urls = [...section!.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((match) => match[1]);
  expect(new Set(urls).size).toBe(urls.length);
}

describe("22-20s 與 Babybird 歌曲／專輯回補", () => {
  it("新增兩張專輯、兩篇歌曲導讀、兩個團頁與六條公開路由", () => {
    expect(legacySongAlbums).toHaveLength(2);
    expect(legacySongAlbums.map((item) => item.id)).toEqual(["22-20s-self-titled", "babybird-ugly-beautiful"]);
    expect(albums).toHaveLength(89);
    expect(articles).toHaveLength(67);
    expect(buildArtistIndex(albums, articles)).toHaveLength(74);
    expect(catalogGuideCount(albums, articles)).toBe(146);
    expect(getPublicPaths()).toHaveLength(231);
  });

  it("採用正式專輯版次與曲序，四篇正文都有完整篇幅和來源", () => {
    const expected = [
      { id: "22-20s-self-titled", trackCount: 11, songId: "22-20s-devil-in-me", number: "第 1 首" },
      { id: "babybird-ugly-beautiful", trackCount: 15, songId: "babybird-candy-girl", number: "第 2 首" },
    ];
    for (const item of expected) {
      const album = legacySongAlbums.find((entry) => entry.id === item.id)!;
      const article = articles.find((entry) => entry.id === item.songId)!;
      expect(album.trackCount).toBe(item.trackCount);
      expect(article.albumId).toBe(album.id);
      expect(article.artist).toBe(album.artist);
      expect(article.body).toContain(item.number);
      expect(article.sources.length).toBeGreaterThanOrEqual(2);
      expect(album.sources?.length).toBeGreaterThanOrEqual(2);
      expect(article.sources.every((source) => source.url.startsWith("https://"))).toBe(true);
      expect(album.sources?.every((source) => source.url.startsWith("https://"))).toBe(true);
      expect(album.coverUrl).toMatch(/^https:\/\//);
      expect(album.coverSource).toContain("Apple Music");
      expect(album.coverSourceUrl).toMatch(/^https:\/\//);
      expect(album.musicbrainzUrl).toBe("");
      for (const [label, body] of [["album", album.listeningNotes ?? ""], ["song", article.body]] as const) {
        expect(cjkCount(body), `${album.artist} ${label}`).toBeGreaterThanOrEqual(500);
        expect(cjkCount(body), `${album.artist} ${label}`).toBeLessThanOrEqual(800);
        expect(paragraphCount(body), `${album.artist} ${label}`).toBeGreaterThanOrEqual(4);
        expect(paragraphCount(body), `${album.artist} ${label}`).toBeLessThanOrEqual(6);
        expect(body).not.toMatch(/(^|\n)\s*#{1,6}\s|\*\*/);
      }
    }
  });

  it("可由團名、曲名和專輯名搜尋，索引保留每團兩篇不同導讀", () => {
    for (const album of legacySongAlbums) {
      const article = articles.find((entry) => entry.albumId === album.id)!;
      expect(filterAlbums(albums, filters(album.artist))).toContain(album);
      expect(filterAlbums(albums, filters(album.title))).toContain(album);
      expect(filterAlbums(albums, filters(album.tracks[0]))).toContain(album);
      expect(filterArticles(articles, filters(article.title))).toContain(article);
      expect(filterArticles(articles, filters(album.artist))).toContain(article);
      const entry = buildArtistIndex(albums, articles).find((item) => item.slug === artistSlug(album.artist));
      expect(entry).toMatchObject({ albumCount: 1, guideCount: 2 });
      expect(getPublicPaths()).toContain(`/artist/${artistSlug(album.artist)}`);
      expect(getPublicPaths()).toContain(`/album/${album.id}`);
      expect(getPublicPaths()).toContain(`/article/${article.slug}`);
    }
  });

  it("專輯和歌曲頁的 SSR 有內容、正確 canonical、回鏈和不重複來源", () => {
    for (const album of legacySongAlbums) {
      const article = articles.find((entry) => entry.albumId === album.id)!;
      const articlePath = `/article/${article.slug}`;
      const albumPath = `/album/${album.id}`;
      const songPage = renderDocument(template, articlePath, options);
      const albumPage = renderDocument(template, albumPath, options);
      expect(songPage.status).toBe(200);
      expect(albumPage.status).toBe(200);
      expect(songPage.html).toContain(article.title);
      expect(albumPage.html).toContain(album.title);
      expect(songPage.html).toContain(`href="${origin}${articlePath}/"`);
      expect(albumPage.html).toContain(`href="${origin}${albumPath}/"`);
      expect(songPage.html).toContain(`href="/album/${album.id}"`);
      expect(albumPage.html).toContain(`href="/article/${article.slug}"`);
      expect(songPage.html).toContain(album.coverUrl);
      expect(albumPage.html).toContain(article.title);
      assertUniqueSourceUrls(songPage.html);
      assertUniqueSourceUrls(albumPage.html);
    }
  });
});
