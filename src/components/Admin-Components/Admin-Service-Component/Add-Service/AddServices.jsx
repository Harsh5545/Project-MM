'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import CourseDetails from './CourseDetails';
import ProgramDetails from './ProgramDetails';
import Testimonials from './Testimonials';
import SeoComponent from './Seo';
import { useToast } from '@/hooks/use-toast';
import UploadServices from './UploadServices';
import Image from 'next/image';

const AddServices = ({ onClose }) => {
    const { toast } = useToast();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        heading: '',
        subheading: '',
        courseDescription: '',
        image: '',
        category: '',
        courseDetails: {
            courseHeadings: [{ heading: '', subheading: '', icon: '' }],
            courseDetail: [{icon: '', description: ''}],
            programHighlights: [{ icon: 'FaCheckCircle', heading: '', description: '' }],
            overviewImage: '',
            overviewDescription: '',
        },
        programDetails: {
            ageGroups: [{ heading: '', subheading: '' }],
            formats: [{ heading: '', subheading: '' }],
            durations: [{ heading: '', subheading: '' }],
            locations: [{ heading: '', subheading: '' }],
        },
        testimonials: {
            taglineHeading: '',
            mmDescription: '',
            testimonials: [{ comment: '', name: '' }],
            faqs: [{ question: '', answer: '' }],
            heroImage: '',
            outsideImage: '',
        },
        seo: {
            meta_title: '',
            meta_description: '',
            og_title: '',
            og_image: '',
            keywords: [],
        },
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/category/list');
                const result = await response.json();
                if (result.data) {
                    setCategories(result.data);
                } else {
                    throw new Error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                toast({
                    title: "Error",
                    description: "Failed to fetch categories. Please try again.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [toast]);

    const handleNext = useCallback(() => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, 5));
    }, []);

    const handlePrev = useCallback(() => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    }, []);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }, []);

    const handleSelectChange = useCallback((value) => {
        setFormData((prevData) => ({ ...prevData, category: value }));
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (currentStep !== 5) {
            handleNext();
            return;
        }
        try {
            const response = await fetch('/api/services/add-service', {
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

    const handleCourseDetailsChange = useCallback((newCourseDetails) => {
        setFormData(prevData => ({
            ...prevData,
            courseDetails: {
                ...prevData.courseDetails,
                ...newCourseDetails
            }
        }));
    }, []);

    const handleProgramDetailsChange = useCallback((field, value) => {
        setFormData(prevData => ({
            ...prevData,
            programDetails: {
                ...prevData.programDetails,
                [field]: value
            }
        }));
    }, []);

    const handleTestimonialsChange = useCallback((newTestimonials) => {
        setFormData(prevData => ({
            ...prevData,
            testimonials: {
                ...prevData.testimonials,
                ...newTestimonials
            }
        }));
    }, []);

    const handleImageUpload = useCallback((imageType, imageData) => {
        setFormData(prevData => ({
            ...prevData,
            testimonials: {
                ...prevData.testimonials,
                [imageType]: imageData
            }
        }));
    }, []);

    const handleSeoChange = useCallback((newSeoData) => {
        setFormData(prevData => ({
            ...prevData,
            seo: {
                ...prevData.seo,
                ...newSeoData
            }
        }));
    }, []);

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">heading:</label>
                            <Input
                                type="text"
                                placeholder="Enter the main title"
                                name="heading"
                                value={formData.heading}
                                onChange={handleInputChange}
                                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Sub Title:</label>
                            <Input
                                type="text"
                                placeholder="Enter the sub title"
                                name="subheading"
                                value={formData.subheading}
                                onChange={handleInputChange}
                                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <UploadServices formData={formData} setFormData={setFormData} type="image" />
                        {formData.image && (
                            <Image width={300} height={300} src={formData.image} alt="service image" />
                        )}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Category:</label>
                            <Select onValueChange={handleSelectChange} disabled={loading} value={formData.category}>
                                <SelectTrigger className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                                    <SelectValue placeholder={loading ? "Loading categories..." : "Select a category"}>
                                        {formData.category && categories.length > 0
                                            ? categories.find((cat) => cat.id == formData.category)?.category_name
                                            : "Select a category"}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.category_name}
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
                );
            case 2:
                return (
                    <CourseDetails
                        courseDetails={formData.courseDetails}
                        onCourseDetailsChange={handleCourseDetailsChange}
                        formData={formData}
                        setFormData={setFormData}
                    />
                );
            case 3:
                return (
                    <ProgramDetails
                        programDetails={formData.programDetails}
                        onProgramDetailsChange={handleProgramDetailsChange}
                    />
                );
            case 4:
                return (
                    <Testimonials
                        testimonials={formData.testimonials}
                        onTestimonialsChange={handleTestimonialsChange}
                        handleImageUpload={handleImageUpload}
                        formData={formData}
                        setFormData={setFormData}
                    />
                );
            case 5:
                return (
                    <SeoComponent
                        seoData={formData.seo}
                        onSeoChange={handleSeoChange}
                        formData={formData}
                        setFormData={setFormData}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-gradient-to-r from-gray-200 to-gray-100">
            <div className="w-full mx-auto bg-white dark:bg-gray-800 rounded-lg p-8 space-y-8 relative">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                    {renderStep()}
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
                        {currentStep < 5 ? (
                            <Button
                                type="button"
                                onClick={handleNext}
                                className="bg-black text-white px-4 py-2 rounded-lg"
                            >
                                Next
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="bg-black text-white px-4 py-2 rounded-lg"
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

