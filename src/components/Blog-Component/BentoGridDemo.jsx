"use client"
import { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { BackgroundGradient } from "../ui/background-gradient";
import { HoverEffect } from "../ui/card-hover-effect";
import { Badge } from "../ui/badge";
import { IconClipboardCopy } from "@tabler/icons-react";
import Pagination from "@/hooks/Pagination";
import Link from "next/link";

export function BentoGridDemo({ blogs }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 768 ? 6 : 12);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col md:flex-row w-full md:px-12 lg:px-24 mx-auto py-10 px-6 gap-10">
      <aside className="hidden md:block w-1/4 space-y-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md">
        <Input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border p-3 rounded-md"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <option value="">All Categories</option>
          {Array.from(new Set(blogs.map((item) => item.category_name))).map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
        </Select>
        <h3 className="text-lg  font-semibold">Top Blogs</h3>
        <HoverEffect
          items={blogs.slice(0, 3).map((blog) => ({
            title: blog.title,
            description: `By ${blog.author}`,
            link: `/blog/${blog.slug}`,
          }))}
        />
      </aside>

      <main className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedBlogs.length > 0 ? (
          paginatedBlogs.map((item) => (
            <Link key={item.slug} href={`/blogs/${item.slug}`} passHref>
              <div className="relative bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                <img
                  src={item.image || "/default-blog.png"}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold mt-3">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{item.meta_desc || "No description available"}</p>
                {item.category_name && (
                  <Badge className="absolute top-3 right-3 bg-blue-600 text-white">{item.category_name}</Badge>
                )}
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300 col-span-full">No blogs available</p>
        )}
      </main>

      {totalPages > 1 && (
        <div className="flex justify-center w-full mt-8">
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  );
}