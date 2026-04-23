"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

const articles = [
  {
    id: "emergency-response",
    title: "Found an Injured Dog in Bhopal? Here Is What You Should Do Immediately",
    category: "Emergency Response Guide",
    excerpt: "Finding an injured dog on the streets of Bhopal is a distressing experience, but your quick actions can be the difference between life and death.",
  },
  {
    id: "summer-safety",
    title: "3 Simple Ways You Can Help Bhopal's Stray Dogs Survive the Summer",
    category: "Community Awareness & Heat Safety",
    excerpt: "Bhopal's summer temperatures can be brutal for our community dogs. Learn how you can help prevent emergencies.",
  },
  {
    id: "adoption-guide",
    title: "Why Adopting an Indie Dog in Bhopal is the Best Decision You'll Ever Make",
    category: "The Case for Adoption",
    excerpt: "Discover why the local 'Indie' breed is the perfect companion for a Bhopal household.",
  },
  {
    id: "volunteering",
    title: "Become a Hero for Animals: How to Volunteer with Rescue Routes in Bhopal",
    category: "The Power of Volunteering",
    excerpt: "Learn how you can make a tangible impact through fostering, logistics, or awareness campaigns.",
  },
  {
    id: "our-mission",
    title: "About Rescue Routes: Our Commitment to Animal Protection in Bhopal",
    category: "Our Mission",
    excerpt: "Learn about our vision to ensure that no animal in Bhopal has to suffer in silence.",
  },
  {
    id: "sterilization",
    title: "Why Sterilization is the Kindest Choice for Bhopal's Street Dogs & Cats",
    category: "The Importance of Sterilization",
    excerpt: "Understanding why sterilization is the most effective and humane way to manage street animal populations.",
  },
  {
    id: "puppy-care",
    title: "Found a Litter of Puppies? What to Do (and What Not to Do)",
    category: "Handling Puppy Seasons",
    excerpt: "Professional advice on how to handle abandoned puppies correctly.",
  },
  {
    id: "coexistence",
    title: "Living With Street Dogs: Tips for Peaceful Coexistence in Your Locality",
    category: "Coexistence Tips",
    excerpt: "Learn how to create a safe environment for both humans and animals in Bhopal.",
  },
  {
    id: "monsoon-care",
    title: "Monsoon Care: Protecting Bhopal's Strays During the Rainy Season",
    category: "Monsoon Precautions",
    excerpt: "Discover how you can help community dogs during the challenging rainy season.",
  },
  {
    id: "donations",
    title: "Where Your Money Goes: Transparency in Rescue Routes' Mission",
    category: "The Role of Donations",
    excerpt: "Complete transparency on how every rupee you donate is utilized to save lives.",
  },
  {
    id: "animal-cruelty-laws",
    title: "What to Do If Someone is Cruel to an Animal in Bhopal?",
    category: "Laws for Animals",
    excerpt: "Understanding your rights and responsibilities when witnessing animal cruelty.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-hidden pt-20">
        
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-white relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-fredoka text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight text-primary">
                Resources & Guides
              </h1>
              <p className="font-poppins text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Essential information and guides to help you make a difference in animal welfare in Bhopal
              </p>
            </motion.div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={`/resources/${article.id}`}
                    className="block h-full bg-white rounded-2xl border-2 border-gray-100 p-6 hover:border-primary hover:shadow-xl transition-all group"
                  >
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="font-fredoka text-xl text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="font-poppins text-sm text-gray-600 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center text-primary font-bold text-sm">
                      Read More
                      <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
