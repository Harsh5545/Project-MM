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
import FontSize from "@tiptap/extension-font-size"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import ListItem from "@tiptap/extension-list-item"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
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
} from "lucide-react"

const fontSizes = [
  "8px",
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "30px",
  "36px",
  "48px",
  "60px",
  "72px",
  "96px",
]

export default function EnhancedEditor({ content, onChange, formData, setFormData }) {
  const [linkUrl, setLinkUrl] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [currentFontSize, setCurrentFontSize] = useState("16px")
  const [previewMode, setPreviewMode] = useState(false)
  const [imageSize, setImageSize] = useState(100)
  const editorRef = useRef(null)

  // Prevent scroll jumping when clicking buttons
  const preventScrollJump = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  // Create a custom extension for bullet list to ensure it works properly
  const CustomBulletList = BulletList.configure({
    HTMLAttributes: {
      class: "bullet-list",
    },
  })

  // Create a custom extension for ordered list to ensure it works properly
  const CustomOrderedList = OrderedList.configure({
    HTMLAttributes: {
      class: "ordered-list",
    },
  })

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false, // Disable the default bulletList to use our custom one
        orderedList: false, // Disable the default orderedList to use our custom one
        paragraph: {
          HTMLAttributes: {
            class: "editor-paragraph",
          },
        },
      }),
      CustomBulletList,
      CustomOrderedList,
      ListItem,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.configure({
        allowBase64: true,
        inline: true,
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
        placeholder: "Write something amazing...",
      }),
      Youtube.configure({
        width: 640,
        height: 480,
        controls: true,
        nocookie: false,
        modestBranding: true,
      }),
      TextStyle,
      Color,
      FontFamily,
      FontSize,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editable: !previewMode,
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  const setLink = () => {
    if (!linkUrl || !editor) return

    // Check if the URL has a protocol, if not add https://
    const url = linkUrl.match(/^https?:\/\//) ? linkUrl : `https://${linkUrl}`

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
    setLinkUrl("")
  }

  const addImage = () => {
    if (!imageUrl || !editor) return
    editor.chain().focus().setImage({ src: imageUrl }).run()
    setImageUrl("")
  }

  const handleImageUploadSuccess = (url) => {
    if (!editor) return
    editor.chain().focus().setImage({ src: url }).run()
  }

  const addYoutubeVideo = () => {
    if (!youtubeUrl || !editor) return

    // Extract YouTube video ID from various URL formats
    let videoId = youtubeUrl

    // Handle full YouTube URLs
    const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i
    const match = youtubeUrl.match(youtubeRegex)

    if (match && match[1]) {
      videoId = match[1]
    }

    editor.chain().focus().setYoutubeVideo({ src: videoId }).run()
    setYoutubeUrl("")
  }

  const setFontSize = (size) => {
    if (!editor) return
    editor.chain().focus().setFontSize(size).run()
    setCurrentFontSize(size)
  }

  const resizeSelectedImage = (size) => {
    if (!editor) return

    // Get the selected node
    const { state } = editor
    const { selection } = state
    const { empty, node } = selection

    // Check if an image is selected
    if (!empty && node && node.type.name === "image") {
      // Update the image attributes with the new size
      editor
        .chain()
        .focus()
        .updateAttributes("image", {
          style: `width: ${size}%; height: auto;`,
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
      <div className="min-h-[400px] border border-gray-200 dark:border-gray-700 rounded-lg p-4">Loading editor...</div>
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
            <div className="flex flex-wrap gap-1 p-2 overflow-x-auto toolbar">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  preventScrollJump(e)
                  editor.chain().focus().toggleBold().run()
                }}
                className={editor.isActive("bold") ? "bg-gray-200 dark:bg-gray-700" : ""}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  preventScrollJump(e)
                  editor.chain().focus().toggleItalic().run()
                }}
                className={editor.isActive("italic") ? "bg-gray-200 dark:bg-gray-700" : ""}
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  preventScrollJump(e)
                  editor.chain().focus().toggleUnderline().run()
                }}
                className={editor.isActive("underline") ? "bg-gray-200 dark:bg-gray-700" : ""}
              >
                <UnderlineIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  preventScrollJump(e)
                  editor.chain().focus().toggleStrike().run()
                }}
                className={editor.isActive("strike") ? "bg-gray-200 dark:bg-gray-700" : ""}
              >
                <Strikethrough className="h-4 w-4" />
              </Button>

              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1 h-8">
                    <Type className="h-4 w-4" />
                    <span className="text-xs">{currentFontSize}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2">
                  <div className="grid grid-cols-2 gap-1">
                    {fontSizes.map((size) => (
                      <Button
                        key={size}
                        variant="ghost"
                        size="sm"
                        className="justify-start text-xs"
                        onClick={(e) => {
                          preventScrollJump(e)
                          setFontSize(size)
                        }}
                      >
                        <span style={{ fontSize: size }}>{size}</span>
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  preventScrollJump(e)
                  editor.chain().focus().setTextAlign("left").run()
                }}
                className={editor.isActive({ textAlign: "left" }) ? "bg-gray-200 dark:bg-gray-700" : ""}
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  preventScrollJump(e)
                  editor.chain().focus().setTextAlign("center").run()
                }}
                className={editor.isActive({ textAlign: "center" }) ? "bg-gray-200 dark:bg-gray-700" : ""}
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  preventScrollJump(e)
                  editor.chain().focus().setTextAlign("right").run()
                }}
                className={editor.isActive({ textAlign: "right" }) ? "bg-gray-200 dark:bg-gray-700" : ""}
              >
                <AlignRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  preventScrollJump(e)
                  editor.chain().focus().setTextAlign("justify").run()
                }}
                className={editor.isActive({ textAlign: "justify" }) ? "bg-gray-200 dark:bg-gray-700" : ""}
              >
                <AlignJustify className="h-4 w-4" />
              </Button>

              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  preventScrollJump(e)
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }}
                className={editor.isActive("heading", { level: 1 }) ? "bg-gray-200 dark:bg-gray-700" : ""}
              >
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  preventScrollJump(e)
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }}
                className={editor.isActive("heading", { level: 2 }) ? "bg-gray-200 dark:bg-gray-700" : ""}
              >
                <Heading2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  preventScrollJump(e)
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }}
                className={editor.isActive("heading", { level: 3 }) ? "bg-gray-200 dark:bg-gray-700" : ""}
              >
                <Heading3 className="h-4 w-4" />
              </Button>

              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

              {/* Bullet List - Fixed */}
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  preventScrollJump(e)
                  editor.chain().focus().toggleBulletList().run()
                }}
                className={editor.isActive("bulletList") ? "bg-gray-200 dark:bg-gray-700" : ""}
              >
                <List className="h-4 w-4" />
              </Button>

              {/* Ordered List - Fixed */}
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  preventScrollJump(e)
                  editor.chain().focus().toggleOrderedList().run()
                }}
                className={editor.isActive("orderedList") ? "bg-gray-200 dark:bg-gray-700" : ""}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  preventScrollJump(e)
                  editor.chain().focus().toggleCodeBlock().run()
                }}
                className={editor.isActive("codeBlock") ? "bg-gray-200 dark:bg-gray-700" : ""}
              >
                <Code className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  preventScrollJump(e)
                  editor.chain().focus().toggleBlockquote().run()
                }}
                className={editor.isActive("blockquote") ? "bg-gray-200 dark:bg-gray-700" : ""}
              >
                <Quote className="h-4 w-4" />
              </Button>

              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={preventScrollJump}>
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-medium">Insert Link</h3>
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
                      <Button
                        onClick={(e) => {
                          preventScrollJump(e)
                          setLink()
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={preventScrollJump}>
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-medium">Insert Image</h3>

                    <div className="flex flex-col gap-2">
                      <h4 className="text-xs font-medium">Upload from computer</h4>
                      <div className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md">
                        <BlogImageUploader
                          formData={formData}
                          setFormData={setFormData}
                          type="image"
                          onSuccess={handleImageUploadSuccess}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h4 className="text-xs font-medium">Or enter image URL</h4>
                      <div className="flex gap-2">
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
                        <Button
                          onClick={(e) => {
                            preventScrollJump(e)
                            addImage()
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h4 className="text-xs font-medium">Image Size</h4>
                      <div className="flex items-center gap-2">
                        <Minimize className="h-4 w-4 text-gray-500" />
                        <Slider
                          defaultValue={[100]}
                          max={200}
                          min={10}
                          step={5}
                          value={[imageSize]}
                          onValueChange={handleImageSizeChange}
                          className="flex-1"
                        />
                        <Maximize className="h-4 w-4 text-gray-500" />
                        <span className="text-xs w-10 text-right">{imageSize}%</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <Button size="sm" onClick={() => handleImageSizeChange([25])}>
                          25%
                        </Button>
                        <Button size="sm" onClick={() => handleImageSizeChange([50])}>
                          50%
                        </Button>
                        <Button size="sm" onClick={() => handleImageSizeChange([75])}>
                          75%
                        </Button>
                        <Button size="sm" onClick={() => handleImageSizeChange([100])}>
                          100%
                        </Button>
                        <Button size="sm" onClick={() => handleImageSizeChange([150])}>
                          150%
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={preventScrollJump}>
                    <YoutubeIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-medium">Insert YouTube Video</h3>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="https://youtube.com/watch?v=dQw4w9WgXcQ"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addYoutubeVideo()
                          }
                        }}
                      />
                      <Button
                        onClick={(e) => {
                          preventScrollJump(e)
                          addYoutubeVideo()
                        }}
                      >
                        Add
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Paste any YouTube video URL or just the video ID</p>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={preventScrollJump}>
                    <Palette className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-medium">Text Color</h3>
                    <div className="grid grid-cols-8 gap-2">
                      {[
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
                      ].map((color) => (
                        <button
                          key={color}
                          className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600"
                          style={{ backgroundColor: color }}
                          onClick={(e) => {
                            preventScrollJump(e)
                            editor.chain().focus().setColor(color).run()
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  preventScrollJump(e)
                  editor.chain().focus().undo().run()
                }}
                disabled={!editor.can().undo()}
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  preventScrollJump(e)
                  editor.chain().focus().redo().run()
                }}
                disabled={!editor.can().redo()}
              >
                <Redo className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="border border-t-0 border-gray-200 dark:border-gray-700 rounded-b-lg">
            <EditorContent
              editor={editor}
              className="min-h-[400px] p-4 focus:outline-none prose dark:prose-invert max-w-none"
            />
          </div>
        </TabsContent>

        <TabsContent value="preview" className="mt-0">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 min-h-[400px] prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
          </div>
        </TabsContent>
      </Tabs>

      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          shouldShow={({ editor, view, state, oldState, from, to }) => {
            // Only show the bubble menu for images
            return editor.isActive("image")
          }}
        >
          <div className="flex items-center gap-1 p-1 rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
            <Button size="sm" variant="ghost" onClick={() => handleImageSizeChange([25])}>
              25%
            </Button>
            <Button size="sm" variant="ghost" onClick={() => handleImageSizeChange([50])}>
              50%
            </Button>
            <Button size="sm" variant="ghost" onClick={() => handleImageSizeChange([75])}>
              75%
            </Button>
            <Button size="sm" variant="ghost" onClick={() => handleImageSizeChange([100])}>
              100%
            </Button>
            <Button size="sm" variant="ghost" onClick={() => handleImageSizeChange([150])}>
              150%
            </Button>
          </div>
        </BubbleMenu>
      )}

      <style jsx global>{`
        .ProseMirror {
          min-height: 400px;
          outline: none;
          line-height: 1.8;
        }
        
        .ProseMirror p {
          margin-bottom: 1rem;
          line-height: 1.8;
        }
        
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
          display: block;
        }
        
        .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.5em;
          margin: 1rem 0;
        }
        
        .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5em;
          margin: 1rem 0;
        }
        
        .ProseMirror li {
          margin-bottom: 0.5em;
          line-height: 1.7;
        }
        
        .ProseMirror blockquote {
          border-left: 3px solid #ddd;
          padding-left: 1em;
          margin-left: 0;
          margin-right: 0;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        
        .ProseMirror iframe {
          max-width: 100%;
          border: none;
          margin: 1rem 0;
        }
        
        .toolbar::-webkit-scrollbar {
          height: 4px;
        }
        
        .toolbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .toolbar::-webkit-scrollbar-thumb {
          background-color: rgba(155, 155, 155, 0.5);
          border-radius: 20px;
        }
        
        .bullet-list {
          list-style-type: disc;
          padding-left: 1.5em;
        }
        
        .ordered-list {
          list-style-type: decimal;
          padding-left: 1.5em;
        }
      `}</style>
    </div>
  )
}
