'use client'

import { useState, useEffect } from 'react'
import { AiOutlineCloudUpload, AiOutlineMobile, AiOutlineLaptop } from 'react-icons/ai'
import { BsPlusCircle } from 'react-icons/bs'
import Head from 'next/head'
import { v4 as uuidv4 } from 'uuid'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Tiptap from '@/components/TipTap'
import { useToast } from "@/hooks/use-toast"
import { useCategories } from './Admin-Blog-Table/UseCategories'
export default function AddBlog({ existingBlog }) {
  const { toast } = useToast()
  const { categories, loading: categoriesLoading } = useCategories()
  const isEditMode = !!existingBlog
  const [title, setTitle] = useState(existingBlog ? existingBlog.title : '')
  const [content, setContent] = useState(existingBlog ? existingBlog.content : '')
  const [image, setImage] = useState(existingBlog ? existingBlog.image : null)
  const [category, setCategory] = useState(existingBlog ? existingBlog.category : '')
  const [tags, setTags] = useState(existingBlog ? existingBlog.tags : [])
  const [tagInput, setTagInput] = useState('')
  const [previewMode, setPreviewMode] = useState('laptop')

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTagAddition = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleTagRemoval = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleContentChange = (newContent) => {
    setContent(newContent)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const blogData = {
      id: isEditMode ? existingBlog.id : uuidv4(),
      title,
      content,
      image,
      category,
      tags
    }

    try {
      const response = await fetch('/api/blog/save', {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      })

      if (!response.ok) {
        throw new Error('Failed to save blog')
      }

      toast({
        title: "Success",
        description: isEditMode ? "Blog updated successfully" : "Blog created successfully",
      })
      // Redirect or clear form here
    } catch (error) {
      console.error('Error saving blog:', error)
      toast({
        title: "Error",
        description: "Failed to save blog. Please try again.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    console.log('Categories:', categories);
  }, [categories]);

  return (
    <>
      <Head>
        <title>{title ? `${title} - Modern Mannerism` : 'Add New Blog - Modern Mannerism'}</title>
        <meta name="description" content={content.substring(0, 160)} />
        <meta name="keywords" content={tags.join(', ')} />
        
        <meta property="og:title" content={title ? title : 'Add New Blog - Modern Mannerism'} />
        <meta property="og:description" content={content.substring(0, 160)} />
        <meta property="og:image" content={image ? image : '/default-image.jpg'} />
        <meta property="og:url" content={`https://yourwebsite.com/blog/${title}`} />
        <meta property="og:type" content="article" />
        
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": "${title}",
              "description": "${content.substring(0, 160)}",
              "author": {
                "@type": "Person",
                "name": "Manasi"
              },
              "image": "${image ? image : '/default-image.jpg'}",
              "datePublished": "${new Date().toISOString()}"
            }
          `}
        </script>
      </Head>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 space-y-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
            {isEditMode ? 'Edit Blog' : 'Add New Blog'}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title:</label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-2 rounded-md"
                placeholder="Enter blog title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category:</label>
              <Select
                value={category}
                onValueChange={setCategory}
                disabled={categoriesLoading}
              >
                <SelectTrigger className="w-full p-2 rounded-md">
                  <SelectValue placeholder={categoriesLoading ? "Loading categories..." : "Select a Category"} />
                </SelectTrigger>
                <SelectContent>
                  {categoriesLoading ? (
                    <SelectItem value={"" || 'defaultValue'}>Loading...</SelectItem>
                  ) : categories.length > 0 ? (
                    categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.category_name}>
                        {cat.category_name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="">No categories available</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags:</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
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
                {tags.map(tag => (
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

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Main Image:</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <AiOutlineCloudUpload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              </div>
              {image && <img src={image} alt="Preview" className="mt-4 max-w-full h-auto rounded-lg shadow-md" />}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content:</label>
              <Tiptap content={content} onChange={handleContentChange} />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              {isEditMode ? 'Update Blog' : 'Publish Blog'}
            </Button>
          </form>

          {/* Preview Section with Mode Toggle */}
          <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Preview:</h2>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setPreviewMode('laptop')}
                  className={`p-2 rounded-lg ${previewMode === 'laptop' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'}`}
                >
                  <AiOutlineLaptop className="text-2xl" />
                </Button>
                <Button
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-2 rounded-lg ${previewMode === 'mobile' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'}`}
                >
                  <AiOutlineMobile className="text-2xl" />
                </Button>
              </div>
            </div>

            <div className={`border border-gray-300 dark:border-gray-600 rounded-lg p-6 ${previewMode === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'}`}>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{title}</h3>
              {category && <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 mb-4">Category: {category}</span>}
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
              {image && <img src={image} alt="Main" className="w-full mb-4 rounded-lg" />}
              <div dangerouslySetInnerHTML={{ __html: content }} className="prose dark:prose-invert max-w-none" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

