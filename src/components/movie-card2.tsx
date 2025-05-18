import Image from "next/image";
import { Star } from "lucide-react";
import { MovieType } from "@/lib/types";
import { getPoster, getReleaseYear } from "@/lib/utils";
import Link from "next/link";

export function MovieCard2({ movie }: { movie: MovieType }) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="group relative overflow-hidden rounded-lg transition-all hover:scale-105">
        <div className="aspect-[2/3] w-full overflow-hidden rounded-lg">
          <Image
            src={getPoster(movie)}
            alt={movie.title}
            width={300}
            height={450}
            className="h-full w-full object-cover transition-all"
          />
          <div className="from-tertiary/90 via-tertiary/30 absolute inset-0 bg-gradient-to-t to-transparent" />
        </div>

        <div className="absolute right-0 bottom-0 left-0 p-2 sm:p-4">
          <div className="flex items-start justify-between">
            <div className="max-w-[70%]">
              <h3 className="line-clamp-2 text-xs font-bold sm:text-sm md:text-base">
                {movie.title}
              </h3>
              <p className="text-[10px] text-[#b3b3b3] sm:text-xs">
                {getReleaseYear(movie.release_date)}
              </p>
            </div>
            <div className="bg-primary/20 flex items-center gap-1 rounded-md px-1.5 py-0.5 sm:px-2 sm:py-1">
              <Star className="fill-primary text-primary h-2.5 w-2.5 sm:h-3 sm:w-3" />
              <span className="text-[10px] font-medium sm:text-xs">
                {Math.round(movie.vote_average * 10) / 10}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
