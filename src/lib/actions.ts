"use server";

import { revalidatePath } from "next/cache";
import { tryCatch } from "@walkup/walkup-utils";
import { addToWatchlist, removeFromWatchlist } from "./data-access";
import { MovieType } from "./types";

/**
 * Toggles the movie's status on the user's watchlist.
 * Relies on the client-provided `isOnWatchlist` to determine the action.
 *
 * @param {MovieType} movieDetails - Movie detailsfrom TMDb.
 * @param {boolean} isOnWatchlist - The current watchlist status as known by the client.
 * @returns {Promise<{success: boolean, error?: any}>}
 * A promise that resolves to an object indicating the success of the operation.
 */
export async function toggleWatchlist(
  movieDetails: MovieType,
  isOnWatchlist: boolean,
) {
  const actionType = isOnWatchlist ? "remove" : "add";

  const result = await tryCatch(
    isOnWatchlist
      ? removeFromWatchlist(movieDetails.id)
      : addToWatchlist(movieDetails),
  );

  if (result.error || !result.data) {
    console.error(`${actionType} movie from watchlist failed:`, result.error);
    return { success: false, error: result.error };
  }

  revalidatePath(`/movie/${movieDetails.id}`);

  return {
    success: true,
    isOnWatchlist: actionType === "add",
  };
}
