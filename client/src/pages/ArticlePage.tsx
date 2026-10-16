import { ArrowLeft, ArrowUpRight, BookOpen, CalendarDays } from "lucide-react";
import { Link } from "wouter";
import EditorialBody from "../components/EditorialBody";
import SiteLayout from "../components/SiteLayout";
import { Score } from "../components/Cards";
import SafeCover from "../components/SafeCover";
import { albums, articles } from "../data/catalog";

export default function ArticlePage({ slug }: { slug: string }) {
  const article = articles.find((item) => item.slug === slug);
  if (!article) return <SiteLayout><div className="not-found-page"><h1>找不到這篇場刊</h1><Link href="/">回到首頁 <ArrowUpRight size={15} /></Link></div></SiteLayout>;
  const album = albums.find((item) => item.id === article.albumId);

  return (
    <SiteLayout>
      <div className="detail-page">
        <div className="detail-topline"><Link href="/"><ArrowLeft size={15} /> 回到場刊目錄</Link><span>READING ROOM / {article.category}</span></div>
        <header className="article-detail-hero">
          <div className="article-detail-copy">
            <div className="article-meta-row"><span className="category-pill">{article.category}</span><span><CalendarDays size={14} /> {article.year}</span><Score value={article.score} /></div>
            <p className="section-kicker">FIELD NOTE / {article.artist.toLocaleUpperCase()}</p>
            <h1>{article.title}</h1>
            <p className="article-lede">{article.summary}</p>
            <div className="article-tag-row">{article.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
            {album && <Link className="button-red article-album-button" href={`/album/${album.id}`}>打開專輯評論 <ArrowUpRight size={15} /></Link>}
          </div>
          <div className="article-detail-cover">
            {album ? <SafeCover src={album.coverUrl} alt={`${album.artist}《${album.title}》專輯封面`} /> : <div className="cover-fallback cover-fallback-large"><span>RIFF<br />NOTES</span></div>}
            {album && <a href={album.coverSourceUrl} target="_blank" rel="noreferrer">封面來源：{album.coverSource} <ArrowUpRight size={13} /></a>}
          </div>
        </header>
        <div className="article-body-layout">
          <aside className="article-side-note"><BookOpen size={17} /><span>FIELD NOTES</span><p>一張唱片，不只是一個年代。沿著聲音的線索，慢慢讀。</p><Link href={`/artist/${article.artist.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}>更多 {article.artist} <ArrowUpRight size={13} /></Link></aside>
          <article className="prose-panel">
            <EditorialBody content={article.body} />
            <div className="article-sources">
              <h2>查證與延伸</h2>
              <p>本文為原創導讀；基本資料與脈絡參考以下來源。</p>
              {article.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.name}<ArrowUpRight size={13} /></a>)}
              {album && <a href={album.musicbrainzUrl} target="_blank" rel="noreferrer">專輯資料：MusicBrainz<ArrowUpRight size={13} /></a>}
              {album && <a href={album.coverSourceUrl} target="_blank" rel="noreferrer">封面來源：Cover Art Archive<ArrowUpRight size={13} /></a>}
              {album && <a href={album.storeUrl} target="_blank" rel="noreferrer">在 Apple Music 查看作品<ArrowUpRight size={13} /></a>}
            </div>
          </article>
        </div>
      </div>
    </SiteLayout>
  );
}
