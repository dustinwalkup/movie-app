import Image from "next/image";

import { cn, getPoster, getReleaseYear } from "@/lib/utils";

import { MovieType } from "@/lib/types";

interface MovieCardProps extends React.HTMLAttributes<HTMLDivElement> {
  movie: MovieType;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export default function MovieCard({
  movie,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: MovieCardProps) {
  console.log("MOVIE", movie);
  const releaseYear = getReleaseYear(movie.release_date);

  return (
    <div
      className={cn(
        "w-(--poster-width) space-y-3 [--poster-width:160px] md:w-40",
        className,
      )}
      {...props}
    >
      <div className="overflow-hidden rounded-md">
        <Image
          alt={`Movie Poster for ${movie.title})`}
          src={getPoster(movie)}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square",
          )}
        />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="leading-none font-medium">{movie.title}</h3>
        <p className="text-muted-foreground text-xs">{releaseYear}</p>
      </div>
    </div>
  );
}
