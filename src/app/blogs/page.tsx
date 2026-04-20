"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  author: string;
  createdAt: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-xl">Loading blogs...</div>
        </div>
      </>
    );
  }

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

        {/* Blogs Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            {blogs.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600">No blogs available yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                  <motion.article
                    key={blog._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      {blog.image ? (
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-fredoka text-xl text-primary mb-3 line-clamp-2">
                        {blog.title}
                      </h3>
                      
                      <p className="font-poppins text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {blog.description}
                      </p>
                      
                      <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span className="font-poppins">{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span className="font-poppins">{formatDate(blog.createdAt)}</span>
                        </div>
                      </div>
                      
                      <Link
                        href={`/blogs/${blog._id}`}
                        className="inline-flex items-center gap-2 text-primary hover:text-orange-600 font-fredoka font-semibold transition-colors"
                      >
                        Read More
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
