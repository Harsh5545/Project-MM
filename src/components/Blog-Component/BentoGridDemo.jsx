"use client";

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

export function BentoGridDemo({ blogs }) {
  console.log("Blogs received in BentoGridDemo:", blogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9); // Default

  useEffect(() => {
    // Adjust items per page based on screen size
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 768 ? 5 : 9);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Filtered and paginated blog list
  const filteredBlogs = blogs.filter((blog) => {
    return (
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col md:flex-row max-w-[90%] my-8 mx-auto gap-6 px-4 md:px-0">
      {/* Sidebar */}
      <aside className="hidden md:block md:w-1/3 lg:w-1/4 space-y-6">
        <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900">
          <Input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Filter by Category</h3>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <option value="">All Categories</option>
              {Array.from(new Set(blogs?.map((item) => item.category_name))).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </div>
        </BackgroundGradient>

        {/* Top Blogs */}
        <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900">
          <h3 className="text-lg font-semibold mb-4">Top Blogs</h3>
          <HoverEffect items={blogs.slice(0, 3).map((blog) => ({
            title: blog.title,
            description: `By ${blog.author}`,
            link: `/blog/${blog.id}`, 
          }))} />
        </BackgroundGradient>
      </aside>

      {/* Blog Grid */}
      <main className="w-full md:w-2/3 lg:w-3/4">
        <BentoGrid className="mx-auto">
          {paginatedBlogs.length > 0 ? (
            paginatedBlogs.map((item) => (
              <BentoGridItem
                key={item.id}
                title={item.title}
                description={item.meta_desc || "No description available"}
                header={
                  <div className="rounded-[22px] max-w-sm h-full">
                    <img
                      src={item.image || "/default-blog.png"} 
                      alt={item.title}
                      className="object-cover w-full h-auto rounded-[22px]"
                    />
                  </div>
                }
                icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
              >
                <AnimatedTooltip
                  items={[{ id: 1, name: item.category_name || "Uncategorized", designation: "Category", image: item.image }]}
                />
                {item.category_name && (
                  <Badge className="absolute top-4 right-4">{item.category_name}</Badge>
                )}
              </BentoGridItem>
            ))
          ) : (
            <div className="text-center text-gray-700 dark:text-gray-300 text-lg">
              No blogs available
            </div>
          )}
        </BentoGrid>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </main>
    </div>
  );
}
