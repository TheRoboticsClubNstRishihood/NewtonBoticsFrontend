"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, Camera, Robot } from "lucide-react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage";
import { VscRobot } from "react-icons/vsc";

const ProfileCompletionPage = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [croppedArea, setCroppedArea] = useState(null);
  const [robotMode, setRobotMode] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log("Cropped Area Pixels:", croppedAreaPixels);
    setCroppedArea(croppedAreaPixels);
  };

  const handleCropSave = async () => {
    if (!croppedArea) {
      console.error("Crop area is not set.");
      return;
    }
    try {
      const croppedImage = await getCroppedImg(profileImage, croppedArea);
      setProfileImage(croppedImage);
      setShowCropper(false);
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  const handleSkip = () => {
    setRobotMode(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Completed:", {
      ...formData,
      profileImage: robotMode ? "robot-avatar" : profileImage,
    });
    router.push("/DashBoard");
  };

  return (
    <div className="text-black min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          {robotMode ? "You Will Look Like a Robot!" : "Complete Your Profile"}
        </h2>

        {robotMode && (
          <div className="flex justify-center mb-6">
            <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center">
              <VscRobot className="w-10 h-10 text-gray-400" />
            </div>
          </div>
        )}

        {!robotMode && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt="Profile"
                    width={120}
                    height={120}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-gray-400" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>

            {showCropper && (
              <div className="cropper-container">
                <Cropper
                  image={profileImage}
                  cropShape="round"
                  aspect={1}
                  onCropComplete={onCropComplete}
                  cropSize={{ width: 120, height: 120 }}
                />
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowCropper(false)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleCropSave}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="bio" className="block text-sm font-medium">
                Bio
              </label>
              <textarea
                name="bio"
                id="bio"
                value={formData.bio}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Tell us about yourself"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
            >
              Save & Continue
            </button>
          </form>
        )}

        {robotMode && (
          <button
            onClick={() => router.push("/DashBoard")}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 mt-6"
          >
            Continue
          </button>
        )}

        {!robotMode && (
          <button
            type="button"
            onClick={handleSkip}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 mt-4"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCompletionPage;
