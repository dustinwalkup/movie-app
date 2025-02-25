"use client";

import { useOptimistic, useTransition } from "react";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toggleWatchlist } from "@/lib/actions";
import { Button } from "./ui/button";
interface WatchlistButtonProps {
  isOnWatchlist: boolean;
  tmdbMovieId: string;
  isLoggedIn: boolean;
}

export default function WatchlistButton({
  isOnWatchlist,
  tmdbMovieId,
  isLoggedIn,
}: WatchlistButtonProps) {
  const [optimisticIsOnWatchlist, toggleIsOnWatchlist] = useOptimistic(
    isOnWatchlist,
    () => !isOnWatchlist,
  );

  const [, startTransition] = useTransition();

  async function clientAction() {
    startTransition(() => {
      toggleIsOnWatchlist(!optimisticIsOnWatchlist);
    });
    await toggleWatchlist(tmdbMovieId);
  }

  if (!isLoggedIn) {
    return (
      <Dialog>
        <DialogTrigger>
          <span className="flex items-center gap-2">
            <span className="rounded-full bg-gray-200 bg-opacity-20 p-2 text-base">
              <PlusIcon className="size-4" />
            </span>
            <span className="text-sm">My watchlist</span>
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              Please login or create an account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <LoginLink>
              <Button className="w-full">Login</Button>
            </LoginLink>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="text-muted-foreground bg-black px-4">Or</span>
              </div>
            </div>
            <RegisterLink>
              <Button className="w-full" variant={"outline"}>
                Create Account
              </Button>
            </RegisterLink>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <button onClick={clientAction} className="flex items-center gap-2">
      <span className="flex items-center gap-2">
        <span className="rounded-full bg-gray-200 bg-opacity-20 p-2 text-base">
          {optimisticIsOnWatchlist ? (
            <MinusIcon className="size-4" />
          ) : (
            <PlusIcon className="size-4" />
          )}
        </span>
        <span className="text-sm">My watchlist</span>
      </span>
    </button>
  );
}
