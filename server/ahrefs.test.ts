import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const html = readFileSync("client/index.html", "utf8");
const source = "https://analytics.ahrefs.com/analytics.js";
const key = "R3nMvMLniuSENlmWTwAFPA";

describe("Ahrefs analytics head snippet", () => {
  it("保留使用者提供的非同步腳本與精確 data-key，且只放置一次", () => {
    expect(html.match(/https:\/\/analytics\.ahrefs\.com\/analytics\.js/g)).toHaveLength(1);
    expect(html).toContain(`<script src="${source}" data-key="${key}" async></script>`);
  });
});
