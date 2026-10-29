# 破繭之聲：站名、SEO 與 hydration

網站名稱為「破繭之聲 Underground Sound Archive｜搖滾與金屬唱片誌」。保留地下場刊的紅、黑、米白配色，以及 65 篇文章、87 張專輯、72 個樂團索引、即時封面搜尋與響應式版面。中英文品牌之間保留空格；首頁主視覺為兩行「把音量開到」「失真以外」，第二行末尾不加句點，也不在該區塊重複站名。

## SEO 與渲染

以現有 React App 和作品目錄輸出 225 個公開路由的完整 HTML。Vite 預覽、靜態 build 與標準 build 共用渲染器，Node build 不依賴瀏覽器或新的資料庫功能。用戶端透過 hydrateRoot 保留預先渲染的內容，只有空白掛載容器才使用 createRoot。

每頁提供 route-specific title、description、keywords、Open Graph、Twitter Card、JSON-LD、語言與語意化 heading；有內容的圖片提供描述性 alt，裝飾圖示避免冗餘朗讀。分享圖採已完成的原創演出圖片和長效公開 CDN URL。預覽與標準 production server 對不存在的頁面回傳 HTTP 404 和 noindex，而不是回到首頁形成 soft 404。

正式網域為 https://chrysalismusicusa.com，由 GitHub Actions 的 PUBLIC_SITE_ORIGIN 提供給 canonical、og:url、正式 sitemap 和可索引 robots；目前 Pages 網站根路徑為 /，預覽未設定網域時仍 noindex，並提供 sitemap 模板。拒絕已知暫時預覽網域、本機位址、帳密、查詢及路徑。正式發佈後需核對 gateway 的真實 sitemap、robots 與缺頁回應，不將預覽驗證誤報為搜尋收錄。

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

## GitHub Pages 自訂網域

目前 GitHub Actions workflow 將靜態建置的 SITE_BASE_PATH 設為根路徑 /、PUBLIC_SITE_ORIGIN 設為 https://chrysalismusicusa.com。保留 GitHub Pages 與既有靜態預渲染入口，不覆蓋使用者對正式網域的設定。canonical、og:url、JSON-LD、robots、sitemap 和頁內路由均指向自訂網域根目錄。現收錄 87 張專輯與 72 個樂團、142 篇唯一導讀及 225 個公開路由；去重導讀數與公開路由由資料目錄自動生成。

專輯與文章內文皆有 500–800 個中文字的原創導讀，含可核對發行來源和具體聆聽線索。樂團索引統計相同內容跨專輯與文章路由只計一次；專輯故事與其所屬歌曲的不同導讀分開計數。

## 全樂團追加選輯（2026-10-16）

既有 13 團各加一張非重複知名作品，再加入 Green Day 和 Ave Mujica。選曲以具代表性的正式錄音室專輯優先：Queen《News of the World》、Pink Floyd《Wish You Were Here》、Led Zeppelin《Led Zeppelin II》、Nirvana《In Utero》、Radiohead《Kid A》、Black Sabbath《Master of Reality》、Iron Maiden《Powerslave》、Metallica《Metallica》、Megadeth《Countdown to Extinction》、Slipknot《Vol. 3: (The Subliminal Verses)》、Dreamshade《What Silence Hides》、Dream Theater《Images and Words》、Spitz《ハチミツ》、Green Day《American Idiot》、Ave Mujica《Completeness》。各項獨立研究；每張來源、版次和曲目數由所屬研究項目查證，無可靠支援的細節不寫。這批選輯共新增 15 張，當時總計 27 張專輯、16 團和 56 個公開頁面（首頁 + 12 篇文章 + 27 個專輯頁 + 16 個樂團頁）。

新增內容放獨立 albumExpansion 資料模組，沿用 Album.listeningNotes 的長篇故事呈現而不重寫既有文章；每篇 500–800 個中文字、4–6 段，至少 2 個可靠來源。研究輸出保存為每張專輯獨立 JSON，主程式以受控腳本彙整為型別化資料，封面優先使用已核對的 Cover Art Archive，缺漏才使用經核對的官方封面來源且標示。首頁專輯目錄和站內搜尋需真的涵蓋全部新增資料，artist 索引由全目錄生成；每個新增專輯的藝人連結指向有效樂團頁。內容組合沿用 EditorialBody 和語意 heading，不插入任意 HTML。SEO 與 Pages base-path helper 仍共用現有入口，資料變更自動生成 sitemap、canonical 和路由清單。既有排版、頁尾、主視覺、品牌與 Pages workflow 不更換。

## 統一導讀內容與索引

專輯頁的 `listeningNotes` 和同一張專輯的文章頁可能呈現同一篇導讀；不可將兩者當成兩份內容相加。「場刊」保留為品牌／版面語氣，內容類型統一稱為「導讀」。藝人索引每列顯示專輯數及去重後的導讀數：連結至專輯的文章只算一次，沒有專輯關聯的單曲文章另計。首頁的文章區稱為最新導讀，保留不同路由供讀者瀏覽。

## 強化 15 張新增專輯的故事

沿用 15 個已完成的獨立研究檔與來源，逐篇改寫 `summary` 與 `listeningNotes`，不更換專輯、不改 release-group、年份、曲目數、曲目聽點、封面或來源 ID。每篇維持 500–800 個中文字、4–6 段，補足專輯發行／創作脈絡、曲序與聲音轉折、2–3 首已選聽點的具體分析，以及一段可實際採用的聆聽路徑；風格須依作品而異，不複製同一模板，無來源支持的細節不寫。由一張一位研究者使用同一輸出規格並行編輯，再由匯入器和網站測試驗證。

## 單曲導讀

加入生物股長 2013 年單曲《笑顏》（《笑顔》）的獨立文章和 artist route。把指定的「蓋諾賽克特」連結嵌在電影標題文字中；日本團名使用固定 `ikimono-gakari` slug。更新目錄、SEO、初始 HTML 和 GitHub Pages 清單，保持單曲文章與專輯型錄分離；當時已有 12 篇文章，後續篇數以本計畫開頭的目前總數為準。

## 四分衛《Deep Blue》（2026-10-17）

四分衛 2001 年專輯新增至獨立 `taiwanAlbums.ts`，由共用 catalog 聚合，避免後續追加選輯匯入器覆蓋資料。以〈雨和眼淚〉為導讀核心，另選〈魔毯〉和〈項鍊〉作為聆聽起點；500–800 個中文字的原創故事放在 `listeningNotes`，由既有頁面產生 HTML 段落與 h2，不另開重複文章頁。Apple Music、Hit FM、五大唱片和 Freshmusic 核對原始曲序；註明 12 首歌曲加隱藏演奏曲，共 13 軌。採同一專輯的 Apple artwork，明確列來源，不捏造 MusicBrainz ID。中文團名固定映射至 `quarterback`，讓索引、專輯回鏈及 SEO 使用同一個有效網址。

## Ceramic Animal《Cosmic Eraser》（2026-10-19）

將這張美國樂團的正式專輯放入獨立 `indieAlbums.ts`，由 `catalog.ts` 聚合，避免覆蓋已有專輯研究匯入器的資料。共用 ArtistPage、AlbumPage、目錄全文搜尋、去重後導讀計數和現有 SEO 預渲染器；固定 ASCII slug 為 `ceramic-animal`。網站總數更新為 29 張專輯、18 個樂團、31 篇唯一導讀、60 個公開路由。

收錄 2024 年 11 月 22 日發行、8 首歌曲、約 30 分鐘的版本；〈Eyes On You〉為第 2 首，單曲於 2024 年 8 月 23 日推出。以它為完整原創導讀核心，正文 500–800 個中文字、4–6 段，連結單曲發行、曲序位置、專輯製作背景與後續聆聽線索。從樂團 Bandcamp、官方發行說明、Apple Music、PA Times 與 Add to Wantlist 取證；主觀風格評論明確歸因評論者，不把其說法當官方類型。使用 Apple Music 同一專輯 artwork 並標示來源；MusicBrainz API 查詢回覆 503，未核實到 release-group ID 時維持空值，不猜 ID。


## My Chemical Romance〈Disenchanted〉單曲導讀（2026-10-19）

將〈Disenchanted〉作為獨立文章追加至 `articles.ts`，artist 使用 My Chemical Romance、穩定 slug 為 `my-chemical-romance`，不新增未要求的《The Black Parade》專輯目錄資料，也不設定 `albumId`。文章資料自動加入首頁、全文搜尋、藝人索引、文章與藝人靜態頁；沿用 SSR／預渲染、SEO metadata、canonical、JSON-LD、sitemap 和 GitHub Pages 子目錄設定。曲目年份與所屬版本以 Apple Music 正式目錄核實；歌意不採用粉絲推論，本文聽感明確標示為編輯詮釋。完成後總計 29 張專輯、13 篇文章、19 個樂團、32 篇唯一導讀及 62 個公開路由。
## My Chemical Romance《The Black Parade》（2026-10-21）

將 2006 年標準版收進獨立 `indieAlbums.ts`，沿用 catalog 聚合、ArtistPage、AlbumPage、全文搜尋、去重導讀計數與既有 SEO 靜態預渲染器。以 Apple Music 公開正式 artwork URL 作封面並標示來源；Apple 美國目錄的 600×600 圖已核對可用。使用 My Chemical Romance 官方 Warner Records 商店的 14 軌標準 CD 曲目表，明確把末軌〈Blood〉列為隱藏曲，不混計 Deluxe 或 20 週年版加收曲；無法確認的 MusicBrainz release-group ID 保持空值。

新增一篇 500–800 個中文字、4–6 段的完整專輯故事，將 Apple Music 發行／曲序資料、Alternative Press 2006 專訪及 Guardian 同期評論與本文聆聽觀察分開表述。專輯導讀使用獨立 `listeningNotes`，保留〈Disenchanted〉單曲文章為不同內容、不以 `articleId`／`albumId` 誤作同一篇；MCR 藝人頁呈現一張專輯及兩篇不同導讀。更新後網站共 30 張專輯、19 個樂團、33 篇唯一導讀及 63 個公開路由。

## 小男孩樂團〈轉身以後〉與《第三個願望》（2026-10-25）

將小男孩樂團（Men Envy Children）〈轉身以後〉歌篇掛接到 2019 年標準版《第三個願望 The 3rd Wish》，而非把歌曲誤當同名單曲專輯。標準版 10 首、36 分鐘；〈轉身以後〉第 4 首、3 分 54 秒。由 Apple Music、滾石唱片商品資料、Hit FM 和滾石官方 MV 核實版本、曲序、署名與歌曲說明；封面沿用已驗證的 Apple Music 600×600 artwork 並標來源，不捏造 MusicBrainz ID。

歌曲導讀與專輯故事是兩篇各 500–800 個中文字、4–6 段的不同內容。歌曲文章連結專輯頁，專輯頁列出相關歌曲導讀；導讀計數只合併同一篇專輯文章，不合併獨立歌曲故事與該專輯的獨立 listeningNotes。使用既有 ArtistPage、ArticlePage、AlbumPage、站內搜尋、繁中樂團 slug 映射與 SEO 靜態渲染。完成後共 31 張專輯、14 篇文章、20 個樂團、35 篇唯一導讀與 66 個公開路由。


## 50 個新樂團選輯與 DEEN〈君がいない夏〉（2026-10-26）

本次新增 50 個既有目錄未收錄且彼此不同的樂團，各一張專輯頁與一首所屬歌曲導讀；再為 DEEN 新增《SINGLES +1》專輯頁及〈君がいない夏〉歌曲文章，故合計 51 張專輯、51 首歌篇。候選清單保存於 `.research/batch51-candidates.json`，前 50 團排除現有 20 團，DEEN 為第 51 團；候選涵蓋經典／硬式／前衛搖滾、後龐克、另類／油漬搖滾、重金屬與日本搖滾。候選曲目與年份僅為研究方向，正式值以研究時實際閱讀的多個來源為準；《SINGLES +1》須辨識為精選合輯，不誤稱錄音室原創專輯。這次明確的 51 首批次需求優先於平日每日五篇偏好，不另外建立排程。

以同一工作流逐項分派，每個專輯及其指定歌曲由一位独立研究者負責，採隔離瀏覽器，傳回相同型別化結構及每一主張的來源筆記。每組需核對原始發行年份、採用版次及全曲數、指定歌曲隸屬與曲序、可核實的創作／製作背景和準確方形封面。至少閱讀兩個可靠 HTTPS 來源，其中包含官方／唱片公司／正式串流目錄；背景另參考可靠媒體訪談或評論。不得以搜尋片段、粉絲論壇、維基百科單一來源直接生成故事；不猜 MusicBrainz ID、不引用歌詞、不把主觀歌意當唯一事實。真實封面以搜尋找到並視覺核對的官方 artwork 或已核實 Cover Art Archive 為準，保留来源與原權利人聲明。

每張專輯有獨立 500–800 個中文字、4–6 段完整介紹；歌曲另有同規格獨立導讀，使用自然中長尾標題、摘要及關鍵字、繁體中文、全形括號與中英數字間隔。正文沿用純文字與既有安全連結解析，不插入 Markdown 標題或粗體。DEEN 歌曲文章必須核實並明確寫出〈君がいない夏〉是《名偵探柯南》第 71 集 ～ 第 83 集片尾曲，將這段關聯文字連到 https://coai.abiting.cc 。

主代理以受控匯入腳本將已完成研究聚合為獨立 `batch51Albums.ts`、`batch51Articles.ts`，由 `catalog.ts` 和 `articles.ts` 接入，不改寫原有唱片資料。51 首歌曲文章以 `albumId` 指向各自所屬專輯，專輯不設定 `articleId`，讓專輯故事與歌曲文章各自計數；既有 ArticlePage／AlbumPage 回鏈與封面顯示沿用。新樂團 slug 與英文／繁中文搜索別名一致，Motörhead 等非 ASCII 藝名用明確穩定映射。本次完成並核對共 82 張專輯、65 篇文章、71 個樂團、137 篇唯一導讀及 219 個公開路由。沿用 https://chrysalismusicusa.com 根路徑、GitHub Actions 和既有 SSR 靜態預渲染，同步每頁 metadata、canonical、JSON-LD、manifest、sitemap、robots 及 noindex 404；在共用 `client/index.html` head 放置使用者提供的 Ahrefs async script，所有靜態頁只出現一次，發布後核對 data-key 與外部腳本回應；不要更換品牌或網站設計。保留所有歷史未追蹤研究與參考檔；只提交此次必要資料、程式、測試、計畫與待辦。

## 五張追加選輯（2026-10-29）

針對使用者給定的四分衛、MyGO!!!!!、Ave Mujica、Linkin Park 與史密斯飛船各選一張目錄未收錄作品。四分衛排除《Deep Blue》，Ave Mujica 排除《Completeness》，Linkin Park 排除《Hybrid Theory》，史密斯飛船沿用 Aerosmith 團頁並排除《Toys in the Attic》，另新增 MyGO!!!!! 團頁。每項由一位隔離研究者核對適當非重複選輯、版本、官方目錄、可靠背景與真實封面，回傳相同結構；總計五篇專輯導讀而不擴增為十篇歌曲／專輯故事。

以獨立 `october29Albums.ts` 接入共用 catalog，導讀存 `listeningNotes`，每篇 500–800 個中文字、4–6 段，至少兩個已讀 HTTPS 來源且區分史實和聆聽觀察。不設 articleId、不重寫歷史目錄，既有 AlbumPage 和 ArtistPage 直接呈現。新增 `mygo` 固定 slug 與史密斯飛船／Aerosmith 搜尋別名，共用全文搜尋、索引、SSR、metadata、root path helpers，manifest 和 sitemap 從 getPublicPaths 重生。目前完成並核對共 87 張專輯、65 篇文章、72 個樂團、142 篇唯一導讀及 225 個公開路由；沿用 GitHub Pages、正式網域、Ahrefs 與既有視覺。

本批實際選入四分衛《起來》（1999，14 軌）、MyGO!!!!!《迷跡波》（2023，13 軌）、Ave Mujica《ELEMENTS》（2024，5 軌迷你專輯）、Linkin Park《Meteora》（2003，13 軌）與 Aerosmith《Rocks》（1976，9 軌）。《ELEMENTS》取正式五首音訊版，影像內容另計；其餘以各自標準曲序為準。每篇核實為 507–664 個漢字，4–5 段，來源證據保存於本次研究資料，封面採相符的 Apple 官方 artwork CDN。
