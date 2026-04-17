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
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="font-fredoka text-5xl sm:text-6xl font-medium text-primary mb-4">
            Our Founding Team
          </h2>
          <p className="text-base font-poppins text-foreground/70 leading-relaxed">
            Dedicated individuals working together to rescue, rehabilitate, and rehome animals in need.
          </p>
        </div>

        <div className="flex justify-end items-center gap-3 mb-8">
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

        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
