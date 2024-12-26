"use client"
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CourseDetails from './CourseDetails';
import ProgramDetails from './ProgramDetails';
import Testimonials from './Testimonials';

const AddServices = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-200 to-gray-100 p-6 sm:p-12">
      <div className="w-full mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center">Add New Service</h1>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Main Title:</label>
            <Input
              type="text"
              placeholder="Enter the main title"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Sub Title:</label>
            <Input
              type="text"
              placeholder="Enter the sub title"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Course Description:</label>
            <textarea
              placeholder="Enter the course description"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white h-32"
            />
          </div>
          <CourseDetails />
          <ProgramDetails />
          <Testimonials />
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddServices;



