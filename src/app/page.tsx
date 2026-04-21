import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  HousePlus,
  PawPrint,
  Plus,
  ShieldPlus,
  Stethoscope,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import FoundingTeamSection from "@/components/sections/FoundingTeamSection";
import UpcomingEventsSection from "@/components/sections/UpcomingEventsSection";
import RealtimeNotifications from "@/components/RealtimeNotifications";
import BlogCarousel from "@/components/sections/BlogCarousel";

const heroVideo = "/Images/WhatsApp Video 2026-04-11 at 20.21.16.mp4";

const galleryImages = [
  {
    src: "/Images/harrison-lin-dKxvmVH7Bi0-unsplash.jpg",
    alt: "Volunteer comforting a rescued dog",
    title: "Daily rescue care",
    description: "Emergency response, nourishment, and gentle recovery for animals in need.",
  },
  {
    src: "/Images/harrison-lin-dKxvmVH7Bi0-unsplash%20(1).jpg",
    alt: "Dog looking calmly at the camera",
    title: "Second chances",
    description: "Each recovery story begins with patience, treatment, and a safe shelter space.",
  },
  {
    src: "/Images/WhatsApp%20Image%202026-04-11%20at%2020.21.14.jpeg",
    alt: "Rescued animal receiving care",
    title: "On-ground compassion",
    description: "Our team works where the need is most urgent, from streets to treatment centers.",
  },
  {
    src: "/Images/WhatsApp%20Image%202026-04-11%20at%2020.21.18.jpeg",
    alt: "Animals at the shelter",
    title: "Safe shelter moments",
    description: "Recovery is about more than treatment, it is about dignity, security, and hope.",
  },
];

const whyRescueMattersImages = [
  {
    image: "/Images/WhatsApp%20Image%202026-04-11%20at%2020.21.14%20(1).jpeg",
    alt: "Rescued dog receiving care",
    className: "",
  },
  {
    image: "/Images/WhatsApp%20Image%202026-04-11%20at%2020.21.18%20(1).jpeg",
    alt: "Street animal in need of support",
    className: "",
  },
];

const whyRescueMattersVideo = "/Images/WhatsApp Video 2026-04-11 at 20.21.15 (1).mp4";

const whyRescueMattersPoints = [
  "Stray animals are often hit by vehicles and left injured on the street without immediate help and medical care. Our rapid response team is their only hope.",
  "Systematic sterilization drives help humanely manage street animal populations and prevent future suffering caused by uncontrolled overpopulation.",
  "We give shelter and emotional healing to pets abandoned by their owners, offering the care, protection, and love they lost.",
  "Nutritional rehabilitation programs support severely malnourished rescues who have survived for weeks without a stable source of food.",
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
    src: "/Images/WhatsApp%20Video%202026-04-11%20at%2020.21.13.mp4",
    alt: "Emergency rescue operation",
  },
  {
    title: "Healing & Homes",
    description:
      "A safe, temporary haven for recovery, preparing every animal for their loving forever family.",
    mediaType: "image" as const,
    src: "/Images/WhatsApp%20Image%202026-04-11%20at%2020.21.17%20(1).jpeg",
    alt: "Animal healing and shelter support",
  },
  {
    title: "Population Control",
    description:
      "Humane sterilization programs to ensure fewer animals are born into hardship on the streets.",
    mediaType: "image" as const,
    src: "/Images/WhatsApp%20Image%202026-04-11%20at%2020.21.10.jpeg",
    alt: "Animal welfare population care effort",
  },
  {
    title: "Health & Safety",
    description:
      "Free rabies shots and vaccinations because every life deserves protection and health.",
    mediaType: "video" as const,
    src: "/Images/WhatsApp%20Video%202026-04-11%20at%2020.21.14.mp4",
    alt: "Health and safety support for animals",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <RealtimeNotifications />
      <main className="flex-1 overflow-hidden bg-background text-foreground">
        <section className="relative isolate min-h-[88vh] overflow-hidden border-b border-black/10">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(72,30,25,0.8)_0%,rgba(72,30,25,0.56)_46%,rgba(72,30,25,0.3)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,198,2,0.24),transparent_33%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(186,215,1,0.18),transparent_28%)]" />

          <div className="relative mx-auto flex min-h-[88vh] max-w-7xl items-center px-4 pt-28 pb-16 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
            <div className="grid w-full gap-10">
              <div className="max-w-3xl text-white">
                <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#fac602]/45 bg-[#fff6ea]/14 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#fff6ea] backdrop-blur-sm">
                  <PawPrint className="h-4 w-4 text-[#fac602]" />
                  Parwati Seva Foundation
                </p>
                <h1 className="max-w-4xl font-heading text-5xl font-semibold leading-none sm:text-6xl lg:text-[5.9rem]">
                  Build a kinder path for every stray, injured, and abandoned life.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
                  Rescue Routes pairs urgent rescue, treatment, shelter support, and adoption
                  efforts with a warmer, people-first movement for animal welfare.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/donate"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-primary-deep"
                  >
                    Donate Now
                  </Link>
                  <Link
                    href="/volunteers"
                    className="inline-flex items-center justify-center rounded-full border border-[#fff6ea]/45 bg-[#fff6ea]/10 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:bg-[#fff6ea]/18"
                  >
                    Join the Mission
                  </Link>
                </div>
                
                {/* Registration Numbers */}
                <div className="mt-8 space-y-1">
                  <p className="text-xs sm:text-sm text-white/70 font-poppins">
                    Registration No.: HI/01/01/01/33445/18
                  </p>
                  <p className="text-xs sm:text-sm text-white/70 font-poppins">
                    NITI Ayog/NGO Registration No.: MP/2018/0188360
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Organizations Carousel Section */}
        <section className="bg-white py-8">
          <div className="mx-auto max-w-7xl">
            {/* Scrolling carousel */}
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll gap-16 items-center">
                {/* First set of names */}
                <div className="flex gap-16 items-center shrink-0">
                  <span className="font-fredoka text-xl text-gray-600 whitespace-nowrap">Animal Welfare Board</span>
                  <span className="font-fredoka text-xl text-gray-600 whitespace-nowrap">Pet Care India</span>
                  <span className="font-fredoka text-xl text-gray-600 whitespace-nowrap">Rescue Foundation</span>
                  <span className="font-fredoka text-xl text-gray-600 whitespace-nowrap">Animal Rights NGO</span>
                  <span className="font-fredoka text-xl text-gray-600 whitespace-nowrap">Paws & Hearts</span>
                  <span className="font-fredoka text-xl text-gray-600 whitespace-nowrap">Compassion Trust</span>
                </div>
                
                {/* Duplicate set for seamless loop */}
                <div className="flex gap-16 items-center shrink-0">
                  <span className="font-fredoka text-xl text-gray-600 whitespace-nowrap">Animal Welfare Board</span>
                  <span className="font-fredoka text-xl text-gray-600 whitespace-nowrap">Pet Care India</span>
                  <span className="font-fredoka text-xl text-gray-600 whitespace-nowrap">Rescue Foundation</span>
                  <span className="font-fredoka text-xl text-gray-600 whitespace-nowrap">Animal Rights NGO</span>
                  <span className="font-fredoka text-xl text-gray-600 whitespace-nowrap">Paws & Hearts</span>
                  <span className="font-fredoka text-xl text-gray-600 whitespace-nowrap">Compassion Trust</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white py-20 sm:py-24">
          <div className="absolute left-0 top-10 h-40 w-40 rounded-full bg-blue-100/30 blur-3xl" />
          <div className="absolute bottom-10 right-0 h-48 w-48 rounded-full bg-blue-50/30 blur-3xl" />
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-6">
              <p className="text-xs font-fredoka font-semibold uppercase tracking-[0.35em] text-primary">
                Seva • Karuna • Jeevan
              </p>
              <Image
                src="/hindi.png"
                alt="Hindi compassion message"
                width={360}
                height={120}
                style={{ filter: 'sepia(1) saturate(3) hue-rotate(180deg) brightness(0.6)' }}
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

        <section className="bg-background py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
              <div className="grid h-full gap-4">
                <div className="group relative overflow-hidden rounded-[2rem] border border-black/10 bg-surface shadow-[0_18px_50px_rgba(90,55,32,0.08)]">
                  <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-[520px]">
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    >
                      <source src={whyRescueMattersVideo} type="video/mp4" />
                    </video>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3f251f]/28 via-transparent to-transparent" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {whyRescueMattersImages.map((item) => (
                    <div
                      key={item.image}
                      className={`group relative overflow-hidden rounded-[2rem] border border-black/10 bg-surface shadow-[0_18px_50px_rgba(90,55,32,0.08)] ${item.className}`}
                    >
                      <div className="relative aspect-[4/3] h-full min-h-[220px]">
                        <Image
                          src={item.image}
                          alt={item.alt}
                          fill
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3f251f]/18 to-transparent" />
                    </div>
                  ))}
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
                  {whyRescueMattersPoints.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-4 rounded-[1.6rem] border border-white/35 bg-white/45 px-5 py-4 shadow-[0_14px_40px_rgba(90,55,32,0.08)] backdrop-blur-md"
                    >
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#bad701]/18 text-primary">
                        <PawPrint className="h-4 w-4" />
                      </div>
                      <p className="text-sm leading-7 text-foreground/78">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
              {/* Left Side - Single Card with Text and Video */}
              <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#fffdf9] shadow-[0_18px_50px_rgba(90,55,32,0.08)] h-full flex flex-col">
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
                <div className="relative flex-1 min-h-[300px]">
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  >
                    <source src="/Images/WhatsApp Video 2026-04-11 at 20.21.16.mp4" type="video/mp4" />
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
                        <Image src={program.src} alt={program.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
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

        <UpcomingEventsSection />
        <BlogCarousel />
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
