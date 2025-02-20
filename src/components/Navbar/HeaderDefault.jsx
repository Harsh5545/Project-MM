"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AllLinks from "./links/AllLinks";
import { Lato } from "next/font/google";
import { AtSign, Mail, Mails, PhoneCall } from "lucide-react";
import { IconMail } from "@tabler/icons-react";
import Link from "next/link";

const dm_Sans = Lato({
  subsets: ["latin"],
  weight: ["400"],
});

function HeaderDefault() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navInput, setNavInput] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    setNavInput((prev) => !prev);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
      setNavInput(false);
    }
  }, [isMobile]);

  const router = useRouter();
  
  const handlePhoneClick = () => {
    const userAgent = navigator.userAgent.toLowerCase()

    // Check if the device is mobile or tablet
    const isMobileOrTablet =
      /iphone|ipad|android|blackberry|iemobile|kindle|opera mini|mobile/i.test(
        userAgent
      )

    if (isMobileOrTablet) {
      // Open phone dialer
      window.location.href = "tel:+919867831324"
    } else {
      // Redirect to the contact-us page
      router.push("/contact-us")
    }
  }

  return (
    <div className="flex z-[999] absolute w-full pb-5 justify-center items-center">
      <div className="flex-col bg-black text-white bg-opacity-50 md:flex-row flex justify-between px-2 md:px-10 rounded-md w-[90%] items-center backdrop-filter backdrop-blur-md py-1 mt-4">
        {/* Logo */}
        <div className="flex justify-between items-center w-full md:w-0">
          <span className="text-xl">
          <Link href="/" passHref>
  <Image
    src="/assets/MM.png"
    width={300}
    height={300}
    className="md:max-w-[12rem] max-w-[7rem]"
    alt="ModernMannerism logo"
    priority
  />
</Link>
          </span>
          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <label className="hamburger">
              <input 
                type="checkbox"
                onChange={toggleMobileMenu}
                checked={navInput}
              />
              <svg viewBox="0 0 32 32">
                <path
                  className="line line-top-bottom"
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                ></path>
                <path className="line text-white" d="M7 16 27 16"></path>
              </svg>
            </label>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-start">
          <div
            className={`flex flex-col text-white font-poppins md:flex-row items-center gap-8 md:gap-10 h-[20rem] md:h-0 justify-center ${isMobileMenuOpen ? "block" : "hidden"
              } md:flex`}
          >
            <AllLinks onClose={() => toggleMobileMenu()} />
          </div>
        </div>

        {/* Contact Icons */}
        <div
          className={`${isMobileMenuOpen ? "block" : "hidden"
            } md:flex gap-6 flex-row items-center justify-center pr-0 lg:pr-16`}
        >
          {/* Call Icon */}
          <div className="flex gap-8 items-center justify-center  lg:gap-16">
  <PhoneCall
        className="w-6 h-6 cursor-pointer text-[#c3965d] hover:text-[#eabf91]"
        onClick={handlePhoneClick}
      />
          {/* Email Icon */}
          <div className="relative group">
            <IconMail
              className="w-8 h-8 cursor-pointer text-[#c3965d] hover:text-[#eabf91]"
              onClick={() => window.open("mailto:modernmannerism@gmail.com")}
            />
            <span className="absolute bottom-[-2.5rem] left-[-5rem] w-auto px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100">
              modernmannerism@gmail.com
            </span>
          </div></div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDefault;
