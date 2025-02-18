import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { VideoCameraIcon } from "@heroicons/react/24/outline";

import {
  getDirector,
  getPoster,
  getReleaseYear,
  getRuntime,
  parseStreamingServices,
} from "@/lib/utils";
import { fetchMovie } from "@/lib/services/tmdb";
import { fetchStreamingServices } from "@/lib/services/watch-mode";
import { StreamingIcon, WatchlistButton } from "@/components";
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
  const genres = movieDetails?.genres;
  const { freeSub, buy, rent } = parseStreamingServices(streamingAvailability);

  const isFreeSub = freeSub.length > 0;
  const isRent = rent.length > 0;
  const isBuy = buy.length > 0;

  const defaultTab = isFreeSub ? "free-subscription" : isRent ? "rent" : "buy";

  // console.log("movieDetails", movieDetails);
  // console.log("streamingServices", streamingServices);

  // const flatrate = streamingServices?.flatrate;
  // const ssrent = streamingServices?.rent;
  // const ssbuy = streamingServices?.buy;
  // flatrate?.map(({ provider_name, logo_path }) => {
  //   console.log("Provider name", provider_name);
  //   console.log(`https://image.tmdb.org/t/p/w400${logo_path}`);
  // });
  // ssrent?.map(({ provider_name, logo_path }) => {
  //   console.log("Provider name", provider_name);
  //   console.log(`https://image.tmdb.org/t/p/w400${logo_path}`);
  // });
  // ssbuy?.map(({ provider_name, logo_path }) => {
  //   console.log("Provider name", provider_name);
  //   console.log(`https://image.tmdb.org/t/p/w400${logo_path}`);
  // });

  return (
    <main className="">
      <div className="">
        <div className="relative flex h-[230px] w-full flex-col items-center overflow-hidden">
          <Image
            alt={title}
            src={getPoster(movieDetails, true)}
            width={400}
            height={230}
            priority
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 bg-opacity-10 p-4 text-lg font-bold text-white shadow-lg">
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
      </div>

      <div className="p-4">
        <div className="mb-4 flex gap-3">
          <WatchlistButton
            isOnWatchlist={isOnWatchlist}
            tmdbMovieId={id}
            isLoggedIn={isLoggedIn}
          />
          <span className="flex items-center gap-2">
            <span className="rounded-full bg-gray-200 bg-opacity-20 p-2 text-base">
              <VideoCameraIcon className="size-4" />
            </span>
            <span className="text-sm">Trailer</span>
          </span>
        </div>
        <div className="mb-4 text-sm">
          <p>Directed by {director}</p>
          {genres &&
            genres.map((genre, idx) => (
              <span key={genre.id}>
                {genre.name} {idx < genres.length - 1 && " | "}
              </span>
            ))}
        </div>
        <p className="mb-3">{movieDetails?.overview}</p>
        <Tabs defaultValue={defaultTab} className="w-[400px] text-sm">
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
