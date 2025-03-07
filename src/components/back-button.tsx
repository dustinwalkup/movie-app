"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

interface BackButtonProps {
  title: string | undefined;
}

export default function BackButton({ title }: BackButtonProps) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 160) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${isScrolled ? "bg-black bg-opacity-90 py-3" : ""} fixed left-0 top-0 z-30 flex w-full items-center justify-center`}
    >
      <button
        type="button"
        onClick={() => router.back()}
        className={`fixed left-0 top-0 z-30 mx-4 my-2 flex aspect-[1/1] items-center justify-center rounded-full bg-opacity-20 p-2 text-base ${isScrolled ? "" : "bg-gray-200"} `}
      >
        <ChevronLeftIcon className="size-4" />
      </button>
      {isScrolled && (
        <span
          className="max-w-full truncate font-bold"
          style={{ maxWidth: "calc(100% - 110px)" }}
        >
          {title}
        </span>
      )}
    </nav>
  );
}
