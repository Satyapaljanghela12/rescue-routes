"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

const blogData: any = {
  "1": {
    title: "The Journey of Rescue: How We Save Lives Every Day",
    image: "/Images/WhatsApp Image 2026-04-11 at 20.21.17 (1).jpeg",
    author: "Sneha Saxena",
    date: "March 15, 2026",
    category: "Rescue Stories",
    content: [
      "Every day at Rescue Routes begins with a mission: to save lives and provide hope to animals in distress. Our rescue operations are not just about picking up injured animals from the streets; they represent a comprehensive system of care, compassion, and commitment.",
      "It usually starts with a phone call. Someone spots an injured dog on the roadside, a cat stuck in a dangerous situation, or a puppy abandoned in harsh weather. Our emergency response team springs into action immediately. Time is often the difference between life and death.",
      "Once at our facility, every rescued animal undergoes a thorough medical examination. Our veterinary team checks for injuries, infections, malnutrition, and any underlying health conditions. Treatment plans are created immediately, and critical cases receive priority care.",
      "Recovery is not just physical—it's emotional too. Many rescued animals have experienced trauma, neglect, or abuse. Our team provides not just medical care but also emotional support, helping these animals learn to trust humans again.",
      "The final step in our rescue journey is finding loving, permanent homes for these animals. We carefully screen potential adopters to ensure they can provide the care, commitment, and environment these animals deserve.",
    ],
  },
  "2": {
    title: "Understanding Animal Behavior: A Guide for New Volunteers",
    image: "/Images/WhatsApp Image 2026-04-11 at 20.21.17 (2).jpeg",
    author: "Dr. Rahul Verma",
    date: "March 10, 2026",
    category: "Education",
    content: [
      "Working with rescued animals requires more than just good intentions—it requires understanding. Animals communicate differently than humans, and recognizing their signals can make the difference between a successful rescue and a stressful situation.",
      "Animals express their emotions through body language. A wagging tail doesn't always mean happiness—the speed, height, and stiffness of the wag tell the real story. Ears pinned back, a lowered head, or a tucked tail often indicate fear or submission.",
      "Rescued animals often come from traumatic backgrounds. They may have been abused, neglected, or abandoned. Building trust takes time. Some animals warm up quickly, while others need weeks or months to feel safe.",
      "Aggression is usually rooted in fear, pain, or past trauma. An aggressive animal is not a bad animal—they're a scared animal trying to protect themselves. Understanding this changes how we respond.",
      "If you're new to animal rescue, start by observing experienced volunteers. Ask questions, learn the protocols, and never hesitate to ask for help. With time and experience, you'll develop the skills and confidence needed.",
    ],
  },
  "3": {
    title: "Success Story: From Street to Home",
    image: "/Images/WhatsApp Image 2026-04-11 at 20.21.17 (3).jpeg",
    author: "Priya Sharma",
    date: "March 5, 2026",
    category: "Success Stories",
    content: [
      "This is the story of Bruno—a street dog who went from fighting for survival to living his best life in a loving home. His journey represents everything we work for at Rescue Routes.",
      "We found Bruno on a cold winter morning, lying motionless on the side of a busy road. He had been hit by a vehicle and left to die. His leg was badly injured, and he was severely malnourished.",
      "At our facility, our veterinary team worked through the night. Bruno's leg was fractured in multiple places, and he had internal injuries. The surgery was complex and risky, but our team was determined to give him a chance.",
      "Physical recovery was only part of Bruno's journey. He had lived on the streets his entire life, facing hunger, abuse, and constant danger. Learning to trust humans was perhaps harder than healing his physical wounds.",
      "Today, Bruno is thriving. He has his own bed, regular meals, medical care, and most importantly, a family who loves him unconditionally. The transformation is remarkable.",
    ],
  },
  "4": {
    title: "The Importance of Sterilization Programs",
    image: "/Images/WhatsApp Image 2026-04-11 at 20.21.17 (4).jpeg",
    author: "Dr. Anjali Patel",
    date: "February 28, 2026",
    category: "Health & Welfare",
    content: [
      "Sterilization programs are one of the most effective tools we have for improving the lives of street animals and managing their population humanely.",
      "Street animal populations can grow exponentially without intervention. A single unsterilized female dog can have multiple litters per year, with each litter containing 4-6 puppies.",
      "Sterilization isn't just about population control—it has significant health benefits. Sterilized animals have lower risks of certain cancers, infections, and reproductive diseases.",
      "At Rescue Routes, we follow a comprehensive sterilization protocol. Animals are captured humanely, given pre-surgery health checks, and operated on by experienced veterinarians.",
      "Supporting sterilization programs is one of the most impactful ways to help street animals. You can donate to fund surgeries, volunteer to help, or spread awareness.",
    ],
  },
  "5": {
    title: "How to Create a Pet-Friendly Community",
    image: "/Images/WhatsApp Image 2026-04-11 at 20.21.18 (1).jpeg",
    author: "Vikram Singh",
    date: "February 20, 2026",
    category: "Community",
    content: [
      "Creating a pet-friendly community isn't just about tolerating animals—it's about actively making spaces where animals and humans can coexist peacefully and safely.",
      "Many conflicts between humans and animals stem from misunderstanding. Educate your neighbors about animal behavior and the importance of street animals in the ecosystem.",
      "One of the simplest ways to help street animals is by setting up feeding stations. Designate specific areas where community members can leave food and water for animals.",
      "Partner with local animal welfare organizations to implement community-wide sterilization programs. This helps control the animal population humanely.",
      "Creating a pet-friendly community is a journey that requires patience, persistence, and collaboration. But the rewards are worth every effort.",
    ],
  },
  "6": {
    title: "Winter Care: Protecting Animals in Cold Weather",
    image: "/Images/WhatsApp Image 2026-04-11 at 20.21.18 (2).jpeg",
    author: "Neha Gupta",
    date: "February 15, 2026",
    category: "Seasonal Care",
    content: [
      "Winter can be brutal for street animals. Without proper shelter, food, and care, many animals suffer or die during cold weather.",
      "Cold weather poses multiple threats to animals. Hypothermia occurs when body temperature drops dangerously low. Frostbite can damage ears, paws, and tails.",
      "Shelter is the most critical need during winter. If you have space, create simple shelters using cardboard boxes, plastic containers, or wooden crates lined with blankets.",
      "Animals need more calories in winter to maintain body heat. Increase feeding amounts and frequency during cold weather. High-protein, high-fat foods provide the energy needed.",
      "Winter reminds us how vulnerable street animals are. But it also shows us how much we can accomplish when we work together with compassion and commitment.",
    ],
  },
};

export default function BlogPost() {
  const params = useParams();
  const id = params.id as string;
  const blog = blogData[id];

  if (!blog) {
    return (
      <>
        <Navbar />
        <main className="flex-1 w-full overflow-hidden pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-fredoka text-4xl text-primary mb-4">Blog Not Found</h1>
            <Link href="/blogs" className="text-primary hover:text-orange-600 font-fredoka">
              Back to Blogs
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-hidden pt-20">
        
        {/* Hero Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-primary hover:text-orange-600 font-fredoka mb-8 transition-colors"
              >
                <ArrowLeft size={20} />
                Back to Blogs
              </Link>

              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-4">
                <span className="font-fredoka text-primary text-sm">{blog.category}</span>
              </div>

              <h1 className="font-fredoka text-4xl md:text-5xl text-primary mb-6 leading-tight">
                {blog.title}
              </h1>

              <div className="flex items-center gap-6 mb-8 text-gray-600">
                <div className="flex items-center gap-2">
                  <User size={18} />
                  <span className="font-poppins">{blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span className="font-poppins">{blog.date}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              {blog.content.map((paragraph: string, index: number) => (
                <p key={index} className="font-poppins text-lg text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </motion.article>
          </div>
        </section>

        {/* Related Blogs CTA */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <h2 className="font-fredoka text-3xl text-primary mb-6">
              Want to Read More?
            </h2>
            <Link
              href="/blogs"
              className="inline-block bg-primary hover:bg-orange-600 text-white font-fredoka font-bold text-lg py-4 px-10 rounded-full transition-all hover:scale-105 shadow-lg"
            >
              View All Blogs
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
