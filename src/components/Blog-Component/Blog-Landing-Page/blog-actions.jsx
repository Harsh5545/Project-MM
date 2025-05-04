"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import SocialShare from "./social-share"
import { Heart, MessageSquare, Bookmark, BookmarkCheck } from "lucide-react"

export default function BlogActions({ blogId, slug, initialLikes = 0, onCommentClick }) {
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleLike = async () => {
    const newLikedStatus = !liked
    setLiked(newLikedStatus)
    setLikes((prev) => (newLikedStatus ? prev + 1 : prev - 1))

    try {
      await fetch(`/api/blog/update-likes-count`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: blogId,
          slug,
          status: newLikedStatus ? "like" : "unlike",
        }),
      })

      // Store the liked status
      localStorage.setItem(`liked_${blogId}`, newLikedStatus.toString())
    } catch (error) {
      console.error("Error updating like count:", error)
      // Revert UI state if the API call fails
      setLiked(!newLikedStatus)
      setLikes((prev) => (!newLikedStatus ? prev + 1 : prev - 1))
    }
  }

  const handleSave = () => {
    const newSavedStatus = !saved
    setSaved(newSavedStatus)

    // Store saved blogs in localStorage
    const savedBlogs = JSON.parse(localStorage.getItem("savedBlogs") || "[]")

    if (newSavedStatus) {
      if (!savedBlogs.includes(slug)) {
        savedBlogs.push(slug)
      }
    } else {
      const index = savedBlogs.indexOf(slug)
      if (index > -1) {
        savedBlogs.splice(index, 1)
      }
    }

    localStorage.setItem("savedBlogs", JSON.stringify(savedBlogs))
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className={`rounded-full ${liked ? "text-red-500 border-red-200" : ""}`}
          onClick={handleLike}
        >
          <Heart className="h-4 w-4 mr-1.5" fill={liked ? "currentColor" : "none"} />
          {likes} {liked ? "Liked" : "Like"}
        </Button>

        <Button variant="outline" size="sm" className="rounded-full" onClick={onCommentClick}>
          <MessageSquare className="h-4 w-4 mr-1.5" />
          Comment
        </Button>

        <Button
          variant="outline"
          size="sm"
          className={`rounded-full ${saved ? "text-primary border-primary/20" : ""}`}
          onClick={handleSave}
        >
          {saved ? <BookmarkCheck className="h-4 w-4 mr-1.5" /> : <Bookmark className="h-4 w-4 mr-1.5" />}
          {saved ? "Saved" : "Save"}
        </Button>
      </div>

      <SocialShare url={`/blogs/${slug}`} title="Check out this blog post" />
    </div>
  )
}
