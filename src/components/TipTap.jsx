"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import UnderlineExtension from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Image from "@tiptap/extension-image"
import { FixedYoutube } from "@/lib/youtubeFix"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
// import Youtube from "@tiptap/extension-youtube"
import Color from "@tiptap/extension-color"
import TextStyle from "@tiptap/extension-text-style"
import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Bold,
  Italic,
  Underline,
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
} from "lucide-react"

export default function TipTapEditor({ content, onChange, previewMode }) {
  const [linkUrl, setLinkUrl] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")

  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: "Write something amazing...",
      }),
      FixedYoutube.configure({
        width: 640,
        height: 480,
        controls: true,
      }),
      TextStyle,
      Color,
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

  const setLink = useCallback(() => {
    if (!linkUrl) return

    // Check if the URL has a protocol, if not add https://
    const url = linkUrl.match(/^https?:\/\//) ? linkUrl : `https://${linkUrl}`

    if (editor) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
      setLinkUrl("")
    }
  }, [editor, linkUrl])

  const addImage = useCallback(() => {
    if (!imageUrl) return

    if (editor) {
      editor.chain().focus().setImage({ src: imageUrl }).run()
      setImageUrl("")
    }
  }, [editor, imageUrl])

  const addYoutubeVideo = useCallback(() => {
    if (!youtubeUrl) return

    if (editor) {
      editor.chain().focus().setYoutubeVideo({ src: youtubeUrl }).run()
      setYoutubeUrl("")
    }
  }, [editor, youtubeUrl])

  if (!editor) {
    return null
  }

  return (
    <div className={`tiptap-editor ${previewMode ? "preview-mode" : ""}`}>
      {!previewMode && (
        <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-gray-200 dark:bg-gray-700" : ""}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-gray-200 dark:bg-gray-700" : ""}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "bg-gray-200 dark:bg-gray-700" : ""}
          >
            <Underline className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "bg-gray-200 dark:bg-gray-700" : ""}
          >
            <Strikethrough className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={editor.isActive({ textAlign: "left" }) ? "bg-gray-200 dark:bg-gray-700" : ""}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={editor.isActive({ textAlign: "center" }) ? "bg-gray-200 dark:bg-gray-700" : ""}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={editor.isActive({ textAlign: "right" }) ? "bg-gray-200 dark:bg-gray-700" : ""}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={editor.isActive({ textAlign: "justify" }) ? "bg-gray-200 dark:bg-gray-700" : ""}
          >
            <AlignJustify className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive("heading", { level: 1 }) ? "bg-gray-200 dark:bg-gray-700" : ""}
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive("heading", { level: 2 }) ? "bg-gray-200 dark:bg-gray-700" : ""}
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive("heading", { level: 3 }) ? "bg-gray-200 dark:bg-gray-700" : ""}
          >
            <Heading3 className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "bg-gray-200 dark:bg-gray-700" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "bg-gray-200 dark:bg-gray-700" : ""}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "bg-gray-200 dark:bg-gray-700" : ""}
          >
            <Code className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "bg-gray-200 dark:bg-gray-700" : ""}
          >
            <Quote className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
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
                  />
                  <Button onClick={setLink}>Add</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Insert Image</h3>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                  <Button onClick={addImage}>Add</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
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
                  />
                  <Button onClick={addYoutubeVideo}>Add</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Palette className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Text Color</h3>
                <div className="grid grid-cols-8 gap-2">
                  {[
                    "#000000",
                    "#ff0000",
                    "#00ff00",
                    "#0000ff",
                    "#ffff00",
                    "#ff00ff",
                    "#00ffff",
                    "#ffffff",
                    "#f44336",
                    "#e91e63",
                    "#9c27b0",
                    "#673ab7",
                    "#3f51b5",
                    "#2196f3",
                    "#03a9f4",
                    "#00bcd4",
                    "#009688",
                    "#4caf50",
                    "#8bc34a",
                    "#cddc39",
                    "#ffeb3b",
                    "#ffc107",
                    "#ff9800",
                    "#ff5722",
                  ].map((color) => (
                    <button
                      key={color}
                      className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600"
                      style={{ backgroundColor: color }}
                      onClick={() => editor.chain().focus().setColor(color).run()}
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
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div
        className={`p-4 min-h-[350px] bg-white dark:bg-gray-900 ${previewMode ? "prose dark:prose-invert max-w-none" : ""}`}
      >
        <EditorContent editor={editor} className="min-h-[350px] outline-none" />
      </div>
    </div>
  )
}
