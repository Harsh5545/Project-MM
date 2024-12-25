"use client";

import { useState } from "react";
import BlogContainer from "./BlogContainer";
import { Pagination } from "@shadcn/ui";
import { Input, Button, Select, SelectItem } from "@shadcn/ui";

import { FaFilter, FaSearch } from 'react-icons/fa'; // Example using FontAwesome icons

import ShadcnButton from "../Atom/button/ShadcnButton";

const blogData = [
  {
    title: "Blog 1",
    description: "Elevate Your Professional Image with These Essential Grooming Tips",
    categories: "Essential Grooming Tips",
    imageSrc: "/Blog/BLOG-1.jpg",
    commentCount: 5,
  },
  {
    title: "Blog 2",
    description: "Social Etiquette 101: Your Guide to Thriving at Formal Events",
    categories: "Social Etiquette",
    imageSrc: "/Blog/BLOG-2.jpg",
    commentCount: 12,
  },
  {
    title: "Blog 3",
    description: "Teaching Kids Manners: Why Etiquette is Vital in Today’s World?",
    categories: "Children Etiquette",
    imageSrc: "/Blog/BLOG-3.jpg",
    commentCount: 8,
  },
  {
    title: "Blog 4",
    description: "Discovering Your Best Colors: A Simple Guide to Color Analysis",
    categories: "Color Analysis 101",
    imageSrc: "/Blog/BLOG-4.jpeg",
    commentCount: 3,
  },
  {
    title: "Blog 5",
    description: "Workplace Etiquette: The Key to Building Professional Relationships",
    categories: "Workplace Etiquette",
    imageSrc: "/Blog/BLOG-5.jpg",
    commentCount: 6,
  },
  {
    title: "Blog 6",
    description: "Elevate Your Table Manners: Dining Etiquette Simplified",
    categories: "Dining Etiquette",
    imageSrc: "/Blog/BLOG-6.jpg",
    commentCount: 9,
  },
  {
    title: "Blog 7",
    description: "The Art of Small Talk: Socializing with Confidence",
    categories: "Social Skills",
    imageSrc: "/Blog/BLOG-7.jpg",
    commentCount: 7,
  },
  {
    title: "Blog 8",
    description: "Boost Your Career with Effective Communication",
    categories: "Professional Communication",
    imageSrc: "/Blog/BLOG-8.jpg",
    commentCount: 10,
  },
  {
    title: "Blog 9",
    description: "Why Posture Matters: Body Language Basics",
    categories: "Body Language",
    imageSrc: "/Blog/BLOG-9.jpg",
    commentCount: 4,
  },
  // Add more blogs for testing
];

export default function BlogPage() {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 6;
  const totalPages = Math.ceil(blogData.length / blogsPerPage);

  // Filtered and paginated blog data
  const filteredBlogs = blogData.filter((blog) => {
    const matchesFilter = filter
      ? blog.categories.toLowerCase().includes(filter.toLowerCase())
      : true;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="dark:bg-[rgb(0,0,31)] py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Mobile Filter and Search */}
        <div className="md:hidden flex items-center justify-between mb-6">
          {/* Filter Icon */}
          <ShadcnButton
            onClick={() => alert("Filter options opened")}
            variant="ghost"
            size="icon"
            className="text-gray-600 dark:text-gray-200"
          >
            <FaFilter />
          </ShadcnButton>

          {/* Compact Search */}
          <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 px-2 py-1 rounded-full">
            <FaSearch />
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Desktop Filter and Search */}
        <div className="hidden md:flex flex-col md:flex-row gap-6 mb-10 items-center justify-between">
          {/* Filter Dropdown */}
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
          >
            <SelectItem value="" disabled>Select a Category</SelectItem>
            <SelectItem value="personal-branding">Personal Branding</SelectItem>
            <SelectItem value="communication-skills">Communication Skills</SelectItem>
            <SelectItem value="corporate-etiquette">Corporate Etiquette</SelectItem>
            <SelectItem value="fine-dining-manners">Fine Dining Manners</SelectItem>
            <SelectItem value="children-etiquette">Children Etiquette</SelectItem>
          </Select>

          {/* Search Input */}
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search blog..."
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
          />
        </div>

        {/* Display Filtered Blogs */}
        <div className="grid gap-10">
          {paginatedBlogs.map((blog, index) => (
            <BlogContainer
              key={index}
              title={blog.title}
              description={blog.description}
              imageSrc={blog.imageSrc}
              categories={blog.categories}
              commentCount={blog.commentCount}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>

        {/* No Results Message */}
        {paginatedBlogs.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
            No blogs found matching your criteria.
          </p>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </div>
      </div>
    </div>
  );
}
