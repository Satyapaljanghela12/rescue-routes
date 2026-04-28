"use client";

import Image from "next/image";

const logos = [
  { src: "/assets/images/logos/1.png", alt: "Partner 1" },
  { src: "/assets/images/logos/2.png", alt: "Partner 2" },
  { src: "/assets/images/logos/3.png", alt: "Partner 3" },
  { src: "/assets/images/logos/4.png", alt: "Partner 4" },
];

export default function OrganizationsCarousel() {
  // Triple for seamless loop
  const items = [...logos, ...logos, ...logos];

  return (
    <section className="bg-white py-10 overflow-hidden">
      <div className="container mx-auto px-4 mb-6">
        <p className="text-center font-poppins text-sm text-gray-500 uppercase tracking-wider">
          Associated Organizations &amp; Partners
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex" style={{ animation: "scroll-logos 15s linear infinite" }}>
          {items.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center mx-10"
              style={{ width: 160 }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={60}
                className="object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                style={{ maxHeight: 60, width: "auto" }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-logos {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-160px * ${logos.length} - 80px * ${logos.length})); }
        }
      `}</style>
    </section>
  );
}
