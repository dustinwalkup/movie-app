"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

export function ClearResultsButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClear = () => {
    startTransition(() => {
      router.push("/search");
    });
  };

  return (
    <Button variant="outline" onClick={handleClear} disabled={isPending}>
      {isPending ? "Clearing..." : "Clear Results"}
    </Button>
  );
}
