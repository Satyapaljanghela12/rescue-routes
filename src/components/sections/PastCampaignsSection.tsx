"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, PawPrint, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";

type PastCampaign = {
  title: string;
  date: string;
  description: string;
  impact: string[];
  image: string;
};

const pastCampaigns: PastCampaign[] = [
  {
    title: "Adoption Mega-Camp",
    date: "December 27–28, 2025",
    description: "Organized in collaboration with the Ram Astha Mission",
    impact: [
      "55 puppies participated",
      "22 successful adoptions",
      "Partnered with Nagar Nigam for on-site pet license registration and rabies vaccinations"
    ],
    image: "/Camapigns/27-28dec.jpg"
  },
  {
    title: "Winter Bed Drive",
    date: "November 27, 2025",
    description: "Providing warmth for street dogs during harsh winter",
    impact: [
      "Produced 1,000 Boribeds (stubble-filled sacks)",
      "Partnership with Parwati Sewa Foundation"
    ],
    image: "/Camapigns/Winterbeddrive.jpg"
  },
  {
    title: "Water Pot Drive",
    date: "May 4, 2025",
    description: "Ensuring stray animals have access to clean drinking water during summer heat",
    impact: [
      "Distributed 100 water pots across the city"
    ],
    image: "/Camapigns/WaterPotDrive.jpg"
  },
  {
    title: "Year-End Adoption Camp",
    date: "December 28–29, 2024",
    description: "Continued efforts in finding forever homes for local strays",
    impact: [
      "60 puppies participated",
      "18 successful adoptions"
    ],
    image: "/Camapigns/yearend.jpg"
  },
  {
    title: "Annual Bed Drive",
    date: "December 1, 2024",
    description: "Scaled up production to create protective beds for street animals",
    impact: [
      "Created approximately 800 protective beds using stubble and sacks"
    ],
    image: "/Camapigns/Annualbeddrive.jpg"
  },
  {
    title: "New Year Adoption Drive",
    date: "January 27–28, 2024",
    description: "Location: 10 Number Market",
    impact: [
      "50 puppies participated",
      "21 successful adoptions"
    ],
    image: "/Camapigns/Adoptiondrive.jpg"
  },
  {
    title: "Adoption Camp at Olivers",
    date: "December 25, 2023",
    description: "Location: 10 Number",
    impact: [
      "20 puppies participated",
      "3 successful adoptions"
    ],
    image: "/Camapigns/adoptionolivers.jpg"
  },
  {
    title: "Foundation Bed Drive",
    date: "December 1, 2023",
    description: "Initial winter drive for street dogs",
    impact: [
      "Created 600 beds using boris (sacks) and bhusa (stubble)"
    ],
    image: "/Camapigns/foundationbed.jpg"
  }
];

export default function PastCampaignsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary mb-4">
            Our Journey
          </p>
          <h2 className="font-fredoka text-5xl sm:text-6xl font-medium text-primary">
            Past Campaigns
          </h2>
          <p className="mt-4 text-base leading-8 text-foreground/72 max-w-2xl mx-auto">
            Throughout all operations, we remain committed to community education regarding sterilization (ABC programs) and the critical importance of Rabies prevention to ensure a safe environment for both humans and animals.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6 text-primary" />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6 text-primary" />
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {pastCampaigns.map((campaign, index) => (
              <article
                key={index}
                className="flex-shrink-0 w-[350px] snap-start overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_18px_50px_rgba(90,55,32,0.08)] hover:shadow-[0_24px_60px_rgba(90,55,32,0.12)] transition-shadow"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    fill
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3f251f]/28 to-transparent" />
                </div>

                <div className="p-7">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#fac602]/18 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    <CalendarDays className="h-4 w-4" />
                    {campaign.date}
                  </div>

                  <h3 className="mt-5 font-fredoka text-3xl leading-tight text-foreground">
                    {campaign.title}
                  </h3>
                  <p className="mt-3 text-sm font-poppins leading-7 text-foreground/72">
                    {campaign.description}
                  </p>

                  <div className="mt-5 space-y-2">
                    {campaign.impact.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <PawPrint className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <p className="text-xs font-poppins leading-6 text-foreground/68">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/donate"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-fredoka font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-primary-deep shadow-lg"
          >
            Support Our Future Campaigns
          </Link>
        </div>
      </div>
    </section>
  );
}
