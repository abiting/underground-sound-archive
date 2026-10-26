import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { albums, articles } from "../client/src/data/catalog";
import { artistSlug, buildArtistIndex, catalogGuideCount, filterAlbums } from "../client/src/lib/catalogSearch";
import { escapeHtml, getPublicPaths, metadataForPath, renderSeoDocuments } from "../client/src/seo/metadata";
import { renderDocument } from "../client/src/seo/renderPage";

const template = fs.readFileSync(new URL("../client/index.html", import.meta.url), "utf8");
const options = { origin: "https://abiting.github.io", basePath: "/underground-sound-archive/" };
const album = albums.find(item => item.id === "quarterback-deep-blue")!;
const albumPath = "/album/quarterback-deep-blue";
const artistPath = "/artist/quarterback";

describe("四分衛《Deep Blue》與〈雨和眼淚〉", () => {
  it("有正確作品資料、版本計數和來源封面，不捏造 MusicBrainz ID", () => {
    expect(album).toMatchObject({ artist: "四分衛", title: "Deep Blue", year: "2001", trackCount: 13, genre: "台灣搖滾" });
    expect(album.trackCountNote).toContain("12 首歌曲");
    expect(album.trackCountNote).toContain("隱藏演奏曲");
    expect(album.tracks).toEqual(["雨和眼淚", "魔毯", "項鍊"]);
    expect(album.coverUrl).toMatch(/^https:\/\/is1-ssl\.mzstatic\.com\//);
    expect(album.coverSource).toContain("Apple Music");
    expect(album.coverSourceUrl).toBe("https://music.apple.com/tw/album/deep-blue/1446707308");
    expect(album.musicbrainzUrl).toBe("");
  });

  it("完整導讀符合篇幅並包含三首聽點、發行背景和可核對來源", () => {
    const body = album.listeningNotes!;
    const hanCount = (body.match(/[\u3400-\u9fff]/g) ?? []).length;
    expect(hanCount).toBeGreaterThanOrEqual(500);
    expect(hanCount).toBeLessThanOrEqual(800);
    const paragraphs = body.split(/\n\s*\n/).filter(Boolean);
    expect(paragraphs.length).toBeGreaterThanOrEqual(4);
    expect(paragraphs.length).toBeLessThanOrEqual(6);
    for (const track of album.tracks) expect(body).toContain(`〈${track}〉`);
    expect(body).toContain("2001 年 9 月 1 日");
    expect(body).toContain("第 4 首");
    expect(body).toContain("第一輪建議完整聽完");
    expect(album.sources!.length).toBeGreaterThanOrEqual(2);
    for (const source of album.sources!) expect(source.url).toMatch(/^https:\/\//);
  });

  it("台灣搖滾、中文與英文搜尋和樂團索引皆可找到專輯，去重導讀加一", () => {
    expect(artistSlug("四分衛")).toBe("quarterback");
    expect(artistSlug("Quarterback")).toBe("quarterback");
    const index = buildArtistIndex(albums, articles);
    expect(index.find(item => item.name === "四分衛")).toMatchObject({ slug: "quarterback", albumCount: 1, guideCount: 1 });
    expect(index).toHaveLength(71);
    expect(catalogGuideCount(albums, articles)).toBe(137);
    for (const query of ["四分衛", "Quarterback", "Deep Blue", "雨和眼淚", "現實與夢想"]) {
      const results = filterAlbums(albums, { query, category: "台灣搖滾", decade: "2000s" });
      expect(results.map(item => item.id), query).toContain(album.id);
    }
    const home = renderDocument(template, "/", options).html;
    expect(home).toContain('href="/underground-sound-archive/artist/quarterback/"');
    expect(home.replace(/<!--[\s\S]*?-->/g, "")).toContain("不重複導讀 137 篇");
    const artistPage = renderDocument(template, artistPath, options);
    expect(artistPage.status).toBe(200);
    expect(artistPage.html).toContain(`href="/underground-sound-archive${albumPath}"`);
  });

  it("兩個新頁有初始 HTML、歌曲 keywords、正確 alt、canonical 和 sitemap", () => {
    expect(getPublicPaths()).toHaveLength(219);
    for (const path of [albumPath, artistPath]) {
      expect(getPublicPaths()).toContain(path);
      const page = renderDocument(template, path, options);
      expect(page.status).toBe(200);
      expect(page.html).toContain("四分衛");
      expect(page.html).toContain("Deep Blue");
      expect(page.metadata.canonical).toBe(`https://abiting.github.io/underground-sound-archive${path}/`);
    }
    const page = renderDocument(template, albumPath, options);
    for (const paragraph of album.listeningNotes!.split(/\n\s*\n/)) expect(page.html).toContain(escapeHtml(paragraph));
    expect(page.html).toContain('alt="四分衛《Deep Blue》專輯封面"');
    expect(page.html).toContain('href="/underground-sound-archive/artist/quarterback/"');
    expect(page.html).not.toContain('href=""');
    const metadata = metadataForPath(albumPath, options);
    expect(metadata.keywords).toContain("雨和眼淚");
    const sitemap = renderSeoDocuments(options).sitemap;
    expect((sitemap.match(/<loc>/g) ?? [])).toHaveLength(219);
    expect(sitemap).toContain("https://abiting.github.io/underground-sound-archive/album/quarterback-deep-blue/");
    expect(sitemap).toContain("https://abiting.github.io/underground-sound-archive/artist/quarterback/");
  });
});
