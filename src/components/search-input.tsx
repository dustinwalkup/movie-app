"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import debounce from "debounce";
import { Input } from "./ui/input";

export default function SearchInput({
  initialQuery,
}: {
  initialQuery: string;
}) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(initialQuery || "");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Debounced function to update the URL and trigger the API call
  const debouncedUpdate = debounce((newQuery: string) => {
    const params = new URLSearchParams(searchParams);

    if (newQuery) {
      params.set("q", newQuery);
    } else {
      params.delete("q");
    }

    replace(`/search/?${params.toString()}`);
  }, 300);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      setQuery(newQuery);
      debouncedUpdate(newQuery);
    },
    [],
  );

  const handleClear = () => {
    setQuery(""); // Reset the input value to an empty string
    const params = new URLSearchParams(searchParams);
    params.delete("q");
    replace(`/?${params.toString()}`);
  };

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        type="text"
        onChange={handleInputChange}
        value={query}
        className="pr-10"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute top-1/2 right-2 -translate-y-1/2 transform cursor-pointer text-xl text-gray-500"
        >
          &times;
        </button>
      )}
    </div>
  );
}
