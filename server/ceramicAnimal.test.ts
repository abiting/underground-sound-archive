import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { albums, articles } from "../client/src/data/catalog";
import { artistSlug, buildArtistIndex, catalogCategories, catalogDecades, catalogGuideCount, filterAlbums } from "../client/src/lib/catalogSearch";
import { escapeHtml, getPublicPaths, metadataForPath, renderSeoDocuments } from "../client/src/seo/metadata";
import { renderDocument } from "../client/src/seo/renderPage";

const options = { origin: "https://abiting.github.io", basePath: "/underground-sound-archive/" };
const template = fs.readFileSync(new URL("../client/index.html", import.meta.url), "utf8");
const album = albums.find(item => item.id === "ceramic-animal-cosmic-eraser")!;

describe("Ceramic Animal《Cosmic Eraser》與〈Eyes On You〉", () => {
  it("有正確專輯版本、曲數、歌曲位置和官方同版封面", () => {
    expect(album).toMatchObject({
      artist: "Ceramic Animal", title: "Cosmic Eraser", year: "2024", trackCount: 8,
      genre: "迷幻搖滾", musicbrainzUrl: "", coverSource: "Apple Music／iTunes 專輯 artwork",
    });
    expect(album.trackCountNote).toContain("8 首歌曲");
    expect(album.trackCountNote).toContain("30 分鐘");
    expect(album.tracks).toEqual(["Eyes On You", "Maybe Tomorrow", "Mind In Ruin"]);
    expect(album.coverUrl).toBe("https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/d5/50/f0/d550f08e-0349-f5d8-c72c-d852f0e13742/artwork.jpg/500x500bb.jpg");
    expect(album.coverSourceUrl).toBe("https://music.apple.com/tw/album/cosmic-eraser/1779727669");
    expect(album.storeUrl).toBe(album.coverSourceUrl);
    expect(album.sources?.length).toBeGreaterThanOrEqual(4);
    for (const source of album.sources ?? []) expect(source.url).toMatch(/^https:\/\//);
  });

  it("導讀有 500–800 個中文字、4–6 段，並說明歌曲位置和實際聆聽路徑", () => {
    const body = album.listeningNotes!;
    const hanCount = (body.match(/[\u3400-\u9fff]/g) ?? []).length;
    const paragraphs = body.split(/\n\s*\n/).filter(Boolean);
    expect(hanCount).toBeGreaterThanOrEqual(500);
    expect(hanCount).toBeLessThanOrEqual(800);
    expect(paragraphs.length).toBeGreaterThanOrEqual(4);
    expect(paragraphs.length).toBeLessThanOrEqual(6);
    expect(body).toContain("2024 年 8 月 23 日");
    expect(body).toContain("第二首");
    expect(body).toContain("第二首〈Eyes On You〉");
    expect(body).toContain("沒有替〈Eyes On You〉指定固定的歌詞解讀");
    expect(body).toContain("不應直接擴大成整張專輯的唯一概念");
    for (const track of album.tracks) expect(body).toContain(`〈${track}〉`);
    expect(body).not.toMatch(/<script|<h[1-6]|^#{1,6}\s|\*\*/m);
  });

  it("新增樂團、完整搜尋、曲風與年代篩選及去重導讀計數", () => {
    expect(artistSlug("Ceramic Animal")).toBe("ceramic-animal");
    const index = buildArtistIndex(albums, articles);
    expect(albums).toHaveLength(30);
    expect(index).toHaveLength(19);
    expect(index.find(item => item.name === "Ceramic Animal")).toMatchObject({ slug: "ceramic-animal", albumCount: 1, guideCount: 1 });
    expect(catalogGuideCount(albums, articles)).toBe(33);
    expect(catalogCategories(albums, articles)).toContain("迷幻搖滾");
    expect(catalogDecades(albums, articles)).toContain("2020s");
    for (const query of ["Ceramic Animal", "Cosmic Eraser", "Eyes On You", bodyLead(album.listeningNotes!)]) {
      expect(filterAlbums(albums, { query, category: "全部", decade: "全部年代" }).map(item => item.id)).toContain(album.id);
    }
    expect(filterAlbums(albums, { query: "", category: "迷幻搖滾", decade: "全部年代" }).map(item => item.id)).toContain(album.id);
    expect(filterAlbums(albums, { query: "", category: "全部", decade: "2020s" }).map(item => item.id)).toContain(album.id);
  });

  it("63 條公開路由、初始 HTML、封面 alt、SEO、藝人回鏈與 sitemap 同步", () => {
    const albumPath = `/album/${album.id}`;
    const artistPath = "/artist/ceramic-animal";
    expect(getPublicPaths()).toHaveLength(63);
    expect(getPublicPaths()).toContain(albumPath);
    expect(getPublicPaths()).toContain(artistPath);
    const page = renderDocument(template, albumPath, options);
    expect(page.status).toBe(200);
    const normalized = page.html.replaceAll("&#x27;", "&#39;");
    for (const paragraph of album.listeningNotes!.split(/\n\s*\n/)) expect(normalized).toContain(escapeHtml(paragraph));
    expect(page.html).toContain('alt="Ceramic Animal《Cosmic Eraser》專輯封面"');
    expect(page.html).toContain('href="/underground-sound-archive/artist/ceramic-animal/"');
    expect(page.html).toContain("Apple Music／iTunes 專輯 artwork");
    expect(page.html).not.toContain('href=""');
    expect(page.metadata.keywords).toContain("Eyes On You");
    expect(page.metadata.canonical).toBe(`https://abiting.github.io/underground-sound-archive${albumPath}/`);
    const artistPage = renderDocument(template, artistPath, options);
    expect(artistPage.status).toBe(200);
    expect(artistPage.html).toContain(`href="/underground-sound-archive${albumPath}"`);
    expect(artistPage.html).toMatch(/01(?:<!-- -->)? GUIDES/);
    expect(metadataForPath(albumPath, options).structuredData.some(item => (item as { sameAs?: string[] }).sameAs)).toBe(false);
    const sitemap = renderSeoDocuments(options).sitemap;
    expect((sitemap.match(/<loc>/g) ?? [])).toHaveLength(63);
    expect(sitemap).toContain(`https://abiting.github.io/underground-sound-archive${albumPath}/`);
    const manifest = JSON.parse(fs.readFileSync(new URL("../client/public/manus-routes.json", import.meta.url), "utf8")) as { routes: Array<{ path: string }> };
    expect(manifest.routes).toHaveLength(63);
    expect(manifest.routes.map(route => route.path)).toContain(albumPath);
    expect(manifest.routes.map(route => route.path)).toContain(artistPath);
  });
});

function bodyLead(body: string) {
  return body.slice(0, 25);
}
