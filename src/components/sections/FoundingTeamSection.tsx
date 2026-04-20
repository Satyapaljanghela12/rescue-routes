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
];

export default function FoundingTeamSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="font-fredoka text-5xl sm:text-6xl font-medium text-primary mb-4">
            Meet Our Founder
          </h2>
          <p className="text-base font-poppins text-foreground/70 leading-relaxed">
            Sneha Sharma founded Rescue Routes with a vision to create a compassionate world for animals in need. With unwavering dedication and a deep love for rescue dogs, she leads our mission to provide medical care, rehabilitation, and forever homes to every animal we rescue. Her commitment inspires our entire team to give these incredible companions a second chance at life.
          </p>
        </div>

        <div className="flex justify-center">
          {founders.map((founder) => (
            <article
              key={`${founder.name}-${founder.designation}`}
              className="w-full max-w-sm overflow-hidden rounded-[2rem] border border-black/10 bg-[#fffdf9] shadow-[0_18px_50px_rgba(90,55,32,0.08)]"
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
