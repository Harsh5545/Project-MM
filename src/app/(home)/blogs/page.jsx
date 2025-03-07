import { BentoGridDemo } from "@/components/Blog-Component/BentoGridDemo"
import BlogHero from "@/components/Blog-Component/BlogHero"
import HomeSection from "@/components/Home-Page-Components/HomeSection"

export const metadata = {
  title: "Blog",
  description: "Elevate your social grace with our specialized etiquette courses...",
  keywords: ["social", "grace", "professional", "dining", "classes", "learning"],
  alternates: {
    canonical: "https://modernmannerism.com/blogs",
  },
}

const page = async () => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/list-blog`)
    const page = 1
    const pageSize = 10
    url.searchParams.set("page", page)
    url.searchParams.set("pageSize", pageSize)
    url.searchParams.set("sortBy", "createdAt")
    url.searchParams.set("sortOrder", "desc")

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch blog posts")
    }

    const result = await response.json()
    if (result && result.data && result.data.length > 0) {
      return (
        <div>
          <BlogHero />
          <BentoGridDemo blogs={result.data} />
          <HomeSection />
        </div>
      )
    } else {
      return <div className="min-h-[50vh] flex items-center justify-center">No blog posts found</div>
    }
  } catch (error) {
    console.error("Error fetching blog data:", error)
    return <div className="min-h-[50vh] flex items-center justify-center">Error loading blog posts</div>
  }
}

export default page

