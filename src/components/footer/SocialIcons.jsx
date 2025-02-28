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
        <IconBrandLinkedin className="h-72 w-72  text-[#c3965d] hover:text-[#eabf91]" />
      ),
      href: "https://www.linkedin.com/in/k-manasi/",
    },
    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram className="h-72 w-72 text-[#c3965d] hover:text-[#eabf91]" />
      ),
      href: "https://www.instagram.com/modernmannerism/",
    },
    {
      title: "Facebook",
      icon: (
        <IconBrandFacebook className="h-72 w-72 text-[#c3965d] hover:text-[#eabf91]" />
      ),
      href: "https://www.facebook.com/modernmannerism/",
    },
    {
      title: "YouTube",
      icon: (
        <IconBrandYoutube className="h-72 w-72 text-[#c3965d] hover:text-[#eabf91]" />
      ),
      href: "https://www.youtube.com/@modernmannerism",
    },
    {
      title: "Medium",
      icon: (
        <IconBrandMedium className="h-72 w-72 text-[#c3965d] hover:text-[#eabf91]" />
      ),
      href: "https://medium.com/@modernmannerism",
    },
  ];

  return (
    <div className="lg:flex hidden  items-center justify-center">
      <FloatingDock
        mobileClassName="translate-y-20 "
        items={links}
        iconWrapperClassName="bg-[#c3965d] bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] p-2 rounded-full"
      />
    </div>
  );
};

export default Socials;
