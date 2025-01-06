import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProgramDetails = (props) => {
  const { formData ,setFormData } = props;
  const [ageGroups, setAgeGroups] = useState(formData?.programDetails?.ageGroups ||[{ heading: '', subheading: '' }]);
  const [formats, setFormats] = useState(formData?.programDetails?.formats || [{ heading: '', subheading: '' }]);
  const [durations, setDurations] = useState(formData?.programDetails?.durations || [{ heading: '', subheading: '' }]);
  const [locations, setLocations] = useState(formData?.programDetails?.locations || [{ heading: '', subheading: '' }]);

  const addAgeGroup = () => {
    setAgeGroups([...ageGroups, { heading: '', subheading: '' }]);
  };

  const addFormat = () => {
    setFormats([...formats, { heading: '', subheading: '' }]);
  };

  const addDuration = () => {
    setDurations([...durations, { heading: '', subheading: '' }]);
  };

  const addLocation = () => {
    setLocations([...locations, { heading: '', subheading: '' }]);
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
    // On mount: Initialize form data
    setFormData((prevData) => ({
      ...prevData,
      programDetails: {
        ageGroups,
        formats,
        durations,  
        locations

      },
    }));
    return () => {  
      setFormData((prevData) => ({
        ...prevData,
        programDetails: {
          ageGroups,
        formats,
        durations,  
        locations
        },
      }));
    };
  }, [ageGroups,
    formats,
    durations,  
    locations]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto bg-white dark:bg-gray-800 rounded-lg space-y-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-left">Program Details</h1>
        
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Age Group</h2>
          {ageGroups.map((group, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Age Group Heading:</label>
                <Input
                  type="text"
                  value={group.heading}
                  onChange={(e) => handleInputChange(index, 'heading', e.target.value, setAgeGroups, ageGroups)}
                  placeholder="Enter the age group heading"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Age Group Subheading:</label>
                <Input
                  type="text"
                  value={group.subheading}
                  onChange={(e) => handleInputChange(index, 'subheading', e.target.value, setAgeGroups, ageGroups)}
                  placeholder="Enter the age group subheading"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <Button
                type="button"
                onClick={() => removeInput(index, setAgeGroups, ageGroups)}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
              >
                Delete
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addAgeGroup}
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
          >
            + Add Age Group
          </Button>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Format</h2>
          {formats.map((format, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Format Heading:</label>
                <Input
                  type="text"
                  value={format.heading}
                  onChange={(e) => handleInputChange(index, 'heading', e.target.value, setFormats, formats)}
                  placeholder="Enter the format heading"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Format Subheading:</label>
                <Input
                  type="text"
                  value={format.subheading}
                  onChange={(e) => handleInputChange(index, 'subheading', e.target.value, setFormats, formats)}
                  placeholder="Enter the format subheading"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <Button
                type="button"
                onClick={() => removeInput(index, setFormats, formats)}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
              >
                Delete
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addFormat}
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
          >
            + Add Format
          </Button>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Duration</h2>
          {durations.map((duration, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Duration Heading:</label>
                <Input
                  type="text"
                  value={duration.heading}
                  onChange={(e) => handleInputChange(index, 'heading', e.target.value, setDurations, durations)}
                  placeholder="Enter the duration heading"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Duration Subheading:</label>
                <Input
                  type="text"
                  value={duration.subheading}
                  onChange={(e) => handleInputChange(index, 'subheading', e.target.value, setDurations, durations)}
                  placeholder="Enter the duration subheading"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <Button
                type="button"
                onClick={() => removeInput(index, setDurations, durations)}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
              >
                Delete
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addDuration}
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
          >
            + Add Duration
          </Button>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Location</h2>
          {locations.map((location, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Location Heading:</label>
                <Input
                  type="text"
                  value={location.heading}
                  onChange={(e) => handleInputChange(index, 'heading', e.target.value, setLocations, locations)}
                  placeholder="Enter the location heading"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Location Subheading:</label>
                <Input
                  type="text"
                  value={location.subheading}
                  onChange={(e) => handleInputChange(index, 'subheading', e.target.value, setLocations, locations)}
                  placeholder="Enter the location subheading"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <Button
                type="button"
                onClick={() => removeInput(index, setLocations, locations)}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
              >
                Delete
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addLocation}
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
          >
            + Add Location
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProgramDetails;