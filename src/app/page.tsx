import Image from "next/image";
import Link from "next/link";

import { getPoster, getReleaseYear } from "@/lib/utils";
import { fetchMovies } from "@/lib/services/tmdb";
import { MovieType } from "@/lib/types";
import { SearchInput } from "@/components/";

interface SearchParamsProps {
  searchParams: Promise<{ q: string }>;
}

export default async function Home({ searchParams }: SearchParamsProps) {
  const { q } = await searchParams;
  const movies = await fetchMovies(q);

  if (q?.length > 0 && !movies) {
    return <div className="h-screen w-full text-red-500">Loading...</div>;
  }

  return (
    <main className="flex h-screen flex-col items-center justify-start p-6 sm:p-20">
      <SearchInput initialQuery={q} />
      <div className="grid grid-cols-2 gap-3 pt-8 text-white sm:p-12 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {movies.length > 0 ? (
          movies.map((movie: MovieType) => {
            const releaseDate = getReleaseYear(movie.release_date);
            return (
              <div
                key={movie.id}
                className="w-(--poster-width) [--poster-width:160px] md:w-40"
              >
                <Link
                  href={`/movie/${movie.id}`}
                  className="flex h-full flex-col items-start justify-between"
                >
                  <div className="h-60 w-[--poster-width] overflow-hidden rounded-md md:h-60 md:w-40">
                    <Image
                      alt={`Movie Poster for ${movie.title} (${releaseDate})`}
                      src={getPoster(movie)}
                      width={192}
                      height={288}
                      className="object-fit h-full transition-transform hover:scale-105"
                    />
                  </div>
                  {/* <div className="mt-2">
                    <p className="text-sm font-bold text-slate-50">
                      {movie.title}
                    </p>
                    <p className="text-xs text-gray-400">{releaseDate}</p>
                  </div> */}
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
