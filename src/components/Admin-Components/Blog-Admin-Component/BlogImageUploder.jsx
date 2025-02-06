'use client';

import React, { useRef, useState } from "react";
import { ImageKitProvider, IKUpload } from "imagekitio-next";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

// Authenticator to get the signature, expire time, and token from the backend
const authenticator = async () => {
  try {
    const response = await fetch("/api/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

export default function BlogImageUploader({ formData, setFormData, type }) {
  const ikUploadRefTest = useRef(null);
  const [loading, setLoading] = useState(false);

  // ImageKit success, error, and progress handlers
  const onError = (err) => {
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    if (type === "og_image") {
      setFormData((prevData) => ({ ...prevData, og_image: res?.url }))
    }
    if (type === "image") {
      setFormData((prevData) => ({ ...prevData, image: res?.url }))
    }
    setLoading(false);
  };

  const onUploadProgress = (progress) => {
    console.log("Progress", progress);
  };

  const onUploadStart = (evt) => {
    console.log("Start", evt);
    setLoading(true);
  };

  return (
    <div className="upload-file-container">
      <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
        {/* Hidden upload component */}
        <IKUpload
          customCoordinates={"20,20,20,20"}
          isPrivateFile={false}
          useUniqueFileName={true}
          responseFields={["tags"]}
          validateFile={(file) => file.size < 2000000}
          overwriteFile={true}
          overwriteAITags={true}
          overwriteTags={true}
          overwriteCustomMetadata={true}
          onError={onError}
          onSuccess={(res) => onSuccess(res)}
          onUploadProgress={onUploadProgress}
          onUploadStart={(evt) => onUploadStart(evt)}
          style={{ display: 'none' }}
          ref={ikUploadRefTest}
        />

        {/* Custom Upload Icon Button */}
        <div
          className="upload-icon-button"
          onClick={() => ikUploadRefTest.current.click()}
        >
          {loading ? (
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          )}
        </div>
      </ImageKitProvider>
    </div>
  );
}