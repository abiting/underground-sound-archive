import { useMemo, useState, type FormEvent } from "react";
import { ArrowDown, ArrowUpRight, Disc3, Search, Sparkles } from "lucide-react";
import { Link } from "wouter";
import SiteLayout from "../components/SiteLayout";
import { AlbumCard, ArticleCard } from "../components/Cards";
import SafeCover from "../components/SafeCover";
import { albums, articles } from "../data/catalog";
import { sourceNotes } from "../data/sourceNotes";
import { searchAlbums } from "../lib/itunesSearch";
import type { SearchAlbum } from "../data/types";

const categories = ["全部", ...Array.from(new Set(articles.map((article) => article.category)))];
const decades = ["全部年代", "1970s", "1980s", "1990s", "2000s", "2020s"];

function decadeOf(year: string) {
  const yearNumber = Number(year);
  return `${Math.floor(yearNumber / 10) * 10}s`;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const [decade, setDecade] = useState("全部年代");
  const [apiQuery, setApiQuery] = useState("");
  const [apiResults, setApiResults] = useState<SearchAlbum[]>([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  const filteredArticles = useMemo(() => articles.filter((article) => {
    const search = query.trim().toLocaleLowerCase();
    const matchesQuery = !search || [article.title, article.artist, article.category, article.summary, article.body, ...article.tags].join(" ").toLocaleLowerCase().includes(search);
    const matchesCategory = category === "全部" || article.category === category;
    const matchesDecade = decade === "全部年代" || decadeOf(article.year) === decade;
    return matchesQuery && matchesCategory && matchesDecade;
  }), [query, category, decade]);

  const artists = useMemo(() => Array.from(new Map(articles.map((article) => {
    const slug = article.artist.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return [slug, { slug, name: article.artist, category: article.category, count: articles.filter((item) => item.artist === article.artist).length }];
  })).values()), []);

  async function handleApiSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setApiLoading(true);
    setApiMessage("");
    setApiResults([]);
    try {
      const results = await searchAlbums(apiQuery);
      setApiResults(results);
      setApiMessage(results.length ? `找到 ${results.length} 筆專輯資料。封面與商店連結由 Apple 提供。` : "沒有找到相符專輯，試試藝人名或英文專輯名。" );
    } catch (error) {
      setApiMessage(error instanceof Error ? error.message : "搜尋暫時失敗，請稍後再試。" );
    } finally {
      setApiLoading(false);
    }
  }

  return (
    <SiteLayout>
      <section className="hero-stage">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-kicker"><span className="red-dot" /> 台灣繁體中文搖滾／金屬場刊 <span>NO. 001</span></div>
          <h1>把音量開到<br /><em>失真以外。</em></h1>
          <p>從一張封面開始，沿著 riff、年代與故事，走進搖滾和金屬唱片的另一面。</p>
          <div className="hero-actions">
            <a className="button-red" href="#explore">翻開本期 <ArrowUpRight size={16} /></a>
            <a className="text-link" href="#api">用封面找唱片 <ArrowDown size={15} /></a>
          </div>
        </div>
        <div className="hero-stamp"><span>TURN<br />IT<br />LOUD</span><b>U/S/A</b></div>
        <div className="hero-caption"><span>聽見失真裡的細節</span><span>搖滾 × 金屬 × 唱片文化</span></div>
      </section>

      <section className="issue-ribbon" id="explore">
        <span>THIS ISSUE</span><b>經典唱片，從頭到尾聽一次</b><span>10 張選輯　／　11 篇導讀</span>
      </section>

      <section className="section-block featured-section">
        <div className="section-heading">
          <div><p className="section-kicker">01 / THE RECORD SHELF</p><h2>本期開聲<span>／</span>唱片選輯</h2></div>
          <p className="section-note">十張專輯，十種把聲音推遠的方法。</p>
        </div>
        <div className="album-grid">
          {albums.slice(0, 5).map((album) => <AlbumCard key={album.id} album={album} />)}
        </div>
        <div className="album-grid album-grid-secondary">
          {albums.slice(5).map((album) => <AlbumCard key={album.id} album={album} compact />)}
        </div>
      </section>

      <section className="artist-band" id="artists">
        <div className="artist-band-title"><p className="section-kicker">02 / BAND INDEX</p><h2>樂團索引<span>，</span><br />從名字開始挖。</h2></div>
        <div className="artist-list">
          {artists.map((artist, index) => (
            <Link key={artist.slug} href={`/artist/${artist.slug}`} className="artist-row">
              <span className="artist-index">{String(index + 1).padStart(2, "0")}</span>
              <strong>{artist.name}</strong>
              <span className="artist-genre">{artist.category}</span>
              <span className="artist-count">{artist.count} 篇</span>
              <ArrowUpRight size={16} />
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block explore-section">
        <div className="section-heading section-heading-stack">
          <div><p className="section-kicker">03 / FRESHLY PRINTED</p><h2>剛印好的<span>場刊</span></h2></div>
          <p className="section-note">樂團背景、專輯脈絡與聽完之後想說的話。</p>
        </div>
        <div className="filter-bar">
          <label className="filter-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="搜尋站內樂團、專輯與文章關鍵字" placeholder="搜尋樂團、專輯或關鍵字" /></label>
          <select aria-label="依音樂類型篩選" value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => <option key={item} value={item}>{item === "全部" ? "全部類型" : item}</option>)}
          </select>
          <select aria-label="依年代篩選" value={decade} onChange={(event) => setDecade(event.target.value)}>
            {decades.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <span className="result-count">{filteredArticles.length} 篇</span>
        </div>
        {filteredArticles.length ? (
          <div className="article-grid">
            {filteredArticles.map((article, index) => <ArticleCard key={article.id} article={article} index={index} />)}
          </div>
        ) : (
          <div className="empty-state"><Disc3 size={30} /><h3>這一面還沒有聲音</h3><p>試試其他關鍵字、類型或年代。</p></div>
        )}
      </section>

      <section className="api-section" id="api">
        <div className="api-copy">
          <p className="section-kicker">04 / COVER RADAR</p>
          <h2>封面是入口。<br /><span>再往裡找。</span></h2>
          <p>輸入樂團或專輯名稱，即時查詢 Apple 的專輯目錄。封面連回作品頁；搜尋結果可用藝人名或英文專輯名。</p>
          <form className="api-search-form" onSubmit={handleApiSearch}>
            <label htmlFor="album-search">輸入關鍵字</label>
            <div className="api-input-wrap"><input id="album-search" value={apiQuery} onChange={(event) => setApiQuery(event.target.value)} placeholder="例如：Iron Maiden" maxLength={80} /><button type="submit" disabled={apiLoading || apiQuery.trim().length < 2}>{apiLoading ? "搜尋中…" : "搜尋封面"}<Search size={16} /></button></div>
          </form>
          {apiMessage && <p className="api-status" role="status">{apiMessage}</p>}
        </div>
        <div className="api-results-panel">
          {apiResults.length ? (
            <div className="api-result-grid">
              {apiResults.slice(0, 8).map((album) => (
                <a key={album.collectionId} className="api-result-card" href={album.storeUrl} target="_blank" rel="noreferrer">
                  <SafeCover src={album.coverUrl} alt={`${album.artist}《${album.title}》封面`} lazy />
                  <span>{album.artist}</span><b>{album.title}</b>
                  <small>Apple Music 專輯頁 <ArrowUpRight size={11} /></small>
                </a>
              ))}
            </div>
          ) : (
            <div className="api-prompt-card"><Sparkles size={20} /><span>在這裡搜尋下一張想認識的唱片。</span><b>NO COVER<br />NO STORY?</b></div>
          )}
        </div>
        <div className="api-source-note"><span>來源註記</span><p>{sourceNotes.appleText}</p><a href="https://performance-partners.apple.com/search-api" target="_blank" rel="noreferrer">閱讀 Apple API 文件 <ArrowUpRight size={13} /></a></div>
        <div className="api-source-note"><span>封面權利</span><p><strong>{sourceNotes.coverArchiveTitle}：</strong>{sourceNotes.coverArchiveText}</p><a href="https://musicbrainz.org/doc/Cover_Art_Archive/API" target="_blank" rel="noreferrer">閱讀封面 API 文件 <ArrowUpRight size={13} /></a></div>
      </section>

      <section className="closing-callout">
        <span>KEEP THE NEEDLE MOVING</span><h2>一張接一張，<br />把耳朵留給新聲音。</h2><a href="#explore">再翻一頁 <ArrowUpRight size={15} /></a>
      </section>
    </SiteLayout>
  );
}
