import "server-only";

import { cache } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

import { db } from "./db/drizzle";
import { InsertMovie, movies, users, watchlist } from "./db/schema";

/******************************************************************************
 * USERS
 ******************************************************************************/

/**
 * Verifies if a user is authenticated by checking the Kinde session.
 * If the user is not authenticated, they will be redirected to the sign-in page.
 *
 * @returns {Promise<VerifySessionResult>} The authentication status and user information if authenticated.
 */
const verifySession = cache(async (sendToLogin: boolean = true) => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  const user = await getUser();

  if (!isLoggedIn && sendToLogin) {
    redirect(process.env.NEXT_PUBLIC_KINDE_LOGIN_LINK!);
  }

  return { isAuth: isLoggedIn, user };
});

/**
 * Retrieves the Kinde authenticated user details.
 *
 * @returns {Promise<User>} The Kinde user information.
 */
export const getKindeUser = cache(async () => {
  const { user } = await verifySession();

  return user;
});

/**
 * Creates a new user in the database if they don't already exist.
 * Uses Kinde user information (ID, email) to insert into the `users` table.
 *
 * @returns {Promise<void>} Resolves once the user is created or found.
 */
export const createUser = cache(async () => {
  const { user } = await verifySession();

  // Check if the email exists, just as a precaution
  if (!user.email) {
    throw new Error("Email is missing for the authenticated user.");
  }

  // Check if the user already exists in the database by their Kinde ID
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1)
    .execute();

  // If the user doesn't exist, insert them into the database
  if (existingUser.length === 0) {
    return await db
      .insert(users)
      .values({
        id: user.id,
        email: user.email,
      })
      .returning();
  }
  return existingUser;
});

/**
 * Retrieves a user from the database by their ID.
 * The function first verifies if the user is authenticated by checking the session.
 * If the user is not found in the database, it creates them
 *
 * @returns {Promise<DbUser>} The user object from the database.
 * @throws {Error} If the user is not authenticated or cannot be found in the database.
 */
export const getDBUser = cache(async () => {
  // Verify the session and get the user
  const { user } = await verifySession();

  if (!user || !user.id) {
    throw new Error("User is not authenticated or missing ID.");
  }

  try {
    // Query the database for the user
    let dbUser = await db
      .select()
      .from(users)
      .where(eq(users.id, user.id))
      .execute();

    // If the user doesn't exist, create them
    if (!dbUser || dbUser.length === 0) {
      dbUser = await createUser();
    }

    return dbUser[0];
  } catch (error) {
    // Handle any errors during the database operation
    console.error("Error fetching user from DB:", error);
    throw new Error("Failed to retrieve user from the database.");
  }
});

/******************************************************************************
 * MOVIES
 ******************************************************************************/

/**
 * Gets a movie from the database by its TMDb ID.  If the movie doesn't exist,
 * it returns null.
 */
export const getMovieByTmdbId = cache(async (tmdbId: string) => {
  const movie = await db
    .select()
    .from(movies)
    .where(eq(movies.tmdbId, tmdbId))
    .execute();
  return movie.length > 0 ? movie[0] : null;
});

/**
 * Adds a movie to the database.  Generates a UUID for the internal movie ID.
 */
export const addMovie = cache(async (movieData: InsertMovie) => {
  const newMovieId = uuidv4();
  return await db
    .insert(movies)
    .values({ id: newMovieId, ...movieData })
    .returning();
});

/******************************************************************************
 * WATCHLIST
 ******************************************************************************/

/**
 * Retrieves the watchlist for a user from the database.
 * The function first verifies if the user is authenticated by checking the session.
 *
 * @returns {Promise<WatchlistItem[]>} The watchlist items for the user.
 */
export const getWatchlist = cache(async () => {
  // Verify the session and get the user
  const { user } = await verifySession();

  if (!user || !user.id) {
    throw new Error("User is not authenticated or missing ID.");
  }

  try {
    const watchlistItems = await db
      .select()
      .from(watchlist)
      .where(eq(watchlist.userId, user.id))
      .execute();

    return watchlistItems;
  } catch (error) {
    console.error("Error fetching watchlist from DB:", error);
    throw new Error("Failed to retrieve watchlist from the database.");
  }
});

/**
 * Adds a movie to the watchlist for a user.
 * The function first verifies if the user is authenticated by checking the session.
 *
 * @param {number} movieId - The ID of the movie to add to the watchlist.
 * @returns {Promise<void>} Resolves once the movie is added to the watchlist.
 */
export const addToWatchlist = cache(async (movieId: string) => {
  const { user } = await verifySession();
  if (!user || !user.id) {
    throw new Error("User is not authenticated or missing ID.");
  }

  try {
    await db.insert(watchlist).values({ userId: user.id, movieId }).execute();
    return { success: true, watchlistItemId: movieId };
  } catch (dbError) {
    console.error("Error adding to watchlist:", dbError);
    return { success: false, error: dbError };
  }
});

/**
 * Removes a movie from the watchlist for a user.
 * The function first verifies if the user is authenticated by checking the session.
 *
 * @param {number} movieId - The ID of the movie to remove from the watchlist.
 * @returns {Promise<void>} Resolves once the movie is removed from the watchlist.
 */
export const removeFromWatchlist = cache(async (movieId: string) => {
  const { user } = await verifySession();
  if (!user || !user.id) {
    throw new Error("User is not authenticated or missing ID.");
  }

  try {
    await db
      .delete(watchlist)
      .where(and(eq(watchlist.userId, user.id), eq(watchlist.movieId, movieId)))
      .execute();
    return { success: true };
  } catch (error) {
    console.error("Error removing movie from watchlist:", error);
    return { success: false, error: error };
  }
});

/**
 * Checks if a movie is in a user's watchlist.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} movieId - The ID of the movie.
 * @returns {Promise<boolean>} True if the movie is in the watchlist, false otherwise.
 */
export const isMovieInWatchlist = cache(
  async (movieId: string): Promise<boolean> => {
    const { user } = await verifySession(false);

    if (!user || !user.id) {
      return false;
    }
    try {
      const movie = await getMovieByTmdbId(movieId);

      if (!movie || !movie.id) {
        return false;
      }

      const existingWatchlistItem = await db
        .select()
        .from(watchlist)
        .where(
          and(eq(watchlist.userId, user.id), eq(watchlist.movieId, movie.id)),
        )
        .execute();

      return existingWatchlistItem.length > 0;
    } catch (error) {
      console.error("Error checking watchlist:", error);
      return false;
    }
  },
);
