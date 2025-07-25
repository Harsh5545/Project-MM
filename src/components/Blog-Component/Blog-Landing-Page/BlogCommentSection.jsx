"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { MessageSquare, Reply, Flag, Send, Trash2, CheckCircle2, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast" // Assuming you have useToast
import { formatDistanceToNow } from "date-fns"

export default function BlogCommentSection({ blogId, initialComments = [], session }) {
  // Initialize comments state directly from initialComments prop.
  // This runs only once on the initial mount.
  const [comments, setComments] = useState(initialComments)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [commentContent, setCommentContent] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [replyingTo, setReplyingTo] = useState(null) // Stores parent comment ID
  const [activeTab, setActiveTab] = useState("recent")
  const { toast } = useToast()

  const isAdmin = session?.user?.role?.name === "ADMIN" // Assuming role name is 'ADMIN'

  useEffect(() => {
    console.log("BlogCommentSection received blogId:", blogId)
  }, [blogId])

  // Refetch comments function
  const fetchComments = async () => {
    try {
      // For admins, fetch all comments (including pending/rejected)
      // For public, fetch only approved comments (as per GET route's filter)
      const response = await fetch(`/api/comments?blogId=${blogId}${isAdmin ? "&includeAllStatuses=true" : ""}`)
      if (response.ok) {
        const data = await response.json()
        setComments(data.data)
      } else {
        console.error("Failed to fetch comments:", response.statusText)
        toast({
          title: "Error",
          description: "Failed to load comments.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching comments:", error)
      toast({
        title: "Error",
        description: "Network error while loading comments.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    // This effect runs when blogId changes.
    // It ensures that if the user navigates to a different blog post,
    // the comments are re-fetched for the new blogId.
    // It also runs on initial mount if blogId is present.
    if (blogId) {
      fetchComments()
    }
  }, [blogId]) // Dependency array only includes blogId
  const handleSubmitComment = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    if (!commentContent.trim()) {
      toast({
        title: "Validation Error",
        description: "Comment cannot be empty.",
        variant: "destructive",
      })
      setSubmitting(false)
      return
    }

    if (!session?.user?.id && (!name.trim() || !email.trim())) {
      toast({
        title: "Validation Error",
        description: "Name and email are required for guest comments.",
        variant: "destructive",
      })
      setSubmitting(false)
      return
    }

    if (!blogId || typeof blogId !== "number" || isNaN(blogId)) {
      toast({
        title: "Error",
        description: "Blog ID is missing or invalid. Cannot post comment.",
        variant: "destructive",
      })
      setSubmitting(false)
      return
    }

    try {
      const payload = {
        blogId: Number(blogId), // Ensure blogId is a number
        content: commentContent,
        parentId: replyingTo,
        name: session?.user?.id ? undefined : name, // Only send name/email if guest
        email: session?.user?.id ? undefined : email,
      }

      console.log("Sending comment payload:", payload) // Log payload before sending

      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        const newComment = await response.json() // Get the newly created comment from the API
        toast({
          title: "Comment Posted!",
          description: "Your comment has been successfully added.",
        })
        setCommentContent("")
        setName("")
        setEmail("")
        setReplyingTo(null)

        // Immediately add the new comment to the state
        // If it's a reply, find the parent and add it there
        if (newComment.data.parentId) {
          setComments((prevComments) =>
            prevComments.map((c) =>
              c.id === newComment.data.parentId ? { ...c, replies: [...(c.replies || []), newComment.data] } : c,
            ),
          )
        } else {
          // If it's a top-level comment, add it to the top
          setComments((prevComments) => [newComment.data, ...prevComments])
        }
      } else {
        const errorData = await response.json()
        toast({
          title: "Submission Failed",
          description: errorData.error || "Failed to post comment. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting comment:", error)
      toast({
        title: "Error",
        description: "Network error while submitting comment.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (!confirm("Are you sure you want to delete this comment?")) return

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Comment Deleted",
          description: "The comment has been successfully deleted.",
        })
        fetchComments() // Refetch comments to update the list
      } else {
        const errorData = await response.json()
        toast({
          title: "Deletion Failed",
          description: errorData.error || "Failed to delete comment.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting comment:", error)
      toast({
        title: "Error",
        description: "Network error while deleting comment.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateCommentStatus = async (commentId, newStatus) => {
    try {
      const response = await fetch(`/api/comments/${commentId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        toast({
          title: "Comment Status Updated",
          description: `Comment status changed to ${newStatus}.`,
        })
        fetchComments() // Refetch comments to update the list
      } else {
        const errorData = await response.json()
        toast({
          title: "Status Update Failed",
          description: errorData.error || "Failed to update comment status.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating comment status:", error)
      toast({
        title: "Error",
        description: "Network error while updating comment status.",
        variant: "destructive",
      })
    }
  }

  // Sort comments based on active tab
  const sortedComments = [...comments].sort((a, b) => {
    if (activeTab === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt)
    } else {
      // For "popular", you'd need a 'likes' field on comments, which isn't in schema yet.
      // For now, we'll just keep it by recent if no likes are tracked.
      return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })

  const renderComment = (comment, isReply = false) => {
    const authorName = comment.user ? `${comment.user.first_name} ${comment.user.last_name}` : comment.guestName
    const isAuthor = comment.user?.role?.name === "AUTHOR" // Assuming 'AUTHOR' role for blog authors
    const isCommentAdmin = comment.user?.role?.name === "ADMIN" // Check if the comment was made by an admin

    return (
      <div
        key={comment.id}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <Avatar
              className={`h-${isReply ? 8 : 10} w-${isReply ? 8 : 10} border border-gray-200 dark:border-gray-700`}
            >
              <AvatarImage
                src={comment.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${authorName}`}
                alt={authorName}
              />
              <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium">{authorName}</span>
                  {isAuthor && <Badge className="bg-primary/20 text-primary hover:bg-primary/30 text-xs">Author</Badge>}
                  {isCommentAdmin && (
                    <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 text-xs">Admin</Badge>
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </span>
                  {isAdmin && comment.status !== "APPROVED" && (
                    <Badge variant="outline" className="bg-yellow-500/20 text-yellow-500 text-xs">
                      {comment.status}
                    </Badge>
                  )}
                </div>

                {isAdmin && (
                  <div className="flex gap-2">
                    {comment.status !== "APPROVED" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full text-green-500 hover:bg-green-500/10"
                        onClick={() => handleUpdateCommentStatus(comment.id, "APPROVED")}
                        title="Approve Comment"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="sr-only">Approve</span>
                      </Button>
                    )}
                    {comment.status !== "REJECTED" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full text-red-500 hover:bg-red-500/10"
                        onClick={() => handleUpdateCommentStatus(comment.id, "REJECTED")}
                        title="Reject Comment"
                      >
                        <XCircle className="h-4 w-4" />
                        <span className="sr-only">Reject</span>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 rounded-full text-gray-500 hover:bg-gray-500/10"
                      onClick={() => handleDeleteComment(comment.id)}
                      title="Delete Comment"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                )}
                {!isAdmin && (
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                    <Flag className="h-4 w-4 text-gray-500" />
                    <span className="sr-only">Report</span>
                  </Button>
                )}
              </div>

              <p className="mt-2 text-gray-700 dark:text-gray-300">{comment.content}</p>

              <div className="mt-3 flex items-center gap-4">
                {/* Likes functionality for comments is not in schema, so omitting for now */}
                {/* <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400 h-8 px-3">
                  <Heart className="h-4 w-4 mr-1 text-primary" />
                  {comment.likes || 0}
                </Button> */}

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 h-8 px-3"
                  onClick={() => setReplyingTo(comment.id)}
                >
                  <Reply className="h-4 w-4 mr-1" />
                  Reply
                </Button>
              </div>
            </div>
          </div>

          {/* Nested Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-6 pl-14 space-y-6">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>
                  <div className="flex items-start gap-3 pl-6">
                    {renderComment(reply, true)} {/* Recursively render replies */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <section id="comments" className="py-12 bg-gray-50 dark:bg-gray-900/50">
      <div className="container max-w-[1000px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Conversation ({comments.length})
            </h2>

            <Tabs defaultValue="recent" className="w-[200px]" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="popular" disabled>
                  Popular (Coming Soon)
                </TabsTrigger>{" "}
                {/* Disabled as no likes on comments yet */}
              </TabsList>
            </Tabs>
          </div>

          {/* Comment Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-4">
              {replyingTo
                ? `Reply to ${comments.find((c) => c.id === replyingTo)?.user?.first_name || comments.find((c) => c.id === replyingTo)?.guestName || "comment"}`
                : "Join the Conversation"}
            </h3>

            <form onSubmit={handleSubmitComment} className="space-y-4">
              {!session?.user?.id && ( // Only show name/email fields if not logged in
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={!session?.user?.id}
                      placeholder="Your name"
                      className="border-gray-200 dark:border-gray-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required={!session?.user?.id}
                      placeholder="Your email (will not be published)"
                      className="border-gray-200 dark:border-gray-700"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="comment" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Comment <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="comment"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  required
                  placeholder="Share your thoughts or questions..."
                  rows={4}
                  className="border-gray-200 dark:border-gray-700 resize-none"
                />
              </div>

              <div className="flex items-center justify-between">
                {replyingTo && (
                  <Button type="button" variant="ghost" onClick={() => setReplyingTo(null)}>
                    Cancel Reply
                  </Button>
                )}
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white ml-auto"
                  disabled={
                    submitting || !blogId || typeof blogId !== "number" || isNaN(blogId) || !commentContent.trim()
                  }
                >
                  {submitting ? "Submitting..." : "Post Comment"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                By commenting, you agree to our community guidelines and privacy policy.
              </p>
            </form>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {sortedComments.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>
            ) : (
              sortedComments.map((comment) => renderComment(comment))
            )}
          </div>

          {/* Etiquette Guidelines */}
          <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 text-center">
            <h3 className="text-lg font-serif font-medium mb-2">Community Etiquette Guidelines</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Please keep conversations respectful and constructive. We value diverse perspectives and thoughtful
              discussions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
