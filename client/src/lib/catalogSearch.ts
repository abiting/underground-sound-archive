import type { Album, Article } from "../data/types";

export type CatalogFilters = { query: string; category: string; decade: string };

const artistSlugOverrides: Record<string, string> = {
  "生物股長": "ikimono-gakari",
  "いきものがかり": "ikimono-gakari",
  "四分衛": "quarterback",
  "小男孩樂團": "men-envy-children",
  "Men Envy Children": "men-envy-children",
};

export function artistSlug(name: string) {
  return artistSlugOverrides[name] ?? name.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const artistSearchAliases: Record<string, string[]> = {
  "小男孩樂團": ["Men Envy Children", "MEC", "MECBand"],
  "Men Envy Children": ["小男孩樂團", "MEC", "MECBand"],
};

function searchNames(artist: string) {
  return [artist, ...(artistSearchAliases[artist] ?? [])];
}

export function decadeOf(year: string) {
  return `${Math.floor(Number(year) / 10) * 10}s`;
}

function matches(text: string, genre: string, year: string, filters: CatalogFilters) {
  const query = filters.query.trim().toLocaleLowerCase();
  return (!query || text.toLocaleLowerCase().includes(query))
    && (filters.category === "全部" || genre === filters.category)
    && (filters.decade === "全部年代" || decadeOf(year) === filters.decade);
}

export function filterAlbums(records: Album[], filters: CatalogFilters) {
  return records.filter(album => matches(
    [album.title, ...searchNames(album.artist), album.genre, album.summary, album.listeningNotes, ...album.tracks].filter(Boolean).join(" "),
    album.genre, album.year, filters,
  ));
}

export function filterArticles(notes: Article[], filters: CatalogFilters) {
  return notes.filter(article => matches(
    [article.title, ...searchNames(article.artist), article.category, article.summary, article.body, ...article.tags].join(" "),
    article.category, article.year, filters,
  ));
}

export function catalogCategories(records: Album[], notes: Article[]) {
  return ["全部", ...new Set([...notes.map(note => note.category), ...records.map(record => record.genre)])];
}

export function catalogDecades(records: Album[], notes: Article[]) {
  return ["全部年代", ...new Set([...records.map(record => decadeOf(record.year)), ...notes.map(note => decadeOf(note.year))])].sort((a, b) => a === "全部年代" ? -1 : b === "全部年代" ? 1 : a.localeCompare(b));
}

export function buildArtistIndex(records: Album[], notes: Article[]) {
  type ArtistEntry = { slug: string; name: string; category: string; albumCount: number; guideKeys: Set<string> };
  const index = new Map<string, ArtistEntry>();
  const getEntry = (name: string, category: string) => {
    const slug = artistSlug(name);
    const entry = index.get(slug) || { slug, name, category, albumCount: 0, guideKeys: new Set<string>() };
    index.set(slug, entry);
    return entry;
  };
  const articleIds = new Set(notes.map(note => note.id));
  for (const note of notes) {
    const linkedAlbum = (note.albumId && records.find(record => record.id === note.albumId))
      || records.find(record => record.articleId === note.id);
    const entry = getEntry(linkedAlbum?.artist ?? note.artist, linkedAlbum?.genre ?? note.category);
    const isAlbumArticle = linkedAlbum?.articleId === note.id;
    entry.guideKeys.add(isAlbumArticle ? `album:${linkedAlbum.id}` : `article:${note.id}`);
  }
  for (const record of records) {
    const entry = getEntry(record.artist, record.genre);
    entry.albumCount += 1;
    if (record.listeningNotes?.trim() || (record.articleId && articleIds.has(record.articleId))) {
      entry.guideKeys.add(`album:${record.id}`);
    }
  }
  return [...index.values()].map(({ guideKeys, ...artist }) => ({ ...artist, guideCount: guideKeys.size }));
}

export function catalogGuideCount(records: Album[], notes: Article[]) {
  return buildArtistIndex(records, notes).reduce((count, artist) => count + artist.guideCount, 0);
}
