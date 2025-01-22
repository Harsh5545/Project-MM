// Pagination.jsx
import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded ${
          currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : " bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] text-white text-sm"
        }`}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 rounded ${
            currentPage === index + 1
              ?  "bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d]text-white text-sm"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded ${
          currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : " bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] text-white text-sm"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
