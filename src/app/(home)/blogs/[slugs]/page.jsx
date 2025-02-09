
import BlogPage from '@/components/Blog-Component/BlogPage';
import React from 'react';

const page = async ({ params }) => {
  const slug = params.slug;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog-details?slug=${slug}`);
  const result = await response.json();

  return (
    <>
      <BlogPage data={result?.data} />
    </>
  );
};

export default page;
