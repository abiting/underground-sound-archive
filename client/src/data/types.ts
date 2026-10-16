export type MusicSource = {
  name: string;
  url: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  year: string;
  tags: string[];
  score: number;
  body: string;
  sources: MusicSource[];
  artist: string;
  albumId?: string;
};

export type Album = {
  id: string;
  title: string;
  artist: string;
  year: string;
  trackCount: number;
  genre: string;
  coverUrl: string;
  coverSource: string;
  coverSourceUrl: string;
  musicbrainzUrl: string;
  storeUrl: string;
  tracks: string[];
  articleId?: string;
  summary?: string;
  listeningNotes?: string;
  trackCountNote?: string;
  sources?: MusicSource[];
};

export type SearchAlbum = {
  collectionId: number;
  title: string;
  artist: string;
  releaseDate: string;
  trackCount: number;
  genre: string;
  coverUrl: string;
  storeUrl: string;
};
