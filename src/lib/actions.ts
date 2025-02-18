"use server";

import { revalidatePath } from "next/cache";
import {
  addMovie,
  addToWatchlist,
  getMovieByTmdbId,
  isMovieInWatchlist,
  removeFromWatchlist,
} from "./data-access";
import { InsertMovie } from "./db/schema";
import { fetchMovie } from "./services/tmdb";

/**
 * Toggle the movie's status on the user's watchlist.
 *
 * - If the movie is not in the database, it fetches movie details from TMDb, adds it to the database, and adds it to the watchlist.
 * - If the movie is already in the database, it checks if it's on the watchlist and either adds or removes it accordingly.
 *
 * @param {string} tmdbMovieId - The unique ID of the movie from TMDb.
 * @returns {Promise<{success: boolean, watchlistItemId?: string, isOnWatchlist?: boolean, error?: any}>}
 *   A promise that resolves to an object indicating the success of the operation:
 *   - `success`: Whether the operation was successful.
 *   - `watchlistItemId`: The ID of the movie in the watchlist (if added).
 *   - `isOnWatchlist`: A boolean indicating whether the movie is on the watchlist after the operation.
 *   - `error`: An error object if the operation failed.
 *
 * @throws {Error} Throws an error if the operation fails at any point, including fetching the movie details or updating the database.
 */
export async function toggleWatchlist(tmdbMovieId: string) {
  try {
    const movie = await getMovieByTmdbId(tmdbMovieId);

    if (!movie || !movie.id) {
      // Movie doesn't exist, fetch details from TMDb and add it to DB
      const movieDetails = await fetchMovie(tmdbMovieId);

      if (!movieDetails) {
        throw new Error("Failed to fetch movie details from TMDb.");
      }

      const movieData: InsertMovie = {
        // Transform to MovieData type
        tmdbId: tmdbMovieId,
        title: movieDetails.title,
        posterPath: movieDetails.poster_path,
        overview: movieDetails.overview,
        releaseDate: movieDetails.release_date,
        runtime: movieDetails.runtime,
        genres: movieDetails.genres
          ? movieDetails.genres.map((genre) => genre.name).join("|")
          : null,
      };

      try {
        const newMovie = await addMovie(movieData);
        const addedToWatchlist = await addToWatchlist(newMovie[0].id);

        revalidatePath("/movie/[id]");
        return {
          success: addedToWatchlist.success,
          watchlistItemId: addedToWatchlist.watchlistItemId,
        };
      } catch (dbError) {
        console.error("Error adding movie to database:", dbError);
        revalidatePath("/movie/[id]");
        throw new Error(`Failed to add movie to database: ${dbError}`);
      }
    }

    const existingWatchlistItem = await isMovieInWatchlist(tmdbMovieId);

    if (existingWatchlistItem) {
      // Movie is already in the watchlist, so remove it
      const removedFromWatchlist = await removeFromWatchlist(movie.id);
      if (!removedFromWatchlist.success) {
        return { success: false, error: removedFromWatchlist };
      }
      revalidatePath("/movie/[id]");
      return { success: true, isOnWatchlist: false };
    } else {
      // Movie is not in the watchlist, so add it
      const addToWatchlistResult = await addToWatchlist(movie.id);
      if (!addToWatchlistResult.success) {
        return { success: false, error: addToWatchlistResult };
      }
      revalidatePath("/movie/[id]");
      return { success: true, isOnWatchlist: true };
    }
  } catch (error) {
    console.error("Error toggling watchlist:", error);
    revalidatePath("/movie/[id]");
    return { success: false, error: error };
  }
}
