"use client"; // Use this for Next.js 13+ (App Router)
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      {/* Logo Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 1 }}
        className="relative w-40 h-40 flex items-center justify-center"
      >
        {/* Animated Square */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute inset-0 border-2 border-gold rounded-lg"
        />

        {/* Animated 'M' */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-gold text-6xl font-bold"
        >
          M
        </motion.div>
      </motion.div>

      {/* Shimmer Effect */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />

      {/* Fade-out Animation */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, delay: 4 }}
        className="absolute inset-0 bg-black"
      />
    </div>
  );
};

export default Loader;
