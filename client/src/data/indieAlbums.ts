import type { Album } from "./types";

// 不由批次研究匯入器管理的獨立／迷幻搖滾選輯。
export const indieAlbums: Album[] = [
  {
    id: "my-chemical-romance-black-parade",
    artist: "My Chemical Romance",
    title: "The Black Parade",
    year: "2006",
    genre: "另類搖滾",
    trackCount: 14,
    trackCountNote: "依 My Chemical Romance 官方 Warner Records 標準 CD 曲目表計為 14 軌；第 14 軌〈Blood〉標示為隱藏曲。Apple Music 標準專輯頁也列出 14 首、全長約 51 分鐘；不混計豪華版或週年版加收曲。",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/56/99/8a/56998a1c-efe7-fdf0-2b1d-e2da88d8df52/093624917724.jpg/600x600bb.jpg",
    coverSource: "Apple Music／iTunes 專輯 artwork",
    coverSourceUrl: "https://music.apple.com/us/album/the-black-parade/1156310650",
    musicbrainzUrl: "",
    storeUrl: "https://music.apple.com/us/album/the-black-parade/1156310650",
    tracks: ["The End.", "Welcome to the Black Parade", "Disenchanted", "Famous Last Words"],
    summary: "My Chemical Romance《The Black Parade》完整專輯導讀：從 Patient 概念、經典搖滾與劇場影響，到〈Welcome to the Black Parade〉、〈Disenchanted〉的曲序聆聽路徑，重聽 2006 年標準版 14 軌如何構成一張戲劇化概念專輯。",
    listeningNotes: `《The Black Parade》是 My Chemical Romance（MCR）於 2006 年推出的第三張錄音室專輯。Apple Music 的美國標準版頁列 14 首、全長 51 分鐘，唱片公司為 Reprise Records；官方 CD 曲目表同樣列出 14 軌，末尾〈Blood〉標為隱藏曲。以下以這個標準版計數，不把豪華版和週年再版的額外內容混進來。Apple Music 與 Alternative Press 都把唱片放在臨終青年 Patient 的概念脈絡中，但這是整張專輯的舞台設定，不等於每首歌都只有一種解法。

製作上，Alternative Press 重刊 2006 年訪談記載，樂團先在紐約寫歌與前期製作，之後搬到加州 Paramour 錄音。訪談中的 Ray Toro 提到 Queen、Journey、Pink Floyd，也提及音樂劇等參照；這些是團員談到的創作座標。The Guardian 同期評論則以歌劇式戲劇性概括專輯，屬評論者判斷。把兩種說法放在一起，可以理解這張唱片為何把龐克的直衝、經典搖滾的規模與舞台敘事並置，而不必把它簡化成單一曲風。

曲序的入口先從〈The End.〉開始。它為唱片揭幕，第二首〈Dead!〉把開場往更高張力推，接著〈This Is How I Disappear〉和〈The Sharpest Lives〉延續前段，直到第五首才迎來〈Welcome to the Black Parade〉。我會把前五首連著聽，留意序曲如何讓位給主題曲，而不是只抽出最熟悉的單曲；這個「逐步開場」是本文對曲序效果的讀法，歌曲位置則可在官方曲目表核對。

下半張唱片還可以把〈Teenagers〉、〈Disenchanted〉、〈Famous Last Words〉三首接著播放。它們分別排在第 11、12、13 首，結尾再接隱藏曲〈Blood〉。〈Disenchanted〉的位置讓我想先把節奏放慢，聽完再進入〈Famous Last Words〉；與其預先把它們套進 Patient 故事的某個確定情節，不如觀察相鄰歌曲如何改變聆聽重心。這條曲序路徑建立在官方曲目表上，情緒上的收放則是個人聽感。

專輯野心不只在角色設定，也在把歌曲安排成一場由序幕、群眾合唱到尾聲的演出。Alternative Press 所載訪談談到團員追求做出耐久、夠大的作品；The Guardian 的評論注意到戲劇、吉他與不同歌曲氣質之間的反差。這些都是來源所記錄的觀點，不取代聽者自己的判斷。建議先完整播放 14 軌，再回頭比較〈The End.〉、〈Welcome to the Black Parade〉和〈Disenchanted〉，最後不要跳過末尾的〈Blood〉，就能同時留意角色敘事、曲序起伏和隱藏曲如何改變標準版的收尾。`,
    sources: [
      { name: "Apple Music：The Black Parade 標準專輯、曲序與年份", url: "https://music.apple.com/us/album/the-black-parade/1156310650" },
      { name: "My Chemical Romance 官方 Warner Records 商店：標準 CD 曲目表", url: "https://mychemicalromance.warnerrecords.com/products/the-black-parade-cd" },
      { name: "Alternative Press：MCR《The Black Parade》專訪，重刊 2006 年封面訪談", url: "https://www.altpress.com/my-chemical-romance-the-black-parade-interview/" },
      { name: "The Guardian：Betty Clarke 2006 年同期專輯評論", url: "https://www.theguardian.com/music/2006/oct/20/popandrock.shopping" },
    ],
  },
  {
    id: "ceramic-animal-cosmic-eraser",
    artist: "Ceramic Animal",
    title: "Cosmic Eraser",
    year: "2024",
    genre: "迷幻搖滾",
    trackCount: 8,
    trackCountNote: "Apple Music 與 Bandcamp 均列出 8 首歌曲；Apple Music 標示全長約 30 分鐘。",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/d5/50/f0/d550f08e-0349-f5d8-c72c-d852f0e13742/artwork.jpg/500x500bb.jpg",
    coverSource: "Apple Music／iTunes 專輯 artwork",
    coverSourceUrl: "https://music.apple.com/tw/album/cosmic-eraser/1779727669",
    musicbrainzUrl: "",
    storeUrl: "https://music.apple.com/tw/album/cosmic-eraser/1779727669",
    tracks: ["Eyes On You", "Maybe Tomorrow", "Mind In Ruin"],
    summary: "從先行單曲〈Eyes On You〉切入 Ceramic Animal 的第五張專輯：在曲序、錄音背景與迷幻流行搖滾的鬆弛感之間，讀出《Cosmic Eraser》的聆聽路徑。",
    listeningNotes: `Ceramic Animal 是來自美國賓夕法尼亞州 Doylestown 的五人樂團；《Cosmic Eraser》於 2024 年 11 月 22 日自行發行，是他們第五張錄音室專輯。Chris Regan 與 Anthony Marchione 共同寫作，Regan 負責製作和混音。PA Times 記載，這張唱片是在印第安納州 Lake Monroe 湖畔的小屋錄製；樂團的發行說明則把這次創作形容為累積新經驗後，重新找回依自己的方式製作音樂的自由。

第四張《Sweet Unknown》曾與 Dan Auerbach 在 Nashville 的 Easy Eye Sound 合作。樂團表示，這段經歷帶來新的製作經驗，卻沒有讓第五張唱片單純複製前作。官方說明提到 glam、post-punk 和 psychedelic rock，PA Times 另指出 1970 年代流行樂的影響；Bandcamp 標籤則列有 indie rock、indie pop 與 psychedelic rock。Add to Wantlist 的評論者把專輯稱作 garage pop，並形容整體有鬆弛的節奏感、帶些粗礪的人聲、溫暖和聲與清晰的吉他旋律。這些分類不必硬合成單一標籤，可當作聆聽時的幾個座標。

〈Eyes On You〉先在 2024 年 8 月 23 日以單曲推出，專輯版排在第二首，長 3 分 33 秒。它前面是 5 分 10 秒的〈Just To Take It In〉，後面接 4 分 36 秒的〈Maybe Tomorrow〉。這個長、短、再放長的曲序，提供一個具體入口：先連聽前三首，留意第二首如何改變整張唱片剛開始的步伐，再回頭比較單曲版與放在專輯中的位置。現有來源沒有替〈Eyes On You〉指定固定的歌詞解讀，因此不必先替它編出情節。

若想更了解專輯裡的演唱視角，可接著聽第五首〈Mind In Ruin〉和第七首〈Change For You〉。PA Times 指出兩首由 Marchione 寫作並演唱，是他在這張專輯首次擔任主唱的作品；這提供了比較人聲角色的線索，而不是推論兩首歌必然講述某種故事。〈Maybe Tomorrow〉則曾作為單曲推出，PA Times 說它的音樂影片延續樂團從〈Look for a Lover〉到〈Workin’ Real Hard〉的星際影像系列。

收尾的第八首〈Cosmic Eraser〉長 4 分 05 秒。PA Times 對這首同名曲的描述談到脆弱感、宇宙意象，以及愛、失去和重新開始，並把歌名看成按下重置的比喻；這是媒體對同名曲的說明，不應直接擴大成整張專輯的唯一概念。建議先完整播放八首，再回到第二首〈Eyes On You〉、第五首〈Mind In Ruin〉和最後的同名曲：如此既能追蹤短小單曲如何安放在曲序裡，也能把錄音背景、演唱變化與專輯結尾放在同一次聆聽中比較。`,
    sources: [
      { name: "Ceramic Animal：Bandcamp《Cosmic Eraser》曲序與標籤", url: "https://ceramicanimal.bandcamp.com/album/cosmic-eraser" },
      { name: "Ceramic Animal：官方《Cosmic Eraser》曲目表", url: "https://ceramicanimal.net/products-inventory/p/c7gphiga1uzb8tx7g57iruilecbbet" },
      { name: "Apple Music：〈Eyes On You〉單曲發行日", url: "https://music.apple.com/us/album/eyes-on-you-single/1763371989" },
      { name: "Pirate! Promotion：樂團發行說明與製作背景", url: "https://piratepirate.com/ceramic-animal-3/" },
      { name: "PA Times：專輯發行報導與團員訪談", url: "https://patimes.media/featured/ceramic-animal-drops-fifth-album-cosmic-eraser-announces-holiday-shows/" },
      { name: "Add to Wantlist：專輯評論", url: "https://addtowantlist.com/index.php/2024/12/05/new-album-ceramic-animal-cosmic-eraser/" },
    ],
  },
];
