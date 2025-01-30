"use client"

import React from "react"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Code,
  ImageIcon,
  LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  CheckSquare,
  Table,
  Youtube,
  Superscript,
  Subscript,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Toolbar = ({ editor }) => {
  if (!editor) {
    return null
  }

  const uploadImage = (e) => {
    e.preventDefault()
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

  const setLink = (e) => {
    e.preventDefault()
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

  const addYoutubeVideo = (e) => {
    e.preventDefault()
    const url = prompt("Enter YouTube URL")
    if (url) {
      editor.commands.setYoutubeVideo({ src: url })
    }
  }

  const setImageAlignment = (alignment) => {
    editor.chain().focus().setImage({ align: alignment }).run()
  }

  const ToolbarButton = ({ onClick, isActive, disabled, children }) => (
    <Button
      type="button"
      onClick={onClick}
      className={`p-2 ${isActive ? "bg-gray-200 dark:bg-gray-700" : "bg-transparent"} hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      variant="ghost"
      disabled={disabled}
    >
      {children}
    </Button>
  )

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-2 flex flex-wrap gap-1 justify-center sm:justify-start items-center border-b border-gray-300 dark:border-gray-600">
      <Select
        onValueChange={(value) => console.log(editor.commands.setFontSize(value))}
        value={editor.getAttributes("textStyle").fontSize}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Font size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="12">12px</SelectItem>
          <SelectItem value="14">14px</SelectItem>
          <SelectItem value="16">16px (Default)</SelectItem>
          <SelectItem value="18">18px</SelectItem>
          <SelectItem value="20">20px</SelectItem>
          <SelectItem value="24">24px</SelectItem>
          <SelectItem value="30">30px</SelectItem>
          <SelectItem value="36">36px</SelectItem>
          <SelectItem value="48">48px</SelectItem>
          <SelectItem value="60">60px</SelectItem>
          <SelectItem value="72">72px</SelectItem>
        </SelectContent>
      </Select>
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")}>
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")}>
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
      >
        <Underline className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive("strike")}>
        <Strikethrough className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive("code")}>
        <Code className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
      >
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
      >
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        isActive={editor.isActive("taskList")}
      >
        <CheckSquare className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
      >
        <Quote className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <span className="font-bold">―</span>
      </ToolbarButton>
      <ToolbarButton onClick={uploadImage}>
        <ImageIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => setImageAlignment("left")}
        isActive={editor.isActive("image", { align: "left" })}
        disabled={!editor.isActive("image")}
      >
        <AlignLeft className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => setImageAlignment("center")}
        isActive={editor.isActive("image", { align: "center" })}
        disabled={!editor.isActive("image")}
      >
        <AlignCenter className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => setImageAlignment("right")}
        isActive={editor.isActive("image", { align: "right" })}
        disabled={!editor.isActive("image")}
      >
        <AlignRight className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={setLink} isActive={editor.isActive("link")}>
        <LinkIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        isActive={editor.isActive({ textAlign: "left" })}
      >
        <AlignLeft className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        isActive={editor.isActive({ textAlign: "center" })}
      >
        <AlignCenter className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        isActive={editor.isActive({ textAlign: "right" })}
      >
        <AlignRight className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        isActive={editor.isActive({ textAlign: "justify" })}
      >
        <AlignJustify className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        isActive={editor.isActive("highlight")}
      >
        <Highlighter className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
      >
        <Table className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={addYoutubeVideo}>
        <Youtube className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        isActive={editor.isActive("superscript")}
      >
        <Superscript className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        isActive={editor.isActive("subscript")}
      >
        <Subscript className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
        <Undo className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
        <Redo className="h-4 w-4" />
      </ToolbarButton>
      <Select
        onValueChange={(value) => editor.chain().focus().setFontFamily(value).run()}
        value={editor.getAttributes("textStyle").fontFamily}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Font family" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Inter">Inter</SelectItem>
          <SelectItem value="Comic Sans MS, Comic Sans">Comic Sans</SelectItem>
          <SelectItem value="serif">Serif</SelectItem>
          <SelectItem value="monospace">Monospace</SelectItem>
          <SelectItem value="cursive">Cursive</SelectItem>
        </SelectContent>
      </Select>
      <input
        type="color"
        onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
        value={editor.getAttributes("textStyle").color}
        className="w-8 h-8 p-0 border-none rounded-full cursor-pointer"
      />
    </div>
  )
}

export default Toolbar

