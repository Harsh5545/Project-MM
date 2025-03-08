import { fetchBlogs } from "@/api"
import { BentoGridDemo } from "@/components/Blog-Component/BentoGridDemo"
import BlogHero from "@/components/Blog-Component/BlogHero"
import HomeSection from "@/components/Home-Page-Components/HomeSection"

export const metadata = {
  title: "Blogs",
  description: "Elevate your social grace with our specialized etiquette courses...",
  keywords: ["social", "grace", "professional", "dining", "classes", "learning"],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blogs`,
  },
  openGraph: {
    title: "MM | Blogs",
    description: "Elevate your social grace with our specialized etiquette courses...",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blogs`,
    siteName: "Modern Mannerism",
    images: [
      {
        url: "https://ik.imagekit.io/giol62jyf/static/MM.png?updatedAt=1741423895125",
        width: 800,
        height: 600,
      },
    ]
  },
}

const page = async () => {
  try {
    const data = await fetchBlogs()
    if (data && data.data && data.data.length > 0) {
      return (
        <div>
          <BlogHero />
          <BentoGridDemo blogs={data.data} />
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

