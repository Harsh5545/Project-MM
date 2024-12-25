"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { AiOutlineClockCircle } from "react-icons/ai";

export default function BlogDetailPage({ blog = {}, relatedBlogs = [] }) {
  const [comments, setComments] = useState([
    { id: 1, name: "John Doe", comment: "Amazing content, keep it up!" },
    { id: 2, name: "Jane Smith", comment: "Very informative blog!" },
  ]);
  const defaultBlog = {
    title: "Default Blog Title",
    image: "/default-image.jpg",
    content: "Default content for the blog.",
    author: "Unknown Author",
    date: "Unknown Date",
  };
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: comments.length + 1, name: "Anonymous", comment: newComment },
      ]);
      setNewComment("");
    }
  };
  const validBlog = { ...defaultBlog, ...blog };  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gray-200 dark:bg-gray-800 h-96">
      <Image
          src={validBlog.image}
          alt={validBlog.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold">{validBlog.title}</h1>
            <p className="mt-2 text-sm">
              <AiOutlineClockCircle className="inline mr-2" />
              By {validBlog.author} • {validBlog.date}
            </p>
          </div>
        </div>
      </div>

      {/* Blog Content Section */}
      <div className="max-w-5xl mx-auto py-12 px-6">
        <div className="prose dark:prose-dark lg:prose-lg">
          <h2 className="text-gray-800 dark:text-gray-200">{blog.subtitle}</h2>
          <p>{blog.content}</p>
          {blog.extraContent && <p>{blog.extraContent}</p>}
        </div>
      </div>

      {/* Related Blogs Section */}
      <div className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Related Blogs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedBlogs.map((relatedBlog) => (
            <div
              key={relatedBlog.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={relatedBlog.image || "/default-image.jpg"}
                alt={relatedBlog.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {relatedBlog.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {relatedBlog.description || ""}
                </p>
                <Link href={`/blog/${relatedBlog.id}`}>
                  <Button className="bg-[#933469] hover:bg-[#d664b6] text-white w-full">
                    Read More
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment Section */}
      <div className="max-w-5xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Comments
        </h2>
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg"
            >
              <h3 className="font-semibold text-gray-800 dark:text-white">
                {comment.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {comment.comment}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <textarea
            className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            rows="3"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <Button
            onClick={handleAddComment}
            className="mt-4 bg-[#933469] hover:bg-[#d664b6] text-white w-full"
          >
            Post Comment
          </Button>
        </div>
      </div>
    </div>
  );
}
