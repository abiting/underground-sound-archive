import { ArrowLeft, ArrowUpRight, Headphones, Orbit } from "lucide-react";
import { Link } from "wouter";
import SiteLayout from "../components/SiteLayout";
import { AlbumCard, ArticleCard } from "../components/Cards";
import { albums, articles } from "../data/catalog";

function slugify(value: string) {
  return value.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function ArtistPage({ slug }: { slug: string }) {
  const related = articles.filter((article) => slugify(article.artist) === slug);
  const artistName = related[0]?.artist;
  if (!artistName) return <SiteLayout><div className="not-found-page"><h1>找不到這支樂團</h1><a href="/#artists">回到樂團索引 <ArrowUpRight size={15} /></a></div></SiteLayout>;
  const records = albums.filter((album) => album.artist === artistName);
  const profile = related[0];
  const styleTags = Array.from(new Set(related.flatMap((article) => article.tags)));

  return (
    <SiteLayout>
      <div className="detail-page artist-page">
        <div className="detail-topline"><a href="/#artists"><ArrowLeft size={15} /> 回到樂團索引</a><span>ARTIST FILE / {profile.category}</span></div>
        <section className="artist-hero">
          <div className="artist-hero-copy"><p className="section-kicker">BAND FILE / {String(records.length || 1).padStart(2, "0")}</p><span className="category-pill">{profile.category}</span><h1>{artistName}</h1><p>{profile.summary}</p><div className="article-tag-row">{styleTags.slice(0, 5).map((tag) => <span key={tag}>#{tag}</span>)}</div></div>
          <div className="artist-hero-art"><Orbit size={56} strokeWidth={1.1} /><span>LOUD<br />ARCHIVE</span><b>{String(related.length).padStart(2, "0")}</b></div>
        </section>
        <section className="artist-context">
          <div className="artist-context-label"><Headphones size={18} /><span>背景與風格</span></div>
          <div><p>{profile.body.split("\n\n")[0]}</p><p className="artist-context-note">這份場刊檔案由專輯導讀與可核對的發行資料整理；分類提供探索方向，不取代樂團多變的作品脈絡。</p></div>
        </section>
        {records.length > 0 && <section className="section-block detail-section"><div className="section-heading"><div><p className="section-kicker">REPRESENTATIVE RECORDS</p><h2>代表專輯</h2></div><span className="section-note">封面來源附於每張唱片頁。</span></div><div className="album-grid">{records.map((album) => <AlbumCard key={album.id} album={album} />)}</div></section>}
        <section className="section-block detail-section"><div className="section-heading"><div><p className="section-kicker">RELATED NOTES</p><h2>相關場刊</h2></div></div><div className="article-grid">{related.map((article, index) => <ArticleCard key={article.id} article={article} index={index} />)}</div></section>
      </div>
    </SiteLayout>
  );
}
