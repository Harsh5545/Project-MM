"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Aleo, Cormorant_Garamond, Lato, Montserrat } from "next/font/google"

const Montserratt = Montserrat({ subsets: ["latin"], weight: ["400"] })
const dm_Sansss = Cormorant_Garamond({ subsets: ["latin"], weight: ["700"] })
const aleo = Aleo({ subsets: ["latin"], style: "italic", weight: ["500"] })
const dm_Sanss = Lato({ subsets: ["latin"], weight: ["300"] })

export default function EmailPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("") // Store error messages for UI

  useEffect(() => {
    const lastDismissed = localStorage.getItem("popupDismissed")
    const emailSubmitted = localStorage.getItem("emailSubmitted")

    if (!emailSubmitted) {
      if (!lastDismissed) {
        setTimeout(() => setIsOpen(true), 10000)
      } else {
        const lastDismissedTime = new Date(lastDismissed)
        const currentTime = new Date()
        const daysSinceDismissed = (currentTime - lastDismissedTime) / (1000 * 60 * 60 * 24)
        if (daysSinceDismissed >= 5) {
          setTimeout(() => setIsOpen(true), 20000)
        }
      }
    }
  }, [])
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }
  }, [isOpen])
  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.match(/\S+@\S+\.\S+/)) {
      alert("Please enter valid details.")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("emailSubmitted", "true")
        setSubmitted(true)
        setTimeout(() => {
          setIsOpen(false)
          downloadPDF()
        }, 1000)
      } else {
        alert(data.error || "Error sending email. Please try again.")
      }
    } catch (error) {
      console.error("Email sending error:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    localStorage.setItem("popupDismissed", new Date().toISOString())
    setIsOpen(false)
  }

  // const downloadPDF = () => {
  //   window.open(`${process.env.NEXT_PUBLIC_API_URL}/Modern_mannerism.pdf`, "_blank");
  // };

  const downloadPDF = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/download`, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch PDF")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = "Modern_mannerism.pdf" // You can rename the downloaded file here
      document.body.appendChild(a)
      a.click()
      a.remove()

      window.URL.revokeObjectURL(url) // Clean up
    } catch (error) {
      console.error("Error downloading PDF:", error)
    }
  }

  const resetForm = () => {
    setFirstName("")
    setLastName("")
    setEmail("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <DialogContent
        className="w-[90%] overflow-hidden lg:w-full max-h-fit rounded-md max-w-[800px] min-h-fit md:p-0 p-2 bg-gray-100 lg:bg-[#fffcfc] flex flex-col lg:flex-row items-center "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side - Image */}
        <div className="flex-1 h-full md:flex justify-start  items-center w-full max-w-[450px] lg:max-w-[550px]">
          <Image
            src="/assets/Book.webp"
            alt="Branding"
            title="Modern Mannerism E-Book"
            width={400}
            height={300}
            className="object-cover md:h-full h-[24vh] rounded-l-lg"
          />
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 px-0 md:px-5 flex flex-col items-center gap-4 lg:gap-8 justify-stretch w-[90%] md:w-[50%]">
          <DialogHeader>
            <DialogTitle
              className={`${dm_Sansss.className} bg-clip-text text-transparent bg-gradient-to-r uppercase from-amber-500 to-[#B8860B] lg:text-xl text-base font-semibold text-center`}
            >
              A Step-by-Step Guide to Polished Professional & Social Grace
            </DialogTitle>
          </DialogHeader>

          {!submitted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <p className={`${aleo.className} text-gray-700 text-xs tracking-wider text-center font-medium`}>
                Get your free e-book to unlock your path to Elegance & Confidence!
              </p>

              <div className="flex flex-col gap-1 md:gap-3 mt-2 lg:mt-4">
                <div className="flex lg:flex-row gap-1 md:gap-2 flex-col">
                  <Input
                    type="text"
                    placeholder="First Name"
                    className="w-full lg:max-w-[200px] py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#eabf91]"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Last Name"
                    className="w-full lg:max-w-[200px] py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#eabf91]"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full lg:max-w-[400px] py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#eabf91]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

              <div className="flex flex-col pb-0 md:pb-6 lg:flex-row justify-center gap-3 lg:gap-6 mt-2  md:mt-5">
                <Button
                  variant="outline"
                  className="text-gray-600  w-full lg:max-w-[300px] py-2 hover:bg-gray-200 bg-transparent"
                  onClick={handleClose}
                >
                  Maybe Later
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-[#c3965d] to-[#eabf91] text-white px-6 py-2 rounded-md transition-all"
                >
                  Get Your Free E-Book Now
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-green-500">
                <svg className="w-12 h-12 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    d="M14 27l7 7 16-16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-lg font-semibold text-[#c3965d] mt-3">Thank you! Your PDF is downloading...</p>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
