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

        // Handle images with proper styling and sizing
        if (name === "img") {
          const { src, alt, style } = attribs
          const hasError = imageErrors.has(src)

          if (hasError) {
            return (
              <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center my-3">
                <span className="text-gray-500 text-sm">Image not available</span>
              </div>
            )
          }

          let imageStyle = {
            maxWidth: "100%",
            height: "auto",
            margin: "0.75rem auto",
            display: "block",
            borderRadius: "6px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }

          if (style) {
            const styleObj = style.split(";").reduce((acc, rule) => {
              const [key, value] = rule.split(":")
              if (key && value) {
                const camelKey = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase())
                acc[camelKey] = value.trim()
              }
              return acc
            }, {})
            imageStyle = { ...imageStyle, ...styleObj }
          }

          return (
            <div className="my-3 flex justify-center">
              <img
                src={src || "/placeholder.svg"}
                alt={alt || "Blog image"}
                style={imageStyle}
                onError={() => handleImageError(src)}
                loading="lazy"
              />
            </div>
          )
        }

        // Handle YouTube iframes
        if (name === "iframe" && attribs.src?.includes("youtube")) {
          return (
            <div
              className="my-4 relative w-full overflow-hidden rounded-md shadow-sm"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                src={attribs.src}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video"
              />
            </div>
          )
        }

        // Handle lists with proper spacing
        if (name === "ul") {
          return (
            <ul className="list-disc list-outside ml-5 my-3 space-y-1 text-gray-700 dark:text-gray-300">
              {domToReact(children, options)}
            </ul>
          )
        }

        if (name === "ol") {
          return (
            <ol className="list-decimal list-outside ml-5 my-3 space-y-1 text-gray-700 dark:text-gray-300">
              {domToReact(children, options)}
            </ol>
          )
        }

        if (name === "li") {
          return <li className="text-gray-700 dark:text-gray-300 leading-relaxed">{domToReact(children, options)}</li>
        }

        // Handle headings with professional spacing
        if (name === "h1") {
          return (
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4 leading-tight">
              {domToReact(children, options)}
            </h1>
          )
        }

        if (name === "h2") {
          return (
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-3 leading-tight">
              {domToReact(children, options)}
            </h2>
          )
        }

        if (name === "h3") {
          return (
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-2 leading-tight">
              {domToReact(children, options)}
            </h3>
          )
        }

        // Handle paragraphs with professional spacing - FIXED
        if (name === "p") {
          const hasContent =
            children &&
            children.some((child) => {
              if (child.type === "text") {
                return child.data && child.data.trim() && child.data.trim() !== "\u00A0"
              }
              return child.type === "tag"
            })

          if (!hasContent) {
            return <div className="h-3"></div>
          }

          return (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3 text-base">
              {domToReact(children, options)}
            </p>
          )
        }

        // Handle line breaks
        if (name === "br") {
          return <br />
        }

        // Handle blockquotes
        if (name === "blockquote") {
          return (
            <blockquote className="border-l-3 border-primary pl-4 py-2 my-4 bg-primary/5 dark:bg-primary/10 rounded-r-md">
              <div className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                {domToReact(children, options)}
              </div>
            </blockquote>
          )
        }

        // Handle code blocks
        if (name === "pre") {
          return (
            <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto my-4 text-sm font-mono">
              {domToReact(children, options)}
            </pre>
          )
        }

        // Handle inline code
        if (name === "code" && domNode.parent?.name !== "pre") {
          return (
            <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded text-sm font-mono">
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

        // Handle text alignment
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

            return <div className={`${alignClass} mb-3`}>{domToReact(children, options)}</div>
          }
        }

        // Handle inline styles (color, font-size, etc.)
        if (attribs.style) {
          const styleObj = attribs.style.split(";").reduce((acc, rule) => {
            const [key, value] = rule.split(":")
            if (key && value) {
              acc[key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase())] = value.trim()
            }
            return acc
          }, {})

          return <span style={styleObj}>{domToReact(children, options)}</span>
        }
      }
    },
  }

  if (!content) {
    return <div className="text-gray-500 italic text-sm">No content available</div>
  }

  return (
    <div className={`blog-content-renderer ${className}`}>
      {parse(content, options)}

      <style jsx global>{`
        .blog-content-renderer {
          line-height: 1.6;
          font-size: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .blog-content-renderer p {
          margin-bottom: 0.75rem !important;
          line-height: 1.6 !important;
        }
        
        .blog-content-renderer p:last-child {
          margin-bottom: 0;
        }
        
        .blog-content-renderer ul {
          list-style-type: disc;
          padding-left: 1.25em;
          margin: 0.75rem 0;
        }
        
        .blog-content-renderer ol {
          list-style-type: decimal;
          padding-left: 1.25em;
          margin: 0.75rem 0;
        }
        
        .blog-content-renderer li {
          margin-bottom: 0.25rem;
          line-height: 1.6;
        }
        
        .blog-content-renderer blockquote {
          border-left: 3px solid #3b82f6;
          padding: 0.75rem 1rem;
          margin: 1rem 0;
          font-style: italic;
          background-color: rgba(59, 130, 246, 0.05);
          border-radius: 0 6px 6px 0;
        }
        
        .blog-content-renderer img {
          max-width: 100%;
          height: auto;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          margin: 0.75rem auto;
          display: block;
        }
        
        .blog-content-renderer iframe {
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          margin: 1rem auto;
          display: block;
        }
        
        .blog-content-renderer pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 6px;
          overflow-x: auto;
          margin: 1rem 0;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }
        
        .blog-content-renderer code {
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }
        
        .blog-content-renderer a {
          color: #3b82f6;
          text-decoration: underline;
          font-weight: 500;
        }
        
        .blog-content-renderer a:hover {
          color: #2563eb;
        }
        
        .blog-content-renderer h1, 
        .blog-content-renderer h2, 
        .blog-content-renderer h3 {
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .blog-content-renderer h1:first-child, 
        .blog-content-renderer h2:first-child, 
        .blog-content-renderer h3:first-child {
          margin-top: 0;
        }
      `}</style>
    </div>
  )
}
