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
- [x] 首頁、65 篇文章、72 個樂團頁及 87 張專輯頁的主要內容與 metadata 直接存在初始 HTML 中，並保留搜尋、篩選與用戶端導覽。
- [x] 不臆造正式網域。canonical、og:url、正式 sitemap 經公開網域設定產生；預覽未設定正式網域時 noindex，提供 robots 與 sitemap，錯誤頁 noindex 並回傳 HTTP 404。
- [x] SEO 更新以型別、建置、raw HTML 和 metadata 測試驗證；不把預覽檢查誤報為搜尋引擎收錄。
- [x] 中英文品牌名稱中間保留空格：破繭之聲 Underground Sound Archive；主視覺大標為兩行「把音量開到」「失真以外」，第二行末尾不加句點，且不在該區重複站名。
- [x] 頁尾「資料來源與授權說明」使用 https://abiurl.me/Jc8uTl；專輯查證與封面來源連結不改。
- [x] 頁尾增加「本站由阿比丁協助架設與維護」，其中「阿比丁」連到 https://abiting.cc。
- [x] 使用者已確認 abiting/underground-sound-archive 為 GitHub 目標儲存庫；Webdev 驗證切換完成，後續保存使用該儲存庫。
- [x] 修正首頁 SSR hydration mismatch：通知 live-region 僅在 hydration 後於用戶端掛載，其餘頁面 DOM 保持一致。

## GitHub Pages 目錄與既有新增選輯
- [x] Pages 保留歷史 /underground-sound-archive/ 子目錄支援，也驗證目前 https://chrysalismusicusa.com 根路徑正式部署；站內錨點和外部連結定位正確。
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

## 四分衛《Deep Blue》與〈雨和眼淚〉
- [x] 新增四分衛 2001 年專輯《Deep Blue》，〈雨和眼淚〉為主要聆聽起點；專輯共 13 軌，註明 12 首歌曲加末尾隱藏演奏曲的版本計數，保留正確封面和作品來源。
- [x] 有 500–800 個中文字、4–6 段的原創完整專輯導讀，包含發行背景、〈雨和眼淚〉／〈魔毯〉／〈項鍊〉的音樂與曲序脈絡、實際聆聽線索及至少 2 個可核對來源。
- [x] 四分衛使用穩定 /artist/quarterback/ 樂團頁；專輯、樂團索引、全文搜尋、分類、導讀去重計數、SEO 初始 HTML、canonical 與 sitemap 同步更新，維持 Pages 子目錄和首頁標語無句點。

## Ceramic Animal《Cosmic Eraser》與〈Eyes On You〉
- [x] 新增 Ceramic Animal《Cosmic Eraser》專輯頁與樂團頁；〈Eyes On You〉是主要聆聽起點，並標示它是專輯第 2 首、3 分 33 秒，且先於專輯發行成為單曲。
- [x] 完整導讀為 500–800 個中文字、4–6 段原創內容，涵蓋專輯創作／錄製脈絡、〈Eyes On You〉在曲序中的位置、可核對的聲音風格背景和具體聆聽路徑；不得杜撰歌詞意義或未有來源的音色細節。
- [x] 正確顯示 2024 年 11 月 22 日發行、8 首曲目、約 30 分鐘及曲序；保留同一作品的 Apple Music 封面並清楚標示來源，不捏造 MusicBrainz ID。
- [x] 專輯與樂團加入首頁索引、全文搜尋、搖滾／迷幻曲風分類、去重導讀篇數、路由清單、初始 HTML、SEO metadata、canonical 和 sitemap，沿用 GitHub Pages 專案目錄。

## My Chemical Romance〈Disenchanted〉歌曲導讀
- [x] 新增 My Chemical Romance（MCR）〈Disenchanted〉獨立歌曲導讀，核實 2006 年《The Black Parade》收錄曲身分與曲序；不宣稱它曾獨立發行為商業單曲，不新增未要求的專輯目錄頁或 albumId。
- [x] 正文為 500–800 個中文字、4–6 段原創內容，涵蓋作品背景、聲音動態、曲序對照與實際聆聽線索；至少 2 個已閱讀的 HTTPS 來源，區分可靠資料和本文詮釋，不把粉絲解讀寫成唯一歌意，不引用歌詞。
- [x] 新文章可由首頁、全文搜尋（MCR／Disenchanted／正文）與 My Chemical Romance 樂團索引找到；文章和 artist route 具完整初始 HTML、route-specific metadata、canonical、JSON-LD、sitemap 及 GitHub Pages 子目錄連結，路由清單同步成 63 條，維持 30 張專輯、19 團及 33 篇唯一導讀。


## My Chemical Romance《The Black Parade》專輯補入
- [x] 新增 My Chemical Romance 2006 年《The Black Parade》標準版專輯資料，使用 14 軌 CD 版本並註明第 14 軌〈Blood〉是隱藏曲；不混入豪華版或 20 週年版加收曲目，沒有查證的 MusicBrainz ID 留空。
- [x] 撰寫 500–800 個中文字、4–6 段的原創完整專輯導讀，涵蓋 Patient 專輯概念、曲序與具體聆聽路徑；以已讀至少 2 個 HTTPS 來源支撐可核對事實，明確區分評論者觀點和本文聽感，不把專輯概念套成每首歌唯一歌意、不引用歌詞。
- [x] 使用 Apple Music 正式方形 artwork 並標示封面來源；專輯頁、MCR 藝人索引、首頁、搜尋、年代／類型篩選、SEO 初始 HTML、canonical、JSON-LD、sitemap 及路由 manifest 同步。保留〈Disenchanted〉獨立單曲導讀，專輯故事另計為一篇；全站更新為 30 張專輯、19 個樂團、33 篇唯一導讀、63 個公開路由。

## 小男孩樂團〈轉身以後〉與《第三個願望》
- [x] 新增小男孩樂團〈轉身以後〉歌曲導讀及所屬《第三個願望 The 3rd Wish》獨立專輯介紹；使用 2019 年 6 月 12 日標準版的 10 首曲序，明確標示歌曲是第 4 首、3 分 54 秒，專輯約 36 分鐘；不混算 11 首分享典藏版加收曲。
- [x] 歌曲文章與專輯故事各自為 500–800 個中文字、4–6 段的原創內容，各列至少 2 個已讀 HTTPS 來源；採滾石唱片官方 MV、Apple Music、Hit FM 及滾石商品資料核實歌曲發行、曲序、歌曲合作與編曲背景。清楚區分唱片公司對歌曲的描述與本刊聆聽詮釋，不引用歌詞、不臆測真實戀情、不捏造 MusicBrainz ID；使用 Apple Music 同張專輯的方形 artwork，標明封面來源。
- [x] 歌曲文章連到所屬專輯，專輯頁回連歌曲導讀，兩篇不同故事分開計入小男孩樂團導讀數；站內搜尋可依團名、歌曲、專輯與正文找到內容，繁中團名使用穩定小男孩樂團頁 slug。更新首頁索引、類型／年代、初始 SSR HTML、metadata、canonical、JSON-LD、sitemap 和 manifest；正式網域沿用 https://chrysalismusicusa.com 與根路徑 /，完成後為 31 張專輯、14 篇文章、20 個樂團、35 篇唯一導讀及 66 個公開路由。


## 50 個未收錄樂團專輯與 DEEN《Singles +1》，共 51 首（2026-10-26）
- [x] 在仔細研究後新增 50 張專輯，所屬樂團未曾出現在網站且彼此互異，各有一篇所屬歌曲的獨立導讀；另外新增 DEEN《SINGLES +1》專輯介紹及〈君がいない夏〉歌曲導讀，總共 51 張專輯頁與 51 首歌曲導讀。DEEN 精選合輯不誤稱為錄音室原創專輯，原始曲序與再版／豪華版差異分清楚。
- [x] 每張專輯介紹與每首歌曲導讀各為 500–800 個中文字、4–6 段原創內容，使用繁體中文、全形括號、中英數字間隔與自然中長尾關鍵字；正文不插入 Markdown 標題／粗體，不引用歌詞，創作史實和評論／聽感清楚分開，不杜撰唯一歌意、錄音細節或 MusicBrainz ID。本次依明確 51 首指示批次處理，不套用平日每日五篇限制。
- [x] 每組內容至少有兩個已實際閱讀的可靠 HTTPS 來源，含官方／唱片公司／正式串流目錄及可支持背景的可靠媒體。核實版次、年份、全曲數、所選歌隸屬及曲序；使用同一專輯的準確方形真實封面，明確標來源及權利，不拿其他作品封面替代，不依賴搜尋片段或粉絲推論寫作。
- [x] 〈君がいない夏〉特別說明是《名偵探柯南》第 71 集 ～ 第 83 集片尾曲，核對此關聯並把「《名偵探柯南》第 71 集 ～ 第 83 集片尾曲」超連結至 https://coai.abiting.cc 。
- [x] 51 篇歌曲文章和各自專輯頁互相連結；專輯長文和歌曲導讀分開計數。完整加入樂團索引、首頁、團名／專輯／歌名／正文搜尋及類型年代篩選。Motörhead 等名稱使用穩定 slug，所有新增頁初始 HTML 含完整內容與來源、圖片 alt、metadata、canonical、JSON-LD；manifest 與 sitemap 全同步，沿用 https://chrysalismusicusa.com 根路徑與既有 GitHub Pages。完整新增後為 82 張專輯、65 篇文章、71 團、137 篇唯一導讀及 219 條公開路由；保留既有內容、品牌、舊路徑相容與真正 404。
- [x] 將使用者提供的 Ahrefs analytics `<script>` 放在共用 HTML `<head>`，讓全部預渲染頁只載入一次；正式發布後確認頁面原始 HTML 含精確 src、data-key、async，並確認 analytics.ahrefs.com 腳本 URL 可取得正常 HTTP 回應。

## 五張追加選輯（2026-10-29）
- [x] 仔細研究後再增加五張專輯：四分衛再一張、新增 MyGO!!!!! 一張、Ave Mujica 再一張、Linkin Park 再一張、史密斯飛船（Aerosmith）一張。五張均不與原目錄重複；史密斯飛船沿用既有 Aerosmith 索引而不另建同一樂團，加入中文搜尋別名。
- [x] 每張各有一篇 500–800 個中文字、4–6 段的完整繁中原創專輯導讀，含作品背景、曲序與具體聆聽路徑。正文不含 Markdown 標題／粗體，不引用歌詞，不把詮釋當唯一歌意；各附至少兩個實際閱讀的可靠 HTTPS 來源，含官方／唱片公司／正式串流目錄，核對年份、採用版次、全曲數及代表歌曲。EP／迷你專輯如採用，需明確標示，不混算影像、豪華版與再版加收內容。
- [x] 五張使用各自準確的真實方形封面，標明來源與權利，不捏造 MusicBrainz ID。保留既有資料與設計；新作品可經首頁、全文搜尋、類型／年代及樂團索引找到，MyGO!!!!! 使用穩定 mygo slug。專輯頁初始 HTML 有全文與來源，含 alt、metadata、canonical、JSON-LD，完整同步 route manifest、sitemap 與正式 chrysalismusicusa.com 根路徑；維持 Ahrefs script、舊路徑相容及真正 noindex 404。預期 87 張專輯、65 篇文章、72 團、142 篇唯一導讀與 225 條公開路由。
