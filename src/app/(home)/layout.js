import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { auth } from "@/auth";
import Footer from "@/components/footer/Footer";
import Header from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Modern Mannerism",
    template: "%s | Modern Mannerism",
  },
};




export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
          <div className="flex flex-col">
            <Header />
            <div className="flex-grow">
              {children}
              <Toaster />
            </div>
            <Footer />
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
