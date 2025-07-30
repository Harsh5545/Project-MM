"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Check, Instagram, Linkedin, Facebook, BookOpen, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  course: z.string({ required_error: "Please select a course" }),
  message: z.string().optional(),
  agree: z.boolean().refine((val) => val === true, {
    message: "You must agree to receive marketing materials",
  }),
})

export default function ContactForm() {
  const [theme, setTheme] = useState("light")
  const [showDialog, setShowDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      course: "",
      message: "",
      agree: false,
    },
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setFormData(data)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setShowDialog(true)
        form.reset()
      } else {
        console.error("Form submission failed")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseDialog = () => {
    setShowDialog(false)
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div
      className={`relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat pt-[80px] md:pt-[120px] ${theme === "dark" ? "dark" : ""
        }`}
      style={{
        backgroundImage: `url("/assets/${theme === "dark" ? "dark-image.jpg" : "ContactUsBg.jpg"}")`,
      }}
    >
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col-reverse md:flex-row bg-white dark:bg-[#06273A] bg-opacity-90 dark:bg-opacity-90 rounded-xl shadow-xl overflow-hidden">
          {/* Left Section - Info */}
          <div className="w-full md:w-2/5 p-6 md:p-8 hidden md:flex flex-col justify-between bg-gradient-to-br from-[#c3965d]/10 to-[#eabf91]/10 dark:from-[#06273A] dark:to-[#0C1522]">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#eabf91] mb-6">Get in Touch</h1>
              <p className="text-gray-700 dark:text-gray-200 mb-8">
                Our team will reach out to you as soon as possible to discuss your needs and how we can help you enhance
                your personal and professional presence.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#c3965d] flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-200">Personalized Consultation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#c3965d] flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-200">Expert Guidance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#c3965d] flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-200">Transformative Experience</span>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <p className="text-gray-700 dark:text-gray-200 font-medium mb-3">Follow us on:</p>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/modernmannerism/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#c3965d] flex items-center justify-center hover:bg-[#eabf91] transition-colors"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://www.linkedin.com/in/k-manasi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#c3965d] flex items-center justify-center hover:bg-[#eabf91] transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://www.facebook.com/modernmannerism/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#c3965d] flex items-center justify-center hover:bg-[#eabf91] transition-colors"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/5 p-6 md:p-8">
            <div className="flex flex-col md:hidden text-center justify-center">
              {" "}
              <h1 className="text-3xl md:text-4xl font-bold text-[#eabf91] mb-6">Get in Touch</h1>
              <p className="text-gray-700 text-sm dark:text-gray-200 mb-8">
                Our team will contact you promptly to discuss your requirements and how we can help you strengthen your personal and professional brand presence.


              </p>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Full Name"
                          {...field}
                          className="w-full p-2 md:p-4 rounded-md bg-gray-100 dark:bg-[#0C1522] dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#933469]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Email Address"
                          type="email"
                          {...field}
                          className="w-full p-2 md:p-4 rounded-md bg-gray-100 dark:bg-[#0C1522] dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#933469]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Phone Number"
                          type="tel"
                          {...field}
                          className="w-full p-2 md:p-4 rounded-md bg-gray-100 dark:bg-[#0C1522] dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#933469]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full p-2 md:p-4 rounded-md bg-gray-100 dark:bg-[#0C1522] dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#933469]">
                            <SelectValue placeholder="Select a Course" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="personal-branding">Business Etiquette
                          </SelectItem>
                          <SelectItem value="communication-skills">Professional Grooming
                          </SelectItem>
                          <SelectItem value="corporate-etiquette">Ladies Grooming Workshop
                          </SelectItem>
                          <SelectItem value="fine-dining-manners">Personalised Transformation Programme</SelectItem>
                          <SelectItem value="fine-dining-manners">Children's Etiquette
                          </SelectItem>
                          <SelectItem value="fine-dining-manners">Young Adult Finishing Programme
                          </SelectItem>
                          <SelectItem value="fine-dining-manners">Interview Preparation
                          </SelectItem>
                           <SelectItem value="fine-dining-manners">Communication & Public Speaking
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Message"
                          {...field}
                          className="w-full p-2 md:p-4 rounded-md bg-gray-100 dark:bg-[#0C1522] dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#933469]"
                          rows={5}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agree"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="agree"
                          className="mr-2 data-[state=checked]:bg-[#933469] data-[state=checked]:border-[#933469]"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <label htmlFor="agree" className="text-sm text-gray-700 dark:text-gray-200">
                          I agree to receive exclusive offers, newsletter and updates from Modern Mannerism.
                        </label>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting || !form.formState.isValid}
                  className="w-full py-3 tracking-wide rounded-full bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] text-white transition-colors duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#933469] dark:text-[#eabf91]">
              Thank You!
            </DialogTitle>
            <DialogDescription className="text-center">
              We've received your message and will get back to you soon.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-center text-gray-700 dark:text-gray-200 mb-4">
              {formData && formData.name ? `Thank you, ${formData.name}!` : "Thank you!"} Our team will reach out to you
              as soon as possible.
            </p>
            <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
              We've sent you an email with more information about our services.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://www.instagram.com/modernmannerism/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c3965d] hover:text-[#eabf91]"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/k-manasi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c3965d] hover:text-[#eabf91]"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/modernmannerism/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c3965d] hover:text-[#eabf91]"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://medium.com/@modernmannerism"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c3965d] hover:text-[#eabf91]"
              >
                <BookOpen className="w-6 h-6" />
              </a>
            </div>
            <Button
              onClick={handleCloseDialog}
              className="mt-6 bg-gradient-to-r from-[#c3965d] to-[#eabf91] text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
