"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, PawPrint } from "lucide-react";

const founders = [
  {
    name: "Sneha Sharma",
    designation: "Founder & Rescue Lead",
    image: "/sneha.jpeg",
  },
  {
    name: "Aarav Mehta",
    designation: "Co-Founder & Operations Head",
    image: "/sneha2.png",
  },
  {
    name: "Ishita Verma",
    designation: "Community Outreach Lead",
    image: "/sneha.jpeg",
  },
  {
    name: "Rohan Kapoor",
    designation: "Volunteer Network Coordinator",
    image: "/sneha2.png",
  },
  {
    name: "Meera Nair",
    designation: "Animal Welfare Strategist",
    image: "/sneha.jpeg",
  },
  {
    name: "Kabir Singh",
    designation: "Rescue Response Manager",
    image: "/sneha2.png",
  },
  {
    name: "Ananya Das",
    designation: "Adoption & Foster Support Lead",
    image: "/sneha.jpeg",
  },
  {
    name: "Dev Malhotra",
    designation: "Campaigns & Partnerships Lead",
    image: "/sneha2.png",
  },
];

export default function FoundingTeamSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              Our Founding Team
            </p>
            <h2 className="mt-4 font-heading text-4xl leading-tight text-foreground sm:text-5xl">
              The people shaping our rescue vision with care, consistency, and compassion.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-foreground/72">
              Behind every rescue is a team that truly cares. From planning and coordination to
              recovery, adoption, and outreach, they work together to turn compassion into real
              impact, giving every animal a chance at a better life.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-foreground transition hover:border-primary hover:text-primary"
              aria-label="Scroll founding team left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-foreground transition hover:border-primary hover:text-primary"
              aria-label="Scroll founding team right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {founders.map((founder) => (
            <article
              key={`${founder.name}-${founder.designation}`}
              className="min-w-[260px] snap-start overflow-hidden rounded-[2rem] border border-black/10 bg-[#fffdf9] shadow-[0_18px_50px_rgba(90,55,32,0.08)] sm:min-w-[290px]"
            >
              <div className="relative aspect-[4/4.8]">
                <Image src={founder.image} alt={founder.name} fill className="object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3f251f]/24 to-transparent" />
              </div>
              <div className="p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#bad701]/18 text-primary">
                  <PawPrint className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-3xl leading-tight text-foreground">
                  {founder.name}
                </h3>
                <p className="mt-3 text-sm font-medium uppercase tracking-[0.14em] text-primary">
                  {founder.designation}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
