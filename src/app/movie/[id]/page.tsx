import Image from "next/image";

import {
  getDirector,
  getPoster,
  getReleaseYear,
  getRuntime,
  parseStreamingServices,
} from "@/lib/utils";
import { fetchMovie, fetchStreamingServices } from "@/lib/services/tmdb";
import { StreamingIcon, WatchlistButton } from "@/components";
import { isMovieInWatchlist } from "@/lib/data-access";

type MovieParams = {
  params: Promise<{ id: string }>;
};

export default async function Movie({ params }: MovieParams) {
  const { id } = await params;
  const [movieDetails, streamingServices, isOnWatchlist] = await Promise.all([
    fetchMovie(id),
    fetchStreamingServices(id),
    isMovieInWatchlist(id),
  ]);

  const title = `${movieDetails?.title} (${getReleaseYear(movieDetails?.release_date)})`;
  const director = getDirector(movieDetails?.credits.crew);
  const runtime = getRuntime(movieDetails?.runtime);
  const genres = movieDetails?.genres;
  const { flatrate, buy, rent } = parseStreamingServices(streamingServices);

  return (
    <main className="container mx-auto p-4 md:p-20">
      <div className="flex flex-col gap-20 md:flex-row md:gap-0">
        <div className="flex flex-col items-center gap-3">
          <div className="flex min-w-[200px] items-center justify-center md:mr-20 md:items-start">
            <div className="flex flex-col items-center gap-3">
              <Image
                alt={title}
                src={getPoster(movieDetails)}
                width={200}
                height={300}
                priority
                className="object-cover"
              />
              <WatchlistButton isOnWatchlist={isOnWatchlist} tmdbMovieId={id} />
            </div>
          </div>
        </div>

        <div>
          <h1 className="mb-3 text-3xl font-bold">{title}</h1>
          <div className="mb-3">
            <p>Directed by {director}</p>
            {genres &&
              genres.map((genre, idx) => (
                <span key={genre.id}>
                  {genre.name} {idx < genres.length - 1 && " | "}
                </span>
              ))}
            {runtime && <p>{runtime}</p>}
          </div>
          <p className="mb-3">{movieDetails?.overview}</p>
          <div className="flex flex-col gap-3">
            {flatrate.length > 0 && (
              <div>
                <p className="mb-2">Stream</p>
                <div className="flex flex-wrap gap-3">
                  {flatrate.map((item) => (
                    <StreamingIcon
                      key={item.provider_id}
                      streamingItem={item}
                    />
                  ))}
                </div>
              </div>
            )}
            {buy.length > 0 && (
              <div>
                <p className="mb-2">Buy</p>
                <div className="flex flex-wrap gap-3">
                  {buy.map((item) => (
                    <StreamingIcon
                      key={item.provider_id}
                      streamingItem={item}
                    />
                  ))}
                </div>
              </div>
            )}
            {rent.length > 0 && (
              <div>
                <p className="mb-2">Rent</p>
                <div className="flex flex-wrap gap-3">
                  {rent.map((item) => (
                    <StreamingIcon
                      key={item.provider_id}
                      streamingItem={item}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
