"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import style from "./theme.module.css";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, systemTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        if (theme === "system") {
            setTheme(systemTheme === "light" ? "dark" : "light");
        } else {
            setTheme(theme === "light" ? "dark" : "light");
        }
    };

    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    return (
        <div className={style.checkboxWrapper5}>
            <div className={style.check}>
                <input
                    checked={currentTheme === "light"}
                    id="check-5"
                    type="checkbox"
                    readOnly
                />
                <label htmlFor="check-5" onClick={toggleTheme}></label>
            </div>
        </div>
    );
}
