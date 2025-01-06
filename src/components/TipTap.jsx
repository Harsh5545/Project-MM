'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from './Toolbar';
import Underline from '@tiptap/extension-underline'

const Tiptap = ({onChange, content}) => {
  const handleChange=(newContent)=>{
    onChange(newContent);
  };
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class: 'flex flex-col px-4 py-3 justify-start border-b border-r  border-gray-700 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-br-md rounded-bl-md outline-none rounded-lg shadow-md',
      },
    },
    onUpdate:({editor})=>{
      handleChange(editor.getHTML())
    }
})

  return (
    <div className='w-full px-4'>
<Toolbar editor={editor} content={content}/>
<EditorContent style={{whiteSpace:"pre-line" , padding:"1px"}} editor={editor} />
    </div>
  )
}

export default Tiptap
