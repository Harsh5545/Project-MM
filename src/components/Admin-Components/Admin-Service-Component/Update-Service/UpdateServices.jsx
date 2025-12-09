"use client"

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import icons from "@/hooks/icons"
import UploadServices from "../Add-Service/UploadServices"

const EditServices = ({ data}) => {
  const { toast } = useToast()
  const [isFormValid, setIsFormValid] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const router = useRouter()
  // const [formData, setFormData] = useState({
  //   heading: data.heading||"",
  //   subheading: data.subheading||"",
  //   courseDescription: data.courseDescription||"",
  //   image: data.image||"",
  //   category: data.categoryId||"",
  //   courseDetails: {
  //     courseHeadings: [{ heading: "", subheading: "", icon: "" }],
  //     courseDetail: [{ icon: "", description: "" }],
  //     programHighlights: [{ icon: "FaCheckCircle", heading: "", description: "" }],
  //     overviewImage: "",
  //     overviewDescription: "",
  //   },
  //   programDetails: {
  //     ageGroups: [{ subheading: "" }],
  //     formats: [{ heading: "", subheading: "" }],
  //     durations: [{ heading: "", subheading: "" }],
  //     locations: [{ heading: "", subheading: "" }],
  //   },
  //   testimonials: {
  //     taglineHeading: "",
  //     mmDescription: "",
  //     testimonials: [{ comment: "", name: "" }],
  //     faqs: [{ question: "", answer: "" }],
  //     heroImage:data.heroImage||"",
  //     outsideImage: "",
  //   },
  //   seo: {
  //     meta_title: "",
  //     meta_description: "",
  //     og_title: "",
  //     og_image: "",
  //     keywords: [],
  //   },
  // })

  const [ formData, setFormData ] = useState(data)

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/category/list")
        const result = await response.json()
        if (result.data) {
          setCategories(result.data)
        } else {
          throw new Error("Failed to fetch categories")
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
        toast({
          title: "Error",
          description: "Failed to fetch categories. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [toast])


  const validateForm = useCallback(() => {
    const isValid =
      formData.heading && formData.subheading && formData.courseDescription && formData.category && formData.image
    setIsFormValid(isValid)
  }, [formData])

  useEffect(() => {
    validateForm()
  }, [validateForm])

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }, [])

  const handleSelectChange = useCallback((value) => {
    console.log(value,'VALUE')
    setFormData((prevData) => ({ ...prevData, category: value }))
  }, [])

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(formData,'FORMDATA')
      const response = await fetch(`/api/services/update-service`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: "Service updated successfully",
        })
        setShowSuccessDialog(true)
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating the service",
        variant: "destructive",
      })
    }
  }

  const handleCourseDetailsChange = useCallback((field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      courseDetails: {
        ...prevData.courseDetails,
        [field]: value,
      },
    }))
  }, [])

  const handleProgramDetailsChange = useCallback((field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      programDetails: {
        ...prevData.programDetails,
        [field]: value,
      },
    }))
  }, [])

  const handleTestimonialsChange = useCallback((field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      testimonials: {
        ...prevData.testimonials,
        [field]: value,
      },
    }))
  }, [])

  const handleSeoChange = useCallback((field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      seo: {
        ...prevData.seo,
        [field]: value,
      },
    }))
  }, [])

  return (
    <div className="bg-gradient-to-r from-gray-200 to-gray-100 min-h-screen ">
      <div className="w-full mx-auto bg-white dark:bg-gray-800 rounded-lg p-8 space-y-8">
        <h1 className="text-3xl font-bold mb-6">Edit Service</h1>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Basic Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Heading</label>
              <Input
                type="text"
                name="heading"
                value={formData.heading}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subheading</label>
              <Input
                type="text"
                name="subheading"
                value={formData.subheading}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Course Description</label>
              <textarea
                name="courseDescription"
                value={formData.courseDescription}
                onChange={handleInputChange}
                className="mt-1 w-full p-2 border rounded-md"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <Select onValueChange={handleSelectChange} value={formData.categoryId}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.category_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <UploadServices formData={formData} setFormData={setFormData} type="image" />
              {formData.image && (
                <Image
                  width={300}
                  height={300}
                  src={formData.image || "/placeholder.svg"}
                  alt="service image"
                  className="mt-2 rounded-md"
                />
              )}
            </div>
          </div>

          {/* Course Details */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Course Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Overview Image</label>
              <UploadServices formData={formData} setFormData={setFormData} type="overviewImage" />
              {formData.courseDetails.overviewImage && (
                <Image
                  width={300}
                  height={300}
                  src={formData.courseDetails.overviewImage || "/placeholder.svg"}
                  alt="Overview"
                  className="mt-2 rounded-md"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Overview Description</label>
              <Input
                type="text"
                value={formData.courseDetails.overviewDescription}
                onChange={(e) => handleCourseDetailsChange("overviewDescription", e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Course Headings */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Course Headings</h3>
              {formData.courseDetails.courseHeadings.map((heading, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <select
                    value={heading.icon}
                    onChange={(e) => {
                      const newHeadings = [...formData.courseDetails.courseHeadings]
                      newHeadings[index].icon = e.target.value
                      handleCourseDetailsChange("courseHeadings", newHeadings)
                    }}
                    className="p-2 border rounded-md"
                  >
                    {Object.keys(icons).map((iconKey) => (
                      <option key={iconKey} value={iconKey}>
                        {iconKey}
                      </option>
                    ))}
                  </select>
                  <Input
                    type="text"
                    value={heading.heading}
                    onChange={(e) => {
                      const newHeadings = [...formData.courseDetails.courseHeadings]
                      newHeadings[index].heading = e.target.value
                      handleCourseDetailsChange("courseHeadings", newHeadings)
                    }}
                    placeholder="Heading"
                  />
                  <Input
                    type="text"
                    value={heading.subheading}
                    onChange={(e) => {
                      const newHeadings = [...formData.courseDetails.courseHeadings]
                      newHeadings[index].subheading = e.target.value
                      handleCourseDetailsChange("courseHeadings", newHeadings)
                    }}
                    placeholder="Subheading"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const newHeadings = formData.courseDetails.courseHeadings.filter((_, i) => i !== index)
                      handleCourseDetailsChange("courseHeadings", newHeadings)
                    }}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => {
                  const newHeadings = [
                    ...formData.courseDetails.courseHeadings,
                    { heading: "", subheading: "", icon: "" },
                  ]
                  handleCourseDetailsChange("courseHeadings", newHeadings)
                }}
              >
                Add Course Heading
              </Button>
            </div>

            {/* Course Details */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Course Details</h3>
              {formData.courseDetails.courseDetail.map((detail, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <select
                    value={detail.icon}
                    onChange={(e) => {
                      const newDetails = [...formData.courseDetails.courseDetail]
                      newDetails[index].icon = e.target.value
                      handleCourseDetailsChange("courseDetail", newDetails)
                    }}
                    className="p-2 border rounded-md"
                  >
                    {Object.keys(icons).map((iconKey) => (
                      <option key={iconKey} value={iconKey}>
                        {iconKey}
                      </option>
                    ))}
                  </select>
                  <Input
                    type="text"
                    value={detail.description}
                    onChange={(e) => {
                      const newDetails = [...formData.courseDetails.courseDetail]
                      newDetails[index].description = e.target.value
                      handleCourseDetailsChange("courseDetail", newDetails)
                    }}
                    placeholder="Description"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const newDetails = formData.courseDetails.courseDetail.filter((_, i) => i !== index)
                      handleCourseDetailsChange("courseDetail", newDetails)
                    }}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => {
                  const newDetails = [...formData.courseDetails.courseDetail, { icon: "", description: "" }]
                  handleCourseDetailsChange("courseDetail", newDetails)
                }}
              >
                Add Course Detail
              </Button>
            </div>

            {/* Program Highlights */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Program Highlights</h3>
              {formData.courseDetails.programHighlights.map((highlight, index) => (
                <div key={index} className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <select
                      value={highlight.icon}
                      onChange={(e) => {
                        const newHighlights = [...formData.courseDetails.programHighlights]
                        newHighlights[index].icon = e.target.value
                        handleCourseDetailsChange("programHighlights", newHighlights)
                      }}
                      className="p-2 border rounded-md"
                    >
                      {Object.keys(icons).map((iconKey) => (
                        <option key={iconKey} value={iconKey}>
                          {iconKey}
                        </option>
                      ))}
                    </select>
                    <Input
                      type="text"
                      value={highlight.heading}
                      onChange={(e) => {
                        const newHighlights = [...formData.courseDetails.programHighlights]
                        newHighlights[index].heading = e.target.value
                        handleCourseDetailsChange("programHighlights", newHighlights)
                      }}
                      placeholder="Heading"
                    />
                  </div>
                  <Input
                    type="text"
                    value={highlight.description}
                    onChange={(e) => {
                      const newHighlights = [...formData.courseDetails.programHighlights]
                      newHighlights[index].description = e.target.value
                      handleCourseDetailsChange("programHighlights", newHighlights)
                    }}
                    placeholder="Description"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const newHighlights = formData.courseDetails.programHighlights.filter((_, i) => i !== index)
                      handleCourseDetailsChange("programHighlights", newHighlights)
                    }}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => {
                  const newHighlights = [
                    ...formData.courseDetails.programHighlights,
                    { icon: "FaCheckCircle", heading: "", description: "" },
                  ]
                  handleCourseDetailsChange("programHighlights", newHighlights)
                }}
              >
                Add Program Highlight
              </Button>
            </div>
          </div>

          {/* Program Details */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Program Details</h2>

            {/* Age Groups */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Age Groups</h3>
              {formData.programDetails.ageGroups.map((group, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Input
                    type="text"
                    value={group.subheading}
                    onChange={(e) => {
                      const newGroups = [...formData.programDetails.ageGroups]
                      newGroups[index].subheading = e.target.value
                      handleProgramDetailsChange("ageGroups", newGroups)
                    }}
                    placeholder="Age Group"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const newGroups = formData.programDetails.ageGroups.filter((_, i) => i !== index)
                      handleProgramDetailsChange("ageGroups", newGroups)
                    }}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => {
                  const newGroups = [...formData.programDetails.ageGroups, { subheading: "" }]
                  handleProgramDetailsChange("ageGroups", newGroups)
                }}
              >
                Add Age Group
              </Button>
            </div>

            {/* Formats */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Formats</h3>
              {formData.programDetails.formats.map((format, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Input
                    type="text"
                    value={format.heading}
                    onChange={(e) => {
                      const newFormats = [...formData.programDetails.formats]
                      newFormats[index].heading = e.target.value
                      handleProgramDetailsChange("formats", newFormats)
                    }}
                    placeholder="Heading"
                  />
                  <Input
                    type="text"
                    value={format.subheading}
                    onChange={(e) => {
                      const newFormats = [...formData.programDetails.formats]
                      newFormats[index].subheading = e.target.value
                      handleProgramDetailsChange("formats", newFormats)
                    }}
                    placeholder="Subheading"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const newFormats = formData.programDetails.formats.filter((_, i) => i !== index)
                      handleProgramDetailsChange("formats", newFormats)
                    }}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => {
                  const newFormats = [...formData.programDetails.formats, { heading: "", subheading: "" }]
                  handleProgramDetailsChange("formats", newFormats)
                }}
              >
                Add Format
              </Button>
            </div>

            {/* Durations */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Durations</h3>
              {formData.programDetails.durations.map((duration, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Input
                    type="text"
                    value={duration.heading}
                    onChange={(e) => {
                      const newDurations = [...formData.programDetails.durations]
                      newDurations[index].heading = e.target.value
                      handleProgramDetailsChange("durations", newDurations)
                    }}
                    placeholder="Heading"
                  />
                  <Input
                    type="text"
                    value={duration.subheading}
                    onChange={(e) => {
                      const newDurations = [...formData.programDetails.durations]
                      newDurations[index].subheading = e.target.value
                      handleProgramDetailsChange("durations", newDurations)
                    }}
                    placeholder="Subheading"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const newDurations = formData.programDetails.durations.filter((_, i) => i !== index)
                      handleProgramDetailsChange("durations", newDurations)
                    }}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => {
                  const newDurations = [...formData.programDetails.durations, { heading: "", subheading: "" }]
                  handleProgramDetailsChange("durations", newDurations)
                }}
              >
                Add Duration
              </Button>
            </div>

            {/* Locations */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Locations</h3>
              {formData.programDetails.locations.map((location, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Input
                    type="text"
                    value={location.heading}
                    onChange={(e) => {
                      const newLocations = [...formData.programDetails.locations]
                      newLocations[index].heading = e.target.value
                      handleProgramDetailsChange("locations", newLocations)
                    }}
                    placeholder="Heading"
                  />
                  <Input
                    type="text"
                    value={location.subheading}
                    onChange={(e) => {
                      const newLocations = [...formData.programDetails.locations]
                      newLocations[index].subheading = e.target.value
                      handleProgramDetailsChange("locations", newLocations)
                    }}
                    placeholder="Subheading"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const newLocations = formData.programDetails.locations.filter((_, i) => i !== index)
                      handleProgramDetailsChange("locations", newLocations)
                    }}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => {
                  const newLocations = [...formData.programDetails.locations, { heading: "", subheading: "" }]
                  handleProgramDetailsChange("locations", newLocations)
                }}
              >
                Add Location
              </Button>
            </div>
          </div>

          {/* Testimonials */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Testimonials</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tagline Heading</label>
              <Input
                type="text"
                value={formData.testimonials.taglineHeading}
                onChange={(e) => handleTestimonialsChange("taglineHeading", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">MM Description</label>
              <Input
                type="text"
                value={formData.testimonials.mmDescription}
                onChange={(e) => handleTestimonialsChange("mmDescription", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hero Image</label>
              <UploadServices formData={formData} setFormData={setFormData} type="heroImage" />
              {formData.testimonials.heroImage && (
                <Image
                  width={300}
                  height={300}
                  src={formData.testimonials.heroImage || "/placeholder.svg"}
                  alt="Hero"
                  className="mt-2 rounded-md"
                />
              )}
            </div>

            {/* Testimonials */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Testimonials</h3>
              {formData.testimonials.testimonials.map((testimonial, index) => (
                <div key={index} className="space-y-2 mb-4">
                  <Input
                    type="text"
                    value={testimonial.comment}
                    onChange={(e) => {
                      const newTestimonials = [...formData.testimonials.testimonials]
                      newTestimonials[index].comment = e.target.value
                      handleTestimonialsChange("testimonials", newTestimonials)
                    }}
                    placeholder="Comment"
                  />
                  <Input
                    type="text"
                    value={testimonial.name}
                    onChange={(e) => {
                      const newTestimonials = [...formData.testimonials.testimonials]
                      newTestimonials[index].name = e.target.value
                      handleTestimonialsChange("testimonials", newTestimonials)
                    }}
                    placeholder="Name"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const newTestimonials = formData.testimonials.testimonials.filter((_, i) => i !== index)
                      handleTestimonialsChange("testimonials", newTestimonials)
                    }}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => {
                  const newTestimonials = [...formData.testimonials.testimonials, { comment: "", name: "" }]
                  handleTestimonialsChange("testimonials", newTestimonials)
                }}
              >
                Add Testimonial
              </Button>
            </div>

            {/* FAQs */}
            <div>
              <h3 className="text-xl font-semibold mb-2">FAQs</h3>
              {formData.testimonials.faqs.map((faq, index) => (
                <div key={index} className="space-y-2 mb-4">
                  <Input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const newFaqs = [...formData.testimonials.faqs]
                      newFaqs[index].question = e.target.value
                      handleTestimonialsChange("faqs", newFaqs)
                    }}
                    placeholder="Question"
                  />
                  <Input
                    type="text"
                    value={faq.answer}
                    onChange={(e) => {
                      const newFaqs = [...formData.testimonials.faqs]
                      newFaqs[index].answer = e.target.value
                      handleTestimonialsChange("faqs", newFaqs)
                    }}
                    placeholder="Answer"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const newFaqs = formData.testimonials.faqs.filter((_, i) => i !== index)
                      handleTestimonialsChange("faqs", newFaqs)
                    }}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => {
                  const newFaqs = [...formData.testimonials.faqs, { question: "", answer: "" }]
                  handleTestimonialsChange("faqs", newFaqs)
                }}
              >
                Add FAQ
              </Button>
            </div>
          </div>

          {/* SEO */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">SEO Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Meta Title</label>
              <Input
                type="text"
                value={formData.seo.meta_title}
                onChange={(e) => handleSeoChange("meta_title", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Meta Description</label>
              <Input
                type="text"
                value={formData.seo.meta_description}
                onChange={(e) => handleSeoChange("meta_description", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">OG Title</label>
              <Input
                type="text"
                value={formData.seo.og_title}
                onChange={(e) => handleSeoChange("og_title", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">OG Image</label>
              <UploadServices formData={formData} setFormData={setFormData} type="og_image" />
              {formData.seo.og_image && (
                <Image
                  width={300}
                  height={300}
                  src={formData.seo.og_image || "/placeholder.svg"}
                  alt="OG Image"
                  className="mt-2 rounded-md"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Keywords</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.seo.keywords.map((keyword, index) => (
                  <div key={index} className="bg-gray-200 px-2 py-1 rounded-md flex items-center">
                    <span>{keyword}</span>
                    <button
                      onClick={() => {
                        const newKeywords = formData.seo.keywords.filter((_, i) => i !== index)
                        handleSeoChange("keywords", newKeywords)
                      }}
                      className="ml-2 text-red-500"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter a keyword"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      const newKeyword = e.target.value.trim()
                      if (newKeyword) {
                        const newKeywords = [...formData.seo.keywords, newKeyword]
                        handleSeoChange("keywords", newKeywords)
                        e.target.value = ""
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Enter a keyword"]')
                    const newKeyword = input.value.trim()
                    if (newKeyword) {
                      const newKeywords = [...formData.seo.keywords, newKeyword]
                      handleSeoChange("keywords", newKeywords)
                      input.value = ""
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/services")}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isFormValid}>
              Update Service
            </Button>
          </div>
        </form>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogTitle className="text-lg font-semibold text-center">Service Successfully Updated!</DialogTitle>
          <Button
            onClick={() => {
              setShowSuccessDialog(false)
              router.push("/admin/services")
            }}
            className="mt-4 bg-black text-white px-4 py-2 rounded-lg w-full"
          >
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditServices

