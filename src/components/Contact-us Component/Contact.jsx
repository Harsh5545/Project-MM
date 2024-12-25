"use client";

import { useState } from "react";

const ContactPage = () => {
  const [theme, setTheme] = useState("light");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
    agree: false,
  });
  const [showDialog, setShowDialog] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("Please click the checkbox to agree.");
      return;
    }
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    // Reset form data
    setFormData({
      name: "",
      email: "",
      phone: "",
      course: "",
      message: "",
      agree: false,
    });
  };

  return (
    <div
      className={`relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat pt-[120px] md:pt-[150px] ${
        theme === "dark" ? "dark" : ""
      }`}
      style={{
        backgroundImage: `url("/assets/${
          theme === "dark" ? "dark-image.jpg" : "Contact-us-pink.jpg"
        }")`,
      }}
    >
      <div className="flex flex-col justify-between m-2 md:flex-row w-full md:max-w-6xl bg-opacity-80 bg-white dark:bg-opacity-90 dark:bg-[#06273A] rounded-lg shadow-lg">
        {/* Left Section (Desktop Only) */}
        <div className="hidden md:flex flex-1 p-8">
          <div className="flex flex-col justify-between">
            <h1 className="text-4xl text-center">Our Team will reach out to you!</h1>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mr-2"
                required
              />
              I agree to receive marketing materials from Modern Mannerism.
            </label>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 p-4 md:p-8">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name and Surname"
              required
              className="w-full p-2 md:p-4 rounded-md bg-gray-100 dark:bg-[#0C1522] dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#933469]"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full p-2 md:p-4 rounded-md bg-gray-100 dark:bg-[#0C1522] dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#933469]"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number (Optional)"
              className="w-full p-2 md:p-4 rounded-md bg-gray-100 dark:bg-[#0C1522] dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#933469]"
            />

            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full p-2 md:p-4 rounded-md bg-gray-100 dark:bg-[#0C1522] dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#933469]"
              required
            >
              <option value="" disabled>Select a Course</option>
              <option value="personal-branding">Personal Branding</option>
              <option value="communication-skills">Communication Skills</option>
              <option value="corporate-etiquette">Corporate Etiquette</option>
              <option value="fine-dining-manners">Fine Dining Manners</option>
            </select>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows="5"
              className="w-full p-2 md:p-4 rounded-md bg-gray-100 dark:bg-[#0C1522] dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#933469]"
            ></textarea>
            
            <label className="md:hidden flex items-center">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mr-2"
                required
              />
              I agree to receive marketing materials from Modern Mannerism.
            </label>

            <button
              type="submit"
              className="w-full py-3 text-white bg-[#933469] hover:bg-[#721a53] rounded-md transition-colors duration-300"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Custom Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-[#0C1522] p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Thank You, {formData.name}!</h2>
            <p>Our team will reach you as soon as possible.</p>
            <button
              onClick={handleCloseDialog}
              className="mt-4 py-2 px-4 bg-[#933469] text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
