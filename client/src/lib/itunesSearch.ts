import type { SearchAlbum } from "../data/types";

type ItunesResponse = {
  resultCount: number;
  results: Array<{
    collectionId?: number;
    collectionName?: string;
    artistName?: string;
    releaseDate?: string;
    trackCount?: number;
    primaryGenreName?: string;
    artworkUrl100?: string;
    collectionViewUrl?: string;
  }>;
};

type WindowWithCallbacks = Window & Record<string, unknown>;
const cache = new Map<string, { savedAt: number; albums: SearchAlbum[] }>();
let requestCounter = 0;
const CACHE_TTL_MS = 10 * 60 * 1000;

/** Search Apple's public iTunes Search API through its documented JSONP callback. */
export function searchAlbums(query: string): Promise<SearchAlbum[]> {
  const term = query.trim();
  if (term.length < 2) return Promise.reject(new Error("請至少輸入 2 個字元。"));
  if (term.length > 80) return Promise.reject(new Error("搜尋文字最多 80 個字元。"));

  const cacheKey = term.toLocaleLowerCase();
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.savedAt < CACHE_TTL_MS) {
    return Promise.resolve(cached.albums);
  }

  return new Promise((resolve, reject) => {
    const callbackName = `riffAtlasItunesCallback${++requestCounter}`;
    const script = document.createElement("script");
    const callbackWindow = window as unknown as WindowWithCallbacks;
    let settled = false;
    const timeout = window.setTimeout(() => finish(new Error("搜尋逾時，請稍後再試。")), 12000);

    const cleanup = () => {
      window.clearTimeout(timeout);
      script.remove();
      delete callbackWindow[callbackName];
    };
    const finish = (error?: Error, albums: SearchAlbum[] = []) => {
      if (settled) return;
      settled = true;
      cleanup();
      if (error) reject(error);
      else {
        cache.set(cacheKey, { savedAt: Date.now(), albums });
        resolve(albums);
      }
    };

    callbackWindow[callbackName] = (payload: ItunesResponse) => {
      if (!payload || !Array.isArray(payload.results)) {
        finish(new Error("資料來源回傳格式不正確。"));
        return;
      }
      const albums = payload.results
        .filter((item) => item.collectionId && item.collectionName && item.artistName && item.artworkUrl100 && item.collectionViewUrl)
        .map((item) => ({
          collectionId: item.collectionId as number,
          title: item.collectionName as string,
          artist: item.artistName as string,
          releaseDate: item.releaseDate ?? "",
          trackCount: item.trackCount ?? 0,
          genre: item.primaryGenreName ?? "音樂",
          coverUrl: item.artworkUrl100 as string,
          storeUrl: item.collectionViewUrl as string,
        }));
      finish(undefined, albums);
    };

    const params = new URLSearchParams({
      term,
      entity: "album",
      media: "music",
      country: "tw",
      limit: "24",
      callback: callbackName,
    });
    script.src = `https://itunes.apple.com/search?${params.toString()}`;
    script.async = true;
    script.onerror = () => finish(new Error("暫時無法連接 Apple 音樂搜尋，請稍後再試。"));
    document.head.appendChild(script);
  });
}
