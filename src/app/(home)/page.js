import CardComponent from "@/components/Home-Page-Components/CardComponent"
import HeroCarousel from "@/components/Home-Page-Components/HeroCarousel"
import HomeAbout from "@/components/Home-Page-Components/HomeAbout"
import HomeConsultation from "@/components/Home-Page-Components/HomeConsultation"
import HomeDinning from "@/components/Home-Page-Components/HomeDinning"
import HomeTestimonial from "@/components/Home-Page-Components/HomeTestimonial"
import RecentBlogCarousel from "@/components/Home-Page-Components/RecentBloogs"

const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Modern Mannerism - Home",
  description: "Learn business etiquette, children's manners, and personality development with Modern Mannerism.",
  url: "https://www.modernmannerism.com",
  publisher: {
    "@type": "Organization",
    name: "Modern Mannerism",
    logo: {
      "@type": "ImageObject",
      url: "https://www.modernmannerism.com/logo.png",
    },
  },
  author: {
    "@type": "Organization",
    name: "Modern Mannerism",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.modernmannerism.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

export const metadata = {
  title:'Modern Mannerism',
  description:"Modern Mannerism offers personalized coaching in business etiquette, children's manners, and personality development.",
  keywords:"business etiquette, children's manners, personality development, modern manners, professional skills, children's etiquette, etiquette coaching",
  author: "Modern Mannerism",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
  },
  icons: {
    icon: "/MM.png", // Path to your logo in the public directory
    shortcut: "/MM.png",
    apple: "/MM.png",
  },
  openGraph: {
    title: "Modern Mannerism",
    description: "Modern Mannerism offers personalized coaching in business etiquette, children's manners, and personality development.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
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

async function getRecentBlogs() {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/list-blog`)
    url.searchParams.set("page", "1")
    url.searchParams.set("pageSize", "6")
    url.searchParams.set("sortBy", "createdAt")
    url.searchParams.set("sortOrder", "desc")
    url.searchParams.set("published", "true")

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch blogs")
    }

    const result = await response.json()
    return result?.data || []
  } catch (error) {
    console.error("Error fetching recent blogs for homepage:", error)
    return []
  }
}

export default async function Home() {
  const recentBlogs = await getRecentBlogs()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }} />
      <HeroCarousel />
      <CardComponent />
      <HomeDinning />
      <HomeAbout />
      <RecentBlogCarousel blogs={recentBlogs} />
      <HomeTestimonial />
      <div id="consultation">
        <HomeConsultation />
      </div>
    </>
  )
}

