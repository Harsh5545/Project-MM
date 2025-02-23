"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Cormorant_Garamond, Lato } from "next/font/google";

const dm_Sansss = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
});
const dm_Sans = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
});
const dm_Sanss = Lato({
  subsets: ["latin"],
  weight: ["300"],
});
export default function EmailPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = () => {
    if (!firstName.trim() || !lastName.trim() || !email.match(/\S+@\S+\.\S+/)) {
      alert("Please enter valid details.");
      return;
    }
    localStorage.setItem("emailSubmitted", "true");
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      downloadPDF();
    }, 1500);
  };

  const handleClose = () => {
    localStorage.setItem("popupDismissed", new Date().toISOString());
    setIsOpen(false);
  };

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = "/free-tips.pdf";
    link.download = "free-tips.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 bg-[#fffcfc] flex flex-col lg:flex-row items-center gap-4 w-[90%] lg:min-w-fit "> {/* Increased width */}
        {/* Image */}
        <div className="flex-1 hidden md:flex lg:flex justify-start items-center md:w-full">
          <Image src="/assets/Book.png" alt="Branding" width={500} height={500} className="object-cover  rounded-l-lg" />
        </div>
        {/* Form */}
        <div className="flex-1 px-2 flex flex-col items-center gap-4 lg:gap-8 justify-stretch w-[90%] md:w-[50%]">
      
          <DialogHeader>
            <DialogTitle className={`${dm_Sansss.className} lg:text-3xl text-lg font-semibold text-center `}>
              Unlock Your Path to Elegance & Confidence!
            </DialogTitle>
          </DialogHeader>
          {!submitted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <p className={`${dm_Sanss.className} text-center md:text-lg  text-xs text-gray-600'+`}>
                Get your FREE e-book – a practical, insightful guide to refining your social and professional image with ease.
              </p>
              <div className="flex flex-col gap-2 lg:gap-2">
            <div className="flex gap-2 pt-2 lg:pt-4 lg:gap-3">    <Input type="text" placeholder="First Name" className={`${dm_Sanss.className} lg:mt-3 mt-1`} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <Input type="text" placeholder="Last Name" className={`${dm_Sanss.className} lg:mt-3 mt-1`} value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>  <Input type="email" placeholder="Enter your email" className={`${dm_Sanss.className} lg:mt-3 mt-1`} value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className={`${dm_Sans.className} flex flex-col lg:flex-row justify-center gap-3 lg:gap-6 mt-4`}>
                <Button variant="outline" className="text-black " onClick={handleClose}>Maybe Later</Button>
                <Button onClick={handleSubmit}>Get Your Free E-Book Now</Button>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <p className={`${dm_Sans.className} text-center font-medium`}>Thank you! Your PDF is downloading...</p>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
