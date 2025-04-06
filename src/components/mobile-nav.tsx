"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bars2Icon,
  XMarkIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { Video } from "lucide-react";

const navItems = [
  "Product",
  "Solutions",
  "Resources",
  "Open Source",
  "Enterprise",
  "Pricing",
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="[--nav-height: '60px'] h-(--nav-height) relative z-50 flex w-full items-center bg-[#010026]">
      {/* Top Nav */}
      <div className="flex w-full items-center justify-between px-4 text-white">
        <button
          aria-label="Toggle Menu"
          className="relative flex size-8 items-center justify-center focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="relative flex h-[.8rem] w-6 flex-col items-center justify-between">
            <motion.span
              className="absolute h-0.5 w-6 origin-center rounded bg-white"
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute top-2.5 h-0.5 w-6 origin-center rounded bg-white"
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -5 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </button>

        <VideoCameraIcon className="size-8 text-white" />

        <button className="rounded-md border border-white px-4 py-1">
          Sign in
        </button>
      </div>

      {/* Slide-up Menu */}
      {isOpen && (
        <motion.div
          initial={{ height: 0 }} // Start from off-screen top
          animate={{ height: "100%" }} // Animate to its normal position
          exit={{ y: "-100%" }} // Exit back to the top
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed left-0 right-0 top-16 h-full bg-white px-6 pt-4 shadow-xl"
        >
          <ul className="space-y-6 text-lg font-medium text-gray-900">
            {navItems.map((item) => (
              <li key={item} className="flex items-center justify-between">
                {item}
                <span className="text-gray-400">{">"}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <input
              type="text"
              placeholder="Search or jump to..."
              className="w-full rounded-md border px-4 py-2 focus:outline-none"
            />
            <button className="mt-4 w-full rounded-md bg-black py-3 font-semibold text-white">
              Sign up
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
