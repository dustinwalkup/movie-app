import { getWatchlist } from "@/lib/data-access";

export default async function WatchlistPage() {
  const watchlist = await getWatchlist();
  console.log(watchlist);
  return (
    <div>
      <h1>Watchlist</h1>
    </div>
  );
}
