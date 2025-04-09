"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";

import { AuthModal, Icon } from ".";
import { IconName } from "./icon";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
  icon: IconName;
}

const navItems: NavItem[] = [
  {
    label: "Search",
    href: "/search",
    icon: "magnifying-glass",
  },
  {
    label: "Watchlist",
    href: "/watchlist",
    icon: "list-bullet",
  },
  {
    label: "Account",
    href: "/account",
    icon: "user",
  },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigationTriggered, setIsNavigationTriggered] = useState(false);
  const { isAuthenticated } = useKindeBrowserClient();

  function handleNavigationTrigger() {
    setIsNavigationTriggered(true);
    setIsOpen(false);
    setTimeout(() => {
      setIsNavigationTriggered(false);
    }, 1000);
  }

  return (
    <nav className="bg-tertiary relative z-50 flex h-(--nav-height) w-full items-center [--nav-height:--spacing(15)]">
      {/* Top Nav */}
      <div className="flex w-full items-center justify-between px-4 text-white">
        <button
          aria-label="Toggle Menu"
          className="relative flex size-8 items-center justify-center focus:outline-hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="relative flex h-[.8rem] w-6 flex-col items-center justify-between">
            <motion.span
              className="bg-primary absolute h-0.5 w-6 origin-center rounded"
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="bg-primary absolute top-2.5 h-0.5 w-6 origin-center rounded"
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -5 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </button>

        <Link
          href="/"
          className="border-primary bg-secondary absolute left-[50%] -translate-x-1/2 rounded-sm border p-1.5"
        >
          <Icon name="video-camera" className="text-primary size-8" />
        </Link>

        {isAuthenticated && (
          <LogoutLink className="text-primary rounded-md border border-none px-4 py-1 text-sm">
            Sign out
          </LogoutLink>
        )}
        {!isAuthenticated && (
          <AuthModal>
            <span className="text-primary rounded-md border border-none px-4 py-1 text-sm">
              Sign in
            </span>
          </AuthModal>
        )}
      </div>

      {/* Slide-up Menu */}
      <motion.div
        initial={{ height: 0, visibility: isOpen ? "visible" : "hidden" }}
        animate={{
          height: isOpen ? 800 : 0,
          visibility: isOpen ? "visible" : "hidden",
        }}
        transition={{
          duration: isNavigationTriggered ? 0 : 0.3,
          stiffness: 200,
          damping: 10,
        }}
        className="bg-tertiary fixed top-(--nav-height) right-0 left-0 h-full px-6 pt-4 shadow-xl"
      >
        <motion.ul
          initial={{ visibility: isOpen ? "visible" : "hidden" }}
          animate={{
            visibility: isOpen ? "visible" : "hidden",
          }}
          transition={{
            duration: isNavigationTriggered ? 0 : 0.15,
            stiffness: 200,
            damping: 10,
          }}
          className="space-y-6 text-lg font-medium text-gray-900"
        >
          {navItems.map(({ label, icon, href }, idx) => (
            <Link
              key={idx}
              href={href}
              className="flex items-center gap-2 text-white"
              onMouseUp={handleNavigationTrigger}
            >
              <li key={idx} className="flex items-center gap-2 text-white">
                <Icon name={icon} className="size-5" />
                {label}
              </li>
            </Link>
          ))}
        </motion.ul>
      </motion.div>
    </nav>
  );
}
