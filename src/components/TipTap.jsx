"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import TextStyle from "@tiptap/extension-text-style"
import { Color } from "@tiptap/extension-color"
import Toolbar from "./Toolbar"

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      role: {
        default: "presentation",
        renderHTML: (attributes) => {
          return {
            role: attributes.role,
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
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Underline,
      CustomImage.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-lg shadow-md max-w-[80%]",
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
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
      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap

