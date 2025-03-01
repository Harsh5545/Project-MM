"use client"
import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

const HomeSection = () => {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ email: "", message: "" })
  const [showThankYou, setShowThankYou] = useState(false)
  const modalRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowThankYou(true)
    setTimeout(() => {
      setShowThankYou(false)
      setShowModal(false)
    }, 3000)
    setFormData({ email: "", message: "" })
  }

  const handleClickOutside = useCallback((event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false)
    }
  }, [])

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showModal, handleClickOutside])

  return (
    <section className="relative w-full py-16">
      {/* Background image with fixed attachment */}
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: "url('/assets/Website-Background.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-amber-900/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-2/3 text-center md:text-left"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Join the Modern Mannerism Community
            </h2>
            <p className="text-white/90 text-base md:text-lg">
              Subscribe to our newsletter for exclusive etiquette tips, upcoming workshops, and special offers. Become a
              better, more confident, and professional you!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              onClick={() => setShowModal(true)}
              className="bg-white text-amber-800 hover:bg-amber-100 px-8 py-6 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              JOIN NOW
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md"
            >
              {!showThankYou ? (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Join Our Community</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        What are you interested in learning?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us what you're looking to improve..."
                        className="w-full border border-gray-300 rounded-md p-3 focus:ring-amber-500 focus:border-amber-500"
                        rows={4}
                      ></textarea>
                    </div>
                    <div className="flex justify-end gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowModal(false)}
                        className="border-gray-300 text-gray-700"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-gradient-to-r from-amber-700 to-amber-500 text-white">
                        Subscribe
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
                  >
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Thank You!</h3>
                  <p className="text-gray-700 text-center">
                    You've successfully joined the Modern Mannerism community. Watch your inbox for exclusive content
                    and updates!
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default HomeSection

