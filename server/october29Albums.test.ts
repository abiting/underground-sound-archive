import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { october29Albums } from "../client/src/data/october29Albums";
import { albums, articles } from "../client/src/data/catalog";
import { artistSlug, buildArtistIndex, catalogGuideCount, filterAlbums, filterArticles } from "../client/src/lib/catalogSearch";
import { getPublicPaths, renderSeoDocuments } from "../client/src/seo/metadata";
import { renderDocument } from "../client/src/seo/renderPage";

const template = fs.readFileSync(new URL("../client/index.html", import.meta.url), "utf8");
const options = { origin: "https://chrysalismusicusa.com", basePath: "/" };
const filters = (query: string) => ({ query, category: "全部", decade: "全部年代" });
const newIds = new Set(october29Albums.map((item) => item.id));
const record = (id: string) => october29Albums.find((item) => item.id === id)!;
const readable = (html: string) => html.replace(/<!--[\s\S]*?-->/g, "").replaceAll("&#x27;", "'").replaceAll("&#39;", "'").replaceAll("&amp;", "&");

describe("2026-10-29 五張選輯與完整導讀", () => {
  it("五張不重複選輯保留舊資料且只增加五篇專輯導讀", () => {
    expect(october29Albums).toHaveLength(5);
    expect(new Set(october29Albums.map((item) => item.artist)).size).toBe(5);
    expect(albums.filter((item) => !newIds.has(item.id))).toHaveLength(82);
    expect(albums).toHaveLength(87);
    expect(articles).toHaveLength(65);
    expect(new Set(albums.map((item) => item.id)).size).toBe(87);
    expect(new Set(albums.map((item) => `${item.artist}/${item.title}`)).size).toBe(87);
    expect(catalogGuideCount(albums, articles)).toBe(142);
    expect(buildArtistIndex(albums, articles)).toHaveLength(72);
    expect(getPublicPaths()).toHaveLength(225);
    expect(record("quarterback-rise")).toMatchObject({ artist: "四分衛", title: "起來", year: "1999", trackCount: 14 });
    expect(record("mygo-meisekiha")).toMatchObject({ artist: "MyGO!!!!!", title: "迷跡波", year: "2023", trackCount: 13 });
    expect(record("ave-mujica-elements")).toMatchObject({ artist: "Ave Mujica", title: "ELEMENTS", year: "2024", trackCount: 5 });
    expect(record("linkin-park-meteora")).toMatchObject({ artist: "Linkin Park", title: "Meteora", year: "2003", trackCount: 13 });
    expect(record("aerosmith-rocks")).toMatchObject({ artist: "Aerosmith", title: "Rocks", year: "1976", trackCount: 9 });
  });

  it("五篇繁中原創故事各有 500–800 漢字、4–6 段和可靠封面來源", () => {
    for (const album of october29Albums) {
      const body = album.listeningNotes!;
      const hanCount = (body.match(/[\u3400-\u9fff]/g) ?? []).length;
      const paragraphs = body.split(/\n\s*\n/).filter(Boolean);
      expect(hanCount, album.id).toBeGreaterThanOrEqual(500);
      expect(hanCount, album.id).toBeLessThanOrEqual(800);
      expect(paragraphs.length, album.id).toBeGreaterThanOrEqual(4);
      expect(paragraphs.length, album.id).toBeLessThanOrEqual(6);
      expect(body).not.toMatch(/(^|\n)\s*#{1,6}\s|\*\*|<h[1-6]|<script/);
      expect(album.articleId).toBeUndefined();
      expect(album.sources!.length, album.id).toBeGreaterThanOrEqual(2);
      expect(album.sources!.every((item) => item.url.startsWith("https://"))).toBe(true);
      expect(album.coverUrl).toMatch(/^https:\/\//);
      expect(album.coverSourceUrl).toMatch(/^https:\/\//);
      expect(album.coverSource).toContain("Apple Music");
      expect(album.trackCountNote).toBeTruthy();
      expect(album.tracks).toHaveLength(3);
    }
    expect(record("ave-mujica-elements").listeningNotes).toContain("迷你專輯");
    expect(record("ave-mujica-elements").trackCountNote).toContain("Blu-ray");
  });

  it("新團 MyGO!!!!! 與四團追加選輯的索引計數、搜尋及中文別名一致", () => {
    const index = buildArtistIndex(albums, articles);
    for (const [name, albumCount, guideCount] of [
      ["四分衛", 2, 2], ["MyGO!!!!!", 1, 1], ["Ave Mujica", 2, 2], ["Linkin Park", 2, 3], ["Aerosmith", 2, 3],
    ] as const) {
      expect(index.find((item) => item.name === name)).toMatchObject({ albumCount, guideCount });
    }
    expect(artistSlug("MyGO!!!!!")).toBe("mygo");
    expect(artistSlug("史密斯飛船")).toBe("aerosmith");
    expect(index.filter((item) => item.slug === "aerosmith")).toHaveLength(1);
    expect(filterAlbums(albums, filters("史密斯飛船")).map((item) => item.id)).toEqual(expect.arrayContaining(["aerosmith-rocks", "aerosmith-toys-in-the-attic"]));
    expect(filterArticles(articles, filters("史密斯飛船")).map((item) => item.slug)).toContain("aerosmith-toys-in-the-attic-song");
    for (const album of october29Albums) {
      for (const query of [album.artist, album.title, album.tracks[0], album.listeningNotes!.slice(0, 24)]) {
        expect(filterAlbums(albums, filters(query)).map((item) => item.id), `${album.id}/${query}`).toContain(album.id);
      }
      expect(filterAlbums(albums, { ...filters(""), category: album.genre }).map((item) => item.id)).toContain(album.id);
      expect(filterAlbums(albums, { ...filters(""), decade: `${Math.floor(Number(album.year) / 10) * 10}s` }).map((item) => item.id)).toContain(album.id);
    }
  });

  it("五張新專輯及 MyGO!!!!! 團頁有完整初始 HTML、來源、canonical 和 JSON-LD", () => {
    for (const album of october29Albums) {
      const route = `/album/${album.id}`;
      expect(getPublicPaths()).toContain(route);
      const page = renderDocument(template, route, options);
      expect(page.status).toBe(200);
      const html = readable(page.html);
      for (const paragraph of album.listeningNotes!.split(/\n\s*\n/)) expect(html, album.id).toContain(paragraph);
      expect(html).toContain(`alt="${album.artist}《${album.title}》專輯封面"`);
      expect(html).toContain(`href="/artist/${artistSlug(album.artist)}/"`);
      expect(page.metadata.canonical).toBe(`${options.origin}${route}/`);
      expect(page.metadata.structuredData.find((item) => item["@type"] === "MusicAlbum")).toMatchObject({ name: album.title, numTracks: album.trackCount, datePublished: album.year });
      for (const source of album.sources!) expect(html).toContain(source.url.replaceAll("&", "&amp;").replaceAll("&amp;", "&"));
      expect(page.html.match(/analytics\.ahrefs\.com\/analytics\.js/g)).toHaveLength(1);
    }
    const artistPage = renderDocument(template, "/artist/mygo", options);
    expect(artistPage.status).toBe(200);
    expect(artistPage.html).toContain('href="/album/mygo-meisekiha"');
    const home = readable(renderDocument(template, "/", options).html);
    expect(home).toContain("不重複導讀 142 篇");
    expect(home).toContain("MyGO!!!!!");
  });

  it("225 條 sitemap 與 manifest 同步，保留正式 robots 及 noindex 404", () => {
    const docs = renderSeoDocuments(options);
    const urls = [...docs.sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
    expect(urls).toHaveLength(225);
    expect(new Set(urls).size).toBe(225);
    for (const album of october29Albums) expect(urls).toContain(`${options.origin}/album/${album.id}/`);
    expect(urls).toContain(`${options.origin}/artist/mygo/`);
    const manifest = JSON.parse(fs.readFileSync(new URL("../client/public/manus-routes.json", import.meta.url), "utf8"));
    expect(manifest.routes).toHaveLength(225);
    expect(manifest.routes.map((item: { path: string }) => item.path)).toEqual(getPublicPaths());
    expect(docs.robots).toContain(`Sitemap: ${options.origin}/sitemap.xml`);
    const missing = renderDocument(template, "/not-a-real-album", options);
    expect(missing.status).toBe(404);
    expect(missing.metadata.robots).toContain("noindex");
  });
});
