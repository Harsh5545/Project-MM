"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate a loading delay or wait for actual content to load
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Adjust this duration as needed, or replace with actual content loaded logic

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src="/MMM.png" // Use the provided logo
              alt="Modern Mannerism Logo"
              width={200}
              height={200}
              priority // Load this image with high priority
              className="animate-pulse" // Optional: add a pulse animation
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
