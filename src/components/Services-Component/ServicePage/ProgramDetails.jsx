import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa'; // Importing icons from react-icons

const programDetailsData = {
  age: "10–15 years",
  format: [
    { title: "Group Workshops", subtitle: "Fun, collaborative learning with peers." },
    { title: "Private Sessions", subtitle: "Personalized, focused coaching." }
  ],
  duration: [
    { title: "Group Workshops", subtitle: "2–3 hours per session." },
    { title: "Private Sessions", subtitle: "1-hour sessions, scheduled as per convenience." }
  ],
  location: [
    { title: "In-person", subtitle: "At designated venues." },
    { title: "Online", subtitle: "Available upon request." }
  ]
};

const ProgramDetails = () => {
  const [selectedDetail, setSelectedDetail] = useState('age'); // Set initial value to 'age'
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDetailClick = (detail) => {
    setSelectedDetail(detail);
  };

  return (
    <section className="py-8 mt-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg w-full relative z-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mb-6">
        Program Details
      </h2>
      
      {/* Desktop View */}
      <div className="hidden md:flex flex-col md:flex-row gap-8">
        {/* Left Side */}
        <div className="md:w-1/3">
          <ul className="space-y-2">
            {Object.keys(programDetailsData).map((detail, index) => (
              <li key={index} className="cursor-pointer" onClick={() => handleDetailClick(detail)}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center gap-2 p-4  dark:bg-gray-800  ${selectedDetail === detail ? 'border-l-4 border-[#c3965d]' : ''}`}
                >
                  <FaChevronRight className="text-gray-700 dark:text-gray-300" />
                  <span className="text-lg font-medium text-gray-900 dark:text-white capitalize">{detail}</span>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side */}
        <div className="md:w-2/3">
          {selectedDetail && (
            <Card className="transition-all duration-300    p-6">
              <CardHeader>
                <CardTitle className="text-lg font-bold capitalize text-gray-900 dark:text-white">{selectedDetail}</CardTitle>
              </CardHeader>
              <CardContent>
                {Array.isArray(programDetailsData[selectedDetail]) ? (
                  programDetailsData[selectedDetail].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md"
                    >
                      <h3 className="text-md font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{item.subtitle}</p>
                    </motion.div>
                  ))
                ) : (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {programDetailsData[selectedDetail]}
                  </motion.p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Mobile Accordion */}
      <div className="md:hidden mt-8">
        {Object.keys(programDetailsData).map((detail, index) => (
          <div key={index} className="mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-between p-4 md:bg-transparent bg-white dark:bg-gray-800 rounded-lg  shadow-md cursor-pointer"
              onClick={() => handleDetailClick(detail)}
            >
              <span className="text-lg font-medium text-gray-900 dark:text-white capitalize">{detail}</span>
              <FaChevronDown className="text-gray-700 dark:text-gray-300" />
            </motion.div>
            {selectedDetail === detail && (
              <Card className="mt-2 transition-all duration-300 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <CardHeader>
                  <CardTitle className="text-lg font-bold capitalize text-gray-900 dark:text-white">{selectedDetail}</CardTitle>
                </CardHeader>
                <CardContent>
                  {Array.isArray(programDetailsData[selectedDetail]) ? (
                    programDetailsData[selectedDetail].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md"
                      >
                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                        <p className="text-gray-700 dark:text-gray-300">{item.subtitle}</p>
                      </motion.div>
                    ))
                  ) : (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      {programDetailsData[selectedDetail]}
                    </motion.p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgramDetails;