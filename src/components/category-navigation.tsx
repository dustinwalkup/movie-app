"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Star, Clock, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "popular",
    name: "Popular Movies",
    description: "Trending movies everyone is watching",
    icon: Flame,
  },
  {
    id: "top_rated",
    name: "Top Rated",
    description: "Highest rated movies of all time",
    icon: Star,
  },
  {
    id: "upcoming",
    name: "Coming Soon",
    description: "Upcoming releases to watch out for",
    icon: Clock,
  },
  {
    id: "now_playing",
    name: "Now Playing",
    description: "Currently playing in theaters",
    icon: Play,
  },
];

const popularSearches = [
  "Marvel",
  "Action",
  "Comedy",
  "Horror",
  "Sci-Fi",
  "Romance",
  "Thriller",
  "Animation",
];

export function CategoryNavigation() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCategorySelect = (category: string) => {
    startTransition(() => {
      const params = new URLSearchParams();
      params.set("category", category);
      router.push(`/search?${params.toString()}`);
    });
  };

  const handleSearchTerm = (term: string) => {
    startTransition(() => {
      const params = new URLSearchParams();
      params.set("q", term.toLowerCase());
      router.push(`/search?${params.toString()}`);
    });
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold">Discover Movies</h2>
        <p className="text-muted-foreground">
          Browse popular categories or search for specific titles
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.id}
              className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => handleCategorySelect(category.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="bg-primary/10 group-hover:bg-primary/20 rounded-full p-3 transition-colors">
                    <Icon className="text-primary h-6 w-6" />
                  </div>
                </div>
                <h3 className="group-hover:text-primary mb-2 font-semibold transition-colors">
                  {category.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <h3 className="mb-4 text-lg font-semibold">Popular Searches</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {popularSearches.map((term) => (
            <Badge
              key={term}
              variant="secondary"
              className={cn(
                "hover:bg-primary hover:text-primary-foreground cursor-pointer px-3 py-1 transition-colors",
                isPending && "cursor-not-allowed opacity-50",
              )}
              onClick={() => handleSearchTerm(term)}
            >
              {term}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
