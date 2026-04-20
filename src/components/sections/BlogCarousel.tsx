"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, User } from "lucide-react";
import Link from "next/link";

interface MediaItem {
  url: string;
  type: 'image' | 'video';
}

interface Blog {
  _id: string;
  title: string;
  description: string;
  media: MediaItem[];
  author: string;
  createdAt: string;
}

export default function BlogCarousel() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      // Only show blogs that have media
      const blogsWithMedia = data.filter((blog: Blog) => blog.media && blog.media.length > 0);
      setBlogs(blogsWithMedia);
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

  const nextSlide = () => {
    if (blogs.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % blogs.length);
    }
  };

  const prevSlide = () => {
    if (blogs.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
    }
  };

  if (loading || blogs.length === 0) {
    return null;
  }

  const currentBlog = blogs[currentIndex];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-fredoka text-4xl md:text-5xl text-primary mb-4">
            Latest Stories & Updates
          </h2>
          <p className="font-poppins text-lg text-gray-600">
            Explore our rescue journey through photos and videos
          </p>
        </div>

        <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
          {/* Media Carousel */}
          <div className="relative h-96 md:h-[500px]">
            {currentBlog.media.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === 0 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={currentBlog.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={item.url}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    loop
                  />
                )}
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </button>
          </div>

          {/* Blog Info */}
          <div className="p-8 md:p-12">
            <h3 className="font-fredoka text-3xl md:text-4xl text-primary mb-4">
              {currentBlog.title}
            </h3>
            <p className="font-poppins text-gray-700 leading-relaxed mb-6">
              {currentBlog.description}
            </p>

            <div className="flex items-center gap-6 mb-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span className="font-poppins">{currentBlog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span className="font-poppins">{formatDate(currentBlog.createdAt)}</span>
              </div>
            </div>

            <Link
              href={`/blogs/${currentBlog._id}`}
              className="inline-flex items-center gap-2 bg-primary hover:bg-orange-600 text-white font-fredoka font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg"
            >
              Read Full Story
            </Link>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 pb-6">
            {blogs.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-primary w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
