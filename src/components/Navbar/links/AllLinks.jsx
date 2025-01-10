import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { ChevronDown } from 'lucide-react';

const AllLinks = ({ onClose, onNavigate }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 768px) and (max-width: 1023px)" });

  const links = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about-us" },
    {
      title: "Services",
      path: "/services",
      subLinks: [
        { title: "Consultation", path: "/servicestation" },
        {
          title: "Personality Transformation",
          path: "/servicesality-transformation",
          subLinks: [
            { title: "For Men", path: "/servicesality-transformation/Men" },
            { title: "For Women", path: "/servicesality-transformation/Women" },
          ],
        },
        {
          title: "Corporate Grooming",
          path: "/servicesate-grooming",
          subLinks: [
            { title: "Business Etiquette", path: "/servicese-business-etiquette-&-corporate-grooming" },
            { title: "In-house Training", path: "/servicesse-Corporate-Training" },
          ],
        },
        { title: "Children's Etiquette", path: "/services/3" },
        { title: "Young Adult Etiquette", path: "/servicesadult-etiquette" },
        {
          title: "Latest Workshop",
          path: "/services-workshop",
          subLinks: [
            { title: "Ladies Grooming", path: "/services-workshop/ladies-grooming" },
            { title: "Young Adult Grooming", path: "/services-workshop/young-adult-grooming" },
            { title: "Young Adult Training", path: "/services-workshop/young-adult" },
            { title: "Dining Etiquette", path: "/services-workshop/dining-etiquette" },
          ],
        },
      ],
    },
    { title: "Blog", path: "/blogs" },
  ];

  const handleDropdownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleLinkClick = (path) => {
    onNavigate(path);
    if (onClose) onClose();
  };

  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.2,
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      }
    },
  };

  return (
    <nav className={`${isMobile || isTablet ? 'space-y-4' : 'space-x-6'} flex ${isMobile || isTablet ? 'flex-col' : 'flex-row'}`}>
      {links.map((link, i) => (
        <div key={i} className="relative group">
          {!link.subLinks ? (
            <button
              onClick={() => handleLinkClick(link.path)}
              className="font-medium text-base cursor-pointer hover:text-primary transition-colors duration-200"
            >
              {link.title}
            </button>
          ) : (
            <div>
              <button
                className="font-medium text-base cursor-pointer flex items-center group hover:text-primary transition-colors duration-200"
                onClick={() => handleDropdownToggle(i)}
                aria-expanded={openDropdown === i}
              >
                {link.title}
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${openDropdown === i ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {((isMobile || isTablet) && openDropdown === i) || (!isMobile && !isTablet && (openDropdown === i || (!isMobile && !isTablet))) ? (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className={`${isMobile || isTablet ? 'mt-2' : 'absolute mt-2 left-0'} bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 ${isMobile || isTablet ? 'w-full' : 'w-56'}`}
                  >
                    {link.subLinks.map((subLink, j) => (
                      <div key={j} className="relative group">
                        <button
                          className="block px-4 py-2 text-sm font-semibold text-left w-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                          onClick={() => handleLinkClick(subLink.path)}
                        >
                          {subLink.title}
                        </button>

                        {subLink.subLinks && (
                          <div className={`${isMobile || isTablet ? 'ml-4' : 'absolute left-full top-0'} bg-white dark:bg-gray-800 rounded-lg shadow-lg ${isMobile || isTablet ? 'w-full' : 'w-56'}`}>
                            {subLink.subLinks.map((nestedLink, k) => (
                              <button
                                key={k}
                                className="block px-4 py-2 text-sm font-semibold w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                onClick={() => handleLinkClick(nestedLink.path)}
                              >
                                {nestedLink.title}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default AllLinks;
