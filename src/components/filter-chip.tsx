import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterChipProps {
  label: string;
}

export function FilterChip({ label }: FilterChipProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="h-8 rounded-full px-3 text-xs font-medium"
    >
      {label}
      <X className="ml-1 h-3 w-3" />
    </Button>
  );
}
