"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ClipboardCopy,
  FilePen,
  Signature,
  TableColumnsSplit,
} from "lucide-react";

const programDetailsData = {
  age: "10–15 years",
  format: [
    { title: "Group Workshops", subtitle: "Fun, collaborative learning with peers." },
    { title: "Private Sessions", subtitle: "Personalized, focused coaching." },
  ],
  duration: [
    { title: "Group Workshops", subtitle: "2–3 hours per session." },
    { title: "Private Sessions", subtitle: "1-hour sessions, scheduled as per convenience." },
  ],
  location: [
    { title: "In-person", subtitle: "At designated venues." },
    { title: "Online", subtitle: "Available upon request." },
  ],
};

const icons = {
  age: <ClipboardCopy className="h-6 w-6 text-primary" />,
  format: <FilePen className="h-6 w-6 text-primary" />,
  duration: <Signature className="h-6 w-6 text-primary" />,
  location: <TableColumnsSplit className="h-6 w-6 text-primary" />,
};

const ProgramDetails = () => {
  const [selectedDetail, setSelectedDetail] = useState("age");

  return (
    <section className="py-8 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg w-full">
      <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mb-8">
        Program Details
      </h2>

      {/* Vertical Layout for PC View */}
      <div className="hidden md:flex flex-col gap-8">
        {Object.keys(programDetailsData).map((detail, index) => (
          <div
            key={index}
            className="flex gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
          >
            {/* Icon */}
            <div className="shrink-0">{icons[detail]}</div>
            {/* Detail Section */}
            <div>
              <h3 className="text-lg font-semibold capitalize text-gray-900 dark:text-white">
                {detail}
              </h3>
              <div className="mt-2">
                {Array.isArray(programDetailsData[detail]) ? (
                  <ul className="space-y-2">
                    {programDetailsData[detail].map((item, idx) => (
                      <li key={idx} className="text-gray-700 dark:text-gray-300">
                        <strong>{item.title}:</strong> {item.subtitle}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700 dark:text-gray-300">
                    {programDetailsData[detail]}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Accordion for Mobile View */}
      <div className="md:hidden">
        {Object.keys(programDetailsData).map((detail, index) => (
          <div key={index} className="mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md cursor-pointer"
              onClick={() =>
                setSelectedDetail((prev) => (prev === detail ? "" : detail))
              }
            >
              <span className="text-lg font-medium capitalize flex items-center gap-2 text-gray-900 dark:text-white">
                {icons[detail]} {detail}
              </span>
            </motion.div>
            {selectedDetail === detail && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-4 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-md"
              >
                {Array.isArray(programDetailsData[selectedDetail]) ? (
                  programDetailsData[selectedDetail].map((item, idx) => (
                    <div
                      key={idx}
                      className="mb-4 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg"
                    >
                      <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {item.subtitle}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-700 dark:text-gray-300">
                    {programDetailsData[selectedDetail]}
                  </p>
                )}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgramDetails;
