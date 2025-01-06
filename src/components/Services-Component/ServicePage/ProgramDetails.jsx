"use client";
import React from "react";
import { ClipboardCopy, FilePen, Signature, TableColumnsSplit } from "lucide-react";

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
  return (
    <section className="py-8 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg w-full">
      <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] mb-8">
        Program Details
      </h2>

      {/* Vertical Table Layout */}
      <div className="w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full text-left border-collapse">
          <tbody>
            {Object.keys(programDetailsData).map((detail, index) => (
              <tr
                key={index}
                className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {/* Icon and Title */}
                <td className="px-4 py-4 whitespace-nowrap text-gray-900 dark:text-white flex items-center gap-3 font-semibold">
                  {icons[detail]} {detail.charAt(0).toUpperCase() + detail.slice(1)}
                </td>

                {/* Data */}
                <td className="px-4 py-4 whitespace-normal text-gray-700 dark:text-gray-300">
                  {Array.isArray(programDetailsData[detail]) ? (
                    <ul className="space-y-2">
                      {programDetailsData[detail].map((item, idx) => (
                        <li key={idx} className="">
                          <strong>{item.title}:</strong> {item.subtitle}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>{programDetailsData[detail]}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProgramDetails;
