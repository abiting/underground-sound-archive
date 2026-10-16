import express from "express";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { serveStatic } from "./_core/vite";

let server: ReturnType<express.Express["listen"]>;
let origin: string;

beforeAll(async () => {
  vi.stubEnv("NODE_ENV", "development");
  const app = express();
  serveStatic(app);
  await new Promise<void>((resolve) => {
    server = app.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("無法取得測試服務位址。");
  origin = `http://127.0.0.1:${address.port}`;
});

afterAll(async () => {
  if (server) await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  vi.unstubAllEnvs();
});

describe("標準正式靜態伺服器 SEO", () => {
  it("首頁及深連結提供不同的完整內容 HTML", async () => {
    for (const [path, title] of [
      ["/", "破繭之聲 Underground Sound Archive｜搖滾與金屬唱片誌"],
      ["/article/queen-a-night-at-the-opera", "Queen《A Night at the Opera》"],
      ["/album/metallica-puppets", "Metallica《Master of Puppets》"],
      ["/artist/spitz", "Spitz 樂團介紹"],
    ]) {
      const response = await fetch(`${origin}${path}`);
      expect(response.status, path).toBe(200);
      const html = await response.text();
      expect(html.match(/<title[^>]*>(.*?)<\/title>/)?.[1], path).toContain(title);
      expect(html).toContain("application/ld+json");
      expect(html).toContain("<h1");
      expect(html).toContain('href="https://abiting.cc"');
    }
  });

  it("未知路由、未知作品與缺失資產不會假回首頁 200", async () => {
    for (const path of ["/unknown", "/article/missing", "/album/missing", "/artist/missing", "/assets/missing.js"]) {
      const response = await fetch(`${origin}${path}`);
      expect(response.status, path).toBe(404);
      const html = await response.text();
      expect(html).toContain("noindex, nofollow");
      expect(html).toContain("這一頁還沒印出來");
    }
  });
});
