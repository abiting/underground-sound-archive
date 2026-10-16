

## Hydration 相容性

Sonner 通知 live-region 在 Node 與瀏覽器產生的初始樹不同，因此不把它放入伺服端預渲染首幀；以相同的 empty initial state 完成 hydration 後，再由 `useEffect` 掛載瀏覽器通知元件。正式內容、導覽與 SEO metadata 仍在 SSR HTML 中，避免以取消 hydration 犧牲搜尋內容與互動。
