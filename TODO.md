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
- [x] 首頁、11 篇文章、11 個樂團頁及10張專輯頁的主要內容與 metadata 直接存在初始 HTML 中，並保留搜尋、篩選與用戶端導覽。
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
- [x] 新增 Dreamshade《The Gift of Life》與 Dream Theater《Six Degrees of Inner Turbulence》，包含查證過的封面、年份、曲目數、代表聽點、简短導讀與來源連結；不存在的樂團頁不得產生壞連結。
- [x] 首頁專輯數量隨資料更新，所有新增專輯進入專輯目錄與 sitemap；既有 11 篇文章不改寫。
