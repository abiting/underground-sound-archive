# TODO

## 專輯封面 API 與來源資訊
- [x] 網站串接可用的音樂資料 API，呈現樂團／專輯中繼資料及專輯封面；封面缺漏時顯示預設圖。專輯封面標示資料來源及必要的版權／外部連結資訊。
- [x] 回答「有那種樂團專輯封面的 API 嗎」，並在網站清楚列出原型採用的 API 及使用限制。

## 搖滾／金屬探索與閱讀內容
- [x] 網站以繁體中文介紹搖滾或金屬音樂。
- [x] 首頁以精選專輯、導讀內容與主題策展帶領讀者探索。
- [x] 新增 10 篇搖滾／金屬樂團或專輯介紹文章，以及 1 篇 Spitz〈美しい鰭〉文章；各篇有獨立標題、摘要、分類及內文。
- [x] Spitz〈美しい鰭〉文章中的《黑鐵的魚影》設為超連結，網址必須是 https://coai.abiting.cc/archives/1437，並在文意中說明歌曲作為電影片尾曲。
- [x] 依搖滾、金屬及子類型瀏覽樂團與專輯。
- [x] 樂團介紹頁呈現背景、風格、代表作品與相關專輯。
- [x] 專輯詳情頁呈現基本資料、曲目重點、導讀內容與評分。
- [x] 提供站內搜尋，並可依類型、年代等條件篩選內容。

## 桌面與行動閱讀介面
- [x] 支援桌面與行動裝置的響應式閱讀介面。

## 破繭之聲站名與 SEO
- [x] 網站標題改為「破繭之聲 Underground Sound Archive｜搖滾與金屬唱片誌」，品牌導覽、頁尾、HTML 標題一致。
- [x] 每頁有 route-specific title、description、keywords、Open Graph、Twitter Card、JSON-LD、語言與語意化 heading；有內容的圖片有描述性 alt，裝飾圖片與圖示不冗餘朗讀。
- [x] 首頁、12 篇文章、16 個樂團頁及 27 張專輯頁的主要內容與 metadata 直接存在初始 HTML 中，並保留搜尋、篩選與用戶端導覽。
- [x] 不臆造正式網域。canonical、og:url、正式 sitemap 經公開網域設定產生；預覽未設定正式網域時 noindex，提供 robots 與 sitemap，錯誤頁 noindex 並回傳 HTTP 404。
- [x] SEO 更新以型別、建置、raw HTML 和 metadata 測試驗證；不把預覽檢查誤報為搜尋引擎收錄。
- [x] 中英文品牌名稱中間保留空格：破繭之聲 Underground Sound Archive；主視覺大標仍為「把音量開到／失真以外。」，不在該區重複站名。
- [x] 頁尾「資料來源與授權說明」使用 https://abiurl.me/Jc8uTl；專輯查證與封面來源連結不改。
- [x] 頁尾增加「本站由阿比丁協助架設與維護」，其中「阿比丁」連到 https://abiting.cc。
- [x] 使用者已確認 abiting/underground-sound-archive 為 GitHub 目標儲存庫；Webdev 驗證切換完成，後續保存使用該儲存庫。
- [x] 修正首頁 SSR hydration mismatch：通知 live-region 僅在 hydration 後於用戶端掛載，其餘頁面 DOM 保持一致。

## GitHub Pages 目錄與既有新增選輯
- [x] 導覽、返回目錄、專輯與文章連結使用 /underground-sound-archive/ 基底路徑；錨點定位正確，外部連結不改。
- [x] Pages 建置提供各頁初始 HTML、正確 canonical、og:url、sitemap 和真正的 404 頁；保留 Manus 預覽根目錄相容性。
- [x] Dreamshade《The Gift of Life》與 Dream Theater《Six Degrees of Inner Turbulence》有查證過的封面、年份、曲目數、聽點、完整故事導讀及來源；兩團均有有效索引頁。
- [x] 首頁專輯數量隨資料更新；已新增選輯進入專輯目錄與 sitemap。
- [x] 樂團索引納入 Dreamshade 與 Dream Theater；索引連結可進入樂團頁並列出代表專輯。
- [x] Dreamshade《The Gift of Life》與 Dream Theater《Six Degrees of Inner Turbulence》各有涵蓋發行／創作背景、曲目及聲音脈絡、聆聽線索的繁體中文故事與可核對來源。
- [x] 移除頁尾文案「扭開音量，翻開一頁」，聲明精確為「封面由資料來源提供；作品權利屬於原權利人；本站為音樂導讀與評論用途」。

## 全樂團追加知名專輯
- [x] Queen、Pink Floyd、Led Zeppelin、Nirvana、Radiohead、Black Sabbath、Iron Maiden、Metallica、Megadeth、Slipknot、Dreamshade、Dream Theater、Spitz 等 13 團各新增 1 張未收錄的知名專輯，保留先前 12 張專輯。
- [x] Green Day（依使用者 Greeeday 拼寫正規化）與 Ave Mujica 各加入 1 張專輯，含有效樂團索引與詳情頁。
- [x] 共新增 15 張專輯；各有查證過的年份、版本／曲目數、3 首代表聽點、正確封面及其來源；未捏造 MusicBrainz ID 或以其他專輯封面替代。
- [x] 每張新增專輯有 500–800 個中文字、4–6 段的原創故事，涵蓋發行／創作背景、曲目與聲音發展、作品定位及聆聽線索，至少 2 個可核對來源；中文與英文／數字間保留空格。
- [x] 27 張專輯及 16 團可從首頁目錄、搜尋、篩選和樂團頁瀏覽；公開內容具有初始 HTML、圖片 alt、title、description、分享 metadata、canonical、sitemap 與子目錄路由。
- [x] Dreamshade 指定新增專輯為《What Silence Hides》，排除無法證實的《Human》；匯入 ID 與回歸測試同步更正。

## 生物股長《笑顏》單曲導讀
- [x] 新增 2013 年生物股長單曲《笑顏》（日文原題《笑顔》）的繁體中文專題文章；說明發行資料、創作背景、編曲和電影主題曲脈絡，不把單曲誤列為專輯。
- [x] 文章有 500–800 個中文字、4–6 段原創故事，包含音樂特徵、聆聽線索與至少 2 個可核對來源。
- [x] 電影標題中的「蓋諾賽克特」連到 https://list.abitingpokedex.com/pokemon/genesect/zh。
- [x] 生物股長使用穩定 slug 加入樂團索引與詳情頁，並納入搜尋、SEO metadata、canonical、sitemap、路由清單與 Pages 子目錄。

## 統一「導讀」與「場刊」內容稱呼
- [x] 「場刊」只作為網站品牌／版面語氣，不另當成不同內容類型；首頁與樂團索引對專輯故事、專輯文章及單曲文章統一使用「導讀」稱呼。
- [x] 首頁索引與樂團詳情頁使用同一個去重後的導讀數：若專輯頁與文章頁呈現同一篇內容只算一次；獨立歌曲文章另算一次。索引顯示專輯數和導讀數，不以兩種近義稱呼重複計數。

## 補強 15 張新專輯導讀
- [x] 逐篇補強 Queen《News of the World》、Pink Floyd《Wish You Were Here》、Led Zeppelin《Led Zeppelin II》、Nirvana《In Utero》、Radiohead《Kid A》、Black Sabbath《Master of Reality》、Iron Maiden《Powerslave》、Metallica《Metallica》、Megadeth《Countdown to Extinction》、Slipknot《Vol. 3: (The Subliminal Verses)》、Dreamshade《What Silence Hides》、Dream Theater《Images and Words》、Spitz《ハチミツ》、Green Day《American Idiot》及 Ave Mujica《Completeness》的故事導讀。
- [x] 每篇補強後維持 500–800 個中文字、4–6 段，加入可核對的專輯脈絡、具體曲目／聲音分析、曲序或風格轉折與實際聆聽線索；保留各專輯已查證的 ID、年份、曲目、封面和來源，不加入來源不支持的主張。
- [x] 整合回型別化資料與網站專輯頁，確保首頁搜尋能找到正文，SEO 初始 HTML、canonical、sitemap 及子目錄路由保持同步。
