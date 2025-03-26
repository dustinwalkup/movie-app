import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import {
  getDirector,
  getMostResentTrailer,
  getPoster,
  getReleaseYear,
  getRuntime,
  parseStreamingServices,
} from "@/lib/utils";
import { fetchMovie } from "@/lib/services/tmdb";
import { fetchStreamingServices } from "@/lib/services/watch-mode";
import {
  BackButton,
  StreamingIcon,
  WatchlistButton,
  TrailerButton,
} from "@/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isMovieInWatchlist } from "@/lib/data-access";

type MovieParams = {
  params: Promise<{ id: string }>;
};

export default async function Movie({ params }: MovieParams) {
  const { id } = await params;
  const [
    movieDetails,
    // streamingServices,
    isOnWatchlist,
    streamingAvailability,
  ] = await Promise.all([
    fetchMovie(id),
    // fetchStreamingServices(id),
    isMovieInWatchlist(id),
    fetchStreamingServices(id),
  ]);

  // console.log("streamingAvailability", streamingAvailability);

  const { isAuthenticated } = await getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  const title = `${movieDetails?.title} (${getReleaseYear(movieDetails?.release_date)})`;
  const director = getDirector(movieDetails?.credits.crew);
  const runtime = getRuntime(movieDetails?.runtime);
  const trailer = getMostResentTrailer(movieDetails);
  const genres = movieDetails?.genres;
  const { freeSub, buy, rent } = parseStreamingServices(streamingAvailability);

  const isFreeSub = freeSub.length > 0;
  const isRent = rent.length > 0;
  const isBuy = buy.length > 0;

  const defaultTab = isFreeSub ? "free-subscription" : isRent ? "rent" : "buy";

  return (
    <main className="">
      <BackButton title={movieDetails?.title} />
      <div className="relative flex h-[230px] w-full flex-col items-center overflow-hidden">
        <div className="absolute bottom-0 z-20 h-1/3 w-full bg-gradient-to-b from-transparent to-black" />
        <Image
          alt={title}
          src={getPoster(movieDetails, true)}
          width={400}
          height={230}
          priority
          className="h-full w-full overflow-hidden object-cover"
        />
        <div className="absolute bottom-0 left-0 z-20 bg-opacity-10 px-4 py-1 text-lg font-bold text-white shadow-lg">
          {movieDetails?.title}
        </div>
      </div>
      <div className="flex justify-between px-4 py-1">
        <div>
          {runtime && (
            <span className="pr-1 text-sm text-gray-300">{runtime} |</span>
          )}
          <span className="text-sm text-gray-300">
            {getReleaseYear(movieDetails?.release_date)}
          </span>
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="mb-4 text-sm">
          <p>Directed by {director}</p>
          {genres &&
            genres.map((genre, idx) => (
              <span key={genre.id}>
                {genre.name} {idx < genres.length - 1 && " | "}
              </span>
            ))}
        </div>
        <div className="mb-4 flex gap-3">
          <WatchlistButton
            isOnWatchlist={isOnWatchlist}
            tmdbMovieId={id}
            isLoggedIn={isLoggedIn}
          />
          {trailer && <TrailerButton trailer={trailer} />}
        </div>
        <p className="mb-3">{movieDetails?.overview}</p>
        <Tabs defaultValue={defaultTab} className="text-sm">
          <TabsList>
            {isFreeSub && (
              <TabsTrigger value="free-subscription">
                Free/Subscription
              </TabsTrigger>
            )}
            {isRent && <TabsTrigger value="rent">Rent</TabsTrigger>}
            {isBuy && <TabsTrigger value="buy">Buy</TabsTrigger>}
          </TabsList>

          <TabsContent value="free-subscription">
            {isFreeSub && (
              <div className="flex flex-wrap items-center gap-3">
                {freeSub.map((item, idx) => (
                  <StreamingIcon key={idx} streamingItem={item} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="rent">
            {isRent && (
              <div className="flex flex-wrap items-center gap-3">
                {rent.map((item, idx) => (
                  <StreamingIcon key={idx} streamingItem={item} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="buy">
            {isBuy && (
              <div className="flex flex-wrap items-center gap-3">
                {buy.map((item, idx) => (
                  <StreamingIcon key={idx} streamingItem={item} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
