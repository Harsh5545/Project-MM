"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

export default function BlogImageUploader({ formData, setFormData }) {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (uploadedFiles) => {
    setFiles(uploadedFiles);

    if (uploadedFiles.length > 0) {
      const imageUrl = URL.createObjectURL(uploadedFiles[0]); // Temporary preview URL
      setFormData({ ...formData, image: imageUrl });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
      <FileUpload onChange={handleFileUpload} />
      
      {/* Display Uploaded Image */}
      {/* {formData.image && (
        <div className="mt-4">
          <img src={formData.image} alt="Blog" className="w-full h-auto rounded-lg shadow-md" />
        </div>
      )} */}
    </div>
  );
}
