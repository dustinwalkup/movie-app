"use client";

import { VideoCameraIcon } from "@heroicons/react/24/outline";
import ReactPlayer from "react-player/youtube";

import { TrailerType } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TrailerButtonProps {
  trailer: TrailerType;
}

export default function TrailerButton({ trailer }: TrailerButtonProps) {
  if (!trailer || !trailer.key) return null;
  const videoUrl = `https://www.youtube.com/watch?v=${trailer.key}`;

  return (
    <div>
      <Dialog>
        <DialogTrigger className="flex items-center gap-2">
          <span className="flex items-center gap-2">
            <span className="rounded-full bg-gray-200 bg-opacity-20 p-2 text-base">
              <VideoCameraIcon className="size-4" />
            </span>
            <span className="text-sm">Trailer</span>
          </span>
        </DialogTrigger>
        <DialogContent className="min-w-[75%] p-0">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <div className="relative pt-[56.25%]">
              <ReactPlayer
                className="absolute left-0 top-0"
                url={videoUrl}
                controls={true}
                width="100%"
                height="100%"
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
