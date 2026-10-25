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
  {
    id: "men-envy-children-third-wish",
    artist: "小男孩樂團",
    title: "第三個願望 The 3rd Wish",
    year: "2019",
    trackCount: 10,
    genre: "台灣流行搖滾",
    trackCountNote: "採 Apple Music 與滾石唱片標準版曲序相同的 2019 年 6 月 12 日 10 首版本；分享典藏版另加〈站在你的左邊〉，不混入本頁曲數。〈轉身以後〉位於第 4 首，長 3 分 54 秒。",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/eb/1b/80/eb1b8062-fba1-1855-046e-4749b7cb3292/4710149672278.jpg/600x600bb.jpg",
    coverSource: "Apple Music／iTunes 專輯 artwork",
    coverSourceUrl: "https://music.apple.com/tw/album/%E7%AC%AC%E4%B8%89%E5%80%8B%E6%84%BF%E6%9C%9B/1466752361",
    musicbrainzUrl: "",
    storeUrl: "https://music.apple.com/tw/album/%E7%AC%AC%E4%B8%89%E5%80%8B%E6%84%BF%E6%9C%9B/1466752361",
    tracks: ["征服 Conquer", "轉身以後", "Goodbye My Friend"],
    summary: "從第三張創作專輯的「第三個願望」概念，到第 4 首〈轉身以後〉與後半的友情、影集歌曲，回看小男孩樂團如何把七年玩團歷程與人生體會收進 2019 年《第三個願望 The 3rd Wish》。",
    listeningNotes: `《第三個願望 The 3rd Wish》是小男孩樂團於 2019 年推出的第三張創作專輯。Apple Music 標準版目錄列出 10 首歌、全長約 36 分鐘，發行日期為 6 月 12 日；滾石唱片商城也以 RD2070 標示同日發行。本文依這個 10 首標準版介紹，與後來增加歌曲的「分享典藏版」分開計算，避免把再版曲目混入原始曲序。

滾石的專輯文案以「一、二、三個願望」描述作品架構：先從理想人生與夢想說起，再落到做最想做的事，第三個願望則指向心中最重要的目標。唱片公司也把這張專輯定位成累積約七年玩團歷程後的新里程碑，記錄樂團走過的酸甜苦辣與人生體會。這是發行方為專輯寫下的企劃語言；我會把「願望」當成貫穿全輯的線索，而不替每首歌指定同一個答案。

標準版從〈征服〉、〈男孩與獅王〉和〈我的驕傲〉走入前段，第四首〈轉身以後〉將情緒轉向關係中的離開，之後接上〈旅行公路〉與〈薛丁格的貓〉。把這段連著播放，會感到第 4 首像讓步伐稍微停頓，再重新往前；這是根據官方曲序做的編輯觀察，不代表唱片公司宣告了明確的章節設計。另一個入口是首曲和第三首，先聽專輯開場如何建立不同於告別曲的方向。

後半段由〈Goodbye My Friend〉、〈Never the Point〉、〈We Are〉與〈Rise and Shine〉繼續展開。滾石資料提到，〈征服〉與〈We Are〉曾作為 Lamigo 桃猿年度歌曲，〈Never the Point〉是影集《雙城故事》的片尾曲中文版，〈轉身以後〉則是《月下－為愛墜落的祂》的插曲。這些歌曲的媒介背景各不相同，顯示專輯既收入樂團的創作，也把作品帶往戲劇與運動現場；它們在曲序裡仍共同構成一張唱片。

重聽時建議先完整播放 10 首，再回頭比較〈征服〉、〈轉身以後〉和〈Goodbye My Friend〉：從行動、告別到友情，作品的關係視角逐漸轉換。標準版在第 10 首〈Rise and Shine〉收尾；如果手上聽的是 11 首分享典藏版，則還多了〈站在你的左邊〉，那是另一個經滾石說明的發行版本。把版本辨清之後，《第三個願望》既能讀作七年樂團歷程的整理，也能聽成仍向前許願的開放結尾。`,
    sources: [
      { name: "Apple Music：《第三個願望》標準版、日期與曲序", url: "https://music.apple.com/tw/album/%E7%AC%AC%E4%B8%89%E5%80%8B%E6%84%BF%E6%9C%9B/1466752361" },
      { name: "滾石唱片商城：《第三個願望 The 3rd Wish》標準版曲目與介紹", url: "https://shop.rockmall.com.tw/product_view.php?id=59857" },
      { name: "Hit FM：《第三個願望 The 3rd Wish》專輯資料與曲序", url: "https://www.hitoradio.com/newweb/17208album" },
      { name: "滾石唱片商城：《第三個願望》分享典藏版與加收曲說明", url: "https://shop.rockmall.com.tw/product_view.php?id=60640" },
    ],
  },
];
