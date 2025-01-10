"use client";
import React, { useRef, useState } from "react";
import { ImageKitProvider, IKUpload } from "imagekitio-next";

// Get the public key and endpoint from environment variables
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

// Function to update the profile picture
const updateProfilePicture = async (userId, imageUrl, toast, setUser) => {
    try {
        const response = await fetch('/api/profile/update-profile-picture', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Charset': 'utf-8',
            },
            body: JSON.stringify({ userId, imageUrl }),
        });

        const data = await response.json();
        if (data.Success) {
            toast({
                title: "Success",
                description: "Profile picture updated successfully.",
            });
            setUser(prevUser => ({ ...prevUser, avatar: imageUrl }));
        } else {
            console.error(data.Message);
            toast({
                title: "Error",
                description: "Failed to update profile picture.",
                variant: "destructive",
            });
        }
    } catch (error) {
        console.error(error);
        toast({
            title: "Error",
            description: "Error while updating profile picture.",
            variant: "destructive",
        });
    }
};



export default function UploadFile({ userId, toast, setUser }) {
    const ikUploadRefTest = useRef(null);
    const [loading, setLoading] = useState(false);


    // ImageKit success, error, and progress handlers
    const onError = (err) => {
        console.log("Error", err);
    };

    const onSuccess = (res, userId, toast, setUser) => {
        console.log("Success", res);
        updateProfilePicture(userId, res?.url, toast, setUser);
        setLoading(false)
    };

    const onUploadProgress = (progress) => {
        console.log("Progress", progress);
    };

    const onUploadStart = (evt, setLoading) => {
        console.log("Start", evt);
        setLoading(true); // Set loading to true when upload starts
    };

    return (
        <div className="upload-file-container">
            <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>

                {/* Hidden upload component */}
                <IKUpload
                    fileName="test-upload.jpg"
                    tags={["sample-tag1", "sample-tag2"]}
                    customCoordinates={"10,10,10,10"}
                    isPrivateFile={false}
                    useUniqueFileName={true}
                    responseFields={["tags"]}
                    validateFile={(file) => file.size < 2000000}  // Optional validation
                    folder={`/user-uploads/${userId}`}  // Dynamic folder name
                    overwriteFile={true}
                    overwriteAITags={true}
                    overwriteTags={true}
                    overwriteCustomMetadata={true}
                    onError={onError}
                    onSuccess={(res) => onSuccess(res, userId, toast, setUser)}  // Pass dynamic values to success callback
                    onUploadProgress={onUploadProgress}
                    onUploadStart={(evt) => onUploadStart(evt, setLoading)}  // Set loading when upload starts
                    style={{ display: 'none' }}  // Hidden upload button for icon-based trigger
                    ref={ikUploadRefTest}  // Ref for triggering upload
                />

                {/* Custom Upload Icon Button */}
                <div
                    className="upload-icon-button"
                    onClick={() => ikUploadRefTest.current.click()}  // Trigger hidden upload on icon click
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
