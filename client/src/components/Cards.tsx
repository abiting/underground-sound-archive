import { ArrowUpRight, Disc3, Star } from "lucide-react";
import { Link } from "wouter";
import { albums } from "../data/catalog";
import type { Album, Article } from "../data/types";
import { useState } from "react";

function AlbumCover({ album, className = "" }: { album: Album; className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`cover-frame ${className}`}>
      {!failed ? (
        <img src={album.coverUrl} alt={`${album.artist}《${album.title}》專輯封面`} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <div className="cover-fallback"><Disc3 size={34} /><span>NO SIGNAL</span></div>
      )}
      <span className="cover-credit-label">封面／{album.coverSource}</span>
    </div>
  );
}

export function AlbumCard({ album, compact = false }: { album: Album; compact?: boolean }) {
  return (
    <Link href={`/album/${album.id}`} className={`album-card ${compact ? "album-card-compact" : ""}`}>
      <AlbumCover album={album} />
      <div className="album-card-copy">
        <div className="card-eyebrow">{album.genre}<span>{album.year}</span></div>
        <h3>{album.title}</h3>
        <p>{album.artist}</p>
        <span className="card-link">翻開唱片 <ArrowUpRight size={14} /></span>
      </div>
    </Link>
  );
}

export function ArticleCard({ article, index = 0 }: { article: Article; index?: number }) {
  const album = albums.find((item) => item.id === article.albumId);
  const [failed, setFailed] = useState(false);
  return (
    <Link href={`/article/${article.slug}`} className={`article-card article-card-${index % 3}`}>
      <div className="article-card-art">
        {album && !failed ? (
          <img src={album.coverUrl} alt={`${album.artist}《${album.title}》專輯封面`} loading="lazy" onError={() => setFailed(true)} />
        ) : (
          <div className="article-art-placeholder"><span>聲音<br />檔案</span><b>{String(index + 1).padStart(2, "0")}</b></div>
        )}
        <span className="article-card-number">{String(index + 1).padStart(2, "0")}</span>
        {album && <span className="article-cover-credit">封面／{album.coverSource}</span>}
      </div>
      <div className="article-card-copy">
        <div className="card-eyebrow">{article.category}<span>{article.year}</span></div>
        <h3>{article.title}</h3>
        <p>{article.summary}</p>
        <span className="card-link">閱讀導讀 <ArrowUpRight size={14} /></span>
      </div>
    </Link>
  );
}

export function Score({ value }: { value: number }) {
  return <span className="score-chip"><Star size={13} fill="currentColor" /> {value.toFixed(1)} <small>/ 5</small></span>;
}
