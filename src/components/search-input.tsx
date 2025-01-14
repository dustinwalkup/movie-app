"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = debounce((newQuery: string) => {
    const params = new URLSearchParams(searchParams);

    if (newQuery) {
      params.set("q", newQuery);
    } else {
      params.delete("q");
    }

    replace(`/?${params.toString()}`);
  }, 300);

  return (
    <div>
      <Input
        ref={inputRef}
        type="text"
        onChange={(e) => handleInputChange(e.target.value)}
        defaultValue={initialQuery}
        className="text-black"
      />
    </div>
  );
}
