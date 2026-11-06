import type { Album } from "./types";

// 將舊站失效的歌手索引與文章內容回補為互相連結的歌曲／專輯資料。
export const legacySongAlbums: Album[] = [
  {
    id: "22-20s-self-titled",
    artist: "22-20s",
    title: "22-20s",
    year: "2004",
    trackCount: 11,
    trackCountNote: "採 Apple Music 美國目錄所列的 11 首、約 43 分鐘版本；BBC 2004 年評論存檔另列 10 首曲目，本頁以 Apple Music 此版為準，不推定不同目錄差異的原因。",
    genre: "藍調搖滾",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/ec/ed/31/eced3171-2e4b-aeca-869f-924437770bc8/0724386093455_1401x1401_300dpi.tif/600x600bb.jpg",
    coverSource: "Apple Music／iTunes 專輯 artwork",
    coverSourceUrl: "https://music.apple.com/us/album/22-20s/693205746",
    musicbrainzUrl: "",
    storeUrl: "https://music.apple.com/us/album/22-20s/693205746",
    tracks: ["Devil In Me", "Such a Fool", "Shoot Your Gun"],
    summary: "22-20s 於 2004 年推出的同名首張專輯，以藍調根源、粗礪搖滾與現場能量展開；從開場〈Devil In Me〉一路走到〈Shoot Your Gun〉，聽一支四人樂團如何把舞台上的張力帶進錄音室。",
    listeningNotes: `《22-20s》是英國四人樂團 22-20s 的同名首張錄音室專輯，Apple Music 美國目錄列出 2004 年 9 月 20 日發行、11 首歌曲、全長約 43 分鐘，並標示 Parlophone 的 ℗ 資料。BBC 同期評論的曲目表則列有 10 首，因此本文的曲數採 Apple Music 這一版，不把兩個目錄的數量混成同一張唱片。從題名到第一首歌都直接以樂團本身作為入口，讓作品像一張由現場聲音轉入錄音室的名片。

BBC 評論把 22-20s 描述為來自 Lincoln 的藍調四人組，寫到他們在現場演出多年，甚至先推出現場迷你專輯《05/03》，才完成這張錄音室首作。這些資料可以說明樂團並非先靠精緻錄音建立形象；評論者在唱片裡聽見的，是舞台上已經成形的粗獷感。這是同期媒體對他們發展路徑的描述，也讓「現場能量如何留下」成為理解本作的一條線索。

製作人 Brendan Lynch 曾參與 Primal Scream 作品，BBC 指出他與樂團合作，讓唱片把帶砂礫感的搖滾樂與傳統藍調並置。這些元素不需要被塞進狹窄的類型盒：吉他、貝斯、鼓的直接編制保留搖滾推力，藍調語彙則替歌曲添上反覆、拖曳與不安的色彩。對我而言，這張專輯最有辨識度的地方，是演奏既不抹平粗糙處，也沒有放棄旋律的清晰度；這是聽感，不是樂團自稱的唯一風格。

曲序從〈Devil In Me〉開始，接著是〈Such a Fool〉與〈Baby Brings Bad News〉，第五首〈Friends〉又讓步伐稍微放鬆。BBC 評論同樣注意到開場曲的怒氣與後段民謠式歌曲之間的反差，並把〈Shoot Your Gun〉形容為迷幻取向的單曲。建議先連聽前三首，再跳到第五首與第七首比較節奏和吉他質地：一邊感受同一團員如何調整力度，一邊觀察曲序怎樣讓重型開場之後有了呼吸。

這張專輯在不同來源中出現 10 與 11 首的曲目數差異，是版本資料需要保留的細節，而非任意選一個數字。實際重聽時，可以先完整播放 Apple Music 所列的 11 首版本，再回到第一首〈Devil In Me〉，聽熟悉的開場如何替其後段落設定情緒。BBC 的評論提供當時樂團由現場走向正式專輯的觀察；串流目錄則提供發行日、曲數與歌曲所屬，兩者各自回答不同問題。`,
    sources: [
      { name: "Apple Music：22-20s 標準專輯目錄、日期與曲數", url: "https://music.apple.com/us/album/22-20s/693205746" },
      { name: "BBC Music：22-20s 2004 年專輯同期評論與曲目表", url: "https://www.bbc.co.uk/music/reviews/xzxm/" },
    ],
  },
  {
    id: "babybird-ugly-beautiful",
    artist: "Babybird",
    title: "Ugly Beautiful",
    year: "1996",
    trackCount: 15,
    trackCountNote: "採 Apple Music 於 1996 年 10 月 21 日列出的 15 首標準版，全長約 1 小時 10 分；不混計另列的 26 首 Expanded 版。",
    genre: "另類流行",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/5c/24/28/5c24280e-51eb-6ab3-781e-dcb530d9957e/0886443962941.jpg/600x600bb.jpg",
    coverSource: "Apple Music／iTunes 專輯 artwork",
    coverSourceUrl: "https://music.apple.com/us/album/ugly-beautiful/1436093713",
    musicbrainzUrl: "",
    storeUrl: "https://music.apple.com/us/album/ugly-beautiful/1436093713",
    tracks: ["Goodnight", "Candy Girl", "You're Gorgeous"],
    summary: "Babybird《Ugly Beautiful》是 1996 年以完整樂團編制呈現的 15 首專輯；從第二首〈Candy Girl〉到〈You're Gorgeous〉，追聽 Stephen Jones 的黑色幽默如何與更清晰、豐厚的流行編曲並行。",
    listeningNotes: `Babybird 的《Ugly Beautiful》於 1996 年 10 月 21 日推出。Apple Music 標準目錄列 15 首、全長約 1 小時 10 分，唱片權利資料標示 BMG Rights Management (UK) trading as Echo；另有 26 首的 Expanded 版，但本頁不把加收內容算進標準版。若讀者搜尋這張作品，先確認版本很重要：曲數與編輯順序會改變對原始專輯篇幅的理解，以下以標準版作為聆聽基準。

The Independent 的同期評論記錄 Stephen Jones 將早期個人名義 Baby Bird 唱片中的多首歌曲，與新組成的伴奏樂團重新錄製。評論認為樂團編制增加了聲音層次，歌曲不再像只是孤身完成的草稿；AllMusic 後來也把大廠牌與完整樂團編制視為這張唱片的轉折，指出更清楚、厚實的編曲帶來新的優點與限制。這些評論描述的是製作與呈現的變化，不代表創作者本人對每首歌意義的定論。

Apple Music 將專輯類型列為 Pop；AllMusic 則特別談到流行單曲的旋律和編曲清晰度。兩種觀察放在一起，能聽出唱片如何在古怪的文字遊戲與易記的旋律之間拉扯。Stephen Jones 的歌曲常把看似甜美的稱呼與不安定的情緒並排，但「可親近」不等於「單純」；這個反差是我重聽時留意到的方向，也是標題《Ugly Beautiful》最適合延伸的聆聽提問之一。

曲序先放〈Goodnight〉，第二首才進入〈Candy Girl〉，接著是〈Jesus Is My Girlfriend〉；第七首〈You're Gorgeous〉則是另一個廣為人知的單曲。The Independent 特別提到〈Candy Girl〉以荒誕押韻構築戲謔效果，卻不需要因此逐字重述歌詞。建議先連聽前三首，再比較第二首與第七首如何用不同旋律包裹帶刺的文字：前者更像一段俏皮對話，後者的流行外表則另有令人不安的底色。

《Ugly Beautiful》不只是把早期歌曲換上樂團編制，也把 Babybird 從 lo-fi 個人錄音帶往更完整的流行聲響推進。The Independent 與 AllMusic 都觀察到這種變化帶來清晰度，同時也改變了歌曲原本的古怪親密感；這是評論者各自的判斷，聽者可以不同意。推薦用標準 15 首版完整播放一次，再回到〈Candy Girl〉，留心人聲、鍵盤與節奏組如何支撐文字的轉折，並把它放在全專輯中理解，而不是只當作一首脫離曲序的單曲。`,
    sources: [
      { name: "Apple Music：《Ugly Beautiful》標準專輯目錄、發行日與曲數", url: "https://music.apple.com/us/album/ugly-beautiful/1436093713" },
      { name: "The Independent：1996 年 Babybird《Ugly Beautiful》同期評論", url: "https://www.the-independent.com/arts-entertainment/babybird-ugly-beautiful-echo-ech-cd11-review-1358900.html" },
      { name: "AllMusic：Babybird《Ugly Beautiful》專輯評論", url: "https://www.allmusic.com/album/ugly-beautiful-mw0000028349" },
    ],
  },
];
