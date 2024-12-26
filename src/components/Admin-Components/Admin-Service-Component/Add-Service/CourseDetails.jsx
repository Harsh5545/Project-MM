import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CourseDetails = () => {
  const [courseHeadings, setCourseHeadings] = useState([{ heading: '', subheading: '' }]);
  const [courseDetails, setCourseDetails] = useState(['']);
  const [programHighlights, setProgramHighlights] = useState(['']);

  const addCourseHeading = () => {
    setCourseHeadings([...courseHeadings, { heading: '', subheading: '' }]);
  };

  const addCourseDetail = () => {
    setCourseDetails([...courseDetails, '']);
  };

  const addProgramHighlight = () => {
    setProgramHighlights([...programHighlights, '']);
  };

  const handleCourseHeadingChange = (index, field, value) => {
    const newCourseHeadings = [...courseHeadings];
    newCourseHeadings[index][field] = value;
    setCourseHeadings(newCourseHeadings);
  };

  const handleCourseDetailChange = (index, value) => {
    const newCourseDetails = [...courseDetails];
    newCourseDetails[index] = value;
    setCourseDetails(newCourseDetails);
  };

  const handleProgramHighlightChange = (index, value) => {
    const newProgramHighlights = [...programHighlights];
    newProgramHighlights[index] = value;
    setProgramHighlights(newProgramHighlights);
  };

  const removeCourseHeading = (index) => {
    const newCourseHeadings = courseHeadings.filter((_, i) => i !== index);
    setCourseHeadings(newCourseHeadings);
  };

  const removeCourseDetail = (index) => {
    const newCourseDetails = courseDetails.filter((_, i) => i !== index);
    setCourseDetails(newCourseDetails);
  };

  const removeProgramHighlight = (index) => {
    const newProgramHighlights = programHighlights.filter((_, i) => i !== index);
    setProgramHighlights(newProgramHighlights);
  };

  return (
    <div className="min-h-screen ">
      <div className=" mx-auto bg-white dark:bg-gray-800 rounded-lg space-y-8">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-white text-Left">Course Details</h1>
        
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Overview</h2>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Overview Description:</label>
            <Input
              type="text"
              placeholder="Enter the overview description"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Course Type</h2>
          {courseHeadings.map((course, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Course Heading:</label>
                <Input
                  type="text"
                  value={course.heading}
                  onChange={(e) => handleCourseHeadingChange(index, 'heading', e.target.value)}
                  placeholder="Enter the course heading"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Course Subheading:</label>
                <Input
                  type="text"
                  value={course.subheading}
                  onChange={(e) => handleCourseHeadingChange(index, 'subheading', e.target.value)}
                  placeholder="Enter the course subheading"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <Button
                type="button"
                onClick={() => removeCourseHeading(index)}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
              >
                Delete
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addCourseHeading}
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
          >
            + Add Course Heading
          </Button>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Course Details</h2>
          {courseDetails.map((detail, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Course Detail:</label>
                <Input
                  type="text"
                  value={detail}
                  onChange={(e) => handleCourseDetailChange(index, e.target.value)}
                  placeholder="Enter the course detail"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <Button
                type="button"
                onClick={() => removeCourseDetail(index)}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
              >
                Delete
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addCourseDetail}
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
          >
            + Add Course Detail
          </Button>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Program Highlights</h2>
          {programHighlights.map((highlight, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Program Highlight:</label>
                <Input
                  type="text"
                  value={highlight}
                  onChange={(e) => handleProgramHighlightChange(index, e.target.value)}
                  placeholder="Enter the program highlight"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <Button
                type="button"
                onClick={() => removeProgramHighlight(index)}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
              >
                Delete
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addProgramHighlight}
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
          >
            + Add Program Highlight
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;