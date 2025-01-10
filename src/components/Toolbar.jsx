import React from 'react';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
  ImageIcon,
  Link,
} from 'lucide-react';

const Toolbar = ({ editor }) => { 
  if (!editor) {
    return null;
  }
  const uploadImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result;
        editor.chain().focus().setImage({ src: base64 }).run();
      };

      reader.readAsDataURL(file); // Convert the file to Base64
    }
  };

  const addLink = () => {
    const url = prompt('Enter the URL');
    if (url) {
      editor.chain().focus().toggleLink({ href: url }).run();
    }
  };

  return (
    <div className="px-2 py-3 rounded-tl-md rounded-tr-md flex justify-start items-start gap-5 w-full flex-wrap border border-gray-700">
    <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 ${editor.isActive('bold') ? 'bg-gray-300' : ''}`}>
      <Bold />
    </button>
    <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 ${editor.isActive('italic') ? 'bg-gray-300' : ''}`}>
      <Italic />
    </button>
    <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 ${editor.isActive('underline') ? 'bg-gray-300' : ''}`}>
      <Underline />
    </button>
    <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-2 ${editor.isActive('strike') ? 'bg-gray-300' : ''}`}>
      <Strikethrough />
    </button>
    <button onClick={() => editor.chain().focus().toggleCode().run()} className={`p-2 ${editor.isActive('code') ? 'bg-gray-300' : ''}`}>
      <Code />
    </button>
    <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : ''}`}>
      <Heading2 />
    </button>
    <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 ${editor.isActive('bulletList') ? 'bg-gray-300' : ''}`}>
      <List />
    </button>
    <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 ${editor.isActive('orderedList') ? 'bg-gray-300' : ''}`}>
      <ListOrdered />
    </button>
    <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2 ${editor.isActive('blockquote') ? 'bg-gray-300' : ''}`}>
      <Quote />
    </button>
    <button className="p-2">
        <label className="cursor-pointer">
          <ImageIcon />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={uploadImage}
          />
        </label>
      </button>
    <button onClick={addLink} className="p-2">
      <Link />
    </button>
    <button onClick={() => editor.chain().focus().undo().run()} className="p-2">
      <Undo />
    </button>
    <button onClick={() => editor.chain().focus().redo().run()} className="p-2">
      <Redo />
    </button>
  
    </div>
  );
};

export default Toolbar;