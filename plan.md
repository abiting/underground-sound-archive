# 破繭之聲：站名、SEO 與 hydration

網站名稱為「破繭之聲 Underground Sound Archive｜搖滾與金屬唱片誌」。保留地下場刊的紅、黑、米白配色，以及 11 篇文章、12 張專輯、樂團索引、即時封面搜尋與響應式版面。中英文品牌之間保留空格；首頁主視覺仍為「把音量開到／失真以外。」，不在該區塊重複站名。

## SEO 與渲染

以現有 React App 和作品目錄輸出 35 個公開路由的完整 HTML。Vite 預覽、靜態 build 與標準 build 共用渲染器，Node build 不依賴瀏覽器或新的資料庫功能。用戶端透過 hydrateRoot 保留預先渲染的內容，只有空白掛載容器才使用 createRoot。

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

使用者現已部署至 https://abiting.github.io/underground-sound-archive/。保留其 GitHub Actions workflow，但建置改為既有靜態預渲染流程。由 SITE_BASE_PATH 驅動 Vite、Wouter 與 SEO 的子目錄前綴，PUBLIC_SITE_ORIGIN 為 https://abiting.github.io；預覽預設仍為根目錄及 noindex。原生章節連結使用 Router 的 base，專輯／文章 Link 由 Wouter 統一產生。sitemap、canonical、JSON-LD 與頁內路由均指向同一專案目錄。新增兩張唱片以簡短選輯筆記展示，不擅自新增長篇文章或不存在的樂團介紹頁。
