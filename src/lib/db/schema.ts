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

// Watchlist table
export const watchlist = pgTable(
  "watchlist",
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tmdbId: integer().unique(),
    title: text().notNull(),
    directedBy: text(),
    posterPath: text(),
    overview: text(),
    releaseDate: text(),
    runtime: integer(),
    createdAt: timestamp().notNull().defaultNow(),
  },
  (table) => {
    return {
      userIdIdx: index().on(table.userId),
      userMovieIdx: index().on(table.userId, table.tmdbId),
    };
  },
);

export type InsertWatchlist = typeof watchlist.$inferInsert;
export type SelectWatchlist = typeof watchlist.$inferSelect;

export const schema = {
  users,
  watchlist,
};
