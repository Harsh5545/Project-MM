"use client"

import { useState, useEffect } from "react"
import { AiOutlineMobile, AiOutlineLaptop } from "react-icons/ai"
import { BsPlusCircle } from "react-icons/bs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useCategories } from "./Admin-Blog-Table/UseCategories"
import EnhancedEditor from "./enhanced-editor"
import BlogImageUploader from "./BlogImageUploder"

export default function BlogEditor({ existingBlog, userId }) {
  const { toast } = useToast()
  const { categories, loading: categoriesLoading } = useCategories()
  const isEditMode = !!existingBlog
  const [blogData, setBlogData] = useState({
    title: existingBlog?.title || "",
    content: existingBlog?.content || "",
    slug: existingBlog?.slug || "",
    published: existingBlog?.published || true,
    authorId: existingBlog?.authorId || userId,
    categoryId: existingBlog?.categoryId || "",
    image: existingBlog?.image || "",
    og_image: existingBlog?.og_image || "",
    meta_title: existingBlog?.meta_title || "",
    meta_desc: existingBlog?.meta_desc || "",
    tags: existingBlog?.tags || [],
    tagInput: "",
  })

  const [previewMode, setPreviewMode] = useState("laptop")

  // Generate slug from title
  useEffect(() => {
    if (!isEditMode && blogData.title && !blogData.slug) {
      const formattedSlug = blogData.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")

      setBlogData((prev) => ({ ...prev, slug: formattedSlug }))
    }
  }, [blogData.title, isEditMode, blogData.slug])

  const handleTagAddition = () => {
    if (blogData.tagInput?.trim() && !blogData.tags.includes(blogData.tagInput.trim())) {
      setBlogData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, blogData.tagInput.trim()],
        tagInput: "",
      }))
    }
  }

  const handleTagRemoval = (tagToRemove) => {
    setBlogData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleContentChange = (newContent) => {
    setBlogData((prevData) => ({
      ...prevData,
      content: newContent,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!blogData.title) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      })
      return
    }

    if (!blogData.content) {
      toast({
        title: "Error",
        description: "Content is required",
        variant: "destructive",
      })
      return
    }

    if (!blogData.categoryId) {
      toast({
        title: "Error",
        description: "Category is required",
        variant: "destructive",
      })
      return
    }

    const payload = {
      ...blogData,
      authorId: Number(blogData.authorId),
      categoryId: Number(blogData.categoryId),
    }

    try {
      const response = await fetch(isEditMode ? "/api/blog/update-blog" : "/api/blog/add-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error("Failed to save blog")

      toast({
        title: "Success",
        description: isEditMode ? "Blog updated successfully" : "Blog created successfully",
      })
    } catch (error) {
      console.error("Error saving blog:", error)
      toast({
        title: "Error",
        description: "Failed to save blog. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-full mx-auto bg-white dark:bg-gray-800 p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          {isEditMode ? "Edit Blog" : "Add New Blog"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title:</label>
            <Input
              type="text"
              value={blogData.title}
              onChange={(e) => setBlogData((prevData) => ({ ...prevData, title: e.target.value }))}
              required
              className="w-full p-2 rounded-md"
              placeholder="Enter blog title"
            />
          </div>

          {/* Meta Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description:</label>
            <Input
              type="text"
              value={blogData.meta_desc ?? ""}
              onChange={(e) => setBlogData((prevData) => ({ ...prevData, meta_desc: e.target.value }))}
              required
              className="w-full p-2 rounded-md"
              placeholder="Enter blog description"
            />
          </div>

          {/* Meta Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meta Title:</label>
            <Input
              type="text"
              value={blogData.meta_title ?? ""}
              onChange={(e) => setBlogData((prevData) => ({ ...prevData, meta_title: e.target.value }))}
              required
              className="w-full p-2 rounded-md"
              placeholder="Enter meta title"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug:</label>
            <Input
              type="text"
              value={blogData.slug}
              onChange={(e) => {
                const formattedSlug = e.target.value
                  .toLowerCase()
                  .replace(/\s+/g, "-") // Replace spaces with dashes
                  .replace(/[^a-z0-9-]/g, "") // Remove special characters except dashes

                setBlogData((prevData) => ({ ...prevData, slug: formattedSlug }))
              }}
              required
              className="w-full p-2 rounded-md"
              placeholder="Enter blog slug"
            />
          </div>

          <div className="flex w-full gap-2 flex-col md:flex-row">
            {/* Category Select */}
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category:</label>
              <Select
                value={blogData.categoryId ? blogData.categoryId.toString() : ""}
                onValueChange={(value) =>
                  setBlogData((prevData) => ({
                    ...prevData,
                    categoryId: Number(value),
                  }))
                }
                disabled={categoriesLoading}
              >
                <SelectTrigger id="area" className="w-full p-2 rounded-md">
                  <SelectValue placeholder={categoriesLoading ? "Loading categories..." : "Select a Category"} />
                </SelectTrigger>
                <SelectContent>
                  {categoriesLoading ? (
                    <SelectItem value="loading">Loading...</SelectItem>
                  ) : categories.length > 0 ? (
                    categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.category_name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-categories">No categories available</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Tags Input */}
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags:</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={blogData.tagInput || ""}
                  onChange={(e) => setBlogData((prevData) => ({ ...prevData, tagInput: e.target.value }))}
                  placeholder="Enter a tag"
                  className="flex-grow p-2 rounded-md"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleTagAddition()
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleTagAddition}
                  className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  <BsPlusCircle />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {blogData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {typeof tag === "string" ? tag : tag.name}
                    <button
                      type="button"
                      onClick={() => handleTagRemoval(tag)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Image Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Main Image:</label>
              <div className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md">
                <BlogImageUploader formData={blogData} setFormData={setBlogData} type={"image"} />
              </div>
              {blogData.image && (
                <div className="mt-4 relative">
                  <img
                    src={blogData.image || "/placeholder.svg"}
                    alt="Preview"
                    className="max-w-full h-[40vh] rounded-lg shadow-md object-contain"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">OG Image:</label>
              <div className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md">
                <BlogImageUploader formData={blogData} setFormData={setBlogData} type={"og_image"} />
              </div>
              {blogData.og_image && (
                <div className="mt-4 relative">
                  <img
                    src={blogData.og_image || "/placeholder.svg"}
                    alt="OG Preview"
                    className="max-w-full h-[40vh] rounded-lg shadow-md object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content:</label>
            <EnhancedEditor
              content={blogData.content}
              onChange={handleContentChange}
              formData={blogData}
              setFormData={setBlogData}
            />
          </div>

          {/* Preview Controls */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button
                type="button"
                onClick={() => setPreviewMode("laptop")}
                className={`p-2 rounded-lg ${previewMode === "laptop" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"}`}
              >
                <AiOutlineLaptop className="text-2xl" />
              </Button>
              <Button
                type="button"
                onClick={() => setPreviewMode("mobile")}
                className={`p-2 rounded-lg ${previewMode === "mobile" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"}`}
              >
                <AiOutlineMobile className="text-2xl" />
              </Button>
            </div>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              {isEditMode ? "Update Blog" : "Publish Blog"}
            </Button>
          </div>
        </form>

        {/* Preview Section */}
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Preview:</h2>
          </div>
          <div className={previewMode === "mobile" ? "max-w-sm mx-auto" : "w-full"}>
            {blogData.image && (
              <img src={blogData.image || "/placeholder.svg"} alt="Hero" className="w-full mb-4 rounded-lg" />
            )}
            <h3 className="text-2xl font-bold mb-4">{blogData.title}</h3>
            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: blogData.content }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
