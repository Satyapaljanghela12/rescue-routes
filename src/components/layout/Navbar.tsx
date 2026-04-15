"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About Us", href: "/about" },
  { name: "Mission", href: "/mission" },
  { name: "Campaigns", href: "/campaigns" },
  { name: "Stories", href: "/stories" },
  { name: "Volunteers", href: "/volunteers" },
  { name: "Store", href: "/store" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "px-3 pt-3 sm:px-5" : ""}`}>
      <div
        className={`mx-auto border transition-all duration-300 ${
          scrolled
            ? "max-w-7xl rounded-full border-black/8 bg-white/96 shadow-[0_16px_45px_rgba(20,20,20,0.08)] backdrop-blur-xl"
            : "max-w-none rounded-none border-transparent bg-white shadow-none"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-2.5 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-black/8 bg-white">
              <Image src="/logo.png" alt="Rescue Routes" fill className="object-contain p-1.5" priority />
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium uppercase tracking-[0.16em] transition ${
                  "text-black/75 hover:text-black"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/membership"
              className={`rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                "border-black/10 text-black hover:border-black/20 hover:bg-black/3"
              }`}
            >
              Join
            </Link>
            <Link
              href="/donate"
              className="rounded-full bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-primary-deep"
            >
              Donate
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className={`inline-flex rounded-full p-2.5 lg:hidden ${
              scrolled ? "text-foreground" : "text-white"
            }`}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="border-t border-black/8 px-4 pb-5 pt-3 lg:hidden"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-medium uppercase tracking-[0.14em] text-foreground/80 transition hover:bg-[#fac602]/12 hover:text-primary"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/membership"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-black/10 px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-foreground"
                >
                  Join
                </Link>
                <Link
                  href="/donate"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-primary px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white"
                >
                  Donate
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
