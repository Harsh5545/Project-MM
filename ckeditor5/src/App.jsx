"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";

// Disable SSR for CKEditor
const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
  { ssr: false }
);
const ClassicEditor = dynamic(
  () => import("@ckeditor/ckeditor5-build-classic"),
  { ssr: false }
);

export default function Editor({ onChange, content }) {
  const editorWordCountRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig = useMemo(() => {
    if (!isLayoutReady) {
      return { toolbar: [], plugins: [] }; // Default config to prevent errors
    }
    return {
      toolbar: [
        "bold",
        "italic",
        "underline",
        "link",
        "bulletedList",
        "numberedList",
        "blockQuote",
        "insertTable",
      ],
      plugins: [],
      initialData: content || "",
    };
  }, [isLayoutReady]);

  const handleChange = (event, editor) => {
    const data = editor.getData();
    onChange(data);
  };

  return (
    <div className="editor-container">
      {isLayoutReady && (
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={handleChange}
          onReady={(editor) => {
            const wordCount = editor.plugins.get("WordCount");
            if (editorWordCountRef.current) {
              editorWordCountRef.current.appendChild(
                wordCount.wordCountContainer
              );
            }
          }}
          onAfterDestroy={() => {
            if (editorWordCountRef.current) {
              Array.from(editorWordCountRef.current.children).forEach((child) =>
                child.remove()
              );
            }
          }}
          config={editorConfig}
        />
      )}
      <div ref={editorWordCountRef} />
    </div>
  );
}
