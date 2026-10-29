import { albums as currentAlbums } from "./albums";
import { expandedAlbums } from "./albumExpansion";
import { taiwanAlbums } from "./taiwanAlbums";
import { indieAlbums } from "./indieAlbums";
import { batch51Albums } from "./batch51Albums";
import { october29Albums } from "./october29Albums";
import type { Album } from "./types";

export { articles } from "./articles";
export const albums: Album[] = [...currentAlbums, ...expandedAlbums, ...taiwanAlbums, ...indieAlbums, ...batch51Albums, ...october29Albums];
