"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AllLinks from "./links/AllLinks";
import { Lato } from 'next/font/google';
import ShadcnButton from "../Atom/button/ShadcnButton";
import Loading from "../app/loading";

const dm_Sans = Lato({
  subsets: ["latin"],
  weight: ["400"],
});

function HeaderDefault() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 768px) and (max-width: 1023px)" });
  const router = useRouter();

  useEffect(() => {
    if (!isMobile && !isTablet) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, isTablet]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleNavigation = (path) => {
    setIsLoading(true);
    router.push(path);
  };

  return (
    <>
      <div className="flex z-[999] fixed w-full justify-center items-center">
        <div className="flex-col bg-black text-white bg-opacity-50 md:flex-row flex justify-between px-4 md:px-6 lg:px-10 rounded-md w-[95%] md:w-[90%] items-center backdrop-filter backdrop-blur-md py-2 mt-4">
          <div className="flex justify-between items-center w-full md:w-auto">
            <Image
              src="/assets/MM.png"
              width={isMobile ? 150 : 200}
              height={isMobile ? 50 : 66}
              className="max-w-[8rem] md:max-w-[10rem] lg:max-w-[12rem]"
              alt="ModernMannerism logo"
              priority
              onClick={() => handleNavigation("/")}
            />
            <button
              className="md:hidden text-white"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center w-full md:w-auto`}>
            <AllLinks onClose={toggleMobileMenu} onNavigate={handleNavigation} />
            <ShadcnButton 
              className={`${dm_Sans.className} mt-4 md:mt-0 md:ml-4 tracking-wide rounded-full bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] text-white 
                p-2 px-4 sm:px-6 sm:py-2 md:px-6 md:py-2 lg:px-8 lg:py-2 text-sm sm:text-base shadow-lg`}
              onClick={() => handleNavigation("/contact-us")}
            >
              CONTACT US
            </ShadcnButton>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </>
  );
}

export default HeaderDefault;

