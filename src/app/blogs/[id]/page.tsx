"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

interface MediaItem {
  url: string;
  type: 'image' | 'video';
}

interface Blog {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  media: MediaItem[];
  author: string;
  createdAt: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchBlog(params.id as string);
    }
  }, [params.id]);

  const fetchBlog = async (id: string) => {
    try {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      const foundBlog = data.find((b: Blog) => b._id === id);
      setBlog(foundBlog || null);
    } catch (error) {
      console.error("Error fetching blog:", error);
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

  const nextMedia = () => {
    if (blog && blog.media && blog.media.length > 0) {
      setCurrentMediaIndex((prev) => (prev + 1) % blog.media.length);
    }
  };

  const prevMedia = () => {
    if (blog && blog.media && blog.media.length > 0) {
      setCurrentMediaIndex((prev) => (prev - 1 + blog.media.length) % blog.media.length);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-xl">Loading blog...</div>
        </div>
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center pt-20">
          <h1 className="text-3xl font-bold mb-4">Blog not found</h1>
          <Link href="/blogs" className="text-primary hover:underline">
            Back to Blogs
          </Link>
        </div>
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
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-primary hover:text-orange-600 font-fredoka mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Blogs
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
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
                  <span className="font-poppins">{formatDate(blog.createdAt)}</span>
                </div>
              </div>

              {/* Media Carousel */}
              {blog.media && blog.media.length > 0 ? (
                <div className="relative mb-8">
                  <div className="relative h-96 rounded-2xl overflow-hidden">
                    {blog.media.map((item, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          index === currentMediaIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        {item.type === 'image' ? (
                          <img
                            src={item.url}
                            alt={`${blog.title} - ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <video
                            src={item.url}
                            className="w-full h-full object-cover"
                            controls
                          />
                        )}
                      </div>
                    ))}

                    {blog.media.length > 1 && (
                      <>
                        <button
                          onClick={prevMedia}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                        >
                          <ChevronLeft className="w-6 h-6 text-primary" />
                        </button>
                        <button
                          onClick={nextMedia}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                        >
                          <ChevronRight className="w-6 h-6 text-primary" />
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {blog.media.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentMediaIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                index === currentMediaIndex ? 'bg-white w-6' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : blog.image ? (
                <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : null}

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 mb-6 font-poppins leading-relaxed">
                  {blog.description}
                </p>
                
                <div className="text-gray-700 font-poppins leading-relaxed whitespace-pre-wrap">
                  {blog.content}
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
