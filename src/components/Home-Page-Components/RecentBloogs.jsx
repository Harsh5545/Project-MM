"use client"
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { FiChevronLeft, FiChevronRight, FiClock, FiUser } from "react-icons/fi";

const RecentBlogCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const singleBlogPosts = [
    {
      id: 1,
      title: "The Future of Web Development: AI Integration",
      excerpt: "Exploring how artificial intelligence is reshaping modern web development practices and what it means for developers.",
      author: "Alex Wilson",
      date: new Date("2024-01-15"),
      category: "Technology",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    },
    {
      id: 2,
      title: "Mastering Responsive Design Patterns",
      excerpt: "A comprehensive guide to implementing responsive design patterns for modern web applications.",
      author: "Jane Smith",
      date: new Date("2024-01-14"),
      category: "Design",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766",
    },
    {
      id: 3,
      title: "Understanding Web Performance Optimization",
      excerpt: "Deep dive into techniques and strategies for optimizing web application performance.",
      author: "Mike Johnson",
      date: new Date("2024-01-13"),
      category: "Performance",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    }
  ];

  const blogPosts = [...singleBlogPosts, ...singleBlogPosts];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === blogPosts.length - 1 ? 0 : prev + 1));
  }, [blogPosts.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? blogPosts.length - 1 : prev - 1));
  }, [blogPosts.length]);

  const BlogCard = ({ post, index }) => (
    <motion.div
      key={post.id}
      className="relative flex-none w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2";
            }}
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
              {post.category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <FiUser className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {format(post.date, "MMM dd, yyyy")}
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading blog posts: {error}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full px-24 py-12 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Recent Blog Posts
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-96"
              />
            ))}
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex space-x-6 transition-transform duration-300"
                animate={{ x: `-${currentIndex * 100}%` }}
              >
                <AnimatePresence>
                  {blogPosts.map((post, index) => (
                    <BlogCard key={`${post.id}-${index}`} post={post} index={index} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Previous slide"
            >
              <FiChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Next slide"
            >
              <FiChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentBlogCarousel;