import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaCheckCircle, FaStar, FaHeart } from 'react-icons/fa'; // Importing icons from react-icons
import {
  BadgeHelp,
  CircleHelp,
  Award,
  HeartHandshake,
  Handshake,
  Mail,
  Link,
  Star,
  Tag,
  Users,
  Shell,
  ArrowBigUpDash,
  CalendarSync,
  Download,
  Play,
  GraduationCap,
  TrendingUp,
  Speech,
  MessageCircleCode,
  Heart,
  Lightbulb,
  Brain,
  HandHeart,
  MessagesSquare,
  NotebookPen,
  Hourglass,
  CalendarDays,
  GroupIcon,
  Laptop,
  LaptopMinimal,
  Check,
  BadgeHelpIcon,
  Bell,
  BellDotIcon,
} from 'lucide-react';
import Image from 'next/image';

const icons = {
  BadgeHelp: <BadgeHelp className="inline-block text-black w-6 h-6" />,
  CircleHelp: <CircleHelp className="inline-block w-6 h-6 text-black" />,
  Award: <Award className="inline-block w-6 h-6 text-black" />,
  HeartHandshake: <HeartHandshake className="inline-block w-6 h-6" />,
  Handshake: <Handshake className="inline-block w-6 h-6" />,
  Mail: <Mail className="inline-block w-6 h-6" />,
  Link: <Link className="inline-block w-6 h-6" />,
  BadgeHelpIcon: <BadgeHelpIcon className="inline-block w-6 h-6" />,
  Bell: <Bell className="inline-block w-6 h-6" />,
  BellDotIcon: <BellDotIcon className="inline-block w-6 h-6" />,
  GroupIcon: <GroupIcon className="inline-block w-6 h-6" />,
  Laptop: <Laptop className="inline-block w-6 h-6" />,
  LaptopMinimal: <LaptopMinimal className="inline-block w-6 h-6" />,
  Check: <Check className="inline-block w-6 h-6" />,
  Star: <Star className="inline-block w-6 h-6" />,
  Tag: <Tag className="inline-block w-6 h-6" />,
  Users: <Users className="inline-block w-6 h-6" />,
  Shell: <Shell className="inline-block w-6 h-6" />,
  ArrowBigUpDash: <ArrowBigUpDash className="inline-block w-6 h-6" />,
  CalendarSync: <CalendarSync className="inline-block w-6 h-6" />,
  Download: <Download className="inline-block w-6 h-6" />,
  Play: <Play className="inline-block w-6 h-6" />,
  GraduationCap: <GraduationCap className="inline-block w-6 h-6" />,
  TrendingUp: <TrendingUp className="inline-block w-6 h-6" />,
  Speech: <Speech className="inline-block w-6 h-6" />,
  MessageCircleCode: <MessageCircleCode className="inline-block w-6 h-6" />,
  Heart: <Heart className="inline-block w-6 h-6" />,
  Lightbulb: <Lightbulb className="inline-block w-6 h-6" />,
  Brain: <Brain className="inline-block w-6 h-6" />,
  HandHeart: <HandHeart className="inline-block w-6 h-6" />,
  MessagesSquare: <MessagesSquare className="inline-block w-6 h-6" />,
  NotebookPen: <NotebookPen className="inline-block w-6 h-6" />,
  Hourglass: <Hourglass className="inline-block w-6 h-6" />,
  CalendarDays: <CalendarDays className="inline-block w-6 h-6" />,
};

const CourseDetails = (props) => {
  const { formData, setFormData } = props;
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
  }, [courseHeadings, courseDetail, programHighlights, overviewImage, overviewDescription]);

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
    <div className=" ">
      <div className=" bg-white dark:bg-gray-800 rounded-lg space-y-8">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-white text-Left">Course Details</h1>
        
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Overview</h2>
          
          {/* Overview Image Section */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Overview Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setOverviewImage)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
            className="mt-4 bg-black text-white py-2 px-4 rounded-lg"
          >
            + Add Course Detail
          </Button>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Program Highlights</h2>
          {programHighlights.map((highlight, index) => (
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