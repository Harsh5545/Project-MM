import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandYoutube,
  IconBrandMedium,
} from "@tabler/icons-react";

const Socials = () => {
  const links = [
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/k-manasi/",
    },
    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.instagram.com/modernmannerism/",
    },
    {
      title: "Facebook",
      icon: (
        <IconBrandFacebook className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.facebook.com/modernmannerism/",
    },
    {
      title: "YouTube",
      icon: (
        <IconBrandYoutube className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.youtube.com/@modernmannerism",
    },
    {
      title: "Medium",
      icon: (
        <IconBrandMedium className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://medium.com/@modernmannerism",
    },
  ];

  return (
    <div className="md:flex hidden items-center justify-center">
      <FloatingDock
        mobileClassName="translate-y-20"
        items={links}
      />
    </div>
  );
};

export default Socials;
