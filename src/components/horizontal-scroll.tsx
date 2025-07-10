"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
  showControls?: boolean;
}

export function HorizontalScroll({
  children,
  className,
  itemClassName,
  showControls = true,
}: HorizontalScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 5,
    );
    setShowArrows(container.scrollWidth > container.clientWidth);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollability();

    // Check on resize and orientation change
    window.addEventListener("resize", checkScrollability);
    window.addEventListener("orientationchange", checkScrollability);

    // Check when content changes
    const observer = new ResizeObserver(checkScrollability);
    observer.observe(container);

    // Check on scroll
    container.addEventListener("scroll", checkScrollability);

    return () => {
      window.removeEventListener("resize", checkScrollability);
      window.removeEventListener("orientationchange", checkScrollability);
      container.removeEventListener("scroll", checkScrollability);
      observer.disconnect();
    };
  }, [checkScrollability]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.75;
    const newScrollPosition =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });
  };

  // Wrap each child with the scroll-item class
  const wrappedChildren = React.Children.map(children, (child) => {
    return <div className={cn("scroll-item", itemClassName)}>{child}</div>;
  });

  return (
    <div className="group relative">
      <div
        ref={scrollContainerRef}
        className={cn("scroll-container touch-pan-x", className)}
        data-testid="scroll-container"
      >
        {wrappedChildren}
      </div>

      {showControls && showArrows && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className={cn(
              "absolute top-1/2 left-0 z-10 hidden -translate-y-1/2 rounded-full shadow-lg md:flex",
              canScrollLeft ? "opacity-80" : "pointer-events-none opacity-30",
            )}
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className={cn(
              "absolute top-1/2 right-0 z-10 hidden -translate-y-1/2 rounded-full shadow-lg md:flex",
              canScrollRight ? "opacity-80" : "pointer-events-none opacity-30",
            )}
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}
    </div>
  );
}
