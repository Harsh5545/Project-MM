"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Cormorant_Garamond, Lato } from "next/font/google";

const dm_Sansss = Cormorant_Garamond({ subsets: ["latin"], weight: ["700"] });
const dm_Sans = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"] });
const dm_Sanss = Lato({ subsets: ["latin"], weight: ["300"] });

export default function EmailPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(""); // Store error messages for UI

  useEffect(() => {
    const lastDismissed = localStorage.getItem("popupDismissed");
    const emailSubmitted = localStorage.getItem("emailSubmitted");

    if (!emailSubmitted) {
      if (!lastDismissed) {
        setTimeout(() => setIsOpen(true), 10000);
      } else {
        const lastDismissedTime = new Date(lastDismissed);
        const currentTime = new Date();
        const daysSinceDismissed = (currentTime - lastDismissedTime) / (1000 * 60 * 60 * 24);
        if (daysSinceDismissed >= 5) {
          setTimeout(() => setIsOpen(true), 20000);
        }
      }
    }
  }, []);

  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.match(/\S+@\S+\.\S+/)) {
      alert("Please enter valid details.");
      return;
    }

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("emailSubmitted", "true");
        setSubmitted(true);
        setTimeout(() => {
          setIsOpen(false);
          downloadPDF();
        }, 1500);
      } else {
        alert(data.error || "Error sending email. Please try again.");
      }
    } catch (error) {
      console.error("Email sending error:", error);
      alert("Something went wrong. Please try again.");
    }
  };


  const handleClose = () => {
    localStorage.setItem("popupDismissed", new Date().toISOString());
    setIsOpen(false);
  };
  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = "https://www.modernmannerism.com/free-tips.pdf"; // Replace with actual hosted file URL
    link.download = "free-tips.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="md:p-0 p-5 bg-gray-200 lg:bg-[#fffcfc] flex flex-col lg:flex-row items-center gap-4 w-[90%] lg:min-w-fit">
        {/* Image */}
        <div className="flex-1 hidden md:flex lg:flex justify-start items-center md:w-full">
          <Image src="/assets/Book.png" alt="Branding" width={500} height={500} className="object-cover rounded-l-lg" />
        </div>

        {/* Form */}
        <div className="flex-1 px-2 flex flex-col items-center gap-4 lg:gap-8 justify-stretch w-[90%] md:w-[50%]">
          <DialogHeader>
            <DialogTitle className={`${dm_Sansss.className} lg:text-3xl text-xl font-semibold text-center`}>
              Unlock Your Path to Elegance & Confidence!
            </DialogTitle>
          </DialogHeader>

          {!submitted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <p className={`${dm_Sanss.className} text-gray-700 text-lg font-medium`}>
                Get your FREE e-book – a step-by-step guide to refine your professional & social presence.
              </p>

              <div className="flex flex-col gap-3 mt-4">
                <div className="flex gap-3">
                  <Input
                    type="text" placeholder="First Name"
                    className="px-4 py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input
                    type="text" placeholder="Last Name"
                    className="px-4 py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <Input
                  type="email" placeholder="Enter your email"
                  className="px-4 py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Error message with better UI */}
              {error && (
                <p className="mt-2 text-red-500 text-sm">
                  {error}
                </p>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col lg:flex-row justify-center gap-3 lg:gap-6 mt-5">
                <Button variant="outline" className="text-gray-600 hover:bg-gray-200" onClick={handleClose}>
                  Maybe Later
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-[#D4AF37] hover:bg-[#B8860B] text-white px-6 py-2 rounded-md transition-all"
                >

                Get Your Free E-Book Now
              </Button>
            </div>
            </motion.div>
        ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <Image src="/assets/success-check.svg" alt="Success" width={60} height={60} />
  <p className="text-lg font-semibold text-[#B8860B] mt-3">
    Thank you! Your PDF is downloading...
  </p>
        </motion.div>
          )}
      </div>
    </DialogContent>
    </Dialog >
  );
}
