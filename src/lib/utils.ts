import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  CrewMember,
  MovieType,
  StreamingServiceItem,
  TrailerType,
} from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get the name of the director from the crew array
export function getDirector(crew: CrewMember[] | undefined): string {
  const director = crew?.find((member) => member.job === "Director");
  return director ? director.name : "Unknown";
}

// Get the release year from the release date string (YYYY-MM-DD)
export function getReleaseYear(releaseDate: string | undefined): string {
  if (!releaseDate) return "";
  const year = new Date(releaseDate).getFullYear();
  return year.toString();
}

// Get the runtime formatted as hours and minutes (e.g., "2h 15m")
export function getRuntime(runtime: number | undefined): string | null {
  if (!runtime) return null;
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
}

/**
 * Parse the streaming services into free, subscription, buy, and rent categories.
 *
 * @param {StreamingServiceItem[] | null} streamingData - An array of streaming service items or null if no data.
 * @returns {Object} An object containing categorized streaming services:
 *   - `freeSub`: Services that are either free or subscription-based.
 *   - `rent`: Services that allow renting.
 *   - `buy`: Services where you can buy content.
 */
export function parseStreamingServices(
  streamingData: StreamingServiceItem[] | null,
): {
  freeSub: StreamingServiceItem[];
  rent: StreamingServiceItem[];
  buy: StreamingServiceItem[];
} {
  const result = {
    freeSub: [] as StreamingServiceItem[],
    rent: [] as StreamingServiceItem[],
    buy: [] as StreamingServiceItem[],
  };
  if (!streamingData) {
    return result;
  }

  streamingData.forEach((item) => {
    switch (item.type) {
      case "free":
        result.freeSub.push(item);
        break;
      case "sub":
        result.freeSub.push(item);
        break;
      case "rent":
        result.rent.push(item);
        break;
      case "buy":
        result.buy.push(item);
        break;
      default:
        console.warn(`Unknown streaming type: ${item.type}`);
    }
  });

  return result;
}

/**
 * Get the poster image from the movie details.
 * Optionally, retrieve the backdrop image if requested.
 *
 * @param {MovieType | null} movieDetails - The details of the movie, which may include `poster_path` and `backdrop_path`.
 * @param {boolean} [retrieveBackdrop=false] - Whether to retrieve the backdrop image instead of the poster. Defaults to `false`.
 * @returns {string} The URL of the poster or backdrop image.
 * If no poster is found, a default image URL is returned.
 */
export function getPoster(
  movieDetails: MovieType | null,
  retrieveBackdrop: boolean = false,
): string {
  console.log("movieDetails", movieDetails?.poster_path);
  if (!movieDetails?.poster_path) return "/images/film-stock-new.jpg";
  if (retrieveBackdrop && movieDetails.backdrop_path) {
    return `https://image.tmdb.org/t/p/w400${movieDetails.backdrop_path}`;
  }
  return `https://image.tmdb.org/t/p/w400${movieDetails.poster_path}`;
}

/**
 * Retrieves the most recent trailer from the movie details.
 *
 * This function filters the list of videos to only include those with the type "Trailer",
 * then sorts the trailers by their published date in descending order to get the most recent one.
 * If no trailers are found or there are no videos, it returns `null`.
 *
 * @param {MovieType | null} movieDetails - The movie details object, which contains video data.
 * @returns {Video | null} The most recent trailer video, or `null` if no trailers exist.
 */
export function getMostResentTrailer(
  movieDetails: MovieType | null,
): TrailerType | null {
  if (
    !movieDetails?.videos?.results ||
    movieDetails.videos.results.length === 0
  )
    return null;

  // Filter out the objects that are of type 'Trailer'
  const trailers = movieDetails.videos.results.filter(
    (video) => video.type === "Trailer",
  );

  // Sort trailers by the published date in descending order (most recent first)
  trailers.sort(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
  );

  // Return the most recent trailer (the first one in the sorted array)
  return trailers[0] || null;
}
