import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaCheckCircle, FaStar, FaHeart } from 'react-icons/fa'; // Importing icons from react-icons

const programHighlightsData = [
  {
    icon: FaCheckCircle,
    heading: 'Highlight 1',
    description: 'Description for highlight 1.'
  },
  {
    icon: FaStar,
    heading: 'Highlight 2',
    description: 'Description for highlight 2.'
  },
  {
    icon: FaHeart,
    heading: 'Highlight 3',
    description: 'Description for highlight 3.'
  },
  {
    icon: FaHeart,
    heading: 'Highlight 4',
    description: 'Description for highlight 4.'
  },
  // Add more highlights as needed
];

const ProgramHighlights = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % programHighlightsData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + programHighlightsData.length) % programHighlightsData.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-8 mt-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-lg w-full relative z-10">
      <h2 className="text-3xl relative md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mb-8">
        Program Highlights
      </h2>
      <div className="relative">
        <div className="flex overflow-x-auto space-x-4">
          {programHighlightsData.map((highlight, index) => {
            const IconComponent = highlight.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: currentIndex <= index && index < currentIndex + 4 ? 1 : 0, x: currentIndex <= index && index < currentIndex + 4 ? 0 : 100 }}
                transition={{ duration: 0.5 }}
                className={`w-full md:w-1/4 p-4 ${currentIndex <= index && index < currentIndex + 4 ? 'block' : 'hidden'}`}
              >
                <Card className="transition-all duration-300 hover:bg-black hover:text-white group">
                  <div className="flex justify-center items-center p-4">
                    <IconComponent className="w-16 h-16 text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:text-white" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">{highlight.heading}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{highlight.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        <div className="flex justify-center mt-4">
          {programHighlightsData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 mx-1 rounded-full ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramHighlights;