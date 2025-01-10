'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'
import UploadFile from '../upload/UploadFile'
import { Loader } from 'lucide-react'

export default function UserProfile({ data }) {
  const [user, setUser] = useState({
    name: data?.user?.name,
    email: data?.user?.email,
    bio: 'I am a software developer.',
    avatar: data?.user?.image,
    id: data?.user?.id
  });

  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Use effect hook to re-render when the avatar state changes
  useEffect(() => {
    if (data?.user?.image) {
      setUser(prevUser => ({ ...prevUser, avatar: data.user.image }));
    }
  }, [data?.user?.image]);

  // Function to update the profile picture in the database after upload



  // Handle the avatar file upload
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', file); // Append the file to formData
      formData.append('folder', "profile"); // If you need to specify the folder

      try {
        // Do not set Content-Type manually
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData, // Body is the formData object, no need for JSON.stringify
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await response.json();
        const uploadedImageUrl = data?.url; // Assume you get the image URL here

        if (uploadedImageUrl) {
          await updateProfilePicture(user.id, uploadedImageUrl);
        } else {
          throw new Error("Image URL not returned");
        }
      } catch (error) {
        console.error('Error updating profile picture:', error);
        toast({
          title: "Error",
          description: "Failed to update profile picture. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    }
  };


  // Handle the name update request
  const handleNameChange = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await fetch('/api/update-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: user.name }),
      });

      if (!response.ok) {
        throw new Error('Failed to update name');
      }

      toast({
        title: "Success",
        description: "Name updated successfully.",
      });
    } catch (error) {
      console.error('Error updating name:', error);
      toast({
        title: "Error",
        description: "Failed to update name. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle the password change request
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      setNewPassword('');
      setConfirmPassword('');
      toast({
        title: "Success",
        description: "Password changed successfully.",
      });
    } catch (error) {
      console.error('Error changing password:', error);
      toast({
        title: "Error",
        description: "Failed to change password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={user?.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Label htmlFor="avatar-upload" className={`absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <UploadFile userId={user.id} toast={toast} setUser={setUser} />
                  <span className="sr-only">Upload avatar</span>
                </Label>
              </div>
            </div>

            {/* Name Update Form */}
            <form onSubmit={handleNameChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? <Loader className="mr-2 h-4 w-4 animate-spin" />   : 'Update Name'}
              </Button>
            </form>

            {/* Email Display */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={user.email}
                disabled
                className="bg-muted"
              />
            </div>

            {/* Password Change Form */}
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  name="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? <Loader className="mr-2 h-4 w-4 animate-spin" />  : 'Change Password'}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
