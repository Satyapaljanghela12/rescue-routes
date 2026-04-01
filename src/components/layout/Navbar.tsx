"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Our Mission", href: "/mission" },
  { name: "About Us", href: "/about" },
  { name: "Campaigns", href: "/campaigns" },
  { name: "Stories", href: "/stories" },
  { name: "Volunteers", href: "#" },
  { name: "Blogs", href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-gray-100 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between relative">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 group z-20">
          <div className="relative w-8 h-8 flex items-end">
            <div className="absolute bottom-0 left-0 w-4 h-5 bg-yellow-400 rounded-t-lg rounded-bl-sm" />
            <div className="absolute bottom-0 right-0 w-5 h-7 bg-[#A3D139] rounded-t-lg rounded-br-sm -z-10" />
          </div>
          <div className="flex flex-col leading-[1.1] font-heading font-black text-dark tracking-tight">
            <span className="text-[16px]">Rescue</span>
            <span className="text-[16px]">Routes</span>
          </div>
        </Link>

        {/* Center: Desktop Nav (Centred using absolute positioned container) */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-full max-w-2xl justify-center z-10">
          <ul className="flex items-center justify-center gap-8 xl:gap-12">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-[14px] font-medium text-gray-700 hover:text-primary transition-colors whitespace-nowrap"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: CTA & Mobile Toggle */}
        <div className="flex items-center gap-4 z-20">
          <Link
            href="#donate"
            className="hidden sm:inline-flex bg-primary hover:bg-secondary text-white font-semibold text-[14px] py-2.5 px-6 rounded-lg transition-all hover:scale-105"
          >
            Donate Now
          </Link>
          
          <button
            className="lg:hidden text-dark p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 px-4 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-dark font-medium p-2 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#donate"
              onClick={() => setIsOpen(false)}
              className="mt-2 bg-primary hover:bg-secondary text-white text-center font-semibold py-3 px-6 rounded-lg transition-all active:scale-95"
            >
              Donate Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
