import fs from "node:fs";
import path from "node:path";
import type { Album } from "../client/src/data/types";

const expected = [
  ["queen-news-of-the-world", "Queen"],
  ["pink-floyd-wish-you-were-here", "Pink Floyd"],
  ["led-zeppelin-two", "Led Zeppelin"],
  ["nirvana-in-utero", "Nirvana"],
  ["radiohead-kid-a", "Radiohead"],
  ["black-sabbath-master-of-reality", "Black Sabbath"],
  ["iron-maiden-powerslave", "Iron Maiden"],
  ["metallica-black-album", "Metallica"],
  ["megadeth-countdown-to-extinction", "Megadeth"],
  ["slipknot-vol-three", "Slipknot"],
  ["dreamshade-what-silence-hides", "Dreamshade"],
  ["dream-theater-images-and-words", "Dream Theater"],
  ["spitz-hachimitsu", "Spitz"],
  ["green-day-american-idiot", "Green Day"],
  ["ave-mujica-completeness", "Ave Mujica"],
] as const;

const listeningStarts: Record<string, string[]> = {
  "queen-news-of-the-world": ["We Will Rock You", "We Are the Champions", "Spread Your Wings"],
  "pink-floyd-wish-you-were-here": ["Shine On You Crazy Diamond, Parts 1-5", "Welcome To The Machine", "Wish You Were Here"],
  "led-zeppelin-two": ["Whole Lotta Love", "What Is and What Should Never Be", "Ramble On"],
  "nirvana-in-utero": ["Heart Shaped Box", "Rape Me", "All Apologies"],
  "radiohead-kid-a": ["Everything In Its Right Place", "The National Anthem", "Idioteque"],
  "black-sabbath-master-of-reality": ["Sweet Leaf", "Children of the Grave", "Into the Void"],
  "iron-maiden-powerslave": ["Aces High", "2 Minutes to Midnight", "Rime of the Ancient Mariner"],
  "metallica-black-album": ["Enter Sandman", "Sad But True", "Nothing Else Matters"],
  "megadeth-countdown-to-extinction": ["Symphony of Destruction", "Sweating Bullets", "Countdown to Extinction"],
  "slipknot-vol-three": ["Duality", "Vermilion", "Before I Forget"],
  "dreamshade-what-silence-hides": ["What Silence Hides", "Wide Awake", "As Serenity Falls"],
  "dream-theater-images-and-words": ["Pull Me Under", "Another Day", "Metropolis - Part I: The Miracle and the Sleeper"],
  "spitz-hachimitsu": ["ロビンソン", "涙がキラリ☆", "愛のことば"],
  "green-day-american-idiot": ["American Idiot", "Jesus of Suburbia", "Boulevard of Broken Dreams"],
  "ave-mujica-completeness": ["KiLLKiSS", "Crucifix X", "天球(そら)のMúsica"],
};

function requireHttps(value: unknown, label: string) {
  if (typeof value !== "string" || !value.startsWith("https://")) throw new Error(`${label}: HTTPS 網址缺漏`);
  const url = new URL(value);
  if (url.username || url.password) throw new Error(`${label}: 網址不可含帳密`);
  return value;
}

const records = expected.map(([id, artist]): Album => {
  const file = path.resolve(`.research/album-expansion/${id}.json`);
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  const researchId = id === "metallica-black-album" ? "metallica-metallica-1991" : id;
  if (raw.id !== researchId || raw.artist !== artist) throw new Error(`${id}: 藝人或 ID 錯配`);
  if (!raw.title || !/^\d{4}$/.test(raw.year) || !Number.isInteger(raw.trackCount) || raw.trackCount <= 0) throw new Error(`${id}: 發行或曲目欄位無效`);
  const story = String(raw.listeningNotes || "").trim();
  const count = (story.match(/[\u3400-\u9fff]/g) ?? []).length;
  const paragraphs = story.split(/\n\s*\n/).filter(Boolean).length;
  if (count < 500 || count > 800 || paragraphs < 4 || paragraphs > 6) throw new Error(`${id}: 故事不符字數或段落 (${count}/${paragraphs})`);
  if (!raw.summary || !Array.isArray(raw.tracks) || !raw.tracks.length) throw new Error(`${id}: 摘要或曲目資料缺漏`);
  const fullTrackList = raw.tracks.map((track: string | { title?: string }) => typeof track === "string" ? track : track?.title || "").filter(Boolean);
  const normalizeTrack = (track: string) => track.normalize("NFKC").toLocaleLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
  const tracks = (listeningStarts[id] || []).map((selected) => fullTrackList.find((track: string) => normalizeTrack(track) === normalizeTrack(selected)));
  if (tracks.length !== 3 || tracks.some(track => !track)) throw new Error(`${id}: 三首聽點未能與核實曲目表相符`);
  if (!Array.isArray(raw.sources) || raw.sources.length < 2) throw new Error(`${id}: 查證來源不足`);
  for (const source of raw.sources) {
    if (!source.name) throw new Error(`${id}: 來源名稱缺漏`);
    requireHttps(source.url, `${id} source`);
  }
  if (!raw.coverSource) throw new Error(`${id}: 封面來源標籤缺漏`);
  const album: Album = {
    id, artist, title: raw.title, year: String(raw.year), genre: raw.genre,
    trackCount: raw.trackCount,
    ...(raw.trackCountNote ? { trackCountNote: raw.trackCountNote } : {}),
    coverUrl: requireHttps(raw.coverUrl, `${id} cover`),
    coverSource: raw.coverSource,
    coverSourceUrl: requireHttps(raw.coverSourceUrl, `${id} cover source`),
    musicbrainzUrl: raw.musicbrainzUrl ? requireHttps(raw.musicbrainzUrl, `${id} MusicBrainz`) : "",
    storeUrl: requireHttps(raw.storeUrl, `${id} store`),
    tracks: tracks as string[],
    summary: raw.summary,
    listeningNotes: story,
    sources: raw.sources.map((source: { name: string; url: string }) => ({ name: source.name, url: source.url })),
  };
  console.log(`${artist}｜${raw.title}｜${count} 中文字｜${paragraphs} 段｜${raw.sources.length} 來源｜${raw.coverSource}`);
  return album;
});

const output = path.resolve("client/src/data/albumExpansion.ts");
fs.writeFileSync(output, 'import type { Album } from "./types";\n\n// 已核對來源的追加選輯；由 scripts/import-album-expansion.ts 匯入。\nexport const expandedAlbums: Album[] = ' + JSON.stringify(records, null, 2) + ';\n');
console.log(`已輸出 ${records.length} 張專輯：${output}`);
