import React, { useState, useEffect, useRef } from "react";
import Navlink from "../navlink/Navlink";
import { useRouter } from "next/navigation";

const AllLinks = ({ onClose }) => {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [hoveredSubLink, setHoveredSubLink] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const closeTimeoutRef = useRef(null);

  const links = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about-us" },
    {
      title: "Services",
      path: "/services",
    },
    { title: "Blog", path: "/blogs" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(false);
      setHoveredSubLink(null);
    }, 300); // Delay of 300ms to avoid flickering
  };

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setOpenDropdown(true);
  };

  const handleSubLinkMouseEnter = (title) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setHoveredSubLink(title);
  };

  const handleSubLinkMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setHoveredSubLink(null);
    }, 300); // Delay to prevent the flicker
  };

  const handleLinkClick = (path) => {
    router.push(path);
    if (isMobile) {
      onClose();
    }
  };

  return (
    <div className={`flex ${isMobile ? "flex-col space-y-6" : "flex-row space-x-6"} justify-center items-center`}>
      {links.map((link, i) => (
        <div key={i} className="relative">
          {!link.subLinks ? (
            <div onClick={() => handleLinkClick(link.path)}>
              <Navlink item={link} />
            </div>
          ) : (
            <div
              className="inline-block"
              onMouseEnter={!isMobile ? handleMouseEnter : undefined}
              onMouseLeave={!isMobile ? handleMouseLeave : undefined}
            >
              <button
                className="font-medium text-base cursor-pointer flex items-center"
                onClick={() => {
                  if (isMobile) {
                    handleLinkClick(link.path);
                  } else {
                    setOpenDropdown(!openDropdown);
                  }
                }}
              >
                {link.title}
                {!isMobile && ( 
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                )}
              </button>

              {!isMobile && openDropdown && (
                <div className="absolute mt-2 bg-opacity-60 bg-black rounded-lg shadow-lg z-10">
                  {link.subLinks.map((subLink, j) => (
                    <div
                      key={j}
                      className="relative group"
                      onMouseEnter={() => handleSubLinkMouseEnter(subLink.title)}
                      // onMouseLeave={handleSubLinkMouseLeave}
                    >
                      <button
                        className="block px-4 py-2 text-sm font-semibold text-left w-full text-nowrap"
                        onClick={() => handleLinkClick(subLink.path)}
                      >
                        {subLink.title}
                      </button>

                      {hoveredSubLink === subLink.title && subLink.subLinks && (
                        <div
                          className="absolute left-60 top-0 w-60 bg-opacity-60 bg-black shadow-lg rounded-lg"
                          onMouseEnter={() => handleSubLinkMouseEnter(subLink.title)}
                          onMouseLeave={handleSubLinkMouseLeave}
                        >
                          <div className="flex flex-col">
                            {subLink.subLinks.map((nestedLink, k) => (
                              <Navlink key={k} item={nestedLink} className="block px-4 py-2 text-sm font-semibold" />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllLinks;