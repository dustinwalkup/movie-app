import { MovieType } from "../types";

/**
 * Fetch a list of movies based on the search query.
 *
 * This function fetches movie results from the TMDb API based on a given search query.
 * If the query is empty or invalid, an empty array will be returned.
 *
 * @param {string} query - The search query to find movies by (e.g., movie title or keywords).
 * @returns {Promise<MovieType[]>} A promise that resolves to an array of movie objects, or an empty array if no results are found or an error occurs.
 */
export async function fetchMovies(query: string) {
  if (!query) return [];
  try {
    const res = await fetch(
      `${process.env.TMDB_BASE_URL}/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}`,
    );
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

/**
 * Fetch detailed information about a single movie by its TMDb ID.
 *
 * This function retrieves detailed information about a movie, including credits (actors, crew, etc.), from the TMDb API.
 * If the movie ID is invalid or the fetch operation fails, it returns null.
 *
 * @param {string} id - The unique ID of the movie on TMDb.
 * @returns {Promise<MovieType | null>} A promise that resolves to a movie object with detailed information, or null if the movie cannot be found or an error occurs.
 */
export async function fetchMovie(id: string): Promise<MovieType | null> {
  if (!id) return null;

  try {
    const res = await fetch(
      `${process.env.TMDB_BASE_URL}/movie/${id}?append_to_response=credits,videos`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch movie details");
    }

    const result = await res.json();
    // console.log("result", result);
    return result;
  } catch (error) {
    console.error("Error fetching movie:", error);
    return null;
  }
}

// NOT GETTING STREAMING DATA FROM TMDB
// export async function fetchStreamingServices(
//   id: string,
// ): Promise<StreamingCountry | null> {
//   if (!id) return null;

//   try {
//     const res = await fetch(
//       `${process.env.TMDB_BASE_URL}/movie/${id}/watch/providers?language=en-US`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       },
//     );

//     if (!res.ok) {
//       throw new Error("Failed to fetch streaming providers");
//     }

//     const data = await res.json();
//     return data.results["US"] || [];
//   } catch (error) {
//     console.error("Error fetching streaming providers:", error);
//     return null;
//   }
// }

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function searchMovies(
  query: string,
  page = 1,
): Promise<TMDBResponse> {
  if (!TMDB_API_KEY) {
    throw new Error("TMDB API key not configured");
  }

  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
    { next: { revalidate: 300 } }, // Cache for 5 minutes
  );

  if (!response.ok) {
    throw new Error("Failed to fetch from TMDB");
  }

  return response.json();
}

export async function getMoviesByCategory(
  category: string,
  page = 1,
): Promise<TMDBResponse> {
  if (!TMDB_API_KEY) {
    throw new Error("TMDB API key not configured");
  }

  let endpoint = "";
  switch (category) {
    case "popular":
      endpoint = "movie/popular";
      break;
    case "top_rated":
      endpoint = "movie/top_rated";
      break;
    case "upcoming":
      endpoint = "movie/upcoming";
      break;
    case "now_playing":
      endpoint = "movie/now_playing";
      break;
    default:
      endpoint = "movie/popular";
  }

  const response = await fetch(
    `${TMDB_BASE_URL}/${endpoint}?api_key=${TMDB_API_KEY}&page=${page}`,
    { next: { revalidate: 300 } }, // Cache for 5 minutes
  );

  if (!response.ok) {
    throw new Error("Failed to fetch from TMDB");
  }

  return response.json();
}
