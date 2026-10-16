import { withBasePath } from "../lib/sitePaths";
import { ArrowLeft, ArrowUpRight, Headphones, Orbit } from "lucide-react";
import { Link, useRouter } from "wouter";
import SiteLayout from "../components/SiteLayout";
import { AlbumCard, ArticleCard } from "../components/Cards";
import { albums, articles } from "../data/catalog";

function slugify(value: string) {
  return value.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function ArtistPage({ slug }: { slug: string }) {
  const { base } = useRouter();
  const related = articles.filter((article) => slugify(article.artist) === slug);
  const records = albums.filter((album) => slugify(album.artist) === slug);
  const profile = related[0];
  const artistName = profile?.artist ?? records[0]?.artist;
  if (!artistName) {
    return <SiteLayout><div className="not-found-page"><h1>找不到這支樂團</h1><a href={withBasePath("/#artists", base)}>回到樂團索引 <ArrowUpRight size={15} /></a></div></SiteLayout>;
  }

  const category = profile?.category ?? records[0]?.genre ?? "搖滾／金屬";
  const summary = profile?.summary ?? records[0]?.summary ?? `破繭之聲目前收錄 ${artistName} 的 ${records.length} 張專輯。從代表作品開始，查看曲目重點、封面來源與完整發行資料。`;
  const background = profile?.body.split("\n\n")[0] ?? records[0]?.listeningNotes?.split("\n\n")[0] ?? `目前索引收錄 ${artistName} 的《${records[0]?.title}》（${records[0]?.year}）。這張專輯的詳情頁整理了曲目數、代表聽點和封面來源；後續新增唱片也會由這份樂團索引串起來。`;
  const styleTags = Array.from(new Set(related.flatMap((article) => article.tags)));
  const tags = styleTags.length ? styleTags : [category, "代表專輯"];

  return (
    <SiteLayout>
      <div className="detail-page artist-page">
        <div className="detail-topline"><a href={withBasePath("/#artists", base)}><ArrowLeft size={15} /> 回到樂團索引</a><span>ARTIST FILE / {category}</span></div>
        <section className="artist-hero">
          <div className="artist-hero-copy"><p className="section-kicker">BAND FILE / {String(related.length || records.length).padStart(2, "0")}</p><span className="category-pill">{category}</span><h1>{artistName}</h1><p>{summary}</p><div className="article-tag-row">{tags.slice(0, 5).map((tag) => <span key={tag}>#{tag}</span>)}</div></div>
          <div className="artist-hero-art"><Orbit size={56} strokeWidth={1.1} /><span>LOUD<br />ARCHIVE</span><b>{String(related.length || records.length).padStart(2, "0")}</b></div>
        </section>
        <section className="artist-context">
          <div className="artist-context-label"><Headphones size={18} /><span>背景與風格</span></div>
          <div><p>{background}</p><p className="artist-context-note">這份場刊檔案由專輯資料與已刊出的導讀整理；分類提供探索方向，不取代樂團多變的作品脈絡。</p></div>
        </section>
        {records.length > 0 && <section className="section-block detail-section"><div className="section-heading"><div><p className="section-kicker">REPRESENTATIVE RECORDS</p><h2>代表專輯</h2></div><span className="section-note">封面來源附於每張唱片頁。</span></div><div className="album-grid">{records.map((album) => <AlbumCard key={album.id} album={album} />)}</div></section>}
        {related.length > 0 && <section className="section-block detail-section"><div className="section-heading"><div><p className="section-kicker">RELATED NOTES</p><h2>相關場刊</h2></div></div><div className="article-grid">{related.map((article, index) => <ArticleCard key={article.id} article={article} index={index} />)}</div></section>}
      </div>
    </SiteLayout>
  );
}
