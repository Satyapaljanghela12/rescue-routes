"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "The Journey of Rescue: How We Save Lives Every Day",
    excerpt: "Discover the behind-the-scenes process of animal rescue operations and how our team works tirelessly to save lives.",
    image: "/Images/WhatsApp Image 2026-04-11 at 20.21.17 (1).jpeg",
    author: "Sneha Saxena",
    date: "March 15, 2026",
    category: "Rescue Stories",
  },
  {
    id: 2,
    title: "Understanding Animal Behavior: A Guide for New Volunteers",
    excerpt: "Learn the basics of animal behavior and how to approach rescued animals with care and compassion.",
    image: "/Images/WhatsApp Image 2026-04-11 at 20.21.17 (2).jpeg",
    author: "Dr. Rahul Verma",
    date: "March 10, 2026",
    category: "Education",
  },
  {
    id: 3,
    title: "Success Story: From Street to Home",
    excerpt: "Follow the heartwarming journey of a rescued dog who found his forever family after months of rehabilitation.",
    image: "/Images/WhatsApp Image 2026-04-11 at 20.21.17 (3).jpeg",
    author: "Priya Sharma",
    date: "March 5, 2026",
    category: "Success Stories",
  },
  {
    id: 4,
    title: "The Importance of Sterilization Programs",
    excerpt: "Why sterilization is crucial for controlling the street animal population and improving their quality of life.",
    image: "/Images/WhatsApp Image 2026-04-11 at 20.21.17 (4).jpeg",
    author: "Dr. Anjali Patel",
    date: "February 28, 2026",
    category: "Health & Welfare",
  },
  {
    id: 5,
    title: "How to Create a Pet-Friendly Community",
    excerpt: "Simple steps you can take to make your neighborhood more welcoming and safe for street animals.",
    image: "/Images/WhatsApp Image 2026-04-11 at 20.21.18 (1).jpeg",
    author: "Vikram Singh",
    date: "February 20, 2026",
    category: "Community",
  },
  {
    id: 6,
    title: "Winter Care: Protecting Animals in Cold Weather",
    excerpt: "Essential tips for helping street animals survive harsh winter conditions and stay warm.",
    image: "/Images/WhatsApp Image 2026-04-11 at 20.21.18 (2).jpeg",
    author: "Neha Gupta",
    date: "February 15, 2026",
    category: "Seasonal Care",
  },
];

export default function BlogsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-hidden pt-20">
        
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-fredoka text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight text-primary">
                Our Blogs
              </h1>
              <p className="font-poppins text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Stories, insights, and updates from the world of animal rescue and welfare
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Blog */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="font-fredoka text-3xl md:text-4xl text-primary mb-2">Featured Post</h2>
              <div className="w-20 h-1 bg-primary rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid lg:grid-cols-2 gap-8 items-center bg-white rounded-3xl overflow-hidden shadow-xl"
            >
              <div className="relative h-96 lg:h-full">
                <Image
                  src={blogs[0].image}
                  alt={blogs[0].title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-8 md:p-12">
                <div className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-4">
                  <span className="font-fredoka text-primary text-sm">{blogs[0].category}</span>
                </div>
                
                <h3 className="font-fredoka text-3xl md:text-4xl text-primary mb-4">
                  {blogs[0].title}
                </h3>
                
                <p className="font-poppins text-gray-700 leading-relaxed mb-6">
                  {blogs[0].excerpt}
                </p>
                
                <div className="flex items-center gap-6 mb-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span className="font-poppins">{blogs[0].author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span className="font-poppins">{blogs[0].date}</span>
                  </div>
                </div>
                
                <Link
                  href={`/blogs/${blogs[0].id}`}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-orange-600 text-white font-fredoka font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg"
                >
                  Read More
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-fredoka text-3xl md:text-4xl text-primary mb-4">
                Latest Articles
              </h2>
              <p className="font-poppins text-lg text-gray-600">
                Explore more stories and insights from our rescue journey
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.slice(1).map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-fredoka font-medium text-primary">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-fredoka text-xl text-primary mb-3 line-clamp-2">
                      {blog.title}
                    </h3>
                    
                    <p className="font-poppins text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span className="font-poppins">{blog.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span className="font-poppins">{blog.date}</span>
                      </div>
                    </div>
                    
                    <Link
                      href={`/blogs/${blog.id}`}
                      className="inline-flex items-center gap-2 text-primary hover:text-orange-600 font-fredoka font-bold transition-colors"
                    >
                      Read More
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center bg-white rounded-3xl p-12 md:p-16 shadow-xl"
            >
              <h2 className="font-fredoka text-3xl md:text-4xl text-primary mb-4">
                Want to Share Your Story?
              </h2>
              
              <p className="font-poppins text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto mb-8">
                Have an inspiring rescue story or valuable insights to share? We'd love to feature your experience on our blog.
              </p>
              
              <Link
                href="/contact"
                className="inline-block bg-primary hover:bg-orange-600 text-white font-fredoka font-bold text-lg py-4 px-10 rounded-full transition-all hover:scale-105 shadow-lg"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
