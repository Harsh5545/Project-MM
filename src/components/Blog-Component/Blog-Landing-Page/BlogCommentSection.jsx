"use client"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { MessageSquare, ThumbsUp, Reply, Flag, Send } from "lucide-react"

export default function BlogCommentSection({ blogId, comments = [] }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [comment, setComment] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [replyingTo, setReplyingTo] = useState(null)

  // Mock comments if none provided
  const mockComments = [
    {
      id: 1,
      name: "Sarah Johnson",
      date: "2 weeks ago",
      content:
        "This article was incredibly insightful! I've been struggling with proper dining etiquette at formal events, and your tips about European vs. American dining styles were exactly what I needed. Thank you for sharing your expertise.",
      likes: 12,
      replies: [
        {
          id: 101,
          name: "Manasi Kadam",
          isAuthor: true,
          date: "2 weeks ago",
          content:
            "Thank you for your kind words, Sarah! I'm glad you found the dining etiquette tips helpful. Feel free to reach out if you have any specific questions about formal dining situations.",
          likes: 3,
        },
      ],
    },
    {
      id: 2,
      name: "Michael Chen",
      date: "3 weeks ago",
      content:
        "I appreciate how you broke down business meeting etiquette across different cultures. As someone who frequently travels for work, these insights will definitely help me navigate international business relationships more effectively.",
      likes: 8,
      replies: [],
    },
  ]

  const displayComments = comments.length > 0 ? comments : mockComments

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Reset form
      setName("")
      setEmail("")
      setComment("")
      setSubmitting(false)
      setReplyingTo(null)

      // Show success message or update comments list
      alert("Comment submitted successfully! It will appear after moderation.")
    }, 1000)
  }

  return (
    <section className="py-6 md:py-16">
      <div className="container max-w-screen-xl mx-auto px-3 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <MessageSquare className="h-6 w-6 text-[#c3965d]" />
          <h2 className="text-2xl font-bold">Comments ({displayComments.length})</h2>
        </div>

        {/* Comment Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6 mb-6 md:mb-10"
        >
          <h3 className="text-lg font-semibold mb-4">{replyingTo ? `Reply to ${replyingTo}` : "Leave a Comment"}</h3>
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Name *
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Your email (will not be published)"
                />
              </div>
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Comment *
              </label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                placeholder="Share your thoughts..."
                rows={4}
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
                className="bg-[#c3965d] hover:bg-[#b78a4e] text-white ml-auto"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Post Comment"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Comments List */}
        <div className="space-y-6">
          {displayComments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-4 md:p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 border border-gray-200 dark:border-gray-700">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.name}`}
                      alt={comment.name}
                    />
                    <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">
                          {comment.name}
                          {comment.isAuthor && <Badge className="ml-2 bg-[#c3965d] text-white">Author</Badge>}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{comment.date}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">{comment.content}</p>
                    <div className="mt-3 flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {comment.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 dark:text-gray-400"
                        onClick={() => setReplyingTo(comment.name)}
                      >
                        <Reply className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 pl-8 md:pl-14 space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="border-l-2 border-gray-100 dark:border-gray-700 pl-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8 border border-gray-200 dark:border-gray-700">
                            <AvatarImage
                              src={
                                reply.isAuthor
                                  ? "/assets/Manasi_kadam_image.jpg"
                                  : `https://api.dicebear.com/7.x/avataaars/svg?seed=${reply.name}`
                              }
                              alt={reply.name}
                            />
                            <AvatarFallback>{reply.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <span className="font-medium">
                                {reply.name}
                                {reply.isAuthor && (
                                  <span className="ml-2 text-xs px-2 py-0.5 bg-[#c3965d] text-white rounded-full">
                                    Author
                                  </span>
                                )}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{reply.date}</span>
                            </div>
                            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{reply.content}</p>
                            <div className="mt-2 flex items-center gap-4">
                              <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400 text-xs">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                {reply.likes}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

