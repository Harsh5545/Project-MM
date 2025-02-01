import { Geist, Geist_Mono } from "next/font/google";
import { Dashboard } from "@/components/Admin-Components/Dashboard/Dashboard";
import { auth } from "@/auth";
import "../globals.css";
import { redirect } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";

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
        default: "Admin",
        template: "Admin | %s",
    },
};

export default async function Layout({ children }) {
    const session = await auth();
    if (session?.user?.role === 'User') {
        redirect('/user');
    }
    if (session?.user?.role !== 'Admin') {
        redirect('/sign-in');
    }
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {/* <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                    suppressHydrationWarning={true}
                > */}
                <Dashboard session={session}>
                    {children}
                    <Toaster />
                </Dashboard>
                {/* </ThemeProvider> */}
            </body>
        </html>
    );
}