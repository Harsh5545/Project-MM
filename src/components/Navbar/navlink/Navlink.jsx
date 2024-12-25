"use client";

import Link from "next/link";
import StyleSheet from "./Navlink.module.css"
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

const Navlink = ({ item }) => {
    const { theme } = useTheme();
    const pathName = usePathname();
    const isActive = pathName === item.path;
    return (
        <Link href={item.path}
            className={`${StyleSheet.container} 
            ${isActive && theme === "dark"
                    ? StyleSheet.darkActive : isActive
                        ? StyleSheet.lightActive : ""}`}
            prefetch={false}
        >
            {item.title}
        </Link>
    )
}

export default Navlink;