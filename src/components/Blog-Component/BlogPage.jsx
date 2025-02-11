// components/Blog-Component/BlogPage.jsx
import React from "react";

const BlogPage = ({ data }) => {
  if (!data) {
    return <div className="text-center text-red-500 mt-10 text-lg">Blog not found</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 md:p-10">
        
        {/* Blog Header */}
        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            {data.title}
          </h1>
          <p className="text-lg mt-2 text-gray-600 dark:text-gray-300">By {data.author.name}</p>
        </div>

        {/* Blog Image */}
        <div className="w-full h-60 md:h-80 lg:h-96 mb-8">
          <img
            src={data.image || "/default-image.jpg"}
            alt={data.title}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>

        {/* Blog Content */}
        <div className="text-base md:text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
        </div>

        {/* SEO Details */}
        {data.seo && (
          <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">SEO Information</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Meta Title:</strong> {data.seo.meta_title}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Meta Description:</strong> {data.seo.meta_description}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>OG Title:</strong> {data.seo.og_title}
            </p>
            {data.seo.og_image && (
              <div className="mt-4">
                <img
                  src={data.seo.og_image}
                  alt="Open Graph Image"
                  className="w-40 h-40 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
  