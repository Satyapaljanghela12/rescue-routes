"use client";

import { motion } from "framer-motion";
import {
  PawPrint,
  ArrowRight,
  Quote,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import Image from "next/image";
import Link from "next/link";

/* ─── Media (all fresh — NOT used on landing page) ─────────────────────── */
const heroVideo     = "/Images/WhatsApp Video 2026-04-11 at 20.21.16 (1).mp4";
const storyVideo    = "/Images/WhatsApp Video 2026-04-11 at 20.21.12 (1).mp4";
const missionVideo  = "/Images/WhatsApp Video 2026-04-11 at 20.21.11 (2).mp4";
const impactVideo   = "/Images/WhatsApp Video 2026-04-11 at 20.21.11.mp4";

const img1 = "/Images/WhatsApp Image 2026-04-11 at 20.21.09.jpeg";
const img2 = "/Images/WhatsApp Image 2026-04-11 at 20.21.10 (1).jpeg";
const img3 = "/Images/WhatsApp Image 2026-04-11 at 20.21.17 (2).jpeg";
const img4 = "/Images/WhatsApp Image 2026-04-11 at 20.21.17 (3).jpeg";
const img5 = "/Images/WhatsApp Image 2026-04-11 at 20.21.17 (4).jpeg";
const img6 = "/Images/WhatsApp Image 2026-04-11 at 20.21.18 (2).jpeg";
const img7 = "/Images/WhatsApp Image 2026-04-11 at 20.21.16 (1).jpeg";
const img8 = "/Images/WhatsApp Image 2026-04-11 at 20.21.17.jpeg";

/* ─── Data ──────────────────────────────────────────────────────────────── */
const stats = [
  { number: "830+",  label: "Animals Rescued" },
  { number: "3400+", label: "Beds Created" },
  { number: "100+",  label: "Water Pots" },
];

const whatWeDoPoints = [
  {
    image: img3,
    title: "Rescue & Response",
    desc: "We rescue injured and distressed animals — often in the middle of the night, often alone on the road. Our rapid response teams act immediately, ensuring no animal waits too long for help."
  },
  {
    image: img4,
    title: "Treatment & Healing",
    desc: "Every animal receives proper medical care. From emergency wound dressing to full surgeries and post-op care, we work with veterinarians to give each life the attention it deserves."
  },
  {
    image: img5,
    title: "Shelter & Adoption",
    desc: "Recovery takes time, so we provide nourished, safe shelter. Once healed, we organise adoption drives to find every animal a loving, permanent home."
  }
];

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-white">

        {/* ══════════════════════════════════════════════════════
            HERO — full-bleed video with left-side text panel
        ══════════════════════════════════════════════════════ */}
        <section className="relative min-h-[90vh] flex items-end overflow-hidden">
          {/* bg video */}
          <video
            className="absolute inset-0 h-full w-full object-cover object-top"
            autoPlay loop muted playsInline preload="auto"
            style={{ filter: 'none' }}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>

          <div className="relative z-10 w-full px-6 pb-20 pt-40 sm:px-10 lg:px-20 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="max-w-2xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md mb-7">
                <PawPrint size={14} />
                About Rescue Routes
              </span>
              <h1 className="font-heading text-6xl sm:text-7xl lg:text-[5.5rem] text-white leading-[1.0] mb-7">
                Compassion<br />
                <span className="text-secondary">in Action</span>
              </h1>
              <p className="font-poppins text-xl text-white/75 leading-relaxed mb-10 max-w-xl">
                A community-driven animal welfare initiative born in Bhopal — where every sight of a suffering animal became impossible to ignore.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#story"
                  className="rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-primary-deep">
                  Our Story
                </Link>
                <Link href="/volunteers"
                  className="rounded-full border border-white/25 bg-white/10 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition hover:bg-white hover:text-black">
                  Join the Mission
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            PULL-QUOTE STRIP
        ══════════════════════════════════════════════════════ */}
        <section className="bg-surface py-16 border-b border-black/5">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <Quote className="mx-auto mb-6 text-primary/30" size={48} />
            <p className="font-poppins text-xl md:text-2xl text-black leading-[1.8] font-medium italic">
              "What started as small rescue efforts on the streets has grown into a dedicated mission. Every day, countless animals suffer silently — at Rescue Routes, we choose to act. We become their voice when they cannot ask for help."
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            OUR STORY — editorial split
        ══════════════════════════════════════════════════════ */}
        <section id="story" className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* text */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <div className="flex items-center gap-3 mb-6 text-primary font-bold tracking-widest uppercase text-xs">
                  <PawPrint size={14} className="text-primary" />
                  The Beginning
                </div>
                <h2 className="font-heading text-4xl md:text-5xl text-black leading-tight mb-8">
                  How It All Started
                </h2>
                <div className="space-y-5 font-poppins text-lg text-black leading-relaxed">
                  <p>
                    Rescue Routes began in the heart of Bhopal, where injured and helpless animals on the streets became impossible to ignore.
                  </p>
                  <p>
                    In the beginning it was simple — picking up injured dogs, arranging urgent medical care, doing whatever it took to ease their pain. With limited resources but fierce determination, each rescue became a step toward something much bigger.
                  </p>
                  <p>
                    Every challenge — critical surgeries, lack of shelter, long recovery journeys — only strengthened the purpose. Volunteers stepped forward. Support grew. A community was born.
                  </p>
                  <p className="font-bold border-l-4 border-primary pl-5 py-2 bg-primary/5 rounded-r-2xl">
                    Today, Rescue Routes is more than an initiative — it is a growing network of compassion, dedicated to ensuring no animal is left behind.
                  </p>
                </div>
              </motion.div>

              {/* media stack */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2 grid grid-cols-2 gap-4"
              >
                <div className="col-span-2 relative rounded-[2rem] overflow-hidden h-72 shadow-2xl">
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay loop muted playsInline preload="metadata"
                  >
                    <source src={storyVideo} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-5 left-5 text-white font-heading text-xl">On-ground rescue</span>
                </div>
                <div className="relative rounded-[1.5rem] overflow-hidden h-48 shadow-lg">
                  <Image src={img1} alt="Rescue in Bhopal" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition hover:scale-105 duration-500" />
                </div>
                <div className="relative rounded-[1.5rem] overflow-hidden h-48 shadow-lg">
                  <Image src={img2} alt="Street animal care" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition hover:scale-105 duration-500" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            WHAT WE DO — white editorial section
        ══════════════════════════════════════════════════════ */}
        <section className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            
            <div className="max-w-3xl mb-16">
              <div className="flex items-center gap-3 mb-6 text-primary font-bold tracking-widest uppercase text-xs">
                <PawPrint size={14} className="text-primary" />
                Our Work
              </div>
              <h2 className="font-heading text-4xl md:text-5xl text-black leading-tight">
                How We Make a Difference
              </h2>
            </div>

            <div className="space-y-16">
              {whatWeDoPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row items-center gap-8 md:gap-14"
                >
                  {/* Left inline image - fixed height */}
                  <div className="w-full md:w-5/12 h-64 md:h-72 relative rounded-[2.5rem] overflow-hidden shadow-xl shrink-0">
                    <Image 
                      src={point.image} 
                      alt={point.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 50vw" 
                      className={`object-cover hover:scale-105 transition duration-700 ${i === 0 ? 'object-top' : 'object-center'}`} 
                    />
                  </div>
                  {/* Right inline paragraph */}
                  <div className="w-full md:w-7/12 flex gap-5 items-start py-4">
                    <div className="mt-1 shrink-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <CheckCircle size={16} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl text-black mb-3">{point.title}</h3>
                      <p className="font-poppins text-lg text-black leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            MISSION — video split
        ══════════════════════════════════════════════════════ */}
        <section className="py-28 bg-surface">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* video */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative rounded-[2.5rem] overflow-hidden h-[520px] shadow-2xl"
              >
                <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline preload="metadata">
                  <source src={missionVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </motion.div>

              {/* text */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6 text-primary font-bold tracking-widest uppercase text-xs">
                  <PawPrint size={14} className="text-primary" />
                  Our Vision
                </div>
                <h2 className="font-heading text-4xl md:text-5xl text-black leading-tight mb-8">
                  Creating a Better Future for Animals
                </h2>
                <p className="font-poppins text-lg text-black leading-relaxed mb-6">
                  Our mission is to rescue, treat, and protect animals in need while building a compassionate ecosystem where every life is valued and no animal suffers due to lack of care, attention, or support.
                </p>
                <p className="font-poppins text-lg text-black leading-relaxed">
                  We are committed to a future where communities and animals coexist with dignity, safety, and compassion — starting right here in Bhopal.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            IMPACT STATS — full-bleed image background
        ══════════════════════════════════════════════════════ */}
        <section className="relative py-28 overflow-hidden">
          {/* bg */}
          <div className="absolute inset-0">
            <Image src={img6} alt="Impact" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-black/75" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <div className="mb-6 text-secondary font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2">
              <PawPrint size={14} className="text-secondary" />
              By The Numbers
            </div>
            <h2 className="font-heading text-4xl md:text-6xl text-white mb-4">Lives Transformed</h2>
            <p className="font-poppins text-white/60 text-lg mb-16 max-w-2xl mx-auto">
              Through continuous efforts and community support, we have created meaningful change.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="p-12 rounded-[2.5rem] border border-white/15 bg-white/10 backdrop-blur-md"
                >
                  <h4 className="font-heading text-6xl text-white mb-2">{stat.number}</h4>
                  <p className="font-poppins text-white/60 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <p className="mt-16 font-heading text-2xl text-secondary">
              Behind every number is a life that was given a second chance.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            IMPACT VIDEO REEL — horizontal scroll feel
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
              <div>
                <div className="mb-3 text-primary font-bold tracking-widest uppercase text-xs">In the field</div>
                <h2 className="font-heading text-4xl md:text-5xl text-black">Moments from the ground</h2>
              </div>
              <p className="font-poppins text-black max-w-sm leading-relaxed">
                Real footage from real rescues — this is what compassion looks like every single day.
              </p>
            </div>

            {/* 3-column media grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative rounded-[2rem] overflow-hidden h-80 shadow-xl">
                <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline preload="metadata">
                  <source src={impactVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-5 left-5 font-heading text-white text-xl">Field Rescue</span>
              </div>
              <div className="relative rounded-[2rem] overflow-hidden h-80 shadow-xl">
                <Image src={img7} alt="Community care" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-5 left-5 font-heading text-white text-xl">Community Care</span>
              </div>
              <div className="relative rounded-[2rem] overflow-hidden h-80 shadow-xl">
                <Image src={img8} alt="Recovery" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-5 left-5 font-heading text-white text-xl">Recovery</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            COMMUNITY — image + text
        ══════════════════════════════════════════════════════ */}
        <section className="py-28 bg-surface">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-20 items-center">

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6 text-primary font-bold tracking-widest uppercase text-xs">
                  <PawPrint size={14} className="text-primary" />
                  Join Us
                </div>
                <h2 className="font-heading text-4xl md:text-5xl text-black leading-tight mb-8">
                  Be Part of the Change
                </h2>
                <p className="font-poppins text-lg text-black leading-relaxed mb-5">
                  From volunteers who assist in rescue operations to supporters who contribute to campaigns, every individual plays a role in this mission.
                </p>
                <p className="font-poppins text-lg text-black leading-relaxed mb-10">
                  Together, we are building a stronger, more compassionate environment for animals — one rescue at a time.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link href="/volunteers"
                    className="group flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition hover:bg-primary-deep">
                    Become a Volunteer <ArrowRight size={15} />
                  </Link>
                  <Link href="/donate"
                    className="group flex items-center gap-3 border-2 border-primary text-primary px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition hover:bg-primary hover:text-white">
                    Donate <ArrowRight size={15} />
                  </Link>
                </div>
              </motion.div>

              {/* photo mosaic */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="relative rounded-[1.8rem] overflow-hidden h-56 shadow-xl">
                  <Image src="/Images/WhatsApp Image 2026-04-11 at 20.21.10.jpeg" alt="Community volunteers" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover hover:scale-105 transition duration-700" />
                </div>
                <div className="relative rounded-[1.8rem] overflow-hidden h-56 shadow-xl mt-8">
                  <Image src="/Images/WhatsApp Image 2026-04-11 at 20.21.14.jpeg" alt="Animal care" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover hover:scale-105 transition duration-700" />
                </div>
                <div className="relative rounded-[1.8rem] overflow-hidden h-56 shadow-xl">
                  <Image src="/Images/WhatsApp Image 2026-04-11 at 20.21.16.jpeg" alt="Relove and adopt" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover hover:scale-105 transition duration-700" />
                </div>
                <div className="relative rounded-[1.8rem] overflow-hidden h-56 shadow-xl mt-8">
                  <Image src="/Images/WhatsApp Image 2026-04-11 at 20.21.18.jpeg" alt="volunteers" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover hover:scale-105 transition duration-700" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            PROMISE — bold close
        ══════════════════════════════════════════════════════ */}
        <section className="py-32 bg-white text-center">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-6 text-primary font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2">
                <PawPrint size={14} className="text-primary" />
                Our Commitment
              </div>
              <h2 className="font-heading text-5xl md:text-7xl text-black leading-tight mb-8">
                Every Life Deserves<br />
                <span className="text-primary">a Second Chance</span>
              </h2>
              <p className="font-poppins text-xl md:text-2xl text-black leading-relaxed font-medium mb-14 max-w-3xl mx-auto">
                Every rescue, every treatment, and every effort is a step toward a better world — a world where animals are cared for with dignity and compassion. We ensure that no cry for help goes unheard.
              </p>
              <Link href="/donate"
                className="inline-block bg-primary hover:bg-primary-deep text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl shadow-primary/25 transition hover:scale-105 active:scale-95">
                Donate to Support
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
