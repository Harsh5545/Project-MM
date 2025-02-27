
import BlogPage from '@/components/Blog-Component/BlogPage';
import HomeSection from '@/components/Home-Page-Components/HomeSection';
import React from 'react';

const page = async ({ params }) => {
  const slug = (await params).slug
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/blog-details?slug=${slug}`);
  const result = await response.json();
  return (
    <>
      <BlogPage data={result?.data} />
      <HomeSection/>
    </>
  );
};

export default page;
