# 破繭之聲：站名與 SEO 更新

本次將既有「地下場刊」風格網站改名為「破繭之聲 Underground Sound Archive｜搖滾與金屬唱片誌」，保留已完成的 11 篇文章、10 張專輯、樂團索引、即時封面搜尋與響應式版面。

以現有 React 頁面和資料目錄建立每個路由的靜態 HTML，讓搜尋引擎與社群爬蟲不需執行 JavaScript 就能閱讀全文與路由專屬 metadata。Vite 開發預覽使用相同渲染器；生產 build 在 Node.js 中預先渲染，不依賴瀏覽器或新的伺服器／資料庫能力。保持現有用戶端互動。

每頁提供不同的 title、description、keywords、Open Graph、Twitter Card、JSON-LD 與語意化 heading；具內容的圖片使用描述性 alt，裝飾圖標不重複朗讀。品牌導覽、HTML 標題、favicon 保持一致。首頁使用完整的指定站名，不為湊 SEO 字數改寫使用者要求。

正式公開網域尚未設定。以唯一 PUBLIC_SITE_ORIGIN 設定入口產生 canonical、og:url、正式 sitemap 與可索引的 robots；未設定時省略 canonical／og:url，不把預覽網址當作正式網址，並對預覽使用 noindex 與禁止抓取的 robots。提供 sitemap 模板與正式網域設定入口，部署後需核對 gateway 實際 sitemap／robots 及缺頁 HTTP 狀態。靜態 build 產生 404.html；預覽缺頁提供真正 HTTP 404 與 noindex。平台静態深連結缺頁狀態若與預览不同，必須在正式發佈後再驗證，不能預先宣稱搜尋已收錄。

GitHub 連接仍無確認完成的轉移；不建立、不傳輸，也不更改目標。改動保存至目前的 Manus 管理版本庫，不公開發佈。

## 專案結構

- client/src/seo：品牌常數、路由專屬 metadata、HTML head 與用戶端同步元件。
- client/src/pages、components：沿用現有頁面，更新站名、語意標籤與圖片可及性。
- scripts/prerender.ts：使用 React 的 Node 渲染器輸出實際頁面 HTML 與 SEO 文件。
- server/seo.test.ts：驗證 metadata、HTML 安全與渲染結果。
- client/public：favicon、分享圖片、路由清單與 robots 文件。
- vite.config.ts：預覽時掛上同一套內容與 metadata。

## 設計沿用

保留紅、黑、米白配色和地下場刊字級；中文站名改用醒目的「破繭之聲」字標，英文副標縮小，唱片索引、區塊分隔與標誌性紅色不變。
