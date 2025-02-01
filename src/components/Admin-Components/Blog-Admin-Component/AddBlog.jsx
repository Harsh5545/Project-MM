"use client"

import { useState } from "react"
import { AiOutlineCloudUpload, AiOutlineMobile, AiOutlineLaptop } from "react-icons/ai"
import { BsPlusCircle } from "react-icons/bs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useCategories } from "./Admin-Blog-Table/UseCategories"
import Editor from "@/components/Editor"



export default function BlogEditor({ existingBlog, userId }) {
  
  const { toast } = useToast()
  const { categories, loading: categoriesLoading } = useCategories()
  const isEditMode = !!existingBlog
  const [blogData, setBlogData] = useState({
    title: existingBlog?.title || "",
    content: existingBlog?.content || "",
    slug: existingBlog?.slug || "",
    
    authorId: existingBlog?.authorId || userId,
    categoryId: existingBlog?.category || "",
    image: existingBlog?.image || "",
    heroImage: existingBlog?.heroImage || "",
    meta_title: existingBlog?.meta_title || "",
    meta_desc: existingBlog?.meta_desc || "",
    tags: existingBlog?.tags || [],

  })

  const [previewMode, setPreviewMode] = useState("laptop")

  const handleImageChange = (e, imageType) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBlogData((prevData) => ({
          ...prevData,
          [imageType]: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTagAddition = () => {
    if (blogData.tagInput.trim() && !blogData.tags.includes(blogData.tagInput.trim())) {
      setBlogData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, blogData.tagInput.trim()],

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
      content: newContent, // CKEditor gives HTML directly
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/blog/add-blog", {
        method: isEditMode ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      })

      if (!response.ok) throw new Error("Failed to save blog")

      toast({ title: "Success", description: isEditMode ? "Blog updated successfully" : "Blog created successfully" })
    } catch (error) {
      console.error("Error saving blog:", error)
      toast({ title: "Error", description: "Failed to save blog. Please try again.", variant: "destructive" })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          {isEditMode ? "Edit Blog" : "Add New Blog"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title:</label>
            <Input
              type="text"
              value={blogData.title ?? ""}
              onChange={(e) => setBlogData((prevData) => ({ ...prevData, title: e.target.value }))}
              required
              className="w-full p-2 rounded-md"
              placeholder="Enter blog title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">description:</label>
            <Input
              type="text"
              value={blogData.meta_desc ?? ""}
              onChange={(e) => setBlogData((prevData) => ({ ...prevData, meta_desc: e.target.value }))}
              required
              className="w-full p-2 rounded-md"
              placeholder="Enter blog title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">MetaTitle:</label>
            <Input
              type="text"
              value={blogData.meta_title ?? ""}
              onChange={(e) => setBlogData((prevData) => ({ ...prevData, meta_title: e.target.value }))}
              required
              className="w-full p-2 rounded-md"
              placeholder="Enter blog title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug:</label>
            <Input
              type="text"
              value={blogData.slug}
              onChange={(e) => {
                const formattedSlug = e.target.value
                  .toLowerCase()
                  .replace(/\s+/g, "-") // Replace spaces with dashes
                  .replace(/[^a-z0-9-]/g, ""); // Remove special characters except dashes

                setBlogData((prevData) => ({ ...prevData, slug: formattedSlug }));
              }}
              required
              className="w-full p-2 rounded-md"
              placeholder="Enter blog slug"
            />
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category:</label>
            <Select
              value={blogData.category}
              onValueChange={(value) => setBlogData((prevData) => ({ ...prevData, category: value }))}
              disabled={categoriesLoading}
            >
              <SelectTrigger className="w-full p-2 rounded-md">
                <SelectValue placeholder={categoriesLoading ? "Loading categories..." : "Select a Category"} />
              </SelectTrigger>
              <SelectContent>
                {categoriesLoading ? (
                  <SelectItem value="loading">Loading...</SelectItem>
                ) : categories.length > 0 ? (
                  categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.category_name}>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags:</label>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={blogData.tagInput}
                onChange={(e) => setBlogData((prevData) => ({ ...prevData, tagInput: e.target.value }))}
                placeholder="Enter a tag"
                className="flex-grow p-2 rounded-md"
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
              {blogData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
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

          {/* Image Uploads */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Main Image:</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <AiOutlineCloudUpload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "image")}
                />
              </label>
            </div>
            {blogData.image && (
              <img
                src={blogData.image || "/placeholder.svg"}
                alt="Preview"
                className="mt-4 max-w-full h-auto rounded-lg shadow-md"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hero Image:</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <AiOutlineCloudUpload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 1920x1080px)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "heroImage")}
                />
              </label>
            </div>
            {blogData.heroImage && (
              <img
                src={blogData.heroImage || "/placeholder.svg"}
                alt="Hero Preview"
                className="mt-4 max-w-full h-auto rounded-lg shadow-md"
              />
            )}
          </div>

          {/* Tiptap Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content:</label>
            {/* <Tiptap content={blogData.content} onChange={handleContentChange} /> */}
            <Editor content={blogData.content} onChange={handleContentChange} />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            {isEditMode ? "Update Blog" : "Publish Blog"}
          </Button>
        </form>

        {/* Preview Section */}
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Preview:</h2>
            <div className="flex space-x-2">
              <Button
                onClick={() => setPreviewMode("laptop")}
                className={`p-2 rounded-lg ${previewMode === "laptop" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"}`}
              >
                <AiOutlineLaptop className="text-2xl" />
              </Button>
              <Button
                onClick={() => setPreviewMode("mobile")}
                className={`p-2 rounded-lg ${previewMode === "mobile" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"}`}
              >
                <AiOutlineMobile className="text-2xl" />
              </Button>
            </div>
          </div>

          {/* <div
            className={`border border-gray-300 dark:border-gray-600 rounded-lg p-6 ${previewMode === "mobile" ? "max-w-sm mx-auto" : "w-full"}`}
          >
            {blogData.heroImage && (
              <img src={blogData.heroImage || "/placeholder.svg"} alt="Hero" className="w-full mb-4 rounded-lg" />
            )}
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{blogData.title}</h3>
            {blogData.category && (
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 mb-4">
                Category: {blogData.category}
              </span>
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              {blogData.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
            {blogData.image && (
              <img src={blogData.image || "/placeholder.svg"} alt="Main" className="w-full mb-4 rounded-lg" />
            )}
            <div
              dangerouslySetInnerHTML={{ __html: blogData.content }}
              className="prose dark:prose-invert max-w-none"
            />
          </div> */}
          <div className={previewMode === "mobile" ? "max-w-sm mx-auto" : "w-full"}>
            {blogData.heroImage && <img src={blogData.heroImage} alt="Hero" className="w-full mb-4 rounded-lg" />}
            <h3 className="text-2xl font-bold mb-4">{blogData.title}</h3>
            <div className=" ck-content prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: blogData.content }} />
          </div>
        </div>
      </div>
    </div>
  )
}

