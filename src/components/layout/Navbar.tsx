"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { name: "About Us", href: "/about" },
  { name: "Mission", href: "/mission" },
  { 
    name: "Get Involved", 
    href: "#",
    dropdown: [
      { name: "Campaigns", href: "/campaigns" },
      { name: "Adoption", href: "/adoption" }
    ]
  },
  { name: "Stories", href: "/stories" },
  { name: "Blogs", href: "/blogs" },
  { name: "Volunteers", href: "/volunteers" },
  { name: "Store", href: "/store" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "px-3 pt-3 sm:px-5" : ""}`}>
      <div
        className={`mx-auto border transition-all duration-300 ${
          scrolled
            ? "max-w-7xl lg:rounded-full rounded-none border-black/8 bg-white/96 shadow-[0_16px_45px_rgba(20,20,20,0.08)] backdrop-blur-xl"
            : "max-w-none rounded-none border-transparent bg-white shadow-sm"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-2.5 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className={`relative transition-all duration-300 overflow-hidden rounded-full border border-black/8 bg-white ${scrolled ? "h-10 w-10" : "h-12 w-12"}`}>
              <Image src="/assets/images/brand/logo.png" alt="Rescue Routes" fill sizes="48px" className="object-contain p-1.5" priority />
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              link.dropdown ? (
                <div
                  key={link.name}
                  className="relative"
                  ref={dropdownRef}
                >
                  <button
                    onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                    className={`flex items-center gap-1 text-sm font-medium uppercase tracking-[0.16em] transition ${
                      openDropdown === link.name ? "text-primary" : "text-black/75 hover:text-black"
                    }`}
                  >
                    {link.name}
                    <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${openDropdown === link.name ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {openDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-48 rounded-2xl border border-black/8 bg-white shadow-lg py-2"
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-4 py-2 text-sm font-medium text-black/75 hover:bg-primary/5 hover:text-primary transition"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium uppercase tracking-[0.16em] transition text-black/75 hover:text-black"
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/membership"
              className={`rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                "border-black/10 text-black hover:border-black/20 hover:bg-black/3"
              }`}
            >
              Support
            </Link>
            <Link
              href="/donate"
              className="rounded-full bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-primary-deep shadow-sm"
            >
              Donate
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex rounded-full p-2.5 lg:hidden text-foreground"
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
                  link.dropdown ? (
                    <div key={link.name}>
                      <div className="rounded-2xl px-4 py-3 text-sm font-medium uppercase tracking-[0.14em] text-foreground/80">
                        {link.name}
                      </div>
                      <div className="ml-4 flex flex-col gap-1">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="rounded-2xl px-4 py-2 text-sm font-medium text-foreground/70 transition hover:bg-[#fac602]/12 hover:text-primary"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="rounded-2xl px-4 py-3 text-sm font-medium uppercase tracking-[0.14em] text-foreground/80 transition hover:bg-[#fac602]/12 hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  )
                ))}
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/membership"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-black/10 px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-foreground"
                >
                  Support
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
