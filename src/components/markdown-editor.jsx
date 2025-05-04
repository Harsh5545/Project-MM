"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bold, Italic, LinkIcon, ImageIcon, List, ListOrdered, Heading, Quote, Code } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownEditor({ content, onChange, previewMode }) {
  const [markdownContent, setMarkdownContent] = useState(content || "");

  useEffect(() => {
    if (content !== markdownContent) {
      setMarkdownContent(content);
    }
  }, [content]);

  const handleChange = (e) => {
    const newContent = e.target.value;
    setMarkdownContent(newContent);
    onChange(newContent);
  };

  const insertMarkdown = (markdownSyntax, selectionOffset = 0) => {
    const textarea = document.querySelector("textarea");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdownContent.substring(start, end);

    let newText;
    if (selectedText) {
      newText =
        markdownContent.substring(0, start) +
        markdownSyntax.replace("text", selectedText) +
        markdownContent.substring(end);
    } else {
      newText = markdownContent.substring(0, start) + markdownSyntax + markdownContent.substring(end);
    }

    setMarkdownContent(newText);
    onChange(newText);

    // Set cursor position
    setTimeout(() => {
      textarea.focus();
      const newCursorPos =
        start + markdownSyntax.indexOf("text") + (selectedText ? selectedText.length : 0) + selectionOffset;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="markdown-editor">
      {!previewMode && (
        <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <Button variant="ghost" size="icon" onClick={() => insertMarkdown("**text**", 0)}>
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => insertMarkdown("*text*", 0)}>
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => insertMarkdown("[text](url)", 0)}>
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => insertMarkdown("![alt text](image-url)", 0)}>
            <ImageIcon className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

          <Button variant="ghost" size="icon" onClick={() => insertMarkdown("# text", 0)}>
            <Heading className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => insertMarkdown("- text", 0)}>
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => insertMarkdown("1. text", 0)}>
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => insertMarkdown("> text", 0)}>
            <Quote className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => insertMarkdown("```\ntext\n```", 0)}>
            <Code className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="p-4 min-h-[350px] bg-white dark:bg-gray-900">
        {previewMode ? (
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown>
          </div>
        ) : (
          <Textarea
            value={markdownContent}
            onChange={handleChange}
            className="w-full min-h-[350px] border-0 focus-visible:ring-0 resize-none"
            placeholder="Write your content in Markdown..."
          />
        )}
      </div>
    </div>
  );
}