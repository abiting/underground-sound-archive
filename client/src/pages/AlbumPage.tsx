import { withBasePath } from "../lib/sitePaths";
import { ArrowLeft, ArrowUpRight, Disc3, Music2 } from "lucide-react";
import { Link, useRouter } from "wouter";
import EditorialBody from "../components/EditorialBody";
import SiteLayout from "../components/SiteLayout";
import { Score } from "../components/Cards";
import SafeCover from "../components/SafeCover";
import { albums, articles } from "../data/catalog";
import { artistSlug } from "../lib/catalogSearch";

export default function AlbumPage({ id }: { id: string }) {
  const { base } = useRouter();
  const album = albums.find((item) => item.id === id);
  if (!album) {
    return <SiteLayout><div className="not-found-page"><h1>找不到這張唱片</h1><a href={withBasePath("/#explore", base)}>回到唱片選輯 <ArrowUpRight size={15} /></a></div></SiteLayout>;
  }
  const article = articles.find((item) => item.id === album.articleId);

  return (
    <SiteLayout>
      <div className="detail-page album-page">
        <div className="detail-topline"><a href={withBasePath("/#explore", base)}><ArrowLeft size={15} /> 回到唱片選輯</a><span>ALBUM GUIDE / {album.genre}</span></div>
        <section className="album-detail-hero">
          <div className="album-detail-cover">
            <SafeCover src={album.coverUrl} alt={`${album.artist}《${album.title}》專輯封面`} />
            <span>封面：{album.coverSource}</span>
          </div>
          <div className="album-detail-copy">
            <p className="section-kicker">THE RECORD / {album.year}</p>
            <span className="category-pill">{album.genre}</span>
            <h1>{album.title}</h1>
            <p className="album-artist-name"><Link href={`/artist/${artistSlug(album.artist)}/`}>{album.artist}</Link></p>
            <div className="album-facts">
              <span><b>{album.year}</b><small>發行年份</small></span>
              <span><b>{album.trackCount}</b><small>曲目數</small></span>
              <span><b>{album.genre}</b><small>音樂類型</small></span>
              {article && <span><Score value={article.score} /><small>本刊主觀評分</small></span>}
            </div>
            <p className="album-lede">{article?.summary || album.summary}</p>
            <div className="album-outbound">
              <a href={album.storeUrl} target="_blank" rel="noopener noreferrer">在 Apple Music 查看作品 <ArrowUpRight size={14} /></a>
              {album.musicbrainzUrl && <a href={album.musicbrainzUrl} target="_blank" rel="noopener noreferrer">MusicBrainz 專輯資料 <ArrowUpRight size={14} /></a>}
            </div>
          </div>
        </section>
        {album.trackCountNote && <p className="section-note">{album.trackCountNote}</p>}
        <section className="track-note-section">
          <div className="track-note-heading"><Disc3 size={19} /><div><p className="section-kicker">NEEDLE DROPS</p><h2>先從這幾首開始</h2></div></div>
          <div className="track-list">
            {album.tracks.map((track, index) => <div className="track-row" key={track}><span>{String(index + 1).padStart(2, "0")}</span><Music2 size={15} /><b>{track}</b><span>聽點</span></div>)}
          </div>
        </section>
        {(article || album.listeningNotes) && (
          <section className="album-review-section">
            <div className="section-heading"><div><p className="section-kicker">THE LISTENING NOTES</p><h2>專輯導讀</h2></div>{article && <Link href={`/article/${article.slug}`}>以文章頁閱讀同一篇導讀 <ArrowUpRight size={14} /></Link>}</div>
            <div className="prose-panel album-review-copy">
              <EditorialBody content={article?.body || album.listeningNotes || ""} />
              <div className="article-sources">
                <h2>資料與封面來源</h2>
                <p>封面來源為 {album.coverSource}，作品權利屬於原權利人。發行與創作資料附於下列來源，作品資訊可在 Apple Music 查看。</p>
                <a href={album.coverSourceUrl} target="_blank" rel="noopener noreferrer">封面來源：{album.coverSource} <ArrowUpRight size={13} /></a>
                {album.musicbrainzUrl && <a href={album.musicbrainzUrl} target="_blank" rel="noopener noreferrer">專輯中繼資料：MusicBrainz <ArrowUpRight size={13} /></a>}
                {[...(article?.sources || []), ...(album.sources || [])].map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.name}<ArrowUpRight size={13} /></a>)}
              </div>
            </div>
          </section>
        )}
      </div>
    </SiteLayout>
  );
}
