"use client";
import React, { useState } from "react";
import Image from "next/image";
import ShadcnButton from "../Atom/button/ShadcnButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      service: undefined, // Reset value
      message: "",
    });
  };

  return (
    <div className="flex flex-col items-center dark:bg-[#00001F] p-8 md:py-36 md:px-16 gap-10 justify-center">
      <h1 className="text-2xl md:text-4xl text-center font-semibold text-gray-800 dark:text-white">
        Book Your Consultation Now
        <hr className="border-t-2  border-[#eabf91] w-1/4 mx-auto mt-2" />
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl gap-8">
        <Image
          src="/assets/course2.jpg"
          alt="Modern Mannerism Consultation"
          width={400}
          height={400}
          className="rounded-xl shadow-md" 
        />

        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl"
        >
          <div className="flex flex-col md:flex-row gap-6 ">
            <div className="w-full">
              <Label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name *
              </Label>
              <Input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone *
              </Label>
              <Input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
                className="w-full"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mb-4">
            <div className="w-full">
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Select Service *
              </Label>
              <Select
                id="service"
                value={formData.service || undefined}
                onValueChange={(value) =>
                  setFormData({ ...formData, service: value })
                }
                required
                className="w-full"
              >
                <SelectTrigger className="p-3 w-full">
                  {formData.service ? (
                    <span>{formData.service}</span>
                  ) : (
                    <span className="text-gray-400">Select Service</span>
                  )}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Personality Enhancement Programme">
                    Personality Enhancement Programme
                  </SelectItem>
                  <SelectItem value="Business Etiquette & Corporate Image Programme">
                    Business Etiquette & Corporate Image Programme
                  </SelectItem>
                  <SelectItem value="Children’s Etiquette Programme">
                    Children’s Etiquette Programme
                  </SelectItem>
                  <SelectItem value="Ladies Grooming & Image Enhancement Programme">
                    Ladies Grooming & Image Enhancement Programme
                  </SelectItem>
                  <SelectItem value="Fine Dining & Table Etiquette">
                    Fine Dining & Table Etiquette
                  </SelectItem>
                  <SelectItem value="Young Adult Finishing Programme">
                    Young Adult Finishing Programme
                  </SelectItem>
                  <SelectItem value="Communication & Soft Skills Training">
                    Communication & Soft Skills Training
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mb-4">
            <Label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Enter your message"
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
