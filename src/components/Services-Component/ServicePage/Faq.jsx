import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';



const Faq = (props) => {
    const { faqData } = props
  return (
    <section className="flex my-16 flex-col md:flex-row gap-8 p-4 md:p-8 lg:px-16 lg:py-36 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-lg w-full relative z-10">
      {/* Left Side */}
      <div className="md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left bg-clip-text text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mb-6">
          Why Choose Modern Mannerism?
        </h2>
        <Card className="dark:bg-gray-800 md:w-[75%] w-full shadow-md">
          <CardHeader>
            <CardTitle className="text-gray-700 dark:text-gray-300 text-xl font-bold mb-4">
              Benefits of Modern Mannerism
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">
              Modern Mannerism helps you navigate social situations with confidence and grace, making a positive impression in both personal and professional settings.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 w-full md:w-[60%]">
        <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left mb-6">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-lg font-medium text-gray-900 dark:text-white">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;