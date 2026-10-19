# 破繭之聲：站名、SEO 與 hydration

網站名稱為「破繭之聲 Underground Sound Archive｜搖滾與金屬唱片誌」。保留地下場刊的紅、黑、米白配色，以及 13 篇文章、29 張專輯、19 個樂團索引、即時封面搜尋與響應式版面。中英文品牌之間保留空格；首頁主視覺為兩行「把音量開到」「失真以外」，第二行末尾不加句點，也不在該區塊重複站名。

## SEO 與渲染

以現有 React App 和作品目錄輸出 62 個公開路由的完整 HTML。Vite 預覽、靜態 build 與標準 build 共用渲染器，Node build 不依賴瀏覽器或新的資料庫功能。用戶端透過 hydrateRoot 保留預先渲染的內容，只有空白掛載容器才使用 createRoot。

每頁提供 route-specific title、description、keywords、Open Graph、Twitter Card、JSON-LD、語言與語意化 heading；有內容的圖片提供描述性 alt，裝飾圖示避免冗餘朗讀。分享圖採已完成的原創演出圖片和長效公開 CDN URL。預覽與標準 production server 對不存在的頁面回傳 HTTP 404 和 noindex，而不是回到首頁形成 soft 404。

正式公開網域尚未設定。以 site.config.ts 的 publicOrigin 或 PUBLIC_SITE_ORIGIN 產生 canonical、og:url、正式 sitemap 和可索引 robots；未設定時省略 canonical／og:url、預覽 noindex、robots 禁止抓取，並提供 sitemap 模板。拒絕已知暫時預覽網域、本機位址、帳密、查詢及路徑。正式發佈後需核對 gateway 的真實 sitemap、robots 與缺頁回應，不將預覽驗證誤報為搜尋收錄。

## Hydration 相容性

App 是伺服端與用戶端共用的元件樹。Sonner 通知 live-region 不輸出在初始 SSR／hydration 首幀：通知包裝元件以相同的 mounted=false 初始狀態完成 hydration，再由 useEffect 掛載通知區。這可避免通知 section 與既有 site-shell 位置不同造成 mismatch；正式內容、導覽和 SEO 仍存在初始 HTML。

## 頁尾與 GitHub

「資料來源與授權說明」連到 https://abiurl.me/Jc8uTl，原有專輯與封面查證連結維持不變。頁尾另有「本站由阿比丁協助架設與維護」，其中「阿比丁」連到 https://abiting.cc。

使用者已經由 Webdev 確認 abiting/underground-sound-archive，程式先傳送至授權暫存 remote，再經 complete 驗證切換。後續提交使用新的 GitHub origin/main；未追蹤的參考檔與機密不納入轉移。儲存庫連接不等同公開網站發佈，自動發佈設定維持關閉。

## 專案結構

- client/src/seo：品牌常數、路由 metadata、HTML head、共用 SSR 入口與用戶端同步。
- client/src/pages、components：唱片誌頁面、品牌導覽、圖片 fallback 和 hydration-safe 通知包裝。
- scripts/prerender.ts：產生靜態頁面、404、robots、sitemap 與路由清單。
- server/seoPreview.ts：Vite 預覽的初始 HTML 和 SEO 文件。
- server/_core/vite.ts：標準 production 的內容路由與 HTTP 404。
- server/seo.test.ts、staticSeo.test.ts：metadata、初始正文、指定連結及 production 深連結測試。
- client/public：favicon、分享圖片與路由清單。

## GitHub Pages 子目錄

使用者現已部署至 https://abiting.github.io/underground-sound-archive/。保留其 GitHub Actions workflow，但建置改為既有靜態預渲染流程。由 SITE_BASE_PATH 驅動 Vite、Wouter 與 SEO 的子目錄前綴，PUBLIC_SITE_ORIGIN 為 https://abiting.github.io；預覽預設仍為根目錄及 noindex。原生章節連結使用 Router 的 base，專輯／文章 Link 由 Wouter 統一產生。sitemap、canonical、JSON-LD 與頁內路由均指向同一專案目錄。現收錄 29 張專輯與 19 個樂團、32 篇唯一導讀及 62 個公開路由；去重導讀數與公開路由由資料目錄自動生成。

既有 15 張新增專輯各有 500–800 個中文字的故事導讀，涵蓋創作／發行背景、曲目結構和聆聽脈絡，並列出至少兩筆外部可核對來源。樂團索引與詳情頁使用相同的唯一導讀計數；一篇同時出現在專輯頁及文章頁的內容只計一次，獨立歌曲導讀各計一次。

## 全樂團追加選輯（2026-10-16）

既有 13 團各加一張非重複知名作品，再加入 Green Day 和 Ave Mujica。選曲以具代表性的正式錄音室專輯優先：Queen《News of the World》、Pink Floyd《Wish You Were Here》、Led Zeppelin《Led Zeppelin II》、Nirvana《In Utero》、Radiohead《Kid A》、Black Sabbath《Master of Reality》、Iron Maiden《Powerslave》、Metallica《Metallica》、Megadeth《Countdown to Extinction》、Slipknot《Vol. 3: (The Subliminal Verses)》、Dreamshade《What Silence Hides》、Dream Theater《Images and Words》、Spitz《ハチミツ》、Green Day《American Idiot》、Ave Mujica《Completeness》。各項獨立研究；每張來源、版次和曲目數由所屬研究項目查證，無可靠支援的細節不寫。這批選輯共新增 15 張，當時總計 27 張專輯、16 團和 56 個公開頁面（首頁 + 12 篇文章 + 27 個專輯頁 + 16 個樂團頁）。

新增內容放獨立 albumExpansion 資料模組，沿用 Album.listeningNotes 的長篇故事呈現而不重寫既有文章；每篇 500–800 個中文字、4–6 段，至少 2 個可靠來源。研究輸出保存為每張專輯獨立 JSON，主程式以受控腳本彙整為型別化資料，封面優先使用已核對的 Cover Art Archive，缺漏才使用經核對的官方封面來源且標示。首頁專輯目錄和站內搜尋需真的涵蓋全部新增資料，artist 索引由全目錄生成；每個新增專輯的藝人連結指向有效樂團頁。內容組合沿用 EditorialBody 和語意 heading，不插入任意 HTML。SEO 與 Pages base-path helper 仍共用現有入口，資料變更自動生成 sitemap、canonical 和路由清單。既有排版、頁尾、主視覺、品牌與 Pages workflow 不更換。

## 統一導讀內容與索引

專輯頁的 `listeningNotes` 和同一張專輯的文章頁可能呈現同一篇導讀；不可將兩者當成兩份內容相加。「場刊」保留為品牌／版面語氣，內容類型統一稱為「導讀」。藝人索引每列顯示專輯數及去重後的導讀數：連結至專輯的文章只算一次，沒有專輯關聯的單曲文章另計。首頁的文章區稱為最新導讀，保留不同路由供讀者瀏覽。

## 強化 15 張新增專輯的故事

沿用 15 個已完成的獨立研究檔與來源，逐篇改寫 `summary` 與 `listeningNotes`，不更換專輯、不改 release-group、年份、曲目數、曲目聽點、封面或來源 ID。每篇維持 500–800 個中文字、4–6 段，補足專輯發行／創作脈絡、曲序與聲音轉折、2–3 首已選聽點的具體分析，以及一段可實際採用的聆聽路徑；風格須依作品而異，不複製同一模板，無來源支持的細節不寫。由一張一位研究者使用同一輸出規格並行編輯，再由匯入器和網站測試驗證。

## 單曲導讀

加入生物股長 2013 年單曲《笑顏》（《笑顔》）的獨立文章和 artist route。把指定的「蓋諾賽克特」連結嵌在電影標題文字中；日本團名使用固定 `ikimono-gakari` slug。更新目錄、SEO、初始 HTML 和 GitHub Pages 清單，保持單曲文章與專輯型錄分離。現有文章數保持 12 篇。

## 四分衛《Deep Blue》（2026-10-17）

四分衛 2001 年專輯新增至獨立 `taiwanAlbums.ts`，由共用 catalog 聚合，避免後續追加選輯匯入器覆蓋資料。以〈雨和眼淚〉為導讀核心，另選〈魔毯〉和〈項鍊〉作為聆聽起點；500–800 個中文字的原創故事放在 `listeningNotes`，由既有頁面產生 HTML 段落與 h2，不另開重複文章頁。Apple Music、Hit FM、五大唱片和 Freshmusic 核對原始曲序；註明 12 首歌曲加隱藏演奏曲，共 13 軌。採同一專輯的 Apple artwork，明確列來源，不捏造 MusicBrainz ID。中文團名固定映射至 `quarterback`，讓索引、專輯回鏈及 SEO 使用同一個有效網址。

## Ceramic Animal《Cosmic Eraser》（2026-10-19）

將這張美國樂團的正式專輯放入獨立 `indieAlbums.ts`，由 `catalog.ts` 聚合，避免覆蓋已有專輯研究匯入器的資料。共用 ArtistPage、AlbumPage、目錄全文搜尋、去重後導讀計數和現有 SEO 預渲染器；固定 ASCII slug 為 `ceramic-animal`。網站總數更新為 29 張專輯、18 個樂團、31 篇唯一導讀、60 個公開路由。

收錄 2024 年 11 月 22 日發行、8 首歌曲、約 30 分鐘的版本；〈Eyes On You〉為第 2 首，單曲於 2024 年 8 月 23 日推出。以它為完整原創導讀核心，正文 500–800 個中文字、4–6 段，連結單曲發行、曲序位置、專輯製作背景與後續聆聽線索。從樂團 Bandcamp、官方發行說明、Apple Music、PA Times 與 Add to Wantlist 取證；主觀風格評論明確歸因評論者，不把其說法當官方類型。使用 Apple Music 同一專輯 artwork 並標示來源；MusicBrainz API 查詢回覆 503，未核實到 release-group ID 時維持空值，不猜 ID。


## My Chemical Romance〈Disenchanted〉單曲導讀（2026-10-19）

將〈Disenchanted〉作為獨立文章追加至 `articles.ts`，artist 使用 My Chemical Romance、穩定 slug 為 `my-chemical-romance`，不新增未要求的《The Black Parade》專輯目錄資料，也不設定 `albumId`。文章資料自動加入首頁、全文搜尋、藝人索引、文章與藝人靜態頁；沿用 SSR／預渲染、SEO metadata、canonical、JSON-LD、sitemap 和 GitHub Pages 子目錄設定。曲目年份與所屬版本以 Apple Music 正式目錄核實；歌意不採用粉絲推論，本文聽感明確標示為編輯詮釋。完成後總計 29 張專輯、13 篇文章、19 個樂團、32 篇唯一導讀及 62 個公開路由。
