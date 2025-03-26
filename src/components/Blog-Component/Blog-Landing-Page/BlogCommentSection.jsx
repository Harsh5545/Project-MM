"use client";

import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { MessageSquare, Reply, Flag, Send, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BlogCommentSection({ blogId, comments = [] }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [comment, setComment] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [replyingTo, setReplyingTo] = useState(null)
  const [activeTab, setActiveTab] = useState("recent")

  // Mock comments if none provided
  const mockComments = [
    {
      id: 1,
      name: "Shalini Gupta",
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
            "Thank you for your kind words, Shalini! I'm glad you found the dining etiquette tips helpful. Feel free to reach out if you have any specific questions about formal dining situations.",
          likes: 3,
        },
      ],
    },
    {
      id: 2,
      name: "Aniket Singh",
      date: "3 weeks ago",
      content:
        "I appreciate how you broke down business meeting etiquette across different cultures. As someone who frequently travels for work, these insights will definitely help me navigate international business relationships more effectively.",
      likes: 8,
      replies: [],
    },
  ]

  const displayComments = comments.length > 0 ? comments : mockComments

  // Sort comments based on active tab
  const sortedComments = [...displayComments].sort((a, b) => {
    if (activeTab === "recent") {
      // Sort by date (newest first)
      return new Date(b.date) - new Date(a.date)
    } else {
      // Sort by likes (most liked first)
      return b.likes - a.likes
    }
  })

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
    <section className="py-12 bg-gray-50 dark:bg-gray-900/50">
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
              Conversation ({displayComments.length})
            </h2>

            <Tabs defaultValue="recent" className="w-[200px]" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Comment Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-4">
              {replyingTo ? `Reply to ${replyingTo}` : "Join the Conversation"}
            </h3>

            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
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
                    required
                    placeholder="Your email (will not be published)"
                    className="border-gray-200 dark:border-gray-700"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="comment" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Comment <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
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
                  disabled={submitting}
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
            {sortedComments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 border border-gray-200 dark:border-gray-700">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.name}`}
                        alt={comment.name}
                      />
                      <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium">{comment.name}</span>
                          {comment.isAuthor && (
                            <Badge className="bg-primary/20 text-primary hover:bg-primary/30 text-xs">Author</Badge>
                          )}
                          <span className="text-xs text-gray-500 dark:text-gray-400">{comment.date}</span>
                        </div>

                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                          <Flag className="h-4 w-4 text-gray-500" />
                          <span className="sr-only">Report</span>
                        </Button>
                      </div>

                      <p className="mt-2 text-gray-700 dark:text-gray-300">{comment.content}</p>

                      <div className="mt-3 flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400 h-8 px-3">
                          <Heart className="h-4 w-4 mr-1 text-primary" />
                          {comment.likes}
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 dark:text-gray-400 h-8 px-3"
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
                    <div className="mt-6 pl-14 space-y-6">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="relative">
                          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>

                          <div className="flex items-start gap-3 pl-6">
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

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center flex-wrap gap-2">
                                <span className="font-medium">{reply.name}</span>
                                {reply.isAuthor && (
                                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30 text-xs">
                                    Author
                                  </Badge>
                                )}
                                <span className="text-xs text-gray-500 dark:text-gray-400">{reply.date}</span>
                              </div>

                              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{reply.content}</p>

                              <div className="mt-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-500 dark:text-gray-400 h-7 px-2 text-xs"
                                >
                                  <Heart className="h-3 w-3 mr-1 text-primary" />
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

