import { describe, it, expect, vi, afterEach } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { articles, albums } from "../client/src/data/catalog";
import EditorialBody from "../client/src/components/EditorialBody";
import { searchAlbums } from "../client/src/lib/itunesSearch";

const movieLink = "https://coai.abiting.cc/archives/1437";

describe("Riff Atlas 唱片誌資料", () => {
  it("有 10 篇專輯文章及 1 篇指定的 Spitz 單曲文章", () => {
    expect(articles).toHaveLength(11);
    expect(albums).toHaveLength(10);
    expect(new Set(articles.map((item) => item.slug)).size).toBe(11);
    expect(articles.filter((item) => item.albumId)).toHaveLength(10);
    const special = articles.find((item) => item.artist === "Spitz");
    expect(special?.title).toBe("美しい鰭：《黑鐵的魚影》片尾");
    expect(special?.body).toContain(`[《黑鐵的魚影》](${movieLink})`);
  });

  it("每篇正文有 500–800 個中文字、4–6 段與至少 2 筆來源", () => {
    for (const item of articles) {
      const count = (item.body.match(/[\u3400-\u9fff]/g) ?? []).length;
      expect(count, item.id).toBeGreaterThanOrEqual(500);
      expect(count, item.id).toBeLessThanOrEqual(800);
      const paragraphs = item.body.split(/\n\s*\n/).filter(Boolean);
      expect(paragraphs.length, item.id).toBeGreaterThanOrEqual(4);
      expect(paragraphs.length, item.id).toBeLessThanOrEqual(6);
      expect(item.sources.length, item.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("所有專輯都連到對應文章與標示來源的封面", () => {
    for (const item of albums) {
      const article = articles.find((entry) => entry.id === item.articleId);
      expect(article?.albumId).toBe(item.id);
      expect(article?.artist).toBe(item.artist);
      expect(item.coverUrl).toMatch(/^https:\/\/coverartarchive\.org\/release-group\/[a-f0-9-]+\/front-500$/);
      expect(item.musicbrainzUrl).toMatch(/^https:\/\/musicbrainz\.org\/release-group\//);
      expect(item.coverSource).toBe("Cover Art Archive");
      expect(item.tracks.length).toBeGreaterThan(0);
    }
  });
});

describe("安全正文與指定外鏈", () => {
  it("渲染精確電影連結，不把文字當成 HTML 執行", () => {
    const html = renderToStaticMarkup(createElement(EditorialBody, {
      content: `延伸閱讀：[《黑鐵的魚影》](${movieLink})\n\n<script>alert(1)</script>`,
    }));
    expect(html).toContain(`href="${movieLink}"`);
    expect(html).toContain("《黑鐵的魚影》</a>");
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });
});

describe("iTunes 搜尋狀態", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  function fakeBrowser() {
    const scripts: Array<{ src: string; onerror?: () => void; remove: ReturnType<typeof vi.fn> }> = [];
    const fakeWindow: Record<string, unknown> = { setTimeout, clearTimeout };
    vi.stubGlobal("window", fakeWindow);
    vi.stubGlobal("document", {
      createElement: () => ({ src: "", async: false, remove: vi.fn() }),
      head: { appendChild: (script: typeof scripts[number]) => scripts.push(script) },
    });
    return { scripts, fakeWindow };
  }

  it("拒絕過短或過長的關鍵字", async () => {
    await expect(searchAlbums("a")).rejects.toThrow("至少輸入 2");
    await expect(searchAlbums("x".repeat(81))).rejects.toThrow("最多 80");
  });

  it("將 JSONP 資料轉換成封面、作品網址並快取，完成後清除回呼", async () => {
    const { scripts, fakeWindow } = fakeBrowser();
    const request = searchAlbums("Test Riff Album");
    expect(scripts).toHaveLength(1);
    const url = new URL(scripts[0].src);
    expect(url.searchParams.get("country")).toBe("tw");
    const callbackName = url.searchParams.get("callback")!;
    const callback = fakeWindow[callbackName] as (payload: unknown) => void;
    callback({ results: [{ collectionId: 1, collectionName: "Test", artistName: "Riff", artworkUrl100: "https://example.com/cover.jpg", collectionViewUrl: "https://example.com/album", trackCount: 8 }] });
    const results = await request;
    expect(results[0]).toMatchObject({ title: "Test", artist: "Riff", coverUrl: "https://example.com/cover.jpg", storeUrl: "https://example.com/album" });
    expect(scripts[0].remove).toHaveBeenCalled();
    expect(fakeWindow[callbackName]).toBeUndefined();
    expect(await searchAlbums("Test Riff Album")).toEqual(results);
    expect(scripts).toHaveLength(1);
  });

  it("網路失敗時回報錯誤並清理腳本", async () => {
    const { scripts } = fakeBrowser();
    const request = searchAlbums("Connection failure");
    const assertion = expect(request).rejects.toThrow("暫時無法連接");
    scripts[0].onerror?.();
    await assertion;
    expect(scripts[0].remove).toHaveBeenCalled();
  });

  it("逾時後回報狀態並清理腳本", async () => {
    vi.useFakeTimers();
    const { scripts } = fakeBrowser();
    const request = searchAlbums("Timeout sample");
    const assertion = expect(request).rejects.toThrow("搜尋逾時");
    await vi.advanceTimersByTimeAsync(12000);
    await assertion;
    expect(scripts[0].remove).toHaveBeenCalled();
  });
});
