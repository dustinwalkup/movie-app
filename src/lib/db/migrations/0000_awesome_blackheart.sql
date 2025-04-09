CREATE TABLE "movies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tmdbId" text,
	"title" text NOT NULL,
	"posterPath" text,
	"overview" text,
	"releaseDate" text,
	"runtime" integer,
	"genres" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	CONSTRAINT "movies_tmdbId_unique" UNIQUE("tmdbId")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "watchlist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"directedBy" text,
	"tmdbId" text,
	"title" text NOT NULL,
	"posterPath" text,
	"overview" text,
	"releaseDate" text,
	"runtime" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "watchlist_tmdbId_unique" UNIQUE("tmdbId")
);
--> statement-breakpoint
ALTER TABLE "watchlist" ADD CONSTRAINT "watchlist_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "watchlist_userId_index" ON "watchlist" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "watchlist_userId_tmdbId_index" ON "watchlist" USING btree ("userId","tmdbId");