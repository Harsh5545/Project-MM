import React from "react";
import {
  IconBrandGithub,
  IconBrandX,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandYoutube,
  IconBrandMedium,
} from "@tabler/icons-react";

const SocialMobile = () => {
  const links = [
    {
     
      title: "LinkedIn",
      icon: <IconBrandLinkedin className="h-10 w-10 text-[#c3965d] dark:text-neutral-300" />,
      href: "https://www.linkedin.com/in/k-manasi/",
    },
    {
      title: "Instagram",
      icon: <IconBrandInstagram className="h-10 w-10 text-[#c3965d] dark:text-neutral-300" />,
      href: "https://www.instagram.com/modernmannerism/",
    },
    {
      title: "Facebook",
      icon: <IconBrandFacebook className="h-10 w-10 text-[#c3965d] dark:text-neutral-300" />,
      href: "https://www.facebook.com/modernmannerism/",
    },
    {
      title: "YouTube",
      icon: <IconBrandYoutube className="h-10 w-10 text-[#c3965d] dark:text-neutral-300" />,
      href: "www.youtube.com/@modernmannerism",
    },
    {
      title: "Medium",
      icon: <IconBrandMedium className="h-10 w-10 text-[#c3965d] dark:text-neutral-300" />,
      href: "https://medium.com/@modernmannerism",
    },
    
  ];

  return (
    <ul className="lg:hidden flex justify-center mt-0 lg:mt-5 space-x-4 md:space-x-2">
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.href} className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
            {link.icon}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialMobile;