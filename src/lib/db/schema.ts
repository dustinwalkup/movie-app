import {
  text,
  pgTable,
  timestamp,
  varchar,
  index,
  uuid,
  integer,
} from "drizzle-orm/pg-core";

// Users table (using Kinde Auth user ID)
export const users = pgTable("users", {
  id: text().primaryKey(), // Kinde Auth user ID
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp().notNull().defaultNow(),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

// Movies table
export const movies = pgTable("movies", {
  id: uuid().primaryKey().defaultRandom(),
  tmdbId: text().unique(),
  title: text().notNull(),
  posterPath: text(),
  overview: text(),
  releaseDate: text(),
  runtime: integer(),
  genres: text(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp(),
});

export type InsertMovie = typeof movies.$inferInsert;
export type SelectMovie = typeof movies.$inferSelect;

// Watchlist table
export const watchlist = pgTable(
  "watchlist",
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    movieId: uuid()
      .notNull()
      .references(() => movies.id, { onDelete: "cascade" }),
    createdAt: timestamp().notNull().defaultNow(),
  },
  (table) => {
    return {
      userIdIdx: index().on(table.userId),
      userMovieIdx: index().on(table.userId, table.movieId),
    };
  },
);

export type InsertWatchlist = typeof watchlist.$inferInsert;
export type SelectWatchlist = typeof watchlist.$inferSelect;

export const schema = {
  users,
  // watchlist,
  // movies,
};
