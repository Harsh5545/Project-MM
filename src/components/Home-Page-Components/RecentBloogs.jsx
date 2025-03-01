"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { Cormorant_Garamond } from "next/font/google"
import { ChevronLeft, ChevronRight, Clock, User } from "lucide-react"
import Link from "next/link"

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
})

// Sample blog posts - replace with your actual data
const blogPosts = [
  {
    id: 1,
    title: "The Art of First Impressions: Why They Matter",
    excerpt:
      "Discover the science behind first impressions and learn practical techniques to make a positive impact in any professional or social setting.",
    author: "Manasi Kadam",
    date: new Date("2023-11-15"),
    category: "Professional Etiquette",
    image: "/assets/BusinessHandshake.jpg",
    slug: "art-of-first-impressions",
  },
  {
    id: 2,
    title: "Teaching Children Manners: A Modern Approach",
    excerpt:
      "Modern approaches to teaching etiquette to children that focus on empathy, respect, and social awareness rather than rigid rules.",
    author: "Manasi Kadam",
    date: new Date("2023-10-28"),
    category: "Children's Etiquette",
    image: "/assets/manasi-about.jpg",
    slug: "teaching-children-manners",
  },
  {
    id: 3,
    title: "Business Dining: Navigating Complex Table Settings",
    excerpt:
      "A comprehensive guide to formal dining etiquette, from understanding place settings to proper use of utensils in business contexts.",
    author: "Manasi Kadam",
    date: new Date("2023-10-10"),
    category: "Dining Etiquette",
    image: "/assets/manasi-about1.jpg",
    slug: "business-dining-table-settings",
  },
]

const RecentBloogs = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visiblePosts, setVisiblePosts] = useState(1)

  // Determine how many posts to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisiblePosts(3)
      } else if (window.innerWidth >= 768) {
        setVisiblePosts(2)
      } else {
        setVisiblePosts(1)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + visiblePosts >= blogPosts.length ? 0 : prevIndex + visiblePosts))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - visiblePosts < 0 ? Math.max(0, blogPosts.length - visiblePosts) : prevIndex - visiblePosts,
    )
  }

  // Get the posts to display based on current index and visible posts count
  const getVisiblePosts = () => {
    const posts = []
    for (let i = 0; i < visiblePosts; i++) {
      const index = (currentIndex + i) % blogPosts.length
      posts.push(blogPosts[index])
    }
    return posts
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-12"
        >
          <h2 className={`${cormorantGaramond.className} text-4xl font-bold text-gray-900 mb-4`}>Latest Insights</h2>
          <div className="h-1 w-16 bg-gradient-to-r from-[#c3965d] to-[#eabf91] rounded-full"></div>
          <p className="text-gray-700 text-center max-w-2xl mt-4">
            Explore our latest articles on etiquette, personal development, and professional growth
          </p>
        </motion.div>

        <div className="relative">
          <div className="flex flex-wrap -mx-4">
            {getVisiblePosts().map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8"
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg h-full transition-transform duration-300 hover:transform hover:scale-[1.02]">
                    <div className="relative">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-[#c3965d] to-[#eabf91] rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3
                        className={`${cormorantGaramond.className} text-xl font-bold text-gray-900 mb-3 line-clamp-2`}
                      >
                        {post.title}
                      </h3>
                      <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{format(post.date, "MMM dd, yyyy")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#c3965d] hover:bg-amber-100 transition-colors"
              aria-label="Previous posts"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#c3965d] hover:bg-amber-100 transition-colors"
              aria-label="Next posts"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className={`${cormorantGaramond.className} bg-gradient-to-r from-[#c3965d] to-[#eabf91] inline-block px-8 py-3  text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300`}
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  )
}

export default RecentBloogs

