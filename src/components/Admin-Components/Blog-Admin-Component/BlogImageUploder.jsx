"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

export default function BlogImageUploader({ formData, setFormData }) {
  const [file, setFile] = useState(null); // Only store one file

  const handleFileUpload = (files) => {
    if (files.length > 0) {
      const selectedFile = files[0]; // Take only the first file
      setFile(selectedFile);
      console.log("Uploaded File:", selectedFile);

      // Update formData with the new image URL
      setFormData((prevData) => ({
        ...prevData,
        image: URL.createObjectURL(selectedFile), // Temporary preview URL
      }));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} multiple={false} /> 
      {/* {file && (
        <img src={URL.createObjectURL(file)} alt="Uploaded" className="mt-4 w-32 h-32 object-cover" />
      )} */}
    </div>
  );
}
