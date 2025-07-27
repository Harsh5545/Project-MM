import { Geist, Geist_Mono } from "next/font/google"
import "../globals.css"
import { auth } from "@/auth"
import Footer from "@/components/footer/Footer"
import Header from "@/components/Navbar/Navbar"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react"
import Script from "next/script"
import EmailPopup from "@/components/EmailPopup/EmailPopup" // Updated import path
import PushNotificationManager from "@/components/PushNotificationManager/PushNotificationManager" // Updated import path
import LoadingScreen from "@/components/loading-screen" // Import the new component
import OpenInExternalBrowser from "@/components/open-in-external-browser"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: {
    template: "Modern Mannerism | %s",
  },
  icons: {
    icon: "/MM.png", // Path to your logo in the public directory
    shortcut: "/MM.png",
    apple: "/MM.png",
  },
}

export default async function RootLayout({ children }) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "q24bu9sz4y");`,
          }}
        />
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <LoadingScreen />
          <OpenInExternalBrowser />
          {/* Add this line */}
          <div className="flex flex-col">
            <Header />
            <div className="flex-grow">
              {children}
              <Toaster />
              <EmailPopup />
              <PushNotificationManager />
            </div>
            <Footer />
          </div>
        </body>
      </html>
    </SessionProvider>
  )
}
