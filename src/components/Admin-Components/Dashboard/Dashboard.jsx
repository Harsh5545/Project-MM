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
import LogoutButton from "@/components/LoginMethod/LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useAuth, UserButton, useUser } from '@clerk/nextjs'


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


export function Dashboard({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (url) => {
    router.push(url);
  };
  const { isLoaded, isSignedIn, user } = useUser();
  console.log(isLoaded,isSignedIn,user)
  const linkData = {
    admin: [
      { href: "/admin/category", text: "Category", icon: Home },
      { href: "/admin/blog", text: "Blogs", icon: Package },
      { href: "/admin/users", text: "Users", icon: Package },
      { href: "/admin/services", text: "Services", icon: Users },
      { href: "/admin/events", text: "Events", icon: Users },
    ],
    user: [
      { href: "/user", text: "Products", icon: Package },
      { href: "/user/profile", text: "Customers", icon: Users },
      { href: "/user/courses", text: "Analytics", icon: LineChart },
    ]
  };

  const roleLinks = linkData[user?.role] || linkData['user'];
  const commonLinks = linkData.common;


  function getInitials(name) {
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
    return initials;
  }
  console.log(pathname)
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="font-bold text-yellow-300">Modern Mannerisim</span>
            </Link>

          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {roleLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${pathname === link.href
                    ? "bg-red-500 text-primary"
                    : "text-muted-foreground hover:text-primary"
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
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground"
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
            <form>

            </form>
          </div>
          <Button variant="primary" size="icon" className="border border-primary mx-2 py-2">
            <UserButton />
          </Button>
        </header>
        <Suspense fallback={<LoadingSpinner />}>
          <main className="flex-1 p-4">
            <DynamicMainContent>{children}</DynamicMainContent>
          </main>
        </Suspense>
      </div>
    </div>
  );
}
