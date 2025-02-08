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

        return {
          success: addedToWatchlist.success,
          watchlistItemId: addedToWatchlist.watchlistItemId,
        };
      } catch (dbError) {
        console.error("Error adding movie to database:", dbError);
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
    return { success: false, error: error };
  }
}
