  import { GetBlogDetails } from "@/api"
  import { notFound } from "next/navigation"
  import BlogPage from "@/components/Blog-Component/Blog-Landing-Page/BlogPage"
  import BlogCommentSection from "@/components/Blog-Component/Blog-Landing-Page/BlogCommentSection"
  import { auth } from "@/auth" // Import auth

  export const revalidate = 3600

  export async function generateStaticParams() {
    return [{ slug: "test-blog" }]
  }

  export async function generateMetadata({ params }) {
    const { slug } = await params
    const response = await GetBlogDetails(slug)

    if (!response.Success) {
      return {}
    }

    if (!response?.data) {
      return
    }

    const blog = response.data

    const metadata = {
      title: blog.title,
      description: blog.metaDescription,
      openGraph: {
        title: blog.title,
        description: blog.metaDescription,
        images: [blog.featureImage],
      },
    }

    return metadata
  }

  const page = async ({ params }) => {
    try {
      const { slug } = await params
      const response = await GetBlogDetails(slug)
      if (!response.Success) {
        throw new Error("Failed to fetch blog details")
      }
      if (!response?.data) {
        return notFound()
      }

      // Fetch recent blogs for the sidebar (existing logic)
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

      // Fetch comments for this blog post
      const commentsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments?blogId=${response.data.id}`, {
        cache: "no-store", // Ensure comments are always fresh
      })
      let comments = []
      if (commentsResponse.ok) {
        const commentsResult = await commentsResponse.json()
        comments = commentsResult?.data || []
      }

      // Get the user session
      const session = await auth()

      // Add recent blogs to the data
      const blogData = {
        ...response.data,
        recentBlogs: recentBlogs.filter((blog) => blog.slug !== slug).slice(0, 3),
      }

      return (
        <>
          <BlogPage data={blogData} />
          <BlogCommentSection blogId={blogData.id} initialComments={comments} session={session} />
        </>
      )
    } catch (error) {
      console.error("Error fetching blog data:", error)
      return <div className="min-h-[50vh] flex items-center justify-center">Error loading blog post</div>
    }
  }

  export default page
