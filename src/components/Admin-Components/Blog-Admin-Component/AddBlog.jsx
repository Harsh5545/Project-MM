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
import BlogContentRenderer from "@/components/Blog-Component/Blog-Landing-Page/BlogContentRenderer"

export default function AddBlog({ existingBlog, userId }) {
  const { toast } = useToast()
  const { categories, loading: categoriesLoading } = useCategories()
  const isEditMode = !!existingBlog
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    setIsSubmitting(true)

    // Validation
    if (!blogData.title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    if (!blogData.content.trim()) {
      toast({
        title: "Error",
        description: "Content is required",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    if (!blogData.categoryId) {
      toast({
        title: "Error",
        description: "Category is required",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    if (!blogData.meta_desc?.trim()) {
      toast({
        title: "Error",
        description: "Description is required",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    const payload = {
      ...blogData,
      authorId: Number(blogData.authorId),
      categoryId: Number(blogData.categoryId),
      title: blogData.title.trim(),
      meta_desc: blogData.meta_desc.trim(),
      meta_title: blogData.meta_title?.trim() || blogData.title.trim(),
    }

    try {
      const response = await fetch(isEditMode ? "/api/blog/update-blog" : "/api/blog/add-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Failed to save blog")
      }

      toast({
        title: "Success",
        description: isEditMode ? "Blog updated successfully" : "Blog created successfully",
      })

      // Optionally redirect or reset form
      if (!isEditMode) {
        // Reset form for new blog
        setBlogData({
          title: "",
          content: "",
          slug: "",
          published: true,
          authorId: userId,
          categoryId: "",
          image: "",
          og_image: "",
          meta_title: "",
          meta_desc: "",
          tags: [],
          tagInput: "",
        })
      }
    } catch (error) {
      console.error("Error saving blog:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to save blog. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
            {isEditMode ? "Edit Blog" : "Create New Blog"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
            {isEditMode ? "Update your blog post" : "Share your thoughts with the world"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={blogData.title}
              onChange={(e) => setBlogData((prevData) => ({ ...prevData, title: e.target.value }))}
              required
              className="w-full"
              placeholder="Enter an engaging blog title"
            />
          </div>

          {/* Meta Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={blogData.meta_desc ?? ""}
              onChange={(e) => setBlogData((prevData) => ({ ...prevData, meta_desc: e.target.value }))}
              required
              className="w-full"
              placeholder="Brief description for SEO and social sharing"
              maxLength={160}
            />
            <p className="text-xs text-gray-500">{blogData.meta_desc?.length || 0}/160 characters</p>
          </div>

          {/* Meta Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Meta Title</label>
            <Input
              type="text"
              value={blogData.meta_title ?? ""}
              onChange={(e) => setBlogData((prevData) => ({ ...prevData, meta_title: e.target.value }))}
              className="w-full"
              placeholder="SEO title (defaults to blog title if empty)"
              maxLength={60}
            />
            <p className="text-xs text-gray-500">{blogData.meta_title?.length || 0}/60 characters</p>
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              URL Slug <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={blogData.slug}
              onChange={(e) => {
                const formattedSlug = e.target.value
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "")

                setBlogData((prevData) => ({ ...prevData, slug: formattedSlug }))
              }}
              required
              className="w-full"
              placeholder="url-friendly-slug"
            />
            <p className="text-xs text-gray-500">This will be your blog URL: /blogs/{blogData.slug}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Select */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category <span className="text-red-500">*</span>
              </label>
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
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={categoriesLoading ? "Loading categories..." : "Select a Category"} />
                </SelectTrigger>
                <SelectContent>
                  {categoriesLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading...
                    </SelectItem>
                  ) : categories.length > 0 ? (
                    categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.category_name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-categories" disabled>
                      No categories available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Tags Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={blogData.tagInput || ""}
                  onChange={(e) => setBlogData((prevData) => ({ ...prevData, tagInput: e.target.value }))}
                  placeholder="Enter a tag"
                  className="flex-grow"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleTagAddition()
                    }
                  }}
                />
                <Button type="button" onClick={handleTagAddition} variant="outline" size="icon">
                  <BsPlusCircle className="h-4 w-4" />
                </Button>
              </div>
              {blogData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {blogData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {typeof tag === "string" ? tag : tag.name}
                      <button
                        type="button"
                        onClick={() => handleTagRemoval(tag)}
                        className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Image Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Featured Image</label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                <BlogImageUploader formData={blogData} setFormData={setBlogData} type="image" />
              </div>
              {blogData.image && (
                <div className="mt-4">
                  <img
                    src={blogData.image || "/placeholder.svg"}
                    alt="Featured image preview"
                    className="max-w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Social Media Image (OG Image)
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                <BlogImageUploader formData={blogData} setFormData={setBlogData} type="og_image" />
              </div>
              {blogData.og_image && (
                <div className="mt-4">
                  <img
                    src={blogData.og_image || "/placeholder.svg"}
                    alt="OG image preview"
                    className="max-w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Editor */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Content <span className="text-red-500">*</span>
            </label>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <EnhancedEditor
                content={blogData.content}
                onChange={handleContentChange}
                formData={blogData}
                setFormData={setBlogData}
              />
            </div>
          </div>

          {/* Preview Controls and Submit */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Preview:</span>
              <Button
                type="button"
                variant={previewMode === "laptop" ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewMode("laptop")}
                className="flex items-center gap-2"
              >
                <AiOutlineLaptop className="h-4 w-4" />
                Desktop
              </Button>
              <Button
                type="button"
                variant={previewMode === "mobile" ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewMode("mobile")}
                className="flex items-center gap-2"
              >
                <AiOutlineMobile className="h-4 w-4" />
                Mobile
              </Button>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {isEditMode ? "Updating..." : "Publishing..."}
                </div>
              ) : isEditMode ? (
                "Update Blog"
              ) : (
                "Publish Blog"
              )}
            </Button>
          </div>
        </form>

        {/* Live Preview Section */}
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Live Preview</h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {previewMode === "mobile" ? "Mobile View" : "Desktop View"}
            </div>
          </div>

          <div
            className={`mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ${
              previewMode === "mobile" ? "max-w-sm" : "w-full"
            }`}
          >
            {/* Preview Header */}
            {blogData.image && (
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <img
                  src={blogData.image || "/placeholder.svg"}
                  alt="Featured image"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6">
              {/* Preview Title */}
              {blogData.title && (
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {blogData.title}
                </h1>
              )}

              {/* Preview Meta */}
              {blogData.meta_desc && (
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">{blogData.meta_desc}</p>
              )}

              {/* Preview Tags */}
              {blogData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {blogData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      #{typeof tag === "string" ? tag : tag.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Preview Content */}
              <div className="prose dark:prose-invert max-w-none">
                <BlogContentRenderer content={blogData.content} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
