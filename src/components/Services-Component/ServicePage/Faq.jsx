import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Faq = ({data}) => {
  

  return (
    <section className="flex bg-[#c3965d] my-16 flex-col md:flex-row gap-8 p-4 md:p-8 lg:px-16 lg:py-36 rounded-lg shadow-lg w-full relative z-10">
    <div className="absolute inset-0 bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] opacity-80 rounded-lg"></div>
    <div className="relative flex flex-col md:flex-row gap-8 w-full">
      {/* Left Side */}
      <div className="md:w-1/2">
        <span className="text-3xl md:text-4xl font-bold text-center md:text-left bg-clip-text text-white mb-6 block">
          Why Choose Modern Mannerism?
        </span>
        <Card className="dark:bg-gray-800 lg:bg-opacity-80 bg-opacity-40 bg-white md:w-[75%] w-full shadow-md">
          <CardHeader>
            <CardTitle className="text-gray-700 dark:text-gray-300 text-xl font-bold mb-4">
              Benefits of Modern Mannerism
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">
              {data?.mmDescription}
            </p>
          </CardContent>
        </Card>
      </div>
  
      {/* Right Side */}
      <div className="w-full md:w-[60%]">
        <span className="text-3xl md:text-4xl font-bold text-center md:text-left my-8 bg-clip-text text-transparent bg-white mb-6 block">
          Frequently Asked Questions
        </span>
        <Accordion type="single" collapsible className="space-y-8">
          {data?.faqs?.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index} `} className="border-transparent">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-transparent border-none outline-none  shadow-md">
                  <AccordionTrigger className="text-lg bg-white bg-opacity-85 font-medium text-gray-900 dark:text-white p-4 rounded-t-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 bg-white bg-opacity-35   dark:text-gray-300 p-4 rounded-b-lg">
                    {faq.answer}
                  </AccordionContent>
                </Card>
              </motion.div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
  
  );
};

export default Faq;