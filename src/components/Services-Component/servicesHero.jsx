import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'; // Assuming you have a custom breadcrumb component from ShadCN

function ServicesHero() {
  return (
    <div className='w-full bg-cover'>
      <div className="bg-[url('/assets/ModernMannerismAbout.jpg')] bg-no-repeat bg-center w-full bg-cover min-h-[30vh] md:min-h-[40vh] flex items-center relative justify-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-opacity-25 dark:bg-opacity-60 dark:bg-[#060507] bg-[#FAE7F3]"></div>
        <div className="w-full px-16 relative z-50 dark:text-white text-black">
          {/* Breadcrumb */}
          <BreadcrumbList className="text-black p-4">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/services">Services</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </div>
      </div>
    </div>
  );
}

export default ServicesHero;
