"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import TextStyle from "@tiptap/extension-text-style"
import { Color } from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"
import Table from "@tiptap/extension-table"
import TableRow from "@tiptap/extension-table-row"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import YouTube from "@tiptap/extension-youtube"
import Superscript from "@tiptap/extension-superscript"
import Subscript from "@tiptap/extension-subscript"
import FontFamily from "@tiptap/extension-font-family"
import Toolbar from "./Toolbar"

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      align: {
        default: "center",
        renderHTML: (attributes) => {
          const align = attributes.align || "center"
          return {
            style: `display: block; margin: ${align === "center" ? "0 auto" : align === "left" ? "0 auto 0 0" : "0 0 0 auto"}; max-width: 100%;`,
          }
        },
      },
    }
  },
})

const Tiptap = ({ onChange, content }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      CustomImage.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-lg shadow-md max-w-full",
        },
      }),
      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
      }),
      TextStyle,
      Color,
      Highlight,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      YouTube.configure({
        width: 640,
        height: 480,
      }),
      Superscript,
      Subscript,
      FontFamily,
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] max-h-[600px] overflow-y-auto p-4",
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          const file = event.dataTransfer.files[0]
          const reader = new FileReader()
          reader.onload = (e) => {
            const node = view.state.schema.nodes.image.create({
              src: e.target?.result,
            })
            const transaction = view.state.tr.replaceSelectionWith(node)
            view.dispatch(transaction)
          }
          reader.readAsDataURL(file)
          return true
        }
        return false
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      const json = editor.getJSON()
      onChange({ html, json })
    },
  })

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="prose-sm sm:prose lg:prose-lg xl:prose-xl" />
    </div>
  )
}

export default Tiptap

