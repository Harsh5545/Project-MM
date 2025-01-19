"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Moon, Sun } from "lucide-react"; // Icons from ShadCN

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
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="flex items-center gap-2"
    >
      {currentTheme === "light" ? (
        <>
          <Moon className="w-4 h-4" />
          <span>Dark Mode</span>
        </>
      ) : (
        <>
          <Sun className="w-4 h-4" />
          <span>Light Mode</span>
        </>
      )}
    </Button>
  );
}
