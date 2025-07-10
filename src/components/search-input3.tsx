"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import debounce from "debounce";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  initialQuery: string;
}

export function SearchInput({ initialQuery }: SearchInputProps) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(initialQuery || "");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Debounced function to update the URL and trigger server-side fetch
  const debouncedUpdate = useCallback(
    debounce((newQuery: string) => {
      const params = new URLSearchParams(searchParams);

      if (newQuery.trim()) {
        params.set("q", newQuery.trim());
      } else {
        params.delete("q");
      }

      // Use the current path for explore page
      replace(`/explore?${params.toString()}`);
    }, 300),
    [searchParams, replace],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      setQuery(newQuery);
      debouncedUpdate(newQuery);
    },
    [debouncedUpdate],
  );

  const handleClear = useCallback(() => {
    setQuery("");
    const params = new URLSearchParams(searchParams);
    params.delete("q");
    replace(`/explore?${params.toString()}`);
  }, [searchParams, replace]);

  return (
    <div className="relative">
      <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#b3b3b3]" />
      <Input
        ref={inputRef}
        type="search"
        placeholder="Search movies by title..."
        className="rounded-xl border-[#3f1728]/20 bg-[#3f1728]/10 py-6 pr-12 pl-12 text-lg focus:border-[#e2bbd1] focus:ring-1 focus:ring-[#e2bbd1]"
        value={query}
        onChange={handleInputChange}
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute top-1/2 right-4 -translate-y-1/2 text-[#b3b3b3] transition-colors hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
