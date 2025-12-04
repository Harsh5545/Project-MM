import { fetchBlogs } from "@/api";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default async function sitemap() {
  // try {
  //   const data = await fetchBlogs();
  //   const allBlogs = data.data || [];

  //   const searchLandingPages = allBlogs.map((blog) => ({
  //     url: `${baseUrl}/blogs/${blog.slug}`,
  //     lastModified: new Date(),
  //     changeFrequency: "weekly",
  //     priority: 1,
  //   }));

  //   return [
  //     {
  //       url: `${baseUrl}`,
  //       lastModified: new Date(),
  //       changeFrequency: "yearly",
  //       priority: 1,
  //     },
  //     {
  //       url: `${baseUrl}/sign-up`,
  //       lastModified: new Date(),
  //       changeFrequency: "yearly",
  //       priority: 0.5,
  //     },
  //     {
  //       url: `${baseUrl}/sign-in`,
  //       lastModified: new Date(),
  //       changeFrequency: "yearly",
  //       priority: 0.5,
  //     },
  //     {
  //       url: `${baseUrl}/about-us`,
  //       lastModified: new Date(),
  //       changeFrequency: "monthly",
  //       priority: 0.8,
  //     },
  //     {
  //       url: `${baseUrl}/blogs`,
  //       lastModified: new Date(),
  //       changeFrequency: "weekly",
  //       priority: 0.5,
  //     },
  //     {
  //       url: `${baseUrl}/services`,
  //       lastModified: new Date(),
  //       changeFrequency: "weekly",
  //       priority: 0.5,
  //     },
  //     {
  //       url: `${baseUrl}/about`,
  //       lastModified: "2024-12-31",
  //       changeFrequency: "yearly",
  //       priority: 0.8,
  //     },
  //     ...searchLandingPages,
  //   ];
  // } catch (error) {
  //   console.error("Error generating sitemap:", error);
  //   return [];
  // }
  return [];
}
