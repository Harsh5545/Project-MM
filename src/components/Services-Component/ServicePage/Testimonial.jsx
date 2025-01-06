import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaQuoteLeft } from 'react-icons/fa'; // Importing an icon from react-icons
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const testimonialsData = [
  {
    quote: "The Children’s Etiquette Program was a game-changer for my daughter. She’s now confident in her interactions and has become more respectful towards everyone. Thank you, Modern Mannerism!",
    author: "Priya Sharma, Parent",
  },
  {
    quote: "The Children’s Etiquette Program was a game-changer for my daughter. She’s now confident in her interactions and has become more respectful towards everyone. Thank you, Modern Mannerism!",
    author: "Priya Sharma, Parent",
  },
  {
    quote: "The Children’s Etiquette Program was a game-changer for my daughter. She’s now confident in her interactions and has become more respectful towards everyone. Thank you, Modern Mannerism!",
    author: "manasi Sharma, Parent",
  },
  {
    quote: "The Children’s Etiquette Program was a game-changer for my daughter. She’s now confident in her interactions and has become more respectful towards everyone. Thank you, Modern Mannerism!",
    author: "chinmay Sharma, Parent",
  },
  {
    quote: "The Children’s Etiquette Program was a game-changer for my daughter. She’s now confident in her interactions and has become more respectful towards everyone. Thank you, Modern Mannerism!",
    author: "dipak Sharma, Parent",
  },
  // Add more testimonials as needed
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Testimonials = () => {
  return (
    <section className="py-8 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg w-full relative z-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mb-6">
        Testimonials
      </h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4"
          >
            <Card className="transition-all duration-300 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <CardHeader className="flex items-center gap-2">
                <FaQuoteLeft className="text-gray-400 dark:text-gray-500" />
                {/* <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">Testimonial</CardTitle> */}
              </CardHeader>
              <CardContent>
                <p className="italic text-gray-700 dark:text-gray-300">{testimonial.quote}</p>
                <footer className="text-right mt-4 text-gray-900 dark:text-white">- {testimonial.author}</footer>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Carousel>
    </section>
  );
};

export default Testimonials;