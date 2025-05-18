import { Plus, Award, Filter } from "lucide-react";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import { fetchMovie } from "@/lib/services/tmdb";
import { MovieType } from "@/lib/types";
import { AnimatedBackground } from "@/components/animated-background";
import { Button } from "@/components/ui/button";
import { MovieCard2 } from "@/components/movie-card2";
import { StreamingPlatform } from "@/components/streaming-platform";
import { FilterChip } from "@/components/filter-chip";
import SearchInput2 from "@/components/search-input2";

// Hero Section
const HERO_TITLE = "Find Where to Stream Any Movie";
const HERO_DESCRIPTION =
  "Search, filter, and save movies from all major platforms";
const GET_STARTED = "Get Started Now";
const SIGN_IN = "Sign In";

// Features Section
const FEATURES_TITLE = "Everything You Need to Find Your Next Watch";
const WATCHLIST = "Watchlist";
const WATCHLIST_DESCRIPTION =
  "Save movies and shows to watch later with a single click";
const ADVANCED_FILTERS = "Advanced Filters";
const ADVANCED_FILTERS_DESCRIPTION =
  "Filter by genre, runtime, rating, and available streaming platforms";
const AWARDS_AND_RECOGNITION = "Awards & Recognition";
const AWARDS_AND_RECOGNITION_DESCRIPTION =
  "See which movies have won awards and critical acclaim";

// Streaming Platforms Section
const PLATFORMS_TITLE = "All Your Favorite Platforms";
const PLATFORMS_DESCRIPTION =
  "Find content across all major streaming services in one place";
const STREAMING_PLATFORMS = [
  { name: "Netflix", logo: "/brands/netflix.webp" },
  { name: "Hulu", logo: "/brands/hulu.webp" },
  { name: "Max", logo: "/brands/max.webp" },
  { name: "Prime Video", logo: "/brands/prime.webp" },
  { name: "Disney+", logo: "/brands/disney-plus.webp" },
  { name: "Apple TV+", logo: "/brands/apple.webp" },
];

// Filter preview section
const DISCOVER_TITLE = "Discover Your Next Favorite";
const FILTERS = [
  { label: "Action" },
  { label: "Comedy" },
  { label: "Drama" },
  { label: "Sci-Fi" },
  { label: "Horror" },
  { label: "Under 2 hours" },
  { label: "Netflix" },
  { label: "Hulu" },
  { label: "4+ Stars" },
];

// CTA section
const CTA_TITLE = "Ready to Find Your Next Watch?";
const CTA_DESCRIPTION =
  "Join thousands of movie lovers who use StreamFinder to discover new content";

export default async function Home() {
  const MOVIES = ["157336", "680", "310131", "238"];
  const fetchedMovies = await Promise.all([
    ...MOVIES.map((id) => fetchMovie(id)),
  ]);
  return (
    <div>
      {/* Hero Section */}
      <section className="relative mx-auto flex min-h-screen flex-col items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <div className="mobile-padding relative z-10 container mx-auto flex flex-col items-center text-center">
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {HERO_TITLE}
          </h1>
          <p className="!text-muted-foreground mt-6 max-w-2xl text-lg md:text-xl">
            {HERO_DESCRIPTION}
          </p>

          <div className="mt-10 w-full max-w-md">
            <SearchInput2 />
          </div>

          <div className="flex gap-4">
            <RegisterLink>
              <Button className="mt-10" size="lg">
                {GET_STARTED}
              </Button>
            </RegisterLink>
            <LoginLink>
              <Button className="mt-10" variant={"secondary"} size="lg">
                {SIGN_IN}{" "}
              </Button>
            </LoginLink>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="bg-muted/50 mobile-padding py-20">
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
            {FEATURES_TITLE}
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-card flex flex-col items-center rounded-lg p-6 text-center">
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <Plus className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{WATCHLIST}</h3>
              <p className="text-muted-foreground">{WATCHLIST_DESCRIPTION}</p>
            </div>

            <div className="bg-card flex flex-col items-center rounded-lg p-6 text-center">
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <Filter className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{ADVANCED_FILTERS}</h3>
              <p className="text-muted-foreground">
                {ADVANCED_FILTERS_DESCRIPTION}
              </p>
            </div>

            <div className="bg-card flex flex-col items-center rounded-lg p-6 text-center">
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <Award className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">
                {AWARDS_AND_RECOGNITION}
              </h3>
              <p className="text-muted-foreground">
                {AWARDS_AND_RECOGNITION_DESCRIPTION}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Streaming Platforms */}
      <section id="platforms" className="bg-muted/90 mobile-padding py-20">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">
            {PLATFORMS_TITLE}
          </h2>
          <p className="text-muted-foreground mx-auto mb-12 max-w-2xl">
            {PLATFORMS_DESCRIPTION}{" "}
          </p>

          <div className="flex flex-wrap justify-center gap-8">
            {STREAMING_PLATFORMS.map((platform) => (
              <StreamingPlatform
                key={platform.name}
                name={platform.name}
                logo={platform.logo}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Filter Preview */}
      <section id="discover" className="mobile-padding py-20">
        <div className="container mx-auto">
          <h2 className="mb-8 text-3xl font-bold tracking-tight">
            {DISCOVER_TITLE}
          </h2>

          <div className="mb-8 flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <FilterChip key={filter.label} label={filter.label} />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {fetchedMovies
              .filter((movie): movie is MovieType => movie !== null)
              .map((movie) => (
                <MovieCard2 key={movie.id} movie={movie} />
              ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-primary/10 mobile-padding py-20">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">
            {CTA_TITLE}
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl">
            {CTA_DESCRIPTION}
          </p>
          <RegisterLink>
            <Button size="lg">{GET_STARTED}</Button>
          </RegisterLink>
        </div>
      </section>
    </div>
  );
}
