"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import the styles for the editor
import { AiOutlineCloudUpload, AiOutlineMobile, AiOutlineLaptop } from 'react-icons/ai';
import { BsPlusCircle } from 'react-icons/bs';
import Head from 'next/head';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function AddBlog({ existingBlog }) {
  const isEditMode = !!existingBlog; // Determine if in edit mode
  const [title, setTitle] = useState(existingBlog ? existingBlog.title : '');
  const [content, setContent] = useState(existingBlog ? existingBlog.content : '');
  const [image, setImage] = useState(existingBlog ? existingBlog.image : null);
  const [category, setCategory] = useState(existingBlog ? existingBlog.category : '');
  const [tags, setTags] = useState(existingBlog ? existingBlog.tags : []);
  const [tagInput, setTagInput] = useState('');
  const [previewMode, setPreviewMode] = useState('laptop'); // 'laptop' or 'mobile'

  // Custom toolbar options
  const modules = {
    toolbar: [
      [{ 'font': [] }, { 'size': [] }],
      [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'font', 'size', 'header', 'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block', 'list', 'bullet', 'color', 'background',
    'align', 'link', 'image'
  ];

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleTagAddition = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleTagRemoval = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, content, image, category, tags });
    // Add logic to save or update the blog post
  };

  return (
    <>
      <Head>
        {/* Meta tags for SEO */}
        <title>{title ? `${title} - Modern Mannerism` : 'Add New Blog - Modern Mannerism'}</title>
        <meta name="description" content={content.substring(0, 160)} /> {/* Content preview for description */}
        <meta name="keywords" content={tags.join(', ')} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={title ? title : 'Add New Blog - Modern Mannerism'} />
        <meta property="og:description" content={content.substring(0, 160)} />
        <meta property="og:image" content={image ? image : '/default-image.jpg'} />
        <meta property="og:url" content={`https://yourwebsite.com/blog/${title}`} />
        <meta property="og:type" content="article" />
        
        {/* Structured Data (JSON-LD) */}
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
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 sm:p-12">
        <div className="max-w-8xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 space-y-8">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">{isEditMode ? 'Edit Blog' : 'Add New Blog'}</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Title:</label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Category:</label>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal-branding">Personal Branding</SelectItem>
                  <SelectItem value="communication-skills">Communication Skills</SelectItem>
                  <SelectItem value="corporate-etiquette">Corporate Etiquette</SelectItem>
                  <SelectItem value="fine-dining-manners">Fine Dining Manners</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Tags:</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Enter a tag"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <Button
                  type="button"
                  onClick={handleTagAddition}
                  className="text-xl text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  <BsPlusCircle />
                </Button>
              </div>
              <div className="flex space-x-2 mt-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-lg"
                  >
                    {tag} <Button onClick={() => handleTagRemoval(tag)} className="ml-1 text-sm font-bold text-red-600">x</Button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Main Image:</label>
              <div className="flex items-center">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-200 dark:bg-gray-700 text-blue rounded-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-[#933469] hover:text-white">
                  <AiOutlineCloudUpload className="text-3xl" />
                  <span className="mt-2 text-base leading-normal">Upload an Image</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              </div>
              {image && <img src={image} alt="Preview" className="mt-4 w-40 rounded-lg shadow-md" />}
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Content:</label>
              {/* <ReactQuill
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                className="bg-white dark:bg-gray-700 dark:text-white"
              /> */}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#933469] hover:bg-[#d664b6] text-white py-3 rounded-lg font-semibold"
            >
              {isEditMode ? 'Update Blog' : 'Submit'}
            </Button>
          </form>

          {/* Preview Section with Mode Toggle */}
          <div className="mt-12 border-t border-gray-200 dark:border-gray-600 pt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Preview:</h2>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setPreviewMode('laptop')}
                  className={`p-2 rounded-lg ${previewMode === 'laptop' ? 'bg-[#933469] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'}`}
                >
                  <AiOutlineLaptop className="text-2xl" />
                </Button>
                <Button
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-2 rounded-lg ${previewMode === 'mobile' ? 'bg-[#933469] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'}`}
                >
                  <AiOutlineMobile className="text-2xl" />
                </Button>
              </div>
            </div>

            <div className={`border border-gray-300 dark:border-gray-600 rounded-lg p-6 ${previewMode === 'mobile' ? 'w-80 mx-auto' : 'w-full'}`}>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h3>
              {category && <span className="block text-sm text-gray-500 dark:text-gray-400 mb-2">Category: {category}</span>}
              <div className="flex flex-wrap space-x-2 mb-4">
                {tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-300">
                    #{tag}
                  </span>
                ))}
              </div>
              {image && <img src={image} alt="Main" className="w-full mb-4 rounded-lg" />}
              <div dangerouslySetInnerHTML={{ __html: content }} className="text-gray-800 dark:text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}