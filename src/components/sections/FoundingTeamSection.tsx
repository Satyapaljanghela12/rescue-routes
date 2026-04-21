"use client";

import Image from "next/image";

const founder = {
  name: "Sneha Sharma",
  role: "Founder & Director",
  image: "/sneha2.png",
  description: "Sneha Sharma founded Rescue Routes with a vision to create a compassionate community for street animals. With years of experience in animal welfare, she leads our mission to provide comprehensive care and find loving homes for rescued animals."
};

const interns = [
  {
    name: "Anant Verma",
    role: "Marketing Intern",
    image: "/Interns/Anant.jpeg"
  },
  {
    name: "Aryan Khushwaha",
    role: "Operations Intern",
    image: "/Interns/Aryan.jpeg"
  },
  {
    name: "Harshvardhan Singh",
    role: "Marketing Intern",
    image: "/Interns/Harshvardhan.jpeg"
  },
  {
    name: "Vaibhavi Tiwari",
    role: "Operations Intern",
    image: "/Interns/Vaibhavi.jpeg"
  }
];

export default function FoundingTeamSection() {
  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Our Team
          </p>
          <h2 className="mt-2 font-heading text-2xl leading-tight text-foreground sm:text-3xl">
            Meet the People Behind Our Mission
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          {/* Founder Card - Large on Left */}
          <article className="overflow-hidden rounded-[2rem] border border-black/10 bg-surface shadow-[0_18px_50px_rgba(90,55,32,0.08)]">
            <div className="relative aspect-[4/3]">
              <Image src={founder.image} alt={founder.name} fill sizes="(max-width: 768px) 100vw, 500px" className="object-cover object-top" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3f251f]/24 to-transparent" />
            </div>
            <div className="p-5">
              <h3 className="font-heading text-xl text-foreground">
                {founder.name}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {founder.role}
              </p>
              <p className="mt-2 text-sm leading-5 text-foreground/72">
                {founder.description}
              </p>
            </div>
          </article>

          {/* Interns Grid - 2x2 on Right */}
          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-3 flex-1">
              {interns.map((intern) => (
                <article
                  key={intern.name}
                  className="overflow-hidden rounded-[1.5rem] border border-black/10 bg-surface shadow-[0_12px_40px_rgba(90,55,32,0.06)] flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image 
                      src={intern.image} 
                      alt={intern.name} 
                      fill 
                      sizes="(max-width: 768px) 50vw, 300px" 
                      className={`object-cover ${
                        intern.name === "Harshvardhan Singh" || intern.name === "Aryan Khushwaha" 
                          ? "object-[center_20%]" 
                          : "object-top"
                      }`}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3f251f]/20 to-transparent" />
                  </div>
                  <div className="p-2.5 flex-1 flex flex-col justify-center">
                    <h4 className="font-heading text-sm text-foreground leading-tight">
                      {intern.name}
                    </h4>
                    <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-primary">
                      {intern.role}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
