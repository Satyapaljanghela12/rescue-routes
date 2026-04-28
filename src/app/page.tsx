"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  ArrowRight,
  HeartHandshake,
  HousePlus,
  PawPrint,
  Plus,
  ShieldPlus,
  Stethoscope,
  Ambulance,
  Heart,
  HomeIcon,
  Utensils,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import FoundingTeamSection from "@/components/sections/FoundingTeamSection";
import PastCampaignsSection from "@/components/sections/PastCampaignsSection";
import UpcomingEventsSection from "@/components/sections/UpcomingEventsSection";
import RealtimeNotifications from "@/components/shared/RealtimeNotifications";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import DonationNotification from "@/components/shared/DonationNotification";
import SocialMediaPopup from "@/components/shared/SocialMediaPopup";

const heroVideo = "/assets/videos/hero.mp4";

const galleryImages = [
  {
    src: "/assets/images/gallery/volunteer-care.jpg",
    alt: "Volunteer comforting a rescued dog",
    title: "Daily rescue care",
    description: "Emergency response, nourishment, and gentle recovery for animals in need.",
  },
  {
    src: "/assets/images/gallery/rescued-dog.jpg",
    alt: "Dog looking calmly at the camera",
    title: "Second chances",
    description: "Each recovery story begins with patience, treatment, and a safe shelter space.",
  },
  {
    src: "/assets/images/gallery/shelter-care.jpeg",
    alt: "Rescued animal receiving care",
    title: "On-ground compassion",
    description: "Our team works where the need is most urgent, from streets to treatment centers.",
  },
  {
    src: "/assets/images/gallery/animals-shelter.jpeg",
    alt: "Animals at the shelter",
    title: "Safe shelter moments",
    description: "Recovery is about more than treatment, it is about dignity, security, and hope.",
  },
];

const whyRescueMattersImages = [
  {
    image: "/assets/images/gallery/stories-bg.jpeg",
    alt: "Rescued dog receiving care",
    className: "",
  },
  {
    image: "/assets/images/gallery/animals-shelter.jpeg",
    alt: "Street animal in need of support",
    className: "",
  },
];

const whyRescueMattersVideo = "/assets/images/gallery/VID_20260425_053252_847_bsl (1).mp4";

const whyRescueMattersPoints = [
  {
    text: (
      <>
        <strong>Rapid response</strong> for injured street animals hit by vehicles
      </>
    ),
    icon: Ambulance,
  },
  {
    text: (
      <>
        <strong>Humane sterilization</strong> to prevent overpopulation and suffering
      </>
    ),
    icon: Stethoscope,
  },
  {
    text: (
      <>
        <strong>Shelter and healing</strong> for abandoned pets who lost their homes
      </>
    ),
    icon: HomeIcon,
  },
  {
    text: (
      <>
        <strong>Nutritional support</strong> for severely malnourished rescues
      </>
    ),
    icon: Utensils,
  },
];

const focusAreas = [
  {
    icon: HeartHandshake,
    title: "Rescue & Rehabilitation",
    description:
      "Rapid response for injured, abandoned, and vulnerable animals, followed by careful rehabilitation.",
  },
  {
    icon: Stethoscope,
    title: "Treatment & Recovery",
    description:
      "Medical support, feeding, wound care, and monitored healing pathways that put welfare first.",
  },
  {
    icon: HousePlus,
    title: "Adoption & Shelter Support",
    description:
      "Temporary safety, long-term care, and loving rehoming efforts that move animals toward stability.",
  },
  {
    icon: ShieldPlus,
    title: "Awareness & Protection",
    description:
      "Community engagement and compassionate action that build safer neighborhoods for all living beings.",
  },
];

const programsShowcase = [
  {
    title: "Emergency Rescue",
    description:
      "We’re on the ground for street animals in distress, providing immediate first aid and survival care.",
    mediaType: "video" as const,
    src: "/assets/images/gallery/WhatsApp Video 2026-04-11 at 20.21.15 (2).mp4",
    alt: "Emergency rescue operation",
  },
  {
    title: "Healing & Homes",
    description:
      "A safe, temporary haven for recovery, preparing every animal for their loving forever family.",
    mediaType: "image" as const,
    src: "/assets/images/gallery/20240128_161809.jpg",
    alt: "Animal healing and shelter support",
  },
  {
    title: "Population Control",
    description:
      "Humane sterilization programs to ensure fewer animals are born into hardship on the streets.",
    mediaType: "image" as const,
    src: "/assets/images/gallery/population-control.jpg",
    alt: "Animal welfare population care effort",
  },
  {
    title: "Health & Safety",
    description:
      "Free rabies shots and vaccinations because every life deserves protection and health.",
    mediaType: "video" as const,
    src: "/assets/images/gallery/WhatsApp Video 2026-04-11 at 20.21.13 (2).mp4",
    alt: "Health and safety support for animals",
  },
];

// CountUp component — animates from 0 to target when scrolled into view
function CountUp({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Play video with audio when in view
            video.play();
            video.muted = false;
          } else {
            // Pause video when out of view
            video.pause();
            video.muted = true;
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of video is visible
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />
      <RealtimeNotifications />
      <WhatsAppButton />
      <DonationNotification />
      <SocialMediaPopup />
      <main className="flex-1 overflow-hidden bg-background text-foreground">
        <section className="relative isolate min-h-[88vh] overflow-hidden bg-gradient-to-br from-[#2563EB] from-0% via-[#2563EB] via-30% to-white to-100%">
          <div className="relative mx-auto flex min-h-[88vh] max-w-7xl items-center px-4 pt-36 pb-16 sm:px-6 lg:px-8 z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
              {/* Left Side - Text content */}
              <div className="text-white">
                <div className="inline-block mb-6">
                  <p className="text-sm sm:text-base font-semibold uppercase tracking-widest text-white-300 px-6 py-3 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-md shadow-lg">
                    NGO under Parwati Sewa Foundation
                  </p>
                </div>
                <h1 className="font-heading text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl text-white">
                  Build a kinder path for every stray, injured, and abandoned life.
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg font-normal">
                  Rescue Routes pairs urgent rescue, treatment, shelter support, and warmer, people-first movement for animal welfare
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/donate"
                    className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary transition hover:bg-gray-50 shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    Donate Now
                  </Link>
                  <Link
                    href="/volunteers"
                    className="inline-flex items-center justify-center rounded-full border-2 border-white bg-white/10 backdrop-blur-sm px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white/20 shadow-lg"
                  >
                    Support the Mission
                  </Link>
                </div>
                
                {/* Registration Numbers */}
                <div className="mt-6 space-y-1">
                  <p className="text-xs sm:text-sm text-white/80 font-poppins">
                    Registration No.: HI/01/01/01/33445/18
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 font-poppins">
                    NITI Ayog/NGO Registration No.: MP/2018/0188360
                  </p>
                </div>
              </div>

              {/* Right Side - Video with creative frame */}
              <div className="relative flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                  <video
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  >
                    <source src="/assets/images/gallery/whatwedo.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Organizations Carousel Section */}
        <section className="bg-white py-8 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 mb-6">
            <p className="text-center font-poppins text-sm text-gray-500 uppercase tracking-wider">
              Associated Organizations &amp; Partners
            </p>
          </div>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="flex items-center animate-scroll gap-12">
              {[...Array(3)].map((_, repeat) =>
                [
                  { logo: "/assets/images/logos/1.png", name: "Ram Ashta Mission Foundation" },
                  { logo: "/assets/images/logos/2.png", name: "Saute Digital" },
                  { logo: "/assets/images/logos/3.png", name: "Life on Canvas" },
                  { logo: "/assets/images/logos/4.png", name: "Nagar Nigam Bhopal" },
                  { logo: "/assets/images/logos/5.jpeg", name: "QCB Bhopal" },
                ].map((partner, idx) => (
                  <div key={`${repeat}-${idx}`} className="flex-shrink-0 flex items-center gap-4 px-4">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={80}
                      height={80}
                      className="object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                      style={{ maxHeight: 80, width: "auto" }}
                    />
                    <span className="font-poppins text-base font-medium text-gray-700 whitespace-nowrap">
                      {partner.name}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white py-10 sm:py-12">
          <div className="absolute left-0 top-10 h-40 w-40 rounded-full bg-blue-100/30 blur-3xl" />
          <div className="absolute bottom-10 right-0 h-48 w-48 rounded-full bg-blue-50/30 blur-3xl" />
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-6">
              <p className="text-xs font-fredoka font-semibold uppercase tracking-[0.35em] text-primary">
                Seva • Karuna • Jeevan
              </p>
              <Image
                src="/assets/images/brand/hindi.png"
                alt="Hindi compassion message"
                width={360}
                height={120}
                style={{ filter: 'brightness(0) saturate(100%) invert(32%) sepia(98%) saturate(1745%) hue-rotate(207deg) brightness(95%) contrast(92%)' }}
                className="h-auto w-auto max-w-full object-contain opacity-95"
              />
              <h2 className="max-w-4xl font-fredoka text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                Compassion towards all living beings
              </h2>
              <p className="max-w-2xl text-base leading-8 text-foreground/72">
                Rooted in Indian values of seva, kindness, and shared coexistence, our work is a
                reminder that every living being deserves care, dignity, and protection.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-10 overflow-hidden bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary mb-4">
                By The Numbers
              </p>
              <h2 className="font-fredoka text-4xl md:text-5xl text-primary mb-4">
                Lives Transformed
              </h2>
              <p className="font-poppins text-gray-600 text-lg max-w-2xl mx-auto">
                Through continuous efforts and community support, we have created meaningful change.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Stat 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-12 rounded-[2rem] bg-[#2563EB] shadow-lg text-center"
              >
                <h4 className="font-heading text-6xl text-white mb-2">+<CountUp target={3400} /></h4>
                <p className="font-poppins text-white/90 font-semibold uppercase tracking-wider text-sm">Beds Installed</p>
              </motion.div>

              {/* Stat 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="p-12 rounded-[2rem] bg-[#2563EB] shadow-lg text-center"
              >
                <h4 className="font-heading text-6xl text-white mb-2">+<CountUp target={1400} /></h4>
                <p className="font-poppins text-white/90 font-semibold uppercase tracking-wider text-sm">Animals Rescued/Adopted</p>
              </motion.div>

              {/* Stat 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-12 rounded-[2rem] bg-[#2563EB] shadow-lg text-center"
              >
                <h4 className="font-heading text-6xl text-white mb-2">+<CountUp target={700} /></h4>
                <p className="font-poppins text-white/90 font-semibold uppercase tracking-wider text-sm">Community Strays Sterilized</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-background py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
              <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-surface shadow-[0_18px_50px_rgba(90,55,32,0.08)]">
                <div className="relative h-full min-h-[500px]">
                  <video
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full object-cover"
                    loop
                    playsInline
                    preload="metadata"
                    controls
                    muted
                  >
                    <source src={whyRescueMattersVideo} type="video/mp4" />
                  </video>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3f251f]/28 via-transparent to-transparent" />
                </div>
              </div>

              <div className="rounded-[2.4rem] border border-black/10 bg-surface p-8 shadow-[0_18px_60px_rgba(90,55,32,0.08)] sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                  Why animal rescue matters
                </p>
                <h2 className="mt-4 font-heading text-4xl leading-tight text-foreground sm:text-5xl">
                  Every Life Deserves a Chance
                </h2>
                <p className="mt-5 text-base leading-8 text-foreground/72">
                  Rescue matters because the dangers on the street are immediate, but the impact of
                  care can be lifelong when rescue, treatment, nourishment, and protection come
                  together in time.
                </p>

                <div className="mt-8 space-y-4">
                  {whyRescueMattersPoints.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 rounded-[1.6rem] border border-white/35 bg-white/45 px-5 py-4 shadow-[0_14px_40px_rgba(90,55,32,0.08)] backdrop-blur-md"
                    >
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#bad701]/18 text-primary">
                        <point.icon className="h-4 w-4" />
                      </div>
                      <p className="text-sm leading-7 text-foreground/78">{point.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
              {/* Left Side - Single Card with Text and Video */}
              <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#fffdf9] shadow-[0_18px_50px_rgba(90,55,32,0.08)] flex flex-col h-full">
                <div className="p-8 flex-shrink-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                    What We Do
                  </p>
                  <h2 className="mt-4 font-heading text-4xl leading-tight text-foreground sm:text-5xl">
                    We believe in a holistic approach to welfare.
                  </h2>
                  <p className="mt-5 text-base leading-8 text-foreground/72">
                    From emergency response to long-term community health.
                  </p>
                  <div className="mt-8 flex flex-col gap-4">
                    <Link
                      href="/campaigns"
                      className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-primary-deep"
                    >
                      Explore Our Programs
                    </Link>
                    <Link
                      href="/volunteers"
                      className="inline-flex items-center justify-center rounded-full border border-black/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-foreground transition hover:border-primary hover:text-primary"
                    >
                      Join our mission today
                    </Link>
                  </div>
                </div>
                
                {/* Video Section */}
                <div className="relative flex-1 min-h-[400px] overflow-hidden rounded-b-[2rem]">
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  >
                    <source src="/assets/images/gallery/whatwedo.mp4" type="video/mp4" />
                  </video>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3f251f]/18 to-transparent" />
                </div>
              </div>

              {/* Right Side - Program Cards Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {programsShowcase.map((program) => (
                  <article
                    key={program.title}
                    className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#fffdf9] shadow-[0_18px_50px_rgba(90,55,32,0.08)]"
                  >
                    <div className="relative aspect-[4/3]">
                      {program.mediaType === "video" ? (
                        <video
                          className="absolute inset-0 h-full w-full object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                        >
                          <source src={program.src} type="video/mp4" />
                        </video>
                      ) : (
                        <Image 
                          src={program.src} 
                          alt={program.alt} 
                          fill 
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                          className={`object-cover ${program.title === "Healing & Homes" ? "object-top" : "object-center"}`}
                        />
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3f251f]/18 to-transparent" />
                    </div>
                    <div className="p-7">
                      <h3 className="font-heading text-3xl leading-tight text-foreground">
                        {program.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-foreground/72">
                        {program.description}
                      </p>
                      <Link
                        href="/stories"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary transition hover:text-primary-deep"
                      >
                        Read Stories
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <PastCampaignsSection />
        <UpcomingEventsSection />
        <FoundingTeamSection />

        <section className="bg-background py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
            <div className="rounded-[2.4rem] border border-black/10 bg-surface p-8 shadow-[0_18px_60px_rgba(90,55,32,0.08)] sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                Shared responsibility
              </p>
              <h2 className="mt-4 font-heading text-4xl leading-tight text-foreground sm:text-5xl">
                The strongest rescue platforms feel trustworthy before they ask for support.
              </h2>
              <p className="mt-5 text-base leading-8 text-foreground/74">
                We rescue dogs from shelters and unsafe conditions, provide them with proper 
                medical care, and help them find loving forever homes. Our goal is to give every 
                dog a second chance at a safe, happy, and healthy life.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary transition hover:bg-primary hover:text-white"
                >
                  Read Our Story
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/campaigns"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-foreground/72 transition hover:text-primary"
                >
                  Explore Campaigns
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div style={{ backgroundColor: '#2563EB' }} className="rounded-[2.4rem] p-8 text-white shadow-[0_22px_60px_rgba(37,99,235,0.22)] sm:p-10">
              <p className="text-xs font-fredoka font-semibold uppercase tracking-[0.28em] text-white/70">
                Join Our Mission
              </p>
              <h3 className="mt-4 font-fredoka text-4xl leading-tight">
                Every Paw Deserves a Chance. Be the Reason They Smile Again.
              </h3>
              <p className="mt-5 text-base font-poppins leading-8 text-white/76">
                Your compassion can transform a life. Whether you open your heart through donations, 
                volunteer your time, provide a foster home, or adopt a furry friend - you become part 
                of their journey from despair to hope, from pain to healing, from loneliness to love.
              </p>
              <div className="mt-8 space-y-4">
                <Link
                  href="/membership"
                  className="flex items-center justify-between rounded-[1.5rem] border border-white/14 bg-white/10 px-5 py-4 text-sm font-fredoka font-semibold uppercase tracking-[0.12em] transition hover:bg-white/16"
                >
                  Join Our Family of Hope 🐾
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/donate"
                  className="flex items-center justify-between rounded-[1.5rem] bg-white px-5 py-4 text-sm font-fredoka font-semibold uppercase tracking-[0.12em] text-[#2563EB] transition hover:bg-white/90"
                >
                  Give Love, Save a Life ❤️
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

