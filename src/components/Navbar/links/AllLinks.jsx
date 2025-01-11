import React, { useState, useEffect, useRef } from "react";
import Navlink from "../navlink/Navlink";
import { useRouter } from "next/navigation";

const AllLinks = ({onClose}) => {
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
      // subLinks: [
      //   { title: "Consultation", path: "/servicestation" },
      //   {
      //     title: "Personality Transformation",
      //     path: "/servicesality-transformation",
      //     subLinks: [
      //       {
      //         title: "Personality Transformation for Men",
      //         path: "/servicesality-transformation/Men",
      //       },
      //       {
      //         title: "Personality Transformation for Women",
      //         path: "/servicesality-transformation/Women",
      //       },
      //     ],
      //   },
      //   {
      //     title: "Corporate Grooming",
      //     path: "/servicesate-grooming",
      //     subLinks: [
      //       {
      //         title: "Bespoke Business Etiquette & Corporate Grooming",
      //         path: "/servicese-business-etiquette-&-corporate-grooming",
      //       },
      //       {
      //         title: "In-house Corporate Training",
      //         path: "/servicesse-Corporate-Training",
      //       },
      //     ],
      //   },
      //   { title: "Children's Etiquette", path: "/services/3"},
      //   { title: "Young Adult Etiquette", path: "/servicesadult-etiquette" },
      //   {
      //     title: "Latest Workshop",
      //     path: "/services-workshop",
      //     subLinks: [
      //       {
      //         title: "Ladies Grooming & Social Etiquette Programme",
      //         path: "/services-workshop/ladies-grooming",
      //       },
      //       {
      //         title: "Young Adult-Grooming & Etiquette",
      //         path: "/services-workshop/young-adult-grooming",
      //       },
      //       {
      //         title: "Young Adult Training",
      //         path: "/services-workshop/young-adult",
      //       },
      //       {
      //         title: "Dining Etiquette Workshop",
      //         path: "/services-workshop/dining-etiquette",
      //       },
      //     ],
      //   },
      //   // { title: "Train the Trainer", path: "/service/train-the-trainer" },
      // ],
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

  return (
    <div className={`flex ${isMobile ? "flex-col space-y-4" : "flex-row space-x-6"} justify-center items-center`}>
      {links.map((link, i) => (
        <div key={i} className="relative">
          {!link.subLinks ? (
          <div onClick={()=>{
            if(isMobile) {
              onClose()
            }
          }}>
            <Navlink item={link}/>
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
                    router.push(link.path); // Directly navigate on mobile
                    onClose()
                  } else {
                    setOpenDropdown(!openDropdown);
                  }
                }}
              >
                {link.title}
                {!isMobile && ( // Show dropdown arrow only for desktop view
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
                        onClick={() => router.push(subLink.path)}
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
