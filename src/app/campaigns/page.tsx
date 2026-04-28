"use client";

import { motion } from "framer-motion";
import { PawPrint, Stethoscope, Home, Droplet, Shield, CalendarDays, MapPin, Users } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// Icon mapping for campaigns
const iconMap: any = {
  "Emergency": Stethoscope,
  "Medical": Stethoscope,
  "Shelter": Home,
  "Rehabilitation": Home,
  "Vaccination": Shield,
  "Sterilization": Shield,
  "Winter": Home,
  "Bed": Home,
  "Summer": Droplet,
  "Water": Droplet,
  "Food": PawPrint,
};

const getIconForCampaign = (title: string) => {
  for (const key in iconMap) {
    if (title.includes(key)) return iconMap[key];
  }
  return PawPrint;
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch("/api/campaigns");
      const data = await response.json();
      if (data.success) {
        setCampaigns(data.campaigns);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-hidden">
        
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-end overflow-hidden">
          {/* bg image */}
          <Image
            src="/assets/images/gallery/shelter-care.jpeg"
            alt="Support Our Campaigns"
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
                Our Campaigns
              </span>
              <h1 className="font-heading text-6xl sm:text-7xl lg:text-[5.5rem] text-white leading-[1.0] mb-7">
                Support Our<br />
                <span className="text-secondary">Mission</span>
              </h1>
              <p className="font-poppins text-xl text-white/75 leading-relaxed mb-10 max-w-xl">
                Our campaigns are focused on rescuing, treating, and protecting animals in need. Your support helps us bring care, safety, and hope to those who cannot ask for it.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/donate"
                  className="rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-primary-deep">
                  Donate Now
                </Link>
                <Link href="/volunteers"
                  className="rounded-full border border-white/25 bg-white/10 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition hover:bg-white hover:text-black">
                  Become a Volunteer
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Campaign Grid - Active Campaigns */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-fredoka text-4xl md:text-5xl mb-4 text-primary">
                Our Active Campaigns
              </h2>
              <p className="font-poppins text-lg text-gray-600">
                Choose a cause that speaks to your heart
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaigns.map((campaign, index) => {
                const CampaignIcon = getIconForCampaign(campaign.title);
                return (
                <motion.div
                  key={campaign._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 overflow-hidden"
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={campaign.image}
                      alt={campaign.title}
                      fill
                      className="object-cover"
                    />
                    {/* Icon badge overlay */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                      <CampaignIcon className="w-6 h-6 text-primary" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 relative">
                    {/* Decorative blob */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
                    
                    <div className="relative">
                      <h3 className="font-fredoka text-2xl mb-3 text-primary">
                        {campaign.title}
                      </h3>

                      {/* Location */}
                      {campaign.address && (
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="h-4 w-4 text-secondary flex-shrink-0" />
                          <p className="text-sm font-poppins text-foreground/70">
                            {campaign.address}
                          </p>
                        </div>
                      )}
                      
                      <p className="font-poppins text-sm text-gray-700 leading-relaxed mb-4">
                        {campaign.description}
                      </p>

                      {/* Campaign Dates */}
                      <div className="flex items-center gap-2 mb-4 text-xs text-gray-600">
                        <CalendarDays className="h-4 w-4" />
                        <span>{new Date(campaign.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} - {new Date(campaign.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      
                      <div className="flex justify-between items-center gap-3">
                        <Link
                          href="/donate"
                          className="inline-flex items-center font-fredoka text-primary hover:text-orange-600 transition-colors text-sm"
                        >
                          Donate Now
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <Link
                          href="/volunteers"
                          className="inline-flex items-center font-fredoka text-primary hover:text-orange-600 transition-colors text-sm"
                        >
                          Become a Volunteer
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>

                    {/* Paw decoration */}
                    <div className="absolute bottom-4 right-4 opacity-10">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                        <circle cx="12" cy="16" r="3" />
                        <circle cx="8" cy="12" r="2" />
                        <circle cx="16" cy="12" r="2" />
                        <circle cx="10" cy="8" r="1.5" />
                        <circle cx="14" cy="8" r="1.5" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              );
              })}
            </div>
          </div>
        </section>

        {/* Past Campaigns Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary mb-4">
                Our Journey
              </p>
              <h2 className="font-fredoka text-4xl md:text-5xl mb-4 text-primary">
                Past Campaigns
              </h2>
              <p className="font-poppins text-lg text-gray-600 max-w-3xl mx-auto">
                Throughout all operations, we remain committed to community education regarding sterilization (ABC programs) and the critical importance of Rabies prevention to ensure a safe environment for both humans and animals.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  title: "Adoption Mega-Camp",
                  date: "December 27–28, 2025",
                  description: "Community outreach for finding forever homes",
                  impact: [
                    "55 puppies participated",
                    "22 successful adoptions",
                    "Pet license registration & rabies vaccinations"
                  ],
                  organization: "Ram Astha Mission & Nagar Nigam",
                  image: "/assets/images/campaigns/27-28dec.jpg",
                  objectPosition: "object-top"
                },
                {
                  title: "Winter Bed Drive",
                  date: "November 27, 2025",
                  description: "Providing warmth for street dogs during harsh winter",
                  impact: [
                    "1,000 Boribeds produced",
                    "Stubble-filled sacks distributed"
                  ],
                  organization: "Parwati Sewa Foundation",
                  image: "/assets/images/campaigns/winter-bed-drive.jpg",
                  objectPosition: "object-top"
                },
                {
                  title: "Water Pot Drive",
                  date: "May 4, 2025",
                  description: "Summer relief for stray animals",
                  impact: [
                    "100 water pots distributed",
                    "City-wide coverage"
                  ],
                  image: "/assets/images/campaigns/water-pot-drive.jpg",
                  objectPosition: "object-top"
                },
                {
                  title: "Year-End Adoption Camp",
                  date: "December 28–29, 2024",
                  description: "Finding forever homes for local strays",
                  impact: [
                    "60 puppies participated",
                    "18 successful adoptions"
                  ],
                  image: "/assets/images/campaigns/year-end.jpg",
                  objectPosition: "object-top"
                },
                {
                  title: "Annual Bed Drive",
                  date: "December 1, 2024",
                  description: "Scaled up production for winter protection",
                  impact: [
                    "800 protective beds created",
                    "Stubble and sacks used"
                  ],
                  image: "/assets/images/campaigns/annual-bed-drive.jpg",
                  objectPosition: "object-center"
                },
                {
                  title: "New Year Adoption Drive",
                  date: "January 27–28, 2024",
                  location: "10 Number Market",
                  description: "Community adoption event",
                  impact: [
                    "50 puppies participated",
                    "21 successful adoptions"
                  ],
                  image: "/assets/images/campaigns/adoption-drive.jpg",
                  objectPosition: "object-top"
                },
                {
                  title: "Adoption Camp at Olivers",
                  date: "December 25, 2023",
                  location: "10 Number",
                  description: "Holiday adoption initiative",
                  impact: [
                    "20 puppies participated",
                    "3 successful adoptions"
                  ],
                  image: "/assets/images/campaigns/adoption-olivers.jpg",
                  objectPosition: "object-top"
                },
                {
                  title: "Foundation Bed Drive",
                  date: "December 1, 2023",
                  description: "Initial winter drive for street dogs",
                  impact: [
                    "600 beds created",
                    "Boris (sacks) and bhusa (stubble) used"
                  ],
                  image: "/assets/images/campaigns/foundation-bed.jpg",
                  objectPosition: "object-top"
                }
              ].map((campaign, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 overflow-hidden"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={campaign.image}
                      alt={campaign.title}
                      fill
                      className={`object-cover ${campaign.objectPosition}`}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3f251f]/28 to-transparent" />
                  </div>

                  <div className="p-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#fac602]/18 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
                      <CalendarDays className="h-4 w-4" />
                      {campaign.date}
                    </div>

                    <h3 className="font-fredoka text-2xl leading-tight text-primary mb-3">
                      {campaign.title}
                    </h3>

                    {/* Location */}
                    {campaign.location && (
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="h-4 w-4 text-secondary flex-shrink-0" />
                        <p className="text-sm font-poppins text-foreground/70">
                          {campaign.location}
                        </p>
                      </div>
                    )}

                    <p className="text-sm font-poppins leading-6 text-foreground/72 mb-4">
                      {campaign.description}
                    </p>

                    {/* Impact Numbers */}
                    <div className="space-y-2 mb-4">
                      {campaign.impact.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <PawPrint className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-xs font-poppins leading-5 text-foreground/68 font-medium">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Organization Collaboration */}
                    {campaign.organization && (
                      <div className="flex items-start gap-2 pt-3 border-t border-gray-100">
                        <Users className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                        <p className="text-xs font-poppins text-foreground/60">
                          <span className="font-semibold">Collaboration:</span> {campaign.organization}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Emotional Connect */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          {/* Decorative paw prints background */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(8)].map((_, i) => (
              <svg
                key={i}
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-primary absolute"
                style={{
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              >
                <circle cx="12" cy="16" r="3" />
                <circle cx="8" cy="12" r="2" />
                <circle cx="16" cy="12" r="2" />
                <circle cx="10" cy="8" r="1.5" />
                <circle cx="14" cy="8" r="1.5" />
              </svg>
            ))}
          </div>
          
          <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center bg-white rounded-[3rem] p-12 md:p-16 shadow-2xl border-4 border-gray-100"
            >
              <div className="inline-block bg-primary/10 px-6 py-2 rounded-full mb-6">
                <span className="font-fredoka text-primary text-lg">Your Impact</span>
              </div>
              
              <h2 className="font-fredoka text-4xl md:text-5xl mb-8 text-primary">
                Why Your Support Matters
              </h2>
              
              <p className="font-poppins text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-10">
                Every donation you make goes directly into saving lives. From medical care to shelter and 
                daily support, your contribution helps us reach animals in need and give them a second chance.
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
            </motion.div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </>
  );
}
