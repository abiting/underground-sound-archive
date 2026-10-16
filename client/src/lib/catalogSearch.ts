import type { Album, Article } from "../data/types";

export type CatalogFilters = { query: string; category: string; decade: string };

export function artistSlug(name: string) {
  return name.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
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
    [album.title, album.artist, album.genre, album.summary, album.listeningNotes, ...album.tracks].filter(Boolean).join(" "),
    album.genre, album.year, filters,
  ));
}

export function filterArticles(notes: Article[], filters: CatalogFilters) {
  return notes.filter(article => matches(
    [article.title, article.artist, article.category, article.summary, article.body, ...article.tags].join(" "),
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
  const index = new Map<string, { slug: string; name: string; category: string; count: number; albumCount: number }>();
  for (const note of notes) {
    const slug = artistSlug(note.artist);
    const entry = index.get(slug) || { slug, name: note.artist, category: note.category, count: 0, albumCount: 0 };
    entry.count += 1;
    index.set(slug, entry);
  }
  for (const record of records) {
    const slug = artistSlug(record.artist);
    const entry = index.get(slug) || { slug, name: record.artist, category: record.genre, count: 0, albumCount: 0 };
    entry.albumCount += 1;
    index.set(slug, entry);
  }
  return [...index.values()];
}
