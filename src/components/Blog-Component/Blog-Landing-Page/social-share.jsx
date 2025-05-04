"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Share2, Facebook, Twitter, Linkedin, Mail, Copy, Check } from "lucide-react"

export default function SocialShare({ url, title, description }) {
  const [copied, setCopied] = useState(false)

  // Ensure we have the full URL
  const getFullUrl = () => {
    if (!url) return ""

    // If it's already a full URL, return it
    if (url.startsWith("http")) return url

    // Otherwise, construct the full URL
    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    return `${baseUrl}${url.startsWith("/") ? url : `/${url}`}`
  }

  const fullUrl = getFullUrl()

  const encodedUrl = encodeURIComponent(fullUrl)
  const encodedTitle = encodeURIComponent(title || "")
  const encodedDescription = encodeURIComponent(description || "")

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    toast({
      title: "Link copied!",
      description: "The link has been copied to your clipboard.",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400")
  }

  return (
    <div className="social-share">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="grid gap-4">
            <h3 className="font-medium">Share this content</h3>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9 text-[#1877F2] hover:text-[#1877F2] hover:bg-[#1877F2]/10"
                onClick={() => handleShare("facebook")}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9 text-[#1DA1F2] hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10"
                onClick={() => handleShare("twitter")}
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9 text-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#0A66C2]/10"
                onClick={() => handleShare("linkedin")}
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9 text-[#EA4335] hover:text-[#EA4335] hover:bg-[#EA4335]/10"
                onClick={() => handleShare("email")}
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Input value={fullUrl} readOnly className="text-xs" />
              <Button variant="outline" size="icon" className="shrink-0" onClick={handleCopyLink}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
