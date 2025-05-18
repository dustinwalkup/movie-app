import Link from "next/link";

import { fetchMovies } from "@/lib/services/tmdb";
import { MovieType } from "@/lib/types";
import { MovieCard, SearchInput } from "@/components/";
import { MovieCardSkeleton } from "@/components/skeletons";

interface SearchParamsProps {
  searchParams: Promise<{ q: string }>;
}

const NUMBER_OF_SKELETONS = 20;

export default async function SearchPage({ searchParams }: SearchParamsProps) {
  const { q } = await searchParams;
  const movies = await fetchMovies(q);

  if (q?.length > 0 && !movies) {
    return <div className="h-screen w-full text-red-500">Loading...</div>;
  }

  return (
    <main className="flex h-screen flex-col items-center justify-start p-6 sm:p-20">
      <SearchInput initialQuery={q} />
      <div className="grid grid-cols-2 gap-4 pt-8 text-white sm:p-12 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {q?.length > 0 && !movies ? (
          // Render skeletons while loading
          Array.from({ length: NUMBER_OF_SKELETONS }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="w-(--poster-width) [--poster-width:160px] md:w-40"
            >
              <div className="flex h-full flex-col items-start justify-between">
                <MovieCardSkeleton
                  width={192}
                  aspectRatio="portrait"
                  height={288}
                />
              </div>
            </div>
          ))
        ) : movies.length > 0 ? (
          movies.map((movie: MovieType) => {
            return (
              <div
                key={movie.id}
                className="w-(--poster-width) [--poster-width:160px] md:w-40"
              >
                <Link
                  href={`/movie/${movie.id}`}
                  className="flex h-full flex-col items-start justify-between"
                >
                  <MovieCard
                    movie={movie}
                    className="w-(--poster-width)"
                    aspectRatio="portrait"
                    width={192}
                    height={288}
                  />
                </Link>
              </div>
            );
          })
        ) : (
          <div className="col-span-6 h-full w-full items-center justify-center">
            {q?.length > 0 ? "No movies found." : "Search by movie title!"}
          </div>
        )}
      </div>
    </main>
  );
}
