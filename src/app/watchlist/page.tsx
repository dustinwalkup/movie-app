import Link from "next/link";

import { getWatchlist } from "@/lib/data-access";

export default async function WatchlistPage() {
  const { data, error } = await getWatchlist();

  if (error) {
    console.error("Error fetching watchlist:", error);
    return <div>Error fetching watchlist.</div>;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      {data.map((movie) => {
        // console.log(movie);
        return (
          <Link key={movie.id} href={`/movie/${movie.tmdbId}`}>
            {movie.title}
          </Link>
        );
      })}
    </div>
  );
}
