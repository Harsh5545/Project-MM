'use client'

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import Pagination from "@/hooks/Pagination"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronDown, Search, TrendingUp, Calendar, Eye, Tag } from 'lucide-react'
import { format } from "date-fns"
import { DM_Sans } from 'next/font/google'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const dmsans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export function BentoGridDemo({ blogs }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(9)
  const [featuredBlogs, setFeaturedBlogs] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setFeaturedBlogs(blogs.slice(0, 3))

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

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "" || blog.category?.category_name === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage)
  const paginatedBlogs = filteredBlogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const categories = Array.from(new Set(blogs.map((blog) => blog.category?.category_name).filter(Boolean)))

  return (
    <div className="flex flex-col md:flex-row w-full md:px-12 lg:px-24 mx-auto py-10 px-6 gap-10">
      <aside className="w-full md:w-1/4 space-y-8 bg-transparent md:bg-white dark:bg-gray-900 p-6 rounded-lg border h-fit border-gray-100 dark:border-gray-800 shadow-none md:shadow-sm">
       <div className="w-full space-y-8 ">
       <div className="space-y-2">
          <h3 className={`${dmsans.className} text-base font-medium text-gray-700 dark:text-gray-300`}>
            Search Articles
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="space-y-2 md:block hidden">
          <h3 className={`${dmsans.className} text-base font-medium text-gray-700 dark:text-gray-300`}>
            Filter by Category
          </h3>
          <div className="relative">
            <button
              className="w-full flex justify-between items-center border border-gray-200 dark:border-gray-700 p-2.5 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="truncate">{selectedCategory || "All Categories"}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto"
              >
                <button 
                  className="w-full text-left p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors" 
                  onClick={() => {
                    setSelectedCategory("");
                    setIsDropdownOpen(false);
                  }}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button 
                    key={category} 
                    className="w-full text-left p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors" 
                    onClick={() => { 
                      setSelectedCategory(category); 
                      setIsDropdownOpen(false); 
                    }}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
       </div>

        <div className="pt-2 border-t border-gray-100 dark:border-gray-800 hidden md:block">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className={`${dmsans.className} text-base font-medium text-gray-700 dark:text-gray-300`}>
              Trending Articles
            </h3>
          </div>
          
          <div className="space-y-4">
            {featuredBlogs.map((blog, index) => (
              <Link 
                key={blog.id || index} 
                href={`/blogs/${blog.slug}`}
                className="group block"
              >
                <div className="flex flex-col space-y-2 p-3 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                  <h4 className={`${dmsans.className} text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors`}>
                    {blog.title}
                  </h4>
                  <p className={`${dmsans.className} text-xs text-gray-500 dark:text-gray-400 line-clamp-2`}>
                    {blog.meta_desc || `By ${blog.author?.first_name || "Author"}`}
                  </p>
                  {blog.createdAt && (
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {format(new Date(blog.createdAt), "MMM dd, yyyy")}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </aside>

      <main className="w-full md:w-3/4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-full md:h-max">
          {paginatedBlogs.length > 0 ? (
            paginatedBlogs.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="h-full"
              >
                <Link href={`/blogs/${item.slug}`} className="block h-full">
                  <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col group">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={item.image || "/assets/default-blog.png"}
                        alt={item.title}
                        title={item.title}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* {item.category?.category_name && (
                        <Badge className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 text-primary hover:bg-white dark:hover:bg-gray-900 backdrop-blur-sm">
                          {item.category.category_name}
                        </Badge>
                      )} */}
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className={`${dmsans.className} font-medium text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors`}>
                        {item.title}
                      </h3>

                      <p className={`${dmsans.className} font-light text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 flex-grow`}>
                        {item.meta_desc || "No description available"}
                      </p>

                      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {item.createdAt && (
                              <span>{format(new Date(item.createdAt), "MMM dd, yyyy")}</span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1.5">
                            <Eye className="h-3.5 w-3.5" />
                            <span>{item.views || 0} views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center py-12 text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                <h3 className="text-lg font-medium mb-2">No articles found</h3>
                <p className="text-sm">Try adjusting your search or filter criteria</p>
              </div>
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
