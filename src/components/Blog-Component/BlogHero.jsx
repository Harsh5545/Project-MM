import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; // Assuming you have a custom breadcrumb setup

function BlogHero() {
  return (
    <div className="w-full bg-cover">
      <div className="bg-[url('/assets/Website-Background.jpg')] bg-no-repeat bg-center w-full bg-cover min-h-[30vh] md:min-h-[40vh] flex items-center relative justify-center">
        {/* Content goes here */}
        <div className="absolute inset-0 dark:bg-[#060507] bg-[#BEBEBE] dark:bg-opacity-60 bg-opacity-80"></div>
        <div className="w-full px-16 relative z-50 dark:text-white text-black">
          {/* About Us Breadcrumb */}
          <BreadcrumbList className="text-black p-4">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/about-us">Blog</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </div>
      </div>
    </div>
  );
}

export default BlogHero;
