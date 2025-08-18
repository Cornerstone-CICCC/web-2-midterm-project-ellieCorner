import { API_CONFIG } from "../constants/api";
import type { Media } from "../types/tmdb";

export const getMediaTitle = (media: Media) =>
  media.title || media.name || "Unknown";

export function getNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num?.toString();
}

export function getYear(media: Media): number | string {
  const date = media?.release_date || media?.first_air_date;
  return date ? new Date(date).getFullYear() : "N/A";
}

export function getImageUrl(
  path: string | null,
  size: "poster" | "backdrop" = "poster"
): string {
  if (!path) return "/api/placeholder/400/600";
  const baseUrl =
    size === "backdrop"
      ? API_CONFIG.BACKDROP_BASE_URL
      : API_CONFIG.IMAGE_BASE_URL;
  return `${baseUrl}${path}`;
}
