"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useCategories } from "./Admin-Blog-Table/UseCategories";
import Editor from "@/components/Editor";
import BlogImageUploader from "./BlogImageUploader";

export default function EditBlog({ existingBlog }) {
  const { toast } = useToast();
  const { categories, loading: categoriesLoading } = useCategories();
  const [blogData, setBlogData] = useState({
    title: existingBlog?.title || "",
    content: existingBlog?.content || "",
    slug: existingBlog?.slug || "",
    published: existingBlog?.published ?? true,
    authorId: existingBlog?.authorId || "",
    categoryId: existingBlog?.categoryId || "",
    image: existingBlog?.image || "",
    og_image: existingBlog?.og_image || "",
    meta_title: existingBlog?.meta_title || "",
    meta_desc: existingBlog?.meta_desc || "",
    tags: existingBlog?.tags || [],
  });

  const [previewMode, setPreviewMode] = useState("laptop");

  const handleImageChange = (e, imageType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogData((prevData) => ({
          ...prevData,
          [imageType]: reader.result,
          ...(imageType === "image" && { og_image: reader.result }),
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagAddition = () => {
    if (blogData.tagInput?.trim() && !blogData.tags.includes(blogData.tagInput.trim())) {
      setBlogData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, blogData.tagInput.trim()],
      }));
    }
  };

  const handleTagRemoval = (tagToRemove) => {
    setBlogData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleContentChange = (newContent) => {
    setBlogData((prevData) => ({ ...prevData, content: newContent }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...blogData, categoryId: Number(blogData.categoryId) };

    try {
      const response = await fetch(`/api/blog/update-blog/${existingBlog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to update blog");

      toast({ title: "Success", description: "Blog updated successfully" });
    } catch (error) {
      console.error("Error updating blog:", error);
      toast({ title: "Error", description: "Failed to update blog", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-full mx-auto bg-white dark:bg-gray-800 p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">Edit Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title:</label>
            <Input
              type="text"
              value={blogData.title}
              onChange={(e) => setBlogData((prev) => ({ ...prev, title: e.target.value }))}
              required
              placeholder="Enter blog title"
            />
          </div>

          {/* Description & Meta Title */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description:</label>
              <Input
                type="text"
                value={blogData.meta_desc}
                onChange={(e) => setBlogData((prev) => ({ ...prev, meta_desc: e.target.value }))}
                required
                placeholder="Enter blog description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meta Title:</label>
              <Input
                type="text"
                value={blogData.meta_title}
                onChange={(e) => setBlogData((prev) => ({ ...prev, meta_title: e.target.value }))}
                required
                placeholder="Enter meta title"
              />
            </div>
          </div>

          {/* Slug Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug:</label>
            <Input
              type="text"
              value={blogData.slug}
              onChange={(e) => setBlogData((prev) => ({ ...prev, slug: e.target.value.replace(/\s+/g, "-").toLowerCase() }))}
              required
              placeholder="Enter blog slug"
            />
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category:</label>
            <Select
              value={blogData.categoryId.toString()}
              onValueChange={(value) => setBlogData((prev) => ({ ...prev, categoryId: Number(value) }))}
              disabled={categoriesLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder={categoriesLoading ? "Loading categories..." : "Select a Category"} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.category_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Image Uploads */}
          <BlogImageUploader formData={blogData} setFormData={setBlogData} type={"image"} />

          {/* Editor for Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content:</label>
            <Editor content={blogData.content} onChange={handleContentChange} />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
            Update Blog
          </Button>
        </form>

        {/* Preview Section */}
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Preview:</h2>
          <div className={previewMode === "mobile" ? "max-w-sm mx-auto" : "w-full"}>
            <h3 className="text-2xl font-bold mb-4">{blogData.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
          </div>
        </div>
      </div>
    </div>
  );
}
