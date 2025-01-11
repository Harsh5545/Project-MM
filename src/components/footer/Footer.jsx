"use client";

import { useRouter } from "next/navigation";
import Socials from "./SocialIcons";
import SocialMobile from "./SocialMobile";

const Footer = () => {
  const router = useRouter();

  const navigateToPrivacyPolicy = () => {
    router.push('/privacy-policy');
  };

  const navigateToTerms = () => {
    router.push('/terms');
  };

  return (
    <>
      <footer className="dark:bg-[#00001F] bg-gray-50 text-black dark:text-white p-5 border-t-10 flex flex-col relative h-[80vh]">

        {/* "Contact Us" Header in Top Left */}
        <div className="absolute top-8 left-8 text-4xl md:text-6xl font-semibold">
          Get in Touch
        </div>

        {/* Main Content - Centered Vertically and Horizontally */}
        <div className="flex-1 flex justify-center items-center">
          <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16 px-0 py-12">

            {/* Phone Section */}
            <div className="text-center flex flex-col items-center md:w-1/4">
              <span className="text-lg font-semibold mb-10">Phone</span>
              <a
                href="tel:+919867831324"
                className="text-lg font-medium  hover:underline"
              >
                +91 9867831324
              </a>
            </div>

            {/* Email Section */}
            <div className="text-center flex flex-col items-center md:w-1/4">
              <span className="text-lg font-semibold mb-10">Email</span>
              <a
                href="mailto:modernmannerism@gmail.com"
                className="text-lg font-medium hover:underline"
              >
                modernmannerism@gmail.com
              </a>
            </div>

            {/* Social Media Section */}
            <div className="text-center flex flex-col items-center md:w-1/4">
              <span className="text-lg font-semibold mb-1">Social</span>
              <div className="flex justify-center items-center mt-1">
                <Socials />
                <SocialMobile />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center py-4 text-sm">
          &copy; 2024 Modern Mannerism |
          <span
            onClick={navigateToPrivacyPolicy}
            className="px-1 cursor-pointer"
          >
            Privacy-Policy
          </span>
          | <span
            onClick={navigateToTerms}
            className="px-1 cursor-pointer"
          >
            Terms
          </span> | Designed by Harsh
        </div>
      </footer>
    </>
  );
};

export default Footer;
