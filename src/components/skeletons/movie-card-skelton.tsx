import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type MovieCardSkeletonProps = {
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
};

export default function MovieCardSkeleton({
  aspectRatio = "portrait",
  width,
  height,
}: MovieCardSkeletonProps) {
  return (
    <div className="flex h-full w-full flex-col justify-between space-y-3">
      <div className="rounded-md">
        <Skeleton
          className={cn(
            "h-auto w-full object-cover",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square",
            width && height
              ? `h-[${height}px] w-[${width}px]`
              : "h-[125px] w-[250px]",
          )}
          style={{ width: "100%", height: "100%" }} // Ensure it fills the container
        />
      </div>
      <div className="space-y-1 text-sm">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  );
}
