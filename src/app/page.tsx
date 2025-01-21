import Image from "next/image";
import Link from "next/link";

import { getPoster, getReleaseYear } from "@/lib/utils";
import { fetchMovies } from "@/lib/services/tmdb";
import { MovieType } from "@/lib/types";
import SearchInput from "@/components/search-input";

interface SearchParamsProps {
  searchParams: Promise<{ q: string }>;
}

export default async function Home({ searchParams }: SearchParamsProps) {
  const { q } = await searchParams;
  const movies = await fetchMovies(q);
  return (
    <div className="flex h-screen flex-col items-center justify-start p-8 sm:p-20">
      <SearchInput initialQuery={q} />
      <div className="grid grid-cols-1 gap-8 pt-4 text-white sm:grid-cols-2 sm:p-12 md:grid-cols-3 lg:grid-cols-4">
        {movies.length > 0 ? (
          movies.map((movie: MovieType) => {
            const releaseDate = getReleaseYear(movie.release_date);
            return (
              <div key={movie.id} className="">
                <Link
                  href={`/movie/${movie.id}`}
                  className="flex h-full flex-col items-center justify-between"
                >
                  <p className="mb-4 text-center">
                    <strong>{movie.title}</strong> ({releaseDate})
                  </p>
                  <Image
                    alt={`Movie Poster for ${movie.title} (${releaseDate})`}
                    src={getPoster(movie)}
                    width={200}
                    height={300}
                    className="object-cover"
                  />
                </Link>
              </div>
            );
          })
        ) : (
          <div className="col-span-4 h-full w-full items-center justify-center">
            {q?.length > 0 ? "No movies found." : "Search by movie title!"}
          </div>
        )}
      </div>
    </div>
  );
}
