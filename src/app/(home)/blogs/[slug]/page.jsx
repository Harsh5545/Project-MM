
import { fetchBlogs, GetBlogDetails } from "@/api"
import BlogCommentSection from "@/components/Blog-Component/Blog-Landing-Page/BlogCommentSection"
import BlogPage from "@/components/Blog-Component/Blog-Landing-Page/BlogPage"
import { notFound } from "next/navigation"
import { cache } from "react"

export const revalidate = 3600;

// export async function generateStaticParams() {
//   const data = await fetchBlogs();  
//   const allBlogs = data.data || [];
//   return allBlogs.map((tag) => ({
//     slug: tag.slug,
//   }));
// }

// const getData = cache(GetBlogDetails)

// export async function generateMetadata({ params }) {
//   const slug = (await params).slug
//   const response = await getData(slug)
//   if (!response.Success) {
//     throw new Error("Failed to fetch blog details")
//   }

//   if (!response?.data) {
//     return notFound()
//   }
//   const { title, description, image } = response.data
//   return {
//     title: title,
//     description: description,
//     alternates: {
//       canonical: `/blogs/${slug}`,
//     },
//     openGraph: {
//       title: title,
//       description: description,
//       images: [
//         {
//           url: image,
//           width: 800,
//           height: 600,
//         },
//       ],
//     }
//   }
// }


export async function generateStaticParams() {
  try {
    const data = await fetchBlogs();
    const allBlogs = data?.data || []; // Safe fallback

    return allBlogs.map((tag) => ({
      slug: tag.slug,
    }));
  } catch (error) {
    return []; // Prevent build crash
  }
}

const getData = cache(GetBlogDetails);

export async function generateMetadata({ params }) {
  const slug = params.slug;

  try {
    const response = await getData(slug);

    if (!response?.data) {
      return {}; // instead of throw
    }

    const { title, description, image } = response.data;

    return {
      title,
      description,
      alternates: { canonical: `/blogs/${slug}` },
      openGraph: {
        title,
        description,
        images: [{ url: image, width: 800, height: 600 }],
      },
    };
  } catch (error) {
    return {}; // Prevent build crash
  }
}

const page = async ({ params }) => {
  try {
    const slug = (await params).slug
    const response = await GetBlogDetails(slug);
    if (!response.Success) {
      throw new Error("Failed to fetch blog details")
    }
    if (!response?.data) {
      return notFound()
    }
    // Fetch recent blogs for the sidebar
    const recentBlogsUrl = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/list-blog`)
    recentBlogsUrl.searchParams.set("page", "1")
    recentBlogsUrl.searchParams.set("pageSize", "3")
    recentBlogsUrl.searchParams.set("sortBy", "createdAt")
    recentBlogsUrl.searchParams.set("sortOrder", "desc")

    const recentBlogsResponse = await fetch(recentBlogsUrl)

    let recentBlogs = []
    if (recentBlogsResponse.ok) {
      const recentBlogsResult = await recentBlogsResponse.json()
      recentBlogs = recentBlogsResult?.data || []
    }

    // Add recent blogs to the data
    const blogData = {
      ...response.data,
      recentBlogs: recentBlogs.filter((blog) => blog.slug !== slug).slice(0, 3),
    }

    return (
      <>
        <BlogPage data={blogData} />
        {/* <HomeSection /> */}
        {/* <BlogCommentSection/> */}
      </>
    )
  } catch (error) {
    console.error("Error fetching blog data:", error)
    return <div className="min-h-[50vh] flex items-center justify-center">Error loading blog post</div>
  }
}

export default page

