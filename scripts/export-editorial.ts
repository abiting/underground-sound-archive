import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { articles, albums } from "../client/src/data/catalog";

const out = resolve(process.argv[2] ?? "deliverables");
mkdirSync(out, { recursive: true });

const introduction = `# Riff Atlas｜搖滾與金屬唱片誌：11 篇文章合集

本合集包含 10 篇搖滾／金屬專輯導讀，以及 1 篇 Spitz〈美しい鰭〉電影片尾歌曲介紹。正文採原創繁體中文撰寫，每篇約 500–800 個中文字；文末保留查證與延伸來源。評分為本刊主觀聆聽評分，不代表外部排行榜。

〈美しい鰭〉為 Spitz（スピッツ）的作品。〈美しい鰭〉篇中的《黑鐵的魚影》保留使用者指定連結，該網址為延伸文章，不是電影官方網站。

## 目錄

${articles.map((article, index) => `${index + 1}. ${article.title}`).join("\n")}

---
`;

const chapters = articles.map((article, index) => {
  const cover = albums.find((album) => album.id === article.albumId);
  return `\n## ${index + 1}. ${article.title}

**藝人：** ${article.artist}　｜　**年份：** ${article.year}　｜　**分類：** ${article.category}　｜　**本刊評分：** ${article.score.toFixed(1)}/5

> ${article.summary}

${article.body}

### 查證與延伸

${article.sources.map((source) => `- [${source.name}](${source.url})`).join("\n")}${cover ? `\n- [MusicBrainz 專輯資料](${cover.musicbrainzUrl})\n- [Cover Art Archive 封面來源](${cover.coverSourceUrl})` : ""}

---
`;
});

const appendix = `
## 附錄：網站使用的專輯封面 API

**MusicBrainz + Cover Art Archive**：使用作品的 release-group 識別碼配對專輯資料與封面，可避免只用專輯名稱造成同名誤配。封面端點例：\
\`https://coverartarchive.org/release-group/{release-group-id}/front-500\`。

**Apple iTunes Search API**：網站的即時封面搜尋使用公開 API，不需 API 金鑰；每個搜尋結果保留對應 Apple 作品頁連結。文件說明約每分鐘 20 次請求（可能調整），大型網站應快取並處理流量。網站原型提供十分鐘的同關鍵字記憶體快取，但沒有跨使用者的伺服器快取或全域流量控制。

API 可存取不等於封面可任意再授權。封面權利通常屬於原權利人，公開營運或商業使用仍須確認適用條款與圖片權利；Apple 封面用途尤其需符合其宣傳對應作品與鄰近商店連結的規範。

[MusicBrainz API 文件](https://musicbrainz.org/doc/MusicBrainz_API) · [Cover Art Archive API 文件](https://musicbrainz.org/doc/Cover_Art_Archive/API) · [Apple iTunes Search API 文件](https://performance-partners.apple.com/search-api)
`;

const markdown = introduction + chapters.join("") + appendix;
writeFileSync(resolve(out, "riffatlas-11-articles.md"), markdown);
writeFileSync(resolve(out, "riffatlas-editorial.json"), `${JSON.stringify({ articles, albums }, null, 2)}\n`);
console.log(resolve(out, "riffatlas-11-articles.md"));
console.log(resolve(out, "riffatlas-editorial.json"));
for (const article of articles) {
  const chars = (article.body.match(/[\u3400-\u9fff]/g) ?? []).length;
  console.log(`${article.id}: ${chars} 個中文字`);
}
