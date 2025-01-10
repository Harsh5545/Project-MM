'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import CourseDetails from './CourseDetails';
import ProgramDetails from './ProgramDetails';
import Testimonials from './Testimonials';
import { useToast } from '@/hooks/use-toast';

const AddServices = ({ onClose }) => {
    const { toast } = useToast();
    const [currentStep, setCurrentStep] = useState(1); // Track the current step of the form
    const [formData, setFormData] = useState({
        mainTitle: '',
        subTitle: '',
        courseDescription: '',
        category: '',
        courseDetails: {},
        programDetails: {},
        testimonials: {},
    });
    const [categories, setCategories] = useState([]);
    
console.log(formData)
    useEffect(() => {
        // Fetch categories from the backend
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories'); // Adjust the URL as needed
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleNext = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, 4)); // Ensure step does not exceed total steps
    };

    const handlePrev = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 1)); // Ensure step does not go below 1
    };

      const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSelectChange = useCallback((value) => {
    setFormData((prevData) => ({ ...prevData, category: value }));
  }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/services/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                toast({
                    title: "Success",
                    description: "Service added successfully",
                });
                onClose();
            } else {
                toast({
                    title: "Error",
                    description: result.message,
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An error occurred while adding the service",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="bg-gradient-to-r from-gray-200 to-gray-100 ">
            <div className="w-full mx-auto bg-white dark:bg-gray-800 rounded-lg p-8 space-y-8 relative">
                {/* <button
                    type="button"
                    className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-lg"
                    onClick={onClose}
                >
                    &times;
                </button> */}
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center">
                    Add New Service
                </h1>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                    {/* Step 1: Main Title & Subtitle */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 mb-2">Main Title:</label>
                                <Input
                                    type="text"
                                    placeholder="Enter the main title"
                                    name="mainTitle"
                                    value={formData.mainTitle}
                                    onChange={handleInputChange}
                                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 mb-2">Sub Title:</label>
                                <Input
                                    type="text"
                                    placeholder="Enter the sub title"
                                    name="subTitle"
                                    value={formData.subTitle}
                                    onChange={handleInputChange}
                                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 mb-2">Category:</label>
                                <Select onValueChange={handleSelectChange}>
                                    <SelectTrigger className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category._id} value={category.name}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 mb-2">Course Description:</label>
                                <textarea
                                    placeholder="Enter the course description"
                                    name="courseDescription"
                                    value={formData.courseDescription}
                                    onChange={handleInputChange}
                                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white h-32"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Course Details */}
                    {currentStep === 2 && <CourseDetails formData={formData} setFormData={setFormData} />}

                    {/* Step 3: Program Details */}
                    {currentStep === 3 && <ProgramDetails formData={formData} setFormData={setFormData} />}

                    {/* Step 4: Testimonials */}
                    {currentStep === 4 && <Testimonials formData={formData} setFormData={setFormData} />}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between">
                        {currentStep > 1 && (
                            <Button
                                type="button"
                                onClick={handlePrev}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                            >
                                Previous
                            </Button>
                        )}
                        {currentStep < 4 ? (
                            <Button
                                type="button"
                                onClick={handleNext}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                            >
                                Next
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                            >
                                Submit
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddServices;