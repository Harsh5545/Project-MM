"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineArrowForwardIos, MdFilterList, MdSearch, MdStar, MdStarBorder } from "react-icons/md";
import { Cormorant_Garamond } from "next/font/google";
import { motion } from "framer-motion";
import Pagination from "@/hooks/Pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import styles from "./styles.module.css";

const dm_Sans = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
});

function ServicesComponent({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Reduced for better visibility
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Example categories - replace with actual categories from your data
  const categories = [
    "Business Etiquette",
    "Children's Manners",
    "Personality Development",
    "Corporate Training",
    "Social Etiquette",
  ];

  useEffect(() => {
    // Update items per page based on screen size
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(4);
      } else if (window.innerWidth < 1280) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(9);
      }
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Filter courses based on search term and selected categories
  const filteredCourses = data.filter((course) => {
    const title = course?.heading || "";
    const description = course?.subheading || "";
    const categoryName = course?.category?.category_name || "";

    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(categoryName);

    return matchesSearch && matchesCategory;
  });

  // Sort courses based on selected option
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case "popular":
        return (b.popularity || 0) - (a.popularity || 0);
      case "priceAsc":
        return (a.price || 0) - (b.price || 0);
      case "priceDesc":
        return (b.price || 0) - (a.price || 0);
      default:
        return (b.featured || 0) - (a.featured || 0);
    }
  });

  const totalPages = Math.ceil(sortedCourses.length / itemsPerPage);

  const paginatedCourses = sortedCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
    setCurrentPage(1); // Reset to first page when price range changes
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="w-full px-3 min-h-screen bg-gradient-to-t from-neutral-50 to-neutral-100 dark:from-[#00001F] dark:to-[#1a1a2e] py-8 md:py-16">
      <div className="max-w-2xl md:max-w-6xl lg:max-w-7xl mx-auto">
        {/* Heading */}
        <div className=" flex items-center flex-col justify-center text-center">
          <motion.h4
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${dm_Sans.className} text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#28425f] dark:from-[#eabf91] dark:to-[#c3965d]`}
          >
            Our Services
          
          </motion.h4>
            <hr className="h-1 mt-1 bg-gradient-to-r text-center  from-[#c3965d] via-[#eabf91] to-[#c3965d]   w-32" />
          {/* <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-gray-700 dark:text-gray-300"
          >
            Explore our wide range of programs designed to empower you.
          </motion.p> */}
        </div>

        {/* Mobile Filter Toggle */}
        {/* <div className="md:hidden mt-6 flex justify-center">
          <Button
            onClick={toggleFilters}
            variant="outline"
            className="flex items-center gap-2 bg-white dark:bg-[#1a1a2e] border-2 border-gray-300 dark:border-gray-700"
          >
            <MdFilterList className="text-xl" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div> */}

        <div className="mt-8 flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters - Hidden on mobile unless toggled */}
          {/* <motion.div
            className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-1/4 lg:w-1/5 bg-white dark:bg-[#1a1a2e] p-5 rounded-2xl shadow-lg`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Filters</h3>

            {/* Categories */}
            {/* <div className="mb-6">
              <h4 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Categories</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label
                      htmlFor={`category-${category}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Price Range */}
            {/* <div className="mb-6">
              <h4 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Price Range</h4>
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={50}
                value={priceRange}
                onValueChange={handlePriceRangeChange}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div> */}

            {/* Featured Filter */}
            {/* <div className="mb-6">
              <div className="flex items-center space-x-2">
                <Checkbox id="featured-only" />
                <Label
                  htmlFor="featured-only"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Featured Services Only
                </Label>
              </div>
            </div> */}

            {/* Clear Filters Button */}
            {/* <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => {
                setSelectedCategories([]);
                setPriceRange([0, 1000]);
                setCurrentPage(1);
              }}
            >
              Clear Filters
            </Button> */}
          {/* </motion.div> */} 

          {/* Main Content */}
          <div className="w-full ">
            {/* Search and Sort Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <div className="relative flex-grow">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search for a service..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#28425f] dark:focus:ring-[#eabf91] dark:bg-[#1a1a2e] dark:text-white"
                />
              </div>

              <Select value={sortOption} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full sm:w-[180px] border-2 border-gray-300 md:flex hidden dark:border-gray-700 rounded-xl">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  
                </SelectContent>
              </Select>
            </motion.div>

            {/* Results Count */}
            {/* <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Showing {paginatedCourses.length} of {filteredCourses.length} services
            </div> */}

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {paginatedCourses.length > 0 ? (
                paginatedCourses.map((course, index) => (
                  <Link key={course?.id} href={`/services/${course?.slug}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`group relative flex flex-col bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-lg overflow-hidden h-full transform hover:translate-y-[-8px] transition-all duration-300 ease-in-out border border-gray-100 dark:border-gray-800 `}
                    >
                      {/* Featured Badge - Show on every 3rd item for demo */}
                      {index % 10 === 0 && <span></span>}

                      {/* Image Section */}
                      <div className="relative w-full h-52 overflow-hidden">
                        <Image
                          alt={course.heading}
                          src={course.image || "/placeholder.svg"}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Category Badge */}
                        {/* <div className="absolute top-4 left-4">
                          <Badge className="bg-[#c3965d]/80 hover:bg-[#c3965d] text-white">
                            {course.category?.category_name || "Business"}
                          </Badge>
                        </div> */}
                      </div>

                      {/* Content Section */}
                      <div className="flex flex-col flex-grow justify-between p-6">
                        {/* Rating Stars - Example */}
                        {/* <div className="flex mb-2">
                          {[...Array(5)].map((_, i) =>
                            i < 4 ? (
                              <MdStar key={i} className="text-[#eabf91]" />
                            ) : (
                              <MdStarBorder key={i} className="text-[#eabf91]" />
                            )
                          )}
                          <span className="text-xs ml-2 text-gray-600 dark:text-gray-400">(4.0)</span>
                        </div> */}

                        <h5 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
                          {course?.heading}
                        </h5>

                        <p className="text-gray-700 dark:text-gray-400 text-sm flex-grow line-clamp-2 mb-4">
                          {course?.subheading}
                        </p>

                        {/* Remove Price and Button */}
                        <div className="flex items-center justify-between mt-4">
                          <button className="flex items-center justify-center bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] text-white text-sm dark:bg-[#eabf91] dark:text-[#1a1a2e] py-2 px-4 rounded-full font-semibold shadow-md hover:bg-[#1e3346] dark:hover:bg-[#d4a971] transition-colors duration-300">
                            See more
                            <MdOutlineArrowForwardIos className="ml-2" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))
              ) : (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9 }}
                  className="col-span-full text-center text-gray-700 dark:text-gray-300 text-lg py-12"
                >
                  No services match your search.
                </motion.p>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesComponent;