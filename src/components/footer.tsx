import Link from "next/link";
import { Film } from "lucide-react";

const FOOTER_TITLE = "StreamFinder";
const FOOTER_COPYRIGHT = `© ${new Date().getFullYear()} StreamFinder. All rights reserved.`;

const FOOTER_LINKS = [
  { name: "About", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
  { name: "Contact", href: "#" },
  { name: "GitHub", href: "#" },
];

export function Footer() {
  return (
    <footer className="mobile-padding border-t py-12">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 flex items-center gap-2 text-xl font-bold md:mb-0">
            <Film className="h-6 w-6" />
            <span>{FOOTER_TITLE}</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="text-muted-foreground mt-8 text-center text-sm">
          {FOOTER_COPYRIGHT}
        </div>
      </div>
    </footer>
  );
}
