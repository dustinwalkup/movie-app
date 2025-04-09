"use client";

import { useOptimistic, useState, useTransition } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

import { toggleWatchlist } from "@/lib/actions";
import { AuthModal } from ".";
import { MovieType } from "@/lib/types";
interface WatchlistButtonProps {
  isOnWatchlist: boolean;
  movieDetails: MovieType;
  isLoggedIn: boolean;
}

export default function WatchlistButton({
  isOnWatchlist,
  movieDetails,
  isLoggedIn,
}: WatchlistButtonProps) {
  const [optimisticIsOnWatchlist, toggleIsOnWatchlist] = useOptimistic(
    isOnWatchlist,
    () => !isOnWatchlist,
  );

  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function clientAction() {
    setErrorMessage(null);
    startTransition(async () => {
      toggleIsOnWatchlist(!optimisticIsOnWatchlist);
      const result = await toggleWatchlist(
        movieDetails,
        optimisticIsOnWatchlist,
      );

      if (!result.success) {
        toggleIsOnWatchlist(isOnWatchlist); // Revert optimistic update on failure
        setErrorMessage("Failed to update watchlist.");
        console.error("Watchlist update failed:", result?.error);
      }
    });
  }

  if (!isLoggedIn) {
    return (
      <AuthModal>
        <span className="flex items-center gap-2">
          <span className="bg-opacity-20 rounded-full bg-gray-200 p-2 text-base">
            <PlusIcon className="size-4" />
          </span>
          <span className="text-sm">Watchlist</span>
        </span>
      </AuthModal>
    );
  }

  return (
    <>
      <button
        className="flex items-center gap-2"
        disabled={isPending}
        onClick={clientAction}
      >
        <span className="flex items-center gap-2">
          <span className="bg-opacity-20 rounded-full bg-gray-200 p-2 text-base">
            {optimisticIsOnWatchlist ? (
              <MinusIcon className="size-4" />
            ) : (
              <PlusIcon className="size-4" />
            )}
          </span>
          <span className="text-sm">Watchlist</span>
        </span>
      </button>
      {errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </>
  );
}
