'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import UploadServices from './UploadServices';

const Testimonials = ({ testimonials, onTestimonialsChange, formData, setFormData }) => {
  const handleInputChange = (field, value) => {
    onTestimonialsChange({ [field]: value });
  };

  const handleArrayInputChange = (index, field, subfield, value) => {
    const newArray = [...testimonials[field]];
    newArray[index][subfield] = value;
    onTestimonialsChange({ [field]: newArray });
  };

  const addItem = (field) => {
    const newArray = [...testimonials[field], field === 'testimonials' ? { comment: '', name: '' } : { question: '', answer: '' }];
    onTestimonialsChange({ [field]: newArray });
  };

  const removeItem = (field, index) => {
    const newArray = testimonials[field].filter((_, i) => i !== index);
    onTestimonialsChange({ [field]: newArray });
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto bg-white dark:bg-gray-800 rounded-lg space-y-8">
        {/* Tagline Heading */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Tagline Heading:</label>
          <Input
            type="text"
            value={testimonials.taglineHeading}
            onChange={(e) => handleInputChange('taglineHeading', e.target.value)}
            placeholder="Enter the tagline heading"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* MM Description */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">MM Description:</label>
          <Input
            type="text"
            value={testimonials.mmDescription}
            onChange={(e) => handleInputChange('mmDescription', e.target.value)}
            placeholder="Enter the MM description"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Hero Image */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Hero Image:</label>
          <div className="flex items-center space-x-2">
            <UploadServices
              formData={testimonials}
              setFormData={setFormData}
              type="heroImage"
            />
            <span className="text-sm text-gray-500">Click to upload hero image</span>
          </div>
          {formData?.testimonials?.heroImage && (
            <div className="mt-4">
              <Image src={formData.testimonials.heroImage} width={400} height={200} alt="Hero" className="h-auto rounded-lg shadow-md" />
            </div>
          )}
        </div>

        {/* Outside Image */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Outside Image:</label>
          <div className="flex items-center space-x-2">
            <UploadServices
              formData={testimonials}
              setFormData={(newData) => onTestimonialsChange(newData)}
              type="outsideImage"
            />
            <span className="text-sm text-gray-500">Click to upload outside image</span>
          </div>
          {testimonials.outsideImage && (
            <div className="mt-4">
              <Image width={400} height={200} src={testimonials.outsideImage} alt="Outside" className="h-auto rounded-lg shadow-md" />
            </div>
          )}
        </div>

        {/* Testimonials */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Testimonials</h2>
        {testimonials.testimonials.map((testimonial, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Comment:</label>
              <Input
                type="text"
                value={testimonial.comment}
                onChange={(e) => handleArrayInputChange(index, 'testimonials', 'comment', e.target.value)}
                placeholder="Enter the comment"
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Name:</label>
              <Input
                type="text"
                value={testimonial.name}
                onChange={(e) => handleArrayInputChange(index, 'testimonials', 'name', e.target.value)}
                placeholder="Enter the name"
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <Button
              type="button"
              onClick={() => removeItem('testimonials', index)}
              className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
            >
              Delete
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => addItem('testimonials')}
          className="mt-4 bg-black text-white py-2 px-4 rounded-lg"
        >
          + Add Testimonial
        </Button>

        {/* FAQ Section */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">FAQ</h2>
        {testimonials.faqs.map((faq, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Question:</label>
              <Input
                type="text"
                value={faq.question}
                onChange={(e) => handleArrayInputChange(index, 'faqs', 'question', e.target.value)}
                placeholder="Enter the question"
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Answer:</label>
              <Input
                type="text"
                value={faq.answer}
                onChange={(e) => handleArrayInputChange(index, 'faqs', 'answer', e.target.value)}
                placeholder="Enter the answer"
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <Button
              type="button"
              onClick={() => removeItem('faqs', index)}
              className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
            >
              Delete
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => addItem('faqs')}
          className="mt-4 bg-black text-white py-2 px-4 rounded-lg"
        >
          + Add FAQ
        </Button>
      </div>
    </div>
  );
};

export default Testimonials;

