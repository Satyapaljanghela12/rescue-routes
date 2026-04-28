"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, PawPrint } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import Image from "next/image";
import Link from "next/link";

const stories = [
  {
    name: "Shampoo",
    subtitle: "A Second Chance",
    description: "Rescued with a fractured jaw and unable to eat, Shampoo was in critical condition when we found him. After emergency surgery and weeks of careful nursing, he made a full recovery. Today, he's healthy, playful, and living his best life. His journey reminds us that every animal deserves a chance to heal and thrive.",
    image: "/assets/images/animals/stories/story1.jpg",
    afterImage: null,
  },
  {
    name: "Mithi",
    subtitle: "Strength Beyond Loss",
    description: "Mithi lost a limb in a tragic accident, but her spirit remained unbroken. With proper medical care and rehabilitation, she adapted beautifully to her new life. She now runs, plays, and enjoys every moment with incredible resilience. Mithi's story is a testament to the strength and courage animals possess when given love and support.",
    image: "/assets/images/animals/stories/mithi.png",
    afterImage: null,
  },
  {
    name: "Ladoo",
    subtitle: "Fighting Cancer",
    description: "When Ladoo was diagnosed with a tumor, we knew time was critical. Through multiple medical sessions, chemotherapy, and constant care, he fought bravely. Today, Ladoo is cancer-free and full of energy. His recovery shows that with timely intervention and dedication, even the toughest battles can be won.",
    image: "/assets/images/animals/stories/ladoo.png",
    afterImage: "/assets/images/after/ladoo1.png",
  },
  {
    name: "Milky",
    subtitle: "Life Renewed",
    description: "Milky suffered from a large tumor that affected her quality of life. After a successful surgery and months of recovery care, she was given a second chance. Now she's active, healthy, and enjoying life to the fullest. Milky's transformation is a beautiful reminder of what compassionate care can achieve.",
    image: "/assets/images/animals/stories/milky.png",
    afterImage: null,
  },
  {
    name: "Damru",
    subtitle: "Recovery from Critical Condition",
    description: "Damru was rescued with severe swelling and breathing difficulties that put his life at risk. Emergency treatment and round-the-clock monitoring helped stabilize him. After weeks of intensive care, he made a remarkable recovery. Damru's story highlights the importance of immediate action in saving lives.",
    image: "/assets/images/animals/stories/damru.png",
    afterImage: null,
  },
  {
    name: "Sambhar",
    subtitle: "Saving a Vision",
    description: "Sambhar suffered a serious eye injury that threatened his sight. Thanks to early medical intervention and specialized treatment, his vision was saved. He can now see the world clearly and live without pain. Sambhar's recovery shows how crucial timely care is in preventing permanent damage.",
    image: "/assets/images/animals/stories/sambhar.png",
    afterImage: "/assets/images/after/sambharrep.png",
  },
  {
    name: "Kismis",
    subtitle: "Surgery Success",
    description: "Kismis was diagnosed with a hernia that caused him constant discomfort. After a successful surgery and proper post-operative care, he recovered completely. Now he's pain-free and back to his playful self. Kismis's journey proves that even complex medical conditions can be treated with the right resources.",
    image: "/assets/images/animals/stories/kismis.png",
    afterImage: null,
  },
  {
    name: "Sona",
    subtitle: "From Pain to Healing",
    description: "Sona was found with severe wound infections that were spreading rapidly. Immediate medical attention, antibiotics, and daily wound care saved her life. After months of treatment, she made a full recovery. Sona's transformation from suffering to healing is a powerful example of what rescue work can accomplish.",
    image: "/assets/images/animals/stories/sona.png",
    afterImage: "/assets/images/after/sona1.png",
  },
];

// Before/After image component with auto-toggle every 3 seconds
function BeforeAfterImage({ story }: { story: typeof stories[0] }) {
  const [showAfter, setShowAfter] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!story.afterImage) return;
    const interval = setInterval(() => {
      if (!hovered) setShowAfter(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, [story.afterImage, hovered]);

  const currentImage = showAfter && story.afterImage ? story.afterImage : story.image;
  const label = showAfter && story.afterImage ? "After" : "Before";
  const labelColor = showAfter ? "bg-green-500" : "bg-orange-500";

  return (
    <div
      className="relative h-96 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white cursor-pointer"
      onMouseEnter={() => { if (story.afterImage) { setHovered(true); setShowAfter(true); } }}
      onMouseLeave={() => { if (story.afterImage) { setHovered(false); setShowAfter(false); } }}
    >
      <Image
        src={currentImage}
        alt={story.name}
        fill
        className="object-cover transition-opacity duration-700"
        key={currentImage}
      />
      {story.afterImage && (
        <div className={`absolute top-4 left-4 ${labelColor} text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg transition-all duration-500`}>
          {label}
        </div>
      )}
    </div>
  );
}

export default function StoriesPage() {
  const [allStories, setAllStories] = useState<any[]>(stories);

  useEffect(() => {
    fetch("/api/stories")
      .then(r => r.json())
      .then(data => {
        if (data.success && data.stories.length > 0) {
          // Map DB stories to match the same shape, merge with static
          const dbStories = data.stories.map((s: any) => ({
            name: s.name,
            subtitle: s.subtitle,
            description: s.description,
            image: s.beforeImage,
            afterImage: s.afterImage || null,
          }));
          setAllStories([...dbStories, ...stories]);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-hidden pt-20">
        
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-end overflow-hidden">
          {/* bg image */}
          <Image
            src="/assets/images/gallery/stories-bg.jpeg"
            alt="Stories of Hope & Recovery"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          <div className="relative z-10 w-full px-6 pb-20 pt-40 sm:px-10 lg:px-20 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="max-w-2xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md mb-7">
                <PawPrint size={14} />
                Rescue Stories
              </span>
              <h1 className="font-heading text-6xl sm:text-7xl lg:text-[5.5rem] text-white leading-[1.0] mb-7">
                Stories of<br />
                <span className="text-secondary">Hope & Recovery</span>
              </h1>
              <p className="font-poppins text-xl text-white/75 leading-relaxed mb-10 max-w-xl">
                Behind every rescue is a life that was once struggling to survive. These stories reflect courage, care, and the power of compassion.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/donate"
                  className="rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-primary-deep">
                  Support Their Journey
                </Link>
                <Link href="/volunteers"
                  className="rounded-full border border-white/25 bg-white/10 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition hover:bg-white hover:text-black">
                  Join the Mission
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stories Flow - Creative Storytelling Layout */}
        <section className="py-16 md:py-24 bg-gray-50 relative">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            
            {/* Section intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-fredoka text-3xl md:text-4xl mb-3 text-primary">
                Tales of Transformation
              </h2>
              <p className="font-poppins text-lg text-gray-600">
                Each journey from rescue to recovery
              </p>
            </motion.div>

            {/* Stories in creative layout */}
            <div className="space-y-24">
              {allStories.map((story, index) => (
                <motion.div
                  key={story.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  {/* Alternating layout with creative positioning */}
                  <div className={`grid lg:grid-cols-12 gap-8 items-center ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                    
                    {/* Image Side - More creative */}
                    <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:col-start-8' : ''}`}>
                      <motion.div
                        whileHover={{ y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                      >
                        {/* Main image with before/after toggle */}
                        <BeforeAfterImage story={story} />

                        {/* Simple badge with paw */}
                        <div className={`absolute ${index % 2 === 0 ? '-bottom-6 -right-6' : '-bottom-6 -left-6'} bg-[#2563EB] rounded-3xl px-6 py-4 shadow-2xl transform ${index % 2 === 0 ? 'rotate-12' : '-rotate-12'}`}>
                          <PawPrint className="w-8 h-8 text-white" />
                        </div>

                        {/* Floating paws */}
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          className={`absolute ${index % 2 === 0 ? '-top-4 -left-4' : '-top-4 -right-4'}`}
                        >
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                              <circle cx="12" cy="16" r="3" />
                              <circle cx="8" cy="12" r="2" />
                              <circle cx="16" cy="12" r="2" />
                              <circle cx="10" cy="8" r="1.5" />
                              <circle cx="14" cy="8" r="1.5" />
                            </svg>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Content Side - More playful */}
                    <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                      <div className="relative">
                        {/* Decorative blob behind */}
                        <div className={`absolute -inset-8 bg-primary/5 rounded-[4rem] blur-3xl ${index % 2 === 0 ? '-rotate-3' : 'rotate-3'}`} />
                        
                        <div className="relative bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl overflow-hidden min-w-0">
                          {/* Story name with cute styling */}
                          <div className="mb-6">
                            <h3 className="font-fredoka text-4xl md:text-5xl mb-2 text-primary">
                              {story.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              <div className="h-1 w-16 bg-primary rounded-full" />
                              <p className="font-poetsen text-xl text-gray-600">
                                {story.subtitle}
                              </p>
                            </div>
                          </div>
                          
                          <p className="font-poppins text-lg text-gray-700 leading-relaxed break-words whitespace-normal overflow-hidden">
                            {story.description}
                          </p>

                          {/* Simple line separator */}
                          <div className="absolute bottom-4 right-4 opacity-20">
                            <PawPrint className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Simple paw separator */}
                  {index < allStories.length - 1 && (
                    <div className="flex justify-center my-16">
                      <div className="text-primary/20">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="16" r="3" />
                          <circle cx="8" cy="12" r="2" />
                          <circle cx="16" cy="12" r="2" />
                          <circle cx="10" cy="8" r="1.5" />
                          <circle cx="14" cy="8" r="1.5" />
                        </svg>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center bg-white rounded-[3rem] p-12 md:p-16 shadow-2xl border-4 border-gray-100 relative overflow-hidden"
            >
              {/* Decorative heart */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
                <Heart className="w-64 h-64 text-primary" fill="currentColor" />
              </div>

              <div className="relative z-10">
                <h2 className="font-fredoka text-4xl md:text-5xl mb-4 text-primary">
                  Be Part of More Stories Like These
                </h2>
                <p className="font-poppins text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Your support helps us rescue, treat, and protect animals in need.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    href="/donate"
                    className="bg-primary hover:bg-orange-600 text-white font-fredoka font-bold text-lg py-4 px-10 rounded-2xl transition-all hover:scale-105 shadow-lg"
                  >
                    Donate Now
                  </Link>
                  <Link
                    href="/volunteers"
                    className="bg-white hover:bg-gray-50 text-primary border-4 border-primary font-fredoka font-bold text-lg py-4 px-10 rounded-2xl transition-all hover:scale-105 shadow-lg"
                  >
                    Become a Volunteer
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
