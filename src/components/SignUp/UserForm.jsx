"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, User, Lock, Phone } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const UserForm = () => {
    const router = useRouter();
    const initialFormData = {
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        password: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errorMessage, setErrorMessage] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        password: "",
        global: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        setErrorMessage((prevState) => ({
            ...prevState,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage({});

        const errors = {};
        if (!formData.firstName) errors.firstName = "First Name is required.";
        if (!formData.lastName) errors.lastName = "Last Name is required.";
        if (!formData.email.includes("@")) errors.email = "Please enter a valid email.";
        if (formData.password.length < 8) errors.password = "Password must be at least 8 characters.";

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(formData.mobileNumber)) {
            errors.mobileNumber = "Please enter a valid 10-digit phone number.";
        }

        if (Object.keys(errors).length > 0) {
            setErrorMessage(errors);
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                const response = await res.json();
                setErrorMessage({ global: response.message || "User creation failed." });
            } else {
                setFormData(initialFormData);
            }
        } catch (error) {
            setErrorMessage({ global: "Something went wrong. Please try again later." });
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center py-12">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full md:w-[60%] flex flex-col md:flex-row space-x-6">
                <div className="w-full hidden md:flex justify-center items-center mb-6 md:mb-0">
                    <Image
                        src="/assets/manasiuser.jpg"
                        alt="Manasi Modern Mannerism"
                        width={200}
                        height={200}
                        className="object-cover rounded-lg"
                    />
                </div>
                <div className="md:w-full w-[90%]">
                    <h1 className="text-3xl md:p-8 px-0 py-4 text-center mb-6 bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] text-transparent bg-clip-text">
                        Create Your Account
                    </h1>
                    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <div>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={errorMessage.firstName ? "border-red-500" : ""}
                                />
                                {errorMessage.firstName && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errorMessage.firstName}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={errorMessage.lastName ? "border-red-500" : ""}
                                />
                                {errorMessage.lastName && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errorMessage.lastName}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Email"
                                type="email"
                                icon={<Mail size={18} />}
                                value={formData.email}
                                onChange={handleChange}
                                className={errorMessage.email ? "border-red-500" : ""}
                            />
                            {errorMessage.email && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errorMessage.email}
                                </p>
                            )}
                        </div>
                        <div>
                            <Input
                                id="mobileNumber"
                                name="mobileNumber"
                                placeholder="Mobile Number"
                                icon={<Phone size={18} />}
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                className={errorMessage.mobileNumber ? "border-red-500" : ""}
                            />
                            {errorMessage.mobileNumber && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errorMessage.mobileNumber}
                                </p>
                            )}
                        </div>
                        <div>
                            <Input
                                id="password"
                                name="password"
                                placeholder="Password"
                                type="password"
                                icon={<Lock size={18} />}
                                value={formData.password}
                                onChange={handleChange}
                                className={errorMessage.password ? "border-red-500" : ""}
                            />
                            {errorMessage.password && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errorMessage.password}
                                </p>
                            )}
                        </div>
                        <Button type="submit" className="tracking-widest bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] text-white">
                            Register
                        </Button>
                    </form>

                    {errorMessage.global && (
                        <p className="text-red-500 text-center mt-4">{errorMessage.global}</p>
                    )}

                    <div className="mt-6 text-center">
                        <Button
                            variant="ghost"
                            onClick={() => router.push("/sign-in")}
                            className="border border-[#eabf91] text-[#c3965d] font-bold hover:bg-[#eabf91] hover:text-white"
                        >
                            Already a member? Login
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserForm;
