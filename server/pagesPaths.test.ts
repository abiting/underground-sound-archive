import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { renderDocument } from "../client/src/seo/renderPage";
import { getPublicPaths, metadataForPath, renderSeoDocuments } from "../client/src/seo/metadata";
import { normalizeBasePath, withBasePath } from "../client/src/lib/sitePaths";
import { albums } from "../client/src/data/catalog";

const origin = "https://abiting.github.io";
const basePath = "/underground-sound-archive/";
const options = { origin, basePath };
const template = fs.readFileSync(new URL("../client/index.html", import.meta.url), "utf8");

describe("GitHub Pages 專案目錄", () => {
  it("正規化基底目錄，保留外鏈與原頁錨點", () => {
    expect(normalizeBasePath("/")).toBe("");
    expect(normalizeBasePath(basePath)).toBe("/underground-sound-archive");
    expect(withBasePath("/#artists", basePath)).toBe("/underground-sound-archive/#artists");
    expect(withBasePath("https://abiting.cc", basePath)).toBe("https://abiting.cc");
    expect(withBasePath("#explore", basePath)).toBe("#explore");
    for (const invalid of ["//other.example", "/../escape", "/path?query", "/bad path"]) {
      expect(() => normalizeBasePath(invalid)).toThrow();
    }
  });

  it("所有初始 HTML 的站內連結保留專案目錄，沒有重複前綴", () => {
    for (const route of getPublicPaths()) {
      const page = renderDocument(template, route, options);
      expect(page.status, route).toBe(200);
      expect(page.html, route).toContain('<div id="root">');
      for (const href of [...page.html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => match[1])) {
        if (href.startsWith("/")) {
          expect(href, `${route} ${href}`).toMatch(/^\/underground-sound-archive\//);
          expect(href).not.toContain("/underground-sound-archive/underground-sound-archive/");
        }
      }
      expect(page.html).toContain('href="/underground-sound-archive/#artists"');
      expect(page.html).toContain('href="https://abiurl.me/Jc8uTl"');
      expect(page.html).toContain('href="https://abiting.cc"');
    }
  });

  it("canonical、麵包屑與 sitemap 都指向實際 Pages 網址", () => {
    for (const route of getPublicPaths()) {
      const meta = metadataForPath(route, options);
      const canonicalPath = withBasePath(route, basePath).replace(/\/+$/, "") + "/";
      expect(meta.canonical).toBe(`${origin}${canonicalPath}`);
      expect(meta.structuredData[0].url).toBe(`${origin}/underground-sound-archive/`);
    }
    const docs = renderSeoDocuments(options);
    expect(docs.robots).toContain("Sitemap: https://abiting.github.io/underground-sound-archive/sitemap.xml");
    const urls = [...docs.sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
    expect(urls).toHaveLength(37);
    expect(urls.every(url => url.startsWith(`${origin}/underground-sound-archive/`))).toBe(true);
    expect(urls.every(url => url.endsWith("/"))).toBe(true);
  });

  it("Dreamshade 與 Dream Theater 都出現在樂團索引並有真實詳情頁", () => {
    for (const [slug, artist, albumId] of [
      ["dreamshade", "Dreamshade", "dreamshade-gift-of-life"],
      ["dream-theater", "Dream Theater", "dream-theater-six-degrees"],
    ]) {
      const route = `/artist/${slug}`;
      expect(getPublicPaths()).toContain(route);
      expect(metadataForPath(route, options).status).toBe(200);
      const page = renderDocument(template, route, options);
      expect(page.status).toBe(200);
      expect(page.html).toContain(artist);
      expect(page.html).toContain(`href="/underground-sound-archive/album/${albumId}"`);
      expect(page.html).toContain("代表專輯");
    }
    const home = renderDocument(template, "/", options).html;
    expect(home).toContain("Dreamshade");
    expect(home).toContain("Dream Theater");
    expect(home).toContain("1 張專輯");
  });

  it("兩張新專輯有封面與筆記，不連結不存在的藝人頁", () => {
    for (const id of ["dreamshade-gift-of-life", "dream-theater-six-degrees"]) {
      const album = albums.find(item => item.id === id)!;
      expect(album).toBeDefined();
      const page = renderDocument(template, `/album/${id}`, options);
      expect(page.status).toBe(200);
      expect(page.html).toContain(album.title);
      expect(page.html).toContain(album.artist);
      expect(page.html).toContain("專輯導讀／評論");
      expect(page.html).not.toMatch(/href="[^"]*\/artist\/(dreamshade|dream-theater)"/);
    }
    expect(albums.find(item => item.artist === "Dreamshade")?.year).toBe("2013");
    expect(albums.find(item => item.artist === "Dream Theater")?.trackCount).toBe(13);
  });
});
