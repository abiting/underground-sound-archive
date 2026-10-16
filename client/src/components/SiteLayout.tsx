import { ArrowUpRight, Menu, Music2 } from "lucide-react";
import { Link } from "wouter";
import type { ReactNode } from "react";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <div className="edition-strip">
        <span>FIELD NOTES FOR LOUD LISTENERS</span>
        <span>VOL. 001　／　搖滾 × 金屬</span>
      </div>
      <header className="site-header">
        <Link href="/" className="brand-lockup" aria-label="Riff Atlas 首頁">
          <span className="brand-mark"><Music2 size={20} strokeWidth={2.8} /></span>
          <span className="brand-name">RIFF<span>//</span>ATLAS</span>
        </Link>
        <nav className="main-nav" aria-label="主要導覽">
          <a href="/#explore">專輯導讀</a>
          <a href="/#artists">樂團索引</a>
          <a href="/#api">封面搜尋</a>
        </nav>
        <a href="/#explore" className="header-cta">打開場刊 <ArrowUpRight size={16} /></a>
        <button className="mobile-menu" aria-label="開啟導覽" onClick={() => document.querySelector(".main-nav")?.classList.toggle("nav-open")}>
          <Menu size={21} />
        </button>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="footer-brand">RIFF<span>//</span>ATLAS <i>扭開音量，翻開一頁。</i></div>
        <div className="footer-copy">封面由資料來源提供；作品權利屬於原權利人。本站為音樂導讀與評論用途。</div>
        <a href="https://musicbrainz.org/" target="_blank" rel="noreferrer">資料來源與授權說明 <ArrowUpRight size={14} /></a>
      </footer>
    </div>
  );
}
