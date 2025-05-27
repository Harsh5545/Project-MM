"use client"

import parse, { domToReact, Element } from "html-react-parser"
import { useState } from "react"

export default function BlogContentRenderer({ content, className = "" }) {
  const [imageErrors, setImageErrors] = useState(new Set())

  const handleImageError = (src) => {
    setImageErrors((prev) => new Set(prev).add(src))
  }

  const options = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        const { name, attribs = {}, children } = domNode

        // Handle images with custom sizing
        if (name === "img") {
          const { src, alt, style } = attribs
          const hasError = imageErrors.has(src)

          if (hasError) {
            return (
              <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center my-6">
                <span className="text-gray-500">Image not available</span>
              </div>
            )
          }

          // Parse style attribute for width
          let width = "100%"
          let height = "auto"

          if (style) {
            const widthMatch = style.match(/width:\s*([^;]+)/)
            const heightMatch = style.match(/height:\s*([^;]+)/)
            if (widthMatch) width = widthMatch[1].trim()
            if (heightMatch) height = heightMatch[1].trim()
          }

          return (
            <div className="my-6 flex justify-center">
              <div style={{ width, height }} className="relative">
                <img
                  src={src || "/placeholder.svg"}
                  alt={alt || "Blog image"}
                  className="rounded-lg shadow-md object-cover w-full h-auto"
                  style={{ width, height }}
                  onError={() => handleImageError(src)}
                  loading="lazy"
                />
              </div>
            </div>
          )
        }

        // Handle YouTube iframes
        if (name === "iframe" && attribs.src?.includes("youtube")) {
          return (
            <div className="my-8 relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={attribs.src}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video"
              />
            </div>
          )
        }

        // Handle bullet lists
        if (name === "ul") {
          return (
            <ul className="list-disc list-outside ml-6 my-6 space-y-3 text-gray-700 dark:text-gray-300">
              {domToReact(children, options)}
            </ul>
          )
        }

        // Handle ordered lists
        if (name === "ol") {
          return (
            <ol className="list-decimal list-outside ml-6 my-6 space-y-3 text-gray-700 dark:text-gray-300">
              {domToReact(children, options)}
            </ol>
          )
        }

        // Handle list items
        if (name === "li") {
          return (
            <li className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">{domToReact(children, options)}</li>
          )
        }

        // Handle headings with proper spacing
        if (name === "h1") {
          return (
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-12 mb-6 leading-tight">
              {domToReact(children, options)}
            </h1>
          )
        }

        if (name === "h2") {
          return (
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-5 leading-tight">
              {domToReact(children, options)}
            </h2>
          )
        }

        if (name === "h3") {
          return (
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 leading-tight">
              {domToReact(children, options)}
            </h3>
          )
        }

        // Handle paragraphs with proper spacing - CRITICAL FIX
        if (name === "p") {
          // Check if paragraph is empty or contains only whitespace/nbsp
          const hasContent =
            children &&
            children.some((child) => {
              if (child.type === "text") {
                return child.data && child.data.trim() && child.data.trim() !== "\u00A0"
              }
              return child.type === "tag"
            })

          // If paragraph is empty, render as spacing
          if (!hasContent) {
            return <div className="h-6 mb-4"></div>
          }

          return (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-base md:text-lg">
              {domToReact(children, options)}
            </p>
          )
        }

        // Handle line breaks
        if (name === "br") {
          return <div className="h-4"></div>
        }

        // Handle blockquotes
        if (name === "blockquote") {
          return (
            <blockquote className="border-l-4 border-primary pl-6 py-4 my-8 bg-gray-50 dark:bg-gray-800 rounded-r-lg">
              <div className="text-gray-700 dark:text-gray-300 italic text-lg">{domToReact(children, options)}</div>
            </blockquote>
          )
        }

        // Handle code blocks
        if (name === "pre") {
          return (
            <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-6 rounded-lg overflow-x-auto my-8 text-sm">
              {domToReact(children, options)}
            </pre>
          )
        }

        // Handle inline code
        if (name === "code" && domNode.parent?.name !== "pre") {
          return (
            <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm font-mono">
              {domToReact(children, options)}
            </code>
          )
        }

        // Handle links
        if (name === "a") {
          return (
            <a
              href={attribs.href}
              target={attribs.target}
              rel={attribs.rel}
              className="text-primary hover:text-primary/80 underline transition-colors font-medium"
            >
              {domToReact(children, options)}
            </a>
          )
        }

        // Handle text formatting
        if (name === "strong" || name === "b") {
          return <strong className="font-bold text-gray-900 dark:text-white">{domToReact(children, options)}</strong>
        }

        if (name === "em" || name === "i") {
          return <em className="italic">{domToReact(children, options)}</em>
        }

        if (name === "u") {
          return <u className="underline">{domToReact(children, options)}</u>
        }

        if (name === "s" || name === "strike") {
          return <s className="line-through">{domToReact(children, options)}</s>
        }

        // Handle divs with text alignment
        if (name === "div" && attribs.style?.includes("text-align")) {
          const alignMatch = attribs.style.match(/text-align:\s*([^;]+)/)
          if (alignMatch) {
            const alignment = alignMatch[1].trim()
            let alignClass = ""

            switch (alignment) {
              case "center":
                alignClass = "text-center"
                break
              case "right":
                alignClass = "text-right"
                break
              case "justify":
                alignClass = "text-justify"
                break
              default:
                alignClass = "text-left"
            }

            return <div className={`${alignClass} mb-6`}>{domToReact(children, options)}</div>
          }
        }

        // Handle colored text
        if (attribs.style?.includes("color")) {
          return (
            <span style={{ color: attribs.style.match(/color:\s*([^;]+)/)?.[1] }}>{domToReact(children, options)}</span>
          )
        }

        // Handle font size
        if (attribs.style?.includes("font-size")) {
          return (
            <span style={{ fontSize: attribs.style.match(/font-size:\s*([^;]+)/)?.[1] }}>
              {domToReact(children, options)}
            </span>
          )
        }
      }
    },
  }

  if (!content) {
    return <div className="text-gray-500 italic">No content available</div>
  }

  return (
    <div className={`blog-content ${className}`}>
      {parse(content, options)}

      <style jsx global>{`
        .blog-content {
          line-height: 1.8;
        }
        
        .blog-content p {
          margin-bottom: 1.5rem !important;
          line-height: 1.8 !important;
        }
        
        .blog-content p:last-child {
          margin-bottom: 0;
        }
        
        .blog-content ul {
          list-style-type: disc;
          padding-left: 1.5em;
          margin: 1.5rem 0;
        }
        
        .blog-content ol {
          list-style-type: decimal;
          padding-left: 1.5em;
          margin: 1.5rem 0;
        }
        
        .blog-content li {
          margin-bottom: 0.75rem;
          line-height: 1.7;
        }
        
        .blog-content ul ul {
          list-style-type: circle;
          margin: 0.75rem 0;
        }
        
        .blog-content ol ol {
          list-style-type: lower-alpha;
          margin: 0.75rem 0;
        }
        
        .blog-content blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
        }
        
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin: 1.5rem 0;
        }
        
        .blog-content iframe {
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin: 2rem 0;
        }
        
        .blog-content pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1.5rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 2rem 0;
        }
        
        .blog-content code {
          font-family: 'Courier New', monospace;
        }
        
        .blog-content a {
          color: #3b82f6;
          text-decoration: underline;
          font-weight: 500;
        }
        
        .blog-content a:hover {
          color: #2563eb;
        }
        
        .blog-content h1, .blog-content h2, .blog-content h3 {
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
        }
        
        .blog-content h1:first-child, 
        .blog-content h2:first-child, 
        .blog-content h3:first-child {
          margin-top: 0;
        }
      `}</style>
    </div>
  )
}