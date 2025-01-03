import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaCheckCircle, FaStar, FaHeart } from 'react-icons/fa'; // Importing icons from react-icons

const icons = {
  FaCheckCircle: <FaCheckCircle />,
  FaStar: <FaStar />,
  FaHeart: <FaHeart />
};

const CourseDetails = (props) => {
  const { formData ,setFormData } = props;
  const [courseHeadings, setCourseHeadings] = useState(formData?.courseDetails?.courseHeadings || [{ heading: '', subheading: '' }]);
  const [courseDetail, setCourseDetail] = useState(formData?.courseDetails?.courseDetail || ['']);
  const [programHighlights, setProgramHighlights] = useState(formData?.courseDetails?.programHighlights || [{ icon: 'FaCheckCircle', heading: '', description: '' }]);
  const [overviewImage, setOverviewImage] = useState(formData?.courseDetails?.overviewImage || '');
  const [overviewDescription, setOverviewDescription] = useState(formData?.courseDetails?.overviewDescription || '');

  const addCourseHeading = () => {
    setCourseHeadings([...courseHeadings, { heading: '', subheading: '' }]);
  };

  const addCourseDetail = () => {
    setCourseDetail([...courseDetail, '']);
  };

  const addProgramHighlight = () => {
    setProgramHighlights([...programHighlights, { icon: 'FaCheckCircle', heading: '', description: '' }]);
  };

  const handleCourseHeadingChange = (index, field, value) => {
    const newCourseHeadings = [...courseHeadings];
    newCourseHeadings[index][field] = value;
    setCourseHeadings(newCourseHeadings);
  };

  const handleCourseDetailChange = (index, value) => {
    const newCourseDetails = [...courseDetail];
    newCourseDetails[index] = value;
    setCourseDetail(newCourseDetails);
  };

  const handleProgramHighlightChange = (index, field, value) => {
    const newProgramHighlights = [...programHighlights];
    newProgramHighlights[index][field] = value;
    setProgramHighlights(newProgramHighlights);
  };

  const removeCourseHeading = (index) => {
    const newCourseHeadings = courseHeadings.filter((_, i) => i !== index);
    setCourseHeadings(newCourseHeadings);
  };

  const removeCourseDetail = (index) => {
    const newCourseDetails = courseDetail.filter((_, i) => i !== index);
    setCourseDetail(newCourseDetails);
  };

  const removeProgramHighlight = (index) => {
    const newProgramHighlights = programHighlights.filter((_, i) => i !== index);
    setProgramHighlights(newProgramHighlights);
  };

  useEffect(() => {
    // On mount: Initialize form data
    setFormData((prevData) => ({
      ...prevData,
      courseDetails: {
        courseHeadings,
        courseDetail,
        programHighlights,
        overviewImage,
        overviewDescription
      },
    }));
  
    // Cleanup: Save form data when component unmounts
    return () => {
      setFormData((prevData) => ({
        ...prevData,
        courseDetails: {
          courseHeadings,
          courseDetail,
          programHighlights,
          overviewImage,
          overviewDescription
        },
      }));
    };
  }, [courseHeadings, courseDetail, programHighlights, overviewImage,overviewDescription]);
  
  return (
    <div className=" ">
      <div className=" bg-white dark:bg-gray-800 rounded-lg space-y-8">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-white text-Left">Course Details</h1>
        
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Overview</h2>
          
          {/* Overview Image Section */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Overview Image URL:</label>
            <Input
              type="text"
              value={overviewImage}
              onChange={(e) => setOverviewImage(e.target.value)}
              placeholder="Enter the overview image URL"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            />
            {overviewImage && (
              <div className="mt-4">
                <img src={overviewImage} alt="Overview" className="w-full h-auto rounded-lg shadow-md" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Overview Description:</label>
            <Input
              type="text"
              value={overviewDescription}
              placeholder="Enter the overview description"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              onChange={(e) => setOverviewDescription(e.target.value)}
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
          {courseDetail.map((detail, index) => (
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
            <div key={index} className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Icon:</label>
                  <select
                    value={highlight.icon}
                    onChange={(e) => handleProgramHighlightChange(index, 'icon', e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    {Object.keys(icons).map((iconKey) => (
                      <option key={iconKey} value={iconKey}>
                        {iconKey}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Program Highlight Heading:</label>
                  <Input
                    type="text"
                    value={highlight.heading}
                    onChange={(e) => handleProgramHighlightChange(index, 'heading', e.target.value)}
                    placeholder="Enter the program highlight heading"
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
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Program Highlight Description:</label>
                <Input
                  type="text"
                  value={highlight.description}
                  onChange={(e) => handleProgramHighlightChange(index, 'description', e.target.value)}
                  placeholder="Enter the program highlight description"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
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