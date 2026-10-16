import { ArrowUpRight, Menu, Music2 } from "lucide-react";
import { Link } from "wouter";
import type { ReactNode } from "react";
import { SITE_NAME, BRAND_NAME, ENGLISH_NAME } from "../seo/metadata";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <div className="edition-strip">
        <span>FIELD NOTES FOR LOUD LISTENERS</span>
        <span>VOL. 001　／　搖滾 × 金屬</span>
      </div>
      <header className="site-header">
        <Link href="/" className="brand-lockup" aria-label={`${SITE_NAME} 首頁`} title={SITE_NAME}>
          <span className="brand-mark" aria-hidden="true"><Music2 size={20} strokeWidth={2.8} /></span>
          <span className="brand-name"><strong>{BRAND_NAME}</strong>{" "}<small>{ENGLISH_NAME}</small></span>
        </Link>
        <nav className="main-nav" aria-label="主要導覽">
          <a href="/#explore" title="探索搖滾與金屬專輯導讀">專輯導讀</a>
          <a href="/#artists" title="搖滾與金屬樂團索引">樂團索引</a>
          <a href="/#api" title="依樂團或專輯名稱搜尋唱片封面">封面搜尋</a>
        </nav>
        <a href="/#explore" className="header-cta">打開場刊 <ArrowUpRight size={16} aria-hidden="true" /></a>
        <button className="mobile-menu" aria-label="切換主要導覽選單" onClick={() => document.querySelector(".main-nav")?.classList.toggle("nav-open")}>
          <Menu size={21} aria-hidden="true" />
        </button>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div className="footer-brand">{BRAND_NAME}{" "}<small>{ENGLISH_NAME}</small><i>扭開音量，翻開一頁。</i></div>
        <div className="footer-copy">封面由資料來源提供；作品權利屬於原權利人。本站為音樂導讀與評論用途。</div>
        <a href="https://abiurl.me/Jc8uTl" target="_blank" rel="noreferrer">資料來源與授權說明 <ArrowUpRight size={14} aria-hidden="true" /></a>
        <p className="footer-maintenance">本站由<a href="https://abiting.cc" target="_blank" rel="noopener noreferrer">阿比丁</a>協助架設與維護</p>
      </footer>
    </div>
  );
}
