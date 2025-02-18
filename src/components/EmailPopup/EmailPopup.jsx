"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EmailPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const lastDismissed = localStorage.getItem("popupDismissed");
    const emailSubmitted = localStorage.getItem("emailSubmitted");

    if (!emailSubmitted) {
      if (!lastDismissed) {
        setTimeout(() => setIsOpen(true), 20000); // Show after 20 seconds
      } else {
        const lastDismissedTime = new Date(lastDismissed);
        const currentTime = new Date();
        const daysSinceDismissed = (currentTime - lastDismissedTime) / (1000 * 60 * 60 * 24);
        if (daysSinceDismissed >= 5) {
          setTimeout(() => setIsOpen(true), 20000); // Show after 20 seconds if 5 days passed
        }
      }
    }
  }, []);

  const handleSubmit = () => {
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      alert("Please enter a valid email address.");
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
    link.href = "/free-tips.pdf"; // Ensure the PDF is in the public folder
    link.download = "free-tips.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Get Free Business Etiquette Tips</DialogTitle>
        </DialogHeader>
        {!submitted ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Input
              type="email"
              placeholder="Enter your email"
              className="my-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleClose}>
                Maybe Later
              </Button>
              <Button onClick={handleSubmit}>Get PDF</Button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <p className="text-center font-medium">Thank you! Your PDF is downloading...</p>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
