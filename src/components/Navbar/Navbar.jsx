"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ShadcnButton from "../Atom/button/ShadcnButton";
import { Logo } from "@shadcn/ui"; // Assuming you want to use ShadCN logo component
import { Popover } from "@shadcn/ui";
import { Lato } from "next/font/google";

// Add font styles
const dm_Sans = Lato({
  subsets: ["latin"],
  weight: ["400"],
});

function Header() {
  const [isFixed, setIsFixed] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();

  // Listen to scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 100) {
        setIsFixed(true); // Make the navbar fixed after 100px of scroll
      } else {
        setIsFixed(false); // Navbar becomes scrollable again
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Scrollable Navbar */}
      <div
        className={`${
          isFixed ? "hidden" : "block"
        } fixed z-50 top-0 left-0 right-0 p-4 bg-black bg-opacity-75 justify-between items-center`}
      >
        <div className="flex items-center gap-4">
          <Logo /> {/* If using a logo component */}
          <a href="/" className="text-white font-semibold text-lg">
            Home
          </a>
          <a href="/about" className="text-white font-semibold text-lg">
            About
          </a>
          <a href="/services" className="text-white font-semibold text-lg">
            Services
          </a>
          <Popover>
            <Popover.Trigger>
              <Button auto>More</Button>
            </Popover.Trigger>
            <Popover.Content>
              <a href="/blog" className="block p-2">Blog</a>
              <a href="/contact" className="block p-2">Contact</a>
            </Popover.Content>
          </Popover>
        </div>
        <ShadcnButton
          className={`${dm_Sans.className} bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] text-white`}
          onClick={() => router.push("/contact")}
        >
          Contact Us
        </ShadcnButton>
      </div>

      {/* Fixed Navbar (Second) */}
      <div
        className={`${
          isFixed ? "block" : "hidden"
        } fixed z-50 top-0 left-0 right-0 p-4 bg-black bg-opacity-85 justify-between items-center`}
      >
        <div className="flex items-center gap-4">
          <Logo /> {/* If using a logo component */}
          <a href="/" className="text-white font-semibold text-lg">
            Home
          </a>
          <a href="/about" className="text-white font-semibold text-lg">
            About
          </a>
          <a href="/services" className="text-white font-semibold text-lg">
            Services
          </a>
          <Popover>
            <Popover.Trigger>
              <Button auto>More</Button>
            </Popover.Trigger>
            <Popover.Content>
              <a href="/blog" className="block p-2">Blog</a>
              <a href="/contact" className="block p-2">Contact</a>
            </Popover.Content>
          </Popover>
        </div>
        <ShadcnButton
          className={`${dm_Sans.className} bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] text-white`}
          onClick={() => router.push("/contact")}
        >
          Contact Us
        </ShadcnButton>
      </div>
    </div>
  );
}

export default Header;
