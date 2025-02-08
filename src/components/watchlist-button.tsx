"use client";
import { toggleWatchlist } from "@/lib/actions";
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface WatchlistButtonProps {
  isOnWatchlist: boolean;
  tmdbMovieId: string;
}

export default function WatchlistButton({
  isOnWatchlist,
  tmdbMovieId,
}: WatchlistButtonProps) {
  const { isAuthenticated } = useKindeBrowserClient();
  if (!isAuthenticated) {
    return <LoginLink>Login to add to watchlist</LoginLink>;
  }
  return (
    <button onClick={() => toggleWatchlist(tmdbMovieId)}>
      {" "}
      {isOnWatchlist ? "Remove from watchlist" : "Add to watchlist"}{" "}
    </button>
  );
}
