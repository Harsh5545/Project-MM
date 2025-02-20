"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
      <DialogContent className="p-6 flex flex-col md:flex-row items-center gap-6 w-full md:min-w-max"> {/* Increased width */}
        {/* Image */}
        <div className="flex-1  border-2 border-sky-600 flex justify-start items-center w-[90%] md:w-[50%]">
          <Image src="/assets/manasi-box.png" alt="Branding" width={400} height={400} className="rounded-lg object-cover " />
        </div>
        {/* Form */}
        <div className="flex-1 flex flex-col items-center gap-16 justify-center w-full md:w-[50%]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-center md:text-left">
              Unlock Your Path to Elegance & Confidence!
            </DialogTitle>
          </DialogHeader>
          {!submitted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <p className="text-center md:text-lg  text-sm text-gray-600">
                Get your FREE e-book – a practical, insightful guide to refining your social and professional image with ease.
              </p>
              <div className="flex flex-col gap-10">
            <div className="flex gap-6">    <Input type="text" placeholder="First Name" className="mt-3" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <Input type="text" placeholder="Last Name" className="mt-3" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>  <Input type="email" placeholder="Enter your email" className="mt-3" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex justify-center gap-8 mt-4">
                <Button variant="outline" onClick={handleClose}>Maybe Later</Button>
                <Button onClick={handleSubmit}>Get Your Free E-Book Now</Button>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <p className="text-center font-medium">Thank you! Your PDF is downloading...</p>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
