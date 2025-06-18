"use client"

import { useState, useEffect, useRef } from "react"
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import Youtube from "@tiptap/extension-youtube"
import Color from "@tiptap/extension-color"
import TextStyle from "@tiptap/extension-text-style"
import FontFamily from "@tiptap/extension-font-family"
import { Extension } from "@tiptap/core"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import BlogImageUploader from "./BlogImageUploder"
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  LinkIcon,
  Code,
  Quote,
  Undo,
  Redo,
  YoutubeIcon,
  Palette,
  Type,
  Maximize,
  Minimize,
  ChevronDown,
} from "lucide-react"

// Custom FontSize extension that actually works
const FontSize = Extension.create({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize?.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {}
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize }).run()
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run()
        },
    }
  },
})

const fontSizes = [
  { label: "8px", value: "8px" },
  { label: "10px", value: "10px" },
  { label: "12px", value: "12px" },
  { label: "14px", value: "14px" },
  { label: "16px", value: "16px" },
  { label: "18px", value: "18px" },
  { label: "20px", value: "20px" },
  { label: "24px", value: "24px" },
  { label: "28px", value: "28px" },
  { label: "32px", value: "32px" },
  { label: "36px", value: "36px" },
  { label: "48px", value: "48px" },
  { label: "60px", value: "60px" },
  { label: "72px", value: "72px" },
]

const colorPalette = [
  "#000000",
  "#434343",
  "#666666",
  "#999999",
  "#b7b7b7",
  "#cccccc",
  "#d9d9d9",
  "#efefef",
  "#f3f3f3",
  "#ffffff",
  "#980000",
  "#ff0000",
  "#ff9900",
  "#ffff00",
  "#00ff00",
  "#00ffff",
  "#4a86e8",
  "#0000ff",
  "#9900ff",
  "#ff00ff",
  "#e6b8af",
  "#f4cccc",
  "#fce5cd",
  "#fff2cc",
  "#d9ead3",
  "#d0e0e3",
  "#c9daf8",
  "#cfe2f3",
  "#d9d2e9",
  "#ead1dc",
  "#dd7e6b",
  "#ea9999",
  "#f9cb9c",
  "#ffe599",
  "#b6d7a8",
  "#a2c4c9",
  "#a4c2f4",
  "#9fc5e8",
  "#b4a7d6",
  "#d5a6bd",
]

export default function EnhancedEditor({ content, onChange, formData, setFormData }) {
  const [linkUrl, setLinkUrl] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [currentFontSize, setCurrentFontSize] = useState("16px")
  const [previewMode, setPreviewMode] = useState(false)
  const [imageSize, setImageSize] = useState(100)
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  const [isImagePopoverOpen, setIsImagePopoverOpen] = useState(false)
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false)
  const [isYoutubePopoverOpen, setIsYoutubePopoverOpen] = useState(false)
  const [isFontSizeOpen, setIsFontSizeOpen] = useState(false)
  const editorRef = useRef(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: "editor-paragraph",
          },
        },
        heading: {
          HTMLAttributes: {
            class: "editor-heading",
          },
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.configure({
        allowBase64: true,
        inline: false,
        HTMLAttributes: {
          class: "editor-image",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
          class: "editor-link",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing your amazing content...",
      }),
      Youtube.configure({
        width: 640,
        height: 480,
        controls: true,
        nocookie: false,
        modestBranding: true,
        HTMLAttributes: {
          class: "editor-youtube",
        },
      }),
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
      FontFamily,
      FontSize,
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)
    },
    editable: !previewMode,
    immediatelyRender: false,
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "")
    }
  }, [content, editor])

  const setLink = () => {
    if (!linkUrl || !editor) return

    const url = linkUrl.match(/^https?:\/\//) ? linkUrl : `https://${linkUrl}`
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
    setLinkUrl("")
    setIsLinkPopoverOpen(false)
  }

  const addImage = () => {
    if (!imageUrl || !editor) return
    editor.chain().focus().setImage({ src: imageUrl }).run()
    setImageUrl("")
    setIsImagePopoverOpen(false)
  }

  const handleImageUploadSuccess = (url) => {
    if (!editor) return
    editor.chain().focus().setImage({ src: url }).run()
    setIsImagePopoverOpen(false)
  }

  const addYoutubeVideo = () => {
    if (!youtubeUrl || !editor) return

    let videoId = youtubeUrl
    const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i
    const match = youtubeUrl.match(youtubeRegex)

    if (match && match[1]) {
      videoId = match[1]
    }

    editor.chain().focus().setYoutubeVideo({ src: videoId }).run()
    setYoutubeUrl("")
    setIsYoutubePopoverOpen(false)
  }

  const setFontSize = (size) => {
    if (!editor) return
    editor.chain().focus().setFontSize(size).run()
    setCurrentFontSize(size)
    setIsFontSizeOpen(false)
  }

  const setTextColor = (color) => {
    if (!editor) return
    editor.chain().focus().setColor(color).run()
    setIsColorPickerOpen(false)
  }

  const resizeSelectedImage = (size) => {
    if (!editor) return

    const { state } = editor
    const { selection } = state
    const { empty, node } = selection

    if (!empty && node && node.type.name === "image") {
      editor
        .chain()
        .focus()
        .updateAttributes("image", {
          style: `width: ${size}%; height: auto; display: block; margin: 0.75rem auto;`,
        })
        .run()
    }
  }

  const handleImageSizeChange = (value) => {
    setImageSize(value[0])
    resizeSelectedImage(value[0])
  }

  if (!editor) {
    return (
      <div className="min-h-[400px] border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center justify-center">
        <div className="text-gray-500">Loading editor...</div>
      </div>
    )
  }

  return (
    <div className="enhanced-editor w-full" ref={editorRef}>
      <Tabs defaultValue="edit" className="w-full">
        <div className="flex justify-between items-center mb-2">
          <TabsList>
            <TabsTrigger value="edit" onClick={() => setPreviewMode(false)}>
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" onClick={() => setPreviewMode(true)}>
              Preview
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="edit" className="mt-0">
          <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-t-lg">
            <div className="flex flex-wrap gap-1 p-3 overflow-x-auto toolbar border-b border-gray-100 dark:border-gray-800">
              {/* Basic formatting */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`h-8 w-8 p-0 ${editor.isActive("bold") ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : ""}`}
                  type="button"
                >
                  <Bold className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`h-8 w-8 p-0 ${editor.isActive("italic") ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : ""}`}
                  type="button"
                >
                  <Italic className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={`h-8 w-8 p-0 ${editor.isActive("underline") ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : ""}`}
                  type="button"
                >
                  <UnderlineIcon className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  className={`h-8 w-8 p-0 ${editor.isActive("strike") ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : ""}`}
                  type="button"
                >
                  <Strikethrough className="h-4 w-4" />
                </Button>
              </div>

              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />

              {/* Font Size with better UI */}
              <Popover open={isFontSizeOpen} onOpenChange={setIsFontSizeOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 px-3 gap-1 min-w-[80px]" type="button">
                    <Type className="h-3 w-3" />
                    <span className="text-xs font-medium">{currentFontSize}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2" align="start">
                  <ScrollArea className="h-64">
                    <div className="grid grid-cols-2 gap-1">
                      {fontSizes.map((size) => (
                        <Button
                          key={size.value}
                          variant="ghost"
                          size="sm"
                          className="justify-start h-10 px-3"
                          onClick={() => setFontSize(size.value)}
                          type="button"
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="text-sm">{size.label}</span>
                            <span
                              style={{ fontSize: Math.min(Number.parseInt(size.value), 20) + "px" }}
                              className="font-bold"
                            >
                              A
                            </span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>

              {/* Color Picker */}
              <Popover open={isColorPickerOpen} onOpenChange={setIsColorPickerOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0" type="button">
                    <Palette className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-4">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Text Color</h4>
                    <div className="grid grid-cols-10 gap-2">
                      {colorPalette.map((color) => (
                        <button
                          key={color}
                          className="w-6 h-6 rounded border-2 border-gray-200 dark:border-gray-600 hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => setTextColor(color)}
                          type="button"
                          title={color}
                        />
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        editor.chain().focus().unsetColor().run()
                        setIsColorPickerOpen(false)
                      }}
                      className="w-full"
                      type="button"
                    >
                      Remove Color
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />

              {/* Text Alignment */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().setTextAlign("left").run()}
                  className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: "left" }) ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : ""}`}
                  type="button"
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().setTextAlign("center").run()}
                  className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: "center" }) ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : ""}`}
                  type="button"
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().setTextAlign("right").run()}
                  className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: "right" }) ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : ""}`}
                  type="button"
                >
                  <AlignRight className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                  className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: "justify" }) ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : ""}`}
                  type="button"
                >
                  <AlignJustify className="h-4 w-4" />
                </Button>
              </div>

              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />

              {/* Headings */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={`h-8 w-8 p-0 ${editor.isActive("heading", { level: 1 }) ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : ""}`}
                  type="button"
                >
                  <Heading1 className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={`h-8 w-8 p-0 ${editor.isActive("heading", { level: 2 }) ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : ""}`}
                  type="button"
                >
                  <Heading2 className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                  className={`h-8 w-8 p-0 ${editor.isActive("heading", { level: 3 }) ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : ""}`}
                  type="button"
                >
                  <Heading3 className="h-4 w-4" />
                </Button>
              </div>

              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />

              {/* Lists */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={`h-8 w-8 p-0 ${editor.isActive("bulletList") ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : ""}`}
                  type="button"
                >
                  <List className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  className={`h-8 w-8 p-0 ${editor.isActive("orderedList") ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : ""}`}
                  type="button"
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
              </div>

              {/* Code and Quote */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  className={`h-8 w-8 p-0 ${editor.isActive("codeBlock") ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : ""}`}
                  type="button"
                >
                  <Code className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                  className={`h-8 w-8 p-0 ${editor.isActive("blockquote") ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : ""}`}
                  type="button"
                >
                  <Quote className="h-4 w-4" />
                </Button>
              </div>

              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />

              {/* Media */}
              <div className="flex items-center gap-1">
                {/* Link */}
                <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" type="button">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Insert Link</h4>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          placeholder="https://example.com"
                          value={linkUrl}
                          onChange={(e) => setLinkUrl(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              setLink()
                            }
                          }}
                        />
                        <Button onClick={setLink} type="button" size="sm">
                          Add
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Image */}
                <Popover open={isImagePopoverOpen} onOpenChange={setIsImagePopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" type="button">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-96">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Insert Image</h4>

                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Upload Image</label>
                          <div className="mt-1">
                            <BlogImageUploader
                              formData={formData}
                              setFormData={setFormData}
                              type="content-image"
                              onSuccess={handleImageUploadSuccess}
                            />
                          </div>
                        </div>

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200 dark:border-gray-700" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">Or</span>
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Image URL</label>
                          <div className="flex gap-2 mt-1">
                            <Input
                              type="text"
                              placeholder="https://example.com/image.jpg"
                              value={imageUrl}
                              onChange={(e) => setImageUrl(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault()
                                  addImage()
                                }
                              }}
                            />
                            <Button onClick={addImage} type="button" size="sm">
                              Add
                            </Button>
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Image Size</label>
                          <div className="flex items-center gap-3 mt-2">
                            <Minimize className="h-4 w-4 text-gray-400" />
                            <Slider
                              value={[imageSize]}
                              onValueChange={handleImageSizeChange}
                              max={200}
                              min={10}
                              step={5}
                              className="flex-1"
                            />
                            <Maximize className="h-4 w-4 text-gray-400" />
                            <span className="text-xs font-medium w-12 text-right">{imageSize}%</span>
                          </div>
                          <div className="flex gap-1 mt-2">
                            {[25, 50, 75, 100, 150].map((size) => (
                              <Button
                                key={size}
                                variant="outline"
                                size="sm"
                                onClick={() => handleImageSizeChange([size])}
                                className="text-xs px-2 py-1 h-6"
                                type="button"
                              >
                                {size}%
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* YouTube */}
                <Popover open={isYoutubePopoverOpen} onOpenChange={setIsYoutubePopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" type="button">
                      <YoutubeIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Insert YouTube Video</h4>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          placeholder="https://youtube.com/watch?v=..."
                          value={youtubeUrl}
                          onChange={(e) => setYoutubeUrl(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addYoutubeVideo()
                            }
                          }}
                        />
                        <Button onClick={addYoutubeVideo} type="button" size="sm">
                          Add
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">Paste any YouTube video URL</p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />

              {/* Undo/Redo */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().undo()}
                  className="h-8 w-8 p-0"
                  type="button"
                >
                  <Undo className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().redo()}
                  className="h-8 w-8 p-0"
                  type="button"
                >
                  <Redo className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border border-t-0 border-gray-200 dark:border-gray-700 rounded-b-lg">
            <EditorContent
              editor={editor}
              className="min-h-[500px] p-6 focus:outline-none prose dark:prose-invert max-w-none editor-content"
            />
          </div>
        </TabsContent>

        <TabsContent value="preview" className="mt-0">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 min-h-[500px] prose dark:prose-invert max-w-none preview-content">
            <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
          </div>
        </TabsContent>
      </Tabs>

      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          shouldShow={({ editor }) => {
            return editor.isActive("image")
          }}
        >
          <div className="flex items-center gap-1 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 mr-2">Size:</span>
            {[25, 50, 75, 100, 150].map((size) => (
              <Button
                key={size}
                size="sm"
                variant="ghost"
                onClick={() => handleImageSizeChange([size])}
                className="text-xs px-2 py-1 h-6"
                type="button"
              >
                {size}%
              </Button>
            ))}
          </div>
        </BubbleMenu>
      )}

      <style jsx global>{`
        .enhanced-editor .ProseMirror {
          min-height: 500px;
          outline: none;
          line-height: 1.6;
          font-size: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .enhanced-editor .ProseMirror p {
          margin-bottom: 0.75rem;
          line-height: 1.6;
          min-height: 1.2em;
        }
        
        .enhanced-editor .ProseMirror p:last-child {
          margin-bottom: 0;
        }
        
        .enhanced-editor .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
          font-style: italic;
        }
        
        .enhanced-editor .ProseMirror img {
          max-width: 100%;
          height: auto;
          margin: 0.75rem auto;
          display: block;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .enhanced-editor .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.25em;
          margin: 0.75rem 0;
        }
        
        .enhanced-editor .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.25em;
          margin: 0.75rem 0;
        }
        
        .enhanced-editor .ProseMirror li {
          margin-bottom: 0.25rem;
          line-height: 1.6;
        }
        
        .enhanced-editor .ProseMirror blockquote {
          border-left: 3px solid #3b82f6;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          background-color: rgba(59, 130, 246, 0.05);
          padding: 0.75rem 1rem;
          border-radius: 0 6px 6px 0;
        }
        
        .enhanced-editor .ProseMirror pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 6px;
          overflow-x: auto;
          margin: 1rem 0;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 14px;
        }
        
        .enhanced-editor .ProseMirror code {
          background-color: #f3f4f6;
          color: #374151;
          padding: 0.125rem 0.25rem;
          border-radius: 3px;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.875em;
        }
        
        .enhanced-editor .ProseMirror iframe {
          max-width: 100%;
          border: none;
          margin: 1rem auto;
          display: block;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .enhanced-editor .ProseMirror h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 1.5rem 0 1rem 0;
          line-height: 1.2;
        }
        
        .enhanced-editor .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1.25rem 0 0.75rem 0;
          line-height: 1.3;
        }
        
        .enhanced-editor .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.4;
        }
        
        .enhanced-editor .ProseMirror a {
          color: #3b82f6;
          text-decoration: underline;
          font-weight: 500;
        }
        
        .enhanced-editor .ProseMirror a:hover {
          color: #2563eb;
        }
        
        .enhanced-editor .toolbar::-webkit-scrollbar {
          height: 4px;
        }
        
        .enhanced-editor .toolbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .enhanced-editor .toolbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 2px;
        }
        
        .enhanced-editor .preview-content {
          line-height: 1.6;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .enhanced-editor .preview-content p {
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }
        
        .enhanced-editor .preview-content img {
          max-width: 100%;
          height: auto;
          margin: 0.75rem auto;
          display: block;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .enhanced-editor .preview-content ul {
          list-style-type: disc;
          padding-left: 1.25em;
          margin: 0.75rem 0;
        }
        
        .enhanced-editor .preview-content ol {
          list-style-type: decimal;
          padding-left: 1.25em;
          margin: 0.75rem 0;
        }
        
        .enhanced-editor .preview-content li {
          margin-bottom: 0.25rem;
          line-height: 1.6;
        }
        
        .enhanced-editor .preview-content blockquote {
          border-left: 3px solid #3b82f6;
          padding: 0.75rem 1rem;
          margin: 1rem 0;
          font-style: italic;
          background-color: rgba(59, 130, 246, 0.05);
          border-radius: 0 6px 6px 0;
        }
        
        .enhanced-editor .preview-content iframe {
          max-width: 100%;
          border: none;
          margin: 1rem auto;
          display: block;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  )
}
