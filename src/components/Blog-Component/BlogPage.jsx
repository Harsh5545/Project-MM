// components/Blog-Component/BlogPage.jsx
import React from 'react';

const BlogPage = ({ data }) => {
  if (!data) {
    return <div className="text-center text-red-500">Blog not found</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Blog Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{data.title}</h1>
          <p className="text-lg mt-2 text-gray-600">By {data.author.name}</p>
        </div>

        {/* Blog Image */}
        <div className="relative w-full h-80 mb-8">
          <img
            src={data.image || '/default-image.jpg'}
            alt={data.title}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>

        {/* Blog Content */}
        <div className="text-lg text-gray-800">
          <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
        </div>

        {/* SEO Details */}
        {data.seo && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">SEO Information</h2>
            <p className="text-sm text-gray-500">
              <strong>Meta Title:</strong> {data.seo.meta_title}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Meta Description:</strong> {data.seo.meta_description}
            </p>
            <p className="text-sm text-gray-500">
              <strong>OG Title:</strong> {data.seo.og_title}
            </p>
            {data.seo.og_image && (
              <div className="mt-4">
                <img
                  src={data.seo.og_image}
                  alt="Open Graph Image"
                  className="w-40 h-40 object-cover rounded-lg"
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
