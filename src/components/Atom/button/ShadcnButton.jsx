
import React from "react";

const ShadcnButton = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white text-[#793600]  px-6 py-3 rounded-full hover:bg-white hover:text-[#910A67] dark:hover:bg-[#910A67] dark:hover:text-white transition-all duration-300 transform hover:scale-105 ${className}`}
    >
      {children}
    </button>
  );
};

export default ShadcnButton;
