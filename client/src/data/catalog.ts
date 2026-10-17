import { albums as currentAlbums } from "./albums";
import { expandedAlbums } from "./albumExpansion";
import { taiwanAlbums } from "./taiwanAlbums";
import type { Album } from "./types";

export { articles } from "./articles";
export const albums: Album[] = [...currentAlbums, ...expandedAlbums, ...taiwanAlbums];
