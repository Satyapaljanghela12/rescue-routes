import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import OrganizationsCarousel from "@/components/sections/OrganizationsCarousel";
import StatsSection from "@/components/sections/StatsSection";
import AboutSection from "@/components/sections/AboutSection";
import WhyRescueMatters from "@/components/sections/WhyRescueMatters";
import WhatWeDo from "@/components/sections/WhatWeDo";
import EventsSection from "@/components/sections/EventsSection";
import TeamSection from "@/components/sections/TeamSection";
import ContactForm from "@/components/sections/ContactForm";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-hidden">
        <HeroSection />
        <OrganizationsCarousel />
        <StatsSection />
        <AboutSection />
        <WhyRescueMatters />
        <WhatWeDo />
        <EventsSection />
        <TeamSection />
        <FinalCTA />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
