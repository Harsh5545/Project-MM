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
      icon: <IconBrandLinkedin className="h-10 w-10 text-neutral-500 dark:text-neutral-300" />,
      href: "https://www.linkedin.com",
    },
    {
      title: "Instagram",
      icon: <IconBrandInstagram className="h-10 w-10 text-neutral-500 dark:text-neutral-300" />,
      href: "https://www.instagram.com",
    },
    {
      title: "Facebook",
      icon: <IconBrandFacebook className="h-10 w-10 text-neutral-500 dark:text-neutral-300" />,
      href: "https://www.facebook.com",
    },
    {
      title: "YouTube",
      icon: <IconBrandYoutube className="h-10 w-10 text-neutral-500 dark:text-neutral-300" />,
      href: "https://www.youtube.com",
    },
    {
      title: "Medium",
      icon: <IconBrandMedium className="h-10 w-10 text-neutral-500 dark:text-neutral-300" />,
      href: "https://www.medium.com",
    },
    
  ];

  return (
    <ul className="md:hidden flex justify-center mt-5 space-x-5">
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