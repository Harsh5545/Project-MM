"use client";

import React from "react";
import { motion } from "framer-motion";
import { Tooltip } from "@/components/ui/tooltip"; // Adjust import based on your ShadCN structure
import { Button } from "@/components/ui/button"; // ShadCN button component
import { Instagram, Youtube, Linkedin, Facebook } from "lucide-react"; // Lucide React icons

const SocialButtons = () => {
  const iconVariants = {
    hover: {
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <div className="flex space-x-4 items-center justify-center mt-4">
      {/* Instagram */}
      <Tooltip content="@modernmannerism" side="top">
        <motion.div variants={iconVariants} whileHover="hover">
          <Button
            variant="ghost"
            className="p-2"
            asChild
          >
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={28} className="text-pink-500 hover:text-pink-600" />
            </a>
          </Button>
        </motion.div>
      </Tooltip>

      {/* YouTube */}
      <Tooltip content="YouTube Channel" side="top">
        <motion.div variants={iconVariants} whileHover="hover">
          <Button
            variant="ghost"
            className="p-2"
            asChild
          >
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube size={28} className="text-red-500 hover:text-red-600" />
            </a>
          </Button>
        </motion.div>
      </Tooltip>

      {/* LinkedIn */}
      <Tooltip content="LinkedIn Profile" side="top">
        <motion.div variants={iconVariants} whileHover="hover">
          <Button
            variant="ghost"
            className="p-2"
            asChild
          >
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={28} className="text-blue-500 hover:text-blue-600" />
            </a>
          </Button>
        </motion.div>
      </Tooltip>

      {/* Facebook */}
      <Tooltip content="Facebook Page" side="top">
        <motion.div variants={iconVariants} whileHover="hover">
          <Button
            variant="ghost"
            className="p-2"
            asChild
          >
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={28} className="text-blue-700 hover:text-blue-800" />
            </a>
          </Button>
        </motion.div>
      </Tooltip>
    </div>
  );
};


export default SocialButtons;
