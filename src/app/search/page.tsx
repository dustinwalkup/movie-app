import { Suspense } from "react";
import { AlertCircle } from "lucide-react";

import {
  searchMovies,
  getMoviesByCategory,
  type Movie,
} from "@/lib/services/tmdb";
import { SearchForm } from "@/components/search-form";
import { CategoryNavigation } from "@/components/category-navigation";
import { ClearResultsButton } from "@/components/clear-results-button";
import { LoadMoreButton } from "@/components/load-more-button";
import { MovieCard } from "@/components/movie-card3";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    page?: string;
  }>;
}

async function MovieResults({
  searchParams,
}: {
  searchParams: SearchPageProps["searchParams"];
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q;
  const category = resolvedSearchParams.category;
  const page = Number.parseInt(resolvedSearchParams.page || "1");

  if (!query && !category) {
    return <CategoryNavigation />;
  }

  try {
    let data;
    let searchType = "";

    if (query) {
      data = await searchMovies(query, page);
      searchType = `Search Results for "${query}"`;
    } else if (category) {
      data = await getMoviesByCategory(category, page);
      const categoryNames: Record<string, string> = {
        popular: "Popular Movies",
        top_rated: "Top Rated Movies",
        upcoming: "Coming Soon",
        now_playing: "Now Playing",
      };
      searchType = categoryNames[category] || "Movies";
    }

    if (!data || data.results.length === 0) {
      return (
        <div className="p-12 text-center">
          <h3 className="mb-2 text-xl font-semibold">No movies found</h3>
          <p className="text-muted-foreground mb-4">
            Try searching with different keywords or browse our categories
          </p>
          <ClearResultsButton />
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{searchType}</h2>
          <ClearResultsButton />
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
          {data.results.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <LoadMoreButton currentPage={data.page} totalPages={data.total_pages} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching movies:", error);
    return (
      <div className="flex items-center justify-center p-8 text-center">
        <div className="text-destructive flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <span>Failed to load movies. Please try again.</span>
        </div>
      </div>
    );
  }
}

function MovieResultsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="bg-muted h-8 w-48 animate-pulse rounded" />
        <div className="bg-muted h-10 w-32 animate-pulse rounded" />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="bg-muted aspect-[2/3] animate-pulse rounded-lg" />
            <div className="space-y-2">
              <div className="bg-muted h-4 animate-pulse rounded" />
              <div className="bg-muted h-3 w-3/4 animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function MovieSearchPage({
  searchParams,
}: SearchPageProps) {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">
              Movie Search
            </h1>
            <p className="text-muted-foreground">
              Discover your next favorite movie
            </p>
          </div>
          <SearchForm />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<MovieResultsSkeleton />}>
          <MovieResults searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}
