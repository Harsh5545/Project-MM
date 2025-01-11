import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from 'next/image';

const Testimonials = (props) => {
  const { formData, setFormData } = props;

  const [taglineHeading, setTaglineHeading] = useState(formData?.testimonials?.taglineHeading || '');
  const [mmDescription, setMmDescription] = useState(formData?.testimonials?.mmDescription || '');
  const [testimonials, setTestimonials] = useState(formData?.testimonials?.testimonials || [{ comment: '', name: '' }]);
  const [faqs, setFaqs] = useState(formData?.testimonials?.faqs || [{ question: '', answer: '' }]);
  const [heroImage, setHeroImage] = useState(formData?.testimonials?.heroImage || '');
  const [outsideImage, setOutsideImage] = useState(formData?.testimonials?.outsideImage || '');

  const addTestimonial = () => {
    setTestimonials([...testimonials, { comment: '', name: '' }]);
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const handleInputChange = (index, field, value, setState, state) => {
    const newState = [...state];
    newState[index][field] = value;
    setState(newState);
  };

  const removeInput = (index, setState, state) => {
    const newState = state.filter((_, i) => i !== index);
    setState(newState);
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      testimonials: {
        taglineHeading,
        mmDescription,
        testimonials,
        faqs,
        heroImage,
        outsideImage,
      },
    })); return () => {  
      setFormData((prevData) => ({
        ...prevData,
        testimonials: {
          taglineHeading,
          mmDescription,
          testimonials,
          faqs,
          heroImage,
          outsideImage,
        },
      }));
    };
  
  }, [taglineHeading, mmDescription, testimonials, faqs, heroImage, outsideImage]);

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto bg-white dark:bg-gray-800 rounded-lg space-y-8">
        {/* Tagline Heading */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Tagline Heading:</label>
          <Input
            type="text"
            value={taglineHeading}
            onChange={(e) => setTaglineHeading(e.target.value)}
            placeholder="Enter the tagline heading"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* MM Description */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">MM Description:</label>
          <Input
            type="text"
            value={mmDescription}
            onChange={(e) => setMmDescription(e.target.value)}
            placeholder="Enter the MM description"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Hero Image */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Hero Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setHeroImage)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          {heroImage && (
            <div className="mt-4">
              <Image src={heroImage} width={400} height={200} alt="Hero" className=" h-auto rounded-lg shadow-md" />
            </div>
          )}
        </div>

        {/* Outside Image */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Outside Image:</label>
          <input
            type="file"
            accept="image/*"
            
            onChange={(e) => handleImageChange(e, setOutsideImage)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          {outsideImage && (
            <div className="mt-4">
              <Image width={400} height={200} src={outsideImage} alt="Outside" className=" h-auto rounded-lg shadow-md" />
            </div>
          )}
        </div>

        {/* Testimonials */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Testimonials</h2>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Comment:</label>
              <Input
                type="text"
                value={testimonial.comment}
                onChange={(e) => handleInputChange(index, 'comment', e.target.value, setTestimonials, testimonials)}
                placeholder="Enter the comment"
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Name:</label>
              <Input
                type="text"
                value={testimonial.name}
                onChange={(e) => handleInputChange(index, 'name', e.target.value, setTestimonials, testimonials)}
                placeholder="Enter the name"
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <Button
              type="button"
              onClick={() => removeInput(index, setTestimonials, testimonials)}
              className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
            >
              Delete
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={addTestimonial}
          className="mt-4 bg-black text-white py-2 px-4 rounded-lg"
        >
          + Add Testimonial
        </Button>

        {/* FAQ Section */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">FAQ</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Question:</label>
              <Input
                type="text"
                value={faq.question}
                onChange={(e) => handleInputChange(index, 'question', e.target.value, setFaqs, faqs)}
                placeholder="Enter the question"
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Answer:</label>
              <Input
                type="text"
                value={faq.answer}
                onChange={(e) => handleInputChange(index, 'answer', e.target.value, setFaqs, faqs)}
                placeholder="Enter the answer"
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <Button
              type="button"
              onClick={() => removeInput(index, setFaqs, faqs)}
              className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
            >
              Delete
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={addFaq}
          className="mt-4 bg-black text-white py-2 px-4 rounded-lg"
        >
          + Add FAQ
        </Button>
      </div>
    </div>
  );
};

export default Testimonials;