"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import "./navbar.module.css";
import "./Header.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AllLinks from "./links/AllLinks";
import { Lato } from "next/font/google";
import { AtSign, PhoneCall } from "lucide-react";
import { IconMail } from "@tabler/icons-react";

const dm_Sans = Lato({
  subsets: ["latin"],
  weight: ["400"],
});

const navVariants = {
  initial: {
    y: "-50%",
    x: "-50%",
  },
  animate: {
    y: 0,
    x: "-50%",
    transition: {
      duration: 1,
    },
  },
  exit: {
    y: -50,
  },
};

function HeaderFixed() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const handleNavLinkClick = () => {
    window.scrollTo(0, 0);
    toggleMobileMenu();
  };

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePhoneClick = () => {
    const userAgent = navigator.userAgent.toLowerCase();

    // Check if the device is mobile or tablet
    const isMobileOrTablet =
      /iphone|ipad|android|blackberry|iemobile|kindle|opera mini|mobile/i.test(
        userAgent
      );

    if (isMobileOrTablet) {
      // Open phone dialer
      window.location.href = "tel:+919867831324";
    } else {
      // Redirect to the contact-us page
      router.push("/contact-us");
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={navVariants}
      className="fixed z-[999] bg-black overflow-hidden bg-opacity-65 nav top-2 left-1/2 border-none -translate-x-1/2 rounded-xl p-2 md:px-10 flex flex-col md:flex-row items-center justify-between"
      style={{ width: "90%" }}
    >
      <div className="flex justify-between items-center w-full md:w-auto">
        <span className="text-xl">
          <Link href="/" passHref>
            <Image
              width={300}
              height={300}
              src="/assets/MM.png"
              className="md:max-w-[10rem] max-w-[6rem]"
              alt="ModernMannerism institute logo"
            />
          </Link>
        </span>

        <div className="md:hidden">
          <label className="hamburger">
            <input
              type="checkbox"
              onChange={toggleMobileMenu}
              checked={isMobileMenuOpen} // Ensure this is tied to the state
            />
            <svg viewBox="0 0 32 32">
              <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
              <path className="line stroke-white dark:stroke-black" d="M7 16 27 16"></path>
            </svg>
          </label>
        </div>
      </div>

      <div className="flex flex-col items-center md:items-start w-full md:w-auto">
        {isClient && (
          <div
            className={`${isMobile ? (isMobileMenuOpen ? "block" : "hidden") : "flex"
              } text-white md:flex-row font-poppins items-center gap-8 md:gap-4 h-[15rem] md:h-auto justify-center font-medium`}
          >
            <AllLinks onClose={toggleMobileMenu} />
          </div>
        )}
      </div>

      {isClient && (
        <div
          className={`${isMobile
              ? isMobileMenuOpen
                ? "block"
                : "hidden"
              : "flex items-center pr-0 md:pr-16 gap-2"
            }`}
        >
          <div className="flex items-center justify-center gap-8 lg:gap-16">
            <PhoneCall
              className="w-6 h-6 cursor-pointer text-[#c3965d] hover:text-[#eabf91]"
              onClick={handlePhoneClick}
            />
            <div className="relative group">
              <IconMail
                className="w-8 h-8 cursor-pointer text-[#c3965d] hover:text-[#eabf91]"
                onClick={() => window.open("mailto:modernmannerism@gmail.com")}
              />
              <span className="absolute bottom-[-2.5rem] left-[-5rem] w-auto px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100">
                modernmannerism@gmail.com
              </span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default HeaderFixed;