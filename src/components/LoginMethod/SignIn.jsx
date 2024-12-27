"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AlertCircle } from "lucide-react";1
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// import { doCredentialLogin } from "@/app/actions";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email || !password) {
        setError("All fields are required.");
        setLoading(false);
        return;
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email address.");
        setLoading(false);
        return;
      }

      const formData = new FormData(event.currentTarget);
      const response = await doCredentialLogin(formData);
      console.log(response);
      if (!!response.error) {
        setError(response.error.message);
      } else {
        router.push("/"); // Redirect after successful login
      }
    } catch (e) {
      console.error(e);
      setError("Invalid credentials, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row space-x-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full md:w-[60%]">
        {/* Image Section */}
        <div className="w-full flex justify-center items-center mb-6 md:mb-0">
          <Image
            src="/assets/ManasiLogin.jpg"
            alt="Modern Login Page"
            width={300}
            height={300}
            className="object-cover rounded-lg"
          />
        </div>

        {/* Form Section */}
        <div className="w-full">
          <h1 className="text-3xl tracking-widest font-extrabold text-center mb-6 bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] text-transparent bg-clip-text">
            Welcome Back
          </h1>

          {error && (
            <div className="flex items-center text-red-500 bg-red-100 p-3 rounded mb-4">
              <AlertCircle className="mr-2" size={20} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 dark:text-gray-200 mb-2">
                Password
              </label>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-2 rounded-lg text-white font-bold"
              disabled={loading}
              variant={loading ? "outline" : "default"}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => router.push("/register")}
              className="text-[#c3965d] font-bold hover:underline"
            >
              New here? Create an account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
