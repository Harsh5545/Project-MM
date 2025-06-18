"use client"

import { useRef, useState } from "react"
import { ImageKitProvider, IKUpload } from "imagekitio-next"
import { Button } from "@/components/ui/button"
import { Upload, ImageIcon } from "lucide-react"

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT

const authenticator = async () => {
  try {
    const response = await fetch("/api/auth")

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Request failed with status ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    const { signature, expire, token } = data
    return { signature, expire, token }
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`)
  }
}

export default function BlogImageUploader({ formData, setFormData, type, onSuccess: externalOnSuccess }) {
  const ikUploadRefTest = useRef(null)
  const [loading, setLoading] = useState(false)

  const onError = (err) => {
    console.log("Error", err)
    setLoading(false)
  }

  const onSuccess = (res) => {
    // Handle different types of image uploads
    if (type === "og_image") {
      setFormData((prevData) => ({ ...prevData, og_image: res?.url }))
    } else if (type === "image") {
      setFormData((prevData) => ({ ...prevData, image: res?.url }))
    } else if (type === "content-image") {
      // For content images, don't update form data, just call the success callback
      if (externalOnSuccess && typeof externalOnSuccess === "function") {
        externalOnSuccess(res?.url)
      }
    } else {
      // Default behavior for backward compatibility
      if (setFormData) {
        setFormData((prevData) => ({ ...prevData, [type]: res?.url }))
      }
    }

    // Call external onSuccess handler if provided
    if (externalOnSuccess && typeof externalOnSuccess === "function" && type !== "content-image") {
      externalOnSuccess(res?.url)
    }

    setLoading(false)
  }

  const onUploadProgress = (progress) => {
    console.log("Progress", progress)
  }

  const onUploadStart = (evt) => {
    console.log("Start", evt)
    setLoading(true)
  }

  const getButtonText = () => {
    if (loading) return "Uploading..."

    switch (type) {
      case "og_image":
        return "Upload OG Image"
      case "image":
        return "Upload Featured Image"
      case "content-image":
        return "Upload Image"
      default:
        return "Upload Image"
    }
  }

  const getButtonSize = () => {
    return type === "content-image" ? "sm" : "default"
  }

  return (
    <div className="upload-file-container w-full">
      <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
        <IKUpload
          customCoordinates={"20,20,20,20"}
          isPrivateFile={false}
          useUniqueFileName={true}
          responseFields={["tags"]}
          validateFile={(file) => file.size < 10000000} // 10MB limit
          overwriteFile={true}
          overwriteAITags={true}
          overwriteTags={true}
          overwriteCustomMetadata={true}
          onError={onError}
          onSuccess={(res) => onSuccess(res)}
          onUploadProgress={onUploadProgress}
          onUploadStart={(evt) => onUploadStart(evt)}
          style={{ display: "none" }}
          ref={ikUploadRefTest}
        />

        <Button
          type="button"
          variant="outline"
          size={getButtonSize()}
          className={`w-full ${type === "content-image" ? "h-10" : "h-20"} flex flex-col items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}
          onClick={() => ikUploadRefTest.current.click()}
          disabled={loading}
        >
          {loading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
              <span className="text-xs">Uploading...</span>
            </div>
          ) : (
            <>
              {type === "content-image" ? <ImageIcon className="h-4 w-4" /> : <Upload className="h-6 w-6" />}
              <span className={`${type === "content-image" ? "text-xs" : "text-sm"} font-medium`}>
                {getButtonText()}
              </span>
            </>
          )}
        </Button>
      </ImageKitProvider>
    </div>
  )
}
