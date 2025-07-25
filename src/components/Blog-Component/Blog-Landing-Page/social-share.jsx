"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Share2, Facebook, Twitter, Linkedin, Mail, Copy, Check, Instagram } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

export default function SocialShare({ url, title, description, platform, isFloating = false }) {
  const [copied, setCopied] = useState(false)

  const getFullUrl = () => {
    if (!url) return ""
    if (url.startsWith("http")) return url
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
    instagram: `https://www.instagram.com/share?url=${encodedUrl}`, // Instagram web share is limited, often requires app
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

  const handleShare = (sharePlatform) => {
    if (sharePlatform === "instagram") {
      // Instagram web share is tricky. This might just open Instagram.com
      // For true "story" sharing, it often requires deep links or native app integration.
      // This is a best-effort for web.
      window.open(shareLinks[sharePlatform], "_blank")
    } else {
      window.open(shareLinks[sharePlatform], "_blank", "width=600,height=400")
    }
  }

  // Render a single icon button if 'platform' prop is provided (for floating bar)
  if (isFloating && platform) {
    let IconComponent
    let iconColorClass = ""
    let tooltipText = ""

    switch (platform) {
      case "facebook":
        IconComponent = Facebook
        iconColorClass = "text-[#1877F2]"
        tooltipText = "Share on Facebook"
        break
      case "twitter":
        IconComponent = Twitter
        iconColorClass = "text-[#1DA1F2]"
        tooltipText = "Share on Twitter"
        break
      case "linkedin":
        IconComponent = Linkedin
        iconColorClass = "text-[#0A66C2]"
        tooltipText = "Share on LinkedIn"
        break
      case "email":
        IconComponent = Mail
        iconColorClass = "text-[#EA4335]"
        tooltipText = "Share via Email"
        break
      case "instagram":
        IconComponent = Instagram
        iconColorClass = "text-[#E4405F]"
        tooltipText = "Share on Instagram"
        break
      default:
        IconComponent = Share2
        iconColorClass = ""
        tooltipText = "Share"
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full hover:bg-primary/10 h-10 w-10 ${iconColorClass}`}
              onClick={() => handleShare(platform)}
            >
              <IconComponent className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  // Default rendering for the popover share button
  return (
    <div className="social-share">
      <TooltipProvider>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
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
                  className="rounded-full h-9 w-9 text-[#1877F2] hover:text-[#1877F2] hover:bg-[#1877F2]/10 bg-transparent"
                  onClick={() => handleShare("facebook")}
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-9 w-9 text-[#1DA1F2] hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 bg-transparent"
                  onClick={() => handleShare("twitter")}
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-9 w-9 text-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 bg-transparent"
                  onClick={() => handleShare("linkedin")}
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-9 w-9 text-[#E4405F] hover:text-[#E4405F] hover:bg-[#E4405F]/10 bg-transparent"
                  onClick={() => handleShare("instagram")}
                >
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-9 w-9 text-[#EA4335] hover:text-[#EA4335] hover:bg-[#EA4335]/10 bg-transparent"
                  onClick={() => handleShare("email")}
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Input value={fullUrl} readOnly className="text-xs" />
                <Button variant="outline" size="icon" className="shrink-0 bg-transparent" onClick={handleCopyLink}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </TooltipProvider>
    </div>
  )
}
