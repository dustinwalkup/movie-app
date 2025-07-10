"use client";

import type React from "react";

import { useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(currentQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      startTransition(() => {
        const params = new URLSearchParams(searchParams);
        params.set("q", query.trim());
        params.delete("category"); // Remove category when searching
        params.delete("page"); // Reset to first page
        router.push(`/search?${params.toString()}`);
      });
    }
  };

  const handleClear = () => {
    setQuery("");
    startTransition(() => {
      router.push(pathname);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="relative mx-auto w-full max-w-2xl">
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
        <Input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="focus:border-primary h-12 rounded-full border-2 pr-20 pl-10 text-lg"
          disabled={isPending}
        />
        <div className="absolute top-1/2 right-2 flex -translate-y-1/2 transform gap-1">
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-8 w-8 rounded-full p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            type="submit"
            size="sm"
            disabled={!query.trim() || isPending}
            className="h-8 rounded-full px-4"
          >
            {isPending ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>
    </form>
  );
}
