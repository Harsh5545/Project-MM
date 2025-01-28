"use client"

import React from "react"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Heading4,
  Quote,
  Undo,
  Redo,
  Code,
  ImageIcon,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Paintbrush,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const Toolbar = ({ editor }) => {
  if (!editor) {
    return null
  }

  const uploadImage = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = () => {
      if (input.files?.length) {
        const file = input.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
          editor.chain().focus().setImage({ src: e.target?.result }).run()
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href
    const url = window.prompt("URL", previousUrl)
    if (url === null) {
      return
    }
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-2 flex flex-wrap gap-1 justify-center sm:justify-start items-center border-b border-gray-300 dark:border-gray-600">
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      >
        <Underline className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        <Heading3 className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        <Heading4 className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <span className="font-bold">―</span>
      </Button>
      <Button onClick={uploadImage}>
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button onClick={setLink} className={editor.isActive("link") ? "is-active" : ""}>
        <Link className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
      >
        <AlignRight className="h-4 w-4" />
      </Button>
      <Button onClick={() => editor.chain().focus().undo().run()}>
        <Undo className="h-4 w-4" />
      </Button>
      <Button onClick={() => editor.chain().focus().redo().run()}>
        <Redo className="h-4 w-4" />
      </Button>
      <input
        type="color"
        onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
        value={editor.getAttributes("textStyle").color}
      />
    </div>
  )
}

export default Toolbar

