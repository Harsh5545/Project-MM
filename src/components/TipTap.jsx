'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import Toolbar from './Toolbar';
import { useState, useEffect } from 'react';
import TextStyle from '@tiptap/extension-text-style';

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      role: {
        default: 'presentation',
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const editor = useEditor({
    extensions:  [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
         
        },
      }),
      Underline,
      CustomImage.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg shadow-md max-w-[80%]',
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] max-h-[600px] overflow-y-auto p-4',
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          const file = event.dataTransfer.files[0];
          const reader = new FileReader();
          reader.onload = (e) => {
            const node = view.state.schema.nodes.image.create({
              src: e.target?.result,
            });
            const transaction = view.state.tr.replaceSelectionWith(node);
            view.dispatch(transaction);
          };
          reader.readAsDataURL(file);
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const json = editor.getJSON();
      onChange({ html, json });
    },
    immediatelyRender: false, 
  });

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <Toolbar editor={editor} isMobile={isMobile} />
      <div className="p-4">
        <EditorContent
          editor={editor}
          className="min-h-[300px] max-h-[600px] overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4"
        />
      </div>
    </div>
  );
};

export default Tiptap;

