import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import icons from '@/hooks/icons';// Assuming you've moved the icons to a separate file
import Image from 'next/image';
import UploadServices from './UploadServices';

const CourseDetails = ({ courseDetails, onCourseDetailsChange, formData, setFormData }) => {
  const addCourseHeading = () => {
    onCourseDetailsChange({
      courseHeadings: [...courseDetails.courseHeadings, { heading: '', subheading: '', icon: '' }]
    });
  };

  const addCourseDetail = () => {
    onCourseDetailsChange({
      courseDetail: [...courseDetails.courseDetail, { icon: 'FaCheckCircle', description: '' }]
    });
  };

  const addProgramHighlight = () => {
    onCourseDetailsChange({
      programHighlights: [...courseDetails.programHighlights, { icon: 'FaCheckCircle', heading: '', description: '' }]
    });
  };

  const handleCourseHeadingChange = (index, field, value) => {
    const newCourseHeadings = [...courseDetails.courseHeadings];
    newCourseHeadings[index][field] = value;
    onCourseDetailsChange({ courseHeadings: newCourseHeadings });
  };

  const handleCourseDetailChange = (index, field, value) => {
    const newCourseDetails = [...courseDetails.courseDetail];
    newCourseDetails[index][field] = value;
    onCourseDetailsChange({ courseDetail: newCourseDetails });
  };  

  const handleProgramHighlightChange = (index, field, value) => {
    const newProgramHighlights = [...courseDetails.programHighlights];
    newProgramHighlights[index][field] = value;
    onCourseDetailsChange({ programHighlights: newProgramHighlights });
  };

  const removeCourseHeading = (index) => {
    const newCourseHeadings = courseDetails.courseHeadings.filter((_, i) => i !== index);
    onCourseDetailsChange({ courseHeadings: newCourseHeadings });
  };

  const removeCourseDetail = (index) => {
    const newCourseDetails = courseDetails.courseDetail.filter((_, i) => i !== index);
    onCourseDetailsChange({ courseDetail: newCourseDetails });
  };

  const removeProgramHighlight = (index) => {
    const newProgramHighlights = courseDetails.programHighlights.filter((_, i) => i !== index);
    onCourseDetailsChange({ programHighlights: newProgramHighlights });
  };

  return (
    <div className="">
      <div className="bg-white dark:bg-gray-800 rounded-lg space-y-8">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-white text-left">Course Details</h1>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Overview</h2>

          {/* Overview Image Section */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Overview Image:</label>
            <UploadServices formData={formData} setFormData={setFormData} type="overviewImage" />
            {formData?.courseDetails?.overviewImage && (
              <div className="mt-4">
                <Image width={300} height={300} src={formData.courseDetails.overviewImage} alt="Overview" className="w-[20rem] h-auto rounded-lg shadow-md" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Overview Description:</label>
            <Input
              type="text"
              value={courseDetails.overviewDescription}
              placeholder="Enter the overview description"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              onChange={(e) => onCourseDetailsChange({ overviewDescription: e.target.value })}
            />
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Course Type</h2>
          {courseDetails.courseHeadings.map((course, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Icon:</label>
                <div className="flex items-center space-x-2">
                  <select
                    value={course.icon}
                    onChange={(e) => handleCourseHeadingChange(index, 'icon', e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    {Object.keys(icons).map((iconKey) => (
                      <option key={iconKey} value={iconKey} className="flex items-center space-x-2">
                        {iconKey}
                      </option>
                    ))}
                  </select>
                  <div className="ml-2">
                    {icons[course.icon]}
                  </div>
                </div>
              </div>
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
            className="mt-4 bg-black text-white py-2 px-4 rounded-lg"
          >
            + Add Course Heading
          </Button>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Course Details</h2>
          {courseDetails.courseDetail.map((detail, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-1">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Icon:</label>
                  <div className="flex items-center space-x-2">
                    <select
                      value={detail.icon}
                      onChange={(e) => handleProgramHighlightChange(index, 'icon', e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      {Object.keys(icons).map((iconKey) => (
                        <option key={iconKey} value={iconKey} className="flex items-center space-x-2">
                          {iconKey}
                        </option>
                      ))}
                    </select>
                    <div className="ml-2">
                      {icons[detail.icon]}
                    </div>
                  </div>
                </div>
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Course Detail:</label>
                <Input
                  type="text"
                  value={detail.description}
                  onChange={(e) => handleCourseDetailChange(index, 'description' , e.target.value)}
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
            className="mt-4 bg-black text-white py-2 px-4 rounded-lg"
          >
            + Add Course Detail
          </Button>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Program Highlights</h2>
          {courseDetails.programHighlights.map((highlight, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Icon:</label>
                  <div className="flex items-center space-x-2">
                    <select
                      value={highlight.icon}
                      onChange={(e) => handleProgramHighlightChange(index, 'icon', e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      {Object.keys(icons).map((iconKey) => (
                        <option key={iconKey} value={iconKey} className="flex items-center space-x-2">
                          {iconKey}
                        </option>
                      ))}
                    </select>
                    <div className="ml-2">
                      {icons[highlight.icon]}
                    </div>
                  </div>
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
            className="mt-4 bg-black text-white py-2 px-4 rounded-lg"
          >
            + Add Program Highlight
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;

