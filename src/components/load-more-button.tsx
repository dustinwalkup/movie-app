"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LoadMoreButtonProps {
  currentPage: number;
  totalPages: number;
}

export function LoadMoreButton({
  currentPage,
  totalPages,
}: LoadMoreButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleLoadMore = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("page", (currentPage + 1).toString());
      router.push(`/search?${params.toString()}`);
    });
  };

  if (currentPage >= totalPages) {
    return null;
  }

  return (
    <div className="flex justify-center pt-8">
      <Button onClick={handleLoadMore} disabled={isPending} size="lg">
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          "Load More Movies"
        )}
      </Button>
    </div>
  );
}
