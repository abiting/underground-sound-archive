import type { Album } from "./types";

// 台灣搖滾選輯獨立保存，不由國際選輯的研究匯入器覆蓋。
export const taiwanAlbums: Album[] = [
  {
    id: "quarterback-deep-blue",
    artist: "四分衛",
    title: "Deep Blue",
    year: "2001",
    genre: "台灣搖滾",
    trackCount: 13,
    trackCountNote: "12 首歌曲，加末尾隱藏演奏曲〈Deep Blue〉，共 13 軌；曲序與 Apple Music、五大唱片及 Hit FM 資料一致。",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/7d/0f/66/7d0f660b-d5a0-7bda-dd7c-6eab127028d6/COVER-0103.jpg/500x500bb.jpg",
    coverSource: "Apple Music／iTunes 專輯 artwork",
    coverSourceUrl: "https://music.apple.com/tw/album/deep-blue/1446707308",
    musicbrainzUrl: "",
    storeUrl: "https://music.apple.com/tw/album/deep-blue/1446707308",
    tracks: ["雨和眼淚", "魔毯", "項鍊"],
    summary: "四分衛在 2001 年推出的《Deep Blue》，以〈雨和眼淚〉的失去與珍惜為入口，連結〈魔毯〉的生命渴望和〈項鍊〉的冷落記憶。完整導讀帶你把這首名曲放回台灣搖滾專輯的曲序與創作脈絡。",
    listeningNotes: `四分衛（Quarterback）的《Deep Blue》於 2001 年 9 月 1 日發行，共有 13 軌；前 12 首是歌曲，末軌是隱藏演奏曲〈Deep Blue〉。這張專輯適合從曲序讀成一段由想望、碰撞到回聲的路徑：開場的〈ㄋㄠ種〉先把夢想放在顧慮裡，第二首〈魔毯〉則把視線推向更開闊、未知的方向。Hit FM 的資料以生命渴望與未知方向形容〈魔毯〉，因此它不只是飛行意象，也像全輯對「要不要繼續往前」的第一次提問。

〈雨和眼淚〉是這次導讀的核心落點。它排在第 4 首，位於〈項鍊〉之後，讓前一首硬式搖滾所帶出的飾物與被冷落記憶，轉入對失去與珍惜的凝視。兩首相鄰，情緒不必被解釋成同一個故事，卻能互相照見：一首把傷口外放，一首把情感收回。Hit FM 的曲目介紹將〈雨和眼淚〉放在失去與珍惜的脈絡中；回到曲序聽，這首熟悉的情歌便不只是單獨的抒情符號，而有了前後承接的位置。

Freshmusic 的回顧提到，〈雨和眼淚〉由陳偉製作，讓阿山的詞曲更平易近人，同時保留樂團風格。這個說法適合拿來理解歌曲的入口：它不是脫離四分衛脈絡的單獨情歌，而是把個人感受放進樂團共同完成的框架。阿山負責詞曲、樂團負責編曲製作，是 Hit FM 資料所列的創作分工。重聽時可先連播〈魔毯〉、〈項鍊〉與〈雨和眼淚〉，比較氣勢、重量與抒情方向如何轉換，而不是只等最熟悉的一首出現。

把〈雨和眼淚〉放回中段，後面的〈Lizard King〉和〈珊瑚礁〉把注意力重新投向日常與遺憾。Freshmusic 的回顧分別以日常困局和錯過夢想的遺憾解讀兩曲，與 Hit FM 所說的人文、自然關注互相補足。曲序再經〈銀河鐵道〉、〈Butterfly〉與〈暈眩〉，到了〈迴音〉，約 12 分鐘的長度讓唱片尺度拉開。接續〈眼神〉、〈十月病〉，最後以演奏曲〈Deep Blue〉收束，讓「深藍」也能透過樂團演奏延伸，而不只停在情歌的文字情境。

這張專輯的背景也包含現實與夢想的拉鋸。Freshmusic 回顧四分衛在首專《起來》之後，製作與宣傳規模增加，仍保留白天工作、夜晚練團所養成的樂團性格。第一輪建議完整聽完 13 軌，保留長曲與演奏尾聲；第二輪再回到三首入口：〈魔毯〉向未知伸手，〈項鍊〉回看被冷落的記憶，〈雨和眼淚〉則面對失去。這樣重聽《Deep Blue》，能把一首名曲帶來的共鳴，放回整張唱片對生活與渴望的追問。`,
    sources: [
      { name: "Apple Music：Deep Blue 專輯與發行日期", url: "https://music.apple.com/tw/album/deep-blue/1446707308" },
      { name: "Hit FM：Deep Blue 深藍專輯介紹與曲序（資料來源：動能音樂）", url: "https://www.hitoradio.com/newweb/522album" },
      { name: "五大唱片：Deep Blue 專輯曲目", url: "https://www.5music.com.tw/Cdlist-C.asp?cdno=425425741792" },
      { name: "Freshmusic：四分衛 Deep Blue 專輯回顧", url: "https://freshmusic.sg/2012/01/25/freshmusic-10年100大專輯-026-四分衛-《deep-blue》/" },
    ],
  },
];
