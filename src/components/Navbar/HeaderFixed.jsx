
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import "./navbar.module.css";
import "./Header.css"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AllLinks from "./links/AllLinks";
import { ThemeSwitcher } from "../theme/ThemeSwitcher";
import { Lato } from "next/font/google";
import ShadcnButton from "../Atom/button/ShadcnButton";
const dm_Sans = Lato({
    subsets: ["latin"],
    weight: ["400"],
    // Add weights if needed
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
            duration: 1.5,
        },
    },
    exit: {
        y: -50,
    },
};

function HeaderFixed() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [navInput, setNavInput] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen((prev) => !prev);
        setNavInput((prev) => !prev);
    };

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    const handleNavLinkClick = () => {
        window.scrollTo(0, 0);
        toggleMobileMenu();
    };
    const router = useRouter()

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={navVariants}
            className="fixed z-[999] bg-black bg-opacity-65  nav top-2 left-1/2 -translate-x-1/2 rounded-xl p-2 flex-col border justify-around flex md:flex-row items-center"
            style={{ width: "90%" }}
        >
            <div className="flex justify-between  items-center w-full md:w-0">
            <span className="text-xl">
      <Link href="/" passHref>
        
          <Image
            width={300}
            height={300}
            src="/assets/MM.png"
            className="md:max-w-40 max-w-16"
            alt="ModernMannerism institute logo"
          />


      </Link>
    </span>
                <div className="md:hidden">
                    <label className="hamburger">
                        <input type="checkbox" onChange={toggleMobileMenu} checked={navInput} />
                        <svg viewBox="0 0 32 32">
                            <path
                                className="line line-top-bottom"
                                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                            ></path>
                            <path className="line" d="M7 16 27 16"></path>
                        </svg>
                    </label>
                </div>
                
            </div>

            <div className="flex flex-col items-start">
                <div
                    className={`flex flex-col-reverse text-white md:flex-row font-poppins items-center gap-8 md:gap-4 h-[20rem] md:h-0 justify-center  font-medium ${isMobile ? (isMobileMenuOpen ? "block" : "hidden") : "flex"}`}
                >
                    <AllLinks />
                </div>
            </div>

            <div className={`${isMobile ? (isMobileMenuOpen ? "block" : "hidden") : "flex items-center gap-2"
                }`}>
                <ThemeSwitcher />
                <ShadcnButton
                    className={`${dm_Sans.className} tracking-wide rounded-full bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] text-white 
              p-2 px-4 sm:px-6 sm:py-2 md:px-8 md:py-2 lg:px-8 lg:py-2  text-sm sm:text-base md:text-base lg:text-base shadow-lg`}
                    onClick={() => {
                        router.push("/contact-us");
                        toggleMobileMenu();
                    }}
                >
                    CONTACT US
                </ShadcnButton>
            </div>
        </motion.div>
    );
}

export default HeaderFixed;
