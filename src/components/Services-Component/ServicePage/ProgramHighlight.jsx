import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaCheckCircle, FaStar, FaHeart } from 'react-icons/fa'; // Importing icons from react-icons

import icons from "@/hooks/icons";

const ProgramHighlights = ({data}) => {
  const [isMobile, setIsMobile] = useState(false);
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="py-8 mt-16 px-4 md:px-6 lg:px-6 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-lg w-full relative z-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mb-8">
        Program Highlights
      </h2>
      <div className="relative">
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
          {data?.programHighlights?.map((highlight, index) => {
           
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="p-2 text-center"
              >
                <Card className="h-auto transition-all duration-100 hover:bg-gradient-to-r hover:from-[#c3965d] hover:via-[#eabf91] hover:to-[#c3965d] hover:text-white group">
                  <div className="flex justify-center pt-12 items-center pb-4 px-4">
                  {icons[highlight.icon] ? React.cloneElement(icons[highlight.icon], { size: 40, color: "#eabf91" }) : null}
                                  
                  </div>
                  <CardHeader className="text-center py-2 space-y-1 px-4">
                    <CardTitle className="text-base lg:text-lg font-bold transition-all duration-100 group-hover:text-white">{highlight?.heading}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pb-6 px-4">
                    <p className="transition-all text-sm duration-100 group-hover:text-white">{highlight.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgramHighlights;