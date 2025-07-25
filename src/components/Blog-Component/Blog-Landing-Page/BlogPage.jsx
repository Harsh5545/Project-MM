"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useCallback } from "react" // Import useCallback
import { BookmarkPlus, Eye, Calendar, User, Heart, MessageSquare, Clock, ChevronRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DM_Sans } from "next/font/google"
// Removed FaFacebook, FaInstagram, FaLinkedin as they are replaced by SocialShare
import { Card, CardContent } from "@/components/ui/card"
import BlogContentRenderer from "./BlogContentRenderer"
import SocialShare from "./social-share" // Import the SocialShare component

const dmsans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const BlogPage = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [likesCount, setLikesCount] = useState(data?.likes || 0)
  const [liked, setLiked] = useState(false)
  const [estimatedReadTime, setEstimatedReadTime] = useState("5 min")

  // Use useCallback for stable function references
  const updateViewCount = useCallback(async () => {
    if (!data?.id || !data?.slug) return
    try {
      const response = await fetch(`/api/blog/update-view-count`, {
        method: "POST",
        body: JSON.stringify({ id: data.id, slug: data.slug }),
      })

      if (!response.ok) {
        throw new Error("Failed to update view count")
      }

      const responseData = await response.json()
      console.log("View count updated successfully:", responseData)
    } catch (error) {
      console.error("Error updating view count:", error)
    }
  }, [data?.id, data?.slug]) // Dependencies for useCallback

  const updateLikeCount = useCallback(
    async (status) => {
      if (!data?.id || !data?.slug) return
      try {
        const response = await fetch(`/api/blog/update-likes-count`, {
          method: "POST",
          body: JSON.stringify({ id: data.id, slug: data.slug, status }),
        })

        if (!response.ok) {
          throw new Error("Failed to update like count")
        }

        const responseData = await response.json()
        console.log("Like count updated successfully:", responseData)
      } catch (error) {
        console.error("Error updating like count:", error)
      }
    },
    [data?.id, data?.slug],
  ) // Dependencies for useCallback

  const toggleLike = () => {
    const newLikedStatus = !liked
    setLiked(newLikedStatus)
    setLikesCount(newLikedStatus ? likesCount + 1 : likesCount - 1)
    updateLikeCount(newLikedStatus ? "like" : "unlike")
    localStorage.setItem(`liked_${data.id}`, newLikedStatus.toString()) // Store as string
  }

  useEffect(() => {
    if (data?.id) {
      // Initialize liked status from local storage
      const storedLikedStatus = localStorage.getItem(`liked_${data.id}`) === "true"
      setLiked(storedLikedStatus)

      // Calculate estimated read time
      if (data.content) {
        const wordCount = data.content.replace(/<[^>]*>/g, "").split(/\s+/).length
        const readingTime = Math.ceil(wordCount / 200) // Assuming 200 words per minute
        setEstimatedReadTime(`${readingTime} min read`)
      }

      // Update view count when data.id changes
      updateViewCount()

      const handleScroll = () => {
        setIsScrolled(window.scrollY > 200)
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [data?.id, data?.content, updateViewCount]) // Dependencies for this effect

  if (!data) {
    return <div className="flex items-center justify-center min-h-screen text-red-500 text-lg">Blog not found</div>
  }

  // Format the date if available
  const exactDate = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

  return (
    <div className="relative pt-20">
      {/* Floating share bar on scroll */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: isScrolled ? 1 : 0, x: isScrolled ? 0 : -50 }}
        className="fixed left-4 top-1/3 z-50 hidden lg:flex flex-col gap-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-2 rounded-full shadow-md"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SocialShare
                url={`/blogs/${data.slug}`}
                title={data.title}
                description={data.metaDescription}
                platform="linkedin"
                isFloating={true}
              />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Share on LinkedIn</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <SocialShare
                url={`/blogs/${data.slug}`}
                title={data.title}
                description={data.metaDescription}
                platform="instagram"
                isFloating={true}
              />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Share on Instagram</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <SocialShare
                url={`/blogs/${data.slug}`}
                title={data.title}
                description={data.metaDescription}
                platform="facebook"
                isFloating={true}
              />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Share on Facebook</p>
            </TooltipContent>
          </Tooltip>

          <Separator className="mx-auto w-4/5 my-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full hover:bg-primary/10 h-10 w-10 ${liked ? "text-red-500" : "text-gray-400"}`}
                onClick={toggleLike}
              >
                <Heart className="h-5 w-5" fill={liked ? "currentColor" : "none"} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{liked ? "Unlike" : "Like"} this article</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 h-10 w-10">
                <BookmarkPlus className="h-5 w-5 text-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Save for later</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>

      <div className="container max-w-[90%] lg:max-w-[85%] mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb navigation */}
        <div className="mb-6 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Link href="/blogs" className="hover:text-primary transition-colors">
            Articles
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          {data.category && (
            <>
              <Link
                href={`/blogs?category=${data.category.category_name}`}
                className="hover:text-primary transition-colors"
              >
                {data.category.category_name}
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
            </>
          )}
          <span className="text-gray-700 dark:text-gray-300 truncate">{data.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:w-2/3 space-y-8"
          >
            {/* Blog Header */}
            <header className="space-y-4">
              <h1
                className={`${dmsans.className} font-semibold text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white leading-tight`}
              >
                {data.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800 shadow-sm">
                    <AvatarImage
                      src={data.author?.image || "/assets/MMMMM.png"}
                      alt={data.author?.first_name || "Author"}
                      title={data.author?.first_name || "Author"}
                    />
                    <AvatarFallback>{data.author?.first_name?.[0] || "A"}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {data.author ? `${data.author.first_name} ${data.author.last_name}` : "Manasi Kadam"}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Certified Consultant</span>
                  </div>
                </div>

                <Separator orientation="vertical" className="h-6" />

                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>{exactDate}</span>
                </div>

                <Separator orientation="vertical" className="h-6" />

                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{estimatedReadTime}</span>
                </div>

                <Separator orientation="vertical" className="h-6" />

                <div className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  <span>{data.views || 0} views</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl shadow-md">
              <Image
                src={data.image || "/assets/manasi-box.png"}
                alt={data.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                priority
              />
            </div>

            {/* Blog Content */}
            <BlogContentRenderer content={typeof data?.content === "string" ? data?.content : "<p>No Content</p>"} />

            {/* Article Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className={`rounded-full ${liked ? "text-red-500 border-red-200" : ""}`}
                  onClick={toggleLike}
                >
                  <Heart className="h-4 w-4 mr-1.5" fill={liked ? "currentColor" : "none"} />
                  {likesCount} {liked ? "Liked" : "Like"}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-transparent"
                  onClick={() => document.getElementById("comments").scrollIntoView({ behavior: "smooth" })}
                >
                  <MessageSquare className="h-4 w-4 mr-1.5" />
                  Comment
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Share:</span>
                <SocialShare url={`/blogs/${data.slug}`} title={data.title} description={data.metaDescription} />
              </div>
            </div>
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:w-1/3 space-y-8"
          >
            {/* Author Card */}
            <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-800 shadow-md mb-4">
                    <AvatarImage src={"/assets/MMMMM.png"} alt="Manasi Kadam" />
                    <AvatarFallback>MK</AvatarFallback>
                  </Avatar>

                  <h3 className="text-xl font-serif font-bold">Manasi Kadam</h3>
                  <p className={`${dmsans.className} text-sm text-gray-600 dark:text-gray-300 mt-1`}>
                    Certified Image & Etiquette Consultant
                  </p>

                  <Separator className="w-16 my-4" />

                  <p className={`${dmsans.className} text-sm leading-relaxed text-gray-700 dark:text-gray-300`}>
                    I'm passionate about helping you develop confidence, polish, and social grace. My practical approach
                    to etiquette makes it accessible and relevant for today's world.
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <Button variant="outline" size="sm" className="rounded-full bg-transparent" asChild>
                      <Link href="/about-us">Know More</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trending Blogs */}
            {data.recentBlogs && data.recentBlogs.length > 0 && (
              <Card className="overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-4">
                  <h3 className="text-lg font-serif font-bold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>Trending Articles</span>
                  </h3>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {data.recentBlogs.map((blog, index) => (
                    <Link
                      key={index}
                      href={`/blogs/${blog.slug}`}
                      className="block hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="p-4 flex gap-3">
                        <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={blog.image || "/assets/default-blog.png"}
                            alt={blog.title}
                            title={blog.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors">
                            {blog.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <User className="h-3 w-3" />
                            <span>{blog.author?.first_name || "Author"}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
                  <Link href="/blogs">
                    <Button variant="ghost" size="sm" className="w-full">
                      View All Articles
                    </Button>
                  </Link>
                </div>
              </Card>
            )}

            {/* Etiquette Quote */}
            <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-serif text-primary mb-4">"</div>
                <p className="italic text-gray-700 dark:text-gray-200">
                  "Etiquette is not about rules, but about creating a comfortable environment for everyone. It's the
                  foundation of meaningful connections."
                </p>
                <div className="mt-4 text-sm font-medium">— Manasi Kadam</div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-serif font-bold">Join Our Community</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Subscribe to receive etiquette tips, event invitations, and exclusive content.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
                    required
                  />
                  <Button className="bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full">
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </CardContent>
            </Card>
          </motion.aside>
        </div>

        {/* Related Articles */}
        {data.recentBlogs && data.recentBlogs.length > 0 && (
          <div className="mt-12">
            <h3 className={`${dmsans.className} text-2xl font-semibold mb-6`}>You May Also Like</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.recentBlogs.slice(0, 3).map((blog, index) => (
                <Link key={index} href={`/blogs/${blog.slug}`}>
                  <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={blog.image || "/assets/default-blog.png"}
                        alt={blog.title}
                        title={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className={`${dmsans.className} font-medium text-lg mb-2 line-clamp-2`}>{blog.title}</h4>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>Manasi Kadam</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPage
