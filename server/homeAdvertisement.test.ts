import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { renderDocument } from "../client/src/seo/renderPage";

const template = fs.readFileSync(new URL("../client/index.html", import.meta.url), "utf8");
const options = { origin: "https://chrysalismusicusa.com", basePath: "/" };
const imageUrl = "https://app.abiting.cc/wp-content/uploads/2026/11/appabiting.jpeg";
const destination = "https://app.abiting.cc/software";

function homeAdvertisement() {
  const home = renderDocument(template, "/", options);
  const artistSection = home.html.match(/<section class="artist-band" id="artists">([\s\S]*?)<\/section>/)?.[1];
  expect(home.status).toBe(200);
  expect(artistSection).toBeTruthy();
  const leftColumn = artistSection!.split('<div class="artist-list">')[0];
  const advertisement = leftColumn.match(/<aside class="artist-index-ad"[^>]*>([\s\S]*?)<\/aside>/)?.[1];
  expect(advertisement).toBeTruthy();
  return { home, leftColumn, advertisement: advertisement! };
}

describe("首頁樂團索引左欄廣告", () => {
  it("指定圖片在首頁初始 HTML 的索引左欄說明下方，並且只顯示一次", () => {
    const { home, leftColumn, advertisement } = homeAdvertisement();
    expect(leftColumn.indexOf('class="artist-index-ad"')).toBeGreaterThan(leftColumn.indexOf('class="artist-index-note"'));
    expect(advertisement).toContain('class="artist-index-ad-label">廣告</span>');
    expect(advertisement).toContain(`src="${imageUrl}"`);
    expect(advertisement).toContain('alt="軟體王阿力：免費替代軟體資料庫廣告"');
    expect(advertisement).toContain('width="1024"');
    expect(advertisement).toContain('height="1536"');
    expect(advertisement).toContain('loading="lazy"');
    const css = fs.readFileSync(new URL("../client/src/index.css", import.meta.url), "utf8");
    const labelStyle = css.match(/\.artist-index-ad-label\s*\{([^}]+)\}/)?.[1] ?? "";
    expect(labelStyle).toContain("position: absolute");
    expect(labelStyle).toContain("top: 10px");
    expect(labelStyle).toContain("left: 10px");
    expect(labelStyle).toContain("pointer-events: none");
    expect((home.html.match(/class="artist-index-ad"/g) ?? []).length).toBe(1);
    expect(home.html).toContain('href="https://chrysalismusicusa.com/"');
  });

  it("廣告連至指定軟體頁、開新分頁且使用 sponsored 與安全外連屬性", () => {
    const { advertisement } = homeAdvertisement();
    const link = advertisement.match(/<a\b[^>]*>/)?.[0];
    expect(link).toContain(`href="${destination}"`);
    expect(link).toContain('target="_blank"');
    expect(link).toContain('rel="sponsored noopener noreferrer"');
    expect(link).toContain("另開新分頁");
  });

  it("專輯、歌曲、樂團與缺頁不插入廣告", () => {
    for (const path of ["/album/avenged-sevenfold-nightmare", "/article/avenged-sevenfold-fiction", "/artist/queen", "/not-a-page"]) {
      const page = renderDocument(template, path, options);
      expect(page.html, path).not.toContain(imageUrl);
      expect(page.html, path).not.toContain(destination);
    }
  });
});
