"use client"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Cormorant_Garamond } from "next/font/google"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2 } from "lucide-react"

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const HomeConsultation = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Sample services - replace with your actual services
  const services = [
    "Personality Enhancement Programme",
    "Business Etiquette & Corporate Image",
    "Children's Etiquette Programme",
    "Fine Dining Etiquette Workshop",
    "Other Services",
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target

    // Validation for name field to not accept numbers
    if (name === "name" && /[0-9]/.test(value)) {
      return
    }

    // Validation for phone field to not accept alphabets
    if (name === "phone" && /[a-zA-Z]/.test(value)) {
      return
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset form after showing success message
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "",
          message: "",
        })
      }, 3000)
    }, 1500)
  }

  return (
    <section id="consultation" className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-12"
        >
          <h2 className={`${cormorantGaramond.className} text-center text-4xl font-bold text-gray-900 mb-4`}>
            Book Your Consultation
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-[#c3965d] to-[#eabf91] rounded-full"></div>
          <p className="text-gray-700 text-center max-w-2xl mt-4">
            Take the first step towards enhancing your personal and professional presence. Schedule a consultation with
            our expert coaches.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 w-full"
          >
            <div className="relative flex justify-center">
             <Image
                src="/assets/course2.jpg"
                alt="Modern Mannerism Consultation"
                width={500}
                height={500}
                className="rounded-lg shadow-xl object-cover"
              />
             </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 w-full"
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className={`${cormorantGaramond.className} text-2xl font-bold text-gray-900 mb-2`}>Thank You!</h3>
                <p className="text-gray-700">
                  Your consultation request has been submitted successfully. We'll contact you shortly to confirm your
                  appointment.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-700">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <Label htmlFor="email" className="text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                    className="mt-1"
                  />
                </div>

                <div className="mb-6">
                  <Label htmlFor="service" className="text-gray-700">
                    Service of Interest *
                  </Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                    required
                  >
                    <SelectTrigger id="service" className="mt-1">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-6">
                  <Label htmlFor="message" className="text-gray-700">
                    Your Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your specific needs or questions"
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#c3965d] to-[#eabf91] text-white py-3 rounded-lg hover:from-amber-800 hover:to-amber-600 transition-all duration-300"
                >
                  {isSubmitting ? "Submitting..." : "Book Consultation"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HomeConsultation

