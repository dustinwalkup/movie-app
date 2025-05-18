"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

const SEARCH_PLACEHOLDER = "Search for a movie...";

export default function SearchInput() {
  const [term, setTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      router.push(`/search?q=${encodeURIComponent(term.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 w-full max-w-md">
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder={SEARCH_PLACEHOLDER}
          className="py-6 pr-4 pl-10 text-base"
        />
      </div>
    </form>
  );
}
