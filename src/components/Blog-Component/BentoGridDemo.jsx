"use client"
import { useState, useEffect } from "react"
import { Input } from "../ui/input"
import { Select } from "../ui/select"
import { HoverEffect } from "../ui/card-hover-effect"
import { Badge } from "../ui/badge"
import Pagination from "@/hooks/Pagination"
import Link from "next/link"
import { motion } from "framer-motion"

export function BentoGridDemo({ blogs }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(9)
  const [featuredBlogs, setFeaturedBlogs] = useState([])

  useEffect(() => {
    // Set featured blogs (top 3)
    setFeaturedBlogs(blogs.slice(0, 3))

    // Adjust items per page based on screen size
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(4)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(6)
      } else {
        setItemsPerPage(9)
      }
    }

    updateItemsPerPage()
    window.addEventListener("resize", updateItemsPerPage)
    return () => window.removeEventListener("resize", updateItemsPerPage)
  }, [blogs])

  // Filter blogs by search term and category
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "" || blog.category?.category_name === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage)
  const paginatedBlogs = filteredBlogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Get unique categories
  const categories = Array.from(new Set(blogs.map((blog) => blog.category?.category_name).filter(Boolean)))

  return (
    <div className="flex flex-col md:flex-row w-full md:px-12 lg:px-24 mx-auto py-10 px-6 gap-10">
      <aside className="w-full md:w-1/4 space-y-6 dark:bg-gray-900 p-6 rounded-lg">
        <Input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border p-3 rounded-md"
        />

        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">Category</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </div>

        <div className="mt-8 hidden md:block">
          <h3 className="text-lg font-semibold mb-4">Top Blogs</h3>
          <HoverEffect
            items={featuredBlogs.map((blog) => ({
              title: blog.title,
              description: blog.meta_desc || `By ${blog.author?.first_name || "Author"}`,
              link: `/blogs/${blog.slug}`,
            }))}
          />
        </div>
      </aside>

      <main className="w-full md:w-3/4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {paginatedBlogs.length > 0 ? (
            paginatedBlogs.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/blogs/${item.slug}`} className="block h-full">
                  <div className="relative bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                      <img
                        src={item.image || "/assets/default-blog.png"}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      {/* {item.category?.category_name && (
                        <Badge className="absolute top-3 right-3 bg-blue-600 text-white">
                          {item.category.category_name}
                        </Badge>
                      )} */}
                    </div>

                    <h3 className="text-lg font-semibold line-clamp-2 mb-2">{item.title}</h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4 flex-grow">
                      {item.meta_desc || "No description available"}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                      <span>
                        By {item.author?.first_name || "Author"} {item.author?.last_name || ""}
                      </span>
                      {item.createdAt && <span>{new Date(item.createdAt).toLocaleDateString()}</span>}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center py-12 text-gray-500">
              No blogs found matching your criteria
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center w-full mt-12">
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
          </div>
        )}
      </main>
    </div>
  )
}

