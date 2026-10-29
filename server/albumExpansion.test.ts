import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { albums, articles } from "../client/src/data/catalog";
import { artistSlug, buildArtistIndex, catalogCategories, catalogDecades, catalogGuideCount, filterAlbums } from "../client/src/lib/catalogSearch";
import { escapeHtml, getPublicPaths, metadataForPath } from "../client/src/seo/metadata";
import { renderDocument } from "../client/src/seo/renderPage";

const ids = [
  "queen-news-of-the-world", "pink-floyd-wish-you-were-here", "led-zeppelin-two",
  "nirvana-in-utero", "radiohead-kid-a", "black-sabbath-master-of-reality",
  "iron-maiden-powerslave", "metallica-black-album", "megadeth-countdown-to-extinction",
  "slipknot-vol-three", "dreamshade-what-silence-hides", "dream-theater-images-and-words",
  "spitz-hachimitsu", "green-day-american-idiot", "ave-mujica-completeness",
];
const existingArtists = ["Queen", "Pink Floyd", "Led Zeppelin", "Nirvana", "Radiohead", "Black Sabbath", "Iron Maiden", "Metallica", "Megadeth", "Slipknot", "Dreamshade", "Dream Theater", "Spitz"];
const options = { origin: "https://abiting.github.io", basePath: "/underground-sound-archive/" };
const template = fs.readFileSync(new URL("../client/index.html", import.meta.url), "utf8");
const unfiltered = { query: "", category: "全部", decade: "全部年代" };

function record(id: string) {
  const album = albums.find(item => item.id === id);
  expect(album, id).toBeDefined();
  return album!;
}

describe("全樂團追加知名專輯", () => {
  it("舊 13 團各多一張，新增 2 團各一張，沒有重複專輯", () => {
    expect(albums).toHaveLength(87);
    expect(ids).toHaveLength(15);
    const newRecords = ids.map(record);
    for (const artist of existingArtists) {
      expect(newRecords.filter(album => album.artist === artist), artist).toHaveLength(1);
      expect(albums.filter(album => album.artist === artist), artist).toHaveLength(artist === "Spitz" ? 1 : 2);
    }
    for (const artist of ["Green Day", "Ave Mujica"]) expect(newRecords.filter(album => album.artist === artist)).toHaveLength(1);
    expect(new Set(albums.map(album => `${album.artist}/${album.title}`)).size).toBe(87);
    expect(articles).toHaveLength(65);
  });

  it("15 篇故事各有 500–800 中文字、4–6 段、至少 2 來源與 3 首聽點", () => {
    for (const album of ids.map(record)) {
      const body = album.listeningNotes!;
      const hanCount = (body.match(/[\u3400-\u9fff]/g) ?? []).length;
      expect(hanCount, album.id).toBeGreaterThanOrEqual(500);
      expect(hanCount, album.id).toBeLessThanOrEqual(800);
      const paragraphs = body.split(/\n\s*\n/).filter(Boolean);
      expect(paragraphs.length, album.id).toBeGreaterThanOrEqual(4);
      expect(paragraphs.length, album.id).toBeLessThanOrEqual(6);
      expect(body).not.toMatch(/<script|<h[1-6]|^#{1,6}\s|\*\*/m);
      expect(album.sources!.length, album.id).toBeGreaterThanOrEqual(2);
      expect(album.tracks).toHaveLength(3);
      expect(album.year).toMatch(/^\d{4}$/);
      expect(album.trackCount).toBeGreaterThan(0);
      expect(album.coverUrl).toMatch(/^https:\/\//);
      expect(album.coverSourceUrl).toMatch(/^https:\/\//);
      for (const source of album.sources!) expect(source.url).toMatch(/^https:\/\//);
    }
  });

  it("72 團索引與各樂團頁能找到對應專輯", () => {
    const index = buildArtistIndex(albums, articles);
    expect(index).toHaveLength(72);
    expect(index.every(artist => artist.guideCount >= artist.albumCount)).toBe(true);
    expect(index.find(item => item.name === "Queen")?.guideCount).toBe(2);
    expect(index.find(item => item.name === "生物股長")).toMatchObject({ slug: "ikimono-gakari", albumCount: 0, guideCount: 1 });
    expect(index.find(item => item.name === "Spitz")).toMatchObject({ albumCount: 1, guideCount: 2 });
    expect(catalogGuideCount(albums, articles)).toBe(142);
    const queenAlbum = record("queen-opera");
    const queenArticle = articles.find(article => article.id === queenAlbum.articleId)!;
    const { articleId: _articleId, listeningNotes: _listeningNotes, ...queenAlbumWithoutGuide } = queenAlbum;
    const { albumId: _albumId, ...queenArticleWithoutAlbum } = queenArticle;
    expect(catalogGuideCount([queenAlbum], [queenArticle])).toBe(1);
    expect(buildArtistIndex([{ ...queenAlbumWithoutGuide, articleId: queenArticle.id }], [queenArticleWithoutAlbum])[0].guideCount).toBe(1);
    expect(buildArtistIndex([queenAlbumWithoutGuide], [queenArticle])[0].guideCount).toBe(1);
    const songArtistPage = renderDocument(template, "/artist/ikimono-gakari", options);
    expect(songArtistPage.status).toBe(200);
    expect(songArtistPage.html).toContain("生物股長");
    expect(songArtistPage.html).toContain("相關導讀");
    const queenArtistPage = renderDocument(template, "/artist/queen", options);
    expect(queenArtistPage.html).toMatch(/02(?:<!-- -->)? GUIDES/);
    const queenAlbumPage = renderDocument(template, "/album/queen-opera", options);
    const queenGuideArticlePage = renderDocument(template, `/article/${queenArticle.slug}`, options);
    expect(queenAlbumPage.html).toContain("以文章頁閱讀同一篇導讀");
    expect(queenGuideArticlePage.html).toContain("在專輯頁閱讀同一篇導讀");
    for (const [artist, albumCount] of [["Dreamshade", 2], ["Dream Theater", 2], ["Green Day", 1], ["Ave Mujica", 2]] as const) {
      expect(index.find(item => item.name === artist)?.guideCount).toBe(albumCount);
    }
    const home = renderDocument(template, "/", options).html;
    const readableHome = home.replace(/<!--[\s\S]*?-->/g, "");
    expect(home).toMatch(/142(?:<!-- -->)? 篇導讀/);
    expect(home).toMatch(/2(?:<!-- -->)? 篇導讀/);
    expect(readableHome).toContain("不重複導讀 142 篇");
    expect(home).toContain("場刊是本站的編輯風格");
    expect(home).not.toContain("相關文章");
    for (const album of ids.map(record)) {
      const slug = artistSlug(album.artist);
      expect(home).toContain(`href="/underground-sound-archive/artist/${slug}/"`);
      const artistPage = renderDocument(template, `/artist/${slug}`, options);
      expect(artistPage.status).toBe(200);
      expect(artistPage.html).toContain(`href="/underground-sound-archive/album/${album.id}"`);
      expect(artistPage.html).toContain("代表專輯");
    }
  });

  it("每張新專輯的全部故事在初始 HTML，metadata 和回鏈正確", () => {
    expect(getPublicPaths()).toHaveLength(225);
    for (const album of ids.map(record)) {
      const route = `/album/${album.id}`;
      const document = renderDocument(template, route, options);
      const normalizedHtml = document.html.replaceAll("&#x27;", "&#39;");
      expect(document.status).toBe(200);
      for (const paragraph of album.listeningNotes!.split(/\n\s*\n/)) expect(normalizedHtml, album.id).toContain(escapeHtml(paragraph));
      expect(document.html).toContain(`href="/underground-sound-archive/artist/${artistSlug(album.artist)}/"`);
      expect(document.html).toContain(escapeHtml(`${album.artist}《${album.title}》專輯封面`));
      expect(document.html).not.toContain('href=""');
      expect(metadataForPath(route, options).canonical).toBe(`https://abiting.github.io/underground-sound-archive${route}/`);
    }
  });

  it("站內搜尋能找到專輯名稱、藝術家、曲目和故事正文", () => {
    for (const album of ids.map(record)) {
      for (const query of [album.title, album.artist, album.tracks[0], album.listeningNotes!.slice(0, 24)]) {
        expect(filterAlbums(albums, { ...unfiltered, query }).map(item => item.id), `${album.id}/${query}`).toContain(album.id);
      }
    }
  });

  it("分類與年代包含新資料，2010 年代和龐克搖滾確實可篩選", () => {
    expect(catalogCategories(albums, articles)).toContain("龐克搖滾");
    expect(catalogCategories(albums, articles)).toContain("日本金屬");
    expect(catalogCategories(albums, articles)).toContain("迷幻搖滾");
    expect(catalogDecades(albums, articles)).toContain("2010s");
    expect(filterAlbums(albums, { ...unfiltered, category: "龐克搖滾" }).map(item => item.id)).toContain("green-day-american-idiot");
    expect(filterAlbums(albums, { ...unfiltered, decade: "2010s" }).map(item => item.id)).toContain("dreamshade-what-silence-hides");
    expect(filterAlbums(albums, { ...unfiltered, query: "Ave Mujica", decade: "2020s" }).map(item => item.id)).toContain("ave-mujica-completeness");
    expect(filterAlbums(albums, { ...unfiltered, category: "迷幻搖滾" }).map(item => item.id)).toContain("ceramic-animal-cosmic-eraser");
  });
});
