"use client";
import React, { useState } from "react";
import Image from "next/image";
import ShadcnButton from "../Atom/button/ShadcnButton";
import { Input, Textarea, Select, SelectItem, SelectTrigger, SelectContent, SelectLabel } from "shadcn";

const HomeConsultation = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    });
  };

  return (
    <div className="flex flex-col items-center dark:bg-[#00001F] p-8 md:p-24 gap-10 justify-center">
      <h1 className="text-2xl md:text-4xl text-center font-semibold text-gray-800 dark:text-white">
        Book Your Consultation Now
        <hr className="border-t-2  border-[#eabf91] w-1/4 mx-auto mt-2" />
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl gap-8">
        <Image
          src="/assets/course2.jpg"
          alt="Modern Mannerism Consultation"
          width={400}
          height={400}
          className="rounded-lg shadow-md"
        />

        <form onSubmit={handleSubmit} className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name *"
              required
              className="w-full"
            />
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone *"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              required
              className="w-full"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email *"
              required
              className="w-full"
            />
            <Select
              value={formData.service}
              onValueChange={(value) => setFormData({ ...formData, service: value })}
              required
              className="w-full"
            >
              <SelectTrigger className="p-3 w-full">
                <SelectLabel>Select Service</SelectLabel>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Select Service</SelectItem>
                <SelectItem value="Personality Enhancement Programme">Personality Enhancement Programme</SelectItem>
                <SelectItem value="Business Etiquette & Corporate Image Programme">Business Etiquette & Corporate Image Programme</SelectItem>
                <SelectItem value="Children’s Etiquette Programme">Children’s Etiquette Programme</SelectItem>
                <SelectItem value="Ladies Grooming & Image Enhancement Programme">Ladies Grooming & Image Enhancement Programme</SelectItem>
                <SelectItem value="Fine Dining & Table Etiquette">Fine Dining & Table Etiquette</SelectItem>
                <SelectItem value="Young Adult Finishing Programme">Young Adult Finishing Programme</SelectItem>
                <SelectItem value="Communication & Soft Skills Training">Communication & Soft Skills Training</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Message"
              required
              className="w-full"
            />
          </div>
          <ShadcnButton
            type="submit"
            className="w-full bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] text-white p-3 rounded-lg hover:bg-[#eabf91] transition-all duration-300"
          >
            Submit
          </ShadcnButton>
        </form>
      </div>
    </div>
  );
};

export default HomeConsultation;
