import BlogPage from "@/components/Blog-Component/BlogPage"
import HomeSection from "@/components/Home-Page-Components/HomeSection"
import { notFound } from "next/navigation"

const page = async ({ params }) => {
  try {
    const slug = params.slug

    // Fetch the blog details
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/blog-details?slug=${slug}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

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

    const recentBlogsResponse = await fetch(recentBlogsUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

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

