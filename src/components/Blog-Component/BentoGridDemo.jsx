"use client";

import React, { useState } from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Button } from "../ui/button";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { BackgroundGradient } from "../ui/background-gradient";
import { HoverEffect } from "../ui/card-hover-effect";
import { Badge } from "../ui/badge";
import { IconArrowWaveRightUp, IconBoxAlignRightFilled, IconBoxAlignTopLeft, IconClipboardCopy, IconFileBroken, IconSignature, IconTableColumn } from "@tabler/icons-react";

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: "The Dawn of Innovation",
    description: "Elevate Your Professional Image with These Essential Grooming Tips",
    header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    imgSrc: "/assets/Etiquettechildren.jpg",
    category: "Innovation",
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    imgSrc: "/assets/technology.jpg",
    category: "Technology",
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    imgSrc: "/assets/design.jpg",
    category: "Design",
  },
  {
    title: "The Power of Communication",
    description: "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    imgSrc: "/assets/communication.jpg",
    category: "Communication",
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    imgSrc: "/assets/knowledge.jpg",
    category: "Knowledge",
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    imgSrc: "/assets/creation.jpg",
    category: "Creation",
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    imgSrc: "/assets/adventure.jpg",
    category: "Adventure",
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    imgSrc: "/assets/adventure.jpg",
    category: "Adventure",
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    imgSrc: "/assets/adventure.jpg",
    category: "Adventure",
  },
];

const topBlogs = [
  { title: "10 Essential Etiquette Rules for the Modern Professional", author: "Emily Post", link: "/blog/10-essential-etiquette-rules" },
  { title: "The Future of AI in Business: What You Need to Know", author: "Ray Kurzweil", link: "/blog/future-of-ai-in-business" },
  { title: "Mastering the Art of Public Speaking", author: "Dale Carnegie", link: "/blog/mastering-public-speaking" },
];

export function BentoGridDemo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "" || item.category === selectedCategory)
  );

  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
              {Array.from(new Set(items.map((item) => item.category))).map((category) => (
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
          <HoverEffect items={topBlogs.map((blog) => ({
            title: blog.title,
            description: `By ${blog.author}`,
            link: blog.link,
          }))} />
        </BackgroundGradient>
      </aside>

      {/* Main Blog Grid */}
      <main className="w-full md:w-2/3 lg:w-3/4">
        {/* Search and Category Dropdown for Mobile View */}
        <div className="md:hidden mb-6 space-y-4">
          <Input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <option value="">All Categories</option>
            {Array.from(new Set(items.map((item) => item.category))).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </div>

        <BentoGrid className="mx-auto">
          {currentItems.map((item, i) => (
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
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            >
              <AnimatedTooltip
                items={[
                  {
                    id: 1,
                    name: item.category,
                    designation: "Category",
                    image: item.imgSrc,
                  },
                ]}
              />
              <Badge className="absolute top-4 right-4">{item.category}</Badge>
            </BentoGridItem>
          ))}
        </BentoGrid>

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-2">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => setCurrentPage(page)}
              variant={currentPage === page ? "default" : "outline"}
            >
              {page}
            </Button>
          ))}
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
            disabled={currentPage === pageCount}
          >
            Next
          </Button>
        </div>
      </main>
    </div>
  );
}

