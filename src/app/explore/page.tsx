import {
  Search,
  Clock,
  Calendar,
  Award,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchMovies } from "@/lib/services/tmdb";
import { MovieType } from "@/lib/types";
import { MovieCard2 } from "@/components/movie-card2";
import { HorizontalScroll } from "@/components/horizontal-scroll";
import { MovieCardSkeleton } from "@/components/skeletons";
import { SearchInput } from "@/components/search-input3";

// Mock data for curated sections (keep this for now)
const mockMovies: MovieType[] = [
  {
    id: 680,
    title: "Pulp Fiction",
    overview:
      "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper.",
    poster_path: "/pulp-fiction-poster.png",
    backdrop_path: "/placeholder-9il39.png",
    runtime: 154,
    vote_average: 8.9,
    release_date: "1994-10-14",
    genres: [
      { id: 80, name: "Crime" },
      { id: 18, name: "Drama" },
    ],
    streaming_services: [
      {
        source_id: 8,
        name: "Netflix",
        type: "sub",
        region: "US",
        ios_url: null,
        android_url: null,
        web_url: "https://www.netflix.com/title/880640",
        format: "HD",
        price: null,
        seasons: 0,
        episodes: 0,
      },
    ],
  },
  {
    id: 238,
    title: "The Godfather",
    overview:
      "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.",
    poster_path: "/classic-film-poster.png",
    backdrop_path: "/placeholder.svg?height=800&width=1200",
    runtime: 175,
    vote_average: 9.2,
    release_date: "1972-03-14",
    genres: [
      { id: 80, name: "Crime" },
      { id: 18, name: "Drama" },
    ],
    streaming_services: [
      {
        source_id: 9,
        name: "Prime Video",
        type: "sub",
        region: "US",
        ios_url: null,
        android_url: null,
        web_url: "https://www.amazon.com/Godfather-Marlon-Brando/dp/B000N6TX5K",
        format: "HD",
        price: null,
        seasons: 0,
        episodes: 0,
      },
    ],
  },
  {
    id: 27205,
    title: "Inception",
    overview:
      "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    poster_path: "/inception-movie-poster.png",
    backdrop_path: "/placeholder.svg?height=800&width=1200",
    runtime: 148,
    vote_average: 8.8,
    release_date: "2010-07-15",
    genres: [
      { id: 28, name: "Action" },
      { id: 878, name: "Science Fiction" },
    ],
    streaming_services: [
      {
        source_id: 8,
        name: "Netflix",
        type: "sub",
        region: "US",
        ios_url: null,
        android_url: null,
        web_url: "https://www.netflix.com/title/70131314",
        format: "HD",
        price: null,
        seasons: 0,
        episodes: 0,
      },
    ],
  },
  {
    id: 155,
    title: "The Dark Knight",
    overview:
      "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
    poster_path: "/dark-knight-poster.png",
    backdrop_path: "/placeholder.svg?height=800&width=1200",
    runtime: 152,
    vote_average: 9.0,
    release_date: "2008-07-16",
    genres: [
      { id: 28, name: "Action" },
      { id: 80, name: "Crime" },
      { id: 18, name: "Drama" },
    ],
    streaming_services: [
      {
        source_id: 384,
        name: "HBO Max",
        type: "sub",
        region: "US",
        ios_url: null,
        android_url: null,
        web_url:
          "https://play.hbomax.com/feature/urn:hbo:feature:GXdMEmwBDo5uAuwEAABZH",
        format: "HD",
        price: null,
        seasons: 0,
        episodes: 0,
      },
    ],
  },
];

const curatedSections = [
  {
    title: "Trending Now",
    icon: TrendingUp,
    movies: mockMovies.slice(0, 4),
  },
  {
    title: "New Releases",
    icon: Sparkles,
    movies: mockMovies.filter(
      (m) => Number.parseInt(m.release_date.split("-")[0]) >= 2019,
    ),
  },
  {
    title: "Short & Sweet (Under 100 mins)",
    icon: Clock,
    movies: mockMovies.filter((m) => m.runtime < 100),
  },
];

interface SearchParamsProps {
  searchParams: Promise<{ q?: string }>;
}

const NUMBER_OF_SKELETONS = 20;

export default async function DiscoverPage({
  searchParams,
}: SearchParamsProps) {
  const { q } = await searchParams;
  const hasSearchQuery = q && q.length > 0;

  // Fetch movies only if there's a search query
  const movies = hasSearchQuery ? await fetchMovies(q) : null;

  return (
    <div className="min-h-screen bg-[#181116] text-white">
      <main className="container max-w-7xl py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Explore Movies
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-[#b3b3b3]">
            Search by title or discover with filters. Find your next favorite
            film.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mx-auto mb-8 max-w-2xl">
          <SearchInput initialQuery={q || ""} />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="mb-6 flex flex-wrap justify-center gap-4">
            {/* Genre Filter */}
            <Button
              variant="outline"
              className="border-[#3f1728]/30 hover:bg-[#3f1728]/20"
              disabled
            >
              Genre (Coming Soon)
            </Button>

            {/* Streaming Service Filter */}
            <Button
              variant="outline"
              className="border-[#3f1728]/30 hover:bg-[#3f1728]/20"
              disabled
            >
              Streaming (Coming Soon)
            </Button>

            {/* Runtime Filter */}
            <Button
              variant="outline"
              className="border-[#3f1728]/30 hover:bg-[#3f1728]/20"
              disabled
            >
              <Clock className="mr-2 h-4 w-4" />
              Runtime (Coming Soon)
            </Button>

            {/* Decade Filter */}
            <Button
              variant="outline"
              className="border-[#3f1728]/30 hover:bg-[#3f1728]/20"
              disabled
            >
              <Calendar className="mr-2 h-4 w-4" />
              Decade (Coming Soon)
            </Button>

            {/* Oscar Winners Filter */}
            <Button
              variant="outline"
              className="border-[#3f1728]/30 hover:bg-[#3f1728]/20"
              disabled
            >
              <Award className="mr-2 h-4 w-4" />
              Oscar Winners (Coming Soon)
            </Button>

            {/* Sort Filter */}
            <Button
              variant="outline"
              className="border-[#3f1728]/30 hover:bg-[#3f1728]/20"
              disabled
            >
              Sort: Popularity (Coming Soon)
            </Button>
          </div>
        </div>

        {/* Search Results or Curated Content */}
        {hasSearchQuery ? (
          // Show search results
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                Search Results for &quot;{q}&quot;
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {!movies ? (
                // Loading skeletons
                Array.from({ length: NUMBER_OF_SKELETONS }).map((_, index) => (
                  <div key={`skeleton-${index}`}>
                    <MovieCardSkeleton
                      width={192}
                      aspectRatio="portrait"
                      height={288}
                    />
                  </div>
                ))
              ) : movies.length > 0 ? (
                // Search results
                movies.map((movie: MovieType) => (
                  <MovieCard2 key={movie.id} movie={movie} />
                ))
              ) : (
                // No results
                <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#3f1728]/30">
                    <Search className="h-8 w-8 text-[#e2bbd1]/70" />
                  </div>
                  <h3 className="mb-2 text-xl font-medium">No movies found</h3>
                  <p className="max-w-md text-[#b3b3b3]">
                    No movies found for &quot;{q}&quot;. Try a different search
                    term.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Show curated sections (no search query)
          <div className="space-y-12">
            {curatedSections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.title}>
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="flex items-center gap-3 text-2xl font-semibold">
                      <Icon className="h-6 w-6 text-[#e2bbd1]" />
                      {section.title}
                    </h2>
                    <Button
                      variant="ghost"
                      className="text-[#e2bbd1] hover:bg-[#e2bbd1]/10"
                    >
                      View All
                    </Button>
                  </div>

                  <HorizontalScroll itemClassName="w-[180px] md:w-[200px]">
                    {section.movies.map((movie) => (
                      <MovieCard2 movie={movie} key={movie.id} />
                    ))}
                  </HorizontalScroll>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
