"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Aleo, Cormorant_Garamond, Montserrat } from "next/font/google";

const Montserratt = Montserrat({ subsets: ["latin"], weight: ["400"] });
const dm_Sansss = Cormorant_Garamond({ subsets: ["latin"], weight: ["700"] });
const aleo = Aleo({ subsets: ["latin"], style: "italic", weight: ["500"] });

export default function EmailPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
  
    setLoading(true);
  
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email }),
      });
  
      if (response.ok) {
        localStorage.setItem("emailSubmitted", new Date().toISOString());
        setSubmitted(true);
        
        // ✅ Ask user to click a button instead of triggering inside async
        setTimeout(() => {
          setIsOpen(false);
        }, 1500);
      } else {
        alert("Error sending email. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // 🆕 Function to manually trigger download on user action
  const downloadPDF = () => {
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/sample-5.pdf`, "_blank");
  };
  
  

  const handleClose = () => {
    localStorage.setItem("popupDismissed", new Date().toISOString());
    setIsOpen(false);
  };

  // const downloadPDF = () => {
  //   window.open(`${process.env.NEXT_PUBLIC_API_URL}/sample-5.pdf`, "_blank");
  // };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>

      <DialogContent 
        className="w-[90%] lg:w-full rounded-md max-w-[800px] min-h-fit md:p-0 p-4 bg-gray-100 lg:bg-[#fffcfc] flex flex-col lg:flex-row items-center gap-4" 
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Left Side - Image */}
        <div className="flex-1 hidden md:flex justify-start items-center w-full max-w-[450px] lg:max-w-[550px]">
          <Image src="/assets/Book.png" alt="Branding" width={400} height={600} className="object-cover rounded-l-lg" />
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 px-4 lg:px-6 flex flex-col items-center gap-4 lg:gap-4 justify-stretch w-full">
          <DialogHeader>
            <DialogTitle className={`${dm_Sansss.className} bg-clip-text text-transparent bg-gradient-to-r uppercase from-amber-500 to-[#B8860B] lg:text-xl text-lg font-semibold text-center`}>
              A Step-by-Step Guide to Polished Professional & Social Grace
            </DialogTitle>
          </DialogHeader>

          {!submitted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-green-500">
              <svg className="w-12 h-12 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
                <path fill="none" stroke="currentColor" strokeWidth="4" d="M14 27l7 7 16-16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-[#B8860B] mt-3">
              Thank you! Click below to download your PDF.
            </p>
        
            {/* 🆕 User must click this button to download (avoids popup blocker) */}
            <Button onClick={downloadPDF} className="bg-[#D4AF37] hover:bg-[#B8860B] text-white w-full max-w-[300px] py-2 rounded-md transition-all mt-4">
              Download Your Free E-Book
            </Button>
          </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-green-500">
                <svg className="w-12 h-12 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <path fill="none" stroke="currentColor" strokeWidth="4" d="M14 27l7 7 16-16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-[#B8860B] mt-3">Thank you! Your PDF is downloading...</p>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
