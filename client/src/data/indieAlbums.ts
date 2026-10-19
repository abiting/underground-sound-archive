import type { Album } from "./types";

// 不由批次研究匯入器管理的獨立／迷幻搖滾選輯。
export const indieAlbums: Album[] = [
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
