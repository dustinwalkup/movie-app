import Image from "next/image";
import { Star, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { MovieType } from "@/lib/types";
import { Movie } from "@/lib/services/tmdb";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  if (!posterUrl) {
    return null;
  }

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "TBA";

  return (
    <Card className="group overflow-hidden py-0 transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={posterUrl || "/placeholder.svg"}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/70 text-white">
            <Star className="fill-primary text-primary mr-1 h-3 w-3" />
            {movie.vote_average.toFixed(1)}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4 pt-0">
        <h3 className="group-hover:text-primary mb-2 line-clamp-2 truncate text-lg font-semibold transition-colors">
          {movie.title}
        </h3>
        <div className="text-muted-foreground mb-2 flex items-center text-sm">
          <Calendar className="mr-1 h-4 w-4" />
          {releaseYear}
        </div>
      </CardContent>
    </Card>
  );
}
