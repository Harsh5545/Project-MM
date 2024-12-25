// src/components/NavbarWrapper.js
"use client"; // Use client-side rendering for this component

import { usePathname } from "next/navigation"; // Import usePathname to check the current path
import Navbar from "@/components/navbar/Navbar";
import AdminNavbar from "./AdminNavbar/AdminNavbar"; // Import the Admin Navbar
import AdminDashboard from "../admin/Dashboard/Dashboard";

const NavbarWrapper = () => {
    const pathname = usePathname(); // Get the current pathname

    // Check if the current path is an admin route
    const isAdminRoute = pathname.startsWith("/admin");

    return (
        <>  
            {isAdminRoute ? <AdminDashboard /> : <Navbar />}
        </>
    );
};

export default NavbarWrapper;
