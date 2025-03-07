"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import parse from "html-react-parser"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { useEffect, useState } from "react"
import {
  Share2,
  BookmarkPlus,
  Eye,
  Calendar,
  User,
  Heart,
  MessageSquare,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const BlogPage = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [liked, setLiked] = useState(false)

  if (!data) {
    return <div className="flex items-center justify-center min-h-screen text-red-500 text-lg">Blog not found</div>
  }

  // Format the date if available
  const formattedDate = data.createdAt ? formatDistanceToNow(new Date(data.createdAt), { addSuffix: true }) : ""
  const exactDate = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : ""

  const updateViewCount = async () => {
    try {
      const response = await fetch(`/api/blog/update-view-count`, {
        method: "POST",
        body: JSON.stringify({ id: data?.id, slug: data?.slug }),
      })

      if (!response.ok) {
        throw new Error("Failed to update view count")
      }

      const responseData = await response.json()
      console.log("View count updated successfully:", responseData)
    } catch (error) {
      console.error("Error updating view count:", error)
    }
  }

  useEffect(() => {
    updateViewCount()

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [data]) // Added data to dependencies

  return (
    <div className="relative pt-20">
      {" "}
      {/* Added pt-20 for navbar space */}
      {/* Floating share bar on scroll */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: isScrolled ? 1 : 0, x: isScrolled ? 0 : -50 }}
        className="fixed left-4 top-1/3 z-50 hidden lg:flex flex-col gap-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-3 rounded-full shadow-md"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 h-10 w-10">
                <Facebook className="h-5 w-5 text-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Share on Facebook</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 h-10 w-10">
                <Twitter className="h-5 w-5 text-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Share on Twitter</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 h-10 w-10">
                <Linkedin className="h-5 w-5 text-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Share on LinkedIn</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full hover:bg-primary/10 h-10 w-10 ${liked ? "text-red-500" : "text-gray-400"}`}
                onClick={() => setLiked(!liked)}
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
      <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
       

        <div className="flex flex-col lg:flex-row-reverse gap-10">
          {/* Main Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:w-2/3 space-y-8 order-1 lg:order-2"
          >
            {/* Blog Header */}
            <header className="space-y-4">
              {data.category && typeof data.category.category_name === "string" ? (
                <Badge className="bg-primary/20 text-primary hover:bg-primary/30 px-3 py-1 text-xs uppercase tracking-wider font-medium">
                  {data.category.category_name}
                </Badge>
              ) : null}


              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 dark:text-white leading-tight">
                {data.title}
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 font-light leading-relaxed">{data.meta_desc}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={data.author?.image || "/assets/Manasi_kadam_image.jpg"}
                      alt={data.author?.first_name || "Author"}
                    />
                    <AvatarFallback>{data.author?.first_name?.[0] || "A"}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">
                    {data.author ? `${data.author.first_name} ${data.author.last_name}` : "Manasi Kadam"}
                  </span>
                </div>

                <Separator orientation="vertical" className="h-4" />

                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{exactDate}</span>
                </div>

                <Separator orientation="vertical" className="h-4" />

                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{data.views || 0} views</span>
                </div>

                <div className="flex-grow"></div>

                <div className="flex items-center gap-2 sm:ml-auto">
                  <Button variant="ghost" size="sm" className="h-8 rounded-full md:hidden">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 rounded-full md:hidden ${liked ? "text-red-500" : ""}`}
                    onClick={() => setLiked(!liked)}
                  >
                    <Heart className="h-4 w-4 mr-1" fill={liked ? "currentColor" : "none"} />
                    {liked ? "Liked" : "Like"}
                  </Button>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
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
            <div className="prose prose-lg dark:prose-invert max-w-none">
            {parse(typeof data?.content === "string" ? data?.content : "<p>No Content</p>")}

            </div>

            {/* Tags */}
            {/* {data.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1">
                {typeof tag === "string" ? tag : JSON.stringify(tag)}
              </Badge>
            ))} */}

            {/* Article Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className={`rounded-full ${liked ? "text-red-500 border-red-200" : ""}`}
                  onClick={() => setLiked(!liked)}
                >
                  <Heart className="h-4 w-4 mr-1.5" fill={liked ? "currentColor" : "none"} />
                  {liked ? "Liked" : "Like"}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => document.getElementById("comments").scrollIntoView({ behavior: "smooth" })}
                >
                  <MessageSquare className="h-4 w-4 mr-1.5" />
                  Comment
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Share:</span>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <Facebook className="h-4 w-4 text-[#1877F2]" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                </Button>
              </div>
            </div>

            {/* Author Bio Card */}
           
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:w-1/3 space-y-8 order-2 lg:order-1"
          >
            {/* Author Card (Mobile Only) */}
            <div className="lg:hidden bg-primary/5 dark:bg-primary/10 rounded-xl p-6 flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 border-4 border-white dark:border-gray-800 shadow-md">
                <AvatarImage
                  src={"/assets/Manasi_kadam_image.jpg"}
                  alt="Manasi Kadam"
                />
                <AvatarFallback>{data.author?.first_name?.[0] || "M"}</AvatarFallback>
              </Avatar>

              <h3 className="text-lg font-serif font-bold mt-4">
                Manasi Kadam
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Certified Image & Etiquette Consultant</p>
              <div className="mt-4">
                <Link href="/about-us">
                  <Button variant="outline" size="sm" className="rounded-full">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 flex flex-col  gap-6 items-center">
              <Avatar className="h-64 w-48 border-4 border-white dark:border-gray-800 shadow-md">
                <AvatarImage
                  src={"/assets/Manasi_kadam_image.jpg"}
                  alt="Manasi Kadam"
                />
                <AvatarFallback>{"Manasi Kadam"}</AvatarFallback>
              </Avatar>

              <div className="text-center sm:text-left">
                <h3 className="text-xl font-serif font-bold">
                  Manasi Kadam
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Certified Image & Etiquette Consultant</p>
                <p className="mt-3 text-sm">
                  I'm passionate about helping you develop confidence, polish, and social grace. My practical approach
                  to etiquette makes it accessible and relevant for today's world.
                </p>
                <div className="mt-4 text-center">
                  <Link href="/about-us">
                    <Button variant="outline" size="sm" className="rounded-full">
                      Learn More About Me
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            {/* Trending Blogs */}
            {data.recentBlogs && data.recentBlogs.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700  top-24">
                <div className="bg-primary/10 p-4">
                  <h3 className="text-lg font-serif font-bold flex items-center">
                    <span className="relative">
                      Trending Articles
                      <span className="absolute -top-1 -right-2 h-2 w-2 bg-primary rounded-full animate-pulse"></span>
                    </span>
                  </h3>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {data.recentBlogs.map((blog, index) => (
                    <Link
                      key={index}
                      href={`/blogs/${blog.slug}`}
                      className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="p-4 flex gap-3">
                        <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={blog.image || "/assets/default-blog.png"}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium line-clamp-2">{blog.title}</h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <User className="h-3 w-3" />
                            <span>{blog.author?.first_name || "Author"}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800">
                  <Link href="/blogs">
                    <Button variant="ghost" size="sm" className="w-full">
                      View All Articles
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Etiquette Quote */}
            <div className="bg-primary/10 dark:bg-primary/20 rounded-xl p-6 text-center">
              <div className="text-4xl font-serif text-primary mb-4">"</div>
              <p className="italic text-gray-700 dark:text-gray-200">
                "Etiquette is not about rules, but about creating a comfortable environment for everyone. It's the
                foundation of meaningful connections."
              </p>
              <div className="mt-4 text-sm font-medium">— Manasi Kadam</div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-serif font-bold">Join Our Etiquette Community</h3>
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
                  <Button className="w-full">Subscribe</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  )
}

export default BlogPage

