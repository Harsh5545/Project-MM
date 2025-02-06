'use client';

import React, { useState, useRef } from "react";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { FileUpload } from "@/components/ui/file-upload";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const authenticator = async () => {
    try {
        const response = await fetch("/api/auth");
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        const { signature, expire, token } = await response.json();
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Auth error: ${error.message}`);
    }
};

export default function BlogImageUploader({ formData, setFormData }) {
    const [loading, setLoading] = useState(false);
    const ikUploadRef = useRef(null);

    const onSuccess = (res) => {
        console.log("Upload Success:", res);

        // Ensure image URL is updated correctly
        setFormData((prevData) => ({
            ...prevData,
            image: res.url, // ✅ Save correct ImageKit URL
            og_image: res.url, // ✅ If og_image is also needed
        }));

        setLoading(false);
    };

    const onError = (err) => {
        console.error("Upload Error:", err);
        setLoading(false);
    };

    const onUploadStart = () => {
        console.log("Upload Started...");
        setLoading(true);
    };

    const handleFileUpload = (files) => {
        if (files.length > 0) {
            console.log("Selected File:", files[0]); // Debugging
            ikUploadRef.current.fileUpload(files[0]); // ✅ Triggers ImageKit upload
        }
    };

    return (
        <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
            <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg flex items-center justify-center">
                <FileUpload onChange={handleFileUpload} multiple={false} />
                <IKUpload
                    fileName="blog-image"
                    useUniqueFileName={true}
                    isPrivateFile={false}
                    overwriteFile={true}
                    onSuccess={onSuccess}
                    onError={onError}
                    onUploadStart={onUploadStart}
                    style={{ display: 'none' }}
                    ref={ikUploadRef}
                />
            </div>
            {loading && <p className="text-center mt-2">Uploading...</p>}
        </ImageKitProvider>
    );
}
