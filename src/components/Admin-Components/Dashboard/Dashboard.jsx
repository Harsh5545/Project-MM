'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import dynamic from 'next/dynamic';
import { useTheme } from "next-themes";
import { CircleUser, Home, LineChart, Menu, Package, Package2, Users, Sun, Moon, Settings, Bell, Search, LogOut, Calendar, BookOpen, DownloadCloud, BellRing } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SignOut } from '@/components/SignOut';

// Create a dynamic import for the main content
const DynamicMainContent = dynamic(() => import('./MainContent'), {
  loading: () => <LoadingSpinner />,
});

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div
            className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
          >
            <div
              className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
            ></div>
          </div>
        </div>

      </div>
    </div>
  );
}


export function Dashboard({ children, session }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const linkData = {
    Admin: [
      { href: "/admin", text: "Dashboard", icon: Home },
      { href: "/admin/category", text: "Category", icon: Package2 },
      { href: "/admin/blog", text: "Blogs", icon: Package },
      { href: "/admin/users", text: "Users", icon: Users },
      { href: "/admin/services", text: "Services", icon: Settings },
      { href: "/admin/events", text: "Events", icon: Calendar },
      { href: "/admin/download-data", text: "Downloads ", icon: DownloadCloud },
      { href: "/admin/send-notification", text: "Send Notification", icon: BellRing }
    ],
    User: [
      { href: "/user/dashboard", text: "Dashboard", icon: Home },
      { href: "/user/products", text: "Products", icon: Package },
      { href: "/user/profile", text: "Profile", icon: CircleUser },
      { href: "/user/courses", text: "Courses", icon: BookOpen },
      { href: "/user/analytics", text: "Analytics", icon: LineChart },
    ]
  };

  const roleLinks = linkData[session?.user?.role] || [];

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`grid min-h-screen w-full lg:grid-cols-[280px_1fr] ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className="hidden lg:block bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <Sidebar roleLinks={roleLinks} pathname={pathname} closeSidebar={closeSidebar} />
      </div>

      {/* Main content area */}
      <div className="flex flex-col">
        <Header
          setIsSidebarOpen={setIsSidebarOpen}
          theme={theme}
          setTheme={setTheme}
          session={session}
        />

        {/* Mobile Sidebar */}
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetContent side="left" className="p-0 w-[280px]">
            <Sidebar roleLinks={roleLinks} pathname={pathname} closeSidebar={closeSidebar} />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <Suspense fallback={<LoadingSpinner />}>
          <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 p-4 shadow-lg border m-2 rounded-lg">
            <div className="container mx-auto">
              <DynamicMainContent>{children}</DynamicMainContent>
            </div>
          </main>
        </Suspense>
      </div>
    </div>
  );
}

function Sidebar({ roleLinks, pathname, closeSidebar }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b border-gray-200 dark:border-gray-700 px-4">
        <Link href="/admin" className="flex items-center gap-2 font-semibold" onClick={closeSidebar}>
          <Image
            src="/assets/MM.png"
            width={120}
            height={40}
            alt="ModernMannerism logo"
            priority
          />
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {roleLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all transform duration-300 ease-in-out relative ${pathname === link.href
              ? "bg-[#b2ec5d] text-black border-2 border-[#FFD700] animate-glow scale-105"
              : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            onClick={closeSidebar}
          >
            <link.icon className="h-5 w-5" />
            {link.text}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function Header({ setIsSidebarOpen, theme, setTheme, session }) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-white dark:bg-gray-800 px-4 shadow-sm">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>

      <div className="flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-gray-100 dark:bg-gray-700 pl-8 "
            />
          </div>
        </form>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle theme</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Notifications</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
              <AvatarFallback>{getInitials(session?.user?.name || '')}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{session?.user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={"/admin/profile"}>
              <CircleUser className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut />
            <SignOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

function getInitials(name) {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .join('');
}