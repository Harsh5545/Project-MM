"use client"

import { useRef, useState } from "react"
import { ImageKitProvider, IKUpload } from "imagekitio-next"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT

// Authenticator to get the signature, expire time, and token from the backend
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

  // ImageKit success, error, and progress handlers
  const onError = (err) => {
    console.log("Error", err)
    setLoading(false)
  }

  const onSuccess = (res) => {
    if (type === "og_image") {
      setFormData((prevData) => ({ ...prevData, og_image: res?.url }))
    }
    if (type === "image") {
      setFormData((prevData) => ({ ...prevData, image: res?.url }))
    }

    // Call external onSuccess handler if provided
    if (externalOnSuccess && typeof externalOnSuccess === "function") {
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

  return (
    <div className="upload-file-container w-full">
      <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
        {/* Hidden upload component */}
        <IKUpload
          customCoordinates={"20,20,20,20"}
          isPrivateFile={false}
          useUniqueFileName={true}
          responseFields={["tags"]}
          validateFile={(file) => file.size < 5000000} // Increased size limit to 5MB
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

        {/* Custom Upload Button */}
        <Button
          type="button"
          variant="outline"
          className="w-full h-24 flex flex-col items-center justify-center gap-2"
          onClick={() => ikUploadRefTest.current.click()}
          disabled={loading}
        >
          {loading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="mt-2 text-sm">Uploading...</span>
            </div>
          ) : (
            <>
              <Upload className="h-6 w-6" />
              <span className="text-sm">Click to upload image</span>
            </>
          )}
        </Button>
      </ImageKitProvider>

      <style jsx global>{`
        .upload-file-container {
          width: 100%;
        }
        .upload-icon-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
