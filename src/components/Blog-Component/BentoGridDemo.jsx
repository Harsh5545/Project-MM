"use client";

import { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Button } from "../ui/button";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { BackgroundGradient } from "../ui/background-gradient";
import { HoverEffect } from "../ui/card-hover-effect";
import { Badge } from "../ui/badge";
import { IconClipboardCopy } from "@tabler/icons-react";

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

export function BentoGridDemo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogData, setBlogData] = useState([]);  // Blog data state
  const [loading, setLoading] = useState(true);  // Loading state

  const itemsPerPage = 7;

  // Fetch data from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/list-blog`);
        const result = await response.json();
        
        // Ensure the API response structure is correct and set data
        if (result.Success) {
          setBlogData(result.data);  // Store the blog items in state
        } else {
          console.error("Failed to fetch blogs:", result.message);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);
  ;  // Run this once when the component mounts

  if (loading) {
    return <div>Loading...</div>;  // Show loading state while fetching data
  }

  return (
    <div className="flex flex-col md:flex-row max-w-[90%] my-8 mx-auto gap-6 px-4 md:px-0">
      {/* Sidebar for Desktop View */}
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
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <option value="">All Categories</option>
              {Array.from(new Set(blogData.map((item) => item.category))).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </div>
        </BackgroundGradient>

        {/* Top Blogs Section */}
        <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900">
          <h3 className="text-lg font-semibold mb-4">Top Blogs</h3>
          <HoverEffect items={blogData.slice(0, 3).map((blog) => ({
            title: blog.title,
            description: `By ${blog.author}`,
            link: `/blog/${blog.id}`, // Adjust link based on blog id
          }))} />
        </BackgroundGradient>
      </aside>

      {/* Main Blog Grid */}
      <main className="w-full md:w-2/3 lg:w-3/4">
      <BentoGrid className="mx-auto">
  {blogData.length > 0 ? (
    blogData.map((item, i) => (
      <BentoGridItem
        key={i}
        title={item.title}
        description={item.description}
        header={
          <div className="rounded-[22px] max-w-sm h-full">
            <img
              src={item.imgSrc}
              alt={item.title}
              className="object-cover w-full h-auto rounded-[22px]"
            />
          </div>
        }
        icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
      >
        <AnimatedTooltip
          items={[{ id: 1, name: item.category, designation: "Category", image: item.imgSrc }]}
        />
        <Badge className="absolute top-4 right-4">{item.category}</Badge>
      </BentoGridItem>
    ))
  ) : (
    <div>No blogs available</div> // Handle no blog case
  )}    
</BentoGrid>

      </main>
    </div>
  );
}
