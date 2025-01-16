'use client';
import React from 'react';
import { Bold, Strikethrough, Italic, List, ListOrdered, Heading2, Heading3, Heading4, Underline, Quote, Undo, Redo, Code, ImageIcon, Link, AlignLeft, AlignCenter, AlignRight, Paintbrush, TextIcon as TextSize } from 'lucide-react';

const Toolbar = ({ editor, isMobile }) => {
  if (!editor) {
    return null;
  }

  const uploadImage = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        editor.chain().focus().setImage({ src: base64 }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  const addLink = () => {
    const url = window.prompt('Enter the URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const setFontSize = (size) => {
    editor.chain().focus().setFontSize(size).run();
  };

  const setFontColor = (color) => {
    editor.chain().focus().setMark('textStyle', { color }).run();
  };

  const setHeading = (level) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  const ToolbarButton = ({ onClick, isActive, children }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
        isActive ? 'bg-gray-200 dark:bg-gray-700' : ''
      }`}
    >
      {children}
    </button>
  );

  const toolbarItems = [
    {
      icon: <Bold size={18} />,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
    },
    {
      icon: <Italic size={18} />,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
    },
    {
      icon: <Underline size={18} />,
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive('underline'),
    },
    {
      icon: <Strikethrough size={18} />,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive('strike'),
    },
    {
      icon: <Code size={18} />,
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive('code'),
    },
    {
      icon: <Heading2 size={18} />,
      action: () => setHeading(2),
      isActive: editor.isActive('heading', { level: 2 }),
    },
    {
      icon: <Heading3 size={18} />,
      action: () => setHeading(3),
      isActive: editor.isActive('heading', { level: 3 }),
    },
    {
      icon: <Heading4 size={18} />,
      action: () => setHeading(4),
      isActive: editor.isActive('heading', { level: 4 }),
    },
    {
      icon: <List size={18} />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
    },
    {
      icon: <ListOrdered size={18} />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
    },
    {
      icon: <Quote size={18} />,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote'),
    },
    {
      icon: <AlignLeft size={18} />,
      action: () => editor.chain().focus().setTextAlign('left').run(),
      isActive: editor.isActive({ textAlign: 'left' }),
    },
    {
      icon: <AlignCenter size={18} />,
      action: () => editor.chain().focus().setTextAlign('center').run(),
      isActive: editor.isActive({ textAlign: 'center' }),
    },
    {
      icon: <AlignRight size={18} />,
      action: () => editor.chain().focus().setTextAlign('right').run(),
      isActive: editor.isActive({ textAlign: 'right' }),
    },
    {
      icon: <ImageIcon size={18} />,
      action: () => document.getElementById('image-upload')?.click(),
      isActive: false,
      extraElement: (
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={uploadImage}
        />
      ),
    },
    {
      icon: <Link size={18} />,
      action: addLink,
      isActive: editor.isActive('link'),
    },
    {
      icon: <Undo size={18} />,
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: <Redo size={18} />,
      action: () => editor.chain().focus().redo().run(),
    },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-2 flex flex-wrap gap-1 justify-center sm:justify-start items-center border-b border-gray-300 dark:border-gray-600">
      {toolbarItems.map((item, index) => (
        <React.Fragment key={index}>
          <ToolbarButton onClick={item.action} isActive={item.isActive}>
            {item.icon}
          </ToolbarButton>
          {item.extraElement}
        </React.Fragment>
      ))}
      {/* Font Size Dropdown */}
      <select
        onChange={(e) => setFontSize(e.target.value)}
        className="p-2 rounded bg-gray-200 dark:bg-gray-700"
      >
        <option value="">Font Size</option>
        <option value="12px">12px</option>
        <option value="14px">14px</option>
        <option value="16px">16px</option>
        <option value="18px">18px</option>
        <option value="20px">20px</option>
        <option value="24px">24px</option>
        <option value="28px">28px</option>
        <option value="32px">32px</option>
      </select>
      {/* Font Color */}
      <button
        onClick={() => setFontColor(prompt('Enter color (e.g., #000 or red)'))}
        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <Paintbrush size={18} />
      </button>
    </div>
  );
};

export default Toolbar;

