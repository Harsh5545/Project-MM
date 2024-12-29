"use client"
import { doCredentialLogin } from "@/Actions";
import { signIn } from "@/auth";
import { useState } from "react";
export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    // "use server"
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
      // const response = await signIn("credentials", formData);
      const response = await doCredentialLogin(formData);
      if (response.error) {
        setError(response.error.message);
      } else {
        // Handle successful login
      }
    } catch (e) {
      console.error(e);
      setError("Invalid credentials, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900  flex items-center justify-center py-12">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Sign In</h2>
        {error && (
          <div className="text-red-500 text-center mb-4 bg-red-100 p-3 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c3965d] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c3965d] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white font-bold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : " bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] hover:bg-[#c3965d]"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}



// import { signIn } from "@/auth"



// export function LoginForm() {

//   return (

//     <form
//       action={async (formData) => {
//         "use server"
//         await signIn("credentials", formData)
//       }}
//     >
//       <label>
//         Email
//         <input name="email" type="email" />
//       </label>
//       <label>
//         Password
//         <input name="password" type="password" />
//       </label>
//       <button>Sign In</button>
//     </form>

//   )

// }