import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { albums, articles } from "../client/src/data/catalog";
import { buildArtistIndex, catalogGuideCount, filterAlbums } from "../client/src/lib/catalogSearch";
import { getPublicPaths, metadataForPath, renderSeoDocuments } from "../client/src/seo/metadata";
import { renderDocument } from "../client/src/seo/renderPage";

const albumId = "my-chemical-romance-black-parade";
const albumPath = `/album/${albumId}`;
const artistPath = "/artist/my-chemical-romance";
const articlePath = "/article/my-chemical-romance-disenchanted";
const album = albums.find((item) => item.id === albumId);
if (!album) throw new Error("缺少 My Chemical Romance《The Black Parade》專輯資料。");
const article = articles.find((item) => item.id === "my-chemical-romance-disenchanted");
if (!article) throw new Error("缺少 My Chemical Romance〈Disenchanted〉單曲導讀。");
const template = fs.readFileSync(new URL("../client/index.html", import.meta.url), "utf8");
const options = { origin: "https://abiting.github.io", basePath: "/underground-sound-archive/" };

describe("My Chemical Romance《The Black Parade》專輯頁", () => {
  it("使用已核實的 2006 年標準版曲數和正確封面來源", () => {
    const hanCount = (album.listeningNotes?.match(/[\u3400-\u9fff]/g) ?? []).length;
    const paragraphs = album.listeningNotes?.split(/\n\s*\n/).filter(Boolean) ?? [];
    expect(album).toMatchObject({ artist: "My Chemical Romance", title: "The Black Parade", year: "2006", genre: "另類搖滾", trackCount: 14 });
    expect(album.trackCountNote).toContain("〈Blood〉");
    expect(album.trackCountNote).toContain("隱藏曲");
    expect(album.tracks).toEqual(expect.arrayContaining(["The End.", "Welcome to the Black Parade", "Disenchanted", "Famous Last Words"]));
    expect(hanCount).toBeGreaterThanOrEqual(500);
    expect(hanCount).toBeLessThanOrEqual(800);
    expect(paragraphs).toHaveLength(5);
    expect(album.sources?.length).toBeGreaterThanOrEqual(3);
    expect(album.sources?.every((source) => source.url.startsWith("https://"))).toBe(true);
    expect(album.coverUrl).toMatch(/^https:\/\/is1-ssl\.mzstatic\.com\/image\/thumb\/.+\/600x600bb\.jpg$/);
    expect(album.coverSource).toContain("Apple Music");
    expect(album.coverSourceUrl).toBe("https://music.apple.com/us/album/the-black-parade/1156310650");
    expect(album.musicbrainzUrl).toBe("");
    expect(album.articleId).toBeUndefined();
    expect(article.albumId).toBeUndefined();
  });

  it("MCR 專輯與 Disenchanted 單曲導讀分開搜尋和計入索引", () => {
    expect(filterAlbums(albums, { query: "My Chemical Romance", category: "全部", decade: "全部年代" })).toContain(album);
    expect(filterAlbums(albums, { query: "Paramour", category: "全部", decade: "全部年代" })).toContain(album);
    expect(filterAlbums(albums, { query: "Disenchanted", category: "全部", decade: "2000s" })).toContain(album);
    const index = buildArtistIndex(albums, articles);
    expect(index).toHaveLength(71);
    expect(index.find((artist) => artist.slug === "my-chemical-romance")).toMatchObject({ albumCount: 1, guideCount: 2 });
    expect(albums).toHaveLength(82);
    expect(articles).toHaveLength(65);
    expect(catalogGuideCount(albums, articles)).toBe(137);
  });

  it("專輯與藝人頁在初始 HTML 顯示全文、封面來源及彼此回鏈", () => {
    expect(getPublicPaths()).toHaveLength(219);
    expect(getPublicPaths()).toContain(albumPath);
    expect(getPublicPaths()).toContain(artistPath);
    expect(getPublicPaths()).toContain(articlePath);
    const page = renderDocument(template, albumPath, options);
    expect(page.status).toBe(200);
    expect(page.html).toContain("14 軌");
    expect(page.html).toContain("〈Blood〉");
    expect(page.html).toContain("Paramour");
    expect(page.html).toContain("〈Disenchanted〉");
    expect(page.html).toContain(album.coverUrl);
    expect(page.html).toContain("Apple Music／iTunes 專輯 artwork");
    expect(page.html).toContain('href="/underground-sound-archive/artist/my-chemical-romance/"');
    expect(page.html).not.toContain('href=""');
    const artist = renderDocument(template, artistPath, options);
    expect(artist.status).toBe(200);
    expect(artist.html).toContain("My Chemical Romance");
    expect(artist.html).toContain(`href="/underground-sound-archive${albumPath}"`);
    expect(artist.html).toContain(`href="/underground-sound-archive/article/${article.slug}"`);
    expect(artist.html).toMatch(/02(?:<!-- -->)? GUIDES/);
  });

  it("專輯 canonical、MusicAlbum JSON-LD、sitemap 與來源路由 manifest 正確", () => {
    const metadata = metadataForPath(albumPath, options);
    expect(metadata.status).toBe(200);
    expect(metadata.canonical).toBe(`https://abiting.github.io/underground-sound-archive${albumPath}/`);
    expect(metadata.image).toBe(album.coverUrl);
    expect(metadata.structuredData.some((entry) => entry["@type"] === "MusicAlbum" && entry.numTracks === 14)).toBe(true);
    const sitemap = renderSeoDocuments(options).sitemap;
    expect(sitemap).toContain(`https://abiting.github.io/underground-sound-archive${albumPath}/`);
    expect((sitemap.match(/<loc>/g) ?? [])).toHaveLength(219);
    const manifest = JSON.parse(fs.readFileSync(new URL("../client/public/manus-routes.json", import.meta.url), "utf8")) as { routes: Array<{ path: string }> };
    expect(manifest.routes).toHaveLength(219);
    expect(manifest.routes.map((route) => route.path)).toContain(albumPath);
  });
});
