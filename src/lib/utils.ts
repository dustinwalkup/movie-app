import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  CrewMember,
  MovieType,
  StreamingCountry,
  StreamingServiceItem,
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

// Parse the streaming services into flatrate, buy, and rent categories
export function parseStreamingServices(
  streamingData: StreamingCountry | null,
): {
  flatrate: StreamingServiceItem[];
  buy: StreamingServiceItem[];
  rent: StreamingServiceItem[];
} {
  return {
    flatrate: streamingData?.flatrate || [],
    buy: streamingData?.buy || [],
    rent: streamingData?.rent || [],
  };
}

// Get the poster image from the movie details
export function getPoster(movieDetails: MovieType | null): string {
  return movieDetails?.poster_path
    ? `https://image.tmdb.org/t/p/w400${movieDetails.poster_path}`
    : "/images/film-stock.jpg";
}
