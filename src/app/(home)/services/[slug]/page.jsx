// import ServicePage from '@/components/Services-Component/ServicePage/ServicePage';
// import React from 'react';

// export async function generateMetadata({ params }) {
//   const slug = params.slug;

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/service-details?slug=${slug}`, {
//     next: { revalidate: 60 },
//   });

//   const data = await res.json();
//   const service = data?.data;

//   return {
//     title: service?.meta_title || service?.heading || 'Service',
//     description: service?.meta_description || service?.subheading || 'Discover our service',
//     keywords: service?.keywords || 'business etiquette, training, personality development',
//     alternates: {
//       canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/services/${slug}`,
//     },
//     openGraph: {
//       title: service?.og_title || service?.meta_title || service?.heading,
//       description: service?.meta_description || service?.subheading,
//       images: [
//         {
//           url: service?.og_image || service?.hero_image || 'https://example.com/default-og.jpg',
//           width: 1200,
//           height: 630,
//           alt: service?.heading || 'Service Image',
//         },
//       ],
//       url: `${process.env.NEXT_PUBLIC_SITE_URL}/services/${slug}`,
//       type: 'website',
//     },
//   };
// }

// const Page = async ({ params }) => {
//   const slug = params.slug;

//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/service-details?slug=${slug}`);
//   const result = await response.json();

//   return (
//     <>
//       <ServicePage data={result?.data} />
//     </>
//   );
// };

// export default Page;


import ServicePage from '@/components/Services-Component/ServicePage/ServicePage';

export async function generateMetadata(props) {
  const { slug } = await props.params;

  if (!slug) {
    return {
      title: "Service",
      description: "Service details",
    };
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/services/service-details?slug=${slug}`;

  let service = null;

  try {
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    service = data?.data;
  } catch (err) {
    console.error("Metadata fetch failed:", err);
  }

  return {
    title: service?.seo?.meta_title || service?.heading || 'Service',
    description: service?.seo?.meta_description || 'Service details',
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/services/${slug}`,
    },
    openGraph: {
      title: service?.seo?.og_title || service?.seo?.meta_title,
      description: service?.seo?.meta_description,
      images: [{ url: service?.seo?.og_image }],
    },
  };
}

const Page = async (props) => {
  const { slug } = await props.params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/services/service-details?slug=${slug}`,
    { cache: "no-store" }
  );

  const result = await response.json();

  return <ServicePage data={result?.data} />;
};

export default Page;
