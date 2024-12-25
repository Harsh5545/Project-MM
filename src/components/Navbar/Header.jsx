"use client";

import  { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import "./navbar.module.css"
import "./Header.css"
import HeaderFixed from "./HeaderFixed.jsx";
import HeaderDefault from "./HeaderDefault.jsx";


function Header() {
  const [isScrollPast, setIsScrollPast] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 200) {
      setIsScrollPast(true);
      
    } else {
      setIsScrollPast(false);
      
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isScrollPast ? <HeaderFixed  key="navbar-fixed" /> : <HeaderDefault />}
      </AnimatePresence>
    </>
  );
}

export default Header;
