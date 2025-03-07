
import BlogPage from "@/components/Blog-Component/Blog-Landing-Page/BlogPage"
import HomeSection from "@/components/Home-Page-Components/HomeSection"
import { notFound } from "next/navigation"



export async function generateMetadata({ params }) {
  const slug = (await params).slug

  // Fetch the blog details
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/blog-details?slug=${slug}`)

  if (!response.ok) {
    throw new Error("Failed to fetch blog details")
  }

  const result = await response.json()

  if (!result?.data) {
    return notFound()
  }

  const { title, description, image } = result.data

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `/blogs/${slug}`,
    },

    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: image,
          width: 800,
          height: 600,
        },
      ],
    },
  }
}

const page = async ({ params }) => {
  try {
    const slug = (await params).slug

    // Fetch the blog details
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/blog-details?slug=${slug}`)

    if (!response.ok) {
      throw new Error("Failed to fetch blog details")
    }

    const result = await response.json()

    if (!result?.data) {
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
      ...result.data,
      recentBlogs: recentBlogs.filter((blog) => blog.slug !== slug).slice(0, 3),
    }

    return (
      <>
        <BlogPage data={blogData} />
        <HomeSection />
      </>
    )
  } catch (error) {
    console.error("Error fetching blog data:", error)
    return <div className="min-h-[50vh] flex items-center justify-center">Error loading blog post</div>
  }
}

export default page

