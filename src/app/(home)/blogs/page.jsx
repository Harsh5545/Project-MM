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

const page = async ({searchParams}) => {
  const currentPage  = Number((await searchParams)['page'] ?? 1);
  const searchTerm = (await searchParams)['search'] ?? '';
 
  try {
    const data = await fetchBlogs(currentPage,10)
    if (data && data.data && data.data.length > 0) {
      return (
        <div>
          <BlogHero />
          <BentoGridDemo blogs={data.data} />
          <div className="flex justify-center mt-4">
            {/* Previous Page Link */}
            {currentPage > 1 && (
              <a
                href={`?page=${currentPage - 1}`}
                className="px-4 py-2 mx-2 bg-gray-300 rounded"
              >
                Previous
              </a>
            )}

            {/* Page Info */}
            <span className="mx-2">
              Page {currentPage} of {data.totalPages}
            </span>

            {/* Next Page Link */}
            {currentPage < data.totalPages && (
              <a
                href={`?page=${currentPage + 1}`}
                className="px-4 py-2 mx-2 bg-gray-300 rounded"
              >
                Next
              </a>
            )}
          </div>
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

