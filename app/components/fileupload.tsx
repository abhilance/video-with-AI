"use client";

import { upload } from "@imagekit/next";
import { useState } from "react";
import { Upload, AlertCircle } from "lucide-react";

interface FileUploadProps {
  onSuccess: (res: any) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const validFile = (file: File): boolean => {
    setError(null);

    // Check file type
    if (fileType === "video" && !file.type.startsWith("video/")) {
      setError("Please upload a valid video file");
      return false;
    }

    if (fileType === "image" && !file.type.startsWith("image/")) {
      setError("Please upload a valid image file");
      return false;
    }

    // Check file size
    const maxSize = fileType === "video" ? 100 * 1024 * 1024 : 10 * 1024 * 1024; // 100MB for video, 10MB for image
    if (file.size > maxSize) {
      setError(`File size must be less than ${fileType === "video" ? "100MB" : "10MB"}`);
      return false;
    }

    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !validFile(file)) return;

    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();

      const uploadResponse = await upload({
        expire: auth.expire,
        token: auth.token,
        signature: auth.signature,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        file,
        fileName: file.name,
        onProgress: (event) => {
          if (event.lengthComputable) {
            const percent = (event.loaded / event.total) * 100;
            const roundedPercent = Math.round(percent);
            setProgress(roundedPercent);
            onProgress?.(roundedPercent);
          }
        },
      });

      onSuccess(uploadResponse);
    } catch (error) {
      console.error("Upload failed", error);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      {/* File Input */}
      <div className="relative">
        <input
          type="file"
          accept={fileType === "video" ? "video/*" : "image/*"}
          onChange={handleFileChange}
          disabled={uploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          id={`file-upload-${fileType}`}
        />
        <label
          htmlFor={`file-upload-${fileType}`}
          className={`flex items-center gap-3 px-6 py-3 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer transition-all duration-200 ${
            uploading 
              ? "border-purple-500 bg-purple-500/10" 
              : "hover:border-gray-500 hover:bg-gray-800/50"
          } ${error ? "border-red-500" : ""}`}
        >
          <Upload className={`w-5 h-5 ${uploading ? "text-purple-400" : "text-gray-400"}`} />
          <div className="text-left">
            <div className={`font-medium ${uploading ? "text-purple-300" : "text-white"}`}>
              {uploading ? "Uploading..." : `Choose ${fileType} file`}
            </div>
            <div className="text-sm text-gray-400">
              {fileType === "video" ? "MP4, MOV, AVI up to 100MB" : "JPG, PNG, WebP up to 10MB"}
            </div>
          </div>
        </label>
      </div>

      {/* Progress Bar */}
      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-purple-300">Uploading {fileType}...</span>
            <span className="text-purple-300">{progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg p-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;