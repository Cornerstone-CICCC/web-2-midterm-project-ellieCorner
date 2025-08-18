import type { Media, SortKey } from "../types/tmdb";

const toTime = (d?: string) => {
  const t = d ? new Date(d).getTime() : NaN;
  return Number.isFinite(t) ? t : 0;
};

const getTitle = (m: Media) =>
  (m.title ?? (m as any).name ?? "").toString().toLowerCase();
const getDateStr = (m: Media) =>
  m.release_date ?? (m as any).first_air_date ?? "";

export function sortMedia(list: Media[], key: SortKey): Media[] {
  const withIdx = list.map((m, i) => ({ m, i }));

  withIdx.sort((a, b) => {
    switch (key) {
      case "popularity":
        return (b.m.popularity ?? 0) - (a.m.popularity ?? 0);
      case "vote_average":
        return (b.m.vote_average ?? 0) - (a.m.vote_average ?? 0);
      case "release_date": {
        const ta = toTime(getDateStr(a.m));
        const tb = toTime(getDateStr(b.m));

        if (tb !== ta) return tb - ta;
        break;
      }
      case "title": {
        const ca = getTitle(a.m);
        const cb = getTitle(b.m);
        const cmp = cb.localeCompare(ca, undefined, { sensitivity: "base" });

        if (cmp !== 0) return cmp;
        break;
      }
    }

    return a.i - b.i;
  });

  return withIdx.map((x) => x.m);
}
