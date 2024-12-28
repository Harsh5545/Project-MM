'use client';
import Link from "next/link";
import { CircleUser, Home, LineChart, Menu, Package, Package2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import dynamic from 'next/dynamic';
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "@/auth";
import SignOutPage, { SignOut } from "@/components/SignOut";


// Create a dynamic import for the main content
const DynamicMainContent = dynamic(() => import('./MainContent'), {
  loading: () => <LoadingSpinner />,
});

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <div className="w-12 h-12 border-t-4 border-b-4 border-yellow-300 rounded-full animate-spin"></div>
        <div className="w-12 h-12 border-t-4 border-b-4 border-yellow-300 rounded-full animate-ping absolute top-0 left-0 opacity-30"></div>
      </div>
    </div>
  );
}

export function Dashboard({ children, session }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (url) => {
    router.push(url);
  };

  const linkData = {
    Admin: [
      { href: "/admin/category", text: "Category", icon: Home },
      { href: "/admin/blog", text: "Blogs", icon: Package },
      { href: "/admin/users", text: "Users", icon: Package },
      { href: "/admin/services", text: "Services", icon: Users },
      { href: "/admin/events", text: "Events", icon: Users },
    ],
    User: [
      { href: "/admin/category", text: "Category", icon: Home },
      { href: "/admin/blog", text: "Blogs", icon: Package },
      { href: "/admin/users", text: "Users", icon: Package },
      { href: "/admin/services", text: "Services", icon: Users },
      { href: "/user", text: "Products", icon: Package },
      { href: "/user/profile", text: "Customers", icon: Users },
      { href: "/user/courses", text: "Analytics", icon: LineChart },
    ]
  };

  const roleLinks = linkData[session?.user?.role] || [];
  const commonLinks = linkData.common;

  function getInitials(name) {
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
    return initials;
  }
  console.log(pathname)
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-gray-100">
      <div className="hidden border-r bg-white shadow-md md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-24 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-gray-50">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="text-lg">
                <Image
                  src="/assets/MM.png"
                  width={300}
                  height={300}
                  className="md:max-w-[8rem] max-w-[6rem]"
                  alt="ModernMannerism logo"
                  priority
                />
              </span>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {roleLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${pathname === link.href
                    ? "bg-purple-600 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.text}
                  {link.badge && (
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-white shadow-md px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                {roleLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-colors ${link.isActive
                      ? "bg-gray-200 text-gray-900"
                      : "text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.text}
                    {link.badge && (
                      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        {link.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
                <SignOut/>
          </div>
          <Button variant="primary" size="icon" className="border border-primary mx-2 py-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        </header>
        <Suspense fallback={<LoadingSpinner />}>
          <main className="flex-1 p-4 bg-white shadow-md rounded-lg m-4">
            <DynamicMainContent>{children}</DynamicMainContent>
          </main>
        </Suspense>
      </div>
    </div>
  );
}