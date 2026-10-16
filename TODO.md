# TODO

## 專輯封面 API 與來源資訊
- [x] 網站必須串接可用的音樂資料 API，呈現樂團／專輯中繼資料及專輯封面；封面缺漏時顯示預設圖。專輯封面須標示資料來源及必要的版權／外部連結資訊。
- [x] 回答「有那種樂團專輯封面的 API 嗎」，並在網站或交付說明中清楚列出原型採用的 API 及使用限制。

## 搖滾／金屬探索與閱讀內容
- [x] 網站以繁體中文介紹搖滾或金屬音樂。
- [x] 首頁以精選專輯、最新文章與主題策展帶領讀者探索內容。
- [x] 新增 10 篇搖滾／金屬樂團或專輯介紹文章，以及 1 篇〈美しい鰭〉文章；各篇文章應有獨立標題、摘要、分類及內文。
- [x] 〈美しい鰭〉文章中的《黑鐵的魚影》須設為超連結，網址必須是 https://coai.abiting.cc/archives/1437，並在文意中說明這首歌作為該電影片尾曲。
- [x] 依搖滾、金屬及其子類型瀏覽樂團與專輯。
- [x] 樂團介紹頁呈現背景、風格、代表作品與相關專輯。
- [x] 專輯詳情／評論頁呈現基本資料、曲目重點、評論內容與評分。
- [x] 提供站內搜尋，並可依類型、年代等條件篩選內容。

## 桌面與行動閱讀介面
- [x] 支援桌面與行動裝置的響應式閱讀介面。

## 破繭之聲站名與 SEO
- [x] 網站標題改為「破繭之聲 Underground Sound Archive｜搖滾與金屬唱片誌」，品牌導覽、頁尾、HTML 標題一致。
- [x] 每頁補齊 route-specific title、description、keywords、Open Graph、Twitter Card、JSON-LD、語言與語意化 heading；所有有內容的圖片均有描述性 alt，裝飾圖片與圖示不冗餘朗讀。
- [x] 首頁、11 篇文章、15 個樂團頁及 27 張專輯頁的主要內容與 metadata 直接存在初始 HTML 中，並保留搜尋、篩選與用戶端導覽。
- [x] 不臆造正式網域。canonical、og:url、正式 sitemap 經公開網域設定產生；未設定正式網域時預覽 noindex，提供 robots 與 sitemap 模板，錯誤頁 noindex 並在預覽返回 HTTP 404。
- [x] SEO 更新經型別、建置、raw HTML 和 metadata 測試驗證；不把預覽檢查誤報為正式收錄，不擅自完成待確認的 GitHub 轉移或公開發佈。
- [x] 中英文品牌名稱中間保留空格：破繭之聲 Underground Sound Archive；主視覺大標仍為「把音量開到／失真以外。」，該區塊不再重複站名。
- [x] 頁尾「資料來源與授權說明」使用 https://abiurl.me/Jc8uTl；專輯查證與封面來源連結不改。
- [x] 頁尾增加「本站由阿比丁協助架設與維護」，其中「阿比丁」連到 https://abiting.cc。
- [x] GitHub 使用 Webdev 的目的儲存庫確認流程；未確認目的地前不傳輸程式碼，並由平台驗證已確認的儲存庫已接收最新 checkpoint。
- [x] 修正使用者回報的首頁 SSR hydration mismatch：通知元件只於初次 hydration 完成後在用戶端掛載，SSR/client 其餘頁面 DOM 一致。

## GitHub Pages 目錄與新增選輯
- [x] 導覽、返回目錄、專輯與文章連結使用 /underground-sound-archive/ 基底路徑；錨點定位正確，外部連結不改。
- [x] Pages 建置提供各頁初始 HTML、正確 canonical、og:url、sitemap 和真正的 404 頁；保留 Manus 預覽的根目錄相容性。
- [x] 新增 Dreamshade《The Gift of Life》與 Dream Theater《Six Degrees of Inner Turbulence》，包含查證過的封面、年份、曲目數、代表聽點、完整故事導讀與來源連結；兩團均有有效樂團索引頁。
- [x] 首頁專輯數量隨資料更新，所有新增專輯進入專輯目錄與 sitemap；既有 11 篇文章不改寫。

## 樂團索引
- [x] 樂團索引同步納入新增唱片所屬的 Dreamshade 與 Dream Theater；每個索引連結須能開啟該團的樂團頁並列出代表專輯；公開路由、canonical 與 sitemap 同步更新。
- [x] Dreamshade《The Gift of Life》與 Dream Theater《Six Degrees of Inner Turbulence》各有完整繁體中文專輯故事，涵蓋發行／創作背景、曲目及聲音脈絡、可採用的聆聽線索，並附可核對的來源連結。

## 頁尾微調
- [x] 移除頁尾文案「扭開音量，翻開一頁」，聲明精確為「封面由資料來源提供；作品權利屬於原權利人；本站為音樂導讀與評論用途」。

## 全樂團追加知名專輯與新團
- [x] 現存 13 個樂團 Queen、Pink Floyd、Led Zeppelin、Nirvana、Radiohead、Black Sabbath、Iron Maiden、Metallica、Megadeth、Slipknot、Dreamshade、Dream Theater、Spitz 各新增 1 張未收錄的知名專輯，保留既有 12 張專輯及 11 篇文章。
- [x] Green Day（依使用者 Greeeday 拼寫正規化）與 Ave Mujica 各加入 1 張專輯，含有效樂團索引、樂團頁及代表專輯連結。
- [x] 共新增 15 張專輯；各有查證過的年份、版本／曲目數、3 首代表聽點、正確封面及其來源；不捏造 MusicBrainz ID 或以其他專輯封面替代。
- [x] 每張新增專輯都有 500–800 個中文字、4–6 段的原創完整故事，涵蓋發行／創作背景、曲目與聲音發展、作品定位及聆聽線索，至少 2 個已閱讀的可靠查證來源；中文與英文／數字間保留空格。
- [x] 27 張專輯、15 個樂團與原有文章可以從首頁目錄、站內搜尋、篩選與樂團頁完整瀏覽；新增頁面的初始 HTML、圖片 alt、title、description、分享 metadata、canonical、sitemap 及路由清單同步且使用 GitHub Pages 子目錄。
- [x] TypeScript 檢查與 36 項測試全部通過；Pages 靜態建置輸出 54 個公開路由、sitemap、robots、404 及正確子目錄 manifest。
- [x] 依使用者指正，Dreamshade 指定新選輯為《What Silence Hides》，排除無法證實的《Human》；匯入 ID 與回歸測試已同步更正。
